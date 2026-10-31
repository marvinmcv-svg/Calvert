"use client";

import { useMemo, useState } from "react";
import { Calculator, Check, Printer } from "lucide-react";
import { GRADE_LADDER, TRANSFER_GUIDE, MINISTRY_NOTE, DOCUMENTS, type TransferOrigin } from "@/data/admissions";
import { useLang } from "@/lib/lang-context";
import { cn } from "@/lib/utils";

/** Age-based grade placement. The child must reach the grade's age by 30 June of the entry year. */
export function gradeFor(birth: Date, entryYear: number) {
  const cutoff = new Date(entryYear, 5, 30);
  let age = cutoff.getFullYear() - birth.getFullYear();
  const m = cutoff.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && cutoff.getDate() < birth.getDate())) age -= 1;
  const match = [...GRADE_LADDER].reverse().find((g) => age >= g.minAge);
  return { age, grade: age > 17 ? null : (match?.grade ?? null) };
}

export function GradeCalculator() {
  const { tr } = useLang();
  const now = new Date();
  const firstYear = now.getMonth() >= 9 ? now.getFullYear() + 1 : now.getFullYear();
  const years = [firstYear - 1, firstYear, firstYear + 1, firstYear + 2].filter((y) => y >= now.getFullYear() - 1);
  const [birth, setBirth] = useState("");
  const [year, setYear] = useState(firstYear);

  const result = useMemo(() => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birth)) return null;
    const [y, m, d] = birth.split("-").map(Number);
    return gradeFor(new Date(y, m - 1, d), year);
  }, [birth, year]);

  return (
    <div className="rounded-[1.75rem] bg-forest-800 p-7 text-white sm:p-10">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-300">
        <Calculator aria-hidden className="h-4 w-4" />
        {tr({ en: "Grade calculator", es: "Calculadora de grado" })}
      </p>
      <h3 className="mt-3 font-display text-3xl">{tr({ en: "Which grade will your child enter?", es: "¿A qué grado ingresaría tu hijo o hija?" })}</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          {tr({ en: "Date of birth", es: "Fecha de nacimiento" })}
          <input
            type="date"
            value={birth}
            max={now.toISOString().slice(0, 10)}
            onChange={(e) => setBirth(e.target.value)}
            className="mt-2 block min-h-12 w-full rounded-xl bg-white px-4 text-charcoal outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          />
        </label>
        <label className="block text-sm font-semibold">
          {tr({ en: "School year starting in August", es: "Año escolar que empieza en agosto" })}
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="mt-2 block min-h-12 w-full rounded-xl bg-white px-4 text-charcoal outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}–{String(y + 1).slice(2)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div aria-live="polite" className="mt-6 min-h-20 rounded-2xl bg-white/8 p-5 ring-1 ring-inset ring-white/12">
        {!result ? (
          <p className="text-white/70">{tr({ en: "Enter a date of birth to see the grade.", es: "Ingresa la fecha de nacimiento para ver el grado." })}</p>
        ) : result.grade ? (
          <p className="text-lg">
            {tr({ en: "Age on 30 June", es: "Edad al 30 de junio" })}: <strong>{result.age}</strong>.{" "}
            {tr({ en: "Eligible for", es: "Le corresponde" })} <strong className="font-display text-3xl text-gold-300">{tr(result.grade)}</strong>{" "}
            {tr({ en: "in", es: "en" })} {year}–{String(year + 1).slice(2)}.
          </p>
        ) : (
          <p className="text-lg">
            {result.age < 3
              ? tr({ en: "Your child will be under 3 on 30 June. KG3 starts once a child turns 3 by that date.", es: "Tu hijo o hija tendrá menos de 3 años al 30 de junio. KG3 comienza al cumplir 3 años hasta esa fecha." })
              : tr({ en: "Please contact admissions so we can advise on placement.", es: "Comunícate con admisiones para orientarte sobre la ubicación." })}
          </p>
        )}
      </div>
      <p className="mt-3 text-xs text-white/60">
        {tr({ en: "Final placement is confirmed by admissions after the assessments.", es: "La ubicación final la confirma admisiones después de las evaluaciones." })}
      </p>
    </div>
  );
}

const ORIGINS: TransferOrigin[] = ["bolivia-feb", "bolivia-aug", "abroad"];

export function TransferGuide() {
  const { tr } = useLang();
  const [origin, setOrigin] = useState<TransferOrigin | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const guide = origin ? TRANSFER_GUIDE[origin] : null;
  const items = guide ? [...DOCUMENTS.slice(3, 4), ...guide.checklist] : [];
  const unique = items.filter((it, i) => items.findIndex((x) => x.en === it.en) === i);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <fieldset>
        <legend className="font-display text-2xl text-forest-900">{tr({ en: "Where is your child studying now?", es: "¿Dónde estudia tu hijo o hija ahora?" })}</legend>
        <div className="mt-5 space-y-3">
          {ORIGINS.map((o) => (
            <label
              key={o}
              className={cn(
                "flex min-h-16 cursor-pointer items-center gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-forest-800/10 transition hover:bg-cream has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-500",
                origin === o && "bg-forest-800 text-white ring-forest-800 hover:bg-forest-800",
              )}
            >
              <input
                type="radio"
                name="origin"
                value={o}
                checked={origin === o}
                onChange={() => {
                  setOrigin(o);
                  setChecked({});
                }}
                className="sr-only"
              />
              <span aria-hidden className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full ring-2", origin === o ? "bg-gold-400 ring-gold-400" : "ring-forest-800/30")}>
                {origin === o && <Check className="h-4 w-4 text-forest-900" />}
              </span>
              <span className="font-semibold">{tr(TRANSFER_GUIDE[o].label)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite" className="rounded-[1.75rem] bg-white p-7 shadow-soft ring-1 ring-forest-800/6 sm:p-9">
        {!guide ? (
          <p className="text-lg text-mist">{tr({ en: "Choose an option to build your personal checklist.", es: "Elige una opción para armar tu lista personalizada." })}</p>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl text-forest-900">{tr({ en: "Your document checklist", es: "Tu lista de documentos" })}</h3>
              <button type="button" onClick={() => window.print()} className="pressable inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-forest-800 ring-1 ring-forest-800/15 hover:bg-cream print:hidden">
                <Printer aria-hidden className="h-4 w-4" />
                {tr({ en: "Print", es: "Imprimir" })}
              </button>
            </div>
            <ul className="mt-5 space-y-2">
              {[...DOCUMENTS.slice(0, 3), ...unique].map((it) => (
                <li key={it.en}>
                  <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl px-2 py-2 hover:bg-cream">
                    <input
                      type="checkbox"
                      checked={!!checked[it.en]}
                      onChange={(e) => setChecked((c) => ({ ...c, [it.en]: e.target.checked }))}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-forest-800"
                    />
                    <span className={cn(checked[it.en] && "text-mist line-through")}>{tr(it)}</span>
                  </label>
                </li>
              ))}
            </ul>
            <h4 className="mt-8 font-display text-xl text-forest-900">{tr({ en: "What it means for the calendar", es: "Qué significa para el calendario" })}</h4>
            <ul className="mt-3 space-y-2">
              {[...guide.calendar, MINISTRY_NOTE].map((c) => (
                <li key={c.en} className="flex gap-3 text-mist">
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold-500" />
                  {tr(c)}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
