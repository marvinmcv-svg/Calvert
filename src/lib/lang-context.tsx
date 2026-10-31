"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { enUS, es as esLocale } from "date-fns/locale";
import type { Locale } from "date-fns";
import type { L, Lang } from "./i18n-types";
import { localHref } from "./utils";

type LangContextValue = {
  lang: Lang;
  tr: (value: L) => string;
  href: (path: string) => string;
  setLang: (next: Lang) => void;
  toggleLang: () => void;
  dateLocale: Locale;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      try {
        localStorage.setItem("acs-lang", next);
      } catch {
        /* storage unavailable */
      }
      document.cookie = `acs-lang=${next}; path=/; max-age=31536000; samesite=lax`;
      const rest = pathname.replace(/^\/(en|es)(?=\/|$)/, "");
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      router.push(`/${next}${rest}${hash}`, { scroll: false });
    },
    [lang, pathname, router],
  );

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      tr: (v) => v[lang],
      href: (path) => localHref(lang, path),
      setLang,
      toggleLang: () => setLang(lang === "en" ? "es" : "en"),
      dateLocale: lang === "es" ? esLocale : enUS,
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
