import type { Metadata } from "next";
import Link from "next/link";
import { nikotData } from "@/data/projects/nikot";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { SectionLabel } from "@/components/ui/section-label";
import { ExpandableDetail } from "@/components/case-study/expandable-detail";
import { NikotRadialField } from "@/components/project/nikot/nikot-radial-field";
import { NikotParetoMatrix } from "@/components/project/nikot/nikot-pareto-matrix";
import { NikotInterchangeAnatomy } from "@/components/project/nikot/nikot-interchange-anatomy";

export const metadata: Metadata = {
  title: "Nikot-e-Metro — Kolkata Metro Navigation & Spatial Discovery | Bedantika Mondal",
  description:
    "Kolkata Metro spatial navigation using nearby-station discovery, a bundled transit graph, and Dijkstra, A*, and Pareto routing.",
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

      <main id="main-content" tabIndex={-1}>
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
      <div className="site-gutter py-4 border-b border-line bg-surface/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-secondary">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded text-[10px] font-semibold uppercase tracking-wider">
              [VERIFIED DATA]
            </span>
            <span>{hero.datasetNotice}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-secondary/80">
            <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded text-[10px] font-semibold uppercase tracking-wider">
              [VERIFIED ARCHITECTURE]
            </span>
            <span>Bundled static graph topology with computed estimates; not live train telemetry.</span>
          </div>
        </div>
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
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded font-semibold tracking-wider uppercase">
                [CONCEPTUAL VISUALIZATION]
              </span>
              <span className="font-mono text-xs text-secondary">
                Schematic Transit Maps vs Pedestrian Physical Space
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Transit maps start with station connections. Nikot begins with user location and nearby-station discovery.
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
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded font-semibold tracking-wider uppercase">
                [VERIFIED DATA]
              </span>
              <span className="font-mono text-xs text-secondary">
                Spatial Math Pipeline — Coordinate Transformation to Walk Estimates
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Haversine nearby-station logic connects user location with candidate station nodes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {locationMath.stages.map((stage) => (
                <div
                  key={stage.step}
                  className="p-5 border border-line bg-[#0a0a0a] rounded flex flex-col justify-between gap-4"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-primary px-1.5 py-0.5 border border-line bg-[#141414]">
                      STAGE {stage.step}
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

            <ExpandableDetail label="Geodesic Math & Spherical Invariants" badge="FORMULAS">
              <div className="space-y-3 pt-2 font-mono text-xs text-secondary leading-relaxed">
                <p>
                  <strong>Haversine:</strong> Geographic proximity supports nearby-station computation.
                </p>
                <p>
                  <strong>Candidate Nodes:</strong> Nearby stations connect location discovery to graph routing.
                </p>
                <p>
                  <strong>Scope:</strong> No specific walking speed or measured route values are asserted here.
                </p>
              </div>
            </ExpandableDetail>
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
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded font-semibold tracking-wider uppercase">
                [CONCEPTUAL VISUALIZATION]
              </span>
              <span className="font-mono text-xs text-secondary">
                Conceptual Nearby-Station Discovery
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Select a conceptual origin to inspect candidate-node relationships. The diagram is not a geographic map, distance scale, or route recommendation.
            </p>

            <NikotRadialField origins={radialField.origins} />

            <ExpandableDetail label="Spatial Indexing & Nearest Neighbor Search" badge="SPATIAL">
              <div className="space-y-3 pt-2 font-mono text-xs text-secondary leading-relaxed">
                <p>
                  <strong>Discovery:</strong> Haversine logic supports nearby-station computation.
                </p>
                <p>
                  <strong>Diagram Boundary:</strong> Candidate positions and emphasis are conceptual.
                </p>
              </div>
            </ExpandableDetail>
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
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-semibold tracking-wider uppercase">
                [VERIFIED ARCHITECTURE]
              </span>
              <span className="font-mono text-xs text-secondary">
                Station Nodes / Track Edges / Transfer Edges / Walking Connections
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              The Kolkata Metro network is modeled as a weighted directed graph where stations form nodes and inter-station track segments represent weighted edges.
            </p>

            <div className="p-4 border border-line bg-[#050505] rounded font-mono text-xs text-secondary">
              {graphTopology.networkSummary}
            </div>

            {/* Transit Corridors in Nikot Dataset */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

            <ExpandableDetail label="Adjacency List & Edge Weight Model" badge="GRAPH">
              <div className="space-y-3 pt-2 font-mono text-xs text-secondary leading-relaxed">
                <p>
                  <strong>Track Edges:</strong> Graph connections represent links between station nodes.
                </p>
                <p>
                  <strong>Transfer Edges:</strong> Connections between lines are represented in the graph.
                </p>
              </div>
            </ExpandableDetail>
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
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded font-semibold tracking-wider uppercase">
                [CONCEPTUAL VISUALIZATION]
              </span>
              <span className="font-mono text-xs text-secondary">
                Multi-Objective Commuter Trade-Off Space
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Route selection involves trade-offs between travel duration, transfer count, and walking duration.
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
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded font-semibold tracking-wider uppercase">
                [CONCEPTUAL VISUALIZATION]
              </span>
              <span className="font-mono text-xs text-secondary">
                Conceptual Route Options — No Measured Journey
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Dijkstra, A*, and Pareto support routing. Pareto dimensions are TRAVEL DURATION, TRANSFER COUNT, and WALKING DURATION.
            </p>

            <NikotParetoMatrix
              journeyOverview={paretoMatrix.journeyOverview}
              options={paretoMatrix.options}
            />

            <ExpandableDetail label="Pareto Dominance Criteria & Weight Formulations" badge="PARETO">
              <div className="space-y-3 pt-2 font-mono text-xs text-secondary leading-relaxed">
                <p>
                  <strong>Pareto Dominance Definition:</strong> Route A dominates Route B if A is strictly better than B in at least one metric and no worse in any other metric.
                </p>
                <p>
                  <strong>Frontier Preservation:</strong> Only mutually non-dominated paths are surfaced to the commuter interface, eliminating objectively inferior options.
                </p>
              </div>
            </ExpandableDetail>
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
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-semibold tracking-wider uppercase">
                [CONCEPTUAL VISUALIZATION]
              </span>
              <span className="font-mono text-xs text-secondary">
                Graph Transfer Model: LINE A &rarr; TRANSFER &rarr; LINE B
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              LINE A → TRANSFER → LINE B illustrates a conceptual graph connection, not actual station infrastructure.
            </p>

            <NikotInterchangeAnatomy
              hubName={interchangeAnatomy.hubName}
              hubBengaliName={interchangeAnatomy.hubBengaliName}
              hubContext={interchangeAnatomy.hubContext}
              transferModel={interchangeAnatomy.transferModel}
              penaltyPhilosophy={interchangeAnatomy.penaltyPhilosophy}
            />

            <ExpandableDetail label="Conceptual Transfer Relationship" badge="TRANSFER">
              <div className="space-y-3 pt-2 font-mono text-xs text-secondary leading-relaxed">
                <div className="flex items-center gap-2 text-primary font-semibold pb-2 border-b border-line/40">
                  <span>LINE A</span>
                  <span>&rarr;</span>
                  <span>TRANSFER</span>
                  <span>&rarr;</span>
                  <span>LINE B</span>
                </div>
                <p>
                  <strong>Transfer Edge:</strong> Connects lines in the conceptual graph.
                </p>
                <p>
                  <strong>Scope:</strong> No physical station layout or measured transfer duration is represented.
                </p>
              </div>
            </ExpandableDetail>
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
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-semibold tracking-wider uppercase">
                [CONCEPTUAL VISUALIZATION]
              </span>
              <span className="font-mono text-xs text-secondary">
                Bilingual Search Normalization — Bengali &amp; Latin Script
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Bilingual English/Bengali search supports station discovery. The labels below are conceptual examples.
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
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-semibold tracking-wider uppercase">
                [VERIFIED ARCHITECTURE]
              </span>
              <span className="font-mono text-xs text-secondary">
                Transit Navigator Implementation Stack
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Nikot connects Haversine nearby-station discovery, bilingual search, a bundled transit dataset, and graph routing.
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
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-semibold tracking-wider uppercase">
                [VERIFIED ARCHITECTURE]
              </span>
              <span className="font-mono text-xs text-secondary">
                Graceful Degradation Across Connectivity Tiers
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              Bundled project data is distinct from current service telemetry. No offline PWA capability is claimed.
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
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-semibold tracking-wider uppercase">
                [VERIFIED ARCHITECTURE]
              </span>
              <span className="font-mono text-xs text-secondary">
                Operational Boundaries &amp; Privacy Architecture
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed max-w-4xl">
              User location is used transiently for nearby-station computation; no location persistence feature is implemented.
            </p>

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
      </main>
    </CaseStudyShell>
  );
}
