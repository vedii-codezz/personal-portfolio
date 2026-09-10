"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { aptlyData } from "@/data/projects/aptly";

export function AptlyStatusMatrix() {
  const { quadState } = aptlyData;
  const [activeId, setActiveId] = useState<string>("UNKNOWN");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeState =
    quadState.states.find((s) => s.id === activeId) ?? quadState.states[0];
  const activeIndex = quadState.states.findIndex((s) => s.id === activeId);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % quadState.states.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + quadState.states.length) % quadState.states.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = quadState.states.length - 1;
    }

    if (nextIndex >= 0) {
      setActiveId(quadState.states[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="w-full">
      {/* Thesis Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-line">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-secondary tracking-widest uppercase">
            [ CORE INVARIANT ]
          </span>
          <span className="font-mono text-sm sm:text-base text-primary font-bold tracking-tight px-3 py-1 bg-white/5 border border-line rounded">
            {quadState.thesis}
          </span>
        </div>
        <span className="font-mono text-xs text-secondary">
          FOUR-VALUED LOGIC ENGINE
        </span>
      </div>

      {/* State Selector Bar (Tablist) */}
      <div
        role="tablist"
        aria-label="Quad-state evaluation states"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-1.5 bg-black/40 border border-line rounded mb-8"
      >
        {quadState.states.map((st, idx) => {
          const isActive = st.id === activeId;
          return (
            <button
              key={st.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              role="tab"
              id={`tab-${st.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${st.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(st.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`min-h-[48px] px-4 py-3 rounded text-left transition-all flex items-center justify-between gap-2 border font-mono text-xs cursor-pointer select-none ${
                isActive
                  ? "bg-primary text-canvas border-primary font-bold shadow-sm"
                  : "bg-transparent text-secondary border-transparent hover:text-primary hover:border-line"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-sm ${
                    isActive ? "text-canvas" : "text-primary"
                  }`}
                  aria-hidden="true"
                >
                  {st.symbol}
                </span>
                <span className="tracking-wider">{st.label}</span>
              </div>
              <span
                className={`text-[10px] tracking-widest ${
                  isActive ? "text-canvas/70" : "text-secondary/60"
                }`}
              >
                0{idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active State Inspector (Tabpanel) */}
      <div
        role="tabpanel"
        id={`panel-${activeState.id}`}
        aria-labelledby={`tab-${activeState.id}`}
        className="p-6 sm:p-8 md:p-10 border border-line bg-[#0d0d0d] rounded"
      >
        {/* Top Inspector Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-line font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            <span className="text-primary font-bold tracking-wider">
              STATE 0{activeIndex + 1} // {activeState.label}
            </span>
            <span className="text-line" aria-hidden="true">/</span>
            <span className="text-secondary tracking-tight">
              {activeState.meaning}
            </span>
          </div>
          <span className="text-[11px] text-secondary tracking-widest uppercase">
            [ DETERMINISTIC EVALUATOR DISPOSITION ]
          </span>
        </div>

        {/* Detailed Grid: Evaluation Mechanics */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left: Definition & Criteria */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[11px] text-secondary uppercase tracking-widest block mb-3">
                EVALUATION CRITERIA
              </span>
              <p className="font-sans text-base sm:text-lg text-primary leading-relaxed mb-6">
                {activeState.criteria}
              </p>
            </div>

            <div className="pt-6 border-t border-line/60">
              <span className="font-mono text-[11px] text-secondary uppercase tracking-widest block mb-2">
                SYSTEM DISPOSITION
              </span>
              <p className="font-mono text-xs sm:text-sm text-secondary leading-relaxed">
                {activeState.disposition}
              </p>
            </div>
          </div>

          {/* Right: Concrete Trace Example (De-boxed open right column) */}
          <div className="md:col-span-5 flex flex-col justify-between pt-6 md:pt-0 md:pl-8 border-t md:border-t-0 md:border-l border-line">
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] text-secondary pb-3 mb-4 border-b border-line/60">
                <span>CONCRETE DEMO TRACE</span>
                <span>STATE ID: {activeState.id}</span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-primary leading-relaxed p-4 rounded bg-black/40 border border-line/40">
                <span className="text-secondary block mb-1.5">// Evaluator Trace Output</span>
                {activeState.example}
              </div>
            </div>

            {activeState.id === "UNKNOWN" && (
              <div className="mt-6 pt-4 border-t border-line/60 font-mono text-[11px] text-secondary">
                <span className="text-primary font-semibold block mb-1">
                  CRITICAL DISTINCTION:
                </span>
                Missing information is an opportunity to clarify, never a reason
                to disqualify an eligible candidate.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
