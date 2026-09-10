"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function CaseStudyShell({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    import("@/lib/case-study-motion").then(({ setupCaseStudyMotion }) => {
      if (!disposed && root.current) {
        cleanup = setupCaseStudyMotion(root.current);
      }
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div id="case-study-top" ref={root} className="case-study-root bg-canvas text-primary">
      {children}
    </div>
  );
}
