import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "acs_admin";
const TTL_MS = 12 * 60 * 60 * 1000;

function creds() {
  const u = process.env.ADMIN_USERNAME ?? "";
  const p = process.env.ADMIN_PASSWORD ?? "";
  return u && p.length >= 8 ? { u, p } : null;
}

export function adminConfigured() {
  return creds() !== null;
}

/** Signing key derived from the credentials, so changing either one signs everyone out. */
function key() {
  const c = creds();
  if (!c) throw new Error("Admin is not configured");
  return createHmac("sha256", "acs-calvert-admin").update(`${c.u}\u0000${c.p}`).digest();
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function checkCredentials(username: string, password: string) {
  const c = creds();
  if (!c) return false;
  // Compare both, always, to keep timing constant.
  const okU = safeEqual(createHmac("sha256", "u").update(username).digest("hex"), createHmac("sha256", "u").update(c.u).digest("hex"));
  const okP = safeEqual(createHmac("sha256", "p").update(password).digest("hex"), createHmac("sha256", "p").update(c.p).digest("hex"));
  return okU && okP;
}

export function sessionToken() {
  const exp = String(Date.now() + TTL_MS);
  const sig = createHmac("sha256", key()).update(exp).digest("hex");
  return `${exp}.${sig}`;
}

export async function setSession() {
  (await cookies()).set(COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: TTL_MS / 1000,
  });
}

export async function clearSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!creds()) return false;
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!raw) return false;
  const [exp, sig] = raw.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = createHmac("sha256", key()).update(exp).digest("hex");
  return safeEqual(sig, expected);
}

/** Rejects cross-site writes. */
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
