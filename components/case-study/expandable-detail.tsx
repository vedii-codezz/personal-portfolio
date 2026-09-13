"use client";

import { ReactNode } from "react";

interface ExpandableDetailProps {
  label: string;
  badge?: string;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
}

export function ExpandableDetail({
  label,
  badge = "SPECIFICATION",
  defaultOpen = false,
  children,
  className = "",
}: ExpandableDetailProps) {
  return (
    <details
      className={`group border border-line/50 hover:border-line bg-raised/30 rounded transition-colors overflow-hidden ${className}`}
      open={defaultOpen}
    >
      <summary className="flex items-center justify-between gap-4 p-4 sm:p-5 cursor-pointer select-none font-mono text-xs uppercase tracking-wider text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">
        <div className="flex items-center gap-3">
          <span className="text-secondary/60 transition-transform duration-200 group-open:rotate-90" aria-hidden="true">
            ▶
          </span>
          <span className="font-semibold text-primary">{label}</span>
        </div>
        {badge && (
          <span className="text-[10px] text-secondary border border-line/60 px-2 py-0.5 rounded tracking-widest shrink-0">
            [{badge}]
          </span>
        )}
      </summary>

      <div className="p-4 sm:p-6 pt-0 border-t border-line/30 font-sans text-sm sm:text-base text-secondary leading-relaxed space-y-4">
        {children}
      </div>
    </details>
  );
}
