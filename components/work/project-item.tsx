import Link from "next/link";
import type { Project } from "@/data/projects";
import { portfolio } from "@/data/portfolio";
import { ExternalLink } from "@/components/ui/external-link";
import { ProjectVisual } from "./project-visual";

export function ProjectItem({ project }: { project: Project }) {
  return <article id={`chapter-${project.slug}`} className="project-item" data-project-item data-project-slug={project.slug} aria-labelledby={`project-${project.slug}`}>
    <div className="project-copy">
    <span className="project-number metadata text-secondary">{project.number} / {project.category}</span>
    <div className="project-identity">
      <h3 id={`project-${project.slug}`}>{project.name === "NIKOT-E-METRO" ? <>NIKOT-E-<wbr />METRO</> : project.name}</h3>
      <p className="project-subtitle">{project.subtitle}</p>
    </div>
    <div className="project-detail">
      <p>{project.description}</p>
      {(project.links.caseStudy || project.links.live || project.links.github) && <div className="project-links flex flex-wrap gap-x-8 gap-y-3">
        {project.links.caseStudy && (
          <Link
            href={project.links.caseStudy}
            className="external-link"
            aria-label={`${project.name}: Case study`}
          >
            <span>Case study</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
        {project.links.live && <ExternalLink href={project.links.live} label={`${project.name}: ${portfolio.work.liveLabel}`}>{portfolio.work.liveLabel}</ExternalLink>}
        {project.links.github && <ExternalLink href={project.links.github} label={`${project.name}: ${portfolio.work.sourceLabel}`}>{portfolio.work.sourceLabel}</ExternalLink>}
      </div>}
    </div>
    </div>
    <ProjectVisual slug={project.slug} />
  </article>;
}
