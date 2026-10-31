export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];

/** A bilingual string. Every visible string on the site is one of these. */
export type L = { en: string; es: string };

export function isLang(value: string | undefined | null): value is Lang {
  return value === "en" || value === "es";
}

export function tr(value: L, lang: Lang): string {
  return value[lang];
}

/** Shorthand for writing a bilingual pair inline in data files. */
export const l = (en: string, es: string): L => ({ en, es });
