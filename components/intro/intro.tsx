import { portfolio } from "@/data/portfolio";

export function Intro() {
  const { intro } = portfolio;

  return (
    <section
      id={intro.id}
      className="intro site-gutter py-24 sm:py-36 lg:py-48 flex flex-col justify-center border-t border-line"
      aria-labelledby="intro-title"
      data-intro
    >
      <div className="max-w-6xl mx-auto w-full space-y-20 sm:space-y-32" data-intro-reveal>
        {/* Moment 1: The Initial Thesis */}
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary block">
            {intro.annotation}
          </span>
          <h2
            id="intro-title"
            className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-primary leading-[0.95]"
          >
            {intro.part1.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        {/* Generous Spatial Divider / Linework */}
        <div className="w-full h-px bg-line/60" aria-hidden="true" />

        {/* Moment 2: The Spatial Unfolding Action */}
        <div className="space-y-4 sm:space-y-6 sm:pl-8 lg:pl-16 border-l border-line/40">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary block">
            THE APPROACH
          </span>
          <p className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.05] text-primary">
            <span className="text-secondary/60 block font-medium text-2xl sm:text-4xl mb-3">
              {intro.part2[0]}
            </span>
            <span className="block">{intro.part2[1]}</span>
            <span className="block text-primary/80">{intro.part2[2]}</span>
            <span className="block text-primary">{intro.part2[3]}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
