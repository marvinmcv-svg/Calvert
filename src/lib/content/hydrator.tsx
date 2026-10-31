"use client";

import { useRef } from "react";
import { applyOverrides, type Overrides } from "./registry";

/** Applies the same overrides in the browser before the first render of the page tree. */
export function ContentHydrator({ overrides, children }: { overrides: Overrides; children: React.ReactNode }) {
  const done = useRef<string | null>(null);
  const key = JSON.stringify(overrides);
  if (done.current !== key) {
    applyOverrides(overrides);
    done.current = key;
  }
  return <>{children}</>;
}
