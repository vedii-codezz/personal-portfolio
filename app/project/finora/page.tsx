import { Metadata } from "next";
import { finoraData } from "@/data/projects/finora";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { NextProjectTeaser } from "@/components/case-study/next-project-teaser";
import { ExpandableDetail } from "@/components/case-study/expandable-detail";
import { FinoraTopography } from "@/components/project/finora/finora-topography";
import { FinoraAgentTheatre } from "@/components/project/finora/finora-agent-theatre";
import { FinoraJudgeMatrix } from "@/components/project/finora/finora-judge-matrix";
import { FinoraTraceViewer } from "@/components/project/finora/finora-trace-viewer";

export const metadata: Metadata = {
  title: "Finora — Multi-Agent Personal CFO | Bedantika Mondal",
  description:
    "A deterministic-first financial intelligence architecture where language models plan specialist workflows, while deterministic Python tools handle financial calculations and guardrails.",
};

export default function FinoraCaseStudyPage() {
  const { meta, hero, tension, boundary, engineering, role, retrospective, nextProject } =
    finoraData;

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

        {/* 01 / THE CORE TENSION: ARITHMETIC VS REASONING */}
        <CaseStudySection
          id="tension"
          index="01"
          label="THE CORE TENSION"
          annotation="[CONCEPTUAL VISUALIZATION] INTERCONNECTED DECISION RIPPLES"
          dataAttribute={{ "data-tension": true }}
        >
          <div className="space-y-12" data-tension-reveal>
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-primary mb-4 leading-tight">
                Arithmetic vs. Reasoning
              </h2>
              <p className="font-sans text-secondary text-base sm:text-lg leading-relaxed">
                Personal financial questions rarely exist in isolation. A single transaction inquiry requires structural verification across multiple interdependent domains.
              </p>
            </div>

            {/* Interconnected Constraint Ripples Visual */}
            <div className="pt-6 border-t border-line">
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-secondary uppercase tracking-widest mb-6">
                <span>SYSTEM DYNAMICS // INTERDEPENDENT CONSTRAINT RIPPLES</span>
                <span className="text-[10px] text-primary border border-line px-2 py-0.5 rounded">
                  [CONCEPTUAL VISUALIZATION]
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tension.ripples.map((ripple, idx) => (
                  <div
                    key={idx}
                    className="p-5 border border-line bg-[#090909] rounded flex flex-col justify-between gap-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center justify-between font-mono text-xs text-secondary/60">
                      <span>RIPPLE 0{idx + 1}</span>
                      <span className="text-primary text-[11px] font-bold">{ripple.domain}</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-secondary leading-relaxed">
                      {ripple.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CaseStudySection>

        {/* 02 / THE DETERMINISTIC-FIRST BOUNDARY */}
        <CaseStudySection
          id="boundary"
          index="02"
          label="ARCHITECTURAL PRINCIPLE"
          annotation="[VERIFIED ARCHITECTURE] SEPARATION OF RESPONSIBILITIES"
          dataAttribute={{ "data-boundary": true }}
        >
          <div className="space-y-10" data-boundary-reveal>
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-primary mb-3 leading-tight">
                {boundary.heading}
              </h2>
              <p className="font-sans text-secondary text-base sm:text-lg leading-relaxed">
                &ldquo;{boundary.statement}&rdquo;
              </p>
            </div>

            {/* Asymmetrical High-Contrast Boundary Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Left: Probabilistic Reasoning (Linguistic Planning) */}
              <div className="p-6 sm:p-8 border border-line bg-[#060606] rounded flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-secondary uppercase tracking-wider mb-2">
                    <span>LAYER 01 // PROBABILISTIC REASONING</span>
                    <span className="text-primary text-[10px]">[LLM]</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-primary mb-4">
                    Linguistic Planning
                  </h3>

                  <div className="space-y-4 font-sans text-xs sm:text-sm mb-6">
                    <div>
                      <span className="font-mono text-[10px] text-secondary uppercase tracking-wider block mb-1">
                        PERMITTED RESPONSIBILITY:
                      </span>
                      <p className="text-primary leading-relaxed">
                        {boundary.comparison[0].role}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-secondary uppercase tracking-wider block mb-1">
                        FORBIDDEN ACTION:
                      </span>
                      <p className="text-secondary leading-relaxed">
                        {boundary.comparison[0].forbidden}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-line font-mono text-[11px] text-secondary">
                  <span className="text-primary font-semibold">RUNTIME: </span>
                  {boundary.comparison[0].runtime}
                </div>
              </div>

              {/* Right: Deterministic Computation (Exact Math) */}
              <div className="p-6 sm:p-8 border border-primary/40 bg-[#0c0c0c] rounded flex flex-col justify-between shadow-[0_0_20px_-8px_rgba(243,243,239,0.06)]">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-primary font-bold uppercase tracking-wider mb-2">
                    <span>LAYER 02 // DETERMINISTIC ENGINE</span>
                    <span className="text-primary text-[10px]">[PYTHON]</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-primary mb-4">
                    Deterministic Computation
                  </h3>

                  <div className="space-y-4 font-sans text-xs sm:text-sm mb-6">
                    <div>
                      <span className="font-mono text-[10px] text-secondary uppercase tracking-wider block mb-1">
                        MANDATORY ENFORCEMENT:
                      </span>
                      <p className="text-primary leading-relaxed">
                        {boundary.comparison[1].role}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-secondary uppercase tracking-wider block mb-1">
                        RESPONSIBILITY BOUNDARY:
                      </span>
                      <p className="text-secondary leading-relaxed">
                        {boundary.comparison[1].forbidden}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-line font-mono text-[11px] text-secondary">
                  <span className="text-primary font-semibold">RUNTIME: </span>
                  {boundary.comparison[1].runtime}
                </div>
              </div>
            </div>
          </div>
        </CaseStudySection>

        {/* 03 / SYSTEM TOPOGRAPHY */}
        <CaseStudySection
          id="topography"
          index="03"
          label="SYSTEM TOPOGRAPHY"
          annotation="[VERIFIED ARCHITECTURE] FIVE-STAGE ORCHESTRATION PIPELINE"
        >
          <FinoraTopography />
        </CaseStudySection>

        {/* 04 / THE SEVEN SPECIALISTS */}
        <CaseStudySection
          id="specialists"
          index="04"
          label="SEVEN SPECIALISTS"
          annotation="[VERIFIED DATA] DETERMINISTIC DOMAIN TOOLS"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded font-semibold tracking-wider uppercase">
                [VERIFIED DATA]
              </span>
              <span className="font-mono text-xs text-secondary">
                7 Specialized Domain Agents &amp; Discrete Arithmetic Schemas
              </span>
            </div>
            <FinoraAgentTheatre />
          </div>
        </CaseStudySection>

        {/* 05 / THE TWO-AXIS JUDGE */}
        <CaseStudySection
          id="judge"
          index="05"
          label="TWO-AXIS JUDGE"
          annotation="[VERIFIED ARCHITECTURE] DUAL-CRITERIA EVALUATION"
        >
          <FinoraJudgeMatrix />
        </CaseStudySection>

        {/* 06 / TRACE & EXPLAINABILITY */}
        <CaseStudySection
          id="trace"
          index="06"
          label="TRACE &amp; EXPLAINABILITY"
          annotation="[VERIFIED ARCHITECTURE] WORKFLOW TRACE"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded font-semibold tracking-wider uppercase">
                [VERIFIED DATA]
              </span>
              <span className="font-mono text-xs text-secondary">
                Auditable Execution Trace: PLAN &rarr; AGENT &rarr; JUDGE &rarr; SYNTHESISE
              </span>
            </div>
            <FinoraTraceViewer />
          </div>
        </CaseStudySection>

        {/* 07 / ENGINEERING CONSTRAINTS & STACK */}
        <CaseStudySection
          id="engineering"
          index="07"
          label="ENGINEERING CONSTRAINTS"
          annotation="[VERIFIED ARCHITECTURE] RESPONSIBILITY BOUNDARIES"
          dataAttribute={{ "data-engineering": true }}
        >
          <div className="space-y-8" data-engineering-reveal>
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-primary mb-3 leading-tight">
                {engineering.heading}
              </h2>
              <p className="font-sans text-secondary text-base leading-relaxed">
                The architecture separates language-model interpretation from deterministic Python calculations and guardrails.
              </p>
            </div>

            {/* Visual Invariant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {engineering.specs.map((spec, idx) => (
                <div key={idx} className="p-5 border border-line bg-[#090909] rounded">
                  <div className="font-mono text-[10px] text-secondary mb-2 flex items-center justify-between">
                    <span>INVARIANT 0{idx + 1}</span>
                    <span className="text-primary font-medium">[VERIFIED ARCHITECTURE]</span>
                  </div>
                  <h3 className="text-base font-medium text-primary mb-1">
                    {spec.title}
                  </h3>
                  <p className="font-sans text-secondary text-xs leading-relaxed">
                    {spec.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Expandable Technical Substrate Details */}
            <div className="space-y-3 pt-4">
              <ExpandableDetail label="System Responsibilities" badge="VERIFIED ARCHITECTURE">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {engineering.manifest.map((item, idx) => (
                    <div key={idx} className="border-t border-line/40 pt-3">
                      <div className="font-mono text-[10px] text-secondary tracking-wider uppercase mb-1">
                        {item.layer}
                      </div>
                      <div className="font-mono text-xs text-primary font-semibold">
                        {item.stack}
                      </div>
                      <div className="font-sans text-xs text-secondary leading-relaxed mt-1">
                        {item.note}
                      </div>
                    </div>
                  ))}
                </div>
              </ExpandableDetail>
            </div>
          </div>
        </CaseStudySection>

        {/* 08 / TEAM CONTEXT & INDIVIDUAL ROLE */}
        <CaseStudySection
          id="role"
          index="08"
          label="TEAM CONTEXT &amp; ROLE"
          annotation={role.annotation}
          dataAttribute={{ "data-role": true }}
        >
          <div className="space-y-6" data-role-reveal>
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-primary mb-3">
                Collaborative Context
              </h2>
              <p className="font-sans text-secondary text-sm sm:text-base leading-relaxed mb-3">
                {role.context}
              </p>
              <p className="font-sans text-secondary text-sm leading-relaxed">
                {role.reflection}
              </p>
            </div>

            <div className="pt-3 border-t border-line font-mono text-xs text-secondary/60 flex flex-wrap items-center justify-between gap-2">
              <span>COLLABORATION // HACKATHON RESEARCH PROTOTYPE</span>
              <span className="text-primary">{role.statusNotice}</span>
            </div>
          </div>
        </CaseStudySection>

        {/* 09 / RETROSPECTIVE & TRADE-OFFS */}
        <CaseStudySection
          id="retrospective"
          index="09"
          label="RETROSPECTIVE"
          annotation={retrospective.annotation}
          dataAttribute={{ "data-retrospective": true }}
        >
          <div className="space-y-8" data-retrospective-reveal>
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-primary mb-2">
                {retrospective.heading}
              </h2>
              <p className="font-sans text-secondary text-sm sm:text-base leading-relaxed">
                Key lessons gained from implementing autonomous multi-agent pipelines with deterministic computation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {retrospective.tradeoffs.map((tradeoff, idx) => (
                <div key={idx} className="p-5 border border-line bg-[#090909] rounded flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[10px] text-secondary mb-2">
                      LESSON 0{idx + 1}
                    </div>
                    <h3 className="text-base font-medium text-primary mb-2">
                      {tradeoff.title}
                    </h3>
                    <p className="font-sans text-secondary text-xs leading-relaxed">
                      {tradeoff.takeaway}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CaseStudySection>

        {/* 10 / NEXT CASE STUDY */}
        <NextProjectTeaser
          index="10"
          nextNumber={nextProject.number}
          nextName={nextProject.name}
          nextSubtitle={nextProject.subtitle}
          nextCategory={nextProject.category}
        />
      </main>
    </CaseStudyShell>
  );
}
