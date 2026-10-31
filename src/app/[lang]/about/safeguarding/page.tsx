import type { Metadata } from "next";
import { CHILD_PROTECTION, COMMUNITY_COMMITMENT } from "@/data/profile";
import { RESOURCES } from "@/data/resources";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, IconCards, Split, Checklist, RelatedLinks } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { LLink } from "@/components/ui/llink";

const TITLE = l("Every child safe, known and cared for.", "Cada niño seguro, conocido y cuidado.");

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/about/safeguarding", title: l("Child protection and safeguarding", "Protección infantil"), description: CHILD_PROTECTION.intro, photo: "campusPlayground" });
}

export default async function SafeguardingPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const docs = RESOURCES.filter((r) => ["Quick Action Emergency Guide", "Responsible Use Guidelines: Technology (English)", "Responsible Use Guidelines: Technology (Spanish)", "Chain of Command (English)", "Chain of Command (Spanish)"].includes(r.title.en));
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Discover ACS", "Conoce ACS"), href: "/about" }, { label: l("Child protection", "Protección infantil") }]} kicker={l("Safety and well-being", "Seguridad y bienestar")} title={TITLE} intro={CHILD_PROTECTION.intro} photo="campusPlayground" />
      <PageBody>
        <Section>
          <Container>
            <SectionHead lang={lang} kicker={l("Our safeguards", "Nuestras salvaguardas")} title={l("How we protect children.", "Cómo protegemos a los niños.")} intro={CHILD_PROTECTION.law} />
            <div className="mt-12">
              <IconCards lang={lang} items={CHILD_PROTECTION.practices} />
            </div>
          </Container>
        </Section>
        <Section tone="cream">
          <Container>
            <Split lang={lang} photo="campusCourtyard" kicker={l("A caring community", "Una comunidad que cuida")} title={l("Respect is taught, not assumed.", "El respeto se enseña.")} body={[l("We educate proactively about harassment, bullying and discrimination, and we keep communication open between families, students and staff.", "Educamos de forma preventiva sobre acoso, bullying y discriminación, y mantenemos una comunicación abierta entre familias, estudiantes y personal.")]}>
              <Checklist lang={lang} items={COMMUNITY_COMMITMENT[1].items} />
            </Split>
          </Container>
        </Section>
        <Section>
          <Container>
            <div className="grid gap-8 lg:grid-cols-2">
              <div data-rise className="rounded-[1.75rem] bg-forest-800 p-8 text-white sm:p-10">
                <h2 className="font-display text-3xl">{l("Have a concern?", "¿Tienes una preocupación?")[lang]}</h2>
                <p className="mt-3 text-white/80">{l("Please contact the school directly. A member of staff will respond.", "Comunícate directamente con el colegio. Un miembro del personal te responderá.")[lang]}</p>
                <p className="mt-6 space-x-4 font-semibold">
                  <a href={SITE.phoneHref} className="link-gold">{SITE.phone}</a>
                  <a href={`mailto:${SITE.email}`} className="link-gold">{SITE.email}</a>
                </p>
              </div>
              <ul data-rise className="space-y-3">
                {docs.map((d) => (
                  <li key={d.href}>
                    <LLink href={d.href} className="flex min-h-14 items-center justify-between rounded-2xl bg-white px-5 font-semibold text-forest-800 ring-1 ring-forest-800/8 hover:bg-cream">
                      {d.title[lang]}
                      <span aria-hidden>↗</span>
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
            { href: "/academics/counseling", title: l("Counseling and well-being", "Consejería y bienestar"), text: l("Second Step and Advisory.", "Second Step y Advisory."), photo: "elementaryIpad" },
            { href: "/community/parents", title: l("Parents hub", "Portal de familias"), text: l("Handbooks and guides.", "Manuales y guías."), photo: "campusLawn" },
            { href: "/careers", title: l("Careers", "Trabaja con nosotros"), text: l("Safe recruitment.", "Contratación segura."), photo: "secondaryIpads" },
          ]}
        />
      </PageBody>
    </>
  );
}
