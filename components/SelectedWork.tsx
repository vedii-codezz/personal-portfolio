import { projects, carouselDescriptions } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import CircularCarousel from "./CircularCarousel";

export function SelectedWork() {
  return <section className="work section-pad" id="work" aria-labelledby="work-title">
    <div className="section-eyebrow mono" data-reveal><span><i /> 02 / SELECTED WORK</span><span>A FEW THINGS I&apos;VE PUT MY MIND INTO</span></div>
    <div className="work-heading" data-reveal><h2 id="work-title">Curiosity,<br /><em>put to work.</em></h2><div><span className="work-count">04<span> / PROJECTS</span></span><p>Intelligent at the core.<br />Expressive on the surface.</p></div></div>
    <CircularCarousel items={projects.map((project, index) => ({
      id: project.slug, title: project.name,
      content: <article className="carousel-project" aria-labelledby={`title-${project.slug}`}>
        <ProjectVisual slug={project.slug} compact />
        <div className="carousel-editorial">
          <span className="carousel-number">0{index + 1} / SELECTED WORK</span>
          <h3 id={`title-${project.slug}`}>{project.name}</h3>
          <p>{carouselDescriptions[project.slug]}</p>
          <div className="carousel-links">
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} Live Demo (opens in new tab)`}>Live Demo <span aria-hidden="true">↗</span></a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} Source on GitHub (opens in new tab)`}>Source <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </article>,
    }))} />
    <div className="work-end mono"><span>END OF SELECTED WORK</span><span aria-hidden="true">✳</span><span>STILL CURIOUS. STILL CREATING.</span></div>
  </section>;
}
