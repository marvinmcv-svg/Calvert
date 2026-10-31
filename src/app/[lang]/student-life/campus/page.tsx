import type { Metadata } from "next";
import { FACILITIES } from "@/data/student-life";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";
import { l } from "@/lib/i18n-types";
import { PageHero, PageBody, SectionHead, Split, RelatedLinks, CtaBand } from "@/components/page-kit";
import { Container, Section } from "@/components/ui/section";
import { Pic } from "@/components/ui/pic";
import { cn } from "@/lib/utils";

const INTRO = l(
  "Our campus is the former hacienda of the Patiño family, in a safe residential corner of Calacoto. The playing fields were built by draining a lagoon.",
  "Nuestro campus es la antigua hacienda de la familia Patiño, en un rincón residencial y seguro de Calacoto. Las canchas se construyeron drenando una laguna.",
);

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  return pageMeta({ lang, path: "/student-life/campus", title: l("Campus and facilities", "Campus e instalaciones"), description: INTRO, photo: "campusLawn" });
}

export default async function CampusPage({ params }: LangParams) {
  const lang = await resolveLang(params);
  return (
    <>
      <PageHero lang={lang} crumbs={[{ label: l("Student Life", "Vida estudiantil"), href: "/student-life" }, { label: l("Campus", "Campus") }]} kicker={l("Campus and facilities", "Campus e instalaciones")} title={l("A campus like no other in Bolivia.", "Un campus único en Bolivia.")} intro={INTRO} photo="campusCourtyard" />
      <PageBody>
        <Section>
          <Container>
            <SectionHead lang={lang} kicker={l("13 places to discover", "13 lugares por descubrir")} title={l("Everything a curious mind needs, at 3,600 metres.", "Todo lo que una mente curiosa necesita, a 3.600 metros.")} />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FACILITIES.map((f) => (
                <li key={f.slug} id={f.slug} data-rise className={cn("scroll-mt-28 overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-forest-800/8", f.photo && "sm:row-span-2")}>
                  {f.photo && (
                    <div className="relative aspect-[4/3]">
                      <Pic k={f.photo} lang={lang} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="absolute inset-0" />
                    </div>
                  )}
                  <div className="p-7">
                    {f.figure && <p className="font-display text-4xl text-cougar-600 tabular-nums">{f.figure}</p>}
                    <h2 className="mt-2 font-display text-2xl text-forest-900">{f.name[lang]}</h2>
                    <p className="mt-2 text-mist">{f.text[lang]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
        <Section tone="cream">
          <Container>
            <Split lang={lang} photo="historyCampus" kicker={l("A little history", "Un poco de historia")} title={l("From hacienda to school.", "De hacienda a colegio.")} body={[l("The campus was purchased in 1960 with USAID support, and a historic stone garden bridge from that era still stands among the gardens.", "El campus se compró en 1960 con apoyo de USAID, y un puente de piedra histórico de esa época sigue en pie entre los jardines."), l("[[CONFIRM: photos of the observatory, pool, theater, libraries, labs and gardens; drone footage of campus and Illimani; 360° tour.]]", "[[CONFIRM: fotos del observatorio, piscina, teatro, bibliotecas, laboratorios y jardines; tomas aéreas del campus y el Illimani; recorrido 360°.]]")]} />
          </Container>
        </Section>
        <RelatedLinks lang={lang} items={[
          { href: "/admissions/visit", title: l("See it in person", "Conócelo en persona"), text: l("Book a tour.", "Agenda una visita."), photo: "campusCourtyard" },
          { href: "/student-life/athletics", title: l("Cougar Athletics", "Deporte Cougar"), text: l("Pool, fields and gym.", "Piscina, canchas y gimnasio."), photo: "athleticsTrack" },
          { href: "/community#membership", title: l("Family membership", "Membresía familiar"), text: l("Use the Sports Complex.", "Usa el Complejo Deportivo."), photo: "aquatics" },
        ]} />
        <CtaBand lang={lang} title={l("Come walk the gardens.", "Ven a recorrer los jardines.")} />
      </PageBody>
    </>
  );
}
