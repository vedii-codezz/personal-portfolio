import { projects } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

export function SelectedWork() {
  return <section className="work section-pad" id="work" aria-labelledby="work-title">
    <div className="section-eyebrow mono" data-reveal><span><i /> 02 / SELECTED WORK</span><span>A FEW THINGS I&apos;VE PUT MY MIND INTO</span></div>
    <div className="work-heading" data-reveal><h2 id="work-title">Curiosity,<br /><em>put to work.</em></h2><div><span className="work-count">04<span> / PROJECTS</span></span><p>Intelligent at the core.<br />Expressive on the surface.</p></div></div>
    <div className="project-list">{projects.map((project, index) => <article className="project" key={project.slug} aria-labelledby={`title-${project.slug}`} data-project>
      <div className="project-top mono"><span>0{index + 1} / {project.category}</span></div>
      <div className="project-title"><h3 id={`title-${project.slug}`}>{project.name}</h3></div>
      <ProjectVisual slug={project.slug} />
      <p className="project-subtitle">{project.title}</p>
      <div className="project-detail"><p>{project.description}</p><ul className="tech-list" aria-label={`${project.name} technologies`}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul><div className="project-links"><a className="text-link" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} live (opens in new tab)`}>View Live <span aria-hidden="true">↗</span></a><a className="text-link" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} on GitHub (opens in new tab)`}>GitHub <span aria-hidden="true">↗</span></a></div></div>
    </article>)}</div>
    <div className="work-end mono"><span>END OF SELECTED WORK</span><span aria-hidden="true">✳</span><span>STILL CURIOUS. STILL CREATING.</span></div>
  </section>;
}
