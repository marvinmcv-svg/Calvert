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

/** Same top-level shape as the default: an array stays an array, an object keeps its keys. */
function sameShape(a: unknown, b: unknown) {
  if (Array.isArray(a)) return Array.isArray(b);
  if (a && typeof a === "object") return !!b && typeof b === "object" && !Array.isArray(b);
  return typeof a === typeof b;
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
