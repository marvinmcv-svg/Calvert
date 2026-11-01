import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Choreo } from "@/components/home/motion";
import {
  Manifesto,
  Stats,
  Advantage,
  Safety,
  Diplomas,
  Journey,
  Experience,
  Traditions,
  Matriculation,
  Life,
  AdmissionsTeaser,
  FinalCta,
} from "@/components/home/sections";
import { HOME } from "@/data/dictionary";
import { pageMeta } from "@/lib/seo";
import { resolveLang, type LangParams } from "@/lib/server-lang";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLang(params);
  const meta = pageMeta({ lang, path: "/", title: HOME.heroTitle, description: HOME.heroSub, photo: "campusPlayground" });
  return { ...meta, title: { absolute: lang === "es" ? "ACS Calvert · El colegio americano de Bolivia desde 1955" : "ACS Calvert · Bolivia's American School since 1955" } };
}

export default async function HomePage({ params }: LangParams) {
  await resolveLang(params);
  return (
    <>
      <Hero />
      <Choreo>
        <Manifesto />
        <Stats />
        <Advantage />
        <Safety />
        <Diplomas />
        <Journey />
        <Experience />
        <Traditions />
        <Matriculation />
        <Life />
        <AdmissionsTeaser />
        <FinalCta />
      </Choreo>
    </>
  );
}
