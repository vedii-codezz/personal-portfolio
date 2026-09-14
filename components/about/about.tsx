import { portfolio } from "@/data/portfolio";

export function About() {
  const { about } = portfolio;

  return (
    <section
      id={about.id}
      className="about-inverted bg-[#f3f3ef] text-[#050505] py-24 sm:py-36 my-24 transition-colors selection:bg-[#050505] selection:text-[#f3f3ef]"
      aria-labelledby="about-title"
      data-about
    >
      <div className="site-gutter">
        {/* Minimal Section Label */}
        <div className="flex items-baseline justify-between border-b border-[#050505]/15 pb-4 font-mono text-xs tracking-wider">
          <span className="font-bold">03 // ABOUT</span>
          <span className="text-[#050505]/75 uppercase">{about.annotation}</span>
        </div>

        <div className="about-content pt-16 sm:pt-24 space-y-20 sm:space-y-28" data-about-reveal>
          {/* Monumental Editorial Headline */}
          <div>
            <h2 id="about-title" className="font-sans font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.92]">
              {about.heading[0]}
              <span className="block text-[#050505]/60 mt-2 font-medium">
                {about.heading[1]}
              </span>
            </h2>
          </div>

          {/* 3 Open Numbered Pillars (No generic cards, generous whitespace) */}
          <div className="divide-y divide-[#050505]/15 border-t border-b border-[#050505]/15">
            {about.pillars.map((pillar) => (
              <div
                key={pillar.index}
                className="py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline"
              >
                <span className="font-mono text-xs font-semibold text-[#050505]/75 sm:col-span-2 tracking-widest">
                  {pillar.index}
                </span>
                <h3 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-[#050505] sm:col-span-4">
                  {pillar.label}
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#050505]/80 leading-relaxed sm:col-span-6 font-normal">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
