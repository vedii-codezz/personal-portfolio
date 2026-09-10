import type { ReactNode } from "react";

export function ExternalLink({ href, children, label, className = "" }: {
  href: string; children: ReactNode; label?: string; className?: string;
}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className={`external-link ${className}`}>{children}<span aria-hidden="true">↗</span></a>;
}
