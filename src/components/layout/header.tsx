"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X, ArrowUpRight } from "lucide-react";
import { PILLARS } from "@/data/nav";
import { UI } from "@/data/dictionary";
import { QUICK_LINKS } from "@/data/resources";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/lang-context";
import { cn } from "@/lib/utils";
import { LLink } from "@/components/ui/llink";
import { ButtonLink } from "@/components/ui/button";
import { LogoLockup } from "@/components/brand/logo";

export function openSearch() {
  window.dispatchEvent(new CustomEvent("acs:open-search"));
}

export function LangToggle({ dark }: { dark?: boolean }) {
  const { lang, setLang, tr } = useLang();
  return (
    <div
      role="group"
      aria-label={tr(UI.language)}
      className={cn(
        "flex h-11 items-center rounded-full p-1 text-xs font-bold tracking-wider ring-1 ring-inset",
        dark ? "ring-white/35" : "ring-forest-800/15",
      )}
    >
      {(["en", "es"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          lang={code}
          aria-label={code === "en" ? "English" : "Español"}
          className={cn(
            "pressable h-9 min-w-10 rounded-full px-2.5 uppercase",
            lang === code
              ? dark
                ? "bg-white text-forest-900"
                : "bg-forest-800 text-white"
              : dark
                ? "text-white/85 hover:text-white"
                : "text-forest-800/70 hover:text-forest-800",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { lang, tr } = useLang();
  const pathname = usePathname();
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navId = useId();

  useEffect(() => {
    // On the home page the header stays transparent while the pinned hero is on stage.
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero-stage]");
      const limit = hero ? Math.max(32, hero.offsetHeight - window.innerHeight * 0.9) : 32;
      setScrolled(window.scrollY > limit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Close menus on navigation.
  useEffect(() => {
    setOpen(null);
    setDrawer(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // On the home page, the active pillar follows the section on screen.
  useEffect(() => {
    if (!isHome) {
      setActivePillar(PILLARS.find((p) => pathname.startsWith(`/${lang}${p.href}`))?.id ?? null);
      return;
    }
    const targets = PILLARS.map((p) => document.getElementById(p.homeAnchor)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pillar = PILLARS.find((p) => p.homeAnchor === entry.target.id);
            if (pillar) setActivePillar(pillar.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [isHome, pathname, lang]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const overlay = isHome && !scrolled && !open;
  const dark = overlay;

  const enter = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          overlay ? "bg-transparent" : "bg-paper/85 shadow-[0_1px_0_rgb(0_38_20/0.08)] backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        {/* Utility bar */}
        <div
          className={cn(
            "hidden border-b text-[0.78rem] lg:block",
            dark ? "border-white/15 text-white/85" : "border-forest-800/8 text-forest-800/75",
          )}
        >
          <div className="mx-auto flex h-9 max-w-[90rem] items-center justify-between px-12">
            <nav aria-label={tr(UI.quickLinks)} className="flex items-center gap-5">
              {QUICK_LINKS.map((q) => (
                <LLink key={q.href} href={q.href} className="link-underline font-medium">
                  {tr(q.label)}
                </LLink>
              ))}
            </nav>
            <div className="flex items-center gap-5">
              <a href={SITE.phoneHref} className="link-underline">
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="link-underline">
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-4 px-5 sm:px-8 lg:h-20 lg:px-12">
          <LLink href="/" aria-label={`ACS Calvert, ${tr(UI.home)}`} className="shrink-0 rounded-lg">
            <LogoLockup tone={dark ? "light" : "dark"} />
          </LLink>

          <nav aria-label="Main" className="hidden xl:block" onPointerLeave={leave}>
            <ul className="flex items-center gap-0.5">
              {PILLARS.map((p) => {
                const isOpen = open === p.id;
                const panelId = `${navId}-${p.id}`;
                return (
                  <li key={p.id} className="relative" onPointerEnter={() => enter(p.id)}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : p.id)}
                      className={cn(
                        "pressable relative flex h-11 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[0.92rem] font-semibold",
                        dark ? "text-white hover:bg-white/10" : "text-forest-900 hover:bg-forest-100",
                      )}
                    >
                      {tr(p.label)}
                      <ChevronDown aria-hidden className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-gold-500 transition-transform duration-500",
                          activePillar === p.id ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-3"
                        >
                          <div className="rounded-[1.5rem] bg-white p-3 shadow-soft ring-1 ring-forest-800/8">
                            <ul className="grid grid-cols-2 gap-1">
                              {p.children.map((c) => (
                                <li key={c.href}>
                                  <LLink
                                    href={c.href}
                                    className="group block rounded-2xl p-3.5 transition-colors hover:bg-cream focus-visible:bg-cream"
                                  >
                                    <span className="flex items-center gap-1.5 text-[0.95rem] font-semibold text-forest-900">
                                      {tr(c.label)}
                                      <ArrowUpRight
                                        aria-hidden
                                        className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                      />
                                    </span>
                                    <span className="mt-1 block text-sm leading-snug text-mist">{tr(c.blurb)}</span>
                                  </LLink>
                                </li>
                              ))}
                            </ul>
                            <LLink
                              href={p.href}
                              className="mt-2 flex items-center justify-between rounded-2xl bg-forest-800 px-4 py-3 text-sm font-semibold text-white hover:bg-forest-700"
                            >
                              {tr(p.label)}
                              <ArrowUpRight aria-hidden className="h-4 w-4" />
                            </LLink>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label={`${tr(UI.search)} (Ctrl K)`}
              className={cn(
                "pressable grid h-11 w-11 place-items-center rounded-full",
                dark ? "text-white hover:bg-white/10" : "text-forest-900 hover:bg-forest-100",
              )}
            >
              <Search aria-hidden className="h-5 w-5" />
            </button>
            <div className="hidden sm:block">
              <LangToggle dark={dark} />
            </div>
            <ButtonLink href="/admissions/visit" variant={dark ? "glass" : "outline"} size="sm" className="hidden 2xl:inline-flex">
              {tr(UI.bookTour)}
            </ButtonLink>
            <ButtonLink href={SITE.portals.apply} variant="gold" size="sm" className="hidden md:inline-flex">
              {tr(UI.applyNow)}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-label={tr(UI.menu)}
              aria-expanded={drawer}
              className={cn(
                "pressable grid h-11 w-11 place-items-center rounded-full xl:hidden",
                dark ? "text-white hover:bg-white/10" : "text-forest-900 hover:bg-forest-100",
              )}
            >
              <Menu aria-hidden className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { tr } = useLang();
  const [expanded, setExpanded] = useState<string | null>("admissions");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={tr(UI.menu)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex flex-col bg-forest-900 text-white xl:hidden"
        >
          <div className="flex h-[4.5rem] items-center justify-between px-5 sm:px-8">
            <LogoLockup tone="light" compact />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={tr(UI.close)}
              className="pressable grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"
            >
              <X aria-hidden className="h-6 w-6" />
            </button>
          </div>
          <nav aria-label="Main" className="flex-1 overflow-y-auto px-5 pb-8 sm:px-8">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {PILLARS.map((p, i) => {
                const isOpen = expanded === p.id;
                return (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : p.id)}
                      className="flex min-h-16 w-full items-center justify-between py-4 text-left font-display text-[1.7rem] leading-tight"
                    >
                      {tr(p.label)}
                      <ChevronDown aria-hidden className={cn("h-6 w-6 text-gold-400 transition-transform", isOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          {p.children.map((c) => (
                            <li key={c.href}>
                              <LLink href={c.href} onClick={onClose} className="block rounded-xl py-2.5 pl-1">
                                <span className="block font-semibold">{tr(c.label)}</span>
                                <span className="block text-sm text-white/65">{tr(c.blurb)}</span>
                              </LLink>
                            </li>
                          ))}
                          <li className="pb-4" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              {QUICK_LINKS.map((q) => (
                <LLink key={q.href} href={q.href} className="rounded-full px-4 py-2.5 text-sm ring-1 ring-inset ring-white/25 hover:bg-white/10">
                  {tr(q.label)}
                </LLink>
              ))}
            </div>
            <div className="mt-6">
              <LangToggle dark />
            </div>
          </nav>
          <div className="tabbar-safe grid grid-cols-2 gap-3 border-t border-white/10 px-5 pt-3 sm:px-8">
            <ButtonLink href="/admissions/visit" variant="outlineDark" onClick={onClose}>
              {tr(UI.bookTour)}
            </ButtonLink>
            <ButtonLink href={SITE.portals.apply} variant="gold">
              {tr(UI.applyNow)}
            </ButtonLink>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
