// @vitest-environment jsdom
import { act, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Hero } from "@/components/hero/hero";
import { KineticSkillsMarquee } from "@/components/tech-stack/kinetic-skills-marquee";
import { Lab } from "@/components/lab/lab";

let root: Root;
let container: HTMLDivElement;
let reduced: boolean;
let desktop: boolean;
let frames: Map<number, FrameRequestCallback>;
let frameId: number;
let visibility: IntersectionObserverCallback;
let observerDisconnect = vi.fn<() => void>();
let queries: Map<string, { matches: boolean; listeners: Set<() => void> }>;

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  reduced = false;
  desktop = true;
  queries = new Map();
  frames = new Map();
  frameId = 0;
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    const id = ++frameId;
    frames.set(id, callback);
    return id;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  vi.stubGlobal("matchMedia", (query: string) => {
    const state = queries.get(query) ?? { matches: query.includes("reduce") ? reduced : desktop, listeners: new Set<() => void>() };
    queries.set(query, state);
    return {
      get matches() { return state.matches; },
      addEventListener: (_event: string, callback: () => void) => state.listeners.add(callback),
      removeEventListener: (_event: string, callback: () => void) => state.listeners.delete(callback),
    };
  });
  observerDisconnect = vi.fn<() => void>();
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { visibility = callback; }
    observe() {}
    disconnect() { observerDisconnect(); }
  });
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  expect(frames.size).toBe(0);
  expect([...queries.values()].every(q => q.listeners.size === 0)).toBe(true);
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

function preference(value: boolean, query = "(prefers-reduced-motion: reduce)") {
  const state = queries.get(query)!;
  act(() => { state.matches = value; state.listeners.forEach(fn => fn()); });
}
function intersect(ratio: number) {
  act(() => visibility([{ intersectionRatio: ratio, isIntersecting: ratio > 0 } as IntersectionObserverEntry], {} as IntersectionObserver));
}
function frame() {
  const pending = [...frames];
  frames.clear();
  act(() => pending.forEach(([, callback]) => callback(16)));
}

describe("M9.1C live motion preferences", () => {
  it.each([false, true])("Hero responds to preferences and breakpoints without duplicate loops (initial reduce=%s)", initial => {
    reduced = initial;
    act(() => root.render(<StrictMode><Hero /></StrictMode>));
    expect(frames.size).toBe(initial ? 0 : 1);
    preference(false);
    expect(frames.size).toBe(1);
    frame();
    expect(frames.size).toBe(1);
    preference(true);
    expect(frames.size).toBe(0);
    expect(container.querySelector<HTMLElement>("[data-portrait-mask]")!.style.transform).toBe("");
    act(() => container.querySelector("[data-hero]")!.dispatchEvent(new MouseEvent("mousemove", { bubbles: true })));
    expect(frames.size).toBe(0);
    preference(false);
    preference(false);
    expect(frames.size).toBe(1);
    preference(false, "(min-width: 1024px)");
    expect(frames.size).toBe(0);
    preference(true, "(min-width: 1024px)");
    expect(frames.size).toBe(1);
  });

  it.each([false, true])("marquee keeps visibility gating, delay, pause/resume and live preference safety (initial reduce=%s)", initial => {
    reduced = initial;
    act(() => root.render(<StrictMode><section><KineticSkillsMarquee primarySkills={["PYTHON", "NUMPY"]} secondaryStatus={[{name:"JAVA",status:"LEARNING"}]} /></section></StrictMode>));
    const tracks = [...container.querySelectorAll<HTMLElement>(".marquee-track")];
    tracks.forEach(track => Object.defineProperty(track, "scrollWidth", { value: 1200 }));
    expect(frames.size).toBe(0);
    intersect(0.35);
    if (initial) {
      act(() => vi.advanceTimersByTime(1000));
      expect(frames.size).toBe(0);
      preference(false);
    }
    act(() => vi.advanceTimersByTime(449));
    expect(frames.size).toBe(0);
    act(() => vi.advanceTimersByTime(1));
    expect(frames.size).toBe(1);
    frame();
    const position = tracks[0].style.transform;
    intersect(0);
    expect(frames.size).toBe(0);
    intersect(0.35);
    expect(frames.size).toBe(1);
    expect(tracks[0].style.transform).toBe(position);
    preference(true);
    expect(frames.size).toBe(0);
    expect(tracks.every(track => track.style.transform === "none")).toBe(true);
    intersect(0);
    intersect(0.5);
    act(() => { window.dispatchEvent(new Event("scroll")); vi.advanceTimersByTime(1000); });
    expect(frames.size).toBe(0);
    preference(false);
    preference(false);
    expect(frames.size).toBe(1);
    frame();
    expect(frames.size).toBe(1);
  });

  it("cancels pending activation and still honors live preferences without IntersectionObserver", () => {
    act(() => root.render(<KineticSkillsMarquee primarySkills={["PYTHON"]} secondaryStatus={[]} />));
    intersect(0.4);
    preference(true);
    act(() => vi.advanceTimersByTime(450));
    expect(frames.size).toBe(0);
    act(() => root.unmount());
    expect(observerDisconnect).toHaveBeenCalled();
    vi.stubGlobal("IntersectionObserver", undefined);
    // Remove the property to exercise the feature-detection fallback.
    Reflect.deleteProperty(window, "IntersectionObserver");
    root = createRoot(container);
    act(() => root.render(<KineticSkillsMarquee primarySkills={["PYTHON"]} secondaryStatus={[]} />));
    expect(frames.size).toBe(0);
    preference(false);
    expect(frames.size).toBe(1);
    preference(true);
    expect(frames.size).toBe(0);
  });

  it("marquee derives visible status, supports manual pause/resume, survives re-entry, and reduced motion takes precedence", () => {
    act(() => root.render(<StrictMode><section><KineticSkillsMarquee primarySkills={["PYTHON"]} secondaryStatus={[{ name: "JAVA", status: "LEARNING" }, { name: "DATA SCIENCE", status: "IN PROGRESS" }]} /></section></StrictMode>));
    expect(container.textContent).toContain("CURRENTLY LEARNING // JAVA / DATA SCIENCE");

    const button = container.querySelector<HTMLButtonElement>("button[aria-label*='skills marquee motion']")!;
    expect(button).not.toBeNull();
    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(button.textContent).toContain("MOTION");
    expect(button.textContent).toContain("●");

    // Activate marquee via intersection + delay
    intersect(0.35);
    act(() => vi.advanceTimersByTime(450));
    expect(frames.size).toBe(1);

    // Click pause button
    act(() => button.click());
    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(button.textContent).toContain("○");
    expect(frames.size).toBe(0);

    // Scroll while paused should not trigger frames
    act(() => window.dispatchEvent(new Event("scroll")));
    expect(frames.size).toBe(0);

    // Offscreen and re-entry should maintain manual pause
    intersect(0);
    expect(frames.size).toBe(0);
    intersect(0.35);
    act(() => vi.advanceTimersByTime(1000));
    expect(frames.size).toBe(0);

    // Resume motion
    act(() => button.click());
    expect(button.getAttribute("aria-pressed")).toBe("false");
    expect(button.textContent).toContain("●");
    expect(frames.size).toBe(1);

    // Repeated toggles do not create duplicate rAF loops
    act(() => button.click()); // pause
    expect(frames.size).toBe(0);
    act(() => button.click()); // resume
    expect(frames.size).toBe(1);

    // Reduced motion overrides manual state
    preference(true);
    expect(frames.size).toBe(0);
    act(() => button.click()); // attempt resume under reduced-motion
    expect(frames.size).toBe(0);
  });

  it("Lab keyboard focus immediately selects experiment, while pointer hover uses intent delay", () => {
    act(() => root.render(<StrictMode><Lab /></StrictMode>));
    const controls = [...container.querySelectorAll<HTMLButtonElement>("[id^='lab-control-']")];
    expect(controls.length).toBeGreaterThan(1);
    expect(controls[0].getAttribute("aria-pressed")).toBe("true");

    // Keyboard focus: immediate selection
    act(() => controls[1].focus());
    expect(controls[1].getAttribute("aria-pressed")).toBe("true");
    expect(controls[0].getAttribute("aria-pressed")).toBe("false");

    // Mouse hover: delayed selection
    act(() => controls[0].dispatchEvent(new MouseEvent("mouseover", { bubbles: true })));
    expect(controls[0].getAttribute("aria-pressed")).toBe("false");
    act(() => vi.advanceTimersByTime(60));
    expect(controls[0].getAttribute("aria-pressed")).toBe("false");
    act(() => vi.advanceTimersByTime(65));
    expect(controls[0].getAttribute("aria-pressed")).toBe("true");

    // Rapid mouse transit: leave before delay cancels activation
    act(() => controls[1].dispatchEvent(new MouseEvent("mouseover", { bubbles: true })));
    act(() => vi.advanceTimersByTime(50));
    act(() => controls[1].dispatchEvent(new MouseEvent("mouseout", { bubbles: true })));
    act(() => vi.advanceTimersByTime(100));
    expect(controls[1].getAttribute("aria-pressed")).toBe("false");
  });
});
