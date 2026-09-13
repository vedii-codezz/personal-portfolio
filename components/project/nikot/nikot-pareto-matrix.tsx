"use client";

import { handleTabKeyDown } from "@/lib/tab-keyboard";

import { useState } from "react";
import type { ParetoRouteOption } from "@/data/projects/nikot";

interface NikotParetoMatrixProps {
  journeyOverview: {
    corridor: string;
    distanceApprox: string;
    verifiedDatasetCost: string;
  };
  options: readonly ParetoRouteOption[];
}

export function NikotParetoMatrix({ journeyOverview, options }: NikotParetoMatrixProps) {
  const [selectedCriteria, setSelectedCriteria] = useState<string>(options[0].criteriaId);

  const activeOption = options.find((o) => o.criteriaId === selectedCriteria) || options[0];

  return (
    <div className="nikot-pareto-matrix space-y-8" data-pareto-matrix>
      {/* Corridor Header */}
      <div className="p-4 sm:p-5 border border-line bg-[#0a0a0a] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] text-secondary tracking-widest uppercase block mb-1">
            [CONCEPTUAL VISUALIZATION] ROUTE OPTIONS
          </span>
          <h3 className="font-sans text-base sm:text-lg font-semibold text-primary">
            {journeyOverview.corridor}
          </h3>
        </div>

        <div className="text-left sm:text-right font-mono text-xs text-secondary shrink-0">
          <span className="block text-primary font-medium">{journeyOverview.distanceApprox}</span>
          <span className="text-[10px]">{journeyOverview.verifiedDatasetCost}</span>
        </div>
      </div>

      {/* Criteria Selection Tabs */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        role="tablist"
          onKeyDown={handleTabKeyDown}
        aria-label="Multi-Criteria Route Alternatives"
      >
        {options.map((opt) => {
          const isSelected = opt.criteriaId === selectedCriteria;
          return (
            <button
              key={opt.criteriaId}
              type="button"
              role="tab"
              aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
              aria-controls={`route-panel-${opt.criteriaId}`}
              id={`route-tab-${opt.criteriaId}`}
              onClick={() => setSelectedCriteria(opt.criteriaId)}
              className={`p-4 rounded border text-left transition-all min-h-[64px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isSelected
                  ? "bg-[#141414] border-primary shadow-sm"
                  : "bg-[#0a0a0a] border-line hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
                  {opt.criteriaLabel}
                </span>
                <span className="font-sans text-xl font-normal text-primary">
                  →
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px] text-secondary">
                <span>{opt.priority}</span>
                <span>•</span>
                <span></span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Stage-by-Stage Journey Timeline */}
      <div
        id={`route-panel-${activeOption.criteriaId}`}
        role="tabpanel"
        aria-labelledby={`route-tab-${activeOption.criteriaId}`}
        className="p-6 sm:p-8 border border-line bg-[#0a0a0a] rounded space-y-6"
      >
        {/* Metric Summary Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border border-line bg-[#050505] rounded font-mono text-xs">
          <div>
            <span className="text-secondary text-[10px] uppercase block mb-1">TOTAL TIME</span>
            <span className="text-primary font-bold text-base">TRAVEL DURATION</span>
          </div>
          <div>
            <span className="text-secondary text-[10px] uppercase block mb-1">METRO TRANSIT</span>
            <span className="text-primary font-bold text-base">TRANSIT GRAPH</span>
          </div>
          <div>
            <span className="text-secondary text-[10px] uppercase block mb-1">PEDESTRIAN WALK</span>
            <span className="text-primary font-bold text-base">WALKING DURATION</span>
          </div>
          <div>
            <span className="text-secondary text-[10px] uppercase block mb-1">LINE TRANSFERS</span>
            <span className="text-primary font-bold text-base">TRANSFER COUNT</span>
          </div>
        </div>

        {/* Narrative Strategy Description */}
        <div className="font-sans text-sm text-secondary leading-relaxed">
          <strong className="text-primary font-medium">Algorithmic Trade-Off:</strong> {activeOption.summary}
        </div>

        {/* Horizontal Visual Trace (Desktop) / Vertical Steps (Mobile) */}
        <div className="space-y-4 pt-2">
          <span className="font-mono text-xs text-secondary uppercase tracking-widest block">
            JOURNEY STAGE PROGRESSION
          </span>

          <div className="space-y-2">
            {activeOption.stages.map((stage, idx) => (
              <div
                key={idx}
                className="p-3.5 border border-line/50 bg-[#050505] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full border border-primary/40 flex items-center justify-center text-[10px] text-primary shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-primary font-medium block">
                      {stage.label}
                    </span>
                    <span className="text-secondary text-[11px]">
                      {stage.detail}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                  <span className="text-primary font-medium">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
