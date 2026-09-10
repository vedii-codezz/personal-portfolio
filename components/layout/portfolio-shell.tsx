"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function PortfolioShell({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    // Keep server content readable and animation code out of initial rendering.
    import("@/lib/animations").then(({ setupPortfolioMotion }) => {
      if (!disposed && root.current) cleanup = setupPortfolioMotion(root.current);
    });
    return () => { disposed = true; cleanup?.(); };
  }, []);

  return <div id="top" ref={root}>{children}</div>;
}
