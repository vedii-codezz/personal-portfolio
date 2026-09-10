"use client";

import { useState } from "react";
import type { ScoreFactorData } from "@/data/projects/veyra";

interface VeyraScoreInspectorProps {
  compositeScore: number;
  tier: string;
  tierDefinition: string;
  notice: string;
  tiers: readonly {
    readonly tier: string;
    readonly range: string;
    readonly trait: string;
  }[];
  factors: readonly ScoreFactorData[];
}

export function VeyraScoreInspector({
  compositeScore,
  tier,
  tierDefinition,
  notice,
  tiers,
  factors,
}: VeyraScoreInspectorProps) {
  const [activeFactorId, setActiveFactorId] = useState<string>(factors[0].id);

  const activeFactor = factors.find((f) => f.id === activeFactorId) || factors[0];

  return (
    <div className="veyra-score-inspector space-y-8" data-score-inspector>
      {/* Metric Transparency Disclaimer Banner */}
      <div className="p-4 sm:p-5 border border-line bg-[#0a0a0a] rounded flex items-start gap-4">
        <span className="font-mono text-xs text-primary px-2 py-0.5 border border-line bg-[#141414] shrink-0">
          DISCLAIMER
        </span>
        <p className="font-mono text-[11px] sm:text-xs text-secondary leading-relaxed">
          {notice}
        </p>
      </div>

      {/* Top Banner: Monumental Composite Metric Card */}
      <div className="p-6 sm:p-10 border border-line bg-[#0a0a0a] rounded flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-2">
            WEIGHTED COMPOSITE INDEX // 4-FACTOR ARITHMETIC
          </span>
          <div className="flex items-baseline gap-4">
            <span className="font-sans text-6xl sm:text-8xl font-normal tracking-tighter text-primary leading-none">
              {compositeScore}
            </span>
            <span className="font-mono text-lg text-secondary">/ 100</span>
            <span className="font-mono text-xs px-2.5 py-1 border border-primary bg-primary text-canvas font-bold uppercase tracking-wider ml-2">
              TIER: {tier}
            </span>
          </div>
          <p className="font-sans text-secondary text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            {tierDefinition}
          </p>
        </div>

        {/* Proportional Contribution Stack */}
        <div className="w-full md:w-72 p-4 border border-line bg-[#050505] rounded space-y-3 shrink-0">
          <div className="flex justify-between items-center font-mono text-[10px] text-secondary tracking-wider uppercase border-b border-line pb-2">
            <span>FACTOR CONTRIBUTION</span>
            <span>POINTS</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {factors.map((f) => (
              <div key={f.id} className="flex justify-between items-center">
                <span className="text-secondary text-[11px] truncate pr-2">{f.name}</span>
                <span className="text-primary font-medium">+{f.contribution.toFixed(1)}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-line flex justify-between items-center font-semibold text-primary">
              <span>TOTAL COMPOSITE</span>
              <span>{compositeScore} PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Benchmark Spectrum */}
      <div className="space-y-3">
        <span className="font-mono text-xs text-secondary uppercase tracking-widest block">
          PROTOTYPE TIER SPECTRUM
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {tiers.map((t) => {
            const isCurrentTier = t.tier === tier;
            return (
              <div
                key={t.tier}
                className={`p-3.5 border rounded flex flex-col justify-between gap-2 ${
                  isCurrentTier
                    ? "bg-[#141414] border-primary"
                    : "bg-[#0a0a0a] border-line opacity-75"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tracking-wider text-primary">
                    {t.tier}
                  </span>
                  {isCurrentTier && (
                    <span className="font-mono text-[9px] px-1 border border-primary bg-primary text-canvas font-bold">
                      ACTIVE
                    </span>
                  )}
                </div>
                <span className="font-mono text-[11px] text-secondary">{t.range} PTS</span>
                <p className="font-sans text-[11px] text-secondary leading-snug pt-1 border-t border-line/40">
                  {t.trait}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive 4-Factor Weighted Sub-Metric Inspector */}
      <div className="space-y-4">
        <span className="font-mono text-xs text-secondary uppercase tracking-widest block">
          SELECT FACTOR TO AUDIT UNDERLYING ARITHMETIC
        </span>

        {/* Factor Selector Tabs */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          role="tablist"
          aria-label="Score Factor Breakdown"
        >
          {factors.map((factor) => {
            const isActive = factor.id === activeFactorId;
            return (
              <button
                key={factor.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`factor-panel-${factor.id}`}
                id={`factor-tab-${factor.id}`}
                onClick={() => setActiveFactorId(factor.id)}
                className={`p-4 rounded border text-left transition-all min-h-[56px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "bg-[#141414] border-primary"
                    : "bg-[#0a0a0a] border-line hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs font-semibold text-primary">
                    {factor.name}
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 border border-line text-secondary">
                    {factor.weightPercent}% WEIGHT
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-3 font-mono text-xs">
                  <span className="text-secondary text-[11px]">Subscore:</span>
                  <span className="text-primary font-medium">{factor.score} / 100</span>
                </div>
                <div className="w-full h-1.5 bg-[#111111] border border-line mt-2 overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Factor Arithmetic Deep Dive */}
        <div
          id={`factor-panel-${activeFactor.id}`}
          role="tabpanel"
          aria-labelledby={`factor-tab-${activeFactor.id}`}
          className="p-6 sm:p-8 border border-line bg-[#0a0a0a] rounded space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <span className="font-mono text-[10px] text-secondary uppercase tracking-widest block mb-1">
                MATHEMATICAL FORMULATION // FACTOR ID: {activeFactor.id}
              </span>
              <h4 className="font-sans text-xl sm:text-2xl font-semibold text-primary tracking-tight">
                {activeFactor.name}
              </h4>
            </div>

            <div className="font-mono text-xs flex items-center gap-4 bg-[#050505] p-3 border border-line rounded">
              <div>
                <span className="text-secondary text-[10px] block">WEIGHT COEFFICIENT</span>
                <span className="text-primary font-bold">{activeFactor.weightDecimal.toFixed(2)} ({activeFactor.weightPercent}%)</span>
              </div>
              <div className="border-l border-line pl-4">
                <span className="text-secondary text-[10px] block">CONTRIBUTION</span>
                <span className="text-primary font-bold">+{activeFactor.contribution.toFixed(2)} PTS</span>
              </div>
            </div>
          </div>

          {/* Formula Display */}
          <div className="p-4 border border-line bg-[#050505] rounded font-mono text-xs sm:text-sm text-primary overflow-x-auto">
            <span className="text-secondary text-[10px] uppercase block mb-1">VERIFIED COMPUTATION:</span>
            <code>{activeFactor.formula}</code>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-sm">
            <div className="space-y-2">
              <span className="font-mono text-xs text-secondary uppercase tracking-wider block">
                MATHEMATICAL PURPOSE
              </span>
              <p className="text-secondary leading-relaxed">
                {activeFactor.explanation}
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-secondary uppercase tracking-wider block">
                DERIVATION FROM MARCH 2024 FIXTURES
              </span>
              <p className="text-primary font-mono text-xs bg-[#050505] p-3 border border-line rounded leading-relaxed">
                {activeFactor.derivedFrom}
              </p>
              <span className="font-mono text-[11px] text-secondary block mt-1">
                Benchmark: {activeFactor.benchmark}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
