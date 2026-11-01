"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Inertial smooth scrolling (Lenis) driven by the GSAP ticker so ScrollTrigger scenes stay
 * frame-perfect. Off for reduced motion and touch (native momentum is better there).
 * Pauses while a dialog or drawer locks the page.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      allowNestedScroll: true,
      anchors: { offset: -96 },
      prevent: (node) => node.closest?.("[role=dialog],[data-lenis-prevent],[cmdk-list]") != null,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Radix dialogs set data-scroll-locked; the mobile drawer sets overflow hidden.
    const body = document.body;
    const sync = () => {
      const locked = body.hasAttribute("data-scroll-locked") || body.style.overflow === "hidden";
      if (locked) lenis.stop();
      else lenis.start();
    };
    const mo = new MutationObserver(sync);
    mo.observe(body, { attributes: true, attributeFilter: ["style", "data-scroll-locked"] });

    return () => {
      mo.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
