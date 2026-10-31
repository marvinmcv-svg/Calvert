import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { Txt } from "@/components/ui/txt";

const INTRO = l("Calle 10 y Pasaje Kantutas #500, Calacoto, Zona Sur, La Paz. We'd love to hear from you.", "Calle 10 y Pasaje Kantutas #500, Calacoto, Zona Sur, La Paz. Nos encantará saber de ti.");

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/contact", title: l("Contact ACS", "Contacto"), description: INTRO, photo: "campusCourtyard" });
}

export default async function ContactPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  const offices = [
    { name: l("Admissions and general inquiries", "Admisiones y consultas generales"), email: SITE.email, phone: SITE.phone },
    { name: l("Human resources: teaching roles", "Recursos humanos: puestos docentes"), email: SITE.emailJobs },
    { name: l("Human resources: support staff", "Recursos humanos: personal de apoyo"), email: SITE.emailSupportJobs },
    { name: l("Secondary counseling", "Consejería de Secundaria"), email: SITE.emailCounseling },
  ];
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Contact", "Contacto") }]} kicker={l("Contact", "Contacto")} title={l("Every office, one page.", "Todas las oficinas, una página.")} intro={INTRO} photo="campusCourtyard" />
      <PageBody>
        <Section>
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
              <div className="space-y-5">
                <div data-rise className="rounded-[1.75rem] bg-forest-800 p-8 text-white">
                  <p className="flex gap-3"><MapPin aria-hidden className="mt-1 h-5 w-5 shrink-0 text-gold-400" /><span>{SITE.address.street}<br />{SITE.address.neighborhood}, La Paz, Bolivia<br /><span className="text-sm text-white/70">{l("Mailing", "Correspondencia")[lang]}: {SITE.address.mailing}</span></span></p>
                  <p className="mt-4 flex gap-3"><Phone aria-hidden className="h-5 w-5 text-gold-400" /><a href={SITE.phoneHref} className="link-gold">{SITE.phone}</a></p>
                  <p className="mt-4 flex gap-3"><Mail aria-hidden className="h-5 w-5 text-gold-400" /><a href={`mailto:${SITE.email}`} className="link-gold">{SITE.email}</a></p>
                  <p className="mt-4 flex gap-3"><Clock aria-hidden className="h-5 w-5 text-gold-400" />{l("Business office: Mon–Fri 9:00–15:30", "Oficina administrativa: lun–vie 9:00–15:30")[lang]}</p>
                  <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-gold-400 px-5 font-semibold text-forest-900">{l("Open in Google Maps", "Abrir en Google Maps")[lang]}</a>
                </div>
                <ul className="space-y-3">
                  {offices.map((o) => (
                    <li key={o.email} data-rise className="rounded-[1.25rem] bg-white p-5 ring-1 ring-forest-800/8">
                      <p className="font-semibold text-forest-900">{o.name[lang]}</p>
                      <p className="mt-1 text-sm">
                        <a href={`mailto:${o.email}`} className="link-underline text-forest-800">{o.email}</a>
                        {o.phone && <> · <a href={SITE.phoneHref} className="link-underline text-forest-800">{o.phone}</a></>}
                      </p>
                    </li>
                  ))}
                </ul>
                <p data-rise className="text-sm text-mist"><Txt>{l("[[CONFIRM: WhatsApp Business number and a dedicated admissions email.]]", "[[CONFIRM: número de WhatsApp Business y un correo exclusivo de admisiones.]]")[lang]}</Txt></p>
              </div>
              <InquiryForm />
            </div>
          </Container>
        </Section>
      </PageBody>
    </>
  );
}
