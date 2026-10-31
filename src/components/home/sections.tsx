"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck, CalendarDays } from "lucide-react";
import { HOME, UI } from "@/data/dictionary";
import { HEADLINE_STATS, LEARNING_PRINCIPLES, LEARNING_PRINCIPLES_CLOSING, CHILD_PROTECTION, UNIVERSITIES_HISTORIC } from "@/data/profile";
import { ADVANTAGE } from "@/data/home";
import { DIVISIONS, UNIVERSITY_COUNSELING } from "@/data/academics";
import { FACILITIES, TRADITIONS, type Tradition } from "@/data/student-life";
import { NEWS, EVENTS } from "@/data/content";
import { PHASES } from "@/data/admissions";
import { MEDIA } from "@/data/media";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/lang-context";
import { formatDate } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { LLink } from "@/components/ui/llink";
import { ButtonLink } from "@/components/ui/button";
import { Pic } from "@/components/ui/pic";
import { Txt } from "@/components/ui/txt";
import { Container, Kicker, Section } from "@/components/ui/section";
import { Star, Swoosh } from "@/components/brand/logo";
import { SocialIcon } from "@/components/brand/social-icons";
import { Words } from "./motion";

function Head({
  kicker,
  title,
  intro,
  more,
  dark,
  id,
}: {
  kicker: { en: string; es: string };
  title: { en: string; es: string };
  intro?: { en: string; es: string };
  more?: { label: { en: string; es: string }; href: string };
  dark?: boolean;
  id: string;
}) {
  const { tr } = useLang();
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <Kicker dark={dark}>{tr(kicker)}</Kicker>
        <h2 id={id} className={cn("mt-4 text-4xl leading-[1.03] text-balance sm:text-5xl lg:text-[3.6rem]", dark ? "text-white" : "text-forest-900")}>
          <Words text={tr(title)} />
        </h2>
        {intro && (
          <p data-rise className={cn("mt-5 max-w-2xl text-lg leading-relaxed", dark ? "text-white/80" : "text-mist")}>
            {tr(intro)}
          </p>
        )}
      </div>
      {more && (
        <LLink href={more.href} className={cn("group inline-flex shrink-0 items-center gap-1.5 font-semibold link-gold", dark ? "text-white" : "text-forest-800")}>
          {tr(more.label)}
          <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </LLink>
      )}
    </div>
  );
}

/* 2. Statistics */
export function Stats() {
  const { tr, lang } = useLang();
  return (
    <Section tone="aurora" labelledBy="stats-title">
      <Container>
        <Head id="stats-title" dark kicker={HOME.statsKicker} title={HOME.statsTitle} more={{ label: { en: "Our history", es: "Nuestra historia" }, href: "/about/history" }} />
        <dl className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {HEADLINE_STATS.map((s) => (
            <div key={s.label.en} data-rise className="border-t border-white/15 pt-6">
              <dt className="sr-only">{tr(s.label)}</dt>
              <dd>
                <span className="block font-display text-[5rem] leading-none tracking-[-0.04em] tabular-nums sm:text-[6rem] lg:text-[7.5rem]">
                  <span data-count={s.value}>{s.value.toLocaleString(lang)}</span>
                  <span className="text-gold-400">{s.suffix}</span>
                </span>
                <span aria-hidden className="mt-3 block text-lg font-semibold text-white">{tr(s.label)}</span>
                <span className="mt-1 block text-sm text-white/65">{tr(s.note)}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div data-rise className="mt-16 flex flex-col gap-5 rounded-[1.75rem] bg-white/95 p-5 sm:flex-row sm:items-center sm:gap-10 sm:px-8">
          <p className="shrink-0 text-xs font-bold uppercase tracking-[0.16em] text-forest-800">{tr(HOME.accreditedBy)}</p>
          <Image
            src="/brand/accreditations-strip.png"
            alt={tr({ en: "NEASC, AMISA and the Bolivian Ministry of Education", es: "NEASC, AMISA y Ministerio de Educación de Bolivia" })}
            width={1612}
            height={233}
            sizes="(min-width: 640px) 40rem, 90vw"
            className="h-auto w-full max-w-2xl"
          />
        </div>
      </Container>
    </Section>
  );
}

/* 3. The Advantage */
export function Advantage() {
  const { tr, lang } = useLang();
  const spans = ["lg:col-span-7 lg:row-span-2", "lg:col-span-5", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
  return (
    <Section id="advantage" tone="paper" labelledBy="advantage-title">
      <Container>
        <Head id="advantage-title" kicker={HOME.advantageKicker} title={HOME.advantageTitle} intro={HOME.advantageIntro} more={{ label: UI.more, href: "/about" }} />
        <ul className="mt-14 grid auto-rows-[19rem] gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {ADVANTAGE.map((t, i) => (
            <li key={t.label.en} data-rise className={cn("sm:col-span-1", spans[i], i === 0 && "sm:col-span-2 sm:row-span-2")}>
              <LLink href={t.href} className="img-zoom group relative block h-full overflow-hidden rounded-[1.75rem] bg-forest-900">
                <Pic k={t.photo} lang={lang} sizes={i === 0 ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"} className="absolute inset-0" position={t.position} />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-forest-950/92 via-forest-950/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                  <p className={cn("font-display leading-none tracking-[-0.03em] tabular-nums", i === 0 ? "text-7xl sm:text-8xl" : "text-5xl")}>{t.figure}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-gold-300">{tr(t.label)}</p>
                  <p className="mt-1.5 max-w-sm text-[0.97rem] leading-snug text-white/90">{tr(t.line)}</p>
                </div>
              </LLink>
            </li>
          ))}
        </ul>

        <div className="mt-24 grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <Kicker>{tr(HOME.principlesTitle)}</Kicker>
            <p className="mt-4 font-display text-4xl leading-tight text-forest-900 text-balance">
              <Words text={tr(LEARNING_PRINCIPLES_CLOSING)} />
            </p>
          </div>
          <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNING_PRINCIPLES.map((p, i) => (
              <li key={p.en} data-rise className="border-t border-forest-800/12 pt-4">
                <span className="font-display text-sm text-cougar-700 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1.5 text-lg font-medium leading-snug text-forest-900">{tr(p)}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/* 4. Safety and well-being */
export function Safety() {
  const { tr, lang } = useLang();
  return (
    <Section tone="cream" labelledBy="safety-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-clip className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[4/3] lg:aspect-[4/5]">
            <Pic k="campusCourtyard" lang={lang} sizes="(min-width: 1024px) 45vw, 100vw" className="absolute inset-0" />
          </div>
          <div>
            <Kicker>{tr(HOME.safetyKicker)}</Kicker>
            <h2 id="safety-title" className="mt-4 text-4xl leading-[1.03] text-forest-900 text-balance sm:text-5xl lg:text-[3.6rem]">
              <Words text={tr(HOME.safetyTitle)} />
            </h2>
            <p data-rise className="mt-5 text-lg leading-relaxed text-mist">{tr(CHILD_PROTECTION.intro)}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {CHILD_PROTECTION.practices.map((p) => (
                <li key={p.title.en} data-rise className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-forest-800/6">
                  <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-cougar-600" />
                  <span>
                    <span className="block font-semibold text-forest-900">{tr(p.title)}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-mist">{tr(p.text)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <LLink href="/about/safeguarding" className="link-gold mt-8 inline-flex items-center gap-1.5 font-semibold text-forest-800">
              {tr({ en: "Our child protection commitment", es: "Nuestro compromiso de protección infantil" })}
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </LLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* 5. Two diplomas */
export function Diplomas() {
  const { tr } = useLang();
  const cards = [
    {
      flag: "🇺🇸",
      title: { en: "U.S. High School Diploma", es: "Diploma de secundaria de EE. UU." },
      points: [
        { en: "U.S. standards-based curriculum, taught in English", es: "Currículo basado en estándares de EE. UU., en inglés" },
        { en: "U.S. accredited", es: "Acreditación estadounidense" },
        { en: "Applications to universities in 25+ countries with Cialfo", es: "Postulaciones a universidades en más de 25 países con Cialfo" },
      ],
    },
    {
      flag: "🇧🇴",
      title: { en: "Bolivian Bachillerato", es: "Bachillerato boliviano" },
      points: [
        { en: "Bolivian Ministry of Education approval since 1968", es: "Aprobación del Ministerio de Educación desde 1968" },
        { en: "Opens the door to Bolivian universities", es: "Abre la puerta a las universidades bolivianas" },
        { en: "Earned alongside the U.S. diploma", es: "Se obtiene junto al diploma estadounidense" },
      ],
    },
  ];
  return (
    <Section tone="paper" labelledBy="diploma-title">
      <Container>
        <Head id="diploma-title" kicker={HOME.diplomaKicker} title={HOME.diplomaTitle} more={{ label: UI.more, href: "/academics/high-school" }} />
        <div className="relative mt-14 grid gap-5 md:grid-cols-2">
          {cards.map((c, i) => (
            <article
              key={c.title.en}
              data-rise
              className={cn(
                "relative overflow-hidden rounded-[1.75rem] p-8 sm:p-10",
                i === 0 ? "bg-forest-800 text-white" : "bg-white text-forest-900 shadow-soft ring-1 ring-forest-800/8",
              )}
            >
              <Swoosh className={cn("absolute -right-16 -top-16 h-64 w-64", i === 0 ? "text-white/8" : "text-cougar-500/10")} />
              <span aria-hidden className="text-4xl">{c.flag}</span>
              <h3 className="mt-6 font-display text-3xl leading-tight sm:text-4xl">{tr(c.title)}</h3>
              <ul className="mt-6 space-y-3">
                {c.points.map((p) => (
                  <li key={p.en} className={cn("flex gap-3", i === 0 ? "text-white/85" : "text-charcoal/80")}>
                    <Star className="mt-1 h-4 w-4 shrink-0" />
                    {tr(p)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold-400 font-display text-2xl text-forest-900 shadow-glow-gold md:grid"
          >
            +
          </span>
        </div>
      </Container>
    </Section>
  );
}

/* 6. Academic journey */
export function Journey() {
  const { tr, lang } = useLang();
  return (
    <Section id="journey" tone="white" labelledBy="journey-title">
      <Container>
        <Head id="journey-title" kicker={HOME.journeyKicker} title={HOME.journeyTitle} more={{ label: UI.more, href: "/academics" }} />
        <ol className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {DIVISIONS.map((d, i) => (
            <li key={d.slug} data-rise>
              <LLink href={`/academics/${d.slug}`} className="img-zoom group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-forest-800/8 transition-shadow hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Pic k={d.photo} lang={lang} sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw" className="absolute inset-0" />
                  <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-display text-sm text-forest-900 backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-cougar-700">{tr(d.grades)}</p>
                  <h3 className="mt-2 font-display text-2xl text-forest-900">{tr(d.name)}</h3>
                  <p className="mt-2 flex-1 text-[0.97rem] leading-relaxed text-mist">{tr(d.title)}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800">
                    {tr(UI.learnMore)}
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </LLink>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* 7. The Cougar experience */
export function Experience() {
  const { tr, lang } = useLang();
  const withPhoto = FACILITIES.filter((f) => f.photo).slice(0, 3);
  const rest = FACILITIES.filter((f) => !f.photo).slice(0, 6);
  return (
    <Section id="experience" tone="forest" labelledBy="experience-title" className="overflow-hidden">
      <Swoosh className="absolute -left-40 top-10 h-[40rem] w-[40rem] text-cougar-500/8" />
      <Container className="relative">
        <Head id="experience-title" dark kicker={HOME.experienceKicker} title={HOME.experienceTitle} more={{ label: UI.more, href: "/student-life/campus" }} />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {withPhoto.map((f) => (
            <LLink key={f.slug} href={`/student-life/campus#${f.slug}`} data-rise className="img-zoom group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem]">
              <Pic k={f.photo!} lang={lang} sizes="(min-width: 1024px) 30vw, 100vw" className="absolute inset-0" />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-forest-950/92 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-display text-3xl text-white">{tr(f.name)}</h3>
                <p className="mt-2 text-white/80">{tr(f.text)}</p>
              </div>
            </LLink>
          ))}
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((f) => (
            <li key={f.slug} data-rise className="rounded-[1.75rem] bg-white/6 p-7 ring-1 ring-inset ring-white/12">
              {f.figure && <p className="font-display text-4xl text-gold-300 tabular-nums">{f.figure}</p>}
              <h3 className="mt-3 font-display text-2xl text-white">{tr(f.name)}</h3>
              <p className="mt-2 text-white/72">{tr(f.text)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* 8. Traditions rail */
const GROUPS: { id: "all" | Tradition["group"]; label: { en: string; es: string } }[] = [
  { id: "all", label: { en: "All", es: "Todos" } },
  { id: "academic", label: { en: "Academic", es: "Académicos" } },
  { id: "athletic", label: { en: "Athletics", es: "Deportes" } },
  { id: "community", label: { en: "Community", es: "Comunidad" } },
];

export function Traditions() {
  const { tr, lang } = useLang();
  const [group, setGroup] = useState<(typeof GROUPS)[number]["id"]>("all");
  const rail = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const items = useMemo(() => TRADITIONS.filter((t) => group === "all" || t.group === group), [group]);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 1);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  const scroll = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <Section tone="paper" labelledBy="traditions-title">
      <Container>
        <Head id="traditions-title" kicker={HOME.traditionsKicker} title={HOME.traditionsTitle} more={{ label: UI.more, href: "/student-life" }} />
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div role="tablist" aria-label={tr(HOME.traditionsKicker)} className="flex flex-wrap gap-2">
            {GROUPS.map((g) => (
              <button
                key={g.id}
                role="tab"
                type="button"
                aria-selected={group === g.id}
                onClick={() => {
                  setGroup(g.id);
                  rail.current?.scrollTo({ left: 0 });
                }}
                className={cn(
                  "pressable h-11 rounded-full px-5 text-sm font-semibold",
                  group === g.id ? "bg-forest-800 text-white" : "bg-white text-forest-800 ring-1 ring-inset ring-forest-800/15 hover:bg-cream",
                )}
              >
                {tr(g.label)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label={tr(UI.prev)} className="pressable grid h-11 w-11 place-items-center rounded-full bg-white ring-1 ring-forest-800/15 hover:bg-cream">
              <ArrowLeft aria-hidden className="h-5 w-5 text-forest-800" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label={tr(UI.next)} className="pressable grid h-11 w-11 place-items-center rounded-full bg-white ring-1 ring-forest-800/15 hover:bg-cream">
              <ArrowRight aria-hidden className="h-5 w-5 text-forest-800" />
            </button>
          </div>
        </div>
      </Container>
      <ul ref={rail} role="tabpanel" className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:scroll-px-8 sm:px-8 lg:scroll-px-12 lg:px-12 xl:px-[max(3rem,calc((100vw-90rem)/2+3rem))]">
        {items.map((t) => (
          <li key={t.name.en} className="w-[78vw] shrink-0 snap-start sm:w-[22rem]">
            <article className="img-zoom group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-forest-900">
              <Pic k={t.photo} lang={lang} sizes="(min-width: 640px) 22rem, 78vw" className="absolute inset-0" />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-forest-950/92 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300">{tr(t.when)}</p>
                <h3 className="mt-2 font-display text-2xl">{tr(t.name)}</h3>
                <p className="mt-1.5 text-sm leading-snug text-white/80">{tr(t.text)}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <Container>
        <div className="mt-6 h-[3px] overflow-hidden rounded-full bg-forest-800/10" aria-hidden>
          <div className="h-full rounded-full bg-gold-500 transition-[width] duration-300" style={{ width: `${Math.max(12, progress * 100)}%` }} />
        </div>
      </Container>
    </Section>
  );
}

/* 9 + 10. Matriculation and acceptances */
export function Matriculation() {
  const { tr } = useLang();
  const regions = [
    { name: { en: "United States", es: "Estados Unidos" }, n: "01" },
    { name: { en: "Europe", es: "Europa" }, n: "02" },
    { name: { en: "Latin America", es: "América Latina" }, n: "03" },
  ];
  return (
    <Section tone="dusk" labelledBy="matric-title" className="overflow-hidden">
      <Container>
        <Head
          id="matric-title"
          dark
          kicker={HOME.matriculationKicker}
          title={HOME.matriculationTitle}
          intro={UNIVERSITY_COUNSELING.intro}
          more={{ label: UI.more, href: "/academics/university-counseling" }}
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {regions.map((r) => (
            <div key={r.n} data-rise className="rounded-[1.75rem] bg-white/6 p-7 ring-1 ring-inset ring-white/12">
              <p className="font-display text-sm text-gold-300">{r.n}</p>
              <p className="mt-6 font-display text-3xl text-white">{tr(r.name)}</p>
              <p className="mt-1 text-sm text-white/65">{tr({ en: "Class of 2025 admissions", es: "Admisiones de la promoción 2025" })}</p>
            </div>
          ))}
        </div>
        <ol className="mt-12 grid gap-6 border-t border-white/12 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {UNIVERSITY_COUNSELING.timeline.map((t) => (
            <li key={t.grade.en} data-rise>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300">{tr(t.grade)}</p>
              <p className="mt-2 leading-relaxed text-white/80">{tr(t.text)}</p>
            </li>
          ))}
        </ol>
      </Container>
      <div className="marquee-wrap mt-20 border-y border-white/10 py-8">
        <Container>
          <p className="mb-5 text-sm text-white/65">{tr(HOME.acceptancesNote)}</p>
        </Container>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <ul className="marquee flex w-max gap-14" aria-label={tr(HOME.acceptancesKicker)}>
            {[...UNIVERSITIES_HISTORIC, ...UNIVERSITIES_HISTORIC, ...UNIVERSITIES_HISTORIC, ...UNIVERSITIES_HISTORIC].map((u, i) => (
              <li key={i} aria-hidden={i >= UNIVERSITIES_HISTORIC.length} className="flex items-center gap-14 font-display text-4xl text-white/90 sm:text-5xl">
                {u}
                <Star className="h-5 w-5" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* 11. Life at ACS */
export function Life() {
  const { tr, lang } = useLang();
  const [lead, ...rest] = NEWS;
  return (
    <Section id="life" tone="paper" labelledBy="life-title">
      <Container>
        <Head id="life-title" kicker={HOME.lifeKicker} title={HOME.lifeTitle} more={{ label: UI.allNews, href: "/news" }} />
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <LLink href={`/news/${lead.slug}`} data-rise className="img-zoom group relative block min-h-[28rem] overflow-hidden rounded-[1.75rem]">
            <Pic k={lead.photo} lang={lang} sizes="(min-width: 1024px) 55vw, 100vw" className="absolute inset-0" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-forest-950/92 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300">
                {tr(lead.category)} · <time dateTime={lead.date}>{formatDate(lead.date, lang, lead.precision)}</time>
              </p>
              <h3 className="mt-3 max-w-xl font-display text-3xl leading-tight sm:text-4xl">{tr(lead.title)}</h3>
              <p className="mt-2 max-w-lg text-white/80">{tr(lead.excerpt)}</p>
            </div>
          </LLink>
          <div className="grid gap-5">
            {rest.slice(0, 2).map((n) => (
              <LLink key={n.slug} href={`/news/${n.slug}`} data-rise className="img-zoom group grid grid-cols-[8rem_1fr] gap-5 rounded-[1.75rem] bg-white p-3 ring-1 ring-forest-800/8 transition-shadow hover:shadow-xl sm:grid-cols-[11rem_1fr]">
                <div className="relative overflow-hidden rounded-[1.25rem]">
                  <Pic k={n.photo} lang={lang} sizes="11rem" className="absolute inset-0" />
                </div>
                <div className="py-2 pr-2">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-cougar-700">
                    <time dateTime={n.date}>{formatDate(n.date, lang, n.precision)}</time>
                  </p>
                  <h3 className="mt-2 font-display text-xl leading-snug text-forest-900">{tr(n.title)}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-mist">{tr(n.excerpt)}</p>
                </div>
              </LLink>
            ))}
            <div data-rise className="rounded-[1.75rem] bg-cream p-6">
              <p className="flex items-center gap-2 font-display text-xl text-forest-900">
                <CalendarDays aria-hidden className="h-5 w-5 text-cougar-600" />
                {tr(HOME.eventsTitle)}
              </p>
              {EVENTS.length ? (
                <ul className="mt-3 space-y-2">
                  {EVENTS.slice(0, 3).map((e) => (
                    <li key={e.title.en} className="text-sm">
                      <time dateTime={e.date} className="font-semibold">{formatDate(e.date, lang)}</time> · {tr(e.title)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  <Txt>{tr(HOME.eventsEmpty)}</Txt>
                </p>
              )}
              <LLink href={SITE.portals.calendarPdf} className="link-gold mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800">
                {tr(HOME.eventsCta)}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </LLink>
            </div>
          </div>
        </div>
        <div data-rise className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] bg-forest-800 px-7 py-5 text-white">
          <p className="font-display text-xl">{tr({ en: "Follow the Cougars", es: "Sigue a los Cougars" })}</p>
          <div className="flex gap-2">
            {(
              [
                ["facebook", SITE.socials.facebook, "Facebook"],
                ["youtube", SITE.socials.youtube, "YouTube"],
                ["instagram", SITE.socials.instagram, "Instagram"],
                ["x", SITE.socials.x, "X"],
              ] as const
            ).map(([name, href, label]) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="pressable grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white hover:text-forest-900">
                <SocialIcon name={name} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* 12. Admissions */
export function AdmissionsTeaser() {
  const { tr, lang } = useLang();
  return (
    <Section id="admissions" tone="cream" labelledBy="adm-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <Head id="adm-title" kicker={HOME.admissionsKicker} title={HOME.admissionsTitle} />
            <ol className="mt-12 space-y-4">
              {PHASES.map((p, i) => (
                <li key={p.title.en} data-rise className="flex gap-5 rounded-[1.5rem] bg-white p-6 ring-1 ring-forest-800/6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest-800 font-display text-xl text-gold-300">{i + 1}</span>
                  <span>
                    <span className="block font-display text-2xl text-forest-900">{tr(p.title)}</span>
                    <span className="mt-1 block text-mist">{tr(p.text)}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div data-rise className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/admissions#inquire" variant="primary" size="lg">
                {tr(UI.inquire)}
              </ButtonLink>
              <ButtonLink href="/admissions" variant="outline" size="lg">
                {tr({ en: "How to apply", es: "Cómo postular" })}
              </ButtonLink>
            </div>
          </div>
          <div data-clip className="relative min-h-[28rem] overflow-hidden rounded-[1.75rem]">
            <Pic k="earlyChildhood" lang={lang} sizes="(min-width: 1024px) 45vw, 100vw" className="absolute inset-0" />
            <div className="absolute inset-x-4 bottom-4 rounded-[1.25rem] bg-paper/92 p-5 backdrop-blur">
              <p className="font-display text-xl text-forest-900">{tr({ en: "No English required for Early Childhood.", es: "No se requiere inglés para Educación Inicial." })}</p>
              <p className="mt-1 text-sm text-mist">{tr({ en: "KG3 and KG4 have open admission, subject to a readiness screening.", es: "KG3 y KG4 tienen admisión abierta, sujeta a una evaluación de madurez." })}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* 13. Final call to action */
export function FinalCta() {
  const { tr } = useLang();
  return (
    <Section tone="aurora" labelledBy="final-title" className="overflow-hidden">
      <Image src={MEDIA.campusLawn.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-20 mix-blend-luminosity" />
      <Container className="text-center">
        <Star className="mx-auto h-7 w-7" />
        <h2 id="final-title" className="mx-auto mt-6 max-w-4xl text-5xl leading-[1] text-balance sm:text-7xl">
          <Words text={tr(HOME.finalTitle)} />
        </h2>
        <p data-rise className="mx-auto mt-6 max-w-xl text-lg text-white/85">{tr(HOME.finalText)}</p>
        <div data-rise className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={SITE.portals.apply} variant="gold" size="lg">
            {tr(UI.applyNow)}
          </ButtonLink>
          <ButtonLink href="/admissions/visit" variant="glass" size="lg">
            {tr(UI.bookTour)}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
