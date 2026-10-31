import { Plus } from "lucide-react";
import type { Faq } from "@/data/admissions";
import type { Lang } from "@/lib/i18n-types";

/** Accessible accordion built on <details>, with FAQPage structured data. */
export function FaqList({ lang, items }: { lang: Lang; items: Faq[] }) {
  return (
    <>
      <div className="divide-y divide-forest-800/10 border-y border-forest-800/10">
        {items.map((f) => (
          <details key={f.q.en} className="group py-2" data-rise>
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-3 font-display text-xl text-forest-900 sm:text-2xl [&::-webkit-details-marker]:hidden">
              {f.q[lang]}
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream transition-transform duration-300 group-open:rotate-45">
                <Plus aria-hidden className="h-5 w-5 text-forest-800" />
              </span>
            </summary>
            <p className="max-w-3xl pb-5 pr-14 text-lg leading-relaxed text-mist">{f.a[lang]}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q[lang], acceptedAnswer: { "@type": "Answer", text: f.a[lang] } })),
          }),
        }}
      />
    </>
  );
}
