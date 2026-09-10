"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";

export function Hero() {
  const { hero } = portfolio;
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Only apply subtle parallax on desktop without reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const heroEl = heroRef.current;
    if (!heroEl) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = relX * 10; // Max ±5px
      targetY = relY * 10;
    };

    heroEl.addEventListener("mousemove", onMouseMove, { passive: true });

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate3d(${-currentX * 0.6}px, ${-currentY * 0.6}px, 0)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${currentX * 0.3}px, ${currentY * 0.3}px, 0)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      heroEl.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero site-gutter min-h-[calc(100svh-120px)] flex flex-col justify-between pt-6 pb-12 overflow-hidden"
      aria-labelledby="hero-title"
      data-hero
    >
      {/* 1. Restrained Top Masthead: Single clear label */}
      <div className="hero-meta flex justify-between items-baseline border-b border-line pb-4" data-hero-meta>
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

      {/* 2. Central Poster Composition: Massive Typography Integrated with Portrait */}
      <div className="hero-poster relative my-auto py-8 sm:py-12 flex flex-col justify-center">
        {/* Integrated Portrait: positioned naturally within typographic flow */}
        <div
          ref={portraitRef}
          className="portrait-mask absolute right-4 sm:right-12 lg:right-24 top-1/2 -translate-y-1/2 w-[42vw] sm:w-[32vw] lg:w-[24vw] max-w-[340px] aspect-[2/3] z-10 will-change-transform rounded overflow-hidden border border-line"
          data-portrait-mask
        >
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
      <div className="hero-footer flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-line pt-6" data-hero-meta>
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
