// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupCaseStudyMotion } from "../lib/case-study-motion";
import { finoraData } from "../data/projects/finora";
import { aptlyData } from "../data/projects/aptly";
import { veyraData } from "../data/projects/veyra";
import { nikotData } from "../data/projects/nikot";
import { projects } from "../data/projects";

let reduce = false;
let width = 1440;
let cleanup: (() => void) | undefined;
const queries = new Map<string, { media: string; readonly matches: boolean; addListener: (fn: () => void) => void; removeListener: (fn: () => void) => void; addEventListener: (event: string, fn: () => void) => void; removeEventListener: (event: string, fn: () => void) => void }>();
const listeners = new Set<() => void>();

beforeEach(() => {
  reduce = false;
  width = 1440;
  queries.clear();
  listeners.clear();

  vi.stubGlobal("matchMedia", (query: string) => {
    if (!queries.has(query)) {
      queries.set(query, {
        media: query,
        get matches() {
          if (query.includes("no-preference") && reduce) return false;
          if (query.includes("min-width: 1024px") && width < 1024) return false;
          return query.includes("no-preference");
        },
        addListener: (fn) => { listeners.add(fn); },
        removeListener: (fn) => { listeners.delete(fn); },
        addEventListener: (_event, fn) => { listeners.add(fn); },
        removeEventListener: (_event, fn) => { listeners.delete(fn); },
      });
    }
    return queries.get(query);
  });

  vi.stubGlobal("scrollTo", vi.fn());

  document.body.innerHTML = `
    <div id="test-case-root">
      <header data-case-nav></header>
      <section data-case-hero>
        <h1 data-hero-headline>Finora</h1>
        <div data-hero-meta-row>Meta</div>
      </section>
      <section data-tension><div data-tension-reveal>Tension</div></section>
      <section data-boundary><div data-boundary-reveal>Boundary</div></section>
      <div data-topography-pin>
        <div data-topography-stage>
          <div data-topo-stage-card><span data-topo-step-chip>01</span>Router</div>
          <div data-topo-stage-card><span data-topo-step-chip>02</span>Orchestrator</div>
          <div data-topo-stage-card><span data-topo-step-chip>03</span>Agents</div>
          <div data-topo-stage-card><span data-topo-step-chip>04</span>Judge</div>
          <div data-topo-stage-card><span data-topo-step-chip>05</span>Synthesis</div>
          <div data-topo-bypass-path>Bypass</div>
          <div data-topo-router-path>Router Path</div>
          <div data-topo-math-indicator>Math</div>
          <div data-topo-revision-path>Revision</div>
        </div>
      </div>
      <section data-theatre-section><div data-theatre-reveal>Theatre</div></section>
      <section data-judge-section><div data-judge-reveal>Judge</div></section>
      <section data-trace-section><div data-trace-reveal>Trace</div></section>
      <section data-engineering><div data-engineering-reveal>Engineering</div></section>
      <section data-role><div data-role-reveal>Role</div></section>
      <section data-retrospective><div data-retrospective-reveal>Retrospective</div></section>
      <section data-next-project><div data-next-reveal>Next</div></section>
    </div>
  `;
});

afterEach(() => {
  cleanup?.();
  cleanup = undefined;
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.globalTimeline.clear();
  vi.unstubAllGlobals();
});

describe("Case study motion architecture and constraints", () => {
  it("creates zero animations or triggers when reduced motion is requested", () => {
    reduce = true;
    const root = document.querySelector<HTMLElement>("#test-case-root")!;
    cleanup = setupCaseStudyMotion(root);

    expect(ScrollTrigger.getAll()).toHaveLength(0);
    expect(gsap.getTweensOf(root.querySelectorAll("*"))).toHaveLength(0);
  });

  it("does NOT pin System Topography when viewport is below 1024px threshold", () => {
    width = 768; // Mobile / tablet viewport
    const root = document.querySelector<HTMLElement>("#test-case-root")!;
    cleanup = setupCaseStudyMotion(root);

    const triggers = ScrollTrigger.getAll();
    const pinnedTriggers = triggers.filter((t) => (t.vars as { pin?: boolean }).pin === true);
    expect(pinnedTriggers).toHaveLength(0);
  });

  it("creates exactly ONE pinned ScrollTrigger on desktop (>= 1024px)", () => {
    width = 1440;
    const root = document.querySelector<HTMLElement>("#test-case-root")!;
    cleanup = setupCaseStudyMotion(root);

    const triggers = ScrollTrigger.getAll();
    const pinnedTriggers = triggers.filter((t) => (t.vars as { pin?: boolean }).pin === true);
    expect(pinnedTriggers).toHaveLength(1);
    expect(pinnedTriggers[0].trigger).toBe(root.querySelector("[data-topography-pin]"));
  });

  it("cleans up all triggers and timelines when unmounted", () => {
    width = 1440;
    const root = document.querySelector<HTMLElement>("#test-case-root")!;
    cleanup = setupCaseStudyMotion(root);

    expect(ScrollTrigger.getAll().length).toBeGreaterThan(0);
    cleanup();
    cleanup = undefined;
    expect(ScrollTrigger.getAll()).toHaveLength(0);
  });
});

describe("Finora verified repository content invariants", () => {
  it("contains all seven verified specialists", () => {
    const agentIds = finoraData.specialists.agents.map((a) => a.id);
    expect(agentIds).toEqual([
      "budget",
      "affordability",
      "loan",
      "bills",
      "investment",
      "tax",
      "fraud",
    ]);
  });

  it("contains the two orthogonal judge axes", () => {
    const axes = finoraData.judge.axes.map((a) => a.axis);
    expect(axes).toContain("RESPONSE_OK");
    expect(axes).toContain("TRANSACTION_SAFE");
  });

  it("preserves the user confirmation status placeholder in role section", () => {
    expect(finoraData.role.statusNotice).toBe(
      "INDIVIDUAL CONTRIBUTION: REQUIRES USER CONFIRMATION"
    );
  });
});

describe("Aptly verified repository content and motion invariants", () => {
  it("enforces zero pinned ScrollTriggers on Aptly structure", () => {
    document.body.innerHTML = `
      <div id="aptly-test-root">
        <header data-case-nav></header>
        <section data-case-hero>
          <h1 data-hero-headline>APTLY</h1>
          <div data-hero-meta-row>Meta</div>
        </section>
        <div data-aptly-intro><div data-aptly-intro-reveal>Intro</div></div>
        <div data-aptly-engine><div data-aptly-engine-reveal>Engine</div></div>
        <div data-aptly-ats><div data-aptly-ats-reveal>ATS</div></div>
        <div data-aptly-closing><div data-aptly-closing-reveal>Closing</div></div>
        <section data-next-project><div data-next-reveal>Next</div></section>
      </div>
    `;

    const root = document.querySelector<HTMLElement>("#aptly-test-root")!;
    cleanup = setupCaseStudyMotion(root);

    const triggers = ScrollTrigger.getAll();
    const pinnedTriggers = triggers.filter(
      (t) => (t.vars as { pin?: boolean }).pin === true
    );
    expect(pinnedTriggers).toHaveLength(0);
  });

  it("contains all 4 quad-states with UNKNOWN present", () => {
    const states = aptlyData.quadState.states.map((s) => s.id);
    expect(states).toEqual(["MATCHED", "PARTIAL", "FAILED", "UNKNOWN"]);
    expect(aptlyData.quadState.thesis).toBe("UNKNOWN ≠ FAILED");
  });

  it("provides 4-stage evidence chain traces with verified examples", () => {
    expect(aptlyData.evidenceChain.stages).toHaveLength(4);
    const traceIds = aptlyData.evidenceChain.traces.map((t) => t.id);
    expect(traceIds).toContain("GPA");
    expect(traceIds).toContain("SKILL");
    expect(traceIds).toContain("GRADUATION");
  });

  it("defines all 4 evidence depth levels without machine confidence scoring", () => {
    const levels = aptlyData.evidenceChain.evidenceStrengthLevels.map((l) => l.level);
    expect(levels).toEqual(["STRONG", "MODERATE", "WEAK", "NOT_FOUND"]);
  });

  it("distinguishes fixed constraints from actionable skills in gap engine", () => {
    const scenarios = aptlyData.gapEngine.scenarios;
    const actionable = scenarios.find((s) => s.actionable);
    const fixed = scenarios.find((s) => !s.actionable);

    expect(actionable).toBeDefined();
    expect(fixed).toBeDefined();
    expect(actionable?.actionPlan?.map((p) => p.phase)).toEqual([
      "LEARN",
      "PRACTICE",
      "BUILD",
      "PROVE",
    ]);
    expect(fixed?.statusNotice).toContain("NOT ACTIONABLE");
  });

  it("enforces anti-keyword-stuffing rule and SSRF streaming limits", () => {
    expect(aptlyData.atsSection.antiStuffingCallout.headline).toBe(
      "THE ANTI-KEYWORD-STUFFING PRINCIPLE"
    );
    const ssrfSteps = aptlyData.perimeterDefense.pipeline.map((p) => p.name);
    expect(ssrfSteps).toContain("PRIVATE NETWORK REJECTION");
    expect(ssrfSteps).toContain("STREAMING CEILING (750 KB)");
  });

  it("verifies independent engineering authorship by Bedantika Mondal", () => {
    expect(aptlyData.independentEngineering.author).toBe("Bedantika Mondal");
    expect(aptlyData.independentEngineering.commitVerification).toContain(
      "100% solo authorship verified"
    );
  });
});

describe("Veyra verified repository content and motion invariants", () => {
  it("enforces zero pinned ScrollTriggers on Veyra structure", () => {
    document.body.innerHTML = `
      <div id="veyra-test-root">
        <header data-case-nav></header>
        <section data-case-hero>
          <h1 data-hero-headline>VEYRA</h1>
          <div data-hero-meta-row>Meta</div>
        </section>
        <div data-veyra-intro><div data-veyra-intro-reveal>Intro</div></div>
        <div data-veyra-systems><div data-veyra-systems-reveal>Systems</div></div>
        <div data-veyra-engineering><div data-veyra-engineering-reveal>Engineering</div></div>
        <section data-next-project><div data-next-reveal>Next</div></section>
      </div>
    `;

    const root = document.querySelector<HTMLElement>("#veyra-test-root")!;
    cleanup = setupCaseStudyMotion(root);

    const triggers = ScrollTrigger.getAll();
    const pinnedTriggers = triggers.filter(
      (t) => (t.vars as { pin?: boolean }).pin === true
    );
    expect(pinnedTriggers).toHaveLength(0);
  });

  it("verifies all 8 budget categories and mathematical status logic", () => {
    const categories = veyraData.budgetField.categories;
    expect(categories).toHaveLength(8);

    const categoryNames = categories.map((c) => c.category);
    expect(categoryNames).toEqual([
      "Housing",
      "Food",
      "Transport",
      "Shopping",
      "Entertainment",
      "Healthcare",
      "Utilities",
      "Education",
    ]);

    // Check status logic conformance
    categories.forEach((c) => {
      const calculatedUtilization = (c.spent / c.allocated) * 100;
      expect(c.utilization).toBeCloseTo(calculatedUtilization, 1);
      expect(c.remaining).toBe(c.allocated - c.spent);

      if (c.utilization >= 100) {
        expect(c.status).toBe("exceeded");
      } else if (c.utilization >= 80) {
        expect(c.status).toBe("warning");
      } else {
        expect(c.status).toBe("healthy");
      }
    });
  });

  it("verifies 4-factor VeyraScore weights sum to exactly 100%", () => {
    const factors = veyraData.veyraScore.factors;
    expect(factors).toHaveLength(4);

    const totalWeight = factors.reduce((sum, f) => sum + f.weightPercent, 0);
    expect(totalWeight).toBe(100);

    const weightedScore = factors.reduce(
      (sum, f) => sum + (f.score * f.weightDecimal),
      0
    );
    expect(Math.round(weightedScore)).toBe(veyraData.veyraScore.compositeScore);
    expect(veyraData.veyraScore.tier).toBe("STRONG");
  });

  it("verifies cash-flow streams branch and sum to baseline inflow", () => {
    const streams = veyraData.cashFlow.streams;
    expect(streams).toHaveLength(4);

    const totalAmount = streams.reduce((sum, s) => sum + s.amount, 0);
    expect(totalAmount).toBe(95000);

    const totalPercent = streams.reduce((sum, s) => sum + s.percentage, 0);
    expect(totalPercent).toBeCloseTo(100.0, 1);
  });

  it("verifies solo authorship attribution and synthetic fixture notice", () => {
    expect(veyraData.authorship.attribution).toBe(
      "DESIGNED AND BUILT BY BEDANTIKA MONDAL"
    );
    expect(veyraData.hero.syntheticDataNotice).toContain(
      "synthetic demonstration fixtures"
    );
    expect(veyraData.veyraScore.notice).toContain(
      "PROJECT-SPECIFIC INTERNAL METRIC"
    );
  });
});

describe("Nikot-e-Metro verified repository content and motion invariants", () => {
  it("enforces zero pinned ScrollTriggers on Nikot structure", () => {
    document.body.innerHTML = `
      <div id="nikot-test-root">
        <header data-case-nav></header>
        <section data-case-hero>
          <h1 data-hero-headline>NIKOT-E-METRO</h1>
          <div data-hero-meta-row>Meta</div>
        </section>
        <div data-nikot-intro><div data-nikot-intro-reveal>Intro</div></div>
        <div data-nikot-systems><div data-nikot-systems-reveal>Systems</div></div>
        <div data-nikot-engineering><div data-nikot-engineering-reveal>Engineering</div></div>
        <section data-next-project><div data-next-reveal>Next</div></section>
      </div>
    `;

    const root = document.querySelector<HTMLElement>("#nikot-test-root")!;
    cleanup = setupCaseStudyMotion(root);

    const triggers = ScrollTrigger.getAll();
    const pinnedTriggers = triggers.filter(
      (t) => (t.vars as { pin?: boolean }).pin === true
    );
    expect(pinnedTriggers).toHaveLength(0);
  });

  it("verifies landmark origins with candidate station distances", () => {
    const origins = nikotData.radialField.origins;
    expect(origins).toHaveLength(3);

    const names = origins.map((o) => o.name);
    expect(names).toContain("Victoria Memorial");
    expect(names).toContain("Howrah Railway Station");
    expect(names).toContain("Techno India University");

    origins.forEach((o) => {
      expect(o.candidateStations.length).toBeGreaterThan(0);
      const nearest = o.candidateStations.filter((s) => s.isNearest);
      expect(nearest).toHaveLength(1);
      expect(nearest[0].walkingMinutes).toBeGreaterThan(0);
      expect(nearest[0].straightLineKm).toBeGreaterThan(0);
    });
  });

  it("verifies all three Pareto routing criteria options in verified corridor", () => {
    const options = nikotData.paretoMatrix.options;
    expect(options).toHaveLength(3);

    const criteriaIds = options.map((o) => o.criteriaId);
    expect(criteriaIds).toEqual(["fastest", "fewest_transfers", "least_walking"]);

    options.forEach((opt) => {
      expect(opt.totalDurationMinutes).toBeGreaterThan(0);
      expect(opt.stages.length).toBeGreaterThan(0);
      expect(opt.walkingDurationMinutes).toBeLessThanOrEqual(opt.totalDurationMinutes);
    });
  });

  it("verifies Esplanade interchange transfer model with concourse dwell", () => {
    const interchange = nikotData.interchangeAnatomy;
    expect(interchange.hubName).toContain("Esplanade");
    expect(interchange.transferModel.length).toBe(4);

    const totalDwell = interchange.transferModel.reduce(
      (sum, p) => sum + p.dwellMinutes,
      0
    );
    expect(totalDwell).toBeGreaterThanOrEqual(4);
    expect(interchange.penaltyPhilosophy).toContain("routing weights");
  });

  it("verifies explicit absence of live train tracking and solo authorship", () => {
    expect(nikotData.authorship.attribution).toBe(
      "DESIGNED AND BUILT BY BEDANTIKA MONDAL"
    );
    expect(nikotData.hero.datasetNotice).toContain(
      "Nikot's bundled routing dataset"
    );

    const liveBoundary = nikotData.geolocationPrivacy.liveDataBoundary.join(" ");
    expect(liveBoundary).toContain("NOT REAL-TIME");
    expect(liveBoundary).toContain("Nikot does NOT receive live GPS telemetry");
  });

  it("verifies Nikot case study link exists in homepage Selected Work projects data", () => {
    const nikot = projects.find((p) => p.slug === "nikot-e-metro");
    expect(nikot).toBeDefined();
    expect(nikot?.links.caseStudy).toBe("/project/nikot-e-metro");
  });
});

