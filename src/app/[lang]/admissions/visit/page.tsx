import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, Checklist, RelatedLinks } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { Txt } from "@/components/ui/txt";
import { InquiryForm } from "@/components/forms/inquiry-form";

const INTRO = l("Walk the gardens of the old Patiño hacienda, step into our classrooms and meet the people who make ACS.", "Recorre los jardines de la antigua hacienda Patiño, entra a nuestras aulas y conoce a quienes hacen ACS.");

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/admissions/visit", title: l("Book a campus tour", "Agenda una visita al campus"), description: INTRO, photo: "campusCourtyard" });
}

export default async function VisitPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Admissions", "Admisiones"), href: "/admissions" }, { label: l("Book a tour", "Agenda una visita") }]} kicker={l("Visit ACS", "Visita ACS")} title={l("The best way to know ACS is to walk it.", "La mejor forma de conocer ACS es recorrerlo.")} intro={INTRO} photo="campusCourtyard" />
      <PageBody>
        <Section>
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div>
                <SectionHead lang={lang} kicker={l("What to expect", "Qué esperar")} title={l("A visit built around your family.", "Una visita pensada para tu familia.")} />
                <div className="mt-8">
                  <Checklist lang={lang} items={[
                    l("A guided walk through the campus and facilities", "Un recorrido guiado por el campus y las instalaciones"),
                    l("Time with admissions to answer your questions", "Tiempo con admisiones para responder tus preguntas"),
                    l("A look at the division your child would join", "Conocer el nivel al que ingresaría tu hijo o hija"),
                    l("Next steps for applying on PulsEDU", "Los siguientes pasos para postular en PulsEDU"),
                  ]} />
                </div>
                <p data-rise className="mt-8 text-mist"><Txt>{l("[[CONFIRM: tour days and times.]] We will confirm your visit by email or phone.", "[[CONFIRM: días y horarios de visita.]] Confirmaremos tu visita por correo o teléfono.")[lang]}</Txt></p>
                <p data-rise className="mt-4 text-sm text-mist">{SITE.address.street}, {SITE.address.neighborhood}, La Paz · <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline font-semibold text-forest-800">{l("Map", "Mapa")[lang]}</a></p>
              </div>
              <InquiryForm defaultType="tour" />
            </div>
          </Container>
        </Section>
        <RelatedLinks lang={lang} items={[
          { href: "/student-life/campus", title: l("Campus", "Campus"), text: l("A preview of what you'll see.", "Un adelanto de lo que verás."), photo: "campusLawn" },
          { href: "/admissions", title: l("How to apply", "Cómo postular"), text: l("Steps, tools and FAQ.", "Pasos, herramientas y preguntas."), photo: "campusPlayground" },
          { href: "/about/history", title: l("Our history", "Nuestra historia"), text: l("70 years in La Paz.", "70 años en La Paz."), photo: "historyCampus" },
        ]} />
      </PageBody>
    </>
  );
}
