import { portfolio } from "@/data/portfolio";
import { projects } from "@/data/projects";
import { workPresentation } from "@/data/project-visuals";
import { ProjectTrack } from "./project-track";

export function ProjectStage() {
  return <div className="project-stage" data-project-stage>
    <header className="stage-heading">
      <h2 id="work-stage-title">{portfolio.work.heading}</h2>
      <span className="metadata text-secondary">{workPresentation.visualCaption}</span>
    </header>
    <ProjectTrack projects={projects} />
    <nav className="chapter-index" aria-label={workPresentation.indexLabel} data-chapter-index>
      <span className="metadata text-secondary">{workPresentation.guide}</span>
      <div className="chapter-buttons">
        {projects.map((project, index) => <button key={project.slug} type="button" data-chapter-button={index}
          aria-label={`${workPresentation.chapterLabel} ${project.number}: ${project.name}`}
          aria-controls={`chapter-${project.slug}`}>
          <span className="chapter-rule" aria-hidden="true" /><span>{project.number}</span>
        </button>)}
      </div>
    </nav>
  </div>;
}
