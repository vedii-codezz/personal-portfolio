import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function setupCaseStudyMotion(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const context = gsap.context(() => {
    // 1. Reduced-motion fallback & standard non-pinned animations
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const select = gsap.utils.selector(root);
      const hero = root.querySelector<HTMLElement>("[data-case-hero]");

      // Immediate hero reveal if near top
      if (hero && window.scrollY < hero.offsetHeight / 2) {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(select("[data-case-nav]"), { y: -12, opacity: 0, duration: 0.5 })
          .from(select("[data-hero-headline]"), { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.05)
          .from(select("[data-hero-meta-row]"), { y: 12, opacity: 0, duration: 0.6, stagger: 0.05 }, 0.25);
      }

      // Editorial section reveals: 1 ScrollTrigger per section group, once: true
      const sectionSelectors = [
        { trigger: "[data-tension]", targets: "[data-tension-reveal]" },
        { trigger: "[data-boundary]", targets: "[data-boundary-reveal]" },
        { trigger: "[data-theatre-section]", targets: "[data-theatre-reveal]" },
        { trigger: "[data-judge-section]", targets: "[data-judge-reveal]" },
        { trigger: "[data-trace-section]", targets: "[data-trace-reveal]" },
        { trigger: "[data-engineering]", targets: "[data-engineering-reveal]" },
        { trigger: "[data-role]", targets: "[data-role-reveal]" },
        { trigger: "[data-retrospective]", targets: "[data-retrospective-reveal]" },
        { trigger: "[data-aptly-intro]", targets: "[data-aptly-intro-reveal]" },
        { trigger: "[data-aptly-engine]", targets: "[data-aptly-engine-reveal]" },
        { trigger: "[data-aptly-ats]", targets: "[data-aptly-ats-reveal]" },
        { trigger: "[data-aptly-closing]", targets: "[data-aptly-closing-reveal]" },
        { trigger: "[data-veyra-intro]", targets: "[data-veyra-intro-reveal]" },
        { trigger: "[data-veyra-systems]", targets: "[data-veyra-systems-reveal]" },
        { trigger: "[data-veyra-engineering]", targets: "[data-veyra-engineering-reveal]" },
        { trigger: "[data-nikot-intro]", targets: "[data-nikot-intro-reveal]" },
        { trigger: "[data-nikot-systems]", targets: "[data-nikot-systems-reveal]" },
        { trigger: "[data-nikot-engineering]", targets: "[data-nikot-engineering-reveal]" },
        { trigger: "[data-next-project]", targets: "[data-next-reveal]" },
      ];

      sectionSelectors.forEach(({ trigger, targets }) => {
        const triggerEl = root.querySelector<HTMLElement>(trigger);
        if (!triggerEl) return;
        const items = triggerEl.querySelectorAll<HTMLElement>(targets);
        if (items.length === 0) return;
        gsap.from(items, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: triggerEl,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, root);

    // 2. PRIMARY SIGNATURE MOMENT: System Topography master pinned timeline (Desktop >= 1024px only)
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const stage = root.querySelector<HTMLElement>("[data-topography-stage]");
      const pinContainer = root.querySelector<HTMLElement>("[data-topography-pin]");
      if (!stage || !pinContainer) return;

      const nodes = stage.querySelectorAll<HTMLElement>("[data-topo-stage-card]");
      const bypassIndicator = stage.querySelector<HTMLElement>("[data-topo-bypass-path]");
      const routerIndicator = stage.querySelector<HTMLElement>("[data-topo-router-path]");
      const mathIndicator = stage.querySelector<HTMLElement>("[data-topo-math-indicator]");
      const revisionPath = stage.querySelector<HTMLElement>("[data-topo-revision-path]");

      const chips = stage.querySelectorAll<HTMLElement>("[data-topo-step-chip]");

      // Single master GSAP timeline scrubbed across scroll distance
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
        },
      });

      const hasChips = chips.length >= 5;

      // Sequence: High-contrast active index inversion (#f3f3ef bg, #050505 text)
      // Stage 1 (Router & Bypass)
      masterTl
        .to(nodes[0], { borderColor: "rgba(243, 243, 239, 0.95)", backgroundColor: "#111111", duration: 0.2 });
      if (hasChips) masterTl.to(chips[0], { backgroundColor: "#f3f3ef", color: "#050505", duration: 0.2 }, "<");
      if (routerIndicator) masterTl.to(routerIndicator, { opacity: 1, duration: 0.2 }, "<");
      if (bypassIndicator) masterTl.to(bypassIndicator, { opacity: 0.95, duration: 0.25 }, "-=0.1");

      // Stage 2: Orchestrator / Planner
      masterTl
        .to(nodes[0], { borderColor: "rgba(255, 255, 255, 0.14)", backgroundColor: "#0d0d0d", duration: 0.15 });
      if (hasChips) masterTl.to(chips[0], { backgroundColor: "transparent", color: "rgba(243, 243, 239, 0.6)", duration: 0.15 }, "<");
      masterTl.to(nodes[1], { borderColor: "rgba(243, 243, 239, 0.95)", backgroundColor: "#111111", duration: 0.2 });
      if (hasChips) masterTl.to(chips[1], { backgroundColor: "#f3f3ef", color: "#050505", duration: 0.2 }, "<");

      // Stage 3: Specialist Agents & Math Engine
      masterTl
        .to(nodes[1], { borderColor: "rgba(255, 255, 255, 0.14)", backgroundColor: "#0d0d0d", duration: 0.15 });
      if (hasChips) masterTl.to(chips[1], { backgroundColor: "transparent", color: "rgba(243, 243, 239, 0.6)", duration: 0.15 }, "<");
      masterTl.to(nodes[2], { borderColor: "rgba(243, 243, 239, 0.95)", backgroundColor: "#111111", duration: 0.25 });
      if (hasChips) masterTl.to(chips[2], { backgroundColor: "#f3f3ef", color: "#050505", duration: 0.2 }, "<");
      if (mathIndicator) masterTl.to(mathIndicator, { opacity: 1, scale: 1.02, duration: 0.2 }, "<");

      // Stage 4: Two-Axis Judge & Revision path
      masterTl
        .to(nodes[2], { borderColor: "rgba(255, 255, 255, 0.14)", backgroundColor: "#0d0d0d", duration: 0.15 });
      if (hasChips) masterTl.to(chips[2], { backgroundColor: "transparent", color: "rgba(243, 243, 239, 0.6)", duration: 0.15 }, "<");
      masterTl.to(nodes[3], { borderColor: "rgba(243, 243, 239, 0.95)", backgroundColor: "#111111", duration: 0.25 });
      if (hasChips) masterTl.to(chips[3], { backgroundColor: "#f3f3ef", color: "#050505", duration: 0.2 }, "<");
      if (revisionPath) masterTl.to(revisionPath, { opacity: 1, duration: 0.2 }, "<");

      // Stage 5: Synthesis & Trace
      masterTl
        .to(nodes[3], { borderColor: "rgba(255, 255, 255, 0.14)", backgroundColor: "#0d0d0d", duration: 0.15 });
      if (hasChips) masterTl.to(chips[3], { backgroundColor: "transparent", color: "rgba(243, 243, 239, 0.6)", duration: 0.15 }, "<");
      masterTl.to(nodes[4], { borderColor: "rgba(243, 243, 239, 0.95)", backgroundColor: "#111111", duration: 0.2 });
      if (hasChips) masterTl.to(chips[4], { backgroundColor: "#f3f3ef", color: "#050505", duration: 0.2 }, "<");
    }, root);
  }, root);

  return () => {
    media.revert();
    context.revert();
  };
}
