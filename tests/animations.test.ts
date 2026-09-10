// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupPortfolioMotion } from "../lib/animations";

let reduce = false;
let width = 1440;
let height = 1000;
let cleanup: (() => void) | undefined;
const queries = new Map<string, { media: string; readonly matches: boolean; addListener: (fn: () => void) => void; removeListener: (fn: () => void) => void; addEventListener: (event: string, fn: () => void) => void; removeEventListener: (event: string, fn: () => void) => void }>();
const listeners = new Set<() => void>();

beforeEach(() => {
  reduce = false;
  width = 1440;
  height = 1000;
  queries.clear(); listeners.clear();
  vi.stubGlobal("matchMedia", (query: string) => {
    if (!queries.has(query)) queries.set(query, {
      media: query,
      get matches() {
        if (query.includes("no-preference") && reduce) return false;
        if (query.includes("max-width: 767px") && width >= 768) return false;
        if (query.includes("min-width: 768px") && width < 768) return false;
        if (query.includes("min-height: 620px") && height < 620) return false;
        return query.includes("no-preference");
      },
      addListener: fn => { listeners.add(fn); },
      removeListener: fn => { listeners.delete(fn); },
      addEventListener: (_event, fn) => { listeners.add(fn); },
      removeEventListener: (_event, fn) => { listeners.delete(fn); },
    });
    return queries.get(query);
  });
  vi.stubGlobal("scrollTo", vi.fn());
  document.body.innerHTML = `<div id="test-root"><header data-nav></header><section data-hero><span data-hero-line>Name</span><div data-portrait-mask></div><p data-hero-meta>Identity</p></section><section data-intro><h2 data-intro-reveal>Intro</h2></section><section data-work><div data-project-stage><div data-project-track>${[0,1,2,3].map(i=>`<article data-project-item><a href="https://example.com">Project ${i}</a></article>`).join("")}</div>${[0,1,2,3].map(i=>`<button data-chapter-button="${i}">${i}</button>`).join("")}</div></section></div>`;
  Object.defineProperty(document.querySelector("[data-project-stage]"), "clientWidth", { value: 1000 });
  Object.defineProperty(document.querySelector("[data-project-track]"), "scrollWidth", { value: 4000 });
  Object.defineProperty(document.querySelector("[data-hero]"), "offsetHeight", { value: 700 });
});

afterEach(() => {
  cleanup?.(); cleanup = undefined;
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
  vi.unstubAllGlobals();
});

describe("portfolio motion preferences and lifecycle", () => {
  it("creates no motion or scroll triggers when reduced motion is requested", () => {
    reduce = true;
    cleanup = setupPortfolioMotion(document.querySelector("#test-root")!);
    expect(ScrollTrigger.getAll()).toHaveLength(0);
    expect(document.querySelector("[data-reel]")).toBeNull();
    expect(document.querySelector("[aria-hidden=true]")).toBeNull();
    // ScrollTrigger owns internal delayed calls; assert no DOM animation.
    expect(gsap.getTweensOf(document.querySelectorAll("#test-root *"))).toHaveLength(0);
    expect(document.querySelectorAll('[style*="opacity: 0"]')).toHaveLength(0);
  });

  it("restores readable resting styles and removes triggers on a live preference change", async () => {
    cleanup = setupPortfolioMotion(document.querySelector("#test-root")!);
    expect(ScrollTrigger.getAll().length).toBeLessThanOrEqual(2);
    expect(gsap.globalTimeline.getChildren().length).toBeGreaterThan(0);
    reduce = true;
    await new Promise(resolve => setTimeout(resolve, 10));
    listeners.forEach(listener => listener());
    expect(ScrollTrigger.getAll()).toHaveLength(0);
    expect(document.querySelector(".pin-spacer")).toBeNull();
    expect(document.querySelector("[data-reel]")).toBeNull();
    expect(document.querySelector("[aria-hidden=true]")).toBeNull();
    for (const el of document.querySelectorAll<HTMLElement>("[data-hero-line], [data-portrait-mask], [data-intro-reveal], [data-project-item]")) {
      expect(el.style.opacity).toBe("");
      expect(el.style.transform).toBe("");
      expect(el.style.clipPath).toBe("");
    }
  });

  it("cleans up before a React remount without accumulating section triggers", () => {
    const root = document.querySelector<HTMLElement>("#test-root")!;
    cleanup = setupPortfolioMotion(root);
    cleanup();
    expect(ScrollTrigger.getAll()).toHaveLength(0);
    cleanup = setupPortfolioMotion(root);
    expect(ScrollTrigger.getAll().length).toBeLessThanOrEqual(2);
    cleanup();
    expect(ScrollTrigger.getAll()).toHaveLength(0);
    expect(document.querySelectorAll(".pin-spacer")).toHaveLength(0);
  });

  it("uses one pinned trigger and advances accessibility only at chapter thresholds", () => {
    cleanup = setupPortfolioMotion(document.querySelector("#test-root")!);
    const reel = ScrollTrigger.getById("project-reel")!;
    expect(ScrollTrigger.getAll().filter(trigger => trigger.vars.pin)).toHaveLength(1);
    expect(reel.vars.scrub).toBe(.4);
    reel.animation!.progress(1 / 3);
    expect(document.querySelector('[data-chapter-button="1"]')?.getAttribute("aria-current")).toBe("step");
    const panels = [...document.querySelectorAll<HTMLElement>("[data-project-item]")];
    expect(panels[0].inert).toBe(true);
    expect(panels[1].inert).toBe(false);
    reel.animation!.progress(.4);
    expect(document.querySelector('[data-chapter-button="1"]')?.getAttribute("aria-current")).toBe("step");
    reel.animation!.progress(.51);
    expect(document.querySelector('[data-chapter-button="2"]')?.getAttribute("aria-current")).toBe("step");
    reel.animation!.progress(1);
    expect(panels[3].inert).toBe(false);
  });

  it("unpins on a mobile breakpoint and restores every chapter", async () => {
    cleanup = setupPortfolioMotion(document.querySelector("#test-root")!);
    width = 390;
    await new Promise(resolve => setTimeout(resolve, 10));
    listeners.forEach(listener => listener());
    expect(ScrollTrigger.getAll().filter(trigger => trigger.vars.pin)).toHaveLength(0);
    expect(document.querySelector(".pin-spacer")).toBeNull();
    expect(document.querySelector("[data-reel]")).toBeNull();
    expect([...document.querySelectorAll<HTMLElement>("[data-project-item]")].every(panel=>!panel.inert)).toBe(true);
  });

  it("keeps short viewports static and restores the track on teardown", () => {
    height = 600;
    cleanup = setupPortfolioMotion(document.querySelector("#test-root")!);
    expect(ScrollTrigger.getById("project-reel")).toBeUndefined();
    expect(document.querySelector("[data-reel]")).toBeNull();
    expect(document.querySelector("[aria-hidden=true]")).toBeNull();
  });
});

