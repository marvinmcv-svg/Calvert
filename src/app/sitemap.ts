import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { DIVISIONS } from "@/data/academics";
import { EXPERIENCES } from "@/data/student-life";
import { NEWS } from "@/data/content";

const STATIC = [
  "", "/about", "/about/history", "/about/leadership", "/about/accreditation", "/about/safeguarding",
  "/academics", "/academics/learning-services", "/academics/counseling", "/academics/university-counseling", "/academics/libraries",
  "/admissions", "/admissions/visit", "/admissions/transfer-guide",
  "/student-life", "/student-life/campus", "/news", "/community", "/community/parents", "/community/alumni",
  "/careers", "/contact", "/legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC,
    ...DIVISIONS.map((d) => `/academics/${d.slug}`),
    ...EXPERIENCES.map((e) => `/student-life/${e.slug}`),
    ...NEWS.map((n) => `/news/${n.slug}`),
  ];
  return paths.flatMap((p) =>
    (["en", "es"] as const).map((lang) => ({
      url: `${SITE.url}/${lang}${p}`,
      changeFrequency: p.startsWith("/news") ? ("weekly" as const) : ("monthly" as const),
      priority: p === "" ? 1 : p.startsWith("/admissions") ? 0.9 : 0.7,
      alternates: { languages: { en: `${SITE.url}/en${p}`, es: `${SITE.url}/es${p}` } },
    })),
  );
}
