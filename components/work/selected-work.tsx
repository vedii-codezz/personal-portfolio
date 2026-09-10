import { portfolio } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/section-label";
import { ProjectStage } from "./project-stage";

export function SelectedWork() {
  const work = portfolio.work;

  return (
    <section id={work.id} className="selected-work site-gutter pt-12 pb-8" aria-labelledby="work-title" data-work>
      <SectionLabel {...work} />

      {/* Dramatic Cinematic Entry Banner */}
      <div className="work-entry-banner pt-10 pb-8 border-b border-line mb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary block mb-2">
              FEATURED INVESTIGATIONS
            </span>
            <h2 id="work-title" className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-primary leading-none">
              02 // SELECTED WORK
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 font-mono text-xs text-secondary shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-primary font-medium">04 CHAPTERS</span>
            </div>
            <div className="hidden lg:block text-secondary/60">
              01 FINORA • 02 APTLY • 03 VEYRA • 04 NIKOT
            </div>
            <div className="hidden sm:block text-secondary/80">
              [HORIZONTAL SCRUB]
            </div>
          </div>
        </div>
      </div>

      {/* Verified Reel Stage */}
      <ProjectStage />
    </section>
  );
}
