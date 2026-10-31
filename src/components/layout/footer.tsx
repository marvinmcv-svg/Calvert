"use client";

import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { PILLARS } from "@/data/nav";
import { UI } from "@/data/dictionary";
import { IDENTITY } from "@/data/profile";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/lang-context";
import { LLink } from "@/components/ui/llink";
import { ButtonLink } from "@/components/ui/button";
import { LogoLockup, Swoosh } from "@/components/brand/logo";
import { SocialIcon, type SocialName } from "@/components/brand/social-icons";

const SOCIALS: { name: SocialName; href: string; label: string }[] = [
  { name: "facebook", href: SITE.socials.facebook, label: "Facebook" },
  { name: "instagram", href: SITE.socials.instagram, label: "Instagram" },
  { name: "youtube", href: SITE.socials.youtube, label: "YouTube" },
  { name: "x", href: SITE.socials.x, label: "X" },
  { name: "linkedin", href: SITE.socials.linkedin, label: "LinkedIn" },
];

export function Footer() {
  const { tr } = useLang();
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-white">
      <Swoosh className="absolute -right-24 -top-10 h-[34rem] w-[34rem] text-cougar-500/10" />
      <div className="relative mx-auto max-w-[90rem] px-5 pb-28 pt-20 sm:px-8 md:pb-12 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <LogoLockup tone="light" />
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-white/90">{tr(UI.since)}.</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">{tr(IDENTITY.tagline)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={SITE.portals.apply} variant="gold" size="sm">
                {tr(UI.applyNow)}
              </ButtonLink>
              <ButtonLink href="/admissions/visit" variant="outlineDark" size="sm">
                {tr(UI.bookTour)}
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {PILLARS.map((p) => (
              <nav key={p.id} aria-label={tr(p.label)}>
                <h2 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-gold-300">{tr(p.label)}</h2>
                <ul className="mt-4 space-y-2.5">
                  {p.children.map((c) => (
                    <li key={c.href}>
                      <LLink href={c.href} className="link-underline text-sm text-white/75 hover:text-white">
                        {tr(c.label)}
                      </LLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
          <address className="not-italic">
            <p className="flex gap-3 text-sm leading-relaxed text-white/80">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>
                {SITE.address.street}
                <br />
                {SITE.address.neighborhood}, {SITE.address.city}, {SITE.address.country}
                <br />
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-gold mt-1 inline-block font-semibold text-white">
                  {tr(UI.directions)}
                </a>
              </span>
            </p>
          </address>
          <div className="space-y-3 text-sm">
            <a href={SITE.phoneHref} className="flex items-center gap-3 text-white/80 hover:text-white">
              <Phone aria-hidden className="h-4 w-4 text-gold-400" />
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-white/80 hover:text-white">
              <Mail aria-hidden className="h-4 w-4 text-gold-400" />
              {SITE.email}
            </a>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300">{tr(UI.follow)}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="pressable grid h-11 w-11 place-items-center rounded-full bg-white/8 text-white/85 ring-1 ring-inset ring-white/15 hover:bg-white hover:text-forest-900"
                  >
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-white px-6 py-4">
          <Image
            src="/brand/accreditations-strip.png"
            alt={tr({
              en: "Accreditation and recognition: New England Association of Schools and Colleges, AMISA, and the Bolivian Ministry of Education.",
              es: "Acreditación y reconocimiento: New England Association of Schools and Colleges, AMISA y Ministerio de Educación de Bolivia.",
            })}
            width={1612}
            height={233}
            className="mx-auto h-auto w-full max-w-2xl"
            sizes="(min-width: 768px) 42rem, 90vw"
          />
        </div>

        <div className="mt-10 flex flex-col gap-3 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName} ({SITE.entity}). {tr(UI.rights)}
          </p>
          <div className="flex gap-5">
            <LLink href="/legal" className="link-underline hover:text-white">
              {tr(UI.legal)}
            </LLink>
            <LLink href="/careers" className="link-underline hover:text-white">
              {tr(UI.careers)}
            </LLink>
            <LLink href="/contact" className="link-underline hover:text-white">
              {tr(UI.contact)}
            </LLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
