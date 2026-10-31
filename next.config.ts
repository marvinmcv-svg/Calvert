import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  async redirects() {
    // 301s from legacy acslp.org paths to their new homes.
    const map: [string, string][] = [
      ["/about-us", "/en/about"],
      ["/mission-vision", "/en/about#mission"],
      ["/strategic-plan", "/en/about#strategic-plan"],
      ["/our-team", "/en/about/leadership"],
      ["/elementary", "/en/academics/elementary"],
      ["/secondary", "/en/academics/high-school"],
      ["/secundary", "/en/academics/high-school"],
      ["/early-childhood", "/en/academics/early-childhood"],
      ["/learning-services", "/en/academics/learning-services"],
      ["/facilities", "/en/student-life/campus"],
      ["/join-our-team", "/en/careers"],
      ["/contact-us", "/en/contact"],
      ["/community-commitment", "/en/about#commitment"],
      ["/images/cougar-hub/Parent_Rights-n-Responsabilities.pdf", "/en/community/parents"],
    ];
    return map.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `${source}/`, destination, permanent: true },
    ]);
  },
};

export default nextConfig;
