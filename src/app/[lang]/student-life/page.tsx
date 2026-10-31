import type { Metadata } from "next";
import { EXPERIENCES, TRADITIONS } from "@/data/student-life";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, CtaBand } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { Pic } from "@/components/ui/pic";
import { LLink } from "@/components/ui/llink";

const INTRO = l("Athletics, the arts, clubs and service: the moments students remember long after graduation.", "Deporte, artes, clubes y servicio: los momentos que los estudiantes recuerdan mucho después de graduarse.");

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/student-life", title: l("Student life at ACS", "Vida estudiantil en ACS"), description: INTRO, photo: "athleticsTrack" });
}

export default async function StudentLifePage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Student Life", "Vida estudiantil") }]} kicker={l("The Cougar experience", "La experiencia Cougar")} title={l("Life beyond the classroom.", "La vida más allá del aula.")} intro={INTRO} photo="campusPlayground" />
      <PageBody>
        <Section>
          <Container>
            <ul className="grid gap-5 md:grid-cols-2">
              <li data-rise className="md:col-span-2">
                <LLink href="/student-life/campus" className="img-zoom group relative block aspect-[16/9] overflow-hidden rounded-[1.75rem] md:aspect-[21/9]">
                  <Pic k="campusLawn" lang={lang} sizes="100vw" className="absolute inset-0" />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300">{l("Campus and facilities", "Campus e instalaciones")[lang]}</p>
                    <h2 className="mt-2 font-display text-4xl sm:text-5xl">{l("A historic hacienda in Calacoto.", "Una hacienda histórica en Calacoto.")[lang]}</h2>
                  </div>
                </LLink>
              </li>
              {EXPERIENCES.map((e) => (
                <li key={e.slug} data-rise>
                  <LLink href={`/student-life/${e.slug}`} className="img-zoom group relative block aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                    <Pic k={e.photo} lang={lang} sizes="(min-width: 768px) 45vw, 100vw" className="absolute inset-0" />
                    <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-forest-950/92 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300">{e.kicker[lang]}</p>
                      <h2 className="mt-2 font-display text-3xl">{e.name[lang]}</h2>
                      <p className="mt-1.5 max-w-md text-white/80">{e.summary[lang]}</p>
                    </div>
                  </LLink>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
        <Section tone="cream">
          <Container>
            <SectionHead lang={lang} kicker={l("Moments that make us", "Momentos que nos definen")} title={l("The rhythm of a Cougar year.", "El ritmo de un año Cougar.")} />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TRADITIONS.map((t) => (
                <li key={t.name.en} data-rise className="rounded-[1.5rem] bg-white p-6 ring-1 ring-forest-800/6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-cougar-700">{t.when[lang]}</p>
                  <h3 className="mt-2 font-display text-2xl text-forest-900">{t.name[lang]}</h3>
                  <p className="mt-1.5 text-mist">{t.text[lang]}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
        <CtaBand lang={lang} title={l("Find your team, your stage, your people.", "Encuentra tu equipo, tu escenario, tu gente.")} />
      </PageBody>
    </>
  );
}
