import { portfolio } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/section-label";
import { ProjectStage } from "./project-stage";

export function SelectedWork() {
  const work = portfolio.work;
  return <section id={work.id} className="selected-work site-gutter" aria-labelledby="work-title" data-work>
    <SectionLabel {...work} />
    <ProjectStage />
  </section>;
}
