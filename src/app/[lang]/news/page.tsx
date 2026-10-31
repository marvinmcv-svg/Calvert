import type { Metadata } from "next";
import { NEWS } from "@/data/content";
import { formatDate } from "@/lib/dates";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { Pic } from "@/components/ui/pic";
import { LLink } from "@/components/ui/llink";
import { SITE } from "@/lib/site";

const INTRO = l("Stories, milestones and announcements from the Cougar community.", "Historias, hitos y anuncios de la comunidad Cougar.");

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/news", title: l("News", "Noticias"), description: INTRO, photo: "graduationClass" });
}

export default async function NewsPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("News", "Noticias") }]} kicker={l("News and events", "Noticias y eventos")} title={l("News from the Cougar community.", "Noticias de la comunidad Cougar.")} intro={INTRO} photo="graduationClass" position="center 30%" />
      <PageBody>
        <Section>
          <Container>
            <ul className="grid gap-6 md:grid-cols-2">
              {NEWS.map((n) => (
                <li key={n.slug} data-rise>
                  <LLink href={`/news/${n.slug}`} className="img-zoom group block overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-forest-800/8 transition-shadow hover:shadow-xl">
                    <div className="relative aspect-[16/10]">
                      <Pic k={n.photo} lang={lang} sizes="(min-width: 768px) 45vw, 100vw" className="absolute inset-0" />
                    </div>
                    <div className="p-7">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cougar-700">
                        {n.category[lang]} · <time dateTime={n.date}>{formatDate(n.date, lang, n.precision)}</time>
                      </p>
                      <h2 className="mt-3 font-display text-3xl leading-tight text-forest-900">{n.title[lang]}</h2>
                      <p className="mt-2 text-mist">{n.excerpt[lang]}</p>
                    </div>
                  </LLink>
                </li>
              ))}
            </ul>
            <p data-rise className="mt-12 text-center text-mist">
              {l("More from campus on", "Más del campus en")[lang]}{" "}
              <LLink href={SITE.socials.facebook} className="link-gold font-semibold text-forest-800">Facebook</LLink>{" "}
              {l("and", "y")[lang]}{" "}
              <LLink href={SITE.socials.youtube} className="link-gold font-semibold text-forest-800">YouTube</LLink>.
            </p>
          </Container>
        </Section>
      </PageBody>
    </>
  );
}
