import type { Metadata } from "next";
import { HISTORY, IDENTITY } from "@/data/profile";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, RelatedLinks, CtaBand } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { Pic } from "@/components/ui/pic";
import { cn } from "@/lib/utils";

const TITLE = l("Seventy years, one community.", "Setenta años, una comunidad.");
const INTRO = l(
  "In 1955, a group of parents opened a school with 6 students and 1 teacher. Here is how it grew into Bolivia's American school.",
  "En 1955, un grupo de padres abrió un colegio con 6 estudiantes y 1 maestro. Así se convirtió en el colegio americano de Bolivia.",
);

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/about/history", title: l("Our history, 1955 to today", "Nuestra historia, de 1955 a hoy"), description: INTRO, photo: "historyCampus" });
}

export default async function HistoryPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Discover ACS", "Conoce ACS"), href: "/about" }, { label: l("History", "Historia") }]} kicker={IDENTITY.anniversary} title={TITLE} intro={INTRO} photo="historyCampus" />
      <PageBody>
        <Section>
          <Container>
            <ol className="relative mx-auto max-w-5xl">
              <span aria-hidden className="absolute left-[1.1rem] top-2 bottom-2 w-px bg-forest-800/15 md:left-1/2" />
              {HISTORY.map((m, i) => (
                <li key={m.year + m.title.en} data-rise className={cn("relative grid gap-4 pb-14 pl-12 md:grid-cols-2 md:gap-16 md:pl-0", i % 2 && "md:[&>div:first-child]:order-2")}>
                  <span aria-hidden className="absolute left-[0.6rem] top-3 h-4 w-4 rounded-full border-4 border-paper bg-cougar-500 md:left-1/2 md:-translate-x-1/2" />
                  <div className={cn(i % 2 ? "md:pl-4" : "md:pr-4 md:text-right")}>
                    <p className="font-display text-5xl leading-none tracking-[-0.03em] text-forest-800 sm:text-6xl">{m.year}</p>
                  </div>
                  <div className={cn(i % 2 ? "md:pr-4 md:text-right" : "md:pl-4")}>
                    <h2 className="font-display text-2xl text-forest-900 sm:text-3xl">{m.title[lang]}</h2>
                    <p className="mt-2 text-lg leading-relaxed text-mist">{m.text[lang]}</p>
                    {m.photo && (
                      <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-[1.25rem]">
                        <Pic k={m.photo} lang={lang} sizes="(min-width: 768px) 30rem, 90vw" className="absolute inset-0" />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </Section>
        <RelatedLinks
          lang={lang}
          items={[
            { href: "/about", title: l("Mission and values", "Misión y valores"), text: l("The 5 Cs and how we learn.", "Las 5 C y cómo aprendemos."), photo: "campusCourtyard" },
            { href: "/student-life/campus", title: l("The campus", "El campus"), text: l("A former hacienda in Calacoto.", "Una antigua hacienda en Calacoto."), photo: "campusLawn" },
            { href: "/community/alumni", title: l("Alumni", "Exalumnos"), text: l("70 years of Cougars.", "70 años de Cougars."), photo: "graduates70th" },
          ]}
        />
        <CtaBand lang={lang} title={l("Write the next chapter with us.", "Escribe el próximo capítulo con nosotros.")} />
      </PageBody>
    </>
  );
}
