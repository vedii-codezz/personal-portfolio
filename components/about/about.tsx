import { portfolio } from "@/data/portfolio";

export function About() {
  const about = portfolio.about;

  return (
    <section
      id={about.id}
      className="about-inverted bg-[#f3f3ef] text-[#050505] py-20 md:py-32 my-20 transition-colors selection:bg-[#050505] selection:text-[#f3f3ef]"
      aria-labelledby="about-title"
      data-about
    >
      <div className="site-gutter">
        {/* Inverted Section Header */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#050505]/15 pb-4 font-mono text-xs tracking-wider">
          <div className="flex items-center gap-2">
            <span className="font-bold">03</span>
            <span className="opacity-40">//</span>
            <span className="font-semibold uppercase tracking-widest">ABOUT</span>
          </div>
          <div className="opacity-65 uppercase tracking-widest text-[11px]">
            EDITORIAL DOSSIER // MONOCHROME INVERSION
          </div>
        </div>

        <div className="about-content pt-12 md:pt-16" data-about-reveal>
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-[#050505]/15 pb-10">
            {about.meta.map((item) => (
              <div key={item.label} className="font-mono flex flex-col gap-1">
                <span className="text-xs text-[#050505]/60 tracking-wider uppercase">{item.label}</span>
                <span className="text-sm font-semibold tracking-tight text-[#050505]">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Monumental Editorial Headline */}
          <div className="py-12 md:py-20 border-b border-[#050505]/15">
            <span className="font-mono text-xs uppercase tracking-widest text-[#050505]/60 block mb-4">
              PERSONAL ETHOS &amp; APPROACH
            </span>
            <h2 id="about-title" className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]">
              {about.heading[0]}
              <span className="block text-[#050505]/50 mt-2 font-normal">
                {about.heading[1]}
              </span>
            </h2>
          </div>

          {/* Narrative Grid */}
          <div className="py-12 md:py-20 border-b border-[#050505]/15 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4 font-mono text-xs text-[#050505]/70 space-y-4">
              <span className="uppercase tracking-widest block text-[#050505] font-bold">
                ENGINEERING DISCIPLINE
              </span>
              <p className="leading-relaxed">
                Software is not an abstract theory. It is a tangible system that behaves, fails, and communicates through constraints.
              </p>
              <div className="pt-4 border-t border-[#050505]/15 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#050505]" aria-hidden="true" />
                <span>ACTIVE STUDENT PRACTICE</span>
              </div>
            </div>

            <div className="lg:col-span-8 font-sans text-base sm:text-lg leading-relaxed text-[#050505]/85 space-y-6">
              {about.narrative.map((paragraph, idx) => (
                <p key={idx} className="font-normal">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Core Focus Domains in Editorial Ledger */}
          <div className="pt-12 md:pt-16">
            <div className="flex items-baseline justify-between border-b border-[#050505]/15 pb-4 font-mono text-xs">
              <span className="uppercase font-bold tracking-wider">{about.focusHeading}</span>
              <span className="text-[#050505]/60">04 ARCHITECTURAL VECTORS</span>
            </div>

            <div className="divide-y divide-[#050505]/15">
              {about.focusAreas.map((area) => (
                <div
                  key={area.index}
                  className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline transition-colors hover:bg-[#050505]/[0.02]"
                >
                  <span className="font-mono text-xs text-[#050505]/60 sm:col-span-2">
                    {area.index} // DOMAIN
                  </span>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#050505] sm:col-span-4">
                    {area.label}
                  </h3>
                  <p className="font-sans text-sm text-[#050505]/75 leading-relaxed sm:col-span-6">
                    {area.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
