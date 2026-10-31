import Image from "next/image";
import { MEDIA, type MediaKey } from "@/data/media";
import type { Lang } from "@/lib/i18n-types";
import { cn } from "@/lib/utils";

type PicProps = {
  k: MediaKey;
  lang: Lang;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Fill the parent (parent must be positioned) instead of using intrinsic size. */
  fill?: boolean;
  position?: string;
};

/** A library photo with bilingual alt text. */
export function Pic({ k, lang, sizes, priority, className, imgClassName, fill = true, position }: PicProps) {
  const p = MEDIA[k];
  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={p.src}
          alt={p.alt[lang]}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
    );
  }
  return (
    <Image src={p.src} alt={p.alt[lang]} width={p.width} height={p.height} sizes={sizes} priority={priority} className={cn(className, imgClassName)} />
  );
}
