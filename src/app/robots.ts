import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Search engines and AI assistants are welcome everywhere except staff tools and APIs. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
