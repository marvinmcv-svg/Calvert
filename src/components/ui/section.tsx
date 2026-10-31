import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

type Tone = "paper" | "cream" | "white" | "aurora" | "dusk" | "forest";
const tones: Record<Tone, string> = {
  paper: "bg-paper",
  cream: "bg-cream",
  white: "bg-white",
  aurora: "aurora grain",
  dusk: "aurora dusk grain",
  forest: "bg-forest-900 text-white",
};

export function Section({
  id,
  tone = "paper",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-24 sm:py-32", tones[tone], className)}>
      {children}
    </section>
  );
}

export function Kicker({ children, dark, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em]",
        dark ? "text-gold-300" : "text-cougar-700",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-8", dark ? "bg-gold-400" : "bg-cougar-500")} />
      {children}
    </p>
  );
}
