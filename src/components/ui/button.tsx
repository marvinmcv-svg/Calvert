import { cn } from "@/lib/utils";
import { LLink } from "./llink";

export type ButtonVariant = "gold" | "glass" | "primary" | "outline" | "outlineDark" | "outlineGold" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  gold: "bg-gold-400 text-forest-900 shadow-glow-gold hover:bg-gold-300",
  glass: "bg-white/15 text-white backdrop-blur-md ring-1 ring-inset ring-white/35 hover:bg-white/25",
  primary: "bg-forest-800 text-white hover:bg-forest-700",
  outline: "ring-1 ring-inset ring-forest-800/25 text-forest-800 hover:bg-forest-800 hover:text-white",
  outlineDark: "ring-1 ring-inset ring-white/40 text-white hover:bg-white hover:text-forest-900",
  outlineGold: "ring-1 ring-inset ring-gold-400 text-gold-300 hover:bg-gold-400 hover:text-forest-900",
  ghost: "text-forest-800 hover:bg-forest-100",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(
    "pressable inline-flex min-w-11 items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.005em] whitespace-nowrap select-none disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonLinkProps) {
  return (
    <LLink href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </LLink>
  );
}
