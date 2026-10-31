import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EXPERIENCES, getExperience } from "@/data/student-life";
import { pageMeta } from "@/lib/seo";
import type { MediaKey } from "@/data/media";
import { isLang, l, LANGS } from "@/lib/i18n-types";
import { PageHero, PageBody, Split, Checklist, RelatedLinks, CtaBand } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Txt } from "@/components/ui/txt";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return LANGS.flatMap((lang) => EXPERIENCES.map((e) => ({ lang, slug: e.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const e = getExperience(slug);
  if (!e || !isLang(lang)) return {};
  return pageMeta({ lang, path: `/student-life/${e.slug}`, title: e.name, description: e.summary, photo: e.photo });
}

export default async function ExperiencePage({ params }: Props) {
  const { lang, slug } = await params;
  const e = getExperience(slug);
  if (!e || !isLang(lang)) notFound();
  const second: Record<string, MediaKey> = { athletics: "aquatics", arts: "campusCourtyard", activities: "secondaryIpads", service: "graduatesTrio" };
  const others = EXPERIENCES.filter((x) => x.slug !== e.slug);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Student Life", "Vida estudiantil"), href: "/student-life" }, { label: e.name }]} kicker={e.kicker} title={e.name} intro={e.summary} photo={e.photo} />
      <PageBody>
        <Section>
          <Container>
            <Split lang={lang} photo={second[e.slug] ?? e.photo} title={e.name} body={e.body}>
              <Checklist lang={lang} items={e.points} />
              {e.links && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {e.links.map((k) => (
                    <ButtonLink key={k.href} href={k.href} variant="outline">{k.label[lang]}</ButtonLink>
                  ))}
                </div>
              )}
              {e.confirm && <p className="mt-6 text-sm"><Txt>{e.confirm[lang]}</Txt></p>}
            </Split>
          </Container>
        </Section>
        <RelatedLinks lang={lang} items={others.map((o) => ({ href: `/student-life/${o.slug}`, title: o.name, text: o.summary, photo: o.photo }))} />
        <CtaBand lang={lang} title={l("Become a Cougar.", "Sé un Cougar.")} />
      </PageBody>
    </>
  );
}
