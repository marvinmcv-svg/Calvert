"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { MEDIA } from "@/data/media";
import { HERO_SLIDES } from "@/data/home";
import { HOME, UI } from "@/data/dictionary";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/lang-context";
import { l } from "@/lib/i18n-types";
import { ButtonLink } from "@/components/ui/button";
import { Star } from "@/components/brand/logo";
import { Magnetic } from "@/components/motion/magnetic";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ACT2 = l(
  "A parent-founded school with an American heart and Bolivian roots.",
  "Un colegio fundado por padres, con corazón americano y raíces bolivianas.",
);

/** Splits a title into two lines of roughly equal length, on a word boundary. */
function twoLines(text: string): [string, string] {
  const words = text.split(" ");
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const diff = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/** Masked characters, grouped by word so lines only break between words. */
function Chars({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, wi) => (
        <Fragment key={wi}>
          <span className="inline-block overflow-hidden whitespace-nowrap pb-[0.08em] -mb-[0.08em] align-top">
            {Array.from(w).map((c, ci) => (
              <span key={ci} data-char className="inline-block will-change-transform">
                {c}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/**
 * The aperture hero. The campus is first seen through a small window between the two halves
 * of the headline. Scrolling opens the window to the full frame, pushes the headline apart and
 * hands over to a second statement. Static layout (no JS, reduced motion) is the opening frame.
 */
export function Hero() {
  const { lang, tr } = useLang();
  const root = useRef<HTMLElement>(null);
  const slide = HERO_SLIDES[0];
  const photo = MEDIA[slide.photo];
  const [lineA, lineB] = twoLines(tr(HOME.heroTitle));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const slot = q("[data-aperture]")[0] as HTMLElement;
        const plate = q("[data-plate]")[0] as HTMLElement;

        // The window, in px, measured from the CSS-sized slot so layout stays the source of truth.
        const start = () => {
          const r = slot.getBoundingClientRect();
          const vw = plate.clientWidth;
          const vh = plate.clientHeight;
          const box = plate.getBoundingClientRect();
          const top = r.top - box.top;
          const left = r.left - box.left;
          return `inset(${top}px ${vw - left - r.width}px ${vh - top - r.height}px ${left}px round 28px)`;
        };

        // 1. Intro: the window opens from a hairline, the headline rises letter by letter.
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro
          .fromTo("[data-plate-inner]", { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" })
          .fromTo("[data-plate-img]", { scale: 1.75 }, { scale: 1.3, duration: 2.4, ease: "expo.out" }, 0.2)
          .from("[data-line] [data-char]", { yPercent: 118, rotate: 8, duration: 1.3, stagger: 0.022 }, 0.45)
          .from("[data-flank] > span", { autoAlpha: 0, y: 14, duration: 1, stagger: 0.1 }, 1)
          .from("[data-hero-foot] > *", { autoAlpha: 0, y: 24, duration: 1, stagger: 0.1 }, 1.05);

        // 2. Scroll: open the window to the full frame and hand over to act two.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(plate, { clipPath: start }, { clipPath: "inset(0px 0px 0px 0px round 0px)", duration: 0.55, ease: "power2.inOut" }, 0)
          .to("[data-plate-zoom]", { scale: 1 / 1.3, duration: 0.6, ease: "power2.inOut" }, 0)
          .to("[data-line='a']", { yPercent: -160, xPercent: -6, autoAlpha: 0, duration: 0.45, ease: "power2.in" }, 0.02)
          .to("[data-line='b']", { yPercent: 160, xPercent: 6, autoAlpha: 0, duration: 0.45, ease: "power2.in" }, 0.02)
          .to("[data-flank='l']", { xPercent: -80, autoAlpha: 0, duration: 0.3 }, 0)
          .to("[data-flank='r']", { xPercent: 80, autoAlpha: 0, duration: 0.3 }, 0)
          .to("[data-hero-foot]", { y: 40, autoAlpha: 0, duration: 0.2 }, 0)
          .to("[data-plate-shade]", { autoAlpha: 1, duration: 0.3 }, 0.42)
          .fromTo("[data-act2-kicker]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.58)
          .fromTo("[data-act2]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0.58)
          .fromTo("[data-act2] [data-word]", { opacity: 0.12 }, { opacity: 1, duration: 0.03, stagger: 0.022 }, 0.6)
          .fromTo("[data-act2-foot] > *", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.04 }, 0.82);

        // Keep the reveal crisp: the caption tracks progress like a film counter.
        const counter = q("[data-progress]")[0] as HTMLElement | undefined;
        if (counter) {
          ScrollTrigger.create({
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              counter.style.transform = `scaleX(${self.progress})`;
            },
          });
        }
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [lang] },
  );

  return (
    <section
      ref={root}
      data-hero-stage
      aria-label={tr({ en: "Welcome to ACS Calvert", es: "Bienvenidos a ACS Calvert" })}
      className="relative bg-forest-950 text-white motion-safe:h-[300svh]"
      style={
        {
          "--ap-w": "min(58vw, 22rem)",
          "--ap-h": "min(34svh, 26rem)",
          "--ap-gap": "clamp(0.75rem, 2.2svh, 1.75rem)",
        } as React.CSSProperties
      }
    >
      <div className="sticky top-0 h-svh min-h-[36rem] overflow-hidden lg:[--ap-w:min(24vw,23rem)] lg:[--ap-h:min(40svh,28rem)]">
        {/* Ambient light behind the window */}
        <div aria-hidden className="grain absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[70svh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(187_156_90/0.16),transparent)]" />
        </div>

        {/* The slot the window is measured from */}
        <div
          aria-hidden
          data-aperture
          className="pointer-events-none absolute left-1/2 top-1/2 h-[var(--ap-h)] w-[var(--ap-w)] -translate-x-1/2 -translate-y-1/2"
        />

        {/* The photograph, clipped to the window */}
        <div
          data-plate
          className="absolute inset-0 [clip-path:inset(calc(50%_-_var(--ap-h)/2)_calc(50%_-_var(--ap-w)/2)_round_28px)]"
        >
          <div data-plate-inner className="absolute inset-0">
            <div data-plate-zoom className="absolute inset-0 will-change-transform">
              <Image
                data-plate-img
                src={photo.src}
                alt={photo.alt[lang]}
                fill
                priority
                sizes="100vw"
                className="object-cover will-change-transform"
                style={{ objectPosition: slide.position ?? "center" }}
              />
            </div>
            <div
              aria-hidden
              data-plate-shade
              className="invisible absolute inset-0 opacity-0"
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_26_13/0.7)_0%,rgb(0_26_13/0.15)_24%,transparent_40%,rgb(0_26_13/0.55)_70%,rgb(0_26_13/0.9)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_0%_100%,rgb(0_26_13/0.75)_0%,transparent_70%)]" />
            </div>
          </div>
        </div>

        {/* Act one: the headline, split around the window */}
        <h1 className="pointer-events-none absolute inset-x-0 top-0 h-full font-display leading-[0.92] tracking-[-0.035em] text-[clamp(2.6rem,12.5vw,4rem)] sm:text-[min(9vw,13svh)] lg:text-[min(7.4vw,12svh)]">
          <span
            data-line="a"
            className="absolute inset-x-0 bottom-[calc(50%_+_var(--ap-h)/2_+_var(--ap-gap))] block px-5 text-center sm:px-8 lg:px-12 lg:text-left"
          >
            <Chars text={lineA} />
          </span>
          <span
            data-line="b"
            className="absolute inset-x-0 top-[calc(50%_+_var(--ap-h)/2_+_var(--ap-gap))] block px-5 text-center sm:px-8 lg:px-12 lg:text-right"
          >
            <Chars text={lineB} />
          </span>
        </h1>

        {/* Editorial flanks either side of the window */}
        <p
          data-flank="l"
          className="absolute right-[calc(50%_+_var(--ap-w)/2_+_2rem)] top-1/2 hidden -translate-y-1/2 text-right text-[0.72rem] font-semibold uppercase leading-relaxed tracking-[0.22em] text-gold-300 lg:block"
        >
          <span className="block">{tr({ en: "Est. 1955", es: "Desde 1955" })}</span>
          <span className="block text-white/55">{tr({ en: "Founded by parents", es: "Fundado por padres" })}</span>
        </p>
        <p
          data-flank="r"
          className="absolute left-[calc(50%_+_var(--ap-w)/2_+_2rem)] top-1/2 hidden -translate-y-1/2 text-[0.72rem] font-semibold uppercase leading-relaxed tracking-[0.22em] text-gold-300 lg:block"
        >
          <span className="block">La Paz · Bolivia</span>
          <span className="block text-white/55">KG3 – {tr({ en: "Grade 12", es: "12.º grado" })}</span>
        </p>

        {/* Footer of act one */}
        <div data-hero-foot className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-[90rem] items-end gap-10 px-5 pb-24 sm:px-8 md:pb-8 lg:px-12">
          <p className="hidden max-w-sm text-[0.95rem] leading-relaxed text-white/75 md:block">{tr(HOME.heroSub)}</p>
          <div className="hidden items-center gap-3 md:flex">
            <Magnetic>
              <ButtonLink href={SITE.portals.apply} variant="gold" size="md">
                {tr(UI.applyNow)}
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/admissions/visit" variant="glass" size="md">
                {tr(UI.bookTour)}
              </ButtonLink>
            </Magnetic>
          </div>
          <p className="flex w-full items-center justify-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/60 motion-reduce:hidden md:hidden">
            <ArrowDown aria-hidden className="h-3.5 w-3.5 animate-bounce" />
            {tr({ en: "Scroll", es: "Desliza" })}
          </p>
        </div>

        {/* Act two: over the full frame */}
        <div className="pointer-events-none absolute inset-0 flex items-end motion-reduce:hidden">
          <div className="mx-auto w-full max-w-[90rem] px-5 pb-28 sm:px-8 md:pb-14 lg:px-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <p data-act2-kicker className="invisible flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-gold-300">
                <Star className="h-4 w-4 shrink-0" />
                {tr(HOME.heroKicker)}
              </p>
              <p data-act2-kicker className="invisible hidden max-w-xs text-sm text-white/85 [text-shadow:0_1px_14px_rgb(0_0_0/0.65)] sm:block sm:text-right">
                {tr(slide.caption)}
              </p>
            </div>
            <p data-act2 className="invisible mt-5 max-w-5xl font-display text-[clamp(2.1rem,5.4vw,5.25rem)] leading-[1.02] tracking-[-0.03em] text-balance">
              {tr(ACT2)
                .split(" ")
                .map((w, i, a) => (
                  <Fragment key={i}>
                    <span data-word>
                      {w}
                    </span>
                    {i < a.length - 1 ? " " : null}
                  </Fragment>
                ))}
            </p>
            <div data-act2-foot className="pointer-events-auto mt-9">
              <div className="invisible hidden flex-wrap gap-3 md:flex">
                <Magnetic>
                  <ButtonLink href={SITE.portals.apply} variant="gold" size="lg">
                    {tr(UI.applyNow)}
                  </ButtonLink>
                </Magnetic>
                <Magnetic>
                  <ButtonLink href="/admissions/visit" variant="glass" size="lg">
                    {tr(UI.bookTour)}
                  </ButtonLink>
                </Magnetic>
              </div>
              <p className="invisible text-sm text-white/70 md:hidden">{tr(slide.caption)}</p>
            </div>
          </div>
        </div>

        {/* Scroll progress hairline */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10 motion-reduce:hidden">
          <div data-progress className="h-full origin-left scale-x-0 bg-gold-400" />
        </div>
      </div>
    </section>
  );
}
