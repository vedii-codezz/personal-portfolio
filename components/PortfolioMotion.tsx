"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PortfolioMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-headline]", { yPercent: 110, rotate: 3, duration: 1.2, stagger: 0.14, ease: "power3.out", clearProps: "all" });
      gsap.from("[data-hero-reveal]", { y: 22, opacity: 0, duration: 0.9, stagger: 0.15, delay: 0.2, clearProps: "all" });
      gsap.from("[data-portrait]", { scale: 0.94, clipPath: "inset(8% 0% 0% 0%)", duration: 1.5, ease: "power3.out", clearProps: "all" });
      gsap.from("[data-play-reveal]", { y: 28, opacity: 0, stagger: 0.16, duration: 0.8, clearProps: "all", scrollTrigger: { trigger: ".playground-heading", start: "top 90%", once: true } });
      gsap.from(".pengu-doodle", { scale: 0.5, opacity: 0, stagger: 0.2, duration: 0.7, ease: "back.out(1.8)", clearProps: "all", scrollTrigger: { trigger: ".pengu-stage", start: "top 80%", once: true } });
      const float = gsap.to(".pengu-float", { y: -12, rotation: 2, duration: 2.2, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true });
      ScrollTrigger.create({ trigger: ".pengu-stage", start: "top bottom", end: "bottom top", onToggle: self => { if (self.isActive) float.play(); else float.pause(); } });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(element => {
        gsap.from(element, { y: 32, opacity: 0, duration: 0.85, ease: "power2.out", clearProps: "all", scrollTrigger: { trigger: element, start: "top 92%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach(project => {
        gsap.from(project.querySelector(".project-visual"), { clipPath: "inset(5% 0% 5% 0%)", duration: 1.1, ease: "power2.out", clearProps: "all", scrollTrigger: { trigger: project, start: "top 88%", once: true } });
      });
    });
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const stage = document.querySelector<HTMLElement>(".pengu-stage");
      if (!stage) return;
      const x = gsap.quickTo(".pengu-character", "x", { duration: 0.65, ease: "power3.out" });
      const rotate = gsap.quickTo(".pengu-character", "rotation", { duration: 0.65, ease: "power3.out" });
      const move = (event: PointerEvent) => { const bounds = stage.getBoundingClientRect(); const offset = (event.clientX - bounds.left) / bounds.width - 0.5; x(offset * 24); rotate(offset * 8); };
      const reset = () => { x(0); rotate(0); };
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerleave", reset);
      return () => { stage.removeEventListener("pointermove", move); stage.removeEventListener("pointerleave", reset); };
    });
    media.add("(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(".portrait-image", { yPercent: 5, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
      const cleanups: (() => void)[] = [];
      gsap.utils.toArray<HTMLElement>(".project-visual").forEach(visual => {
        const artwork = visual.querySelector<HTMLElement>(".finora-study, .veyra-study, .aptly-study, .metro-study");
        if (!artwork) return;
        const x = gsap.quickTo(artwork, "x", { duration: 0.8, ease: "power3.out" });
        const y = gsap.quickTo(artwork, "y", { duration: 0.8, ease: "power3.out" });
        const move = (event: PointerEvent) => { const bounds = visual.getBoundingClientRect(); x((event.clientX - bounds.left - bounds.width/2) * 0.018); y((event.clientY - bounds.top - bounds.height/2) * 0.018); };
        const reset = () => { x(0); y(0); };
        visual.addEventListener("pointermove", move);
        visual.addEventListener("pointerleave", reset);
        cleanups.push(() => { visual.removeEventListener("pointermove", move); visual.removeEventListener("pointerleave", reset); });
      });
      return () => cleanups.forEach(cleanup => cleanup());
    });
    return () => media.revert();
  }, []);
  return null;
}
