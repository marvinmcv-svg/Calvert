import type { Metadata } from "next";
import { LEARNING_SERVICES } from "@/data/academics";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, IconCards, Split, RelatedLinks, CtaBand } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/academics/learning-services", title: l("Learning Services: ELL and learning support", "Servicios de Aprendizaje: ELL y apoyo"), description: LEARNING_SERVICES.intro, photo: "elementaryIpad" });
}

export default async function LearningServicesPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Learning", "Aprendizaje"), href: "/academics" }, { label: l("Learning Services", "Servicios de Aprendizaje") }]} kicker={l("Learning Services", "Servicios de Aprendizaje")} title={LEARNING_SERVICES.title} intro={LEARNING_SERVICES.intro} photo="elementaryIpad" />
      <PageBody>
        <Section>
          <Container>
            <SectionHead lang={lang} kicker={l("A fully inclusive environment", "Un entorno plenamente inclusivo")} title={l("Support woven into every classroom.", "Apoyo integrado en cada aula.")} />
            <div className="mt-12"><IconCards lang={lang} items={LEARNING_SERVICES.pillars} cols={4} /></div>
          </Container>
        </Section>
        <Section tone="cream">
          <Container>
            <Split lang={lang} photo="secondaryIpads" kicker={l("Growth you can measure", "Un crecimiento medible")} title={l("At least one WIDA level a year.", "Al menos un nivel WIDA por año.")} body={[l("Students learning English are assessed with WIDA. Our goal is at least one proficiency level of growth each year, with sheltered instruction so content learning never stops.", "Los estudiantes que aprenden inglés se evalúan con WIDA. Nuestra meta es al menos un nivel de dominio de crecimiento por año, con instrucción protegida para que el aprendizaje de contenidos nunca se detenga.")]}>
              <ButtonLink href={LEARNING_SERVICES.handbook} variant="primary">{l("Learning Services Handbook", "Manual de Servicios de Aprendizaje")[lang]}</ButtonLink>
            </Split>
          </Container>
        </Section>
        <RelatedLinks lang={lang} items={[
          { href: "/academics/counseling", title: l("Counseling and well-being", "Consejería y bienestar"), text: l("Second Step and Advisory.", "Second Step y Advisory."), photo: "earlyChildhood" },
          { href: "/admissions", title: l("Admissions", "Admisiones"), text: l("No English required for Early Childhood.", "Sin inglés previo para Inicial."), photo: "campusPlayground" },
          { href: "/academics/elementary", title: l("Elementary", "Primaria"), text: l("Grades 1 to 5.", "De 1.º a 5.º grado."), photo: "elementaryIpad" },
        ]} />
        <CtaBand lang={lang} title={l("Every learner is unique.", "Cada estudiante es único.")} />
      </PageBody>
    </>
  );
}
