import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Prefix an internal path with the active language: "/admissions" → "/es/admissions". */
export function localHref(lang: string, href: string) {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  if (href === "/") return `/${lang}`;
  return `/${lang}${href.startsWith("/") ? href : `/${href}`}`;
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}
