import Link from "next/link";
import { ExternalLink } from "@/components/ui/external-link";

interface CaseStudyNavProps {
  projectName: string;
  projectNumber: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
}

export function CaseStudyNav({
  projectName,
  projectNumber,
  githubUrl,
  liveUrl,
}: CaseStudyNavProps) {
  return (
    <header
      className="case-study-nav site-gutter flex items-center justify-between min-h-[84px] border-b border-line bg-canvas sticky top-0 z-40"
      data-case-nav
    >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="back-home-link font-mono text-xs tracking-wider text-secondary hover:text-primary transition-colors flex items-center gap-2 py-2"
          aria-label="Return to portfolio index"
        >
          <span aria-hidden="true">←</span>
          <span>BEDANTIKA MONDAL</span>
        </Link>
        <span className="hidden sm:inline-block text-line" aria-hidden="true">/</span>
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-primary">
          <span className="text-secondary">{projectNumber}</span>
          <span className="font-semibold">{projectName}</span>
        </div>
      </div>

      <nav className="flex items-center gap-5 sm:gap-7 font-mono text-xs" aria-label="Project external destinations">
        {liveUrl && (
          <ExternalLink
            href={liveUrl}
            label={`Open ${projectName} live deployment in new tab`}
          >
            LIVE SYSTEM
          </ExternalLink>
        )}
        {githubUrl && (
          <ExternalLink
            href={githubUrl}
            label={`Open ${projectName} GitHub repository in new tab`}
          >
            SOURCE
          </ExternalLink>
        )}
      </nav>
    </header>
  );
}
