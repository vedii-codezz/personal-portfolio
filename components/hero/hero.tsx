"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";

export function Hero() {
  const { hero } = portfolio;
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");

    const heroEl = heroRef.current;
    if (!heroEl) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId: number | null = null;
    let running = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = relX * 10; // Max ±5px
      targetY = relY * 10;
    };

    const animate = () => {
      if (!running) return;
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate3d(${-currentX * 0.6}px, ${-currentY * 0.6}px, 0)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${currentX * 0.3}px, ${currentY * 0.3}px, 0)`;
      }
      if (shadowRef.current) {
        // Shadow moves at ~25% of portrait parallax in opposite direction
        shadowRef.current.style.transform = `translate3d(${currentX * 0.15}px, ${currentY * 0.15}px, 0)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    const stop = () => {
      running = false;
      heroEl.removeEventListener("mousemove", onMouseMove);
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
      targetX = targetY = currentX = currentY = 0;
      for (const ref of [portraitRef, textRef, shadowRef]) {
        ref.current?.style.removeProperty("transform");
      }
    };

    const syncMotion = () => {
      if (reducedMotion.matches || !desktop.matches) {
        stop();
      } else if (!running) {
        running = true;
        heroEl.addEventListener("mousemove", onMouseMove, { passive: true });
        frameId = requestAnimationFrame(animate);
      }
    };
    reducedMotion.addEventListener("change", syncMotion);
    desktop.addEventListener("change", syncMotion);
    syncMotion();

    return () => {
      stop();
      reducedMotion.removeEventListener("change", syncMotion);
      desktop.removeEventListener("change", syncMotion);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero site-gutter min-h-[calc(100svh-120px)] flex flex-col justify-between pt-6 pb-12 overflow-hidden relative"
      aria-labelledby="hero-title"
      data-hero
    >
      {/* Atmospheric Light Field: Implied source upper-right/behind portrait with subtle leftward falloff */}
      <div
        className="hero-light-field absolute inset-0 pointer-events-none z-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle horizontal gradient: darker falloff toward the left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-[#F3F3EF]/[0.025]" />

        {/* Soft radial light bloom positioned behind / upper-right of portrait */}
        <div
          className="absolute right-0 sm:right-[6%] lg:right-[10%] top-[14%] sm:top-[18%] w-[65vw] sm:w-[44vw] lg:w-[32vw] aspect-square rounded-full pointer-events-none blur-3xl opacity-75"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(243, 243, 239, 0.11) 0%, rgba(243, 243, 239, 0.035) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* 1. Restrained Top Masthead: Single clear label */}
      <div className="hero-meta relative z-20 flex justify-between items-baseline border-b border-line pb-4" data-hero-meta>
        <span className="font-mono text-xs uppercase tracking-widest text-secondary">
          {hero.masthead}
        </span>
        <a
          href="#work"
          className="font-mono text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors inline-flex items-center gap-2"
        >
          <span>{hero.workLabel}</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      {/* 2. Central Poster Composition: Massive Typography Integrated with Portrait & Light/Shadow */}
      <div className="hero-poster relative my-auto py-8 sm:py-12 flex flex-col justify-center">
        {/* Projected Typography Shadow: Extending toward the LEFT */}
        <div
          ref={shadowRef}
          className="hero-shadow-layer absolute inset-0 z-[5] pointer-events-none select-none will-change-transform hidden md:block"
          aria-hidden="true"
        >
          <div
            className="hero-projected-shadow font-sans font-medium text-[14vw] sm:text-[12.5vw] lg:text-[11vw] leading-[0.88] tracking-tighter text-[#F3F3EF] opacity-[0.08] lg:opacity-[0.11] origin-bottom-right"
            style={{
              transform:
                "translate3d(-14vw, 1.2vw, 0) scale(1.18, 0.96) skewX(-14deg) skewY(2deg)",
              filter: "blur(7px)",
              WebkitFilter: "blur(7px)",
            }}
          >
            <span className="block">BEDANTIKA</span>
            <span className="block ml-[4vw] lg:ml-[6vw]">MONDAL</span>
          </div>
        </div>

        {/* Integrated Portrait: positioned naturally within typographic flow with rim light */}
        <div
          ref={portraitRef}
          className="portrait-mask absolute right-4 sm:right-12 lg:right-24 top-1/2 -translate-y-1/2 w-[42vw] sm:w-[32vw] lg:w-[24vw] max-w-[340px] aspect-[2/3] z-10 will-change-transform rounded overflow-hidden border border-line"
          data-portrait-mask
        >
          {/* Subtle rim light along the illuminated upper-right edge */}
          <div
            className="absolute inset-0 pointer-events-none z-20 rounded border border-t-[rgba(243,243,239,0.22)] border-r-[rgba(243,243,239,0.18)] border-b-transparent border-l-transparent"
            style={{
              boxShadow:
                "inset -1px 1px 12px -2px rgba(243, 243, 239, 0.10), 0 0 30px -6px rgba(243, 243, 239, 0.08)",
            }}
            aria-hidden="true"
          />
          <Image
            {...hero.portrait}
            preload
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 32vw, 24vw"
            className="hero-portrait w-full h-full object-cover grayscale"
          />
        </div>

        {/* Monumental Headline: Bedantika Mondal */}
        <h1
          ref={textRef}
          id="hero-title"
          className="hero-title relative z-20 font-sans font-medium text-[14vw] sm:text-[12.5vw] lg:text-[11vw] leading-[0.88] tracking-tighter pointer-events-none select-none"
        >
          <span className="hero-line block overflow-clip">
            <span data-hero-line className="block">BEDANTIKA</span>
          </span>
          <span className="hero-line block overflow-clip ml-[8vw] sm:ml-[14vw]">
            <span data-hero-line className="block">MONDAL</span>
          </span>
        </h1>
      </div>

      {/* 3. Bottom Identity & Supporting Statement */}
      <div className="hero-footer relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-line pt-6" data-hero-meta>
        <div className="font-mono text-xs tracking-widest uppercase text-secondary">
          {hero.identityLine}
        </div>
        <p className="font-sans text-sm sm:text-base text-secondary max-w-md leading-snug">
          {hero.statement.join(" ")}
        </p>
      </div>
    </section>
  );
}
