"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { aptlyData } from "@/data/projects/aptly";

export function AptlyGapEngine() {
  const { gapEngine } = aptlyData;
  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    gapEngine.scenarios[0].id
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeScenario =
    gapEngine.scenarios.find((s) => s.id === activeScenarioId) ??
    gapEngine.scenarios[0];

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % gapEngine.scenarios.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + gapEngine.scenarios.length) % gapEngine.scenarios.length;
    }

    if (nextIndex >= 0) {
      setActiveScenarioId(gapEngine.scenarios[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="w-full">
      {/* Engine Header & Class Selector */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 mb-8 border-b border-line">
        <div>
          <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-1">
            [ REMEDIATION STRATIFICATION ]
          </span>
          <span className="font-mono text-xs text-primary font-semibold">
            TWO DISTINCT EVALUATION CLASSES
          </span>
        </div>

        {/* Tablist */}
        <div
          role="tablist"
          aria-label="Gap classification scenarios"
          className="flex flex-wrap gap-2 p-1 bg-black/40 border border-line rounded"
        >
          {gapEngine.scenarios.map((sc, idx) => {
            const isActive = sc.id === activeScenarioId;
            return (
              <button
                key={sc.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                role="tab"
                id={`gap-tab-${sc.id}`}
                aria-selected={isActive}
                aria-controls={`gap-panel-${sc.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveScenarioId(sc.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`min-h-[44px] px-4 py-2 rounded font-mono text-xs cursor-pointer transition-all flex items-center gap-2 border ${
                  isActive
                    ? "bg-primary text-canvas border-primary font-bold shadow-sm"
                    : "bg-transparent text-secondary border-transparent hover:text-primary hover:border-line"
                }`}
              >
                <span>{sc.classification}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Gap Inspector Panel */}
      <div
        role="tabpanel"
        id={`gap-panel-${activeScenario.id}`}
        aria-labelledby={`gap-tab-${activeScenario.id}`}
        className="p-6 sm:p-8 md:p-10 border border-line bg-[#0d0d0d] rounded space-y-8"
      >
        {/* Scenario Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-line font-mono text-xs">
          <div>
            <span className="text-secondary text-[11px] block mb-1">
              SPECIFICATION // {activeScenario.requirementCategory}
            </span>
            <h4 className="font-sans text-xl sm:text-2xl text-primary font-normal">
              {activeScenario.title}
            </h4>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-secondary">CURRENT STATUS:</span>
            <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-black/60 border border-line rounded text-primary">
              {activeScenario.currentStatus}
            </span>
          </div>
        </div>

        {/* Content based on Actionability */}
        {activeScenario.actionable ? (
          /* ACTIONABLE SKILL: 4-PHASE ROADMAP (LEARN -> PRACTICE -> BUILD -> PROVE) */
          <div>
            <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-line/60">
              <span className="text-primary font-semibold tracking-wider">
                TRANSFORMATION ROADMAP // 4 PHASES
              </span>
              <span className="text-secondary text-[11px]">
                CONVERTS GAP TO VERIFIABLE EVIDENCE
              </span>
            </div>

            {/* Connected Stepped Progression (De-boxed open flow) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
              {activeScenario.actionPlan?.map((plan, idx) => (
                <div
                  key={plan.phase}
                  className="space-y-3 pt-4 border-t-2 border-line"
                >
                  <div className="flex items-center justify-between font-mono text-xs pb-1">
                    <span className="font-bold text-primary tracking-wider flex items-center gap-2">
                      <span className="text-[10px] text-secondary">0{idx + 1}</span>
                      <span>{plan.phase}</span>
                    </span>
                    {idx < 3 && (
                      <span className="hidden md:inline text-secondary font-mono" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
                    {plan.action}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-black/40 border border-line rounded font-mono text-xs flex items-center justify-between gap-4">
              <span className="text-secondary">ENGINE VERIFIED OUTCOME:</span>
              <span className="text-primary font-medium">
                {activeScenario.remediationOutcome}
              </span>
            </div>
          </div>
        ) : (
          /* FIXED CONSTRAINT: NOT ACTIONABLE // REALLOCATE EFFORT */
          <div className="space-y-6">
            <div className="p-6 bg-black/60 border border-line rounded space-y-4">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="inline-block w-2 h-2 bg-primary rounded-full" />
                <span className="text-primary font-bold tracking-wider">
                  {activeScenario.statusNotice}
                </span>
              </div>
              <div className="font-mono text-sm sm:text-base text-primary bg-[#111111] p-4 rounded border border-line">
                {activeScenario.recommendation}
              </div>
              <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed pt-2">
                {activeScenario.guidance}
              </p>
            </div>

            <div className="p-4 bg-black/30 border border-line/60 rounded font-mono text-xs text-secondary flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>SYSTEM ETHICS POLICY:</span>
              <span className="text-primary">
                ZERO SUGGESTIONS TO FALSIFY OR MISLEAD RECRUITMENT GATES
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
