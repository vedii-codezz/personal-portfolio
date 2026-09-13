"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { aptlyData } from "@/data/projects/aptly";

export function AptlyEvidenceChain() {
  const { evidenceChain } = aptlyData;
  const [activeTraceId, setActiveTraceId] = useState<string>("GPA");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeTrace =
    evidenceChain.traces.find((t) => t.id === activeTraceId) ??
    evidenceChain.traces[0];

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % evidenceChain.traces.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + evidenceChain.traces.length) % evidenceChain.traces.length;
    }

    if (e.key === "Home") { e.preventDefault(); nextIndex = 0; }
    if (e.key === "End") { e.preventDefault(); nextIndex = evidenceChain.traces.length - 1; }

    if (nextIndex >= 0) {
      setActiveTraceId(evidenceChain.traces[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="w-full">
      {/* Forensic Header & Trace Selector */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-line">
        <div>
          <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-2">
            [ FORENSIC PROVENANCE INSPECTOR ]
          </span>
          <h3 className="font-sans text-xl sm:text-2xl font-normal text-primary tracking-tight">
            Deterministic Decision Provenance
          </h3>
        </div>

        {/* Trace Selector Tablist */}
        <div
          role="tablist"
          aria-label="Select evaluation evidence trace"
          className="flex flex-wrap gap-2 p-1 bg-black/40 border border-line rounded"
        >
          {evidenceChain.traces.map((trace, idx) => {
            const isActive = trace.id === activeTraceId;
            return (
              <button
                key={trace.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                role="tab"
                id={`trace-tab-${trace.id}`}
                aria-selected={isActive}
                aria-controls={`trace-panel-${trace.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTraceId(trace.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`min-h-[44px] px-4 py-2 rounded font-mono text-xs cursor-pointer transition-all flex items-center gap-3 border ${
                  isActive
                    ? "bg-primary text-canvas border-primary font-bold shadow-sm"
                    : "bg-transparent text-secondary border-transparent hover:text-primary hover:border-line"
                }`}
              >
                <span className="opacity-60 text-[10px]">0{idx + 1}</span>
                <span>{trace.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trace Metadata Bar with Explicit Demo Notice */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 mb-8 bg-[#0d0d0d] border border-line rounded font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-secondary">SPECIFICATION:</span>
          <span className="text-primary font-semibold">
            {activeTrace.requirementId}
          </span>
          <span className="text-line" aria-hidden="true">/</span>
          <span className="text-primary font-medium">{activeTrace.category}</span>
        </div>
        <div className="flex items-center gap-4 text-secondary">
          <span className="text-[11px] text-primary/80 px-2.5 py-0.5 rounded bg-white/5 border border-line/60">
            DEMONSTRATION FIXTURE // NEUTRAL AUDIT TRACE
          </span>
          <span className="text-line" aria-hidden="true">/</span>
          <span className="text-primary font-medium">
            TIER: {activeTrace.importance}
          </span>
        </div>
      </div>

      {/* The 4 Sequential Stages of Evidence Provenance */}
      <div
        role="tabpanel"
        id={`trace-panel-${activeTrace.id}`}
        aria-labelledby={`trace-tab-${activeTrace.id}`}
        className="space-y-4"
      >
        {/* STAGE 01: SOURCE */}
        <div className="p-6 sm:p-8 bg-[#0a0a0a] border border-line rounded">
          <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-line/60">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-primary text-canvas text-[10px] font-bold">
                01
              </span>
              <span className="text-primary font-semibold tracking-wider">
                STAGE 01 // UNSTRUCTURED SOURCE
              </span>
            </div>
            <span className="text-secondary text-[11px] hidden sm:inline">
              RAW TEXT EXTRACTION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Job Description Side (De-boxed open quote) */}
            <div className="border-l-2 border-line pl-4 sm:pl-5 space-y-2">
              <span className="font-mono text-[11px] text-secondary tracking-wider block">
                ORIGINAL JOB POSTING CLAUSE
              </span>
              <blockquote className="font-mono text-xs sm:text-sm text-primary leading-relaxed">
                &ldquo;{activeTrace.stage1Source.jobText}&rdquo;
              </blockquote>
            </div>

            {/* Candidate Resume Side (De-boxed open quote) */}
            <div className="border-l-2 border-line pl-4 sm:pl-5 space-y-2">
              <div className="flex items-center justify-between font-mono text-[11px] text-secondary tracking-wider">
                <span>DEMONSTRATION DOSSIER CITATION</span>
                <span className="text-[10px] text-secondary/80">
                  {activeTrace.stage1Source.documentLocation}
                </span>
              </div>
              <blockquote className="font-mono text-xs sm:text-sm text-primary leading-relaxed">
                &ldquo;{activeTrace.stage1Source.resumeText}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        {/* PROVENANCE CONNECTOR 1 -> 2 */}
        <div className="flex items-center justify-center py-1">
          <div className="w-px h-6 bg-line" aria-hidden="true" />
        </div>

        {/* STAGE 02: NORMALIZED RULE */}
        <div className="p-6 sm:p-8 bg-[#0a0a0a] border border-line rounded">
          <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-line/60">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-primary text-canvas text-[10px] font-bold">
                02
              </span>
              <span className="text-primary font-semibold tracking-wider">
                STAGE 02 // NORMALIZED SCHEMA RULE
              </span>
            </div>
            <span className="text-secondary text-[11px] font-mono">
              TYPE: {activeTrace.stage2Rule.ruleType}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 border-l-2 border-line pl-4 sm:pl-5">
              <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-2">
                EVALUATION EXPRESSION
              </span>
              <div className="font-mono text-sm sm:text-base text-primary overflow-x-auto py-1">
                <code>{activeTrace.stage2Rule.expression}</code>
              </div>
            </div>
            <div className="md:col-span-4 pl-4 sm:pl-6 border-t md:border-t-0 md:border-l border-line font-mono text-xs">
              <span className="text-secondary block mb-1">OPERATOR: {activeTrace.stage2Rule.operator}</span>
              <span className="text-secondary block mb-1">THRESHOLD:</span>
              <div className="text-primary font-semibold">
                {activeTrace.stage2Rule.targetValue}
              </div>
            </div>
          </div>
        </div>

        {/* PROVENANCE CONNECTOR 2 -> 3 */}
        <div className="flex items-center justify-center py-1">
          <div className="w-px h-6 bg-line" aria-hidden="true" />
        </div>

        {/* STAGE 03: CANDIDATE EVIDENCE & DEPTH */}
        <div className="p-6 sm:p-8 bg-[#0a0a0a] border border-line rounded">
          <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-line/60">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-primary text-canvas text-[10px] font-bold">
                03
              </span>
              <span className="text-primary font-semibold tracking-wider">
                STAGE 03 // EXTRACTED CANDIDATE EVIDENCE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-secondary text-[11px]">EVIDENCE DEPTH:</span>
              <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded border border-line bg-white/5 text-primary">
                {activeTrace.stage3Evidence.evidenceStrength}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6 border-l-2 border-line pl-4 sm:pl-5 space-y-2">
              <span className="font-mono text-[11px] text-secondary tracking-wider block">
                RESOLVED EVIDENCE VALUE
              </span>
              <div className="font-mono text-sm text-primary py-1">
                {activeTrace.stage3Evidence.extractedValue}
              </div>
            </div>

            <div className="md:col-span-6 pl-4 sm:pl-6 border-t md:border-t-0 md:border-l border-line flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] text-secondary tracking-wider block mb-1">
                  DEPTH RATIONALE (NOT MACHINE CONFIDENCE)
                </span>
                <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
                  {activeTrace.stage3Evidence.strengthRationale}
                </p>
              </div>
              <div className="pt-2 font-mono text-[10px] text-secondary">
                CITATIONS CONFIRMED: {activeTrace.stage3Evidence.sourceCount} ARTIFACT(S)
              </div>
            </div>
          </div>
        </div>

        {/* PROVENANCE CONNECTOR 3 -> 4 */}
        <div className="flex items-center justify-center py-1">
          <div className="w-px h-6 bg-line" aria-hidden="true" />
        </div>

        {/* STAGE 04: DETERMINISTIC DECISION */}
        <div className="p-6 sm:p-8 bg-[#111111] border border-primary/40 rounded">
          <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-line">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-primary text-canvas text-[10px] font-bold">
                04
              </span>
              <span className="text-primary font-bold tracking-wider">
                STAGE 04 // DETERMINISTIC VERDICT
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-secondary text-[11px]">DISPOSITION:</span>
              <span
                className={`font-mono text-xs font-bold px-3 py-1 rounded border ${
                  activeTrace.stage4Decision.status === "MATCHED"
                    ? "bg-primary text-canvas border-primary"
                    : "bg-transparent text-primary border-line"
                }`}
              >
                {activeTrace.stage4Decision.status}
              </span>
            </div>
          </div>

          <div className="space-y-4 border-l-2 border-primary/60 pl-4 sm:pl-5">
            <div className="font-mono text-xs sm:text-sm text-primary">
              <span className="text-secondary block mb-1">// Pure Logic Evaluation</span>
              {activeTrace.stage4Decision.verdict}
            </div>
            <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
              {activeTrace.stage4Decision.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Evidence Strength Standards Reference */}
      <div className="mt-12 p-6 bg-[#0a0a0a] border border-line rounded">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 mb-6 border-b border-line">
          <span className="font-mono text-xs text-primary font-semibold tracking-wider">
            EVIDENCE DEPTH SCALE REFERENCE
          </span>
          <span className="font-mono text-[11px] text-secondary">
            PROVENANCE INTEGRITY // REPLACES ARBITRARY MODEL CONFIDENCE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {evidenceChain.evidenceStrengthLevels.map((lvl) => (
            <div
              key={lvl.level}
              className="p-4 bg-black/40 border border-line/60 rounded flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-primary block mb-2">
                  {lvl.level}
                </span>
                <p className="font-mono text-[11px] text-secondary leading-relaxed mb-3">
                  {lvl.criterion}
                </p>
              </div>
              <span className="font-sans text-[11px] text-secondary/80 border-t border-line/40 pt-2 block">
                {lvl.nature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
