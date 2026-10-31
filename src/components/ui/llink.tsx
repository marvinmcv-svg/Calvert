"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { useLang } from "@/lib/lang-context";
import { isExternal } from "@/lib/utils";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string; prefetch?: boolean };

/** Link that adds the active language prefix to internal paths and opens external ones safely. */
export const LLink = forwardRef<HTMLAnchorElement, Props>(function LLink({ href, children, prefetch, ...rest }, ref) {
  const { href: localize, tr } = useLang();
  if (isExternal(href)) {
    return (
      <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <span className="sr-only"> ({tr({ en: "opens in a new tab", es: "se abre en una pestaña nueva" })})</span>
      </a>
    );
  }
  if (/^(mailto:|tel:)/.test(href)) {
    return (
      <a ref={ref} href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link ref={ref} href={localize(href)} prefetch={prefetch} {...rest}>
      {children}
    </Link>
  );
});
