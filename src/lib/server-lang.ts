import { notFound } from "next/navigation";
import { isLang, type Lang } from "./i18n-types";

export type LangParams = { params: Promise<{ lang: string }> };

export async function resolveLang(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return lang;
}
