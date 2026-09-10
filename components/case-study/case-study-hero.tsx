interface CaseStudyHeroProps {
  number: string;
  name: string;
  subtitle: string;
  category: string;
  timeline: string;
  status: string;
  headline: readonly string[];
  summary: string;
  coordinates: readonly { readonly label: string; readonly value: string }[];
}

export function CaseStudyHero({
  number,
  name,
  subtitle,
  category,
  timeline,
  status,
  headline,
  summary,
  coordinates,
}: CaseStudyHeroProps) {
  return (
    <section className="case-study-hero site-gutter pt-12 pb-16 md:pt-16 md:pb-24 border-b border-line" data-case-hero>
      {/* Eyebrow / Classification */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-secondary mb-10 pb-4 border-b border-line" data-hero-meta-row>
        <div className="flex items-center gap-3">
          <span className="text-primary font-semibold">PROJECT {number}</span>
          <span className="text-line">/</span>
          <span>{category}</span>
        </div>
        <div className="flex items-center gap-6">
          <span>CYCLE: {timeline}</span>
          <span className="text-line">/</span>
          <span className="text-primary">{status}</span>
        </div>
      </div>

      {/* Monumental Title */}
      <div className="mb-12">
        <h1 className="case-study-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tighter leading-none m-0 mb-4" data-hero-headline>
          {name}
        </h1>
        <p className="font-mono text-sm sm:text-base md:text-lg text-secondary tracking-tight" data-hero-headline>
          {subtitle}
        </p>
      </div>

      {/* Core Architectural Motto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 border-t border-line" data-hero-meta-row>
        <div className="lg:col-span-7">
          <div className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-primary">
            {headline.map((line, idx) => (
              <div key={idx} className="block">
                {line}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 flex flex-col justify-between">
          <p className="text-secondary text-base sm:text-lg leading-relaxed mb-6">
            {summary}
          </p>
          <div className="font-mono text-xs text-secondary tracking-widest uppercase">
            [ ARCHITECTURAL SPECIFICATION &amp; DISSECTION ]
          </div>
        </div>
      </div>

      {/* System Coordinates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 mt-12 border-t border-line" data-hero-meta-row>
        {coordinates.map((coord, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="font-mono text-[11px] text-secondary tracking-wider uppercase">
              {coord.label}
            </span>
            <span className="font-mono text-xs sm:text-sm text-primary font-medium tracking-tight">
              {coord.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
