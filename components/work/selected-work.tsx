import { portfolio } from "@/data/portfolio";
import { ProjectStage } from "./project-stage";

export function SelectedWork() {
  const work = portfolio.work;

  return (
    <section id={work.id} className="selected-work site-gutter pt-16 pb-8 border-t border-line" aria-labelledby="work-title" data-work>
      {/* Clean, High-Impact Entry Frame */}
      <div className="work-entry-header pb-8 mb-4 border-b border-line flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-secondary block mb-3">
            02 // SELECTED WORK
          </span>
          <h2 id="work-title" className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-primary leading-none">
            SELECTED WORK
          </h2>
        </div>

        <div className="font-mono text-xs text-secondary shrink-0 tracking-wider">
          04 PROJECTS / SELECTED SYSTEMS
        </div>
      </div>

      {/* Verified Reel Stage (Horizontal on desktop, vertical on mobile) */}
      <ProjectStage />
    </section>
  );
}
