import type { Metadata } from "next";
import { DIVISIONS, CURRICULUM } from "@/data/academics";
import { FACTS } from "@/data/profile";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, RelatedLinks, CtaBand, Split } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { Pic } from "@/components/ui/pic";
import { LLink } from "@/components/ui/llink";
import { ButtonLink } from "@/components/ui/button";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/academics", title: l("Learning at ACS: KG3 to Grade 12", "Aprendizaje en ACS: de KG3 a 12.º"), description: CURRICULUM.intro, photo: "elementaryIpad" });
}

export default async function AcademicsPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Learning", "Aprendizaje") }]} kicker={l("Learning and outcomes", "Aprendizaje y resultados")} title={CURRICULUM.title} intro={CURRICULUM.intro} photo="elementaryIpad" />
      <PageBody>
        <Section>
          <Container>
            <SectionHead lang={lang} kicker={l("Four divisions", "Cuatro niveles")} title={l("One journey, from KG3 to graduation.", "Un camino, de KG3 a la graduación.")} />
            <ol className="mt-12 space-y-5">
              {DIVISIONS.map((d, i) => (
                <li key={d.slug} data-rise>
                  <LLink href={`/academics/${d.slug}`} className="img-zoom group grid overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-forest-800/8 transition-shadow hover:shadow-xl md:grid-cols-[22rem_1fr]">
                    <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[16rem]">
                      <Pic k={d.photo} lang={lang} sizes="(min-width: 768px) 22rem, 100vw" className="absolute inset-0" />
                    </div>
                    <div className="flex flex-col justify-center p-7 sm:p-10">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cougar-700">{String(i + 1).padStart(2, "0")} · {d.grades[lang]} · {d.ages[lang]}</p>
                      <h2 className="mt-3 font-display text-3xl text-forest-900 sm:text-4xl">{d.name[lang]}</h2>
                      <p className="mt-2 font-display text-xl text-mist">{d.title[lang]}</p>
                      <p className="mt-4 text-sm text-mist">{l("School hours", "Horario")[lang]}: {d.hours}</p>
                    </div>
                  </LLink>
                </li>
              ))}
            </ol>
          </Container>
        </Section>
        <Section tone="cream">
          <Container>
            <Split lang={lang} photo="secondaryIpads" kicker={l("Curriculum and tools", "Currículo y herramientas")} title={l("Transparent by design.", "Transparente por diseño.")} body={[FACTS.language, l("Families follow progress in PowerSchool, and anyone can explore our curriculum maps in Atlas.", "Las familias siguen el progreso en PowerSchool y cualquiera puede explorar nuestros mapas curriculares en Atlas.")]}>
              <ul className="flex flex-wrap gap-2">
                {CURRICULUM.platforms.map((p) => (
                  <li key={p} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-forest-800 ring-1 ring-forest-800/10">{p}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={SITE.portals.atlas} variant="primary">{l("Explore Atlas", "Explorar Atlas")[lang]}</ButtonLink>
                <ButtonLink href="/community/parents" variant="outline">{l("Course descriptions", "Descripción de cursos")[lang]}</ButtonLink>
              </div>
            </Split>
          </Container>
        </Section>
        <RelatedLinks
          lang={lang}
          items={[
            { href: "/academics/learning-services", title: l("Learning Services", "Servicios de Aprendizaje"), text: l("ELL, learning support and counseling.", "ELL, apoyo al aprendizaje y consejería."), photo: "elementaryIpad" },
            { href: "/academics/university-counseling", title: l("University counseling", "Orientación universitaria"), text: l("100% admitted to their universities of choice.", "100% admitidos en la universidad de su elección."), photo: "graduatesTrio" },
            { href: "/academics/libraries", title: l("Libraries", "Bibliotecas"), text: l("The largest English-language collection in Bolivia.", "La mayor colección en inglés de Bolivia."), photo: "secondaryIpads" },
          ]}
        />
        <CtaBand lang={lang} title={l("Find your child's place at ACS.", "Encuentra el lugar de tu hijo o hija en ACS.")} />
      </PageBody>
    </>
  );
}
