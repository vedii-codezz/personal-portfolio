import { portfolio } from "@/data/portfolio";
import { KineticSkillsMarquee } from "./kinetic-skills-marquee";

export function TechStack() {
  const tech = portfolio.techStack;

  return (
    <section id={tech.id} className="tech-stack site-gutter py-24 sm:py-36 border-t border-line" aria-labelledby="tech-title" data-tech>
      <div className="tech-layout" data-tech-reveal>
        {/* Minimal High-Impact Section Header */}
        <div className="pb-6 border-b border-line flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary">
            04 // TECHNICAL SPEC
          </span>
          <h2 id="tech-title" className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary">
            {tech.heading}
          </h2>
        </div>

        {/* Approved Dominant Kinetic Typography Marquee */}
        <div className="pt-4 sm:pt-8">
          <KineticSkillsMarquee
            primarySkills={tech.primarySkills}
            secondaryStatus={tech.secondaryStatus}
          />
        </div>
      </div>
    </section>
  );
}
