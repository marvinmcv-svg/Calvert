import { NextResponse } from "next/server";
import { inquirySchema, type StoredInquiry } from "@/lib/inquiry-schema";
import { readJson, writeJson } from "@/lib/storage";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!rateLimit(`inquiry:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }
  const json = await req.json().catch(() => null);

  // Honeypot filled: pretend success, store nothing.
  if (json && typeof json === "object" && "website" in json && String((json as { website?: unknown }).website ?? "").length > 0) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const lang = (json as { lang?: string }).lang === "es" ? "es" : "en";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { website, ...data } = parsed.data;
  const record: StoredInquiry = { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString(), lang };
  const all = await readJson<StoredInquiry[]>("inquiries", []);
  all.unshift(record);
  await writeJson("inquiries", all.slice(0, 5000));
  return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
}
