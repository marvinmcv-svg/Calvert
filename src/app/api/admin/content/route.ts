import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isAdmin, sameOrigin } from "@/lib/admin-auth";
import { getCollection, getDefault } from "@/lib/content/registry";
import { loadOverrides, saveOverrides } from "@/lib/content/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Put = z.object({ id: z.string(), value: z.unknown() });
const Del = z.object({ id: z.string() });

/**
 * The edited value must keep the default's structure all the way down: arrays stay arrays
 * (every item shaped like the default's first item), objects keep exactly their keys, and
 * leaves keep their type. Optional keys that appear on only some default items are allowed.
 */
function sameShape(def: unknown, val: unknown, optional = new Set<string>()): boolean {
  if (Array.isArray(def)) {
    if (!Array.isArray(val)) return false;
    if (def.length === 0) return true;
    const objs = def.filter((d) => d && typeof d === "object" && !Array.isArray(d)) as Record<string, unknown>[];
    const allKeys = new Set(objs.flatMap((o) => Object.keys(o)));
    const opt = new Set([...allKeys].filter((k) => objs.some((o) => !(k in o))));
    const template = objs.length ? Object.fromEntries([...allKeys].map((k) => [k, objs.find((o) => k in o)![k]])) : def[0];
    return val.every((v) => sameShape(template, v, opt));
  }
  if (def && typeof def === "object") {
    if (!val || typeof val !== "object" || Array.isArray(val)) return false;
    const d = def as Record<string, unknown>;
    const v = val as Record<string, unknown>;
    if (Object.keys(v).some((k) => !(k in d))) return false;
    return Object.keys(d).every((k) => (k in v ? sameShape(d[k], v[k]) : optional.has(k)));
  }
  return typeof def === typeof val;
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ overrides: await loadOverrides() });
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const parsed = Put.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !getCollection(parsed.data.id)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (!sameShape(getDefault(parsed.data.id), parsed.data.value)) return NextResponse.json({ error: "shape" }, { status: 400 });
  const all = await loadOverrides();
  all[parsed.data.id] = parsed.data.value;
  await saveOverrides(all);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const parsed = Del.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const all = await loadOverrides();
  delete all[parsed.data.id];
  await saveOverrides(all);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, value: getDefault(parsed.data.id) });
}
