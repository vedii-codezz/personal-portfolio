import type { Project } from "@/data/projects";
import { ProjectItem } from "./project-item";

// Stable track/item boundary: a future reel can translate this track without
// changing the data model or replacing individual project components.
export function ProjectTrack({ projects }: { projects: readonly Project[] }) {
  return <div className="project-viewport" data-project-viewport>
    <div className="project-track" data-project-track>
      {projects.map(project => <ProjectItem key={project.slug} project={project} />)}
    </div>
  </div>;
}
