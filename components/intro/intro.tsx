import { portfolio } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/section-label";

export function Intro() {
  const intro = portfolio.intro;
  return <section id={intro.id} className="intro site-gutter" aria-labelledby="intro-title" data-intro>
    <SectionLabel {...intro} />
    <div className="intro-layout">
      <span className="intro-aside metadata text-secondary" aria-hidden="true">{portfolio.hero.academic}</span>
      <div>
        <h2 id="intro-title" className="intro-title" data-intro-reveal>
          {intro.heading.map((line, i) => <span key={line} className={i === 1 ? "text-secondary" : ""}>{line}</span>)}
        </h2>
        <div className="intro-copy grid gap-7 md:grid-cols-2 md:gap-12" data-intro-reveal>
          {intro.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </div>
  </section>;
}
