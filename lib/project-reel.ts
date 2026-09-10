import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function setupProjectReel(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>("[data-project-stage]");
  const track = stage?.querySelector<HTMLElement>("[data-project-track]");
  if (!stage || !track) return;
  const panels = [...track.querySelectorAll<HTMLElement>("[data-project-item]")];
  const buttons = [...stage.querySelectorAll<HTMLButtonElement>("[data-chapter-button]")];
  if (panels.length < 2) return;

  stage.dataset.reel = "true";
  let current = -1;
  const selectChapter = (index: number) => {
    if (index === current) return;
    current = index;
    panels.forEach((panel, i) => {
      const active = i === index;
      panel.dataset.active = String(active);
      // Off-stage links must not receive focus and move the clipped viewport.
      panel.inert = !active;
      if (active) panel.removeAttribute("aria-hidden");
      else panel.setAttribute("aria-hidden", "true");
    });
    buttons.forEach((button, i) => {
      if (i === index) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
  };
  selectChapter(0);

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "project-reel", trigger: stage, pin: stage, start: "top top",
      end: () => `+=${(panels.length - 1) * window.innerHeight}`,
      scrub: 0.4, invalidateOnRefresh: true, anticipatePin: 1,
      onToggle: trigger => { stage.dataset.reelActive = String(trigger.isActive); },
    },
    onUpdate() { selectChapter(Math.round(this.progress() * (panels.length - 1))); },
  });
  timeline.to(track, {
    x: () => -(track.scrollWidth - stage.clientWidth),
    duration: panels.length - 1, ease: "none",
  });

  const navigate = (event: Event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>("[data-chapter-button]");
    const trigger = timeline.scrollTrigger;
    if (!button || !trigger) return;
    const index = Number(button.dataset.chapterButton);
    window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * index / (panels.length - 1), behavior: "smooth" });
  };
  stage.addEventListener("click", navigate);

  return () => {
    stage.removeEventListener("click", navigate);
    timeline.scrollTrigger?.kill();
    timeline.revert();
    delete stage.dataset.reel;
    delete stage.dataset.reelActive;
    panels.forEach(panel => { panel.inert = false; panel.removeAttribute("inert"); panel.removeAttribute("aria-hidden"); delete panel.dataset.active; });
    buttons.forEach(button => button.removeAttribute("aria-current"));
  };
}
