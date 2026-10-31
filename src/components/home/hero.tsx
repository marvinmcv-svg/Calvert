"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Pause, Play } from "lucide-react";
import { MEDIA } from "@/data/media";
import { HERO_SLIDES } from "@/data/home";
import { HOME, UI } from "@/data/dictionary";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/lang-context";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Words } from "./motion";

const DURATION = 7000;

export function Hero() {
  const { lang, tr } = useLang();
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) setPaused(true);
  }, []);

  const go = useCallback((i: number) => setIndex((i + HERO_SLIDES.length) % HERO_SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-hero-title] [data-word]", { yPercent: 115, duration: 1.2, stagger: 0.06, delay: 0.15 })
          .from("[data-hero-sub]", { y: 24, autoAlpha: 0, duration: 1 }, "-=0.8")
          .from("[data-hero-cta] > *", { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, "-=0.75")
          .from("[data-hero-controls]", { autoAlpha: 0, duration: 0.8 }, "-=0.6");
        gsap.to("[data-hero-media]", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-copy]", {
          y: -80,
          autoAlpha: 0.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const slide = HERO_SLIDES[index];

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label={tr({ en: "Life at ACS", es: "La vida en ACS" })}
      className="relative isolate flex h-[100svh] min-h-[38rem] items-end overflow-hidden bg-forest-950 text-white"
    >
      <div data-hero-media className="absolute inset-0 -z-10">
        {HERO_SLIDES.map((s, i) => {
          const p = MEDIA[s.photo];
          const active = i === index;
          return (
            <div
              key={s.photo}
              aria-hidden={!active}
              className={cn("absolute inset-0 transition-opacity duration-[1400ms] ease-[var(--ease-signature)]", active ? "opacity-100" : "opacity-0")}
            >
              <Image
                src={p.src}
                alt={p.alt[lang]}
                fill
                priority={i === 0}
                sizes="100vw"
                className={cn("object-cover", active && !reduced && "acs-kenburns")}
                style={{ objectPosition: s.position ?? "center" }}
              />
            </div>
          );
        })}
        <div aria-hidden className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-forest-950/75 to-transparent" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(110%_85%_at_0%_100%,rgb(0_26_13/0.9)_0%,rgb(0_26_13/0.6)_40%,transparent_72%)]"
        />
      </div>

      <div className="mx-auto w-full max-w-[90rem] px-5 pb-28 sm:px-8 md:pb-24 lg:px-12">
        <div data-hero-copy className="max-w-4xl">
          <p className="flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-gold-300">
            <span aria-hidden className="h-px w-8 bg-gold-400" />
            {tr(HOME.heroKicker)}
          </p>
          <h1 data-hero-title className="mt-5 text-[3rem] leading-[0.98] tracking-[-0.022em] text-balance sm:text-7xl lg:text-[6rem]">
            <Words text={tr(HOME.heroTitle)} />
          </h1>
          <p data-hero-sub className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
            {tr(HOME.heroSub)}
          </p>
          <div data-hero-cta className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={SITE.portals.apply} variant="gold" size="lg">
              {tr(UI.applyNow)}
            </ButtonLink>
            <ButtonLink href="/admissions/visit" variant="glass" size="lg">
              {tr(UI.bookTour)}
            </ButtonLink>
          </div>
        </div>

        <div data-hero-controls className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p aria-live="polite" className="max-w-md text-sm text-white/80">
            <span className="sr-only">
              {tr(UI.slide)} {index + 1} / {HERO_SLIDES.length}:{" "}
            </span>
            {tr(slide.caption)}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {HERO_SLIDES.map((s, i) => (
                <button
                  key={s.photo}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${tr(UI.slide)} ${i + 1}`}
                  aria-current={i === index}
                  className="group flex h-11 items-center"
                >
                  <span className="relative block h-[3px] w-10 overflow-hidden rounded-full bg-white/30 sm:w-14">
                    <span
                      key={`${index}-${paused}`}
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full bg-gold-400",
                        i < index && "w-full",
                        i > index && "w-0",
                        i === index && (paused ? "w-full" : "w-0 animate-[timer_7s_linear_forwards]"),
                      )}
                    />
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={tr(paused ? UI.play : UI.pause)}
              className="pressable grid h-11 w-11 place-items-center rounded-full bg-white/10 ring-1 ring-inset ring-white/25 backdrop-blur hover:bg-white/20"
            >
              {paused ? <Play aria-hidden className="h-4 w-4" /> : <Pause aria-hidden className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-8 left-1/2 hidden h-12 w-px -translate-x-1/2 overflow-hidden bg-white/20 md:block">
        <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gold-400" />
      </div>
      <style>{`@keyframes timer { from { width: 0 } to { width: 100% } }`}</style>
    </section>
  );
}
