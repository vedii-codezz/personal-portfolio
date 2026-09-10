import { Metadata } from "next";
import { finoraData } from "@/data/projects/finora";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { NextProjectTeaser } from "@/components/case-study/next-project-teaser";
import { FinoraTopography } from "@/components/project/finora/finora-topography";
import { FinoraAgentTheatre } from "@/components/project/finora/finora-agent-theatre";
import { FinoraJudgeMatrix } from "@/components/project/finora/finora-judge-matrix";
import { FinoraTraceViewer } from "@/components/project/finora/finora-trace-viewer";

export const metadata: Metadata = {
  title: "Finora — Multi-Agent Personal CFO | Bedantika Mondal",
  description:
    "A deterministic-first financial intelligence architecture where language models plan specialist workflows, while standard-library Python executes financial arithmetic.",
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

        {/* 01 / THE CORE TENSION: ARITHMETIC VS REASONING (De-boxed open editorial flow) */}
        <CaseStudySection
          id="tension"
          index="01"
          label="THE CORE TENSION"
          annotation={tension.annotation}
          dataAttribute={{ "data-tension": true }}
        >
          <div className="space-y-16" data-tension-reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-primary leading-tight">
                  Arithmetic vs. Reasoning
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-6 font-sans text-secondary text-base sm:text-lg leading-relaxed">
                <p className="text-primary font-medium">{tension.intro}</p>
                {tension.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Interconnected Constraint Ripples: Open sequential list, not boxed cards */}
            <div className="pt-8 border-t border-line">
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-secondary uppercase tracking-widest mb-8">
                <span>SYSTEM DYNAMICS // ONE PURCHASE EVENT → FIVE CONSTRAINT RIPPLES</span>
                <span className="text-[11px] text-primary">[ INTERDEPENDENT EQUILIBRIUM ]</span>
              </div>

              <div className="space-y-6">
                {tension.ripples.map((ripple, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline py-4 border-b border-white/5"
                  >
                    <div className="md:col-span-1 font-mono text-xs text-secondary/60">
                      0{idx + 1}
                    </div>
                    <div className="md:col-span-3 font-mono text-sm sm:text-base text-primary font-medium tracking-tight">
                      {ripple.domain}
                    </div>
                    <div className="md:col-span-8 font-sans text-sm sm:text-base text-secondary leading-relaxed">
                      {ripple.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CaseStudySection>

        {/* 02 / THE DETERMINISTIC-FIRST BOUNDARY (Sharpened contrast between Model and Engine) */}
        <CaseStudySection
          id="boundary"
          index="02"
          label="ARCHITECTURAL PRINCIPLE"
          annotation={boundary.annotation}
          dataAttribute={{ "data-boundary": true }}
        >
          <div className="space-y-12" data-boundary-reveal>
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-primary mb-4 leading-tight">
                {boundary.heading}
              </h2>
              <p className="font-sans text-secondary text-lg sm:text-xl leading-relaxed">
                &ldquo;{boundary.statement}&rdquo;
              </p>
            </div>

            {/* Asymmetrical High-Contrast Comparison: Linguistic vs Structured */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-4">
              {/* Left: Probabilistic Reasoning (Linguistic, Open, Minimal Border) */}
              <div className="p-6 sm:p-8 border-t border-line flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-secondary uppercase tracking-wider mb-2">
                    LAYER 01 // PROBABILISTIC REASONING
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-normal text-primary mb-6">
                    Linguistic Planning
                  </h3>

                  <div className="space-y-6 font-sans mb-8">
                    <div>
                      <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-1">
                        PERMITTED RESPONSIBILITY:
                      </span>
                      <p className="text-primary text-base leading-relaxed">
                        {boundary.comparison[0].role}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-1">
                        FORBIDDEN ACTION:
                      </span>
                      <p className="text-secondary text-sm leading-relaxed">
                        {boundary.comparison[0].forbidden}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 font-mono text-xs text-secondary">
                  <span className="text-primary font-semibold">RUNTIME: </span>
                  {boundary.comparison[0].runtime}
                </div>
              </div>

              {/* Right: Deterministic Computation (Tabular, Exact, Crisp Surface) */}
              <div className="p-6 sm:p-8 bg-[#0a0a0a] border border-line rounded flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs text-primary font-bold uppercase tracking-wider mb-2">
                    LAYER 02 // DETERMINISTIC ENGINE
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-normal text-primary mb-6">
                    Exact Computation
                  </h3>

                  <div className="space-y-6 font-sans mb-8">
                    <div>
                      <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-1">
                        MANDATORY ENFORCEMENT:
                      </span>
                      <p className="text-primary text-base leading-relaxed">
                        {boundary.comparison[1].role}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-secondary uppercase tracking-wider block mb-1">
                        ABSOLUTE GUARANTEE:
                      </span>
                      <p className="text-secondary text-sm leading-relaxed">
                        {boundary.comparison[1].forbidden}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-line font-mono text-xs text-secondary bg-black/40 p-3 rounded">
                  <span className="text-primary font-semibold">RUNTIME: </span>
                  {boundary.comparison[1].runtime}
                </div>
              </div>
            </div>
          </div>
        </CaseStudySection>

        {/* 03 / SYSTEM TOPOGRAPHY (Primary Signature Visual A) */}
        <CaseStudySection
          id="topography"
          index="03"
          label="SYSTEM TOPOGRAPHY"
          annotation="FIVE-STAGE ORCHESTRATION PIPELINE"
        >
          <FinoraTopography />
        </CaseStudySection>

        {/* 04 / THE SEVEN SPECIALISTS (Signature Visual B) */}
        <CaseStudySection
          id="specialists"
          index="04"
          label="SEVEN SPECIALISTS"
          annotation="DETERMINISTIC DOMAIN TOOLS"
        >
          <FinoraAgentTheatre />
        </CaseStudySection>

        {/* 05 / THE TWO-AXIS JUDGE (Signature Visual C) */}
        <CaseStudySection
          id="judge"
          index="05"
          label="TWO-AXIS JUDGE"
          annotation="SOLVING THE PASS/FAIL PARADOX"
        >
          <FinoraJudgeMatrix />
        </CaseStudySection>

        {/* 06 / TRACE & EXPLAINABILITY */}
        <CaseStudySection
          id="trace"
          index="06"
          label="TRACE &amp; EXPLAINABILITY"
          annotation="AUDITABLE SYSTEM PROVENANCE"
        >
          <FinoraTraceViewer />
        </CaseStudySection>

        {/* 07 / ENGINEERING CONSTRAINTS & STACK (De-boxed open technical manifest) */}
        <CaseStudySection
          id="engineering"
          index="07"
          label="ENGINEERING CONSTRAINTS"
          annotation={engineering.annotation}
          dataAttribute={{ "data-engineering": true }}
        >
          <div className="space-y-12" data-engineering-reveal>
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-primary mb-4 leading-tight">
                {engineering.heading}
              </h2>
              <p className="font-sans text-secondary text-base sm:text-lg leading-relaxed">
                Architectural choices prioritized sub-100ms cold starts, stateless sessions, and standard-library arithmetic over heavyweight frameworks.
              </p>
            </div>

            {/* Open Technical Stack Manifest: No card boxes */}
            <div className="border-t border-line pt-8">
              <span className="font-mono text-xs text-secondary uppercase tracking-widest block mb-6">
                SYSTEM SUBSTRATE &amp; DEPENDENCY INVENTORY
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {engineering.manifest.map((item, idx) => (
                  <div key={idx} className="border-t border-white/10 pt-4 flex flex-col justify-between gap-1">
                    <div className="font-mono text-[11px] text-secondary tracking-wider uppercase">
                      {item.layer}
                    </div>
                    <div className="font-mono text-sm sm:text-base text-primary font-semibold">
                      {item.stack}
                    </div>
                    <div className="font-sans text-xs text-secondary leading-relaxed mt-1">
                      {item.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Production Invariants */}
            <div className="border-t border-line pt-8">
              <span className="font-mono text-xs text-secondary uppercase tracking-widest block mb-6">
                FOUR ARCHITECTURAL INVARIANTS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {engineering.specs.map((spec, idx) => (
                  <div key={idx} className="border-t border-white/10 pt-4">
                    <div className="font-mono text-[11px] text-secondary mb-2 flex items-center justify-between">
                      <span>INVARIANT 0{idx + 1}</span>
                      <span className="text-primary font-medium">[VERIFIED]</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-normal text-primary mb-2">
                      {spec.title}
                    </h3>
                    <p className="font-sans text-secondary text-sm leading-relaxed">
                      {spec.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CaseStudySection>

        {/* 08 / TEAM CONTEXT & INDIVIDUAL ROLE (Quiet editorial reflection without development brackets) */}
        <CaseStudySection
          id="role"
          index="08"
          label="TEAM CONTEXT &amp; ROLE"
          annotation={role.annotation}
          dataAttribute={{ "data-role": true }}
        >
          <div className="space-y-8" data-role-reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-primary leading-tight">
                  Collaborative Context
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-6 font-sans text-secondary text-base sm:text-lg leading-relaxed">
                <p className="text-primary font-medium">{role.context}</p>
                <p>{role.reflection}</p>

                <div className="pt-4 border-t border-line mt-6 font-mono text-xs text-secondary/60 flex items-center justify-between">
                  <span>COLLABORATION // HACKATHON RESEARCH PROTOTYPE</span>
                  <span>STATUS // REPOSITORY VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </CaseStudySection>

        {/* 09 / RETROSPECTIVE & TRADE-OFFS (Calm editorial reflection, de-boxed) */}
        <CaseStudySection
          id="retrospective"
          index="09"
          label="RETROSPECTIVE"
          annotation={retrospective.annotation}
          dataAttribute={{ "data-retrospective": true }}
        >
          <div className="space-y-12" data-retrospective-reveal>
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-primary mb-4 leading-tight">
                {retrospective.heading}
              </h2>
              <p className="font-sans text-secondary text-base sm:text-lg leading-relaxed">
                Lessons gained from implementing autonomous agents under strict financial guarantees.
              </p>
            </div>

            {/* Open 3-column editorial reflections: No card enclosures */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-4">
              {retrospective.tradeoffs.map((tradeoff, idx) => (
                <div
                  key={idx}
                  className="border-t border-line pt-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-xs text-secondary mb-3 flex items-center justify-between">
                      <span>LESSON 0{idx + 1}</span>
                      <span className="text-primary font-bold">SYSTEM DYNAMICS</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-normal text-primary mb-4">
                      {tradeoff.title}
                    </h3>
                    <p className="font-sans text-secondary text-sm leading-relaxed">
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
