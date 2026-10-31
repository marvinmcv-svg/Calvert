import { l, type L } from "@/lib/i18n-types";

/*
  Family resource links (MASTER_PROMPT Appendix A, supplied by the school).
  Google Docs links use /preview so families never land in an editor view.
  Duplicates are merged and the legacy http:// link is kept until the PDF is re-uploaded.
*/

export type Audience = "all" | "elementary" | "secondary";
export type DocLang = "en" | "es" | "both";

export type Resource = {
  title: L;
  href: string;
  group: ResourceGroup;
  audience: Audience;
  lang: DocLang;
  year?: string;
  /** Visible flag for documents that need an update from the school. */
  stale?: L;
};

export type ResourceGroup = "portals" | "handbooks" | "dates" | "profile" | "supplies" | "team" | "newsletters" | "documents" | "policies" | "social";

export const RESOURCE_GROUPS: { id: ResourceGroup; label: L }[] = [
  { id: "portals", label: l("Online portals", "Plataformas en línea") },
  { id: "handbooks", label: l("Handbooks", "Manuales") },
  { id: "dates", label: l("Important dates", "Fechas importantes") },
  { id: "profile", label: l("School profile", "Perfil del colegio") },
  { id: "supplies", label: l("Supply lists", "Listas de útiles") },
  { id: "team", label: l("Meet the team", "Conoce al equipo") },
  { id: "newsletters", label: l("Newsletters", "Boletines") },
  { id: "documents", label: l("Important documents", "Documentos importantes") },
  { id: "policies", label: l("Student and family guidelines", "Lineamientos para estudiantes y familias") },
  { id: "social", label: l("Social media", "Redes sociales") },
];

const STALE_YEAR = l("2026–27 version pending", "Versión 2026–27 pendiente");
const ARCHIVED = l("Archived plan", "Plan archivado");
const gdoc = (id: string) => `https://docs.google.com/document/d/${id}/preview`;
const gdrive = (id: string) => `https://drive.google.com/file/d/${id}/view`;

export const RESOURCES: Resource[] = [
  // Portals
  { title: l("PowerSchool", "PowerSchool"), href: "https://acslp.powerschool.com/", group: "portals", audience: "all", lang: "both" },
  { title: l("Online payments", "Pagos en línea"), href: "https://my.acslp.org", group: "portals", audience: "all", lang: "both" },
  { title: l("Cafeteria menu", "Menú de la cafetería"), href: "https://linktr.ee/calvert2025", group: "portals", audience: "all", lang: "both" },
  { title: l("Cougar Hub", "Cougar Hub"), href: "https://cougarhub.acslp.org", group: "portals", audience: "all", lang: "both" },
  { title: l("Atlas curriculum maps (public)", "Mapas curriculares Atlas (públicos)"), href: "https://acslp-public.rubiconatlas.org/", group: "portals", audience: "all", lang: "en" },
  { title: l("Library catalog (Follett Destiny)", "Catálogo de biblioteca (Follett Destiny)"), href: "https://acscalvert.follettdestiny.com/", group: "portals", audience: "all", lang: "en" },
  { title: l("IXL", "IXL"), href: "https://www.ixl.com/", group: "portals", audience: "all", lang: "en" },
  { title: l("Class Dojo", "Class Dojo"), href: "https://www.classdojo.com/", group: "portals", audience: "elementary", lang: "both" },
  { title: l("KG3 to Grade 5 course descriptions", "Descripción de cursos KG3 a 5.º"), href: gdoc("1RAwbvtcwb4BpBD1TD2xYZZYIDuZQhJnraBVeSaRfHtw"), group: "portals", audience: "elementary", lang: "en" },
  { title: l("Middle School course descriptions", "Descripción de cursos de Middle School"), href: gdoc("1aBSfsnKHiAWDTmDUYjO7l2Hkmn8dl18Z2-soE6da4d0"), group: "portals", audience: "secondary", lang: "en", stale: l("Review pending", "Revisión pendiente") },
  { title: l("High School course descriptions", "Descripción de cursos de High School"), href: gdoc("1_ipWftOZsrxzc8Lex8Qb2eaJvo5GekBx77dNrIbAcn4"), group: "portals", audience: "secondary", lang: "en" },

  // Handbooks
  { title: l("Student/Parent Handbook (English)", "Manual para Estudiantes y Padres (inglés)"), href: gdoc("1C7tSAlfBT4gaPzjN1iA588i6vy-5tQ716m2fsBdIceE"), group: "handbooks", audience: "all", lang: "en", year: "2025–26", stale: STALE_YEAR },
  { title: l("Student/Parent Handbook (Spanish)", "Manual para Estudiantes y Padres (español)"), href: gdoc("1-Gm-4BaCdOS3ZvKiQAOURbTfDH20sTSypB7qL66a5s8"), group: "handbooks", audience: "all", lang: "es", year: "2025–26", stale: STALE_YEAR },
  { title: l("Learning Services Handbook", "Manual de Servicios de Aprendizaje"), href: gdoc("1V5GFbbdNxLskbJSSs0c0TnFt9Oeki1RRlrzWA6UXKnI"), group: "handbooks", audience: "all", lang: "en" },
  { title: l("Athletic Handbook", "Manual de Deportes"), href: gdoc("1cCozM_-LRAgthabtrgoIgLrEkzfuEMO9mIIGXvAR-7k"), group: "handbooks", audience: "all", lang: "en" },
  { title: l("Extra-Curricular Handbook (English)", "Manual Extracurricular (inglés)"), href: gdoc("1JSBxrlXrTlL5cxugQXI7CWm3wiJXn9YPA-fOXtZZnxs"), group: "handbooks", audience: "all", lang: "en", stale: l("Review pending", "Revisión pendiente") },
  { title: l("Extra-Curricular Handbook (Spanish)", "Manual Extracurricular (español)"), href: gdoc("1NqBsJVhDbdylb0PhJh-_pvvOxbBEiwblvAiEppLQjVk"), group: "handbooks", audience: "all", lang: "es", stale: l("Review pending", "Revisión pendiente") },

  // Dates
  { title: l("Important Dates", "Fechas importantes"), href: "https://acslp.org/wp-content/uploads/2025/04/2025-2026-Important-Dates.pdf", group: "dates", audience: "all", lang: "en", year: "2025–26", stale: STALE_YEAR },
  { title: l("Board Dates", "Fechas del Directorio"), href: gdrive("19t24k1AdPJ_dlVDUhQqXa_W3_9gY0fEo"), group: "dates", audience: "all", lang: "en", year: "2025–26", stale: STALE_YEAR },

  // Profile
  { title: l("School Profile", "Perfil del colegio"), href: gdrive("1h2SkUQzR30wYY0z7EfyqYaeqpyY3r0c7"), group: "profile", audience: "secondary", lang: "en", year: "2025–26", stale: STALE_YEAR },

  // Supplies
  { title: l("Elementary Supply List", "Lista de útiles de Primaria"), href: "https://docs.google.com/spreadsheets/d/1Cb9LQQN4W-gE4jHBtnYhUTGS07344rUSQbfiP4qq9Wg/preview", group: "supplies", audience: "elementary", lang: "en", year: "2025–26", stale: STALE_YEAR },
  { title: l("Secondary Supply List (Grades 6–12)", "Lista de útiles de Secundaria (6.º a 12.º)"), href: gdoc("1EhPRXdk9AeeKhv59VOZJbdW2JA9zRVLx6i24B13eOhI"), group: "supplies", audience: "secondary", lang: "en", year: "2025–26", stale: STALE_YEAR },

  // Team
  { title: l("Teacher bios", "Biografías de docentes"), href: "https://sites.google.com/acslp.org/profiles/acs", group: "team", audience: "all", lang: "en" },

  // Newsletters
  { title: l("Elementary newsletter", "Boletín de Primaria"), href: "https://cougarhub.acslp.org/elementary/news", group: "newsletters", audience: "elementary", lang: "both" },
  { title: l("Secondary newsletter", "Boletín de Secundaria"), href: "https://cougarhub.acslp.org/secondary/news", group: "newsletters", audience: "secondary", lang: "both" },

  // Important documents
  { title: l("Quick Action Emergency Guide", "Guía de acción rápida ante emergencias"), href: gdrive("1u9ZywHF2hea-eg3w8m9TeCxYgEDS1Lt7"), group: "documents", audience: "all", lang: "en" },
  { title: l("ACS Learning Principles", "Principios de Aprendizaje de ACS"), href: gdoc("1-ED0UJQvmWpO5bQ7VsUguYb5xUHnMsGVDr1vyrfAbUQ"), group: "documents", audience: "all", lang: "en" },
  { title: l("Reglamento Interno", "Reglamento Interno"), href: gdoc("1EVdHzbMrvha5WTRYI7b4oNyeX-YQC441TUfnQMAMOuE"), group: "documents", audience: "all", lang: "es" },
  { title: l("Parent Rep Guide", "Guía para Padres Representantes"), href: gdoc("1Vi9bZ48CWwEhZ9kykljrJZ8x0BUlmvELgKoLsFakeMQ"), group: "documents", audience: "all", lang: "en" },
  { title: l("Chain of Command (English)", "Cadena de Comando (inglés)"), href: gdrive("0B7-p3oIwUoBvOVdCX1MtanNDZVBYMzJfNmVFSS12ai1pOG9F"), group: "documents", audience: "all", lang: "en" },
  { title: l("Chain of Command (Spanish)", "Cadena de Comando (español)"), href: gdrive("0B7-p3oIwUoBvTkdNM1dTbmtXZ1JsOHlJMzNEZ1JiVnNsdTRj"), group: "documents", audience: "all", lang: "es" },
  { title: l("Parents' Rights/Responsibilities and Communication with the Board", "Derechos y responsabilidades de los padres y comunicación con el Directorio"), href: "http://www.acslp.org/images/cougar-hub/Parent_Rights-n-Responsabilities.pdf", group: "documents", audience: "all", lang: "en", stale: l("Re-upload over HTTPS", "Volver a subir por HTTPS") },
  { title: l("Strategic Plan 2019–2024 (English)", "Plan Estratégico 2019–2024 (inglés)"), href: gdrive("0B7-p3oIwUoBvcnZrTVF5c0c2TXc1Z1ZjMlpLN2Q3WGl1dDhB"), group: "documents", audience: "all", lang: "en", year: "2019–24", stale: ARCHIVED },
  { title: l("Strategic Plan 2019–2024 (Spanish)", "Plan Estratégico 2019–2024 (español)"), href: gdrive("0B-E03t2H4hHOMzJmS1hXWlpGOUp0cVk0Z2wtWkE5QkYyQTRz"), group: "documents", audience: "all", lang: "es", year: "2019–24", stale: ARCHIVED },

  // Policies
  { title: l("Responsible Use Guidelines: Technology (English)", "Lineamientos de uso responsable de la tecnología (inglés)"), href: gdoc("1tRc5ZMY1dcu7BB8PoU3sp564FMoulrAd5DUNHxYttZo"), group: "policies", audience: "all", lang: "en" },
  { title: l("Responsible Use Guidelines: Technology (Spanish)", "Lineamientos para uso responsable de la tecnología (español)"), href: gdoc("145eCyMTSwU5_b6eh-39ZYVTB2YmLQC7hyVkK6dEfFCs"), group: "policies", audience: "all", lang: "es" },
  { title: l("RUG Acknowledgement Form", "Formulario de aceptación del RUG"), href: gdoc("1SzjxByQJkAS-YKd3_Z5ANTEQapxomZLSaFmiKrd_leI"), group: "policies", audience: "all", lang: "en" },
  { title: l("ACS Network Security", "Seguridad de la red de ACS"), href: gdoc("1pomUl26x0dCWfGx4nBAM3bLvUecHBBpysCGXJ5qUhQE"), group: "policies", audience: "all", lang: "en" },

  // Social
  { title: l("ACS on Facebook", "ACS en Facebook"), href: "https://www.facebook.com/acscalvert/", group: "social", audience: "all", lang: "both" },
  { title: l("ACS Alumni Network (Facebook group)", "Red de Exalumnos de ACS (grupo de Facebook)"), href: "https://www.facebook.com/groups/2259636874/", group: "social", audience: "all", lang: "both" },
  { title: l("ACS on YouTube", "ACS en YouTube"), href: "https://www.youtube.com/channel/UCL4_aKpQ6jbwAdgQfKbAzqQ", group: "social", audience: "all", lang: "both" },
];

/** Quick links shown in the utility bar and on the Parents hub hero. */
export const QUICK_LINKS = [
  { label: l("PowerSchool", "PowerSchool"), href: "https://acslp.powerschool.com/" },
  { label: l("Payments", "Pagos"), href: "https://my.acslp.org" },
  { label: l("Cafeteria menu", "Menú"), href: "https://linktr.ee/calvert2025" },
  { label: l("Calendar", "Calendario"), href: "https://acslp.org/wp-content/uploads/2025/04/2025-2026-Important-Dates.pdf" },
  { label: l("Cougar Hub", "Cougar Hub"), href: "https://cougarhub.acslp.org" },
];
