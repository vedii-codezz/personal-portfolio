import type { Metadata } from "next";
import Link from "next/link";
import { nikotData } from "@/data/projects/nikot";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { SectionLabel } from "@/components/ui/section-label";
import { NikotRadialField } from "@/components/project/nikot/nikot-radial-field";
import { NikotParetoMatrix } from "@/components/project/nikot/nikot-pareto-matrix";
import { NikotInterchangeAnatomy } from "@/components/project/nikot/nikot-interchange-anatomy";

export const metadata: Metadata = {
  title: "Nikot-e-Metro — Kolkata Metro Navigation & Spatial Discovery | Bedantika Mondal",
  description:
    "A full-stack rapid transit navigator and spatial station discovery prototype that resolves last-mile pedestrian vectors, operational graph topology, and multi-criteria Pareto routes across Kolkata.",
};

export default function NikotPage() {
  const {
    meta,
    hero,
    lastMileGap,
    locationMath,
    radialField,
    graphTopology,
    tradeoffTheory,
    paretoMatrix,
    interchangeAnatomy,
    bilingualSearch,
    serverArchitecture,
    resilience,
    geolocationPrivacy,
    authorship,
    retrospective,
  } = nikotData;

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
        subtitle={`${meta.bengaliName} • ${meta.subtitle}`}
        category={meta.category}
        timeline={meta.timeline}
        status={meta.status}
        headline={hero.headline}
        summary={hero.summary}
        coordinates={meta.coordinates}
      />

      {/* Dataset Operational Status Notice Banner */}
      <div className="site-gutter py-4 border-b border-line bg-[#080808]">
        <p className="font-mono text-[11px] sm:text-xs text-secondary text-center tracking-wide">
          {hero.datasetNotice}
        </p>
      </div>

      {/* CLUSTER 1: INTRO, LAST-MILE GAP & SPATIAL MATH */}
      <div data-nikot-intro>
        {/* 01 / THE LAST-MILE GAP */}
        <CaseStudySection
          id="last-mile-gap"
          index="01"
          label={lastMileGap.heading}
          annotation={lastMileGap.annotation}
          dataAttribute={{ "data-nikot-intro-reveal": true }}
        >
          <div className="space-y-12">
            <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
              {lastMileGap.problemSummary}
            </p>

            {/* Schematic vs Real World Contrast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lastMileGap.comparison.map((c) => (
                <div
                  key={c.dimension}
                  className="p-6 border border-line bg-[#0a0a0a] rounded space-y-4"
                >
                  <span className="font-mono text-xs font-semibold text-primary tracking-wider uppercase block border-b border-line pb-2">
                    {c.dimension}
                  </span>
                  <div className="space-y-2 text-xs font-mono">
                    <div>
                      <span className="text-secondary uppercase text-[10px] block">PREMISE</span>
                      <span className="text-primary">{c.premise}</span>
                    </div>
                    <div>
                      <span className="text-secondary uppercase text-[10px] block">FOCUS</span>
                      <span className="text-primary">{c.focus}</span>
                    </div>
                    <div>
                      <span className="text-secondary uppercase text-[10px] block">BLINDSPOT</span>
                      <span className="text-primary">{c.blindspot}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Commuter Dilemmas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {lastMileGap.dilemmas.map((d, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-line bg-[#050505] rounded space-y-2"
                >
                  <span className="font-mono text-xs font-semibold text-primary block">
                    {d.q}
                  </span>
                  <p className="font-sans text-xs text-secondary leading-relaxed">
                    {d.context}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CaseStudySection>

        {/* 02 / LOCATION BECOMES DISTANCE */}
        <CaseStudySection
          id="location-math"
          index="02"
          label={locationMath.heading}
          annotation={locationMath.annotation}
          dataAttribute={{ "data-nikot-intro-reveal": true }}
        >
          <div className="space-y-8">
            <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
              {locationMath.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {locationMath.stages.map((stage) => (
                <div
                  key={stage.step}
                  className="p-5 border border-line bg-[#0a0a0a] rounded flex flex-col justify-between gap-4"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-primary px-1.5 py-0.5 border border-line bg-[#141414]">
                      {stage.step}
                    </span>
                    <h4 className="font-mono text-xs font-semibold text-primary mt-3 mb-2">
                      {stage.name}
                    </h4>
                    <div className="p-2.5 border border-line bg-[#050505] rounded font-mono text-xs text-primary mb-3 overflow-x-auto">
                      <code>{stage.formula}</code>
                    </div>
                    <p className="font-sans text-xs text-secondary leading-relaxed">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border border-line bg-[#050505] rounded font-mono text-xs text-secondary">
              {locationMath.divergenceCase}
            </div>
          </div>
        </CaseStudySection>
      </div>

      {/* CLUSTER 2: SIGNATURE VISUAL SYSTEMS */}
      <div data-nikot-systems>
        {/* 03 / THE NEAREST-STATION FIELD (SIGNATURE VISUAL 01) */}
        <CaseStudySection
          id="radial-field"
          index="03"
          label={radialField.heading}
          annotation={radialField.annotation}
          dataAttribute={{ "data-nikot-systems-reveal": true }}
        >
          <div className="space-y-8">
            <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
              {radialField.description}
            </p>

            <NikotRadialField origins={radialField.origins} />
          </div>
        </CaseStudySection>

        {/* 04 / THE CITY BECOMES A GRAPH */}
        <CaseStudySection
          id="graph-topology"
          index="04"
          label={graphTopology.heading}
          annotation={graphTopology.annotation}
          dataAttribute={{ "data-nikot-systems-reveal": true }}
        >
          <div className="space-y-8">
            <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
              {graphTopology.description}
            </p>

            <div className="p-4 border border-line bg-[#050505] rounded font-mono text-xs text-secondary">
              {graphTopology.networkSummary}
            </div>

            {/* Transit Corridors in Nikot Dataset */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {graphTopology.linesInDataset.map((line) => (
                <div
                  key={line.code}
                  className="p-4 border border-line bg-[#0a0a0a] rounded space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary">
                      {line.code}
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 border border-line text-secondary">
                      {line.status}
                    </span>
                  </div>

                  <h4 className="font-sans text-sm font-semibold text-primary">
                    {line.name} ({line.bengaliName})
                  </h4>

                  <span className="font-mono text-[11px] text-secondary block">
                    {line.terminals}
                  </span>

                  <p className="font-sans text-xs text-secondary pt-2 border-t border-line/40 leading-relaxed">
                    {line.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CaseStudySection>

        {/* 05 / ROUTING IS A TRADE-OFF */}
        <CaseStudySection
          id="tradeoff-theory"
          index="05"
          label={tradeoffTheory.heading}
          annotation={tradeoffTheory.annotation}
          dataAttribute={{ "data-nikot-systems-reveal": true }}
        >
          <div className="space-y-8">
            <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
              {tradeoffTheory.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {tradeoffTheory.criteria.map((crit) => (
                <div
                  key={crit.name}
                  className="p-5 border border-line bg-[#0a0a0a] rounded space-y-2"
                >
                  <span className="font-mono text-xs font-semibold text-primary uppercase block">
                    {crit.name}
                  </span>
                  <p className="font-sans text-xs text-secondary leading-relaxed">
                    <strong className="text-primary font-medium">Objective:</strong> {crit.goal}
                  </p>
                  <p className="font-sans text-xs text-secondary leading-relaxed pt-1 border-t border-line/40">
                    <strong className="text-primary font-medium">Strategy:</strong> {crit.priority}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 border border-line bg-[#050505] rounded font-mono text-xs text-secondary">
              {tradeoffTheory.paretoNote}
            </div>
          </div>
        </CaseStudySection>

        {/* 06 / THE PARETO ROUTE MATRIX (SIGNATURE VISUAL 02) */}
        <CaseStudySection
          id="pareto-matrix"
          index="06"
          label={paretoMatrix.heading}
          annotation={paretoMatrix.annotation}
          dataAttribute={{ "data-nikot-systems-reveal": true }}
        >
          <div className="space-y-8">
            <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
              {paretoMatrix.description}
            </p>

            <NikotParetoMatrix
              journeyOverview={paretoMatrix.journeyOverview}
              options={paretoMatrix.options}
            />
          </div>
        </CaseStudySection>

        {/* 07 / INTERCHANGE IS PART OF THE JOURNEY (SIGNATURE VISUAL 03) */}
        <CaseStudySection
          id="interchange-anatomy"
          index="07"
          label={interchangeAnatomy.heading}
          annotation={interchangeAnatomy.annotation}
          dataAttribute={{ "data-nikot-systems-reveal": true }}
        >
          <div className="space-y-8">
            <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
              {interchangeAnatomy.description}
            </p>

            <NikotInterchangeAnatomy
              hubName={interchangeAnatomy.hubName}
              hubBengaliName={interchangeAnatomy.hubBengaliName}
              hubContext={interchangeAnatomy.hubContext}
              transferModel={interchangeAnatomy.transferModel}
              penaltyPhilosophy={interchangeAnatomy.penaltyPhilosophy}
            />
          </div>
        </CaseStudySection>
      </div>

      {/* CLUSTER 3: SEARCH, ARCHITECTURE, RESILIENCE & ETHICS */}
      <div data-nikot-engineering>
        {/* 08 / BILINGUAL CITY SEARCH */}
        <CaseStudySection
          id="bilingual-search"
          index="08"
          label={bilingualSearch.heading}
          annotation={bilingualSearch.annotation}
          dataAttribute={{ "data-nikot-engineering-reveal": true }}
        >
          <div className="space-y-8">
            <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
              {bilingualSearch.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
              {bilingualSearch.samples.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3.5 border border-line bg-[#0a0a0a] rounded space-y-1.5"
                >
                  <span className="text-secondary text-[10px] block">{s.code} • {s.type}</span>
                  <span className="text-primary font-bold block">{s.english}</span>
                  <span className="text-secondary block">{s.bengali}</span>
                </div>
              ))}
            </div>

            <div className="p-4 border border-line bg-[#050505] rounded font-mono text-xs text-secondary">
              {bilingualSearch.normalizationRule}
            </div>
          </div>
        </CaseStudySection>

        {/* 09 / MAP + SERVER ARCHITECTURE */}
        <CaseStudySection
          id="server-architecture"
          index="09"
          label={serverArchitecture.heading}
          annotation={serverArchitecture.annotation}
          dataAttribute={{ "data-nikot-engineering-reveal": true }}
        >
          <div className="space-y-8">
            <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
              {serverArchitecture.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serverArchitecture.stackGroups.map((group) => (
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

        {/* 10 / RESILIENCE & FALLBACKS */}
        <CaseStudySection
          id="resilience"
          index="10"
          label={resilience.heading}
          annotation={resilience.annotation}
          dataAttribute={{ "data-nikot-engineering-reveal": true }}
        >
          <div className="space-y-8">
            <p className="font-sans text-secondary text-base sm:text-lg max-w-3xl leading-relaxed">
              {resilience.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resilience.tiers.map((tier) => (
                <div
                  key={tier.subsystem}
                  className="p-5 border border-line bg-[#0a0a0a] rounded space-y-3"
                >
                  <span className="font-mono text-xs font-bold text-primary uppercase block border-b border-line pb-2">
                    {tier.subsystem}
                  </span>
                  <div className="space-y-2 text-xs font-mono">
                    <div>
                      <span className="text-secondary text-[10px] uppercase block">PRIMARY TIER</span>
                      <span className="text-primary">{tier.primary}</span>
                    </div>
                    <div>
                      <span className="text-secondary text-[10px] uppercase block">FALLBACK TIER</span>
                      <span className="text-primary">{tier.fallback}</span>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-secondary pt-2 border-t border-line/40 leading-relaxed">
                    {tier.behavior}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CaseStudySection>

        {/* 11 / SCOPE / LIVE-DATA BOUNDARY */}
        <CaseStudySection
          id="geolocation-privacy"
          index="11"
          label={geolocationPrivacy.heading}
          annotation={geolocationPrivacy.annotation}
          dataAttribute={{ "data-nikot-engineering-reveal": true }}
        >
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Geolocation Privacy Architecture */}
              <div className="p-6 border border-line bg-[#0a0a0a] rounded space-y-4">
                <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider block border-b border-line pb-2">
                  GEOLOCATION DATA LIFECYCLE
                </span>
                <ul className="space-y-2.5 font-sans text-xs text-secondary leading-relaxed">
                  {geolocationPrivacy.privacyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-mono">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Computed vs Live Telemetry Boundary */}
              <div className="p-6 border border-line bg-[#0a0a0a] rounded space-y-4">
                <span className="font-mono text-xs font-semibold text-primary uppercase tracking-wider block border-b border-line pb-2">
                  OPERATIONAL TELEMETRY BOUNDARY
                </span>
                <ul className="space-y-2.5 font-sans text-xs text-secondary leading-relaxed">
                  {geolocationPrivacy.liveDataBoundary.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-mono">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CaseStudySection>

        {/* 12 / INDEPENDENT PROJECT */}
        <CaseStudySection
          id="authorship"
          index="12"
          label={authorship.heading}
          annotation={authorship.annotation}
          dataAttribute={{ "data-nikot-engineering-reveal": true }}
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

        {/* 13 / RETROSPECTIVE */}
        <CaseStudySection
          id="retrospective"
          index="13"
          label={retrospective.heading}
          annotation={retrospective.annotation}
          dataAttribute={{ "data-nikot-engineering-reveal": true }}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {retrospective.reflections.map((r, idx) => (
                <div
                  key={idx}
                  className="p-6 border-t border-line/60 space-y-2"
                >
                  <span className="font-mono text-[10px] text-secondary tracking-widest uppercase block">
                    TRANSIT REFLECTION 0{idx + 1}
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

      {/* 14 / RETURN TO WORK (CONCLUSION) */}
      <section className="site-gutter py-20 md:py-32 border-b border-line" data-next-project>
        <SectionLabel
          index="14"
          label="PORTFOLIO ARCHIVE"
          annotation="SELECTED WORK COMPLETE"
        />

        <div className="pt-12 md:pt-16" data-next-reveal>
          <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-4">
            CYCLE COMPLETE // 04 ARCHITECTURAL CASE STUDIES
          </span>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-normal tracking-tighter leading-none mb-3 text-primary">
                SELECTED WORK
              </h2>
              <p className="font-mono text-base sm:text-lg text-secondary">
                Finora • Aptly • Veyra • Nikot-e-Metro
              </p>
            </div>

            <div className="pt-4 md:pt-0">
              <Link
                href="/#work"
                className="inline-flex items-center gap-3 font-mono text-xs sm:text-sm text-primary border border-line px-6 py-4 rounded hover:bg-white/5 transition-all group"
              >
                <span>BACK TO SELECTED WORK</span>
                <span className="text-secondary group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </CaseStudyShell>
  );
}
