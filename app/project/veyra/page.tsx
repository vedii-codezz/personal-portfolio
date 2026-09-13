import type { Metadata } from "next";
import { veyraData } from "@/data/projects/veyra";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { NextProjectTeaser } from "@/components/case-study/next-project-teaser";
import { ExpandableDetail } from "@/components/case-study/expandable-detail";
import { VeyraBudgetField } from "@/components/project/veyra/veyra-budget-field";
import { VeyraScoreInspector } from "@/components/project/veyra/veyra-score-inspector";
import { VeyraCashFlow } from "@/components/project/veyra/veyra-cash-flow";

export const metadata: Metadata = {
  title: "Veyra — Budget Analysis & Financial Observation Interface | Bedantika Mondal",
  description:
    "A deterministic client-side financial observatory that transforms raw transaction noise into spatial budget envelopes, score structure, and conceptual financial flow.",
};

export default function VeyraPage() {
  const {
    meta,
    hero,
    tension,
    engine,
    pipeline,
    budgetField,
    veyraScore,
    cashFlow,
    reactivity,
    engineering,
    scopeDiscipline,
    authorship,
    retrospective,
    nextProject,
  } = veyraData;

  return (
    <CaseStudyShell>
      {/* Sticky Case Study Navigation */}
      <CaseStudyNav
        projectName={meta.name}
        projectNumber={meta.number}
        githubUrl={meta.links.github}
        liveUrl={meta.links.live}
      />

      <main id="main-content" tabIndex={-1}>
      {/* 00 / PROJECT HERO */}
      <CaseStudyHero
        number={meta.number}
        name={meta.name}
        subtitle={meta.subtitle}
        category={meta.category}
        timeline={meta.timeline}
        status={meta.status}
        headline={hero.headline}
        summary={hero.summary}
        coordinates={meta.coordinates}
      />

      {/* Verified Fixture & Storage Disclosure Banner */}
      <div className="site-gutter py-4 border-b border-line bg-surface/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-secondary">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded text-[10px] font-semibold uppercase tracking-wider">
              [VERIFIED DATA]
            </span>
            <span>{hero.syntheticDataNotice}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-secondary/80">
            <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded text-[10px] font-semibold uppercase tracking-wider">
              [VERIFIED ARCHITECTURE]
            </span>
            <span>Client-side in-memory Zustand state. No database, auth, or persistent storage.</span>
          </div>
        </div>
      </div>

      {/* CLUSTER 1: INTRO & MATHEMATICAL FOUNDATIONS */}
      <div data-veyra-intro>
        {/* 01 / THE PROBLEM WITH THE LEDGER */}
        <CaseStudySection
          id="problem"
          index="01"
          label={tension.heading}
          annotation={tension.annotation}
          dataAttribute={{ "data-veyra-intro-reveal": true }}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded font-semibold tracking-wider uppercase">
                [CONCEPTUAL VISUALIZATION]
              </span>
              <span className="font-mono text-xs text-secondary">
                Linear Debit Log vs Spatial Budget Envelopes
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Chronological tables present high transaction fidelity but obscure systemic burn rates. Veyra restructures linear debit streams into category envelopes.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Chronological Transaction Fragments */}
              <div className="lg:col-span-5 p-5 border border-line bg-[#0a0a0a] rounded space-y-4">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <span className="font-mono text-xs font-semibold text-primary">
                    CHRONOLOGICAL DEBIT LOG
                  </span>
                  <span className="font-mono text-[10px] text-secondary">
                    {tension.syntheticNotice}
                  </span>
                </div>

                <div className="space-y-2">
                  {tension.sampleTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 border border-line/50 bg-[#050505] rounded flex items-center justify-between font-mono text-xs"
                    >
                      <div>
                        <span className="text-secondary text-[10px] block">{tx.date} // {tx.tag}</span>
                        <span className="text-primary font-medium">{tx.merchant}</span>
                      </div>
                      <span className="text-primary font-semibold text-sm">{tx.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 font-mono text-[11px] text-secondary border-t border-line/60 text-center">
                  Conceptual record structure; no category amounts are represented.
                </div>
              </div>

              {/* Right: Structural Failures & Solutions */}
              <div className="lg:col-span-7 space-y-4">
                {tension.ledgerCritique.map((critique, idx) => (
                  <div
                    key={idx}
                    className="p-5 border border-line bg-[#0a0a0a] rounded space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-primary font-bold">
                        [ Q0{idx + 1} ]
                      </span>
                      <h3 className="font-mono text-xs sm:text-sm font-semibold text-primary">
                        {critique.question}
                      </h3>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
                      <strong className="text-primary font-medium">Ledger Limit:</strong>{" "}
                      {critique.failure}
                    </p>

                    <p className="font-sans text-xs sm:text-sm text-primary leading-relaxed pt-1 border-t border-line/40">
                      <strong className="text-secondary font-mono text-[11px] uppercase tracking-wider">
                        Veyra Paradigm:
                      </strong>{" "}
                      {critique.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CaseStudySection>

        {/* 02 / THE DETERMINISTIC FINANCE ENGINE */}
        <CaseStudySection
          id="engine"
          index="02"
          label={engine.heading}
          annotation={engine.annotation}
          dataAttribute={{ "data-veyra-intro-reveal": true }}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded font-semibold tracking-wider uppercase">
                [VERIFIED DATA]
              </span>
              <span className="font-mono text-xs text-secondary">
                Deterministic Financial Equations &amp; Synchronous Calculations
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Financial indicators are computed through deterministic arithmetic rather than statistical heuristics. Pure functions enforce mathematical consistency across the viewport.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {engine.formulas.map((f, idx) => (
                <div
                  key={idx}
                  className="p-5 border border-line bg-[#0a0a0a] rounded flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] text-secondary tracking-widest uppercase block">
                      FORMULA 0{idx + 1}
                    </span>
                    <h4 className="font-mono text-xs font-semibold text-primary">
                      {f.label}
                    </h4>

                    <div className="p-3 border border-line bg-[#050505] rounded font-mono text-xs text-primary overflow-x-auto">
                      <code>{f.math}</code>
                    </div>

                    <p className="font-sans text-xs text-secondary leading-relaxed">
                      {f.explanation}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-line/60 flex items-center justify-between font-mono text-[11px]">
                    <span className="text-secondary">SYNTHETIC EVALUATION:</span>
                    <span className="text-primary font-semibold">{f.fixtureValue}</span>
                  </div>
                </div>
              ))}
            </div>

            <ExpandableDetail label="Mathematical Derivations & Algorithmic Bounds" badge="SPECIFICATION">
              <div className="space-y-3 pt-2 font-mono text-xs text-secondary leading-relaxed">
                <p>
                  <strong>Income and Spend:</strong> The approved synthetic fixture supplies monthly totals.
                </p>
                <p>
                  <strong>Savings:</strong> Income less spend gives the approved savings total.
                </p>
                <p>
                  <strong>Savings Rate:</strong> Savings relative to income gives the displayed 38.5% rate.
                </p>
              </div>
            </ExpandableDetail>
          </div>
        </CaseStudySection>

        {/* 03 / FROM TRANSACTIONS TO STRUCTURE */}
        <CaseStudySection
          id="pipeline"
          index="03"
          label={pipeline.heading}
          annotation={pipeline.annotation}
          dataAttribute={{ "data-veyra-intro-reveal": true }}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-semibold tracking-wider uppercase">
                [CONCEPTUAL VISUALIZATION]
              </span>
              <span className="font-mono text-xs text-secondary">
                5-Stage Progressive Transformation Pipeline
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Raw transactions pass through a 5-stage transformation pipeline, converting discrete bank entries into visual envelopes and composite health metrics.
            </p>

            {/* 5-Stage Progressive Transformation Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {pipeline.stages.map((st) => (
                <div
                  key={st.step}
                  className="p-4 border border-line bg-[#0a0a0a] rounded flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-primary px-1.5 py-0.5 border border-line bg-[#141414]">
                        STAGE {st.step}
                      </span>
                      <span className="font-mono text-[10px] text-secondary uppercase">
                        {st.unit}
                      </span>
                    </div>

                    <h4 className="font-sans text-sm font-semibold text-primary mb-2">
                      {st.name}
                    </h4>

                    <div className="p-2 border border-line/60 bg-[#050505] rounded font-mono text-[11px] text-primary mb-2 overflow-x-auto">
                      <code>{st.dataForm}</code>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-secondary leading-relaxed pt-2 border-t border-line/40">
                    {st.output}
                  </p>
                </div>
              ))}
            </div>

            <ExpandableDetail label="Pipeline Stage Transformation Invariants" badge="ARCH">
              <div className="space-y-3 pt-2 font-mono text-xs text-secondary leading-relaxed">
                <p>
                  <strong>Conceptual Progression:</strong> Records, categories, calculations, and observations show the relationship between inputs and outputs.
                </p>
                <p>
                  <strong>Scope:</strong> This diagram describes structure without a measured execution-time claim.
                </p>
              </div>
            </ExpandableDetail>
          </div>
        </CaseStudySection>
      </div>

      {/* CLUSTER 2: SIGNATURE VISUAL SYSTEMS */}
      <div data-veyra-systems>
        {/* 04 / THE BUDGET FIELD (SIGNATURE VISUAL 01) */}
        <CaseStudySection
          id="budget-field"
          index="04"
          label={budgetField.heading}
          annotation={budgetField.annotation}
          dataAttribute={{ "data-veyra-systems-reveal": true }}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded font-semibold tracking-wider uppercase">
                [CONCEPTUAL VISUALIZATION]
              </span>
              <span className="font-mono text-xs text-secondary">
                Spatial Budget Envelopes — March 2024 Synthetic Demo Fixture
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Categories render as structural category envelopes rather than static table cells. The diagram shows relationships, not measured allocations or utilization.
            </p>

            <VeyraBudgetField
              categories={budgetField.categories}
              statusLegend={budgetField.statusLegend}
            />

            <ExpandableDetail label="Budget Envelope Variance Rules & Thresholds" badge="CALC">
              <div className="space-y-3 pt-2 font-mono text-xs text-secondary leading-relaxed">
                <p>
                  <strong>Healthy:</strong> Standard operational envelope. Category spend remains within allocation.
                </p>
                <p>
                  <strong>Warning:</strong> Approaching cap. High risk of budget breach if unplanned discretionary transactions occur.
                </p>
                <p>
                  <strong>Exceeded:</strong> Deficit status. Category spending has outpaced allocation, requiring rebalancing from uncommitted liquidity.
                </p>
              </div>
            </ExpandableDetail>
          </div>
        </CaseStudySection>

        {/* 05 / THE VEYRASCORE (SIGNATURE VISUAL 02) */}
        <CaseStudySection
          id="veyra-score"
          index="05"
          label={veyraScore.heading}
          annotation={veyraScore.annotation}
          dataAttribute={{ "data-veyra-systems-reveal": true }}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded font-semibold tracking-wider uppercase">
                [VERIFIED DATA]
              </span>
              <span className="font-mono text-xs text-secondary">
                Deterministic Composite Score — Multi-Factor Evaluation
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              VeyraScore connects inputs, formula, score, and tier. The inspector explains this structure without publishing a specific score or weights.
            </p>

            <VeyraScoreInspector
              notice={veyraScore.notice}
              stages={veyraScore.stages}
            />

            <ExpandableDetail label="Score Calculation Architecture" badge="EVALUATION">
              <div className="space-y-3 pt-2 font-mono text-xs text-secondary leading-relaxed">
                <div className="flex items-center gap-2 text-primary font-semibold pb-2 border-b border-line/40">
                  <span>INPUTS</span>
                  <span>&rarr;</span>
                  <span>FORMULA</span>
                  <span>&rarr;</span>
                  <span>SCORE</span>
                  <span>&rarr;</span>
                  <span>TIER</span>
                </div>
                <p>
                  <strong>INPUTS:</strong> Discrete monthly transactions, categorized debit amounts, and designated liquidity buffers.
                </p>
                <p>
                  <strong>FORMULA:</strong> Deterministic functional calculations evaluate category adherence and uncommitted savings margins.
                </p>
                <p>
                  <strong>SCORE:</strong> Normalized composite health index computed synchronously in client memory.
                </p>
                <p>
                  <strong>TIER:</strong> Bounded classification threshold mapping composite score to qualitative operational status.
                </p>
              </div>
            </ExpandableDetail>
          </div>
        </CaseStudySection>

        {/* 06 / THE CASH-FLOW SYSTEM (SIGNATURE VISUAL 03) */}
        <CaseStudySection
          id="cash-flow"
          index="06"
          label={cashFlow.heading}
          annotation={cashFlow.annotation}
          dataAttribute={{ "data-veyra-systems-reveal": true }}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded font-semibold tracking-wider uppercase">
                [CONCEPTUAL VISUALIZATION]
              </span>
              <span className="font-mono text-xs text-secondary">
                Conceptual Financial Flow Visualization
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              A conceptual financial flow visualization connects income, records, categories, spend, and savings. Branch geometry does not encode measured proportions.
            </p>

            <VeyraCashFlow
              baselineInflow={cashFlow.baselineInflow}
              inflowLabel={cashFlow.inflowLabel}
              inflowNotice={cashFlow.inflowNotice}
              streams={cashFlow.streams}
            />

            <ExpandableDetail label="Cash Flow River Geometry & Stream Aggregations" badge="GEOMETRY">
              <div className="space-y-3 pt-2 font-mono text-xs text-secondary leading-relaxed">
                <p>
                  <strong>Conceptual Geometry:</strong> Fixed SVG branches show relationships, not quantities.
                </p>
                <p>
                  <strong>Approved Fixture:</strong> ₹95,000 income less ₹58,400 spend leaves ₹36,600 savings.
                </p>
              </div>
            </ExpandableDetail>
          </div>
        </CaseStudySection>
      </div>

      {/* CLUSTER 3: ENGINEERING, SCOPE, AND ATTRIBUTION */}
      <div data-veyra-engineering>
        {/* 07 / REACTIVE FINANCIAL STATE */}
        <CaseStudySection
          id="reactivity"
          index="07"
          label={reactivity.heading}
          annotation={reactivity.annotation}
          dataAttribute={{ "data-veyra-engineering-reveal": true }}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-semibold tracking-wider uppercase">
                [VERIFIED ARCHITECTURE]
              </span>
              <span className="font-mono text-xs text-secondary">
                In-Memory Synchronous Reactivity Loop
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Client-side in-memory Zustand holds financial state. Calculations inform updated observations; no persistent storage is implemented.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {reactivity.mutationFlow.map((flow) => (
                <div
                  key={flow.step}
                  className="p-5 border border-line bg-[#0a0a0a] rounded space-y-3"
                >
                  <span className="font-mono text-xs font-semibold text-primary px-2 py-0.5 border border-line bg-[#141414]">
                    STEP {flow.step}
                  </span>
                  <h4 className="font-mono text-xs font-semibold text-primary">
                    {flow.label}
                  </h4>
                  <p className="font-sans text-xs text-secondary leading-relaxed">
                    {flow.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 border border-line bg-[#050505] rounded font-mono text-xs text-secondary">
              {reactivity.benchmarkNote}
            </div>
          </div>
        </CaseStudySection>

        {/* 08 / ENGINEERING THE INTERFACE */}
        <CaseStudySection
          id="engineering"
          index="08"
          label={engineering.heading}
          annotation={engineering.annotation}
          dataAttribute={{ "data-veyra-engineering-reveal": true }}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-semibold tracking-wider uppercase">
                [VERIFIED ARCHITECTURE]
              </span>
              <span className="font-mono text-xs text-secondary">
                Frontend Technology Stack &amp; Layer Responsibilities
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              The financial observation interface uses client-side in-memory Zustand and deterministic calculations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {engineering.stackGroups.map((group) => (
                <div
                  key={group.category}
                  className="p-6 border border-line bg-[#0a0a0a] rounded space-y-4"
                >
                  <span className="font-mono text-xs font-semibold text-primary tracking-wider uppercase block border-b border-line pb-2">
                    {group.category}
                  </span>

                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item.name} className="flex flex-col gap-0.5">
                        <span className="font-mono text-xs text-primary font-medium">
                          {item.name}
                        </span>
                        <span className="font-sans text-xs text-secondary leading-relaxed">
                          {item.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CaseStudySection>

        {/* 09 / FRONTEND-ONLY BY DESIGN */}
        <CaseStudySection
          id="scope-discipline"
          index="09"
          label={scopeDiscipline.heading}
          annotation={scopeDiscipline.annotation}
          dataAttribute={{ "data-veyra-engineering-reveal": true }}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-semibold tracking-wider uppercase">
                [VERIFIED ARCHITECTURE]
              </span>
              <span className="font-mono text-xs text-secondary">
                Deliberate Architectural Boundaries &amp; Scope Rigor
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Veyra was conceived and built strictly as a client-side computational prototype to explore data visualization and ergonomics, not as a commercial banking backend.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scopeDiscipline.boundaries.map((b) => (
                <div
                  key={b.boundary}
                  className="p-5 border border-line bg-[#0a0a0a] rounded space-y-2"
                >
                  <span className="font-mono text-xs text-primary font-semibold uppercase tracking-wider block">
                    {b.boundary}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
                    {b.reality}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CaseStudySection>

        {/* 10 / INDEPENDENT PROJECT */}
        <CaseStudySection
          id="authorship"
          index="10"
          label={authorship.heading}
          annotation={authorship.annotation}
          dataAttribute={{ "data-veyra-engineering-reveal": true }}
        >
          <div className="space-y-8">
            <div className="p-6 sm:p-8 border border-line bg-[#0a0a0a] rounded space-y-4">
              <span className="font-mono text-xs text-primary font-semibold px-2.5 py-1 border border-primary bg-primary text-canvas uppercase tracking-wider inline-block">
                {authorship.attribution}
              </span>
              <p className="font-sans text-secondary text-base sm:text-lg leading-relaxed max-w-3xl">
                {authorship.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {authorship.areas.map((area) => (
                <div
                  key={area.domain}
                  className="p-4 border border-line bg-[#050505] rounded space-y-2"
                >
                  <span className="font-mono text-xs font-semibold text-primary block">
                    {area.domain}
                  </span>
                  <p className="font-sans text-xs text-secondary leading-relaxed">
                    {area.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CaseStudySection>

        {/* 11 / RETROSPECTIVE */}
        <CaseStudySection
          id="retrospective"
          index="11"
          label={retrospective.heading}
          annotation={retrospective.annotation}
          dataAttribute={{ "data-veyra-engineering-reveal": true }}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {retrospective.reflections.map((r, idx) => (
                <div
                  key={idx}
                  className="p-6 border-t border-line/60 space-y-2"
                >
                  <span className="font-mono text-[10px] text-secondary tracking-widest uppercase block">
                    TAKEAWAY 0{idx + 1}
                  </span>
                  <h4 className="font-sans text-sm sm:text-base font-semibold text-primary">
                    {r.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
                    {r.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CaseStudySection>
      </div>

      {/* 12 / NEXT CASE STUDY TEASER */}
      <NextProjectTeaser
        index={nextProject.index}
        nextNumber={nextProject.nextNumber}
        nextName={nextProject.nextName}
        nextSubtitle={nextProject.nextSubtitle}
        nextCategory={nextProject.nextCategory}
      />
      </main>
    </CaseStudyShell>
  );
}
