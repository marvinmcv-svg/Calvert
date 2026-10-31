import { ChevronRight, ArrowUpRight } from "lucide-react";
import type { MediaKey } from "@/data/media";
import { UI } from "@/data/dictionary";
import type { L, Lang } from "@/lib/i18n-types";
import { cn } from "@/lib/utils";
import { LLink } from "@/components/ui/llink";
import { Pic } from "@/components/ui/pic";
import { Txt } from "@/components/ui/txt";
import { Container, Kicker, Section } from "@/components/ui/section";
import { Choreo, Words } from "@/components/home/motion";
import { ButtonLink } from "@/components/ui/button";
import { Star } from "@/components/brand/logo";

export type Crumb = { label: L; href?: string };

export function Breadcrumbs({ lang, items, dark }: { lang: Lang; items: Crumb[]; dark?: boolean }) {
  const all: Crumb[] = [{ label: UI.home, href: "/" }, ...items];
  return (
    <nav aria-label={UI.breadcrumb[lang]}>
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", dark ? "text-white/80" : "text-mist")}>
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5 opacity-60" />}
            {c.href && i < all.length - 1 ? (
              <LLink href={c.href} className="link-underline hover:text-current">
                {c.label[lang]}
              </LLink>
            ) : (
              <span aria-current={i === all.length - 1 ? "page" : undefined} className={dark ? "text-white" : "text-forest-900"}>
                {c.label[lang]}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: all.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.label[lang],
              ...(c.href ? { item: `/${lang}${c.href === "/" ? "" : c.href}` } : {}),
            })),
          }),
        }}
      />
    </nav>
  );
}

/** Full-bleed photo hero for inner pages. Shade only where the text sits. */
export function PageHero({
  lang,
  crumbs,
  kicker,
  title,
  intro,
  photo,
  position,
  actions,
}: {
  lang: Lang;
  crumbs: Crumb[];
  kicker: L;
  title: L;
  intro?: L;
  photo: MediaKey;
  position?: string;
  actions?: React.ReactNode;
}) {
  return (
    <Choreo>
      <header className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-forest-900 pb-14 pt-40 text-white sm:min-h-[40rem] sm:pb-20">
        <div className="absolute inset-0 -z-10">
          <div data-parallax="8" className="absolute -inset-y-[10%] inset-x-0">
            <Pic k={photo} lang={lang} sizes="100vw" priority className="h-full w-full" imgClassName="acs-kenburns" position={position} />
          </div>
          <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-forest-950/70 to-transparent" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_100%,rgb(0_26_13/0.88)_0%,rgb(0_26_13/0.55)_45%,transparent_75%)]"
          />
        </div>
        <Container>
          <Breadcrumbs lang={lang} items={crumbs} dark />
          <div className="mt-8 max-w-4xl">
            <Kicker dark>{kicker[lang]}</Kicker>
            <h1 className="mt-5 text-[2.75rem] leading-[1] tracking-[-0.022em] text-balance sm:text-6xl lg:text-7xl">
              <Words text={title[lang]} />
            </h1>
            {intro && (
              <p data-rise className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
                <Txt>{intro[lang]}</Txt>
              </p>
            )}
            {actions && (
              <div data-rise className="mt-8 flex flex-wrap gap-3">
                {actions}
              </div>
            )}
          </div>
        </Container>
      </header>
    </Choreo>
  );
}

export function SectionHead({
  lang,
  kicker,
  title,
  intro,
  more,
  dark,
  id,
  center,
}: {
  lang: Lang;
  kicker?: L;
  title: L;
  intro?: L;
  more?: { label: L; href: string };
  dark?: boolean;
  id?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between", center && "items-center text-center lg:flex-col lg:items-center")}>
      <div className={cn("max-w-3xl", center && "mx-auto")}>
        {kicker && <Kicker dark={dark} className={center ? "justify-center" : undefined}>{kicker[lang]}</Kicker>}
        <h2 id={id} className={cn("mt-4 text-4xl leading-[1.04] text-balance sm:text-5xl lg:text-[3.5rem]", dark ? "text-white" : "text-forest-900")}>
          <Words text={title[lang]} />
        </h2>
        {intro && (
          <p data-rise className={cn("mt-5 text-lg leading-relaxed text-pretty", dark ? "text-white/80" : "text-mist")}>
            <Txt>{intro[lang]}</Txt>
          </p>
        )}
      </div>
      {more && (
        <LLink
          href={more.href}
          className={cn("group inline-flex shrink-0 items-center gap-1.5 font-semibold link-gold", dark ? "text-white" : "text-forest-800")}
        >
          {more.label[lang]}
          <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </LLink>
      )}
    </div>
  );
}

export function Split({
  lang,
  photo,
  kicker,
  title,
  body,
  reverse,
  children,
  position,
}: {
  lang: Lang;
  photo: MediaKey;
  kicker?: L;
  title: L;
  body?: L[];
  reverse?: boolean;
  children?: React.ReactNode;
  position?: string;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <div data-clip className={cn("relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[5/4] lg:aspect-[4/5]", reverse && "lg:order-2")}>
        <Pic k={photo} lang={lang} sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full" position={position} />
      </div>
      <div>
        {kicker && <Kicker>{kicker[lang]}</Kicker>}
        <h2 className="mt-4 text-4xl leading-[1.05] text-forest-900 text-balance sm:text-5xl">
          <Words text={title[lang]} />
        </h2>
        {body?.map((p, i) => (
          <p key={i} data-rise className="mt-5 text-lg leading-relaxed text-mist text-pretty">
            <Txt>{p[lang]}</Txt>
          </p>
        ))}
        {children && (
          <div data-rise className="mt-8">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export function IconCards({
  lang,
  items,
  cols = 3,
  dark,
}: {
  lang: Lang;
  items: { title: L; text: L; figure?: string }[];
  cols?: 2 | 3 | 4;
  dark?: boolean;
}) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <ul className={cn("grid gap-4", grid)}>
      {items.map((it, i) => (
        <li
          key={i}
          data-rise
          className={cn(
            "group relative overflow-hidden rounded-[1.75rem] p-7 transition-shadow duration-500",
            dark ? "bg-white/6 ring-1 ring-inset ring-white/12" : "bg-white shadow-soft ring-1 ring-forest-800/6 hover:shadow-xl",
          )}
        >
          {it.figure ? (
            <p className={cn("font-display text-4xl tabular-nums", dark ? "text-gold-300" : "text-cougar-600")}>{it.figure}</p>
          ) : (
            <Star className="h-5 w-5" />
          )}
          <h3 className={cn("mt-4 font-display text-[1.45rem] leading-snug", dark ? "text-white" : "text-forest-900")}>{it.title[lang]}</h3>
          <p className={cn("mt-2.5 leading-relaxed", dark ? "text-white/75" : "text-mist")}>
            <Txt>{it.text[lang]}</Txt>
          </p>
        </li>
      ))}
    </ul>
  );
}

export function Prose({ lang, paras, className }: { lang: Lang; paras: L[]; className?: string }) {
  return (
    <div className={cn("max-w-3xl space-y-5 text-lg leading-relaxed text-charcoal/85", className)}>
      {paras.map((p, i) => (
        <p key={i} data-rise className="text-pretty">
          <Txt>{p[lang]}</Txt>
        </p>
      ))}
    </div>
  );
}

export function Checklist({ lang, items, dark }: { lang: Lang; items: L[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} data-rise className={cn("flex gap-3 leading-relaxed", dark ? "text-white/85" : "text-charcoal/85")}>
          <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold-500" />
          <span>
            <Txt>{it[lang]}</Txt>
          </span>
        </li>
      ))}
    </ul>
  );
}

export type Related = { href: string; title: L; text: L; photo: MediaKey };

export function RelatedLinks({ lang, items }: { lang: Lang; items: Related[] }) {
  return (
    <Section tone="cream">
      <Container>
        <SectionHead lang={lang} kicker={UI.related} title={{ en: "Where to next?", es: "¿A dónde vamos ahora?" }} />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((r) => (
            <li key={r.href} data-rise>
              <LLink href={r.href} className="img-zoom group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[4/3] md:aspect-[4/5]">
                <Pic k={r.photo} lang={lang} sizes="(min-width: 768px) 30vw, 100vw" className="absolute inset-0" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-forest-950/90 via-forest-950/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-display text-2xl leading-tight">{r.title[lang]}</h3>
                  <p className="mt-1.5 text-sm text-white/80">{r.text[lang]}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
                    {UI.learnMore[lang]}
                    <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </LLink>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** Closing call to action on an aurora surface. */
export function CtaBand({ lang, title, text }: { lang: Lang; title: L; text?: L }) {
  return (
    <Section tone="aurora">
      <Container className="text-center">
        <h2 className="mx-auto max-w-4xl text-4xl leading-[1.03] text-balance sm:text-6xl">
          <Words text={title[lang]} />
        </h2>
        {text && (
          <p data-rise className="mx-auto mt-5 max-w-xl text-lg text-white/80">
            {text[lang]}
          </p>
        )}
        <div data-rise className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="https://acs.pulsedu.com" variant="gold" size="lg">
            {UI.applyNow[lang]}
          </ButtonLink>
          <ButtonLink href="/admissions/visit" variant="glass" size="lg">
            {UI.bookTour[lang]}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

/** Wraps an inner page so its sections share one choreography scope. */
export function PageBody({ children }: { children: React.ReactNode }) {
  return <Choreo>{children}</Choreo>;
}
