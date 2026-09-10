import { finoraData } from "@/data/projects/finora";

export function FinoraTraceViewer() {
  const { trace } = finoraData;

  return (
    <div className="finora-trace-viewer" data-trace-section>
      <div className="mb-8">
        <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
          {trace.description}
        </p>
      </div>

      {/* Safe Execution Provenance Terminal/Log */}
      <div
        className="bg-[#080808] border border-line rounded p-6 sm:p-8"
        data-trace-reveal
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line mb-6 font-mono text-xs text-secondary">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-primary font-bold">STATE TRANSITION LOG</span>
          </div>
          <div className="text-[11px]">
            [ PRIVACY: PRIVATE CHAIN-OF-THOUGHT STRIPPED ]
          </div>
        </div>

        <div className="space-y-4">
          {trace.sampleTrace.map((entry, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 p-3 rounded bg-white/[0.02] border border-white/5 hover:border-line transition-colors"
            >
              <div className="font-mono text-primary font-bold sm:min-w-[130px] flex-shrink-0 text-xs">
                {entry.step}
              </div>
              <div className="font-sans text-secondary text-xs sm:text-sm leading-relaxed sm:border-l sm:border-line sm:pl-6">
                {entry.event}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-line font-mono text-[11px] text-secondary flex flex-wrap items-center justify-between gap-4">
          <span>AUDITABLE PROVENANCE: GUARANTEED</span>
          <span>CLIENT-SIDE EXPLAINABILITY: EMBEDDED IN RESPONSE JSON</span>
        </div>
      </div>
    </div>
  );
}
