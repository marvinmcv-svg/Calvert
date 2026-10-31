import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l, type L } from "@/lib/i18n-types";
import { Breadcrumbs } from "@/components/page-kit";
import { Container } from "@/components/ui/section";
import { Txt } from "@/components/ui/txt";

const SECTIONS: { id: string; title: L; body: L[] }[] = [
  {
    id: "privacy",
    title: l("Privacy", "Privacidad"),
    body: [
      l("When you send an inquiry, we use your details only to reply and to support your admissions process. We do not sell personal data.", "Cuando envías una consulta, usamos tus datos solo para responderte y acompañar tu proceso de admisión. No vendemos datos personales."),
      l("We do not publish student surnames next to photos, and we only publish images of students with consent.", "No publicamos apellidos de estudiantes junto a fotos y solo publicamos imágenes de estudiantes con consentimiento."),
      l("Messages to our virtual receptionist are processed by an AI provider to generate answers. Please don't share sensitive personal information in the chat.", "Los mensajes a nuestra recepcionista virtual se procesan con un proveedor de IA para generar respuestas. No compartas información personal sensible en el chat."),
      l(`To ask about or delete your data, write to ${SITE.email}. [[CONFIRM: privacy policy reviewed against Bolivian law.]]`, `Para consultar o eliminar tus datos, escribe a ${SITE.email}. [[CONFIRM: política de privacidad revisada según la ley boliviana.]]`),
    ],
  },
  {
    id: "terms",
    title: l("Terms of use", "Términos de uso"),
    body: [
      l("Content on this site is provided for information. Admission decisions, fees and policies are confirmed by the school in writing.", "El contenido de este sitio es informativo. Las decisiones de admisión, tarifas y políticas las confirma el colegio por escrito."),
      l("Photos and logos belong to the American Cooperative School and may not be reused without permission.", "Las fotos y logos pertenecen al American Cooperative School y no pueden reutilizarse sin permiso."),
    ],
  },
  {
    id: "accessibility",
    title: l("Accessibility", "Accesibilidad"),
    body: [
      l("We aim to meet WCAG 2.2 AA. The site works with a keyboard and screen readers, respects reduced-motion settings and is fully bilingual.", "Buscamos cumplir WCAG 2.2 AA. El sitio funciona con teclado y lectores de pantalla, respeta la preferencia de movimiento reducido y es totalmente bilingüe."),
      l(`If anything is hard to use, please tell us at ${SITE.email} and we'll fix it.`, `Si algo te resulta difícil de usar, avísanos en ${SITE.email} y lo corregiremos.`),
    ],
  },
];

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/legal", title: l("Privacy, terms and accessibility", "Privacidad, términos y accesibilidad"), description: l("How ACS handles your data, the terms of this site and our accessibility commitment.", "Cómo ACS trata tus datos, los términos del sitio y nuestro compromiso de accesibilidad.") });
}

export default async function LegalPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <div className="pb-24 pt-36 sm:pt-44">
      <Container className="max-w-4xl">
        <Breadcrumbs lang={lang} items={[{ label: l("Legal", "Legal") }]} />
        <h1 className="mt-8 text-5xl text-forest-900 sm:text-6xl">{l("Privacy, terms and accessibility", "Privacidad, términos y accesibilidad")[lang]}</h1>
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="mt-14 scroll-mt-28">
            <h2 className="text-3xl text-forest-900">{s.title[lang]}</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-charcoal/85">
              {s.body.map((p, i) => <p key={i}><Txt>{p[lang]}</Txt></p>)}
            </div>
          </section>
        ))}
      </Container>
    </div>
  );
}
