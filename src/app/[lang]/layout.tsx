import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Inter, Cinzel } from "next/font/google";
import "../globals.css";
import { LANGS, isLang, type Lang } from "@/lib/i18n-types";
import { LangProvider } from "@/lib/lang-context";
import { SITE } from "@/lib/site";
import { orgJsonLd } from "@/lib/seo";
import { UI, HOME } from "@/data/dictionary";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { MobileCtaBar } from "@/components/layout/mobile-cta";
import { Kantuta } from "@/components/assistant/kantuta";
import { ensureContent } from "@/lib/content/server";
import { ContentHydrator } from "@/lib/content/hydrator";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", axes: ["opsz", "SOFT"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: "swap", weight: ["600", "700"] });

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#003b1e",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const title =
    lang === "es"
      ? "ACS Calvert · Colegio americano en La Paz, Bolivia desde 1955"
      : "ACS Calvert · American School in La Paz, Bolivia since 1955";
  return {
    metadataBase: new URL(SITE.url),
    title: { default: title, template: "%s · ACS Calvert" },
    description: HOME.heroSub[lang],
    applicationName: SITE.name,
    keywords:
      lang === "es"
        ? ["colegio americano La Paz", "colegio bilingüe La Paz Bolivia", "colegio Calvert La Paz", "doble diploma Bolivia", "colegio internacional La Paz"]
        : ["international school La Paz Bolivia", "American school Bolivia", "ACS Calvert", "American Cooperative School", "bilingual school La Paz"],
    icons: { icon: "/brand/acs-mark-512.png", apple: "/brand/acs-mark-180.png" },
    alternates: { canonical: `/${lang}`, languages: { en: "/en", es: "/es", "x-default": "/en" } },
    openGraph: {
      siteName: SITE.name,
      locale: lang === "es" ? "es_BO" : "en_US",
      images: [{ url: "/images/acs/campus-courtyard.jpg", width: 1280, height: 960 }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const overrides = await ensureContent();
  return (
    <html lang={lang} className={`${fraunces.variable} ${inter.variable} ${cinzel.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd(lang)) }} />
        <ContentHydrator overrides={overrides}>
        <LangProvider lang={lang}>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-gold-400 px-5 py-3 font-semibold text-forest-900 transition focus:translate-y-0"
          >
            {UI.skip[lang]}
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileCtaBar />
          <CommandPalette />
          <Kantuta />
        </LangProvider>
        </ContentHydrator>
      </body>
    </html>
  );
}
