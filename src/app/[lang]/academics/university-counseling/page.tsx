import type { Metadata } from "next";
import { UNIVERSITY_COUNSELING } from "@/data/academics";
import { UNIVERSITIES_HISTORIC } from "@/data/profile";
import { RESOURCES } from "@/data/resources";
import { HOME } from "@/data/dictionary";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, IconCards, RelatedLinks, CtaBand } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { Txt } from "@/components/ui/txt";
import { ButtonLink } from "@/components/ui/button";
import { Star } from "@/components/brand/logo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/academics/university-counseling", title: l("University and career counseling", "Orientación universitaria y vocacional"), description: UNIVERSITY_COUNSELING.intro, photo: "graduatesTrio" });
}

export default async function UniversityCounselingPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const profile = RESOURCES.find((r) => r.group === "profile");
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Learning", "Aprendizaje"), href: "/academics" }, { label: l("University counseling", "Orientación universitaria") }]} kicker={l("University and career counseling", "Orientación universitaria y vocacional")} title={UNIVERSITY_COUNSELING.title} intro={UNIVERSITY_COUNSELING.intro} photo="graduationClass" position="center 30%" />
      <PageBody>
        <Section>
          <Container>
            <SectionHead lang={lang} kicker={l("The counseling timeline", "El camino de orientación")} title={l("Five years of guidance, one student at a time.", "Cinco años de orientación, un estudiante a la vez.")} />
            <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {UNIVERSITY_COUNSELING.timeline.map((t, i) => (
                <li key={t.grade.en} data-rise className="relative rounded-[1.75rem] bg-white p-7 ring-1 ring-forest-800/8">
                  <span className="font-display text-6xl text-cougar-500/30">{i + 1}</span>
                  <p className="mt-2 font-display text-2xl text-forest-900">{t.grade[lang]}</p>
                  <p className="mt-2 text-mist">{t.text[lang]}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12"><IconCards lang={lang} items={UNIVERSITY_COUNSELING.tools} /></div>
          </Container>
        </Section>
        <Section tone="dusk">
          <Container>
            <SectionHead lang={lang} dark kicker={l("Results", "Resultados")} title={HOME.matriculationTitle} intro={l("Historically, ACS graduates have gone on to universities including:", "Históricamente, los egresados de ACS han llegado a universidades como:")} />
            <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {UNIVERSITIES_HISTORIC.map((u) => (
                <li key={u} data-rise className="flex items-center gap-3 font-display text-3xl text-white sm:text-4xl"><Star className="h-4 w-4" />{u}</li>
              ))}
            </ul>
            <p data-rise className="mt-10 text-white/70"><Txt>{UNIVERSITY_COUNSELING.resultsNote[lang]}</Txt></p>
            {profile && (
              <div data-rise className="mt-8">
                <ButtonLink href={profile.href} variant="gold">{l("Download the School Profile", "Descargar el Perfil del colegio")[lang]} ({profile.year})</ButtonLink>
              </div>
            )}
          </Container>
        </Section>
        <Section tone="cream">
          <Container>
            <div data-rise className="flex flex-col gap-4 rounded-[1.75rem] bg-white p-8 ring-1 ring-forest-800/8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-2xl text-forest-900">{UNIVERSITY_COUNSELING.counselor.name}</p>
                <p className="text-cougar-700">{UNIVERSITY_COUNSELING.counselor.role[lang]}</p>
              </div>
              <ButtonLink href="/contact" variant="outline">{l("Contact the counseling office", "Contactar a consejería")[lang]}</ButtonLink>
            </div>
          </Container>
        </Section>
        <RelatedLinks lang={lang} items={[
          { href: "/academics/high-school", title: l("High School", "High School"), text: l("Two diplomas.", "Dos diplomas."), photo: "graduationFaculty" },
          { href: "/about/accreditation", title: l("Accreditation", "Acreditación"), text: l("Recognized on two continents.", "Reconocido en dos continentes."), photo: "graduationClass" },
          { href: "/community/alumni", title: l("Alumni", "Exalumnos"), text: l("Where Cougars go next.", "A dónde van los Cougars."), photo: "graduates70th" },
        ]} />
        <CtaBand lang={lang} title={l("Start the journey in La Paz.", "Empieza el camino en La Paz.")} />
      </PageBody>
    </>
  );
}
