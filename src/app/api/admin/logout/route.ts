import { NextResponse } from "next/server";
import { clearSession, sameOrigin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  await clearSession();
  return NextResponse.json({ ok: true });
}
