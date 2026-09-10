import { portfolio } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/section-label";

export function TechStack() {
  const tech = portfolio.techStack;

  return (
    <section id={tech.id} className="tech-stack site-gutter" aria-labelledby="tech-title" data-tech>
      <SectionLabel {...tech} />

      <div className="tech-layout pt-12 md:pt-16" data-tech-reveal>
        <header className="tech-header flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-baseline">
          <h2 id="tech-title" className="text-3xl font-medium tracking-tight md:text-4xl">
            {tech.heading}
          </h2>
          <p className="max-w-md text-sm text-secondary">
            {tech.description}
          </p>
        </header>

        <div className="tech-matrix mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {tech.categories.map((category) => (
            <div key={category.name} className="tech-category flex flex-col">
              <div className="category-header flex items-center justify-between border-b border-line pb-3">
                <span className="metadata text-primary">{category.index} / {category.name}</span>
                <span className="metadata text-secondary">{category.items.length} INSTRUMENTS</span>
              </div>

              <div className="category-items divide-y divide-line">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="tech-item flex items-baseline justify-between gap-4 py-4 text-sm"
                  >
                    <span className="font-mono text-primary font-medium tracking-tight">
                      {item.name}
                    </span>
                    <span className="text-right font-mono text-xs text-secondary">
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
