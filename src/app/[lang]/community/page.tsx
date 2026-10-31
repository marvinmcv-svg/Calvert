import type { Metadata } from "next";
import { QUICK_LINKS } from "@/data/resources";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, Split, RelatedLinks, CtaBand } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { LLink } from "@/components/ui/llink";
import { Txt } from "@/components/ui/txt";

const INTRO = l("Founded by parents in 1955 and still a cooperative at heart: families, alumni and staff building ACS together.", "Fundado por padres en 1955 y todavía cooperativo en esencia: familias, exalumnos y personal construyendo ACS juntos.");

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/community", title: l("Community", "Comunidad"), description: INTRO, photo: "graduationFaculty" });
}

export default async function CommunityPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Community", "Comunidad") }]} kicker={l("The Cougar community", "La comunidad Cougar")} title={l("A cooperative, in every sense.", "Una cooperativa, en todo sentido.")} intro={INTRO} photo="graduationFaculty" />
      <PageBody>
        <Section id="parent-hub">
          <Container>
            <SectionHead lang={lang} kicker={l("Parents hub", "Portal de familias")} title={l("Quick links for families.", "Accesos rápidos para familias.")} more={{ label: l("All resources", "Todos los recursos"), href: "/community/parents" }} />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {QUICK_LINKS.map((q) => (
                <li key={q.href} data-rise>
                  <LLink href={q.href} className="flex min-h-20 items-center justify-between rounded-[1.25rem] bg-white px-5 font-display text-xl text-forest-900 ring-1 ring-forest-800/8 hover:bg-cream">
                    {q.label[lang]} <span aria-hidden>↗</span>
                  </LLink>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
        <Section tone="cream" id="parent-reps">
          <Container>
            <Split lang={lang} photo="campusPlayground" kicker={l("Get involved", "Participa")} title={l("Parent Reps: a voice in every class.", "Padres Representantes: una voz en cada curso.")} body={[l("Parent Reps connect families with teachers and the school, and help build community in every grade.", "Los Padres Representantes conectan a las familias con los docentes y el colegio, y ayudan a construir comunidad en cada grado.")]}>
              <ButtonLink href="https://docs.google.com/document/d/1Vi9bZ48CWwEhZ9kykljrJZ8x0BUlmvELgKoLsFakeMQ/preview" variant="primary">{l("Parent Rep Guide", "Guía para Padres Representantes")[lang]}</ButtonLink>
            </Split>
          </Container>
        </Section>
        <Section id="membership">
          <Container>
            <Split lang={lang} reverse photo="aquatics" kicker={l("Membership and Sports Complex", "Membresía y Complejo Deportivo")} title={l("The campus is yours, too.", "El campus también es tuyo.")} body={[l("Parents become ACS members and can use the Sports Complex on weekends and after school.", "Los padres se vuelven miembros de ACS y pueden usar el Complejo Deportivo los fines de semana y después de clases."), l("[[CONFIRM: membership details and Sports Complex hours.]]", "[[CONFIRM: detalles de la membresía y horario del Complejo Deportivo.]]")]} />
          </Container>
        </Section>
        <Section tone="cream" id="dining">
          <Container>
            <div data-rise className="grid gap-6 rounded-[1.75rem] bg-white p-8 ring-1 ring-forest-800/8 sm:p-10 md:grid-cols-[2fr_1fr] md:items-center">
              <div>
                <h2 className="font-display text-3xl text-forest-900">{l("Lunch at ACS", "Almuerzo en ACS")[lang]}</h2>
                <p className="mt-3 text-mist"><Txt>{l("Students bring lunch from home or buy it from the ACS Catering Service, which publishes a monthly menu.", "Los estudiantes traen almuerzo de casa o lo compran al servicio de catering de ACS, que publica un menú mensual.")[lang]}</Txt></p>
              </div>
              <ButtonLink href="https://linktr.ee/calvert2025" variant="gold">{l("This month's menu", "Menú del mes")[lang]}</ButtonLink>
            </div>
          </Container>
        </Section>
        <RelatedLinks lang={lang} items={[
          { href: "/community/alumni", title: l("Alumni: Cougar Connect", "Exalumnos: Cougar Connect"), text: l("70 years of Cougars.", "70 años de Cougars."), photo: "graduates70th" },
          { href: "/news", title: l("News", "Noticias"), text: l("Stories from campus.", "Historias del campus."), photo: "graduationClass" },
          { href: "/contact", title: l("Contact", "Contacto"), text: l("Every office, one page.", "Todas las oficinas."), photo: "campusCourtyard" },
        ]} />
        <CtaBand lang={lang} title={l("Join a community that has your back.", "Únete a una comunidad que te respalda.")} />
      </PageBody>
    </>
  );
}
