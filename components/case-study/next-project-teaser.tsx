import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";

interface NextProjectTeaserProps {
  index: string;
  nextNumber: string;
  nextName: string;
  nextSubtitle: string;
  nextCategory: string;
}

export function NextProjectTeaser({
  index,
  nextNumber,
  nextName,
  nextSubtitle,
  nextCategory,
}: NextProjectTeaserProps) {
  return (
    <section className="next-project-teaser site-gutter py-20 md:py-32 border-b border-line" data-next-project>
      <SectionLabel
        index={index}
        label="NEXT CASE STUDY"
        annotation="PORTFOLIO SEQUENCE"
      />

      <div className="pt-12 md:pt-16" data-next-reveal>
        <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-4">
          UPCOMING ARCHITECTURE // {nextNumber}
        </span>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-normal tracking-tighter leading-none mb-3 text-primary">
              {nextName}
            </h2>
            <p className="font-mono text-base sm:text-lg text-secondary">
              {nextSubtitle} — <span className="text-primary">{nextCategory}</span>
            </p>
          </div>

          <div className="pt-4 md:pt-0">
            {/* Safe transition anchor to homepage selected work reel */}
            <Link
              href="/#work"
              className="inline-flex items-center gap-3 font-mono text-xs sm:text-sm text-primary border border-line px-6 py-4 rounded hover:bg-white/5 transition-all group"
            >
              <span>EXPLORE ALL ARCHITECTURES</span>
              <span className="text-secondary group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
