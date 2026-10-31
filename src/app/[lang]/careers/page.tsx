import type { Metadata } from "next";
import { CAREERS } from "@/data/careers";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, IconCards, Split, Checklist, RelatedLinks } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Txt } from "@/components/ui/txt";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/careers", title: l("Careers: join our team", "Trabaja con nosotros"), description: CAREERS.intro, photo: "secondaryIpads" });
}

export default async function CareersPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[{ label: l("Careers", "Trabaja con nosotros") }]}
        kicker={l("Join our team", "Únete al equipo")}
        title={CAREERS.title}
        intro={CAREERS.intro}
        photo="campusLawn"
        actions={<ButtonLink href={`mailto:${SITE.emailJobs}`} variant="gold" size="lg">{SITE.emailJobs}</ButtonLink>}
      />
      <PageBody>
        <Section>
          <Container>
            <SectionHead lang={lang} kicker={l("Why ACS", "Por qué ACS")} title={l("A place to do your best teaching.", "Un lugar para enseñar al máximo.")} />
            <div className="mt-12"><IconCards lang={lang} items={CAREERS.why} cols={4} /></div>
          </Container>
        </Section>
        <Section tone="cream" id="living-in-la-paz">
          <Container>
            <Split lang={lang} photo="campusCourtyard" kicker={l("Living in La Paz", "Vivir en La Paz")} title={l("A city in the clouds.", "Una ciudad entre las nubes.")}>
              <ul className="space-y-5">
                {CAREERS.laPaz.map((p) => (
                  <li key={p.title.en}>
                    <h3 className="font-display text-xl text-forest-900">{p.title[lang]}</h3>
                    <p className="mt-1 text-mist">{p.text[lang]}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6"><ButtonLink href={SITE.portals.newStaff} variant="outline">{l("New staff site", "Sitio para personal nuevo")[lang]}</ButtonLink></div>
            </Split>
          </Container>
        </Section>
        <Section>
          <Container>
            <div className="grid gap-8 lg:grid-cols-2">
              <div data-rise className="rounded-[1.75rem] bg-white p-8 ring-1 ring-forest-800/8 sm:p-10">
                <h2 className="font-display text-3xl text-forest-900">{l("How to apply", "Cómo postular")[lang]}</h2>
                <div className="mt-5"><Checklist lang={lang} items={CAREERS.apply} /></div>
                <p className="mt-6 text-mist">
                  {l("Teaching and leadership roles:", "Puestos docentes y directivos:")[lang]} <a className="link-underline font-semibold text-forest-800" href={`mailto:${SITE.emailJobs}`}>{SITE.emailJobs}</a>
                  <br />
                  {l("Support staff roles:", "Puestos de personal de apoyo:")[lang]} <a className="link-underline font-semibold text-forest-800" href={`mailto:${SITE.emailSupportJobs}`}>{SITE.emailSupportJobs}</a>
                </p>
              </div>
              <div data-rise className="rounded-[1.75rem] bg-forest-800 p-8 text-white sm:p-10">
                <h2 className="font-display text-3xl">{l("Current vacancies", "Vacantes actuales")[lang]}</h2>
                <p className="mt-4 text-white/80"><Txt>{CAREERS.vacanciesNote[lang]}</Txt></p>
                <p className="mt-6 text-sm text-white/70">{CAREERS.protection[lang]}</p>
              </div>
            </div>
          </Container>
        </Section>
        <RelatedLinks lang={lang} items={[
          { href: "/about", title: l("Our mission", "Nuestra misión"), text: l("The 5 Cs and how we learn.", "Las 5 C y cómo aprendemos."), photo: "campusCourtyard" },
          { href: "/about/safeguarding", title: l("Child protection", "Protección infantil"), text: l("Our commitment.", "Nuestro compromiso."), photo: "campusPlayground" },
          { href: "/student-life/campus", title: l("Campus", "Campus"), text: l("Where you'd work.", "Donde trabajarías."), photo: "campusLawn" },
        ]} />
      </PageBody>
    </>
  );
}
