"use client";

import { useLang } from "@/lib/lang-context";
import { UI } from "@/data/dictionary";
import { PILLARS } from "@/data/nav";
import { ButtonLink } from "@/components/ui/button";
import { LLink } from "@/components/ui/llink";
import { Swoosh, Star } from "@/components/brand/logo";

export default function NotFound() {
  const { tr } = useLang();
  return (
    <section className="aurora grain relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <Swoosh className="absolute -right-20 top-10 h-[36rem] w-[36rem] text-white/6" />
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <p className="font-display text-[9rem] leading-none text-gold-400/90 sm:text-[13rem]">404</p>
        <h1 className="mt-4 max-w-3xl text-5xl leading-tight text-white sm:text-6xl">{tr(UI.notFoundTitle)}</h1>
        <p className="mt-5 max-w-xl text-lg text-white/80">{tr(UI.notFoundText)}</p>
        <ul className="mt-10 flex flex-wrap gap-3">
          {PILLARS.map((p) => (
            <li key={p.id}>
              <LLink href={p.href} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-5 font-semibold text-white ring-1 ring-inset ring-white/25 hover:bg-white hover:text-forest-900">
                <Star className="h-3.5 w-3.5" />
                {tr(p.label)}
              </LLink>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href="/" variant="gold" size="lg">{tr(UI.home)}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
