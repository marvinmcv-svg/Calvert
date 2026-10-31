"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { RESOURCES, RESOURCE_GROUPS, type Audience } from "@/data/resources";
import { useLang } from "@/lib/lang-context";
import { cn } from "@/lib/utils";
import { LLink } from "@/components/ui/llink";

const AUDIENCES: { id: "any" | Audience; label: { en: string; es: string } }[] = [
  { id: "any", label: { en: "Everyone", es: "Todos" } },
  { id: "all", label: { en: "All school", es: "Todo el colegio" } },
  { id: "elementary", label: { en: "Elementary", es: "Primaria" } },
  { id: "secondary", label: { en: "Secondary", es: "Secundaria" } },
];

/** Every family link, grouped and filterable by audience, language and keyword. */
export function ParentsHub() {
  const { tr } = useLang();
  const [aud, setAud] = useState<(typeof AUDIENCES)[number]["id"]>("any");
  const [docLang, setDocLang] = useState<"any" | "en" | "es">("any");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      RESOURCES.filter((r) => aud === "any" || r.audience === aud || (aud !== "all" && r.audience === "all"))
        .filter((r) => docLang === "any" || r.lang === docLang || r.lang === "both")
        .filter((r) => !q || `${r.title.en} ${r.title.es}`.toLowerCase().includes(q.toLowerCase())),
    [aud, docLang, q],
  );

  const chip = (active: boolean) =>
    cn("pressable h-11 rounded-full px-4 text-sm font-semibold", active ? "bg-forest-800 text-white" : "bg-white text-forest-800 ring-1 ring-inset ring-forest-800/15 hover:bg-cream");

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-[1.75rem] bg-white p-5 shadow-soft ring-1 ring-forest-800/6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label={tr({ en: "Audience", es: "Público" })} className="flex flex-wrap gap-2">
          {AUDIENCES.map((a) => (
            <button key={a.id} type="button" aria-pressed={aud === a.id} onClick={() => setAud(a.id)} className={chip(aud === a.id)}>
              {tr(a.label)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label={tr({ en: "Document language", es: "Idioma del documento" })} className="flex gap-2">
            {(["any", "en", "es"] as const).map((x) => (
              <button key={x} type="button" aria-pressed={docLang === x} onClick={() => setDocLang(x)} className={chip(docLang === x)}>
                {x === "any" ? tr({ en: "EN + ES", es: "EN + ES" }) : x.toUpperCase()}
              </button>
            ))}
          </div>
          <label className="relative block">
            <span className="sr-only">{tr({ en: "Search documents", es: "Buscar documentos" })}</span>
            <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tr({ en: "Search…", es: "Buscar…" })}
              className="h-11 w-full rounded-full bg-cream pl-10 pr-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-gold-500 sm:w-56"
            />
          </label>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {list.length} {tr({ en: "results", es: "resultados" })}
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {RESOURCE_GROUPS.map((g) => {
          const items = list.filter((r) => r.group === g.id);
          if (!items.length) return null;
          return (
            <section key={g.id} aria-labelledby={`grp-${g.id}`}>
              <h2 id={`grp-${g.id}`} className="font-display text-2xl text-forest-900">{tr(g.label)}</h2>
              <ul className="mt-4 space-y-2">
                {items.map((r) => (
                  <li key={r.href + r.title.en}>
                    <LLink href={r.href} className="group flex min-h-12 items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-forest-800/8 transition hover:bg-cream">
                      <span className="min-w-0">
                        <span className="block font-semibold leading-snug text-forest-900">{tr(r.title)}</span>
                        <span className="mt-0.5 flex flex-wrap gap-1.5 text-xs text-mist">
                          {r.year && <span>{r.year}</span>}
                          <span className="uppercase">{r.lang === "both" ? "EN/ES" : r.lang}</span>
                          {r.stale && <span className="rounded bg-amber-50 px-1.5 font-semibold text-amber-900">⚑ {tr(r.stale)}</span>}
                        </span>
                      </span>
                      <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-mist transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </LLink>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
