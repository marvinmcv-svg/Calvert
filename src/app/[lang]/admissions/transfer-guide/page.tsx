import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, RelatedLinks, CtaBand } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { TransferGuide } from "@/components/admissions/tools";

const INTRO = l(
  "Bolivian Ministry rules depend on where your child studies today. Answer one question and get a personal checklist you can print.",
  "Las normas del Ministerio dependen de dónde estudia tu hijo o hija hoy. Responde una pregunta y obtén una lista personalizada que puedes imprimir.",
);

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/admissions/transfer-guide", title: l("Transfer guide: Bolivian schools and abroad", "Guía de traslado: colegios bolivianos y del exterior"), description: INTRO, photo: "secondaryIpads" });
}

export default async function TransferGuidePage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Admissions", "Admisiones"), href: "/admissions" }, { label: l("Transfer guide", "Guía de traslado") }]} kicker={l("Transfer guide", "Guía de traslado")} title={l("Moving schools, made clear.", "Cambiar de colegio, con claridad.")} intro={INTRO} photo="secondaryIpads" />
      <PageBody>
        <Section>
          <Container>
            <TransferGuide />
          </Container>
        </Section>
        <RelatedLinks lang={lang} items={[
          { href: "/admissions#inquire", title: l("Ask admissions", "Consulta a admisiones"), text: l("We reply in your language.", "Respondemos en tu idioma."), photo: "campusCourtyard" },
          { href: "/academics/high-school", title: l("Two diplomas", "Dos diplomas"), text: l("U.S. + Bolivian.", "EE. UU. + Bolivia."), photo: "graduationFaculty" },
          { href: "/academics/learning-services", title: l("Language support", "Apoyo de idioma"), text: l("ELL and Spanish support.", "Apoyo en inglés y español."), photo: "elementaryIpad" },
        ]} />
        <CtaBand lang={lang} title={l("We'll help with every form.", "Te ayudamos con cada trámite.")} />
      </PageBody>
    </>
  );
}
