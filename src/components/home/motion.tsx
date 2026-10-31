"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Declarative scroll choreography. React owns the DOM; this hook only reads data attributes:
 *  data-words        each word rises out of its own mask (use <Words>)
 *  data-rise         rises 28px and fades in; siblings entering together stagger by 80ms
 *  data-clip         image opens from an inset rounded clip while settling from 1.18x
 *  data-parallax="N" drifts against the scroll by ±N%
 *  data-count="99"   counts up from 0 (data-decimals for decimals)
 *  data-bar-grow     bars grow from the baseline in turn (inside data-bars)
 * Everything runs inside prefers-reduced-motion: no-preference. Nothing is hidden before hydration.
 */
export function useScrollChoreography(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const root = scope.current;
        if (!root) return;
        const q = gsap.utils.selector(root);

        q("[data-words]").forEach((el: Element) => {
          const words = (el as HTMLElement).querySelectorAll("[data-word]");
          gsap.from(words, {
            yPercent: 115,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.045,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        const rise = q("[data-rise]");
        if (rise.length) {
          gsap.set(rise, { y: 28, autoAlpha: 0 });
          ScrollTrigger.batch(rise, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
          });
        }

        q("[data-clip]").forEach((el: Element) => {
          const img = el.querySelector("img");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
          tl.fromTo(
            el,
            { clipPath: "inset(12% 10% 12% 10% round 2rem)" },
            { clipPath: "inset(0% 0% 0% 0% round 1.75rem)", duration: 1.4, ease: "expo.out" },
          );
          if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0);
        });

        q("[data-parallax]").forEach((el: Element) => {
          const amount = Number((el as HTMLElement).dataset.parallax) || 10;
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        q("[data-count]").forEach((el: Element) => {
          const node = el as HTMLElement;
          const target = Number(node.dataset.count);
          const decimals = Number(node.dataset.decimals ?? 0);
          const fmt = new Intl.NumberFormat(document.documentElement.lang, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          });
          const state = { v: 0 };
          node.textContent = fmt.format(0);
          gsap.to(state, {
            v: target,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: { trigger: node, start: "top 90%", once: true },
            onUpdate: () => {
              node.textContent = fmt.format(state.v);
            },
          });
        });

        q("[data-bars]").forEach((el: Element) => {
          gsap.from(el.querySelectorAll("[data-bar-grow]"), {
            scaleY: 0,
            transformOrigin: "bottom",
            duration: 1,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}

/** A wrapper that applies the choreography to everything inside it. */
export function Choreo({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollChoreography(ref);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Splits a heading into masked words. The text stays real text for screen readers and search. */
export function Words({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span data-words className={cn("block", className)}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <span data-word className="inline-block will-change-transform">
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
