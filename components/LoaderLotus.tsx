"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LoaderPetals, lotusPetals } from "./LoaderPetals";
import { completeLotus, lockPortfolio, shouldPlayLotus } from "./lotus-lifecycle";
import { heroEntrance } from "./hero-entrance";
import { FloralCoverage } from "./FloralCoverage";
import { floralCoverage, floralPose } from "./floral-coverage";
import { observeLoaderViewport, readLoaderViewport } from "./loader-viewport";
import "./loader-lotus.css";

export function LoaderLotus() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [finished, setFinished] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const restore = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      delete document.documentElement.dataset.lotusRecovery;
      document.documentElement.dataset.lotusLoading = "pending";
      setFinished(false);
      setCycle(value => value + 1);
    };
    window.addEventListener("pageshow", restore);
    return () => window.removeEventListener("pageshow", restore);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = document.getElementById("portfolio-content");
    const root = document.documentElement;
    if (!overlay || !content) return;
    let disposed = false;
    let completed = false;
    let context: gsap.Context | undefined;
    let stopViewport = () => {};
    let viewport = readLoaderViewport(window);
    let renderGeometry = () => {};
    const release = lockPortfolio(content);
    const finish = () => {
      if (disposed || completed) return;
      completed = true;
      context?.revert();
      context = undefined;
      release();
      teardown();
      completeLotus();
      setFinished(true);
    };
    const reveal = () => {
      root.dataset.lotusLoading = "revealing";
      window.dispatchEvent(new Event("portfolio:reveal"));
    };
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const started = Date.now();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); };
    const onVisibility = () => { if (!document.hidden && Date.now() - started > 3900) finish(); };
    window.addEventListener("portfolio:ready", finish);
    window.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVisibility);
    media.addEventListener("change", finish);
    const safety = window.setTimeout(finish, 4200);
    let skippedFrame = 0;
    const teardown = () => {
      window.clearTimeout(safety);
      stopViewport();
      ["--loader-width", "--loader-height", "--loader-left", "--loader-top"].forEach(property => overlay.style.removeProperty(property));
      cancelAnimationFrame(skippedFrame);
      window.removeEventListener("portfolio:ready", finish);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener("change", finish);
    };

    if (!shouldPlayLotus() || root.dataset.lotusLoading !== "pending") {
      skippedFrame = requestAnimationFrame(finish);
    } else {
      // A fresh root-page intro reveals the hero, even if the browser restored
      // the previous document's scroll offset. Explicit section links retain intent.
      if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      try {
        context = gsap.context(() => {
          stopViewport = observeLoaderViewport(window, next => {
            viewport = next;
            overlay.style.setProperty("--loader-width", `${next.width}px`);
            overlay.style.setProperty("--loader-height", `${next.height}px`);
            overlay.style.setProperty("--loader-left", `${next.left}px`);
            overlay.style.setProperty("--loader-top", `${next.top}px`);
            renderGeometry();
          });
          const petals = gsap.utils.toArray<HTMLElement>("[data-lotus-petal]", overlay);
          gsap.set(content, { opacity: 0 });
          gsap.set(petals, { xPercent: -50, yPercent: -100, transformOrigin: "50% 97%" });
          const timeline = gsap.timeline({ onComplete: finish });

          if (media.matches) {
            petals.forEach((petal, i) => gsap.set(petal, { rotation: lotusPetals[i].angle, rotationX: lotusPetals[i].tilt, scale: lotusPetals[i].size }));
            timeline.to("[data-loader-lotus]", { opacity: 1, duration: .15 })
              .call(reveal, [], .18)
              .to("[data-loader-backdrop]", { opacity: 0, duration: .3 }, .18)
              .to("[data-loader-veil]", { opacity: 0, duration: .3 }, .18)
              .to(content, { opacity: 1, duration: .3 }, .18)
              .to(overlay, { opacity: 0, duration: .2 }, .3);
            return;
          }

          petals.forEach((petal, i) => gsap.set(petal, {
            rotation: lotusPetals[i].angle * .13,
            rotationX: 7,
            scaleX: .48 * lotusPetals[i].size,
            scaleY: .83 * lotusPetals[i].size,
          }));
          timeline.to("[data-loader-lotus]", { opacity: 1, y: -3, duration: .65, ease: "sine.out" }, 0)
            .to("[data-lotus-aura]", { opacity: .75, scale: 1.15, duration: 1.5, ease: "sine.inOut" }, .3);
          petals.forEach((petal, i) => {
            const shape = lotusPetals[i];
            timeline.to(petal, {
              rotation: shape.angle, rotationX: shape.tilt,
              scaleX: shape.size, scaleY: shape.size,
              duration: 1.25, ease: "sine.inOut",
            }, .35 + Math.floor(i / 7) * .12 + Math.abs(shape.angle) * .0015);
          });
          timeline.to("[data-loader-lotus]", { scale: 1.13, y: -9, duration: .65, ease: "sine.inOut" }, 1.65)
            .to("[data-lotus-heart]", { opacity: .8, scale: 1.2, duration: .6 }, 1.5)
            .to("[data-lotus-aura], [data-lotus-heart]", { opacity: 0, duration: .32 }, 2.28);

          // Ordered curved trajectories and a few foreground petals create depth.
          const panels = Array.from(overlay.querySelectorAll<HTMLElement>("[data-floral-panel]"));
          let dimensions = floralCoverage(viewport.width, viewport.height);
          let radius = Math.hypot(viewport.width, viewport.height) * .8;
          const coverage = panels.map(() => ({ expansion: .015, exit: 0 }));
          const foregroundMotion = petals.map(() => ({ x: 0, y: 0 }));
          const setters = panels.map(panel => ({ x: gsap.quickSetter(panel, "x", "px"), y: gsap.quickSetter(panel, "y", "px"), scaleX: gsap.quickSetter(panel, "scaleX"), scaleY: gsap.quickSetter(panel, "scaleY"), rotation: gsap.quickSetter(panel, "rotation", "deg") }));
          const foregroundSetters = petals.map(petal => ({ x: gsap.quickSetter(petal, "x", "px"), y: gsap.quickSetter(petal, "y", "px") }));
          const renderPanel = (i: number) => {
            const pose = floralPose(dimensions, i, coverage[i].expansion, coverage[i].exit);
            setters[i].x(pose.x); setters[i].y(pose.y); setters[i].scaleX(pose.scale); setters[i].scaleY(pose.scale); setters[i].rotation(pose.rotation);
          };
          const renderForeground = (i: number) => {
            foregroundSetters[i].x(foregroundMotion[i].x * radius);
            foregroundSetters[i].y(foregroundMotion[i].y * radius);
          };
          renderGeometry = () => {
            dimensions = floralCoverage(viewport.width, viewport.height);
            radius = Math.hypot(viewport.width, viewport.height) * .8;
            panels.forEach((panel, i) => {
              gsap.set(panel, { width: dimensions.radius * 3, height: dimensions.radius * 2.4, xPercent: -50, yPercent: -87.5, transformOrigin: "50% 87.5%" });
              renderPanel(i);
            });
            petals.forEach((_, i) => renderForeground(i));
          };
          renderGeometry();
          gsap.set(panels, { opacity: 0 });
          panels.forEach((panel, i) => {
            timeline.to(panel, { opacity: 1, duration: .14 }, 2.1 + (i % 2) * .015)
              .to(coverage[i], { expansion: 1, duration: .42, ease: "power2.inOut", onUpdate: () => renderPanel(i) }, 2.1 + (i % 3) * .018)
              .to(coverage[i], { exit: 1, duration: .76, ease: i % 2 ? "power2.inOut" : "power3.inOut", onUpdate: () => renderPanel(i) }, 2.7 + (i % 3) * .025)
              .to(panel, { opacity: 0, duration: .16 }, 3.35 + (i % 3) * .025);
          });
          petals.forEach((petal, i) => {
            const angle = (i / petals.length) * Math.PI * 2;
            const at = 2.3 + (i % 3) * .035;
            const foreground = i % 5 === 0;
            const bend = angle + (i % 2 === 0 ? .12 : -.12);
            timeline.to(petal, { scaleX: 2.1, scaleY: 2.1, rotationX: 0, duration: .25, ease: "power2.in" }, at)
              .to(petal, { rotation: angle * 180 / Math.PI + 12, rotationY: foreground ? -12 : 10,
                scaleX: foreground ? 2.9 : 2.1, scaleY: foreground ? 2.9 : 2.1,
                duration: .36, ease: "sine.in" }, at + .12)
              .to(petal, { rotation: angle * 180 / Math.PI + (i % 2 === 0 ? 32 : -24), rotationY: foreground ? -22 : 18,
                scaleX: foreground ? 4.4 : 2.9, scaleY: foreground ? 4.4 : 2.9,
                duration: .6, ease: "power2.inOut" }, at + .48)
              .to(petal, { opacity: 0, duration: .32, ease: "sine.in" }, at + .85);
            timeline.to(foregroundMotion[i], { x: Math.sin(angle) * .24, y: Math.cos(angle) * .24, duration: .36, ease: "sine.in", onUpdate: () => renderForeground(i) }, at + .12)
              .to(foregroundMotion[i], { x: Math.sin(bend) * 1.2, y: Math.cos(bend) * 1.2, duration: .6, ease: "power2.inOut", onUpdate: () => renderForeground(i) }, at + .48);
          });
          timeline.call(reveal, [], 2.64)
            .to("[data-loader-backdrop]", { opacity: 0, duration: .25, ease: "sine.inOut" }, 2.6)
            .to(content, { opacity: 1, duration: .3, ease: "sine.inOut" }, 2.64)
            .to("[data-loader-veil]", { opacity: 0, duration: .3, ease: "sine.inOut" }, 2.64)
            .add(heroEntrance(content, false).timeScale(1.25), 2.92)
            .to(overlay, { opacity: 0, duration: .14 }, 3.57);
        }, overlay);
      } catch {
        // Content takes priority if animation setup fails.
        skippedFrame = requestAnimationFrame(finish);
      }
    }

    return () => {
      disposed = true;
      teardown();
      context?.revert();
      release();
    };
  }, [cycle]);

  if (finished) return null;
  return <div ref={overlayRef} className="lotus-loader" aria-hidden="true">
    <div className="loader-theme-veil" data-loader-veil />
    <div className="loader-backdrop" data-loader-backdrop />
    <LoaderPetals />
    <FloralCoverage />
  </div>;
}
