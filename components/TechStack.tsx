import { techStack } from "@/data/tech-stack";

export function TechStack() {
  return (
    <section className="toolkit section-pad" id="stack" aria-labelledby="stack-title">
      <div className="section-eyebrow mono" data-reveal>
        <span><i aria-hidden="true" />05 / MY TOOLKIT</span>
        <span>FROM CURIOSITY TO CREATION</span>
      </div>
      <div className="toolkit-heading" data-reveal>
        <h2 id="stack-title">Tools of<br /><em>the Trade.</em></h2>
        <p>Languages, technologies, and tools I use to turn ideas into intelligent systems and creative digital experiences.</p>
      </div>
      <div className="toolkit-grid">
        {techStack.map(category => (
          <article className="toolkit-category" key={category.number} data-stack-category aria-labelledby={`stack-category-${category.number}`}>
            <div className="toolkit-category-heading">
              <span className="mono toolkit-number" aria-hidden="true">{category.number} /</span>
              <h3 id={`stack-category-${category.number}`}>{category.title}</h3>
            </div>
            <ul className="toolkit-badges" aria-label={category.title}>
              {category.technologies.map(technology => <li key={technology} data-stack-badge><span>{technology}</span></li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
