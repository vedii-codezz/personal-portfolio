"use client";

import { handleTabKeyDown } from "@/lib/tab-keyboard";

import { useState } from "react";
import type { CategoryBudgetData } from "@/data/projects/veyra";

interface VeyraBudgetFieldProps {
  categories: readonly CategoryBudgetData[];
  statusLegend: readonly {
    readonly label: string;
    readonly rule: string;
    readonly trait: string;
  }[];
}

export function VeyraBudgetField({ categories, statusLegend }: VeyraBudgetFieldProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryBudgetData>(
    categories[0]
  );

  return (
    <div className="veyra-budget-field space-y-8" data-budget-field>
      <p className="font-mono text-xs text-secondary">[CONCEPTUAL VISUALIZATION] Categories and states illustrate relationships, not measured category results.</p>
      {/* Visual Status Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 sm:p-5 border border-line bg-[#0a0a0a] rounded text-xs font-mono">
        {statusLegend.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 border ${
                  item.label === "HEALTHY"
                    ? "border-primary bg-transparent"
                    : item.label === "WARNING"
                    ? "border-primary bg-primary/40"
                    : "border-primary bg-primary"
                }`}
                aria-hidden="true"
              />
              <span className="font-semibold text-primary tracking-wider">{item.label}</span>
              <span className="text-secondary text-[11px]">({item.rule})</span>
            </div>
            <p className="text-secondary text-[11px] leading-relaxed">{item.trait}</p>
          </div>
        ))}
      </div>

      {/* Main Budget Matrix Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Proportional Category Bands (8 Categories) */}
        <div
          className="lg:col-span-7 space-y-3"
          role="tablist"
          onKeyDown={handleTabKeyDown}
          aria-label="Category Budget Envelopes"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory.category === cat.category;
            
            
            

            return (
              <button
                key={cat.category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                aria-controls={`panel-${cat.category}`}
                id={`tab-${cat.category}`}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left p-4 rounded border transition-all duration-200 min-h-[64px] group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? "bg-[#141414] border-primary shadow-sm"
                    : "bg-[#0a0a0a] border-line hover:border-primary/50 hover:bg-[#0f0f0f]"
                }`}
              >
                {/* Header row: Name, Status tag, and Figures */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs uppercase tracking-wider ${
                        isSelected ? "text-primary font-semibold" : "text-primary"
                      }`}
                    >
                      {cat.category}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 border `}
                    >
                      CATEGORY
                    </span>
                  </div>

                  <div className="font-mono text-xs text-right">
                    <span className="text-primary font-medium">RECORDS</span>
                    <span className="text-secondary mx-1.5">/</span>
                    <span className="text-secondary">ALLOCATION</span>
                  </div>
                </div>

                {/* Conceptual envelope: no measured utilization */}
                <div className="w-full h-3 bg-[#111111] border border-line rounded-xs overflow-hidden relative">
                  {/* Utilization bar */}
                  <div
                    className="h-full bg-primary/30 transition-all duration-300"
                    style={{ width: "100%" }} aria-hidden="true"
                  />
                </div>

                {/* Footnote ratio */}
                <div className="flex items-center justify-between mt-1.5 font-mono text-[10px] text-secondary">
                  <span>CONCEPTUAL ENVELOPE</span>
                  <span>
                    RELATIONSHIP ONLY
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Selected Category Inspection Panel */}
        <div
          id={`panel-${selectedCategory.category}`}
          role="tabpanel"
          aria-labelledby={`tab-${selectedCategory.category}`}
          className="lg:col-span-5 p-6 sm:p-8 border border-primary/40 bg-[#0d0d0d] rounded space-y-6 lg:sticky lg:top-24"
        >
          {/* Panel Header */}
          <div className="flex items-start justify-between border-b border-line pb-4">
            <div>
              <span className="font-mono text-[10px] text-secondary uppercase tracking-widest block mb-1">
                ENVELOPE INSPECTION
              </span>
              <h3 className="font-sans text-2xl font-semibold text-primary tracking-tight">
                {selectedCategory.category}
              </h3>
            </div>
            <div className="text-right">
              <span
                className={`font-mono text-xs px-2.5 py-1 border uppercase tracking-wider inline-block `}
              >
                STRUCTURE
              </span>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-3 border border-line bg-[#050505] rounded">
              <span className="text-secondary text-[10px] uppercase block mb-1">ALLOCATED CAP</span>
              <span className="text-primary font-medium text-sm">
                PLANNED ALLOCATION
              </span>
            </div>

            <div className="p-3 border border-line bg-[#050505] rounded">
              <span className="text-secondary text-[10px] uppercase block mb-1">ACTUAL SPEND</span>
              <span className="text-primary font-medium text-sm">
                CATEGORY RECORDS
              </span>
            </div>

            <div className="p-3 border border-line bg-[#050505] rounded">
              <span className="text-secondary text-[10px] uppercase block mb-1">VARIANCE DELTA</span>
              <span
                className={`font-medium text-sm `}
              >
                ALLOCATION − SPEND
              </span>
            </div>

            <div className="p-3 border border-line bg-[#050505] rounded">
              <span className="text-secondary text-[10px] uppercase block mb-1">BURN RATE</span>
              <span className="text-primary font-medium text-sm">
                SPEND / ALLOCATION
              </span>
            </div>
          </div>

          {/* Contextual Merchant & Ledger Details */}
          <div className="space-y-3 pt-2 border-t border-line font-mono text-xs">
            <div className="flex justify-between py-1 border-b border-line/50">
              <span className="text-secondary">TRANSACTION COUNT</span>
              <span className="text-primary">INPUT RECORDS</span>
            </div>
            <div className="flex justify-between py-1 border-b border-line/50">
              <span className="text-secondary">TOP MERCHANT</span>
              <span className="text-primary font-medium">NOT REPRESENTED</span>
            </div>
          </div>

          {/* Analytical Variance Note */}
          <div className="p-4 border border-line bg-[#050505] rounded">
            <span className="font-mono text-[10px] text-secondary uppercase tracking-wider block mb-1.5">
              OBSERVATION &amp; IMPACT
            </span>
            <p className="text-secondary text-xs sm:text-sm leading-relaxed font-sans">
              {selectedCategory.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
