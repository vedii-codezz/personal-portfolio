import { portfolio } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/section-label";

export function Intro() {
  const intro = portfolio.intro;
  const { transitionalStatement } = intro;

  return (
    <section id={intro.id} className="intro site-gutter pt-16 pb-20" aria-labelledby="intro-title" data-intro>
      <SectionLabel {...intro} />

      <div className="intro-layout pt-12 md:pt-16">
        {/* Monumental Transitional Statement (Visual Storytelling) */}
        <div className="transitional-banner border-b border-line pb-12 md:pb-16" data-intro-reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-secondary block mb-4">
            01 // CORE PHILOSOPHY
          </span>
          <p className="font-sans font-medium text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-primary leading-[1.15] max-w-5xl">
            <span>{transitionalStatement.line1}</span>{" "}
            <span className="text-secondary/70 block mt-2">{transitionalStatement.line2}</span>
          </p>
        </div>

        {/* Two-Column Asymmetrical Narrative */}
        <div className="intro-narrative pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" data-intro-reveal>
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-secondary block">
                LEARNING THROUGH SYSTEMS
              </span>
              <h3 id="intro-title" className="font-sans text-xl sm:text-2xl font-medium text-primary mt-3 leading-snug">
                {intro.heading.join(" ")}
              </h3>
            </div>
            <div className="mt-6 pt-6 border-t border-line/40 font-mono text-xs text-secondary/70 space-y-1">
              <div>DISCIPLINE: COMPUTER SCIENCE &amp; ENGINEERING</div>
              <div>DIRECTION: ARTIFICIAL INTELLIGENCE &amp; ML</div>
            </div>
          </div>

          <div className="intro-copy lg:col-span-8 flex flex-col md:flex-row gap-8 lg:gap-12 text-sm sm:text-base leading-relaxed text-secondary border-l-0 lg:border-l lg:border-line lg:pl-12">
            {intro.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="flex-1">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
