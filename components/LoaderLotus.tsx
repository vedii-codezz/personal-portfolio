"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { LoaderPetals, lotusPetals } from "./LoaderPetals";
import { completeLotus, lockPortfolio, shouldPlayLotus } from "./lotus-lifecycle";
import { heroEntrance } from "./hero-entrance";
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
          const radius = Math.hypot(window.innerWidth, window.innerHeight) * .8;
          petals.forEach((petal, i) => {
            const angle = (i / petals.length) * Math.PI * 2;
            const at = 2.3 + (i % 3) * .035;
            const foreground = i % 5 === 0;
            const bend = angle + (i % 2 === 0 ? .12 : -.12);
            timeline.to(petal, { scaleX: 2.1, scaleY: 2.1, rotationX: 0, duration: .25, ease: "power2.in" }, at)
              .to(petal, { x: Math.sin(angle) * radius * .24, y: Math.cos(angle) * radius * .24,
                rotation: angle * 180 / Math.PI + 12, rotationY: foreground ? -12 : 10,
                scaleX: foreground ? 2.9 : 2.1, scaleY: foreground ? 2.9 : 2.1,
                duration: .36, ease: "sine.in" }, at + .12)
              .to(petal, { x: Math.sin(bend) * radius * 1.2, y: Math.cos(bend) * radius * 1.2,
                rotation: angle * 180 / Math.PI + (i % 2 === 0 ? 32 : -24), rotationY: foreground ? -22 : 18,
                scaleX: foreground ? 4.4 : 2.9, scaleY: foreground ? 4.4 : 2.9,
                duration: .6, ease: "power2.inOut" }, at + .48)
              .to(petal, { opacity: 0, duration: .32, ease: "sine.in" }, at + .85);
          });
          timeline.call(reveal, [], 2.48)
            .to("[data-loader-backdrop]", { opacity: 0, duration: .46, ease: "sine.inOut" }, 2.4)
            .to(content, { opacity: 1, duration: .5, ease: "sine.inOut" }, 2.48)
            .to("[data-loader-veil]", { opacity: 0, duration: .58, ease: "sine.inOut" }, 2.48)
            .add(heroEntrance(content, false), 2.52)
            .to(overlay, { opacity: 0, duration: .16 }, 3.47);
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
  </div>;
}
