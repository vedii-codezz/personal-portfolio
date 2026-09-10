import { finoraData } from "@/data/projects/finora";

export function FinoraTopography() {
  const { topography } = finoraData;

  return (
    <div className="finora-topography-container" data-topography-pin>
      <div className="mb-8">
        <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
          {topography.description}
        </p>
      </div>

      {/* Topography Stage Frame (Pinned on desktop >= 1024px, condensed on mobile) */}
      <div
        className="topography-stage-frame bg-[#080808] border border-line rounded p-6 sm:p-8 lg:p-10 relative overflow-hidden"
        data-topography-stage
      >
        {/* Stage Header / Schema Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-secondary border-b border-line pb-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            <span className="text-primary font-semibold tracking-wider uppercase">
              ORCHESTRATION PIPELINE TOPOGRAPHY
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-secondary">[ FAST_DATA: 0 LLM CALLS ]</span>
            <span className="text-line hidden sm:inline">|</span>
            <span className="text-primary hidden sm:inline">[ DECISION: 2-CALL PIPELINE ]</span>
          </div>
        </div>

        {/* 1. Desktop Pipeline Layout (lg:grid >= 1024px) */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative">
          {topography.stages.map((stage) => (
            <div
              key={stage.id}
              className="topo-stage-card flex flex-col justify-between p-5 bg-[#0d0d0d] border border-line rounded transition-all min-h-[265px] relative"
              data-topo-stage-card
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] mb-3 pb-2 border-b border-white/5">
                  <span
                    className="px-2 py-0.5 rounded border border-white/10 text-secondary transition-colors"
                    data-topo-step-chip
                  >
                    {stage.step}
                  </span>
                  <span className="tracking-wider uppercase text-[10px] text-secondary/70 font-mono">
                    {stage.type}
                  </span>
                </div>

                <h3 className="text-base font-medium text-primary mb-3">
                  {stage.name}
                </h3>

                <p className="font-sans text-secondary text-xs leading-relaxed mb-4">
                  {stage.detail}
                </p>
              </div>

              {/* Specific stage badges and visual indicators */}
              {stage.id === "router" && (
                <div className="pt-3 border-t border-white/5" data-topo-router-path>
                  <div className="font-mono text-[10px] text-primary/80 bg-white/5 p-2 rounded flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">BYPASS ROUTE:</span>
                      <span className="text-primary font-bold">FAST_DATA</span>
                    </div>
                    <span className="text-[9px] text-secondary font-sans">
                      Profile lookup → Immediate JSON (0 tokens)
                    </span>
                  </div>
                </div>
              )}

              {stage.id === "orchestrator" && (
                <div className="pt-3 border-t border-white/5">
                  <div className="font-mono text-[10px] text-secondary bg-white/5 p-2 rounded">
                    <span>AGENT_TOOLS (7 schemas)</span>
                  </div>
                </div>
              )}

              {stage.id === "agents" && (
                <div className="pt-3 border-t border-white/5" data-topo-math-indicator>
                  <div className="font-mono text-[10px] text-primary bg-white/5 p-2 rounded">
                    <span className="font-semibold block text-primary">DETERMINISTIC MATH</span>
                    <span className="text-[9px] text-secondary block font-sans">
                      Python 3.13 stdlib only
                    </span>
                  </div>
                </div>
              )}

              {stage.id === "judge" && (
                <div className="pt-3 border-t border-white/5" data-topo-revision-path>
                  <div className="font-mono text-[10px] text-secondary bg-white/5 p-2 rounded flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-primary">REVISION LOOP:</span>
                      <span className="text-secondary">≤ 2 PASSES</span>
                    </div>
                    <span className="text-[9px] text-secondary/80 font-sans">
                      response_ok vs transaction_safe
                    </span>
                  </div>
                </div>
              )}

              {stage.id === "synthesis" && (
                <div className="pt-3 border-t border-white/5">
                  <div className="font-mono text-[10px] text-primary bg-white/5 p-2 rounded">
                    <span>Final advice + Trace</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 2. Mobile & Tablet Streamlined Flow (< 1024px) */}
        <div className="lg:hidden flex flex-col gap-3">
          {topography.stages.map((stage) => (
            <div
              key={`m-${stage.id}`}
              className="p-4 bg-[#0d0d0d] border border-line rounded flex flex-col gap-2"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-primary font-bold">
                    {stage.step}
                  </span>
                  <span className="text-primary font-semibold">{stage.name}</span>
                </div>
                <span className="text-[10px] text-secondary uppercase">{stage.type}</span>
              </div>
              <p className="font-sans text-xs text-secondary leading-relaxed">
                {stage.detail}
              </p>
              {stage.id === "router" && (
                <div className="mt-1 pt-2 border-t border-white/5 font-mono text-[10px] text-secondary flex items-center justify-between">
                  <span>FAST_DATA BYPASS:</span>
                  <span className="text-primary font-bold">0 LLM calls (~15ms)</span>
                </div>
              )}
              {stage.id === "judge" && (
                <div className="mt-1 pt-2 border-t border-white/5 font-mono text-[10px] text-secondary flex items-center justify-between">
                  <span>BOUNDED REVISION:</span>
                  <span className="text-primary">≤ 2 iterations cap</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Global Fast-Path Bypass Visualization Bar */}
        <div
          className="mt-6 pt-6 border-t border-line font-mono text-xs text-secondary flex flex-col md:flex-row md:items-center justify-between gap-4 bg-black/40 p-4 rounded"
          data-topo-bypass-path
        >
          <div className="flex items-center gap-3">
            <span className="text-primary font-bold">[BYPASS ARCHITECTURE]</span>
            <span className="font-sans">FAST_DATA path bypasses Orchestrator, Specialists, and Synthesis entirely.</span>
          </div>
          <div className="flex items-center gap-2 text-primary text-[11px]">
            <span className="px-2 py-0.5 rounded border border-line bg-white/5">LATENCY: ~15ms</span>
            <span className="px-2 py-0.5 rounded border border-line bg-white/5">COST: ₹0 / $0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
