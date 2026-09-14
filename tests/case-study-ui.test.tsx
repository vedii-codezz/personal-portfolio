// @vitest-environment jsdom
import { act, type ReactElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import Finora from "@/app/project/finora/page";
import Aptly from "@/app/project/aptly/page";
import Veyra from "@/app/project/veyra/page";
import Nikot from "@/app/project/nikot-e-metro/page";
import { FinoraAgentTheatre } from "@/components/project/finora/finora-agent-theatre";
import { AptlyStatusMatrix } from "@/components/project/aptly/aptly-status-matrix";
import { AptlyEvidenceChain } from "@/components/project/aptly/aptly-evidence-chain";
import { AptlyGapEngine } from "@/components/project/aptly/aptly-gap-engine";
import { VeyraBudgetField } from "@/components/project/veyra/veyra-budget-field";
import { VeyraScoreInspector } from "@/components/project/veyra/veyra-score-inspector";
import { NikotRadialField } from "@/components/project/nikot/nikot-radial-field";
import { NikotParetoMatrix } from "@/components/project/nikot/nikot-pareto-matrix";
import { ExpandableDetail } from "@/components/case-study/expandable-detail";
import { veyraData } from "@/data/projects/veyra";
import { nikotData } from "@/data/projects/nikot";

let root: Root | undefined;
beforeEach(() => vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true));
afterEach(() => {
  if (root) act(() => root!.unmount());
  root = undefined;
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

function staticPage(page: ReactElement) {
  const container = document.createElement("div");
  container.innerHTML = renderToStaticMarkup(page);
  return container;
}
function projectSources(slug: string, dataSlug = slug) {
  const dir = join(process.cwd(), "components/project", dataSlug);
  return [readFileSync(join(process.cwd(), `data/projects/${dataSlug}.ts`), "utf8"),
    readFileSync(join(process.cwd(), `app/project/${slug}/page.tsx`), "utf8"),
    ...readdirSync(dir).filter(f => f.endsWith(".tsx")).map(f => readFileSync(join(dir, f), "utf8"))].join("\n");
}

describe("M9.2B rendered source truth", () => {
  it.each([["Home", <Home />], ["Finora", <Finora />], ["Aptly", <Aptly />], ["Veyra", <Veyra />], ["Nikot", <Nikot />]] as const)("%s has one main landmark and unique IDs", (_name, page) => {
    const dom = staticPage(page);
    expect(dom.querySelectorAll("main")).toHaveLength(1);
    expect(dom.querySelector("main main")).toBeNull();
    const ids = [...dom.querySelectorAll("[id]")].map(el => el.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
  });

  it("excludes unsupported Finora finance and performance claims from data, visuals and page copy", () => {
    expect(projectSources("finora")).not.toMatch(/1[–-]2\s*s|sub-second|regulatory|40%|\bEMI\b|\bGST\b|emergency_floor|emergency floor|\b\d+(?:\.\d+)?\s*ms\b|latency|response time|0\.95/i);
    const text = staticPage(<Finora />).textContent!;
    expect(text).toContain("JUDGE");
    expect(text).toContain("PASS / REVISE");
  });

  it("renders only approved financial figures and structural Veyra score content", () => {
    const text = staticPage(<Veyra />).textContent!;
    expect(text).not.toMatch(/\b78\b|\bSTRONG\b|81\s*\/\s*100|Optimal Tier|sub-millisecond|(?:one|1) millisecond|(?:35|25|20|15|80|85)%/i);
    expect(projectSources("veyra")).not.toMatch(/compositeScore|weightPercent|weightDecimal|sub-millisecond|(?:one|1) millisecond|80%|85%/i);
    const rupees = text.match(/₹[\d,]+/g) ?? [];
    expect(rupees.length).toBeGreaterThan(0);
    expect(rupees.every(value => ["₹95,000", "₹58,400", "₹36,600"].includes(value))).toBe(true);
    expect(text.match(/\b\d+(?:\.\d+)?%/g)?.every(value => value === "38.5%")).toBe(true);
    expect(text).toContain("No database, auth, or persistent storage");
    expect(text.toLowerCase()).toContain("conceptual financial flow visualization");
  });

  it("keeps Nikot interchange conceptual and removes route measurements", () => {
    const dom = staticPage(<Nikot />);
    expect(projectSources("nikot-e-metro", "nikot")).not.toMatch(/Esplanade|passageway|escalator|subterranean|\bplatform\b|\bgate\b|\bsubway\b|\b\d+(?:\.\d+)?\s*(?:km|minutes|min|ms)\b/i);
    const interchange = dom.querySelector("[data-interchange-anatomy]")!;
    expect(interchange.textContent).toContain("[CONCEPTUAL VISUALIZATION]");
    expect(interchange.textContent).toContain("LINE A → TRANSFER → LINE B");
    expect(dom.textContent).toContain("WALKING DURATION");
  });

  it("retains a native, initially closed disclosure with a visible summary", () => {
    const dom = staticPage(<ExpandableDetail label="Technical detail">Supporting content</ExpandableDetail>);
    expect(dom.querySelector("details")?.open).toBe(false);
    expect(dom.querySelector("summary")?.textContent).toContain("Technical detail");
  });

  it("renders Contact with a single external arrow glyph", () => {
    const dom = staticPage(<Home />);
    const contactFooter = dom.querySelector("#contact")!;
    expect(contactFooter).not.toBeNull();
    const githubLink = contactFooter.querySelector("a[href*='github.com']")!;
    expect(githubLink).not.toBeNull();
    const arrows = (githubLink.textContent || "").match(/↗/g);
    expect(arrows).toHaveLength(1);
  });

  it("ensures Nikot Pareto matrix has no orphan bullet points", () => {
    const dom = staticPage(<Nikot />);
    const pareto = dom.querySelector("[data-pareto-matrix]")!;
    expect(pareto).not.toBeNull();
    const bullets = [...pareto.querySelectorAll("span")].filter(s => s.textContent?.trim() === "•");
    expect(bullets).toHaveLength(0);
  });

  it("provides keyboard-accessible skip-to-content on all case study pages targeting #main-content", () => {
    for (const [name, page] of [["Finora", <Finora />], ["Aptly", <Aptly />], ["Veyra", <Veyra />], ["Nikot", <Nikot />]] as const) {
      const dom = staticPage(page);
      const skipLink = dom.querySelector<HTMLAnchorElement>("a.skip-link");
      expect(skipLink, `${name} missing skip link`).not.toBeNull();
      expect(skipLink!.getAttribute("href")).toBe("#main-content");
      const main = dom.querySelector("main#main-content");
      expect(main, `${name} missing main#main-content`).not.toBeNull();
    }
  });
});

const inspectors = [
  ["Finora specialists", <FinoraAgentTheatre />],
  ["Aptly states", <AptlyStatusMatrix />],
  ["Aptly evidence", <AptlyEvidenceChain />],
  ["Aptly gaps", <AptlyGapEngine />],
  ["Veyra categories", <VeyraBudgetField {...veyraData.budgetField} />],
  ["Veyra score", <VeyraScoreInspector {...veyraData.veyraScore} />],
  ["Nikot origins", <NikotRadialField {...nikotData.radialField} />],
  ["Nikot routes", <NikotParetoMatrix {...nikotData.paretoMatrix} />],
] as const;

describe("Project inspector keyboard interaction", () => {
  it.each(inspectors)("%s supports arrows, Home/End, focus and roving tabIndex", (_name, component) => {
    const container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    act(() => root!.render(component));
    const tabs = [...container.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const assertSelected = (index: number) => {
      expect(document.activeElement).toBe(tabs[index]);
      tabs.forEach((tab, i) => {
        expect(tab.getAttribute("aria-selected")).toBe(String(i === index));
        expect(tab.tabIndex).toBe(i === index ? 0 : -1);
      });
      expect(container.querySelector('[role="tabpanel"]')?.getAttribute("aria-labelledby")).toBe(tabs[index].id);
    };
    act(() => { tabs[0].click(); tabs[0].focus(); });
    for (const [key, expected] of [["End", tabs.length - 1], ["ArrowRight", 0], ["ArrowDown", 1], ["ArrowLeft", 0], ["ArrowUp", tabs.length - 1], ["Home", 0]] as const) {
      act(() => document.activeElement!.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true })));
      assertSelected(expected);
    }
    act(() => tabs[1].click());
    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(tabs[0]); // Pointer selection does not force focus.
  });
});
