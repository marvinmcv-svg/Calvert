import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DIVISIONS, getDivision, COUNSELING, UNIVERSITY_COUNSELING } from "@/data/academics";
import { UI } from "@/data/dictionary";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { isLang, l, LANGS } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, IconCards, Split, RelatedLinks, CtaBand, Checklist } from "@/components/page-kit";
import { Container, Section, Kicker } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Txt } from "@/components/ui/txt";

type Props = { params: Promise<{ lang: string; division: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => DIVISIONS.map((d) => ({ lang, division: d.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, division } = await params;
  const d = getDivision(division);
  if (!d || !isLang(lang)) return {};
  return pageMeta({ lang, path: `/academics/${d.slug}`, title: l(`${d.name.en} (${d.grades.en})`, `${d.name.es} (${d.grades.es})`), description: d.intro, photo: d.photo });
}

export default async function DivisionPage({ params }: Props) {
  const { lang, division } = await params;
  const d = getDivision(division);
  if (!d || !isLang(lang)) notFound();
  const others = DIVISIONS.filter((x) => x.slug !== d.slug);
  const isHS = d.slug === "high-school";
  const isElem = d.slug === "early-childhood" || d.slug === "elementary";
  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[{ label: l("Learning", "Aprendizaje"), href: "/academics" }, { label: d.name }]}
        kicker={d.kicker}
        title={d.title}
        intro={d.intro}
        photo={d.photo}
        actions={
          <>
            <ButtonLink href={SITE.portals.apply} variant="gold" size="lg">{UI.applyNow[lang]}</ButtonLink>
            <ButtonLink href="/admissions/visit" variant="glass" size="lg">{UI.bookTour[lang]}</ButtonLink>
          </>
        }
      />
      <PageBody>
        <Section>
          <Container>
            <SectionHead lang={lang} kicker={l("Highlights", "Lo destacado")} title={l(`What makes ${d.name.en} at ACS different.`, `Qué hace diferente a ${d.name.es} en ACS.`)} />
            <div className="mt-12">
              <IconCards lang={lang} items={d.highlights} cols={4} />
            </div>
          </Container>
        </Section>

        <Section tone="forest">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <div>
                <Kicker dark>{l("A day at ACS", "Un día en ACS")[lang]}</Kicker>
                <h2 className="mt-4 text-4xl leading-tight text-white sm:text-5xl">{d.hours}</h2>
                <p data-rise className="mt-5 text-white/70">{UI.sampleDay[lang]}</p>
              </div>
              <ol className="relative border-l border-white/15 pl-8">
                {d.dayInTheLife.map((s) => (
                  <li key={s.time} data-rise className="relative pb-7 last:pb-0">
                    <span aria-hidden className="absolute -left-[2.3rem] top-1.5 h-3 w-3 rounded-full bg-gold-400" />
                    <p className="font-display text-2xl text-gold-300 tabular-nums">{s.time}</p>
                    <p className="mt-1 text-lg text-white/85">{s.label[lang]}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </Section>

        <Section tone="cream">
          <Container>
            <Split lang={lang} photo={isElem ? "earlyChildhood" : "secondaryIpads"} reverse kicker={l("Support and well-being", "Apoyo y bienestar")} title={l("Known by name. Supported by a team.", "Conocido por su nombre. Acompañado por un equipo.")} body={[d.support]}>
              <Checklist lang={lang} items={isElem ? COUNSELING.elementary : COUNSELING.secondary} />
              <div className="mt-6 flex flex-wrap gap-3">
                {d.catalog && <ButtonLink href={d.catalog.href} variant="primary">{d.catalog.label[lang]}</ButtonLink>}
                <ButtonLink href="/academics/learning-services" variant="outline">{l("Learning Services", "Servicios de Aprendizaje")[lang]}</ButtonLink>
              </div>
              {d.leader && (
                <p className="mt-6 text-sm text-mist">
                  {l("Division leader", "Responsable del nivel")[lang]}: <span className="font-semibold text-forest-900">{d.leader.name}</span>, {d.leader.role[lang]}
                </p>
              )}
            </Split>
          </Container>
        </Section>

        {isHS && (
          <Section>
            <Container>
              <SectionHead lang={lang} kicker={l("University counseling", "Orientación universitaria")} title={UNIVERSITY_COUNSELING.title} intro={UNIVERSITY_COUNSELING.intro} more={{ label: UI.more, href: "/academics/university-counseling" }} />
              <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {UNIVERSITY_COUNSELING.timeline.map((t) => (
                  <li key={t.grade.en} data-rise className="rounded-[1.75rem] bg-white p-7 ring-1 ring-forest-800/8">
                    <p className="font-display text-2xl text-forest-900">{t.grade[lang]}</p>
                    <p className="mt-2 text-mist"><Txt>{t.text[lang]}</Txt></p>
                  </li>
                ))}
              </ol>
            </Container>
          </Section>
        )}

        <RelatedLinks
          lang={lang}
          items={others.map((o) => ({ href: `/academics/${o.slug}`, title: o.name, text: o.grades, photo: o.photo }))}
        />
        <CtaBand lang={lang} title={l("Come see a school day for yourself.", "Ven a vivir un día de clases.")} />
      </PageBody>
    </>
  );
}
