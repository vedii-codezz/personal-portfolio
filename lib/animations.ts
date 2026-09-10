import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupProjectReel } from "./project-reel";

export function setupPortfolioMotion(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  const context = gsap.context(() => {
    // matchMedia reverts animations and triggers when preferences change.
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const select = gsap.utils.selector(root);
      const hero = root.querySelector<HTMLElement>("[data-hero]");

      // Do not replay the hero above the viewport on a direct anchor visit.
      if (hero && window.scrollY < hero.offsetHeight / 2) {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from(select("[data-nav]"), { y: -10, opacity: 0, duration: 0.5 })
          .from(select("[data-hero-line]"), { yPercent: 105, duration: 0.9, stagger: 0.1 }, 0.08)
          .from(select("[data-portrait-mask]"), { clipPath: "inset(100% 0% 0% 0%)", duration: 1.1, clearProps: "clipPath" }, 0.1)
          .from(select("[data-hero-meta]"), { y: 8, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.4);
      }

      // One trigger per section, never one trigger per row or letter.
      [
        { section: "[data-intro]", items: "[data-intro-reveal]" },
        { section: "[data-about]", items: "[data-about-reveal]" },
        { section: "[data-tech]", items: "[data-tech-reveal]" },
        { section: "[data-lab]", items: "[data-lab-reveal]" },
        { section: "[data-contact]", items: "[data-contact-reveal]" },
      ].forEach(({ section, items }) => {
        const element = root.querySelector<HTMLElement>(section);
        if (!element) return;
        const targets = element.querySelectorAll<HTMLElement>(items);
        if (targets.length === 0) return;
        gsap.from(targets, {
          y: 24, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
    }, root);
    media.add("(min-width: 768px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)", () => setupProjectReel(root), root);
    media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      const track = root.querySelector<HTMLElement>("[data-project-track]");
      if (!track) return;
      gsap.from(track, { y: 20, opacity: 0, duration: .6,
        scrollTrigger: { trigger: track, start: "top 92%", once: true },
      });
    }, root);
  }, root);

  return () => { media.revert(); context.revert(); };
}
