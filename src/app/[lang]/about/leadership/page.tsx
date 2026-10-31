import type { Metadata } from "next";
import { LEADERSHIP, OTHER_CONTACTS, FACTS } from "@/data/profile";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, RelatedLinks } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { Pic } from "@/components/ui/pic";
import { Txt } from "@/components/ui/txt";
import { LLink } from "@/components/ui/llink";

const TITLE = l("The people who lead ACS.", "Las personas que lideran ACS.");
const INTRO = l("A leadership team and a parent-elected board, working for every learner.", "Un equipo directivo y un directorio elegido por los padres, trabajando por cada estudiante.");

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/about/leadership", title: l("Leadership and governance", "Liderazgo y gobierno"), description: INTRO, photo: "graduationFaculty" });
}

export default async function LeadershipPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Discover ACS", "Conoce ACS"), href: "/about" }, { label: l("Leadership", "Liderazgo") }]} kicker={l("Leadership and governance", "Liderazgo y gobierno")} title={TITLE} intro={INTRO} photo="graduationFaculty" />
      <PageBody>
        <Section>
          <Container>
            <SectionHead lang={lang} kicker={l("Our team", "Nuestro equipo")} title={l("Leadership team.", "Equipo directivo.")} />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {LEADERSHIP.map((p) => (
                <li key={p.name} data-rise className="overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-forest-800/6">
                  <div className="relative aspect-[4/5]">
                    <Pic k={p.photo} lang={lang} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="absolute inset-0" position="center 20%" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-forest-900">{p.name}</h3>
                    <p className="mt-1 font-semibold text-cougar-700">{p.role[lang]}</p>
                    {p.note && <p className="mt-3 text-sm"><Txt>{p.note[lang]}</Txt></p>}
                  </div>
                </li>
              ))}
            </ul>
            <div data-rise className="mt-10 rounded-[1.5rem] bg-cream p-6 text-mist">
              {OTHER_CONTACTS.map((c) => (
                <p key={c.name}>
                  <span className="font-semibold text-forest-900">{c.name}</span>, {c.role[lang]} ·{" "}
                  <a className="link-underline text-forest-800" href={`mailto:${c.email}`}>{c.email}</a>
                </p>
              ))}
              <p className="mt-2">
                {l("Teacher bios:", "Biografías de docentes:")[lang]}{" "}
                <LLink href={SITE.portals.teacherBios} className="link-underline font-semibold text-forest-800">sites.google.com/acslp.org/profiles</LLink>
              </p>
            </div>
          </Container>
        </Section>
        <Section tone="forest" id="board">
          <Container>
            <SectionHead lang={lang} dark kicker={l("Governance", "Gobierno")} title={l("A parent-founded, parent-governed school.", "Un colegio fundado y gobernado por padres.")} intro={FACTS.governance} />
            <p data-rise className="mt-8 max-w-2xl text-white/75"><Txt>{l("[[CONFIRM: current Board of Directors names and Board Dates for 2026–27.]]", "[[CONFIRM: nombres del Directorio actual y fechas de reuniones 2026–27.]]")[lang]}</Txt></p>
          </Container>
        </Section>
        <RelatedLinks
          lang={lang}
          items={[
            { href: "/careers", title: l("Join our team", "Únete al equipo"), text: l("Teach and work at ACS.", "Enseña y trabaja en ACS."), photo: "secondaryIpads" },
            { href: "/about/accreditation", title: l("Accreditation", "Acreditación"), text: l("U.S. accredited, Bolivian recognized.", "Acreditado en EE. UU., reconocido en Bolivia."), photo: "graduationClass" },
            { href: "/contact", title: l("Contact", "Contacto"), text: l("Every office, one page.", "Todas las oficinas en una página."), photo: "campusCourtyard" },
          ]}
        />
      </PageBody>
    </>
  );
}
