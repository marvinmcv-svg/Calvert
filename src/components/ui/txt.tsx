import { Fragment } from "react";
import { cn } from "@/lib/utils";

const CONFIRM_RE = /\[\[CONFIRM:\s*([^\]]+)\]\]/g;
const HIDE = process.env.NEXT_PUBLIC_HIDE_CONFIRM === "1";

/**
 * Renders copy and turns any [[CONFIRM: ...]] marker into a visible chip, so unverified
 * facts are impossible to miss before launch. Set NEXT_PUBLIC_HIDE_CONFIRM=1 to hide them.
 */
export function Txt({ children, className }: { children: string; className?: string }) {
  if (!children.includes("[[CONFIRM")) return <>{children}</>;
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of children.matchAll(CONFIRM_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) parts.push(children.slice(last, idx));
    if (!HIDE) parts.push(<ConfirmChip key={idx} note={m[1].trim()} className={className} />);
    last = idx + m[0].length;
  }
  if (last < children.length) parts.push(children.slice(last));
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  );
}

export function ConfirmChip({ note, className }: { note: string; className?: string }) {
  return (
    <span
      className={cn(
        "mx-0.5 inline rounded-md border border-dashed border-amber-500/70 bg-amber-50 px-1.5 py-0.5 align-baseline font-sans text-[0.78em] font-medium leading-snug text-amber-900",
        className,
      )}
      data-confirm
    >
      <span aria-hidden>⚑ </span>
      {note}
    </span>
  );
}

/** Strip markers for places that need plain text (metadata, alt, search). */
export function plain(text: string) {
  return text.replace(CONFIRM_RE, "").replace(/\s{2,}/g, " ").trim();
}
