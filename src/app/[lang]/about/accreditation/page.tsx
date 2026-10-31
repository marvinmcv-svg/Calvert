import type { Metadata } from "next";
import Image from "next/image";
import { ACCREDITATION, FACTS } from "@/data/profile";
import { RESOURCES } from "@/data/resources";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, RelatedLinks, CtaBand } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { Txt } from "@/components/ui/txt";
import { LLink } from "@/components/ui/llink";

const TITLE = l("Accredited in the U.S. Recognized in Bolivia.", "Acreditado en EE. UU. Reconocido en Bolivia.");

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/about/accreditation", title: l("Accreditation and affiliations", "Acreditación y afiliaciones"), description: ACCREDITATION.intro, photo: "graduationClass" });
}

export default async function AccreditationPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const profile = RESOURCES.find((r) => r.group === "profile");
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Discover ACS", "Conoce ACS"), href: "/about" }, { label: l("Accreditation", "Acreditación") }]} kicker={l("Accreditation", "Acreditación")} title={TITLE} intro={ACCREDITATION.intro} photo="graduationClass" />
      <PageBody>
        <Section>
          <Container>
            <div data-rise className="rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-forest-800/6 sm:p-10">
              <Image src="/brand/accreditations-strip.png" alt={l("NEASC, AMISA and the Bolivian Ministry of Education", "NEASC, AMISA y Ministerio de Educación de Bolivia")[lang]} width={1612} height={233} sizes="(min-width: 1024px) 60rem, 90vw" className="mx-auto h-auto w-full max-w-4xl" />
            </div>
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {ACCREDITATION.bodies.map((b) => (
                <li key={b.name} data-rise className="rounded-[1.75rem] bg-white p-8 ring-1 ring-forest-800/8">
                  <p className="font-display text-3xl text-forest-900">{b.name}</p>
                  <p className="mt-1 text-sm font-semibold text-cougar-700">{b.full[lang]}</p>
                  <p className="mt-4 leading-relaxed text-mist"><Txt>{b.text[lang]}</Txt></p>
                </li>
              ))}
            </ul>
            <div data-rise className="mt-10 grid gap-6 rounded-[1.75rem] bg-forest-800 p-8 text-white sm:p-10 md:grid-cols-[2fr_1fr] md:items-center">
              <div>
                <h2 className="font-display text-3xl">{l("For universities", "Para universidades")[lang]}</h2>
                <p className="mt-3 text-white/80">{FACTS.diplomas[lang]}</p>
              </div>
              {profile && (
                <LLink href={profile.href} className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold-400 px-6 font-semibold text-forest-900 shadow-glow-gold">
                  {l("School Profile", "Perfil del colegio")[lang]} {profile.year}
                </LLink>
              )}
            </div>
          </Container>
        </Section>
        <RelatedLinks
          lang={lang}
          items={[
            { href: "/academics/high-school", title: l("Two diplomas", "Dos diplomas"), text: l("High School at ACS.", "High School en ACS."), photo: "graduationFaculty" },
            { href: "/academics/university-counseling", title: l("University counseling", "Orientación universitaria"), text: l("From La Paz to the world.", "De La Paz al mundo."), photo: "graduatesTrio" },
            { href: "/about/history", title: l("Our history", "Nuestra historia"), text: l("Accredited since 1968.", "Acreditado desde 1968."), photo: "historyCampus" },
          ]}
        />
        <CtaBand lang={lang} title={l("An education recognized on two continents.", "Una educación reconocida en dos continentes.")} />
      </PageBody>
    </>
  );
}
