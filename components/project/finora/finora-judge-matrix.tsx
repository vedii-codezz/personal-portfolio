import { finoraData } from "@/data/projects/finora";

export function FinoraJudgeMatrix() {
  const { judge } = finoraData;

  return (
    <div className="finora-judge-matrix" data-judge-section>
      <div className="mb-10">
        <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
          {judge.description}
        </p>
      </div>

      {/* Two Orthogonal Axes - Open Typographic Comparison (No heavy boxed cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12" data-judge-reveal>
        {judge.axes.map((axis) => (
          <div
            key={axis.axis}
            className="flex flex-col justify-between border-t border-line pt-6"
          >
            <div>
              <div className="font-mono text-xs text-primary font-bold mb-2 tracking-wider">
                AXIS // {axis.axis}
              </div>
              <h3 className="text-xl sm:text-2xl font-normal text-primary mb-3">
                {axis.title}
              </h3>
              <p className="font-sans text-secondary text-sm sm:text-base leading-relaxed mb-6">
                {axis.definition}
              </p>
            </div>
            <div className="font-mono text-xs text-secondary/80 pt-3 border-t border-white/5">
              <span className="text-primary font-semibold">ENFORCEMENT: </span>
              <span className="font-sans">{axis.rule}</span>
            </div>
          </div>
        ))}
      </div>

      {/* The Core Storytelling Moment: The Paradox Case Study */}
      <div
        className="paradox-stage border border-line rounded bg-[#080808] p-6 sm:p-8 lg:p-10"
        data-judge-reveal
      >
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-secondary pb-4 border-b border-line mb-8">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider">
              [CONCEPTUAL VISUALIZATION] EVALUATION EXAMPLE
            </span>
          </div>
          <span className="text-secondary">[ REAL-WORLD EDGE CASE ]</span>
        </div>

        {/* User Query & Finding - Simplified without redundant nesting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-line mb-8">
          <div className="lg:col-span-5">
            <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-2">
              USER TEST QUERY
            </span>
            <p className="font-mono text-base text-primary">
              &ldquo;{judge.paradoxExample.query}&rdquo;
            </p>
          </div>
          <div className="lg:col-span-7">
            <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-2">
              DETERMINISTIC AGENT FINDING
            </span>
            <p className="font-sans text-base text-secondary leading-relaxed">
              {judge.paradoxExample.agentFinding}
            </p>
          </div>
        </div>

        {/* The Two Dominant Verdict Anchors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="border border-line bg-[#111111] p-6 sm:p-8 rounded">
            <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-2">
              AXIS 1: RESPONSE VALIDITY
            </span>
            <div className="text-2xl sm:text-3xl font-medium text-primary mb-3">
              RESPONSE_OK = TRUE
            </div>
            <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
              {judge.paradoxExample.responseOkLabel}
            </p>
          </div>

          <div className="border border-line bg-[#111111] p-6 sm:p-8 rounded">
            <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-2">
              AXIS 2: TRANSACTION SAFETY
            </span>
            <div className="text-2xl sm:text-3xl font-medium text-primary mb-3">
              TRANSACTION_SAFE = FALSE
            </div>
            <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
              {judge.paradoxExample.transactionSafeLabel}
            </p>
          </div>
        </div>

        {/* Resolution Narrative & Revision Guardrail */}
        <div className="pt-6 border-t border-line grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-2">
              ARCHITECTURAL IMPLICATION
            </span>
            <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed">
              {judge.paradoxExample.resolution}
            </p>
          </div>
          <div className="lg:col-span-4 bg-white/5 border border-line p-4 rounded">
            <div className="font-mono text-xs text-primary font-bold mb-1">BOUNDED REVISION GUARDRAIL</div>
            <p className="font-sans text-secondary text-xs leading-normal">
              The Judge evaluates response quality and transaction safety separately, informing pass or revision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
