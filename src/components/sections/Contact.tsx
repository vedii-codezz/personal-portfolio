'use client';

import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '@/data/site';
import { useCursor } from '../cursor/CursorContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/gsap';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineLine1Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine2Ref = useRef<HTMLHeadingElement>(null);
  const headlineWeirdRef = useRef<HTMLHeadingElement>(null);
  const annotationRef = useRef<HTMLDivElement>(null);
  const supportingCopyRef = useRef<HTMLDivElement>(null);
  const actionBtnRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const footerRowRef = useRef<HTMLDivElement>(null);

  const { setCursorVariant, resetCursor } = useCursor();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Restrained, elegant mask reveal timeline starting only after Work unpins
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          end: 'top 28%',
          scrub: 0.75,
        },
      });

      // 1. Section Marker & Eyebrow
      if (markerRef.current) {
        tl.fromTo(
          markerRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
          '-=0.15'
        );
      }

      // 2. Line-mask Reveals for Headline
      if (headlineLine1Ref.current) {
        tl.fromTo(
          headlineLine1Ref.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.1'
        );
      }

      if (headlineLine2Ref.current) {
        tl.fromTo(
          headlineLine2Ref.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );
      }

      if (headlineWeirdRef.current) {
        tl.fromTo(
          headlineWeirdRef.current,
          { yPercent: 100, scale: 0.96, opacity: 0 },
          { yPercent: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
      }

      // 3. Editorial Annotation & Supporting Copy
      if (annotationRef.current) {
        tl.fromTo(
          annotationRef.current,
          { opacity: 0, x: -15, rotate: -3 },
          { opacity: 1, x: 0, rotate: -2, duration: 0.4, ease: 'power2.out' },
          '-=0.3'
        );
      }

      if (supportingCopyRef.current) {
        tl.fromTo(
          supportingCopyRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // 4. Primary Action & Social Links
      if (actionBtnRef.current) {
        tl.fromTo(
          actionBtnRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        );
      }

      if (socialsRef.current) {
        tl.fromTo(
          socialsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        );
      }

      if (footerRowRef.current) {
        tl.fromTo(
          footerRowRef.current,
          { opacity: 0.3 },
          { opacity: 1, duration: 0.3 },
          '-=0.1'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.socials.email);
      setCopied(true);
      setCursorVariant('copied', 'COPIED!');
      setTimeout(() => {
        setCopied(false);
        resetCursor();
      }, 3000);
    } catch (err) {
      console.error('Failed to copy email', err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-charcoal text-paper min-h-screen flex flex-col justify-between pt-24 md:pt-32 pb-10 px-6 sm:px-10 md:px-14 xl:px-20 select-none overflow-hidden border-t border-charcoal-elevated"
    >
      {/* Background Subtle Gradient Accent (Far Right Edge) */}
      <div
        className="absolute top-1/3 -right-20 w-80 h-80 rounded-full opacity-15 pointer-events-none blur-3xl"
        style={{
          background: 'radial-gradient(circle, #FF5A36 0%, #C8FF3D 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        {/* ========================================================= */}
        {/* TOP ROW: Editorial Section Marker & Eyebrow               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16 md:mb-20">
          {/* Section Marker (Far Left) */}
          <div ref={markerRef} className="md:col-span-3 flex items-center gap-4">
            <span className="font-mono text-xs font-bold tracking-widest text-vermilion">
              04
            </span>
            <span className="h-px w-6 bg-charcoal-light" />
            <span className="font-mono text-xs tracking-widest text-paper-muted uppercase">
              FINAL CHAPTER // CONTACT
            </span>
          </div>

          {/* Eyebrow */}
          <div className="md:col-span-9 flex items-center">
            <p
              ref={eyebrowRef}
              className="font-mono text-xs md:text-sm tracking-widest text-paper-muted uppercase"
            >
              HAVE SOMETHING IN MIND?
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN EDITORIAL SPREAD (Asymmetrical Center Composition)  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto">
          {/* Left / Center Dominant Headline Stage */}
          <div className="lg:col-span-8 space-y-1 relative">
            {/* Line 1: LET'S MAKE */}
            <div className="overflow-hidden">
              <h2
                ref={headlineLine1Ref}
                className="font-sans font-black text-[clamp(3.1rem,13vw,4.5rem)] sm:text-7xl md:text-8xl xl:text-9xl tracking-tighter text-paper uppercase leading-[0.85] will-change-transform"
              >
                LET&apos;S MAKE
              </h2>
            </div>

            {/* Line 2: SOMETHING */}
            <div className="overflow-hidden">
              <h2
                ref={headlineLine2Ref}
                className="font-sans font-black text-[clamp(3.1rem,13vw,4.5rem)] sm:text-7xl md:text-8xl xl:text-9xl tracking-tighter text-paper uppercase leading-[0.85] will-change-transform"
              >
                SOMETHING
              </h2>
            </div>

            {/* Line 3: WEIRD. (Acid Lime Italic Display) */}
            <div className="overflow-hidden flex items-baseline gap-4 md:gap-6 pt-2">
              <h2
                ref={headlineWeirdRef}
                className="font-sans font-black italic text-7xl sm:text-8xl md:text-9xl xl:text-[11rem] 2xl:text-[12rem] tracking-tighter text-lime uppercase leading-[0.82] will-change-transform"
              >
                WEIRD.
              </h2>
              <span className="inline-block h-4 w-4 md:h-6 md:w-6 rounded-full bg-vermilion mb-4 md:mb-8" />
            </div>

            {/* Micro-copy Annotation (Hand-drawn style arrow & phrase) */}
            <div
              ref={annotationRef}
              className="hidden sm:flex items-center gap-3 pt-6 text-paper-muted font-mono text-xs italic tracking-wider max-w-xs -rotate-2 select-none"
            >
              <svg
                width="32"
                height="24"
                viewBox="0 0 32 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-vermilion shrink-0"
              >
                <path
                  d="M 4 20 C 12 18, 20 14, 28 6 M 28 6 L 22 6 M 28 6 L 26 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>“weird ideas are usually the good ones.”</span>
            </div>
          </div>

          {/* Right Column: Supporting Copy & Primary Action */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-10 lg:pl-4">
            {/* Supporting Copy */}
            <div
              ref={supportingCopyRef}
              className="space-y-1 font-sans text-lg sm:text-xl text-paper font-semibold tracking-tight leading-snug"
            >
              <p>Projects.</p>
              <p>Experiments.</p>
              <p>Questionable ideas.</p>
              <p className="font-mono text-sm font-medium text-vermilion pt-3 tracking-widest uppercase">
                I&apos;M LISTENING.
              </p>
            </div>

            {/* Primary Action: Editorial Outlined Pill (SAY HELLO →) */}
            <div ref={actionBtnRef} className="space-y-4">
              <a
                href={`mailto:${siteConfig.socials.email}`}
                onMouseEnter={() => setCursorVariant('copy', 'MAIL')}
                onMouseLeave={resetCursor}
                className="group inline-flex items-center justify-between w-full max-w-sm py-4 px-6 rounded-full border border-charcoal-elevated hover:border-paper/40 bg-charcoal-light hover:bg-charcoal transition-all duration-300 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase text-paper"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  SAY HELLO
                </span>
                <span className="text-vermilion group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </a>

              {/* Quick Email Copy Link */}
              <div className="flex items-center gap-3 font-mono text-xs text-paper-muted">
                <span>OR COPY DIRECTLY:</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  onMouseEnter={() => setCursorVariant('copy', copied ? 'COPIED' : 'COPY')}
                  onMouseLeave={resetCursor}
                  className="text-paper hover:text-vermilion underline decoration-charcoal-light underline-offset-4 transition-colors font-medium"
                >
                  {copied ? '[COPIED ✓]' : siteConfig.socials.email}
                </button>
              </div>
            </div>

            {/* Social Links Directory (Line Expansion Hover) */}
            <div ref={socialsRef} className="space-y-3 pt-4 border-t border-charcoal-light">
              <span className="font-mono text-[11px] text-paper-muted tracking-widest uppercase block mb-3">
                PRESENCE // DIRECTORY
              </span>

              <div className="flex flex-col space-y-2.5 font-mono text-xs font-bold tracking-wider">
                {/* Email */}
                <a
                  href={`mailto:${siteConfig.socials.email}`}
                  onMouseEnter={() => setCursorVariant('copy', 'MAIL')}
                  onMouseLeave={resetCursor}
                  className="group flex items-center justify-between text-paper-muted hover:text-paper transition-colors py-3 lg:py-1 relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-vermilion"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">EMAIL</span>
                  <span className="text-charcoal-light group-hover:text-vermilion group-hover:translate-x-1 transition-all duration-200">
                    ─────────→
                  </span>
                </a>

                {/* GitHub */}
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorVariant('open', 'OPEN')}
                  onMouseLeave={resetCursor}
                  className="group flex items-center justify-between text-paper-muted hover:text-paper transition-colors py-3 lg:py-1 relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-vermilion"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">GITHUB</span>
                  <span className="text-charcoal-light group-hover:text-vermilion group-hover:translate-x-1 transition-all duration-200">
                    ─────────→
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorVariant('open', 'OPEN')}
                  onMouseLeave={resetCursor}
                  className="group flex items-center justify-between text-paper-muted hover:text-paper transition-colors py-3 lg:py-1 relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-vermilion"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">LINKEDIN</span>
                  <span className="text-charcoal-light group-hover:text-vermilion group-hover:translate-x-1 transition-all duration-200">
                    ─────────→
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTEGRATED EDITORIAL FOOTER ROW                           */}
        {/* ========================================================= */}
        <div
          ref={footerRowRef}
          className="mt-16 md:mt-24 pt-6 border-t border-charcoal-light flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[11px] text-paper-muted"
        >
          {/* Identity */}
          <div className="flex items-center gap-3">
            <span className="font-sans font-black text-paper text-xs uppercase tracking-tight">
              {siteConfig.name}
            </span>
            <span className="text-vermilion">·</span>
            <span>{siteConfig.location}</span>
          </div>

          {/* Role & Year */}
          <div className="flex items-center gap-4">
            <span className="uppercase">{siteConfig.identity} / {siteConfig.roleSubtitle}</span>
            <span className="text-vermilion">·</span>
            <span>{siteConfig.year}</span>
          </div>

          {/* Scroll to Top Trigger (↑) */}
          <button
            type="button"
            onClick={scrollToTop}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={resetCursor}
            className="group flex items-center gap-2 text-paper hover:text-vermilion transition-colors self-start sm:self-auto font-bold"
            aria-label="Scroll back to top"
          >
            <span>BACK TO TOP</span>
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-charcoal-light border border-charcoal-elevated group-hover:border-vermilion text-paper group-hover:text-vermilion transition-all">
              ↑
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
