"use client";

import { useState, useId, KeyboardEvent } from "react";
import { finoraData } from "@/data/projects/finora";

export function FinoraAgentTheatre() {
  const { specialists } = finoraData;
  const [activeId, setActiveId] = useState<string>(specialists.agents[0].id);
  const baseId = useId();

  const activeAgent =
    specialists.agents.find((agent) => agent.id === activeId) ||
    specialists.agents[0];

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = specialists.agents.findIndex((a) => a.id === activeId);
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % specialists.agents.length;
      setActiveId(specialists.agents[nextIndex].id);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex =
        (currentIndex - 1 + specialists.agents.length) %
        specialists.agents.length;
      setActiveId(specialists.agents[prevIndex].id);
    }
  };

  return (
    <div className="finora-agent-theatre" data-theatre-section>
      <div className="mb-8">
        <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
          {specialists.description}
        </p>
      </div>

      {/* Desktop & Tablet: Left Directory + Right Technical Instrument Stage */}
      <div
        className="theatre-layout grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border border-line rounded bg-[#080808] p-4 sm:p-6 lg:p-8"
        onKeyDown={handleKeyDown}
        role="region"
        aria-label="Interactive Seven Specialists directory and inspector"
      >
        {/* Left Side Agent Directory */}
        <div className="lg:col-span-4 flex flex-col gap-1 border-b lg:border-b-0 lg:border-r border-line pb-6 lg:pb-0 lg:pr-6">
          <div className="flex items-center justify-between font-mono text-[11px] text-secondary pb-3 mb-2 border-b border-white/5">
            <span>SPECIALIST REGISTRY</span>
            <span className="text-primary font-bold">07 DOMAIN AGENTS</span>
          </div>

          {/* Horizontal scroll on mobile with edge fade indicator */}
          <div className="relative">
            <div
              className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-none"
              role="tablist"
              aria-orientation="vertical"
            >
              {specialists.agents.map((agent, index) => {
                const isActive = agent.id === activeId;
                const tabId = `${baseId}-tab-${agent.id}`;
                const panelId = `${baseId}-panel-${agent.id}`;

                return (
                  <button
                    key={agent.id}
                    id={tabId}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveId(agent.id)}
                    className={`flex-shrink-0 text-left px-4 py-3 rounded font-mono text-xs transition-all flex items-center justify-between gap-3 ${
                      isActive
                        ? "bg-primary text-canvas font-semibold shadow-sm"
                        : "text-secondary hover:text-primary hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] ${isActive ? "text-canvas/80" : "text-secondary/60"}`}>
                        0{index + 1}
                      </span>
                      <span>{agent.name}</span>
                    </div>
                    <span className={`text-[10px] hidden sm:inline ${isActive ? "text-canvas/80" : "text-secondary/40"}`}>
                      [{agent.tool}]
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Mobile edge fade to signal scrollability */}
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#080808] to-transparent lg:hidden"
              aria-hidden="true"
            />
          </div>

          <div className="mt-2 text-[10px] font-mono text-secondary/60 flex items-center justify-between lg:hidden">
            <span>SWIPE TO REVEAL ALL 07 AGENTS →</span>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 hidden lg:block text-[11px] font-mono text-secondary/60">
            Use ↑ / ↓ arrow keys to cycle through specialists.
          </div>
        </div>

        {/* Right Side Active Technical Instrument Stage */}
        <div
          id={`${baseId}-panel-${activeAgent.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeAgent.id}`}
          className="lg:col-span-8 flex flex-col justify-between pt-2 lg:pt-0"
          data-theatre-reveal
        >
          <div>
            {/* Stage Title and Tool Signature */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-line mb-6">
              <div>
                <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-1">
                  ACTIVE SPECIALIST INSTRUMENT
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-primary">
                  {activeAgent.name}
                </h3>
              </div>
              <div className="font-mono text-xs text-primary/80 bg-white/5 border border-line px-3 py-1.5 rounded">
                <code>{activeAgent.file}</code>
              </div>
            </div>

            {/* Role & Objective in Geist Sans */}
            <div className="mb-6">
              <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-2">
                CORE RESPONSIBILITY
              </span>
              <p className="font-sans text-base sm:text-lg text-primary leading-relaxed">
                {activeAgent.role}
              </p>
            </div>

            {/* Input Schema */}
            <div className="mb-6">
              <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-2">
                INPUT PARAMETERS
              </span>
              <div className="font-mono text-xs sm:text-sm text-secondary bg-black/60 border border-line p-3 rounded">
                <code>{activeAgent.inputs}</code>
              </div>
            </div>

            {/* Deterministic Logic / Formulation */}
            <div className="mb-6">
              <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-2">
                {activeAgent.logicLabel || "DETERMINISTIC LOGIC"}
              </span>
              <div className="font-mono text-xs sm:text-sm text-primary bg-[#0f0f0f] border border-line p-4 rounded overflow-x-auto whitespace-pre-wrap">
                <code>{activeAgent.math}</code>
              </div>
            </div>

            {/* Findings & Safety Output in Geist Sans */}
            <div>
              <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-2">
                STRUCTURED FINDINGS &amp; VERDICT
              </span>
              <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed bg-white/5 p-4 rounded border border-line">
                {activeAgent.finding}
              </p>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="pt-6 mt-8 border-t border-line flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-secondary">
            <span>EXECUTED BY: finance_engine.py</span>
            <span>PROBABILISTIC ARITHMETIC: FORBIDDEN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
