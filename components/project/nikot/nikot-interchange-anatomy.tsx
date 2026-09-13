"use client";

interface NikotInterchangeAnatomyProps {
  hubName: string;
  hubBengaliName: string;
  hubContext: string;
  transferModel: readonly {
    readonly phase: string;
    readonly title: string;
    readonly detail: string;
  }[];
  penaltyPhilosophy: string;
}

export function NikotInterchangeAnatomy({
  hubName,
  hubBengaliName,
  hubContext,
  transferModel,
  penaltyPhilosophy,
}: NikotInterchangeAnatomyProps) {
  return (
    <div className="nikot-interchange-anatomy space-y-8" data-interchange-anatomy>
      {/* Hub Header */}
      <div className="p-6 sm:p-8 border border-line bg-[#0a0a0a] rounded flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-[10px] text-secondary tracking-widest uppercase block mb-1">
            [CONCEPTUAL VISUALIZATION] GRAPH CONNECTION
          </span>
          <h3 className="font-sans text-2xl sm:text-3xl font-semibold text-primary tracking-tight">
            {hubName}
          </h3>
          <span className="font-mono text-xs text-secondary mt-1 block">
            {hubBengaliName} • LINE A → TRANSFER → LINE B
          </span>
        </div>

        <div className="p-4 border border-line bg-[#050505] rounded font-mono text-xs space-y-1 shrink-0">
          <div className="flex justify-between gap-6">
            <span className="text-secondary">RELATIONSHIP</span>
            <span className="text-primary font-bold">TRANSFER EDGE</span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-secondary">DIAGRAM SCOPE</span>
            <span className="text-primary font-bold">CONCEPTUAL</span>
          </div>
        </div>
      </div>

      <p className="font-mono text-xs text-secondary">{hubContext}</p>
      {/* Conceptual graph connection */}
      <div className="p-6 sm:p-8 border border-line bg-[#0a0a0a] rounded space-y-6">
        <span className="font-mono text-xs text-secondary uppercase tracking-widest block">
          LINE A → TRANSFER → LINE B
        </span>

        {/* 4 Transfer Phases Step Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {transferModel.map((phase, idx) => (
            <div
              key={phase.phase}
              className="p-4 border border-line bg-[#050505] rounded flex flex-col justify-between gap-3 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold text-primary px-1.5 py-0.5 border border-line bg-[#111111]">
                    {phase.phase}
                  </span>
                  <span className="font-mono text-[11px] text-secondary">
                    →
                  </span>
                </div>

                <h4 className="font-sans text-sm font-semibold text-primary mb-1">
                  {phase.title}
                </h4>

                <p className="font-sans text-xs text-secondary leading-relaxed">
                  {phase.detail}
                </p>
              </div>

              {idx < transferModel.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 font-mono text-xs text-secondary z-10">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Penalty Philosophy Callout */}
        <div className="p-4 border border-line bg-[#050505] rounded font-mono text-xs text-secondary">
          {penaltyPhilosophy}
        </div>
      </div>
    </div>
  );
}
