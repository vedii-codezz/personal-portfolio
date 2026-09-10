import { portfolio } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/section-label";
import { KineticSkillsMarquee } from "./kinetic-skills-marquee";

export function TechStack() {
  const tech = portfolio.techStack;

  return (
    <section id={tech.id} className="tech-stack site-gutter pt-16 pb-20" aria-labelledby="tech-title" data-tech>
      <SectionLabel {...tech} />

      <div className="tech-layout pt-10 md:pt-14" data-tech-reveal>
        <header className="tech-header flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-baseline">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-secondary block mb-2">
              FOUNDATIONS &amp; PRACTICE
            </span>
            <h2 id="tech-title" className="text-3xl font-medium tracking-tight md:text-5xl">
              {tech.heading}
            </h2>
          </div>
          <p className="max-w-md text-sm text-secondary leading-relaxed">
            {tech.description}
          </p>
        </header>

        {/* Major Kinetic Skills Marquee */}
        <KineticSkillsMarquee
          primarySkills={tech.primarySkills}
          secondaryStatus={tech.secondaryStatus}
        />

        {/* Structured Context Matrix */}
        <div className="tech-matrix mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {tech.categories.map((category) => (
            <div key={category.name} className="tech-category flex flex-col border border-line bg-raised/30 p-6 rounded">
              <div className="category-header flex items-center justify-between border-b border-line pb-3">
                <span className="metadata text-primary font-bold">{category.index} // {category.name}</span>
                <span className="metadata text-secondary">{category.items.length} FOCUS</span>
              </div>

              <div className="category-items divide-y divide-line/40 mt-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="tech-item py-4 text-sm flex flex-col gap-1"
                  >
                    <span className="font-mono text-primary font-semibold tracking-tight">
                      {item.name}
                    </span>
                    <span className="font-mono text-xs text-secondary/80 leading-normal">
                      {item.context}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

