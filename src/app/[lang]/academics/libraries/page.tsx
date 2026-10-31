import type { Metadata } from "next";
import { LIBRARIES } from "@/data/academics";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, Split, RelatedLinks } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/academics/libraries", title: l("Libraries", "Bibliotecas"), description: LIBRARIES.intro, photo: "secondaryIpads" });
}

export default async function LibrariesPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Learning", "Aprendizaje"), href: "/academics" }, { label: l("Libraries", "Bibliotecas") }]} kicker={l("Libraries", "Bibliotecas")} title={LIBRARIES.title} intro={LIBRARIES.intro} photo="secondaryIpads" />
      <PageBody>
        <Section>
          <Container>
            <Split lang={lang} photo="elementaryIpad" kicker={l("Two libraries", "Dos bibliotecas")} title={l("A reader in every Cougar.", "Un lector en cada Cougar.")} body={[l("The Elementary and Secondary libraries serve every student, and the online catalog lets families search the collection from home.", "Las bibliotecas de Primaria y Secundaria atienden a cada estudiante, y el catálogo en línea permite a las familias buscar desde casa."), l("[[CONFIRM: library hours, Head Librarian name and photos of both libraries.]]", "[[CONFIRM: horario, nombre del bibliotecario jefe y fotos de ambas bibliotecas.]]")]}>
              <ButtonLink href={SITE.portals.library} variant="primary">{l("Search the catalog", "Buscar en el catálogo")[lang]}</ButtonLink>
            </Split>
          </Container>
        </Section>
        <RelatedLinks lang={lang} items={[
          { href: "/academics/elementary", title: l("Elementary", "Primaria"), text: l("Confident readers.", "Lectores seguros."), photo: "elementaryIpad" },
          { href: "/student-life/campus", title: l("Campus", "Campus"), text: l("Explore the facilities.", "Explora las instalaciones."), photo: "campusLawn" },
          { href: "/community/parents", title: l("Parents hub", "Portal de familias"), text: l("Every family link.", "Todos los enlaces."), photo: "campusCourtyard" },
        ]} />
      </PageBody>
    </>
  );
}
