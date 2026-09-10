"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/section-label";
import { LabPreview } from "./lab-preview";

export function Lab() {
  const lab = portfolio.lab;
  const [activeExperimentId, setActiveExperimentId] = useState<string>(lab.experiments[0].id);

  const currentExperiment =
    lab.experiments.find((e) => e.id === activeExperimentId) ?? lab.experiments[0];

  return (
    <section id={lab.id} className="lab site-gutter" aria-labelledby="lab-title" data-lab>
      <SectionLabel {...lab} />

      <div className="lab-layout pt-12 md:pt-16" data-lab-reveal>
        <header className="lab-header flex flex-col justify-between gap-4 border-b border-line pb-8 md:flex-row md:items-baseline">
          <h2 id="lab-title" className="text-3xl font-medium tracking-tight md:text-4xl">
            {lab.heading}
          </h2>
          <p className="max-w-md text-sm text-secondary">{lab.description}</p>
        </header>

        <div className="lab-workspace mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Experiment Index List */}
          <div className="lab-index divide-y divide-line lg:col-span-7">
            {lab.experiments.map((exp) => {
              const isActive = exp.id === activeExperimentId;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActiveExperimentId(exp.id)}
                  onMouseEnter={() => setActiveExperimentId(exp.id)}
                  onFocus={() => setActiveExperimentId(exp.id)}
                  className={`lab-item group w-full text-left py-6 px-4 -mx-4 transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary ${
                    isActive ? "is-active text-primary" : "text-secondary hover:text-primary"
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="metadata text-xs font-medium tracking-wider">
                      {exp.id} // {exp.substrate}
                    </span>
                    <span className="metadata text-xs opacity-60">
                      {isActive ? "[VIEWING]" : "[SELECT]"}
                    </span>
                  </div>

                  <h3 className="mt-2 text-xl font-medium tracking-tight text-primary">
                    {exp.title}
                  </h3>
                  <p className="mt-1 text-sm text-secondary">{exp.subtitle}</p>

                  <p className="mt-3 text-xs leading-relaxed text-secondary opacity-80">
                    {exp.note}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Instrument Preview Panel (Desktop and Tablet) */}
          <div className="lab-preview-pane lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <LabPreview
              type={currentExperiment.type}
              experimentId={currentExperiment.id}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
