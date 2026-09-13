import type { Metadata } from "next";
import { aptlyData } from "@/data/projects/aptly";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { NextProjectTeaser } from "@/components/case-study/next-project-teaser";
import { ExpandableDetail } from "@/components/case-study/expandable-detail";
import { AptlyStatusMatrix } from "@/components/project/aptly/aptly-status-matrix";
import { AptlyEvidenceChain } from "@/components/project/aptly/aptly-evidence-chain";
import { AptlyGapEngine } from "@/components/project/aptly/aptly-gap-engine";

export const metadata: Metadata = {
  title: "Aptly — Explainable Job Eligibility & ATS Assistant | Bedantika Mondal",
  description:
    "An investigative technical dossier and deterministic eligibility engine that evaluates candidate qualifications through 4-stage evidence chains instead of opaque percentage scores.",
};

export default function AptlyPage() {
  const {
    meta,
    hero,
    illusion,
    decomposition,
    quadState,
    evidenceChain,
    eligibilityVsCompetitiveness,
    gapEngine,
    atsSection,
    perimeterDefense,
    independentEngineering,
    retrospective,
    nextProject,
  } = aptlyData;

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

      {/* CLUSTER 1: INTRO & DECOMPOSITION */}
      <div data-aptly-intro>
        {/* 01 / THE ILLUSION OF THE SCORE */}
        <CaseStudySection
          id="illusion"
          index="01"
          label={illusion.heading}
          annotation="[CONCEPTUAL VISUALIZATION] THE REDUCTIVE SCORING PROBLEM"
          dataAttribute={{ "data-aptly-intro-reveal": true }}
        >
          <div className="space-y-8">
            {/* Monumental Critique Metric Card */}
            <div className="p-6 sm:p-10 border border-line bg-[#0a0a0a] rounded flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-2">
                  CONVENTIONAL ATS EVALUATION
                </span>
                <div className="relative inline-block">
                  <div className="text-6xl sm:text-7xl md:text-8xl font-mono font-bold tracking-tighter text-primary/40 line-through decoration-primary/60 decoration-2 leading-none">
                    {illusion.abstractScore}
                  </div>
                </div>
                <div className="font-mono text-[10px] text-secondary tracking-wider mt-3">
                  {illusion.scoreNotice}
                </div>
              </div>

              {/* Diagnostic Inquiry Grid */}
              <div className="md:max-w-md space-y-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-line md:pl-8">
                <span className="font-mono text-[10px] text-secondary tracking-widest uppercase block mb-2">
                  UNANSWERED INQUIRIES // CRITICAL GAPS
                </span>
                <div className="space-y-2">
                  {illusion.questions.map((item, idx) => (
                    <div key={item.q} className="flex items-baseline gap-3 pb-2 border-b border-line/30 last:border-b-0">
                      <span className="font-mono text-[10px] text-secondary/60">0{idx + 1}</span>
                      <div>
                        <span className="font-sans text-xs sm:text-sm font-bold text-primary block">{item.q}</span>
                        <span className="font-sans text-[11px] text-secondary">{item.context}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed max-w-3xl">
              Conventional tools collapse multidimensional qualification data into an arbitrary percentage. Aptly rejects opaque scoring in favor of inspectable, rule-by-rule provenance.
            </p>
          </div>
        </CaseStudySection>

        {/* 02 / ATOMIC DECOMPOSITION */}
        <CaseStudySection
          id="decomposition"
          index="02"
          label={decomposition.heading}
          annotation="[VERIFIED ARCHITECTURE] UNSTRUCTURED TO TYPED SCHEMA"
          dataAttribute={{ "data-aptly-intro-reveal": true }}
        >
          <div className="space-y-8">
            <p className="font-sans text-base sm:text-lg text-primary leading-relaxed max-w-3xl">
              {decomposition.intro}
            </p>

            {/* Unstructured vs Structured Comparison Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Raw Job Description Excerpt */}
              <div className="lg:col-span-5 p-5 bg-[#090909] border border-line rounded">
                <span className="font-mono text-[11px] text-secondary tracking-widest uppercase block mb-3">
                  [ RAW UNSTRUCTURED EXCERPT ]
                </span>
                <blockquote className="font-mono text-xs text-secondary leading-relaxed bg-[#111111] p-3.5 rounded border border-line/40 mb-3">
                  &ldquo;{decomposition.rawExcerpt.text}&rdquo;
                </blockquote>
                <span className="font-mono text-[10px] text-secondary/60">
                  SOURCE: {decomposition.rawExcerpt.source}
                </span>
              </div>

              {/* Right: Structured Criteria Ledger */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-secondary tracking-widest uppercase pb-2 border-b border-line">
                  <span>[ EXTRACTED ATOMIC CRITERIA LEDGER ]</span>
                  <span className="text-primary font-bold">[VERIFIED ARCHITECTURE]</span>
                </div>
                <div className="divide-y divide-line/40">
                  {decomposition.categories.map((cat, idx) => (
                    <div
                      key={cat.name}
                      className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                    >
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono text-[10px] text-secondary/60">0{idx + 1}</span>
                        <span className="font-mono text-xs font-bold text-primary tracking-wider">{cat.name}</span>
                      </div>
                      <span className="font-sans text-xs text-secondary sm:text-right">{cat.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Importance Tiers Grid */}
            <div className="pt-4 border-t border-line">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {decomposition.importanceTiers.map((tier) => (
                  <div key={tier.tier} className="p-4 border border-line/60 bg-[#090909] rounded space-y-1">
                    <span className="font-mono text-xs font-bold text-primary block">{tier.tier}</span>
                    <p className="font-sans text-xs text-secondary leading-relaxed">{tier.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CaseStudySection>
      </div>

      {/* CLUSTER 2: CORE DETERMINISTIC ENGINES */}
      <div data-aptly-engine>
        {/* 03 / THE QUAD-STATE MODEL */}
        <CaseStudySection
          id="quad-state"
          index="03"
          label={quadState.heading}
          annotation="[VERIFIED DATA] SIGNATURE VISUAL // QUAD-STATE CLASSIFICATION"
          dataAttribute={{ "data-aptly-engine-reveal": true }}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded font-semibold tracking-wider uppercase">
                [VERIFIED DATA]
              </span>
              <span className="font-mono text-xs text-secondary">
                Deterministic 4-State Machine: MATCHED, PARTIAL, FAILED, UNKNOWN
              </span>
            </div>

            <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed max-w-3xl">
              {quadState.rationale}
            </p>

            {/* Signature Visual A: Quad-State Inspector */}
            <AptlyStatusMatrix />
          </div>
        </CaseStudySection>

        {/* 04 / THE EVIDENCE CHAIN */}
        <CaseStudySection
          id="evidence-chain"
          index="04"
          label={evidenceChain.heading}
          annotation="[VERIFIED DATA] SIGNATURE VISUAL // 4-STAGE PROVENANCE TRACE"
          dataAttribute={{ "data-aptly-engine-reveal": true }}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded font-semibold tracking-wider uppercase">
                [VERIFIED DATA]
              </span>
              <span className="font-mono text-xs text-secondary">
                4-Stage Concrete Provenance Evidence: Source &rarr; Rule &rarr; Evidence &rarr; Verdict
              </span>
            </div>

            <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed max-w-3xl">
              {evidenceChain.description}
            </p>

            {/* Signature Visual B: Evidence Chain Forensic Inspector */}
            <AptlyEvidenceChain />
          </div>
        </CaseStudySection>

        {/* 05 / ELIGIBILITY VS COMPETITIVENESS */}
        <CaseStudySection
          id="eligibility-vs-competitiveness"
          index="05"
          label={eligibilityVsCompetitiveness.heading}
          annotation="[VERIFIED ARCHITECTURE] DUAL-ENGINE TAXONOMY"
          dataAttribute={{ "data-aptly-engine-reveal": true }}
        >
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              {/* Left Column: Eligibility (Hard Gate) */}
              <div className="p-6 border border-line bg-[#080808] rounded flex flex-col justify-between space-y-6">
                <div>
                  <div className="pb-3 mb-4 border-b border-line">
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-1">
                      {eligibilityVsCompetitiveness.left.subtitle}
                    </span>
                    <h3 className="font-sans text-2xl text-primary font-normal">
                      {eligibilityVsCompetitiveness.left.question}
                    </h3>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {eligibilityVsCompetitiveness.left.principles.map((p, idx) => (
                      <li key={idx} className="font-mono text-xs text-primary flex items-start gap-2">
                        <span className="text-secondary font-bold">―</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-line/60 font-sans text-xs text-secondary leading-relaxed">
                  {eligibilityVsCompetitiveness.left.methodology}
                </div>
              </div>

              {/* Right Column: Competitiveness (Fit Depth) */}
              <div className="p-6 border border-line bg-[#080808] rounded flex flex-col justify-between space-y-6">
                <div>
                  <div className="pb-3 mb-4 border-b border-line">
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-1">
                      {eligibilityVsCompetitiveness.right.subtitle}
                    </span>
                    <h3 className="font-sans text-2xl text-primary font-normal">
                      {eligibilityVsCompetitiveness.right.question}
                    </h3>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {eligibilityVsCompetitiveness.right.principles.map((p, idx) => (
                      <li key={idx} className="font-mono text-xs text-primary flex items-start gap-2">
                        <span className="text-secondary font-bold">―</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-line/60 font-sans text-xs text-secondary leading-relaxed">
                  {eligibilityVsCompetitiveness.right.methodology}
                </div>
              </div>
            </div>

            <p className="font-mono text-xs text-secondary leading-relaxed p-3 bg-black/40 border border-line rounded text-center">
              {eligibilityVsCompetitiveness.disclaimer}
            </p>
          </div>
        </CaseStudySection>

        {/* 06 / THE ACTIONABLE GAP ENGINE */}
        <CaseStudySection
          id="gap-engine"
          index="06"
          label={gapEngine.heading}
          annotation="[VERIFIED ARCHITECTURE] REMEDIATION PIPELINE"
          dataAttribute={{ "data-aptly-engine-reveal": true }}
        >
          {/* Signature Visual C: Actionable Gap Inspector */}
          <AptlyGapEngine />
        </CaseStudySection>
      </div>

      {/* CLUSTER 3: ATS & PERIMETER DEFENSE */}
      <div data-aptly-ats>
        {/* 07 / ATS WITHOUT THE THEATRE */}
        <CaseStudySection
          id="ats"
          index="07"
          label={atsSection.heading}
          annotation="[VERIFIED ARCHITECTURE] DOCUMENT DIAGNOSTICS"
          dataAttribute={{ "data-aptly-ats-reveal": true }}
        >
          <div className="space-y-6">
            <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed max-w-3xl">
              {atsSection.intro}
            </p>

            {/* Anti-Keyword-Stuffing Principle Callout */}
            <div className="p-5 sm:p-6 bg-[#090909] border border-line rounded space-y-3">
              <span className="font-mono text-xs text-secondary tracking-widest uppercase block">
                [ {atsSection.antiStuffingCallout.headline} ]
              </span>
              <pre className="font-mono text-xs text-primary whitespace-pre-wrap leading-relaxed bg-black/60 p-3 rounded border border-line/40">
                {atsSection.antiStuffingCallout.rule}
              </pre>
              <p className="font-sans text-xs text-secondary leading-relaxed">
                {atsSection.antiStuffingCallout.implication}
              </p>
            </div>

            {/* Expandable Document Diagnostics */}
            <ExpandableDetail label="Document Parser Diagnostic Audit (5 Structural Criteria)" badge="VERIFIED ARCHITECTURE">
              <div className="divide-y divide-line/40 pt-2">
                {atsSection.checks.map((check) => (
                  <div key={check.name} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-primary block">{check.name}</span>
                      <span className="font-sans text-xs text-secondary">{check.purpose}</span>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-0.5 bg-black/60 border border-line rounded text-primary self-start sm:self-auto">
                      {check.status}
                    </span>
                  </div>
                ))}
              </div>
            </ExpandableDetail>
          </div>
        </CaseStudySection>

        {/* 08 / PERIMETER DEFENSE & PRIVACY */}
        <CaseStudySection
          id="perimeter"
          index="08"
          label={perimeterDefense.heading}
          annotation={perimeterDefense.annotation}
          dataAttribute={{ "data-aptly-ats-reveal": true }}
        >
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-semibold tracking-wider uppercase">
                [VERIFIED ARCHITECTURE]
              </span>
              <span className="font-mono text-xs text-secondary">
                Client-Side Sandbox Execution Boundary
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Strict ingestion boundaries guard against SSRF, payload inflation, and unauthorized persistence.
            </p>

            {/* Ingestion Security Pipeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {perimeterDefense.pipeline.map((p) => (
                <div key={p.step} className="p-4 border border-line rounded bg-surface/20 space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-secondary">
                    <span className="text-primary font-bold">STEP {p.step}</span>
                    <span>SECURITY BOUNDARY</span>
                  </div>
                  <h4 className="font-mono text-xs font-bold text-primary">{p.name}</h4>
                  <p className="font-sans text-xs text-secondary leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>

            {/* Privacy Architecture in Expandable Detail */}
            <ExpandableDetail label="Ephemeral Processing & Client-Side Privacy Boundary">
              <div className="space-y-4 pt-2">
                {perimeterDefense.privacyArchitecture.map((item) => (
                  <div key={item.title} className="space-y-1">
                    <span className="font-mono text-xs font-bold text-primary block">{item.title}</span>
                    <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </ExpandableDetail>
          </div>
        </CaseStudySection>
      </div>

      {/* CLUSTER 4: INDEPENDENT ENGINEERING & RETROSPECTIVE */}
      <div data-aptly-closing>
        {/* 09 / INDEPENDENT SYSTEM ENGINEERING */}
        <CaseStudySection
          id="engineering"
          index="09"
          label={independentEngineering.heading}
          annotation={independentEngineering.annotation}
          dataAttribute={{ "data-aptly-closing-reveal": true }}
        >
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-6 border-b border-line">
              <div>
                <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-1">
                  ARCHITECT &amp; SOLE IMPLEMENTOR
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl text-primary font-normal">
                  {independentEngineering.author}
                </h3>
              </div>
              <span className="font-mono text-xs text-primary font-medium">
                {independentEngineering.commitVerification}
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              {independentEngineering.summary}
            </p>

            {/* Technical Layers Breakdown (Open two-column list) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {independentEngineering.layers.map((layer) => (
                <div
                  key={layer.domain}
                  className="space-y-2 pt-4 border-t border-line"
                >
                  <span className="font-mono text-xs font-bold text-primary block">
                    {layer.domain}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
                    {layer.work}
                  </p>
                </div>
              ))}
            </div>

            {/* Verified Technology Stack (De-boxed open grid) */}
            <div className="pt-8 border-t border-line space-y-6">
              <span className="font-mono text-xs text-secondary tracking-widest uppercase block">
                [ VERIFIED PRODUCTION STACK ]
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                {independentEngineering.technologies.map((t) => (
                  <div key={t.name} className="py-2 border-b border-line/40">
                    <span className="text-secondary text-[10px] block mb-0.5">
                      {t.name}
                    </span>
                    <span className="text-primary font-semibold">{t.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CaseStudySection>

        {/* 10 / RETROSPECTIVE & LESSONS (De-boxed open editorial reflections) */}
        <CaseStudySection
          id="retrospective"
          index="10"
          label={retrospective.heading}
          annotation={retrospective.annotation}
          dataAttribute={{ "data-aptly-closing-reveal": true }}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {retrospective.lessons.map((lesson) => (
                <div
                  key={lesson.number}
                  className="space-y-4 pt-6 border-t-2 border-line"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-secondary pb-1">
                    <span className="text-primary font-bold">LESSON {lesson.number}</span>
                    <span>ENGINEERING PRINCIPLE</span>
                  </div>
                  <h4 className="font-sans text-lg sm:text-xl text-primary font-normal tracking-tight">
                    {lesson.title}
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-secondary leading-relaxed">
                    {lesson.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CaseStudySection>

        {/* 11 / NEXT CASE STUDY TEASER */}
        <NextProjectTeaser
          index={nextProject.index}
          nextNumber={nextProject.nextNumber}
          nextName={nextProject.nextName}
          nextSubtitle={nextProject.nextSubtitle}
          nextCategory={nextProject.nextCategory}
        />
      </div>
      </main>
    </CaseStudyShell>
  );
}
