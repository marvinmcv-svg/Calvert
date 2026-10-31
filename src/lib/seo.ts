import type { Metadata } from "next";
import { SITE } from "./site";
import { MEDIA, type MediaKey } from "@/data/media";
import type { L, Lang } from "./i18n-types";
import { plain } from "@/components/ui/txt";

/** Per-page metadata with hreflang alternates and a real campus photo for sharing. */
export function pageMeta({
  lang,
  path,
  title,
  description,
  photo = "campusCourtyard",
}: {
  lang: Lang;
  path: string;
  title: L;
  description: L;
  photo?: MediaKey;
}): Metadata {
  const p = MEDIA[photo];
  const clean = path === "/" ? "" : path;
  return {
    title: plain(title[lang]),
    description: plain(description[lang]),
    alternates: {
      canonical: `/${lang}${clean}`,
      languages: { en: `/en${clean}`, es: `/es${clean}`, "x-default": `/en${clean}` },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: lang === "es" ? "es_BO" : "en_US",
      url: `/${lang}${clean}`,
      title: plain(title[lang]),
      description: plain(description[lang]),
      images: [{ url: p.src, width: p.width, height: p.height, alt: p.alt[lang] }],
    },
    twitter: { card: "summary_large_image", title: plain(title[lang]), description: plain(description[lang]), images: [p.src] },
  };
}

export function orgJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": ["School", "EducationalOrganization"],
    name: SITE.legalName,
    alternateName: [SITE.name, ...SITE.alternateName],
    url: `${SITE.url}/${lang}`,
    logo: `${SITE.url}/brand/acs-mark-512.png`,
    image: `${SITE.url}${MEDIA.campusCourtyard.src}`,
    foundingDate: SITE.founded,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: `${SITE.address.neighborhood}, ${SITE.address.city}`,
      addressCountry: SITE.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    sameAs: [SITE.socials.facebook, SITE.socials.x, SITE.socials.youtube, SITE.socials.linkedin],
  };
}
