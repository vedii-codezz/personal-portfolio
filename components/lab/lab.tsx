"use client";

import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { LabPreview } from "./lab-preview";

export function Lab() {
  const { lab } = portfolio;
  const [activeExperimentId, setActiveExperimentId] = useState<string>(lab.experiments[0].id);

  const currentExperiment =
    lab.experiments.find((e) => e.id === activeExperimentId) ?? lab.experiments[0];

  return (
    <section id={lab.id} className="lab site-gutter py-24 sm:py-36 border-t border-line" aria-labelledby="lab-title" data-lab>
      <div className="lab-layout" data-lab-reveal>
        {/* Minimal High-Impact Header */}
        <div className="pb-8 border-b border-line flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary">
            05 // INTERFACE LAB
          </span>
          <h2 id="lab-title" className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-primary">
            {lab.heading}
          </h2>
        </div>

        {/* Interactive Experimental Workspace */}
        <div className="lab-workspace mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Experiment List */}
          <div className="lab-index divide-y divide-line lg:col-span-6">
            {lab.experiments.map((exp) => {
              const isActive = exp.id === activeExperimentId;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActiveExperimentId(exp.id)}
                  onMouseEnter={() => setActiveExperimentId(exp.id)}
                  onFocus={() => setActiveExperimentId(exp.id)}
                  className={`lab-item group w-full text-left py-6 px-4 -mx-4 transition-colors duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary ${
                    isActive ? "is-active text-primary bg-raised/40" : "text-secondary hover:text-primary"
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-xs font-semibold tracking-wider text-primary">
                      {exp.id} // {exp.substrate}
                    </span>
                    <span className="font-mono text-[10px] text-secondary/60">
                      {isActive ? "[VIEWING]" : "[INSPECT]"}
                    </span>
                  </div>

                  <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-primary">
                    {exp.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-secondary/80 font-normal">
                    {exp.note}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Dynamic SVG Instrument Pane */}
          <div className="lab-preview-pane lg:col-span-6 lg:sticky lg:top-28 lg:self-start">
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
