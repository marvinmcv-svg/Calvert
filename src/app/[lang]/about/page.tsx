import type { Metadata } from "next";
import { IDENTITY, CORE_VALUES, LEARNING_PRINCIPLES, LEARNING_PRINCIPLES_CLOSING, COMMUNITY_COMMITMENT, FACTS } from "@/data/profile";
import { RESOURCES } from "@/data/resources";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, Split, RelatedLinks, CtaBand, Checklist } from "@/components/page-kit";
import { Container, Section, Kicker } from "@/components/ui/section";
import { Txt } from "@/components/ui/txt";
import { Words } from "@/components/home/motion";
import { LLink } from "@/components/ui/llink";

const TITLE = l("A supportive community, since 1955.", "Una comunidad solidaria, desde 1955.");

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/about", title: l("About ACS: mission, vision and the 5 Cs", "Sobre ACS: misión, visión y las 5 C"), description: IDENTITY.positioning, photo: "campusCourtyard" });
}

export default async function AboutPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const plan = RESOURCES.filter((r) => r.title.en.startsWith("Strategic Plan"));
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Discover ACS", "Conoce ACS") }]} kicker={l("Discover ACS", "Conoce ACS")} title={TITLE} intro={IDENTITY.positioning} photo="campusCourtyard" />
      <PageBody>
        <Section id="mission">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <Kicker>{l("Our mission", "Nuestra misión")[lang]}</Kicker>
                <p className="mt-6 font-display text-3xl leading-snug text-forest-900 text-balance sm:text-4xl">
                  <Words text={IDENTITY.mission[lang]} />
                </p>
              </div>
              <div className="lg:pt-14">
                <Kicker>{l("Our vision", "Nuestra visión")[lang]}</Kicker>
                <p data-rise className="mt-6 font-display text-3xl leading-snug text-cougar-700 sm:text-4xl">{IDENTITY.vision[lang]}</p>
                <div data-rise className="mt-10 space-y-3 text-lg leading-relaxed text-mist">
                  <p>{FACTS.type[lang]}</p>
                  <p>{FACTS.language[lang]}</p>
                  <p>{FACTS.support[lang]}</p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="values" tone="forest">
          <Container>
            <SectionHead lang={lang} dark kicker={l("Our values", "Nuestros valores")} title={l("The 5 Cs.", "Las 5 C.")} intro={l("Five values guide how we learn, lead and care for one another.", "Cinco valores guían cómo aprendemos, lideramos y nos cuidamos.")} />
            <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {CORE_VALUES.map((v, i) => (
                <li key={v.name.en} data-rise className="rounded-[1.75rem] bg-white/6 p-6 ring-1 ring-inset ring-white/12">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-400 font-display text-2xl text-forest-900">C</span>
                  <p className="mt-2 font-display text-xs text-white/50">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-display text-2xl text-white">{v.name[lang]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75"><Txt>{v.text[lang]}</Txt></p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        <Section id="how-we-learn">
          <Container>
            <SectionHead lang={lang} kicker={l("ACS Learning Principles", "Principios de Aprendizaje de ACS")} title={l("How we learn.", "Cómo aprendemos.")} intro={LEARNING_PRINCIPLES_CLOSING} />
            <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {LEARNING_PRINCIPLES.map((p, i) => (
                <li key={p.en} data-rise className="border-t border-forest-800/12 pt-5">
                  <span className="font-display text-5xl text-cougar-500/70 tabular-nums">{i + 1}</span>
                  <p className="mt-3 font-display text-2xl leading-snug text-forest-900">{p[lang]}</p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        <Section id="commitment" tone="cream">
          <Container>
            <Split lang={lang} photo="graduationFaculty" kicker={l("Community commitment", "Compromiso comunitario")} title={l("Everyone shares the responsibility.", "La responsabilidad es de todos.")} body={[l("All ACS community members share the responsibility of living these principles and holding each other accountable to sustain a safe, respectful and thriving school environment.", "Todos los miembros de la comunidad ACS comparten la responsabilidad de vivir estos principios y de rendirse cuentas mutuamente para sostener un entorno escolar seguro, respetuoso y próspero.")]}>
              <div className="grid gap-8 sm:grid-cols-2">
                {COMMUNITY_COMMITMENT.map((c) => (
                  <div key={c.title.en}>
                    <h3 className="mb-4 font-display text-2xl text-forest-900">{c.title[lang]}</h3>
                    <Checklist lang={lang} items={c.items} />
                  </div>
                ))}
              </div>
            </Split>
          </Container>
        </Section>

        <Section id="strategic-plan">
          <Container>
            <div className="grid gap-8 rounded-[1.75rem] bg-white p-8 shadow-soft ring-1 ring-forest-800/6 sm:p-12 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div>
                <Kicker>{l("Strategic plan", "Plan estratégico")[lang]}</Kicker>
                <h2 className="mt-4 text-3xl text-forest-900 sm:text-4xl">{l("Where ACS is heading.", "Hacia dónde va ACS.")[lang]}</h2>
                <p className="mt-4 text-mist">
                  <Txt>{l("The 2019–2024 Strategic Plan is archived below. [[CONFIRM: is there a current strategic plan after 2024?]]", "El Plan Estratégico 2019–2024 está archivado abajo. [[CONFIRM: ¿existe un plan estratégico vigente posterior a 2024?]]")[lang]}</Txt>
                </p>
              </div>
              <ul className="space-y-3">
                {plan.map((r) => (
                  <li key={r.href}>
                    <LLink href={r.href} className="flex min-h-12 items-center justify-between rounded-2xl bg-cream px-5 py-3 font-semibold text-forest-800 hover:bg-stone">
                      {r.title[lang]}
                      <span className="text-xs font-medium text-mist">{r.stale?.[lang]}</span>
                    </LLink>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        <RelatedLinks
          lang={lang}
          items={[
            { href: "/about/history", title: l("Our history", "Nuestra historia"), text: l("From 6 students in 1955 to today.", "De 6 estudiantes en 1955 a hoy."), photo: "historyCampus" },
            { href: "/about/leadership", title: l("Leadership", "Liderazgo"), text: l("Meet the people who lead ACS.", "Conoce a quienes lideran ACS."), photo: "teamInarra" },
            { href: "/about/safeguarding", title: l("Child protection", "Protección infantil"), text: l("How we keep every child safe.", "Cómo cuidamos a cada niño."), photo: "campusPlayground" },
          ]}
        />
        <CtaBand lang={lang} title={l("See our values in action.", "Mira nuestros valores en acción.")} />
      </PageBody>
    </>
  );
}
