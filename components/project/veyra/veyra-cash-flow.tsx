"use client";

import type { CashFlowStreamData } from "@/data/projects/veyra";

interface VeyraCashFlowProps {
  baselineInflow: string;
  inflowLabel: string;
  inflowNotice: string;
  streams: readonly CashFlowStreamData[];
}

export function VeyraCashFlow({
  baselineInflow,
  inflowLabel,
  inflowNotice,
  streams,
}: VeyraCashFlowProps) {
  return (
    <div className="veyra-cash-flow space-y-8" data-cash-flow>
      {/* Top Banner Notice */}
      <div className="p-4 sm:p-5 border border-line bg-[#0a0a0a] rounded flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-primary font-semibold uppercase tracking-wider">
          CONCEPTUAL FINANCIAL FLOW
        </span>
        <span className="font-mono text-[11px] text-secondary tracking-widest hidden sm:inline">
          {inflowNotice}
        </span>
      </div>

      {/* DESKTOP / TABLET ARCHITECTURAL FLOW (Hidden on small mobile) */}
      <div className="hidden md:block p-8 sm:p-10 border border-line bg-[#0a0a0a] rounded overflow-hidden">
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Inflow Origin Anchor */}
          <div className="col-span-4 p-6 border border-primary bg-[#111111] rounded flex flex-col justify-between h-[360px]">
            <div>
              <span className="font-mono text-[10px] text-secondary tracking-widest uppercase block mb-1">
                ORIGIN FEED
              </span>
              <span className="font-mono text-xs text-primary font-semibold tracking-wider block">
                {inflowLabel}
              </span>
            </div>

            <div>
              <span className="font-sans text-4xl sm:text-5xl font-normal text-primary tracking-tighter block">
                {baselineInflow}
              </span>
              <span className="font-mono text-xs text-secondary mt-1 block">
                APPROVED SYNTHETIC INCOME
              </span>
            </div>

            <div className="font-mono text-[11px] text-secondary border-t border-line/60 pt-3">
              Conceptual financial flow visualization; fixed branches are not a quantity scale.
            </div>
          </div>

          {/* Center Column: Parametric Vector Branching SVG */}
          <div className="col-span-2 flex items-center justify-center h-[360px]">
            <svg
              className="w-full h-full text-primary"
              viewBox="0 0 120 360"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Branch 1: Essentials (Top: y=45) */}
              <path
                d="M 0 180 C 60 180, 60 45, 120 45"
                stroke="currentColor"
                strokeWidth="3"
                strokeOpacity="0.85"
                fill="none"
              />
              {/* Branch 2: Lifestyle (Mid-top: y=135) */}
              <path
                d="M 0 180 C 60 180, 60 135, 120 135"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeOpacity="0.65"
                fill="none"
              />
              {/* Branch 3: Investments (Mid-bottom: y=225) */}
              <path
                d="M 0 180 C 60 180, 60 225, 120 225"
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity="0.5"
                fill="none"
              />
              {/* Branch 4: Liquid Buffer (Bottom: y=315) */}
              <path
                d="M 0 180 C 60 180, 60 315, 120 315"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeOpacity="0.95"
                fill="none"
              />
            </svg>
          </div>

          {/* Right Column: 4 Partition Destination Channels */}
          <div className="col-span-6 flex flex-col justify-between h-[360px] gap-3">
            {streams.map((stream) => (
              <div
                key={stream.channel}
                className="p-3.5 border border-line bg-[#050505] rounded flex items-center justify-between gap-4 transition-colors hover:border-primary/50"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-xs font-semibold text-primary">
                      {stream.channel}
                    </span>
                    <span className="font-mono text-[10px] text-secondary">
                      RELATIONSHIP
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-secondary truncate max-w-xs">
                    {stream.classification}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-sm font-semibold text-primary block">
                    {stream.channel}
                  </span>
                  <span className="font-mono text-[9px] text-secondary">
                    STRUCTURAL VIEW
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE RESPONSIVE VERTICAL FLOW (Optimized for 320px - 767px) */}
      <div className="block md:hidden space-y-4">
        {/* Inflow Origin Header */}
        <div className="p-5 border border-primary bg-[#111111] rounded">
          <span className="font-mono text-[10px] text-secondary tracking-widest uppercase block mb-1">
            ORIGIN FEED // {inflowNotice}
          </span>
          <span className="font-mono text-xs text-secondary uppercase block mb-1">
            {inflowLabel}
          </span>
          <span className="font-sans text-4xl font-normal text-primary tracking-tight block">
            {baselineInflow}
          </span>
          <span className="font-mono text-xs text-secondary mt-1 block">
            Approved synthetic income
          </span>
        </div>

        <div className="text-center font-mono text-xs text-secondary py-1">
          ↓ BRANCHING INTO 4 CAPITAL CHANNELS
        </div>

        {/* 4 Partition Channels */}
        <div className="space-y-3">
          {streams.map((stream) => (
            <div
              key={stream.channel}
              className="p-4 border border-line bg-[#0a0a0a] rounded space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-primary tracking-wider">
                  {stream.channel}
                </span>
                <span className="font-mono text-xs px-2 py-0.5 border border-line bg-[#141414] text-primary font-medium">
                  CONCEPTUAL
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="font-sans text-2xl font-normal text-primary">
                  {stream.channel}
                </span>
                <span className="font-mono text-[10px] text-secondary">
                  {stream.classification}
                </span>
              </div>

              {/* Progress Bar Representation */}
              <div className="w-full h-1.5 bg-[#111111] border border-line overflow-hidden mt-2">
                <div
                  className="h-full bg-primary"
                  style={{ width: "100%" }} aria-hidden="true"
                />
              </div>

              <p className="font-sans text-xs text-secondary leading-relaxed pt-1">
                {stream.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stream Partition Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {streams.map((stream) => (
          <div
            key={stream.channel}
            className="p-4 border border-line bg-[#0a0a0a] rounded flex flex-col justify-between gap-3"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-semibold text-primary">
                  {stream.channel}
                </span>
                <span className="font-mono text-[10px] text-secondary">
                  CONCEPTUAL
                </span>
              </div>
              <p className="font-sans text-xs text-secondary leading-relaxed mt-2">
                {stream.description}
              </p>
            </div>

            <div className="pt-3 border-t border-line/50 font-mono text-[10px] text-secondary space-y-1">
              <span className="uppercase tracking-wider block text-primary font-medium">
                RELATED CONCEPTS:
              </span>
              {stream.includedCategories.map((item, idx) => (
                <div key={idx} className="truncate">
                  • {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
