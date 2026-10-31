import { l, type L } from "@/lib/i18n-types";
import { PILLARS } from "./nav";
import { NEWS } from "./content";
import { LEADERSHIP } from "./profile";
import { FACILITIES, EXPERIENCES } from "./student-life";
import { RESOURCES } from "./resources";

export type SearchItem = { group: L; title: L; hint?: L; href: string; keywords?: string };

/** Everything the command palette can find, in both languages. */
export function buildSearchIndex(): SearchItem[] {
  const pages: SearchItem[] = PILLARS.flatMap((p) => [
    { group: l("Pages", "Páginas"), title: p.label, href: p.href },
    ...p.children.map((c) => ({ group: l("Pages", "Páginas"), title: c.label, hint: c.blurb, href: c.href })),
  ]);
  const extra: SearchItem[] = [
    { group: l("Pages", "Páginas"), title: l("Contact", "Contacto"), href: "/contact", keywords: "phone email address map" },
    { group: l("Pages", "Páginas"), title: l("Academics overview", "Aprendizaje: panorama"), href: "/academics", keywords: "curriculum" },
    { group: l("Pages", "Páginas"), title: l("Counseling and well-being", "Consejería y bienestar"), href: "/academics/counseling", keywords: "SEL Second Step advisory" },
    { group: l("Pages", "Páginas"), title: l("Libraries", "Bibliotecas"), href: "/academics/libraries", keywords: "books destiny" },
    { group: l("Pages", "Páginas"), title: l("Service learning", "Aprendizaje-servicio"), href: "/student-life/service" },
    { group: l("Pages", "Páginas"), title: l("Privacy, terms and accessibility", "Privacidad, términos y accesibilidad"), href: "/legal" },
  ];
  const news: SearchItem[] = NEWS.map((n) => ({ group: l("News", "Noticias"), title: n.title, hint: n.excerpt, href: `/news/${n.slug}` }));
  const people: SearchItem[] = LEADERSHIP.map((p) => ({ group: l("People", "Personas"), title: { en: p.name, es: p.name }, hint: p.role, href: "/about/leadership" }));
  const places: SearchItem[] = FACILITIES.map((f) => ({ group: l("Campus", "Campus"), title: f.name, hint: f.text, href: `/student-life/campus#${f.slug}` }));
  const programs: SearchItem[] = EXPERIENCES.map((e) => ({ group: l("Student life", "Vida estudiantil"), title: e.name, hint: e.summary, href: `/student-life/${e.slug}` }));
  const docs: SearchItem[] = RESOURCES.map((r) => ({ group: l("Family resources", "Recursos para familias"), title: r.title, href: r.href }));
  const seen = new Set<string>();
  return [...pages, ...extra, ...news, ...people, ...places, ...programs, ...docs].filter((i) => {
    const key = `${i.href}|${i.title.en}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
