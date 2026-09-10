import { portfolio } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/section-label";

export function About() {
  const about = portfolio.about;

  return (
    <section id={about.id} className="about site-gutter" aria-labelledby="about-title" data-about>
      <SectionLabel {...about} />

      <div className="dossier-layout pt-12 md:pt-16" data-about-reveal>
        {/* Architectural Dossier Header */}
        <div className="dossier-header pb-8 md:pb-12">
          <div className="dossier-meta grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {about.meta.map((item) => (
              <div key={item.label} className="metadata flex flex-col gap-1">
                <span className="text-secondary">{item.label}</span>
                <span className="font-medium text-primary">{item.value}</span>
              </div>
            ))}
          </div>

          <h2 id="about-title" className="dossier-display mt-8 text-secondary">
            {about.heading.join(" / ")}
          </h2>
        </div>

        {/* Identity Fragments */}
        <div className="dossier-fragments border-b border-line pt-6 pb-12 md:pt-8 md:pb-16" data-about-reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {about.fragments.map((fragment, idx) => (
              <div key={fragment} className="fragment-block flex flex-col gap-3">
                <span className="metadata text-secondary">FRAGMENT // 0{idx + 1}</span>
                <p className="fragment-text">{fragment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative & Philosophy */}
        <div className="dossier-narrative border-b border-line py-12 md:py-16" data-about-reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <span className="metadata text-secondary">ENGINEERING OUTLOOK</span>
              <p className="mt-2 text-sm text-secondary">
                Systems, models, and interfaces explored from first principles.
              </p>
            </div>
            <div className="dossier-prose flex flex-col gap-6 md:col-span-8">
              {about.narrative.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Core Focus Areas */}
        <div className="dossier-focus py-12 md:py-16" data-about-reveal>
          <div className="mb-8 flex items-baseline justify-between border-b border-line pb-4">
            <span className="metadata text-secondary">{about.focusHeading}</span>
            <span className="metadata text-secondary">04 DOMAINS</span>
          </div>

          <div className="focus-index divide-y divide-line">
            {about.focusAreas.map((area) => (
              <div
                key={area.index}
                className="focus-row grid grid-cols-1 items-baseline gap-2 py-6 sm:grid-cols-12 sm:gap-6"
              >
                <span className="metadata text-secondary sm:col-span-2">
                  {area.index} // DOMAIN
                </span>
                <h3 className="focus-label text-xl font-medium sm:col-span-4">{area.label}</h3>
                <p className="text-sm text-secondary sm:col-span-6">{area.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
