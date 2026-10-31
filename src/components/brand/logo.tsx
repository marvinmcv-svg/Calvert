import Image from "next/image";
import { cn } from "@/lib/utils";

/** The official ACS mark (swoosh, figure and gold star) with the wordmark set in the brand face. */
export function LogoLockup({ tone = "dark", className, compact }: { tone?: "dark" | "light"; className?: string; compact?: boolean }) {
  const light = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={light ? "/brand/acs-mark-white-512.png" : "/brand/acs-mark-512.png"}
        alt=""
        width={512}
        height={512}
        className="h-11 w-11 shrink-0 sm:h-12 sm:w-12"
        priority
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-brand text-[1.32rem] font-semibold tracking-[0.02em] sm:text-[1.45rem]",
            light ? "text-white" : "text-forest-800",
          )}
        >
          ACS <span className={light ? "text-cougar-300" : "text-cougar-500"}>Calvert</span>
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 font-brand text-[0.56rem] font-semibold uppercase tracking-[0.16em] sm:text-[0.6rem]",
              light ? "text-white/80" : "text-forest-800/80",
            )}
          >
            American Cooperative School
          </span>
        )}
      </span>
    </span>
  );
}

/** A small five-point star from the logo, used as a decorative motif. */
export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-4 w-4 fill-gold-500", className)}>
      <path d="M12 1.8l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9l7.1-.6z" />
    </svg>
  );
}

/** The swoosh arc from the mark, drawn as a line for decoration. */
export function Swoosh({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden className={cn("pointer-events-none", className)} fill="none">
      <path d="M40 330 C 40 150, 180 40, 360 70" stroke="currentColor" strokeWidth="14" strokeLinecap="round" />
      <path d="M78 345 C 90 190, 200 95, 345 100" stroke="currentColor" strokeOpacity="0.5" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
