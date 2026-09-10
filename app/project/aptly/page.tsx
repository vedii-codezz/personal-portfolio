import type { Metadata } from "next";
import { aptlyData } from "@/data/projects/aptly";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { NextProjectTeaser } from "@/components/case-study/next-project-teaser";
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
          annotation={illusion.annotation}
          dataAttribute={{ "data-aptly-intro-reveal": true }}
        >
          <div className="space-y-12">
            {/* Monumental Critique Metric */}
            <div className="p-8 sm:p-12 md:p-16 border border-line bg-[#0a0a0a] rounded flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-3">
                  CONVENTIONAL ATS EVALUATION
                </span>
                <div className="text-7xl sm:text-8xl md:text-9xl font-mono font-bold tracking-tighter text-primary leading-none">
                  {illusion.abstractScore}
                </div>
                <div className="font-mono text-[11px] text-secondary tracking-wider mt-4">
                  {illusion.scoreNotice}
                </div>
              </div>

              {/* Surrounding Investigative Questions (De-boxed editorial prompts) */}
              <div className="md:max-w-lg space-y-4 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-line md:pl-10">
                <span className="font-mono text-[11px] text-secondary tracking-widest uppercase block mb-3">
                  THE UNANSWERED AUDIT // FIVE CRITICAL GAPS
                </span>
                <div className="space-y-4">
                  {illusion.questions.map((item, idx) => (
                    <div
                      key={item.q}
                      className="flex items-baseline gap-4 pb-3 border-b border-line/40 last:border-b-0"
                    >
                      <span className="font-mono text-xs text-secondary/70">
                        0{idx + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-sans text-base sm:text-lg font-bold text-primary tracking-tight">
                          {item.q}
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-secondary leading-normal mt-0.5">
                          {item.context}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Editorial Critique Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4">
              {illusion.critique.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="font-sans text-base sm:text-lg text-secondary leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </CaseStudySection>

        {/* 02 / ATOMIC DECOMPOSITION */}
        <CaseStudySection
          id="decomposition"
          index="02"
          label={decomposition.heading}
          annotation={decomposition.annotation}
          dataAttribute={{ "data-aptly-intro-reveal": true }}
        >
          <div className="space-y-12">
            <p className="font-sans text-lg sm:text-xl text-primary leading-relaxed max-w-4xl">
              {decomposition.intro}
            </p>

            {/* Unstructured vs Structured Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Raw Job Description Excerpt */}
              <div className="lg:col-span-5 p-6 sm:p-8 bg-[#0a0a0a] border border-line rounded">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-4">
                  [ RAW UNSTRUCTURED EXCERPT ]
                </span>
                <blockquote className="font-mono text-xs sm:text-sm text-secondary leading-relaxed bg-[#111111] p-4 rounded border border-line/40 mb-4">
                  &ldquo;{decomposition.rawExcerpt.text}&rdquo;
                </blockquote>
                <span className="font-mono text-[11px] text-secondary/70">
                  SOURCE: {decomposition.rawExcerpt.source}
                </span>
              </div>

              {/* Right: Structured Criteria Ledger (De-boxed open rows) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-secondary tracking-widest uppercase pb-2 border-b border-line">
                  <span>[ EXTRACTED ATOMIC CRITERIA LEDGER ]</span>
                  <span>08 TYPED CLASSES</span>
                </div>
                <div className="divide-y divide-line/40">
                  {decomposition.categories.map((cat, idx) => (
                    <div
                      key={cat.name}
                      className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] text-secondary/60">
                          0{idx + 1}
                        </span>
                        <span className="font-mono text-xs font-bold text-primary tracking-wider">
                          {cat.name}
                        </span>
                      </div>
                      <span className="font-sans text-xs sm:text-sm text-secondary sm:text-right">
                        {cat.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Importance Tiers & Ambiguity Preservation (De-boxed horizontal ledger) */}
            <div className="pt-8 border-t border-line space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-line">
                <span className="font-mono text-xs text-primary font-semibold tracking-wider">
                  IMPORTANCE TIERS
                </span>
                <span className="font-mono text-[11px] text-secondary">
                  AMBIGUITY PRESERVATION ENGINE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {decomposition.importanceTiers.map((tier) => (
                  <div key={tier.tier} className="space-y-1.5 border-t border-line/60 pt-3">
                    <span className="font-mono text-xs font-bold text-primary block">
                      {tier.tier}
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
                      {tier.role}
                    </p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed pt-4 border-t border-line/60">
                <strong className="text-primary font-mono font-medium">
                  AMBIGUITY PRESERVATION:{" "}
                </strong>
                {decomposition.ambiguityPreservation}
              </p>
            </div>
          </div>
        </CaseStudySection>
      </div>

      {/* CLUSTER 2: CORE DETERMINISTIC ENGINES */}
      <div data-aptly-engine>
        {/* 03 / THE QUAD-STATE MODEL (SIGNATURE VISUAL A) */}
        <CaseStudySection
          id="quad-state"
          index="03"
          label={quadState.heading}
          annotation={quadState.annotation}
          dataAttribute={{ "data-aptly-engine-reveal": true }}
        >
          <div className="space-y-8">
            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              {quadState.rationale}
            </p>

            {/* Signature Visual A: Quad-State Inspector */}
            <AptlyStatusMatrix />
          </div>
        </CaseStudySection>

        {/* 04 / THE EVIDENCE CHAIN (SIGNATURE VISUAL B — PRIMARY MOMENT) */}
        <CaseStudySection
          id="evidence-chain"
          index="04"
          label={evidenceChain.heading}
          annotation={evidenceChain.annotation}
          dataAttribute={{ "data-aptly-engine-reveal": true }}
        >
          <div className="space-y-8">
            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              {evidenceChain.description}
            </p>

            {/* Signature Visual B: Evidence Chain Forensic Inspector */}
            <AptlyEvidenceChain />
          </div>
        </CaseStudySection>

        {/* 05 / ELIGIBILITY VS COMPETITIVENESS (Open editorial split) */}
        <CaseStudySection
          id="eligibility-vs-competitiveness"
          index="05"
          label={eligibilityVsCompetitiveness.heading}
          annotation={eligibilityVsCompetitiveness.annotation}
          dataAttribute={{ "data-aptly-engine-reveal": true }}
        >
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-4">
              {/* Left Column: Eligibility (Hard Gate) */}
              <div className="flex flex-col justify-between space-y-8">
                <div>
                  <div className="pb-4 mb-6 border-b border-line">
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-1">
                      {eligibilityVsCompetitiveness.left.subtitle}
                    </span>
                    <h3 className="font-sans text-3xl sm:text-4xl text-primary font-normal">
                      {eligibilityVsCompetitiveness.left.question}
                    </h3>
                  </div>

                  <span className="font-mono text-[11px] text-secondary uppercase tracking-widest block mb-4">
                    NATURE // {eligibilityVsCompetitiveness.left.nature}
                  </span>

                  <ul className="space-y-3 mb-8">
                    {eligibilityVsCompetitiveness.left.principles.map((p, idx) => (
                      <li
                        key={idx}
                        className="font-mono text-xs text-primary flex items-start gap-3"
                      >
                        <span className="text-secondary font-bold">―</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-line/60 font-sans text-sm text-secondary leading-relaxed">
                  {eligibilityVsCompetitiveness.left.methodology}
                </div>
              </div>

              {/* Right Column: Competitiveness (Fit Depth) */}
              <div className="flex flex-col justify-between space-y-8 pt-10 md:pt-0 border-t md:border-t-0 md:border-l md:pl-16 border-line">
                <div>
                  <div className="pb-4 mb-6 border-b border-line">
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-1">
                      {eligibilityVsCompetitiveness.right.subtitle}
                    </span>
                    <h3 className="font-sans text-3xl sm:text-4xl text-primary font-normal">
                      {eligibilityVsCompetitiveness.right.question}
                    </h3>
                  </div>

                  <span className="font-mono text-[11px] text-secondary uppercase tracking-widest block mb-4">
                    NATURE // {eligibilityVsCompetitiveness.right.nature}
                  </span>

                  <ul className="space-y-3 mb-8">
                    {eligibilityVsCompetitiveness.right.principles.map((p, idx) => (
                      <li
                        key={idx}
                        className="font-mono text-xs text-primary flex items-start gap-3"
                      >
                        <span className="text-secondary font-bold">―</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-line/60 font-sans text-sm text-secondary leading-relaxed">
                  {eligibilityVsCompetitiveness.right.methodology}
                </div>
              </div>
            </div>

            <p className="font-mono text-xs text-secondary leading-relaxed p-4 bg-black/40 border border-line rounded text-center">
              {eligibilityVsCompetitiveness.disclaimer}
            </p>
          </div>
        </CaseStudySection>

        {/* 06 / THE ACTIONABLE GAP ENGINE (SIGNATURE VISUAL C) */}
        <CaseStudySection
          id="gap-engine"
          index="06"
          label={gapEngine.heading}
          annotation={gapEngine.annotation}
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
          annotation={atsSection.annotation}
          dataAttribute={{ "data-aptly-ats-reveal": true }}
        >
          <div className="space-y-12">
            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              {atsSection.intro}
            </p>

            {/* Document Review Style Checklist */}
            <div className="border border-line rounded overflow-hidden">
              <div className="p-4 bg-[#111111] border-b border-line font-mono text-xs flex items-center justify-between">
                <span className="text-primary font-semibold">
                  DOCUMENT PARSER DIAGNOSTIC AUDIT
                </span>
                <span className="text-secondary text-[11px]">
                  5 STRUCTURAL CRITERIA
                </span>
              </div>
              <div className="divide-y divide-line/60 bg-[#0a0a0a]">
                {atsSection.checks.map((check) => (
                  <div
                    key={check.name}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <span className="font-mono text-xs font-bold text-primary block">
                        {check.name}
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-secondary">
                        {check.purpose}
                      </p>
                    </div>
                    <span className="font-mono text-xs font-semibold px-3 py-1 bg-black/60 border border-line rounded text-primary self-start sm:self-auto">
                      {check.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Anti-Keyword-Stuffing Callout */}
            <div className="p-6 sm:p-8 bg-[#0d0d0d] border border-line rounded space-y-4">
              <span className="font-mono text-xs text-secondary tracking-widest uppercase block">
                [ {atsSection.antiStuffingCallout.headline} ]
              </span>
              <pre className="font-mono text-xs sm:text-sm text-primary whitespace-pre-wrap leading-relaxed bg-black/60 p-4 rounded border border-line/40">
                {atsSection.antiStuffingCallout.rule}
              </pre>
              <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
                {atsSection.antiStuffingCallout.implication}
              </p>
            </div>
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
          <div className="space-y-12">
            {/* SSRF Prevention Pipeline */}
            <div>
              <div className="flex items-center justify-between font-mono text-xs pb-4 mb-6 border-b border-line">
                <span className="text-primary font-semibold tracking-wider">
                  PUBLIC URL INGESTION SECURITY GATEWAY
                </span>
                <span className="text-secondary text-[11px]">
                  SSRF MITIGATION
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {perimeterDefense.pipeline.map((step) => (
                  <div
                    key={step.step}
                    className="p-5 bg-[#0a0a0a] border border-line rounded flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs pb-3 mb-3 border-b border-line/40">
                        <span className="font-bold text-primary">
                          {step.name}
                        </span>
                        <span className="text-secondary text-[10px]">
                          STEP {step.step}
                        </span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy & Ephemeral Processing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {perimeterDefense.privacyArchitecture.map((p) => (
                <div
                  key={p.title}
                  className="p-6 bg-[#0a0a0a] border border-line rounded flex flex-col justify-between"
                >
                  <span className="font-mono text-xs font-bold text-primary block mb-3">
                    {p.title}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
                    {p.detail}
                  </p>
                </div>
              ))}
            </div>
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
    </CaseStudyShell>
  );
}
