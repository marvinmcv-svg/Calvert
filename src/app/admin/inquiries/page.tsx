import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { readJson } from "@/lib/storage";
import type { StoredInquiry } from "@/lib/inquiry-schema";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const list = await readJson<StoredInquiry[]>("inquiries", []);
  return (
    <main className="mx-auto max-w-6xl p-6 sm:p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl text-forest-900">Inquiries <span className="text-mist">({list.length})</span></h1>
        <Link href="/admin" className="font-semibold text-forest-800 underline">← Content editor</Link>
      </div>
      {list.length === 0 ? (
        <p className="mt-10 text-mist">No inquiries yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {list.map((q) => (
            <li key={q.id} className="rounded-2xl bg-white p-6 ring-1 ring-forest-800/8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-2xl text-forest-900">{q.parentName}</p>
                <p className="text-sm text-mist">{new Date(q.createdAt).toLocaleString("en-GB", { timeZone: "America/La_Paz" })} · {q.type === "tour" ? "Tour request" : "Inquiry"} · reply in {q.preferredLanguage.toUpperCase()}</p>
              </div>
              <p className="mt-2 text-sm">
                <a className="underline" href={`mailto:${q.email}`}>{q.email}</a>
                {q.phone ? ` · ${q.phone}` : ""} · Grade/age: <strong>{q.childGrade}</strong>
                {q.startDate ? ` · Start: ${q.startDate}` : ""}
                {q.currentSchool ? ` · Now: ${q.currentSchool}` : ""}
                {q.nationality ? ` · ${q.nationality}` : ""}
                {q.source ? ` · Heard via: ${q.source}` : ""}
              </p>
              {q.message && <p className="mt-3 whitespace-pre-wrap rounded-xl bg-cream p-4 text-charcoal">{q.message}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
