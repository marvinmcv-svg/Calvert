import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NEWS, getPost } from "@/data/content";
import { formatDate } from "@/lib/dates";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { isLang, l, LANGS } from "@/lib/i18n-types";
import { PageHero, PageBody, Prose, RelatedLinks } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { Pic } from "@/components/ui/pic";
import { plain } from "@/components/ui/txt";
import { MEDIA } from "@/data/media";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => NEWS.map((n) => ({ lang, slug: n.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const n = getPost(slug);
  if (!n || !isLang(lang)) return {};
  return pageMeta({ lang, path: `/news/${n.slug}`, title: n.title, description: n.excerpt, photo: n.photo });
}

export default async function PostPage({ params }: Props) {
  const { lang, slug } = await params;
  const n = getPost(slug);
  if (!n || !isLang(lang)) notFound();
  const others = NEWS.filter((x) => x.slug !== n.slug).slice(0, 3);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("News", "Noticias"), href: "/news" }, { label: n.title }]} kicker={l(`${n.category.en} · ${formatDate(n.date, "en", n.precision)}`, `${n.category.es} · ${formatDate(n.date, "es", n.precision)}`)} title={n.title} intro={n.excerpt} photo={n.photo} />
      <PageBody>
        <Section>
          <Container>
            <article className="mx-auto max-w-3xl">
              <Prose lang={lang} paras={n.body} />
              {n.gallery && (
                <div className="mt-12 grid grid-cols-2 gap-4">
                  {n.gallery.map((g) => (
                    <figure key={g} data-rise>
                      <div className="relative aspect-square overflow-hidden rounded-[1.25rem]">
                        <Pic k={g} lang={lang} sizes="(min-width: 768px) 24rem, 45vw" className="absolute inset-0" />
                      </div>
                      <figcaption className="mt-2 text-sm text-mist">{MEDIA[g].alt[lang]}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </article>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "NewsArticle",
                  headline: n.title[lang],
                  description: n.excerpt[lang],
                  datePublished: n.date,
                  image: [`${SITE.url}${MEDIA[n.photo].src}`],
                  articleBody: n.body.map((b) => plain(b[lang])).join(" "),
                  publisher: { "@type": "Organization", name: SITE.legalName, logo: { "@type": "ImageObject", url: `${SITE.url}/brand/acs-mark-512.png` } },
                }),
              }}
            />
          </Container>
        </Section>
        <RelatedLinks lang={lang} items={others.map((o) => ({ href: `/news/${o.slug}`, title: o.title, text: o.excerpt, photo: o.photo }))} />
      </PageBody>
    </>
  );
}
