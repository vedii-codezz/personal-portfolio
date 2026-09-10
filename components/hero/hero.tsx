"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { portfolio } from "@/data/portfolio";

export function Hero() {
  const { hero, nameLines } = portfolio;
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
      targetX = relX * 12; // Max ±6px
      targetY = relY * 12;
    };

    heroEl.addEventListener("mousemove", onMouseMove, { passive: true });

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate3d(${-currentX * 0.7}px, ${-currentY * 0.7}px, 0)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${currentX * 0.4}px, ${currentY * 0.4}px, 0)`;
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
    <section ref={heroRef} className="hero site-gutter relative overflow-hidden pb-12" aria-labelledby="hero-title" data-hero>
      {/* Top Technical Metadata Row */}
      <div className="hero-meta metadata flex flex-wrap justify-between items-baseline gap-4 border-b border-line pb-4" data-hero-meta>
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
          <span className="text-primary font-medium">{hero.academic}</span>
          <span className="text-secondary/60">//</span>
          <span className="text-secondary">{hero.location}</span>
        </div>
        <div className="hero-roles flex items-center gap-4 sm:gap-6 text-secondary">
          {hero.roles.map((role) => (
            <span key={role} className="tracking-widest text-[11px] font-mono">{role}</span>
          ))}
        </div>
      </div>

      {/* Main Composition: Layered Portrait & Oversized Typography */}
      <div className="hero-composition relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex items-center mt-6">
        {/* Layer 1: Background Name Shadow Layer */}
        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none z-0 opacity-15 overflow-hidden" aria-hidden="true">
          <span className="font-sans font-black text-[15vw] leading-[0.85] tracking-tighter text-primary whitespace-nowrap">
            BEDANTIKA
          </span>
          <span className="font-sans font-black text-[15vw] leading-[0.85] tracking-tighter text-primary whitespace-nowrap ml-[12vw]">
            MONDAL
          </span>
        </div>

        {/* Layer 2: Masked Grayscale Portrait (Center-Right) */}
        <div
          ref={portraitRef}
          className="portrait-mask absolute right-0 top-1/2 -translate-y-1/2 w-[68vw] sm:w-[48vw] md:w-[42vw] lg:w-[34vw] aspect-[2/3] max-w-[460px] z-10 will-change-transform rounded overflow-hidden border border-line"
          data-portrait-mask
        >
          <Image
            {...hero.portrait}
            preload
            sizes="(max-width: 640px) 76vw, (max-width: 1000px) 48vw, 34vw"
            className="hero-portrait w-full h-full object-cover grayscale"
          />
          {/* Subtle architectural overlay inside portrait */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end font-mono text-[9px] text-primary/80 bg-canvas/80 backdrop-blur px-2.5 py-1 rounded border border-line" aria-hidden="true">
            <span>PORTRAIT // 01</span>
            <span>SYSTEM FOCUS</span>
          </div>
        </div>

        {/* Layer 3: Foreground Main Headline (Overlapping Portrait with Mix-Blend / High-Z) */}
        <h1
          ref={textRef}
          id="hero-title"
          className="hero-title relative z-20 font-sans font-medium text-[12vw] sm:text-[10vw] lg:text-[8.8vw] leading-[0.92] tracking-tighter pointer-events-none"
        >
          {nameLines.map((line, i) => (
            <span className={`hero-line block overflow-clip ${i === 1 ? "ml-[6vw] sm:ml-[8vw]" : ""}`} key={line}>
              <span data-hero-line className="block">{line}</span>
            </span>
          ))}
        </h1>

        {/* Floating Identity Annotation Badge */}
        <div className="absolute bottom-4 left-0 z-20 max-w-sm font-mono text-xs text-secondary space-y-3" data-hero-meta>
          <p className="leading-relaxed border-l-2 border-primary/40 pl-3">
            {hero.statement.join(" ")}
          </p>
          <div className="pt-2">
            <a
              href="#work"
              className="inline-flex items-center gap-3 text-primary text-xs uppercase tracking-widest hover:text-secondary transition-colors font-mono"
            >
              <span className="work-arrow text-sm" aria-hidden="true">↓</span>
              {hero.workLabel}
            </a>
          </div>
        </div>

        {/* Editorial Index Caption */}
        <span className="portrait-caption metadata text-secondary absolute top-6 right-0 z-20 hidden sm:block" data-hero-meta>
          {hero.portraitLabel}
        </span>
      </div>

      {/* Transitional Identity Ribbon Strip */}
      <div className="identity-ribbon mt-12 pt-4 border-t border-line/50 overflow-hidden" data-hero-meta>
        <div className="flex items-center justify-between gap-6 font-mono text-[10px] tracking-widest uppercase text-secondary">
          <div className="flex items-center gap-6">
            <span>SYSTEM DISCIPLINE</span>
            <span>✦</span>
            <span>EXPERIMENT-FIRST</span>
            <span>✦</span>
            <span>DETERMINISTIC LOGIC</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-primary">
            <span>[SCROLL TO DISCOVER]</span>
            <span aria-hidden="true">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
