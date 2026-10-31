import type { Metadata } from "next";
import { ADMISSIONS, STEPS, FAQ, SCHOOL_HOURS, DOCUMENTS } from "@/data/admissions";
import { UI } from "@/data/dictionary";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, Checklist, RelatedLinks } from "@/components/page-kit";
import { Container, Section, Kicker } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { LLink } from "@/components/ui/llink";
import { GradeCalculator } from "@/components/admissions/tools";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { FaqList } from "@/components/faq";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/admissions", title: l("Admissions: how to apply", "Admisiones: cómo postular"), description: ADMISSIONS.intro, photo: "campusPlayground" });
}

export default async function AdmissionsPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[{ label: l("Admissions", "Admisiones") }]}
        kicker={l("Admissions 2027–28 are open", "Admisiones 2027–28 abiertas")}
        title={ADMISSIONS.title}
        intro={ADMISSIONS.intro}
        photo="campusPlayground"
        actions={
          <>
            <ButtonLink href={SITE.portals.apply} variant="gold" size="lg">{UI.applyNow[lang]}</ButtonLink>
            <ButtonLink href="#inquire" variant="glass" size="lg">{UI.inquire[lang]}</ButtonLink>
          </>
        }
      />
      <PageBody>
        <Section id="steps">
          <Container>
            <SectionHead lang={lang} kicker={l("How to apply", "Cómo postular")} title={l("Six steps. We walk them with you.", "Seis pasos. Los recorremos contigo.")} />
            <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title.en} data-rise className="relative flex flex-col rounded-[1.75rem] bg-white p-7 ring-1 ring-forest-800/8">
                  <span className="font-display text-6xl leading-none text-cougar-500/30 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-display text-2xl text-forest-900">{s.title[lang]}</h3>
                  <p className="mt-2 flex-1 text-mist">{s.text[lang]}</p>
                  {s.cta && (
                    <LLink href={s.cta.href} className="link-gold mt-5 self-start font-semibold text-forest-800">{s.cta.label[lang]} →</LLink>
                  )}
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        <Section id="calculator" tone="cream">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <GradeCalculator />
              <div>
                <Kicker>{l("Requirements", "Requisitos")[lang]}</Kicker>
                <h2 className="mt-4 text-4xl leading-tight text-forest-900">{l("What you'll need.", "Lo que necesitarás.")[lang]}</h2>
                <div className="mt-6"><Checklist lang={lang} items={DOCUMENTS} /></div>
                <p data-rise className="mt-6 text-mist">
                  {l("Coming from a Bolivian school or from abroad?", "¿Vienes de un colegio boliviano o del exterior?")[lang]}{" "}
                  <LLink href="/admissions/transfer-guide" className="link-gold font-semibold text-forest-800">{l("Build your transfer checklist", "Arma tu lista de traslado")[lang]}</LLink>
                </p>
                <h3 className="mt-10 font-display text-2xl text-forest-900">{l("School hours", "Horario escolar")[lang]}</h3>
                <dl className="mt-4 grid grid-cols-2 gap-3">
                  {SCHOOL_HOURS.map((h) => (
                    <div key={h.label.en} data-rise className="rounded-2xl bg-white p-4 ring-1 ring-forest-800/6">
                      <dt className="text-sm text-mist">{h.label[lang]}</dt>
                      <dd className="font-display text-xl text-forest-900 tabular-nums">{h.hours}</dd>
                    </div>
                  ))}
                </dl>
                <p data-rise className="mt-4 text-sm text-mist">{l("American calendar, August to early June. No uniform, but a dress code.", "Calendario americano, de agosto a principios de junio. Sin uniforme, con código de vestimenta.")[lang]}</p>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="inquire">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div>
                <SectionHead lang={lang} kicker={l("Inquire", "Consulta")} title={l("Questions? Ask us anything.", "¿Preguntas? Consúltanos lo que quieras.")} intro={l("Tuition is shared on request. Our admissions team replies in English or Spanish.", "La colegiatura se comparte a pedido. El equipo de admisiones responde en inglés o español.")} />
                <div data-rise className="mt-8 space-y-2 text-mist">
                  <p><a href={SITE.phoneHref} className="link-underline font-semibold text-forest-800">{SITE.phone}</a></p>
                  <p><a href={`mailto:${SITE.email}`} className="link-underline font-semibold text-forest-800">{SITE.email}</a></p>
                  <p>{l("Business office: Monday to Friday, 9:00–15:30", "Oficina administrativa: lunes a viernes, 9:00–15:30")[lang]}</p>
                </div>
              </div>
              <InquiryForm />
            </div>
          </Container>
        </Section>

        <Section id="faq" tone="cream">
          <Container>
            <SectionHead lang={lang} kicker={l("FAQ", "Preguntas frecuentes")} title={l("Clear answers, in your language.", "Respuestas claras, en tu idioma.")} />
            <div className="mt-10"><FaqList lang={lang} items={FAQ} /></div>
          </Container>
        </Section>

        <RelatedLinks lang={lang} items={[
          { href: "/admissions/visit", title: l("Book a tour", "Agenda una visita"), text: l("See ACS in person.", "Conoce ACS en persona."), photo: "campusCourtyard" },
          { href: "/admissions/transfer-guide", title: l("Transfer guide", "Guía de traslado"), text: l("Bolivian schools and abroad.", "Colegios bolivianos y del exterior."), photo: "secondaryIpads" },
          { href: "/academics/early-childhood", title: l("Early Childhood", "Educación Inicial"), text: l("Where most families begin.", "Donde empiezan la mayoría de las familias."), photo: "earlyChildhood" },
        ]} />
      </PageBody>
    </>
  );
}
