'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { useCursor } from '../cursor/CursorContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/gsap';

export function Hero() {
  const [introFinished, setIntroFinished] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const introTopCurtainRef = useRef<HTMLDivElement>(null);
  const introBottomCurtainRef = useRef<HTMLDivElement>(null);
  const introIdentityRef = useRef<HTMLDivElement>(null);

  const topBarRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLHeadingElement>(null);
  const lastNameRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const identityTagRef = useRef<HTMLDivElement>(null);
  const philosophyTagRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const { setCursorVariant, resetCursor } = useCursor();

  // 1. One-Time Opening Intro Sequence on Initial Page Load
  useEffect(() => {
    if (prefersReducedMotion) {
      setIntroFinished(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIntroFinished(true);
        },
      });

      // A. Identity Lockup Fade-in & Subtle Letter Expansion
      if (introIdentityRef.current) {
        tl.fromTo(
          introIdentityRef.current,
          { opacity: 0, y: 8, letterSpacing: '0.2em' },
          { opacity: 1, y: 0, letterSpacing: '0.32em', duration: 0.6, ease: 'power2.out' }
        ).to(introIdentityRef.current, {
          opacity: 0,
          scale: 0.96,
          duration: 0.35,
          ease: 'power2.in',
          delay: 0.3,
        });
      }

      // B. Vertical Curtain Split
      if (introTopCurtainRef.current && introBottomCurtainRef.current) {
        tl.to(
          introTopCurtainRef.current,
          { yPercent: -100, duration: 0.75, ease: 'power3.inOut' },
          '-=0.1'
        ).to(
          introBottomCurtainRef.current,
          { yPercent: 100, duration: 0.75, ease: 'power3.inOut' },
          '<'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 2. Fully Reversible Scroll-Driven Separation & Return Choreography
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Master Reversible Scrubbed Timeline
      // Progress 0: BEDANTIKA & MONDAL in place, Portrait 100% visible
      // Progress 1: BEDANTIKA moves Left, MONDAL moves Right, Portrait fades & recedes
      // Reverse 1 -> 0: BEDANTIKA returns from Left, MONDAL returns from Right, Portrait pops/reveals back in
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9, // Smooth continuous scrub for bi-directional scrolling
          invalidateOnRefresh: true,
        },
      });

      // 1. BEDANTIKA moves smoothly toward the LEFT
      if (firstNameRef.current) {
        scrollTl.to(
          firstNameRef.current,
          {
            xPercent: -42,
            y: -25,
            opacity: 0.15,
            ease: 'power1.inOut',
          },
          0
        );
      }

      // 2. MONDAL moves smoothly toward the RIGHT
      if (lastNameRef.current) {
        scrollTl.to(
          lastNameRef.current,
          {
            xPercent: 42,
            y: 30,
            opacity: 0.15,
            ease: 'power1.inOut',
          },
          0
        );
      }

      // 3. PORTRAIT smoothly fades, reduces scale, and recedes downward
      // (Reverses to pop/reveal back into full scale and opacity on scroll up)
      if (portraitRef.current) {
        scrollTl.to(
          portraitRef.current,
          {
            opacity: 0,
            scale: 0.92,
            y: 35,
            ease: 'power1.inOut',
          },
          0
        );
      }

      // 4. Supporting text blocks fade out gracefully
      if (identityTagRef.current) {
        scrollTl.to(
          identityTagRef.current,
          { opacity: 0, y: -20, ease: 'power1.inOut' },
          0
        );
      }

      if (philosophyTagRef.current) {
        scrollTl.to(
          philosophyTagRef.current,
          { opacity: 0, y: -20, ease: 'power1.inOut' },
          0
        );
      }

      if (bottomBarRef.current) {
        scrollTl.to(
          bottomBarRef.current,
          { opacity: 0, y: 20, ease: 'power1.inOut' },
          0
        );
      }

      // 5. Desktop Pointer Micro-Depth (quickTo on X-axis to avoid scroll-driven Y fighting)
      const isTouch =
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window;

      if (!isTouch && containerRef.current) {
        const x1To = gsap.quickTo(firstNameRef.current, 'x', { duration: 0.8, ease: 'power2.out' });
        const x2To = gsap.quickTo(lastNameRef.current, 'x', { duration: 1.0, ease: 'power2.out' });
        const pXTo = gsap.quickTo(portraitRef.current, 'x', { duration: 1.2, ease: 'power2.out' });

        const handlePointerMove = (e: MouseEvent) => {
          const normX = (e.clientX / window.innerWidth - 0.5) * 2;

          x1To(normX * -8);
          x2To(normX * 8);
          pXTo(normX * 6);
        };

        window.addEventListener('mousemove', handlePointerMove, { passive: true });
        return () => window.removeEventListener('mousemove', handlePointerMove);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-charcoal text-paper flex flex-col justify-between pt-24 md:pt-28 pb-10 px-6 sm:px-10 md:px-14 xl:px-20 overflow-hidden select-none"
    >
      {/* ========================================================= */}
      {/* CINEMATIC INTRO OVERLAY (Runs Once on Initial Entry)     */}
      {/* ========================================================= */}
      {!introFinished && !prefersReducedMotion && (
        <div
          ref={introOverlayRef}
          className="fixed inset-0 z-[9990] flex flex-col pointer-events-none"
        >
          {/* Top Curtain */}
          <div
            ref={introTopCurtainRef}
            className="flex-1 bg-charcoal-dark border-b border-charcoal-light flex items-end justify-center pb-8"
          >
            <div
              ref={introIdentityRef}
              className="flex items-center gap-4 font-mono text-xs text-paper uppercase tracking-[0.3em]"
            >
              <span className="font-bold text-vermilion">BM</span>
              <span className="h-3 w-px bg-charcoal-light" />
              <span className="font-semibold text-paper">BEDANTIKA MONDAL</span>
              <span className="h-1.5 w-1.5 rounded-full bg-vermilion" />
            </div>
          </div>

          {/* Bottom Curtain */}
          <div
            ref={introBottomCurtainRef}
            className="flex-1 bg-charcoal-dark border-t border-charcoal-light"
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* TOP EDITORIAL METADATA BAR                                */}
      {/* ========================================================= */}
      <div
        ref={topBarRef}
        className="w-full flex items-center justify-between font-mono text-xs text-paper-muted border-b border-charcoal-light pb-4 z-10"
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-vermilion text-sm">01</span>
          <span className="text-charcoal-light">/</span>
          <span className="font-semibold text-paper uppercase tracking-widest">INTRODUCTION</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="tracking-widest uppercase hidden sm:inline">
            {`${siteConfig.identity} // ${siteConfig.roleSubtitle}`}
          </span>
          <span className="text-paper-muted">· {siteConfig.location}</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAIN CINEMATIC HERO SPATIAL STAGE                         */}
      {/* ========================================================= */}
      <div className="my-auto py-8 md:py-12 flex flex-col justify-center relative z-10">
        {/* Row 1: BEDANTIKA (Top Left Spanning) */}
        <div className="overflow-hidden">
          <h1
            ref={firstNameRef}
            className="font-sans font-black text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13.5rem] leading-[0.82] tracking-tighter text-paper uppercase will-change-transform"
          >
            BEDANTIKA
          </h1>
        </div>

        {/* Middle Row: Embedded Portrait & Architectural Metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-4 md:my-6">
          {/* Left Supporting Statement */}
          <div ref={identityTagRef} className="lg:col-span-4 space-y-3 will-change-transform">
            <span className="font-mono text-xs font-bold text-vermilion tracking-widest uppercase block">
              DISCIPLINE // FOCUS
            </span>
            <p className="font-sans text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-paper uppercase leading-tight">
              BUILDING WHAT<br />
              DOESN&apos;T EXIST YET.
            </p>
            <p className="font-mono text-xs text-paper-muted tracking-wider uppercase pt-1">
              IDEAS → SYSTEMS → IMPACT
            </p>
          </div>

          {/* Center Embedded Portrait (Layered into the Typography) */}
          <div className="lg:col-span-4 flex justify-center">
            <div
              ref={portraitRef}
              className="relative w-48 sm:w-56 md:w-64 h-60 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-charcoal-elevated bg-charcoal-light shadow-2xl group will-change-transform"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={resetCursor}
            >
              <Image
                src="/images/bedantika.jpg"
                alt="Bedantika Mondal"
                fill
                priority
                className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 220px, 260px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-paper-muted">
                <span>BEDANTIKA MONDAL</span>
                <span className="text-vermilion">2026</span>
              </div>
            </div>
          </div>

          {/* Right Supporting Philosophy */}
          <div ref={philosophyTagRef} className="lg:col-span-4 flex lg:justify-end will-change-transform">
            <div className="max-w-xs text-left lg:text-right space-y-2">
              <span className="font-mono text-xs text-paper-muted tracking-widest uppercase block">
                SPECIALIZATION
              </span>
              <p className="font-sans text-sm sm:text-base text-paper-muted font-medium leading-relaxed">
                Creative development at the intersection of generative AI, intelligent multi-agent systems, and experimental digital interfaces.
              </p>
            </div>
          </div>
        </div>

        {/* Row 3: MONDAL (Offset Right) */}
        <div className="overflow-hidden flex justify-end">
          <h1
            ref={lastNameRef}
            className="font-sans font-black text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13.5rem] leading-[0.82] tracking-tighter text-paper uppercase text-right will-change-transform"
          >
            MONDAL
          </h1>
        </div>
      </div>

      {/* ========================================================= */}
      {/* BOTTOM SCROLL PROMPT & DIRECT ACTION                      */}
      {/* ========================================================= */}
      <div
        ref={bottomBarRef}
        className="flex items-end justify-between pt-4 border-t border-charcoal-light z-10 font-mono text-xs text-paper-muted will-change-transform"
      >
        {/* Scroll Cue with Minimal Animated Indicator */}
        <div className="flex items-center gap-3">
          <div className="h-6 w-px bg-charcoal-light relative overflow-hidden">
            <div className="h-2 w-full bg-vermilion animate-pulse" />
          </div>
          <span className="tracking-widest uppercase text-[11px]">
            SCROLL DOWN TO BEGIN THE STORY
          </span>
        </div>

        {/* Quick Link */}
        <Link
          href="#work"
          className="inline-flex items-center gap-2 text-paper hover:text-vermilion transition-colors font-bold tracking-widest uppercase"
          onMouseEnter={() => setCursorVariant('view', 'VIEW')}
          onMouseLeave={resetCursor}
        >
          <span>EXPLORE WORK</span>
          <span className="text-vermilion">↓</span>
        </Link>
      </div>
    </section>
  );
}
