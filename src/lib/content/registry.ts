import { l, type L } from "@/lib/i18n-types";
import { HEADLINE_STATS, IDENTITY, LEADERSHIP, CORE_VALUES } from "@/data/profile";
import { NEWS, EVENTS } from "@/data/content";
import { FAQ, STEPS } from "@/data/admissions";
import { HERO_SLIDES, ADVANTAGE } from "@/data/home";
import { CAREERS } from "@/data/careers";
import { FACILITIES, TRADITIONS, EXPERIENCES } from "@/data/student-life";
import { HOME } from "@/data/dictionary";

export type Collection = { id: string; label: L; group: L; target: object };

/**
 * Editable collections. The values in src/data are the defaults; staff edits are stored
 * as overrides per collection and merged in place onto these same objects.
 */
export const REGISTRY: Collection[] = [
  { id: "home.copy", group: l("Home page", "Inicio"), label: l("Home copy", "Textos de inicio"), target: HOME },
  { id: "home.hero", group: l("Home page", "Inicio"), label: l("Hero slides", "Diapositivas"), target: HERO_SLIDES },
  { id: "home.stats", group: l("Home page", "Inicio"), label: l("Headline numbers", "Cifras destacadas"), target: HEADLINE_STATS },
  { id: "home.advantage", group: l("Home page", "Inicio"), label: l("Why ACS tiles", "Mosaico Por qué ACS"), target: ADVANTAGE },
  { id: "news", group: l("News and events", "Noticias y eventos"), label: l("News stories", "Noticias"), target: NEWS },
  { id: "events", group: l("News and events", "Noticias y eventos"), label: l("Upcoming events", "Próximos eventos"), target: EVENTS },
  { id: "identity", group: l("About", "Sobre ACS"), label: l("Mission and vision", "Misión y visión"), target: IDENTITY },
  { id: "values", group: l("About", "Sobre ACS"), label: l("The 5 Cs", "Las 5 C"), target: CORE_VALUES },
  { id: "leadership", group: l("About", "Sobre ACS"), label: l("Leadership team", "Equipo directivo"), target: LEADERSHIP },
  { id: "admissions.steps", group: l("Admissions", "Admisiones"), label: l("Steps", "Pasos"), target: STEPS },
  { id: "admissions.faq", group: l("Admissions", "Admisiones"), label: l("FAQ", "Preguntas frecuentes"), target: FAQ },
  { id: "life.facilities", group: l("Student life", "Vida estudiantil"), label: l("Facilities", "Instalaciones"), target: FACILITIES },
  { id: "life.traditions", group: l("Student life", "Vida estudiantil"), label: l("Moments of the year", "Momentos del año"), target: TRADITIONS },
  { id: "life.experiences", group: l("Student life", "Vida estudiantil"), label: l("Programs", "Programas"), target: EXPERIENCES },
  { id: "careers", group: l("Careers", "Empleo"), label: l("Careers page", "Página de empleo"), target: CAREERS },
];

const DEFAULTS = new Map<string, unknown>(REGISTRY.map((c) => [c.id, structuredClone(c.target)]));

export function getDefault(id: string) {
  return structuredClone(DEFAULTS.get(id));
}

export function getCollection(id: string) {
  return REGISTRY.find((c) => c.id === id);
}

/** Replace a live object's or array's contents in place, so every importer sees the change. */
function assignInPlace(target: object, value: unknown) {
  if (Array.isArray(target) && Array.isArray(value)) {
    target.splice(0, target.length, ...structuredClone(value));
  } else if (target && typeof target === "object" && value && typeof value === "object") {
    const t = target as Record<string, unknown>;
    for (const k of Object.keys(t)) if (!(k in (value as object))) delete t[k];
    Object.assign(t, structuredClone(value));
  }
}

export type Overrides = Record<string, unknown>;

/** Applies overrides (or restores defaults for collections without one). Idempotent. */
export function applyOverrides(overrides: Overrides) {
  for (const c of REGISTRY) {
    const value = c.id in overrides ? overrides[c.id] : DEFAULTS.get(c.id);
    assignInPlace(c.target, value);
  }
}
