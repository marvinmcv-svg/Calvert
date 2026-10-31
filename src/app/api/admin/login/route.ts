import { NextResponse } from "next/server";
import { adminConfigured, checkCredentials, sameOrigin, setSession } from "@/lib/admin-auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!adminConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  if (!rateLimit(`admin-login:${clientIp(req)}`, 10, 10 * 60 * 1000)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  const body = (await req.json().catch(() => ({}))) as { username?: string; password?: string };
  if (!checkCredentials(String(body.username ?? ""), String(body.password ?? ""))) {
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }
  await setSession();
  return NextResponse.json({ ok: true });
}
