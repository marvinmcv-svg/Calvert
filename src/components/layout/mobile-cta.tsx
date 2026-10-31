"use client";

import { Phone } from "lucide-react";
import { UI } from "@/data/dictionary";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/lang-context";
import { ButtonLink } from "@/components/ui/button";

/** Sticky bottom bar on phones: Tour, Apply, Call. */
export function MobileCtaBar() {
  const { tr } = useLang();
  return (
    <div className="tabbar-safe fixed inset-x-0 bottom-0 z-40 border-t border-forest-800/10 bg-paper/90 px-3 pt-3 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
        <ButtonLink href="/admissions/visit" variant="outline" size="sm">
          {tr(UI.bookTour)}
        </ButtonLink>
        <ButtonLink href={SITE.portals.apply} variant="gold" size="sm">
          {tr(UI.applyNow)}
        </ButtonLink>
        <a
          href={SITE.phoneHref}
          aria-label={`${tr(UI.phone)} ${SITE.phone}`}
          className="pressable grid h-11 w-11 place-items-center rounded-full bg-forest-800 text-white"
        >
          <Phone aria-hidden className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
