import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, Split, IconCards, RelatedLinks } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Pic } from "@/components/ui/pic";

const INTRO = l("Seventy years of graduates, on every continent. Stay connected with your school and with each other.", "Setenta años de egresados, en todos los continentes. Mantente en contacto con tu colegio y con los demás.");

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/community/alumni", title: l("Alumni: Cougar Connect", "Exalumnos: Cougar Connect"), description: INTRO, photo: "graduates70th" });
}

export default async function AlumniPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Community", "Comunidad"), href: "/community" }, { label: l("Alumni", "Exalumnos") }]} kicker={l("Cougar Connect", "Cougar Connect")} title={l("Once a Cougar, always a Cougar.", "Una vez Cougar, siempre Cougar.")} intro={INTRO} photo="graduationFaculty" />
      <PageBody>
        <Section>
          <Container>
            <Split lang={lang} photo="graduates70th" kicker={l("70 years", "70 años")} title={l("Come home to ACS.", "Vuelve a casa, a ACS.")} body={[l("Join the ACS Alumni Network on Facebook to share news, find classmates and hear about reunions.", "Únete a la Red de Exalumnos de ACS en Facebook para compartir noticias, encontrar compañeros y enterarte de reencuentros."), l("[[CONFIRM: an \"Update your details\" form, reunion calendar and alumni stories (with consent).]]", "[[CONFIRM: formulario para actualizar datos, calendario de reencuentros e historias de exalumnos (con consentimiento).]]")]}>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={SITE.socials.alumni} variant="gold">{l("Join the alumni network", "Únete a la red de exalumnos")[lang]}</ButtonLink>
                <ButtonLink href={`mailto:${SITE.email}?subject=Alumni`} variant="outline">{l("Share your story", "Comparte tu historia")[lang]}</ButtonLink>
              </div>
            </Split>
          </Container>
        </Section>
        <Section tone="forest">
          <Container>
            <IconCards dark lang={lang} items={[
              { figure: "1955", title: l("A class of six", "Una clase de seis"), text: l("The first ACS students began with 1 teacher.", "Los primeros estudiantes de ACS empezaron con 1 maestro.") },
              { figure: "25+", title: l("Countries", "Países"), text: l("Where today's seniors can apply with Cialfo.", "Donde los estudiantes de último año pueden postular con Cialfo.") },
              { figure: "100%", title: l("Admitted", "Admitidos"), text: l("Graduates admitted to their universities of choice.", "Egresados admitidos en la universidad de su elección.") },
            ]} />
          </Container>
        </Section>
        <Section>
          <Container>
            <div className="grid gap-4 sm:grid-cols-2">
              {(["merchSweatshirt", "merchNotebook"] as const).map((k) => (
                <div key={k} data-rise className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-white">
                  <Pic k={k} lang={lang} sizes="(min-width: 640px) 45vw, 100vw" className="absolute inset-0" imgClassName="object-contain" />
                </div>
              ))}
            </div>
            <p data-rise className="mt-6 text-center text-mist">{l("70th anniversary merchandise: the Cougars sweatshirt and notebook.", "Productos del 70 aniversario: el buzo y el cuaderno de los Cougars.")[lang]}</p>
          </Container>
        </Section>
        <RelatedLinks lang={lang} items={[
          { href: "/about/history", title: l("Our history", "Nuestra historia"), text: l("1955 to today.", "De 1955 a hoy."), photo: "historyCampus" },
          { href: "/news/70-years-of-acs", title: l("70 years", "70 años"), text: l("The anniversary story.", "La historia del aniversario."), photo: "graduates70th" },
          { href: "/careers", title: l("Work at ACS", "Trabaja en ACS"), text: l("Come back as staff.", "Vuelve como parte del equipo."), photo: "secondaryIpads" },
        ]} />
      </PageBody>
    </>
  );
}
