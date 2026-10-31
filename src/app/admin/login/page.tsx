"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { buttonClass } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: f.get("username"), password: f.get("password") }),
    });
    setBusy(false);
    if (res.ok) router.replace("/admin");
    else setError(res.status === 503 ? "Admin is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD (8+ characters)." : res.status === 429 ? "Too many attempts. Try again in a few minutes." : "Incorrect username or password.");
  }

  const field = "mt-2 block min-h-12 w-full rounded-xl bg-white px-4 ring-1 ring-forest-800/15 outline-none focus-visible:ring-2 focus-visible:ring-gold-500";
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-[1.75rem] bg-white p-8 shadow-soft">
        <Image src="/brand/acs-mark-512.png" alt="" width={56} height={56} />
        <h1 className="mt-4 text-3xl text-forest-900">Staff sign-in</h1>
        <label className="mt-6 block text-sm font-semibold">Username<input name="username" autoComplete="username" required className={field} /></label>
        <label className="mt-4 block text-sm font-semibold">Password<input name="password" type="password" autoComplete="current-password" required className={field} /></label>
        <p aria-live="assertive" className="mt-3 min-h-5 text-sm font-medium text-red-700">{error}</p>
        <button disabled={busy} className={buttonClass("primary", "md", "mt-2 w-full")}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );
}
