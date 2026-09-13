"use client";

import { handleTabKeyDown } from "@/lib/tab-keyboard";

import { useState } from "react";
import type { ScoreStageData } from "@/data/projects/veyra";

interface VeyraScoreInspectorProps {
  notice: string;
  stages: readonly ScoreStageData[];
}

export function VeyraScoreInspector({ notice, stages }: VeyraScoreInspectorProps) {
  const [activeId, setActiveId] = useState<string>(stages[0].id);
  const activeStage = stages.find(stage => stage.id === activeId) || stages[0];

  return (
    <div className="veyra-score-inspector space-y-8" data-score-inspector>
      <div className="p-4 sm:p-5 border border-line bg-[#0a0a0a] rounded flex items-start gap-4">
        <span className="font-mono text-xs text-primary px-2 py-0.5 border border-line bg-[#141414] shrink-0">STRUCTURE</span>
        <p className="font-mono text-[11px] sm:text-xs text-secondary leading-relaxed">{notice}</p>
      </div>
      <div className="p-6 sm:p-10 border border-line bg-[#0a0a0a] rounded flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-2">[VERIFIED ARCHITECTURE] VEYRASCORE</span>
          <div className="flex items-baseline gap-4">
            <span className="font-sans text-6xl sm:text-8xl font-normal tracking-tighter text-primary leading-none">SCORE</span>
            <span className="font-mono text-xs px-2.5 py-1 border border-primary bg-primary text-canvas font-bold uppercase tracking-wider">→ TIER</span>
          </div>
          <p className="font-sans text-secondary text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">Inputs inform a formula; its score maps to a tier.</p>
        </div>
        <div className="w-full md:w-72 p-4 border border-line bg-[#050505] rounded space-y-3 shrink-0">
          <div className="font-mono text-[10px] text-secondary tracking-wider uppercase border-b border-line pb-2">CALCULATION STRUCTURE</div>
          {stages.map(stage => <div key={stage.id} className="font-mono text-xs text-primary">{stage.name}</div>)}
        </div>
      </div>
      <div className="space-y-4">
        <span className="font-mono text-xs text-secondary uppercase tracking-widest block">SELECT A STAGE TO INSPECT ITS RESPONSIBILITY</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" role="tablist"
          onKeyDown={handleTabKeyDown} aria-label="Score Structure">
          {stages.map(stage => {
            const isActive = stage.id === activeId;
            return <button key={stage.id} type="button" role="tab" aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
              aria-controls={`score-panel-${stage.id}`} id={`score-tab-${stage.id}`}
              onClick={() => setActiveId(stage.id)}
              className={`p-4 rounded border text-left transition-all min-h-[64px] focus-visible:ring-2 focus-visible:ring-primary ${isActive ? "bg-[#141414] border-primary" : "bg-[#0a0a0a] border-line hover:border-primary/50"}`}>
              <span className="font-mono text-xs font-semibold text-primary">{stage.name}</span>
              <span className="block mt-3 font-mono text-[11px] text-secondary">{stage.relationship}</span>
            </button>;
          })}
        </div>
        <div id={`score-panel-${activeStage.id}`} role="tabpanel" aria-labelledby={`score-tab-${activeStage.id}`}
          className="p-6 sm:p-8 border border-line bg-[#0a0a0a] rounded space-y-6">
          <div className="border-b border-line pb-4">
            <span className="font-mono text-[10px] text-secondary uppercase tracking-widest">STAGE RESPONSIBILITY</span>
            <h4 className="font-sans text-xl sm:text-2xl font-semibold text-primary tracking-tight">{activeStage.name}</h4>
          </div>
          <div className="p-4 border border-line bg-[#050505] rounded font-mono text-xs sm:text-sm text-primary">{activeStage.relationship}</div>
          <p className="font-sans text-sm text-secondary leading-relaxed">{activeStage.explanation}</p>
        </div>
      </div>
    </div>
  );
}
