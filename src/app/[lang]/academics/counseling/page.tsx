import type { Metadata } from "next";
import { COUNSELING } from "@/data/academics";
import { LEADERSHIP, OTHER_CONTACTS } from "@/data/profile";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, Split, Checklist, RelatedLinks } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/academics/counseling", title: l("Counseling and well-being", "Consejería y bienestar"), description: COUNSELING.intro, photo: "earlyChildhood" });
}

export default async function CounselingPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const counselors = [...LEADERSHIP.filter((p) => /Counselor/.test(p.role.en)).map((p) => ({ name: p.name, role: p.role })), ...OTHER_CONTACTS];
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Learning", "Aprendizaje"), href: "/academics" }, { label: l("Counseling", "Consejería") }]} kicker={l("Counseling and well-being", "Consejería y bienestar")} title={COUNSELING.title} intro={COUNSELING.intro} photo="earlyChildhood" />
      <PageBody>
        <Section>
          <Container>
            <Split lang={lang} photo="elementaryIpad" kicker={l("Elementary", "Primaria")} title={l("Feelings, friendships and character.", "Emociones, amistades y carácter.")}>
              <Checklist lang={lang} items={COUNSELING.elementary} />
            </Split>
          </Container>
        </Section>
        <Section tone="cream">
          <Container>
            <Split lang={lang} reverse photo="secondaryIpads" kicker={l("Secondary", "Secundaria")} title={l("A plan, a mentor, a path.", "Un plan, un mentor, un camino.")}>
              <Checklist lang={lang} items={COUNSELING.secondary} />
            </Split>
          </Container>
        </Section>
        <Section>
          <Container>
            <h2 className="text-3xl text-forest-900 sm:text-4xl">{l("Our counselors", "Nuestros consejeros")[lang]}</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {counselors.map((c) => (
                <li key={c.name} data-rise className="rounded-[1.5rem] bg-white p-6 ring-1 ring-forest-800/8">
                  <p className="font-display text-xl text-forest-900">{c.name}</p>
                  <p className="mt-1 text-sm text-cougar-700">{c.role[lang]}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
        <RelatedLinks lang={lang} items={[
          { href: "/academics/learning-services", title: l("Learning Services", "Servicios de Aprendizaje"), text: l("ELL and learning support.", "ELL y apoyo al aprendizaje."), photo: "elementaryIpad" },
          { href: "/academics/university-counseling", title: l("University counseling", "Orientación universitaria"), text: l("Grades 8 to 12.", "De 8.º a 12.º grado."), photo: "graduatesTrio" },
          { href: "/about/safeguarding", title: l("Child protection", "Protección infantil"), text: l("Safe, known and cared for.", "Seguro, conocido y cuidado."), photo: "campusCourtyard" },
        ]} />
      </PageBody>
    </>
  );
}
