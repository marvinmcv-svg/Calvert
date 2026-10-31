import type { Metadata } from "next";
import { QUICK_LINKS } from "@/data/resources";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ParentsHub } from "@/components/community/parents-hub";

const INTRO = l("PowerSchool, payments, menus, handbooks and every family document in one place.", "PowerSchool, pagos, menús, manuales y todos los documentos para familias en un solo lugar.");

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/community/parents", title: l("Parents hub", "Portal de familias"), description: INTRO, photo: "campusLawn" });
}

export default async function ParentsPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[{ label: l("Community", "Comunidad"), href: "/community" }, { label: l("Parents hub", "Portal de familias") }]}
        kicker={l("For current families", "Para familias actuales")}
        title={l("Everything families need, one click away.", "Todo lo que las familias necesitan, a un clic.")}
        intro={INTRO}
        photo="campusLawn"
        actions={QUICK_LINKS.map((q, i) => (
          <ButtonLink key={q.href} href={q.href} variant={i === 0 ? "gold" : "glass"}>{q.label[lang]}</ButtonLink>
        ))}
      />
      <PageBody>
        <Section>
          <Container>
            <ParentsHub />
            <p data-rise className="mt-12 rounded-[1.5rem] bg-cream p-6 text-mist">
              {l("Business office: Monday to Friday, 9:00–15:30.", "Oficina administrativa: lunes a viernes, 9:00–15:30.")[lang]}{" "}
              <a href={SITE.phoneHref} className="link-underline font-semibold text-forest-800">{SITE.phone}</a> ·{" "}
              <a href={`mailto:${SITE.email}`} className="link-underline font-semibold text-forest-800">{SITE.email}</a>
            </p>
          </Container>
        </Section>
      </PageBody>
    </>
  );
}
