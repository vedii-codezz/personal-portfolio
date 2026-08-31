'use client';

import React, { useEffect, useRef } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/gsap';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const introLineRef = useRef<HTMLParagraphElement>(null);
  const unreasonableRef = useRef<HTMLHeadingElement>(null);
  const numberIdeasRef = useRef<HTMLParagraphElement>(null);
  const projectsLineRef = useRef<HTMLParagraphElement>(null);
  const problemsLineRef = useRef<HTMLParagraphElement>(null);
  const payoffHeaderRef = useRef<HTMLHeadingElement>(null);
  const payoffBothRef = useRef<HTMLHeadingElement>(null);
  const statementCardRef = useRef<HTMLDivElement>(null);
  const metadataBlockRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Master ScrollTrigger Narrative Timeline with damped scrub for continuous interpolation
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'bottom 65%',
          scrub: 1.0,
        },
      });

      // STATE 1: ARRIVAL
      if (introLineRef.current) {
        masterTl.fromTo(
          introLineRef.current,
          { opacity: 0.2, y: 24 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      }

      if (statementCardRef.current) {
        masterTl.fromTo(
          statementCardRef.current,
          { y: 50, opacity: 0.3 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '<'
        );
      }

      // STATE 2: UNREASONABLE (Smooth continuous scale & tracking shift)
      if (unreasonableRef.current) {
        masterTl.fromTo(
          unreasonableRef.current,
          { scale: 0.88, letterSpacing: '0.04em', opacity: 0.35, y: 30 },
          { scale: 1, letterSpacing: '-0.04em', opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.2'
        );
      }

      // STATE 3: CHAOS (Planar offset & drifting fragments)
      if (numberIdeasRef.current) {
        masterTl.fromTo(
          numberIdeasRef.current,
          { y: 25, opacity: 0.4 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        );
      }

      if (metadataBlockRef.current) {
        masterTl.fromTo(
          metadataBlockRef.current,
          { y: 30, opacity: 0.3 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        );
      }

      // STATE 4: DIVERGING PROJECTS & PROBLEMS (Left & Right opposing entry)
      if (projectsLineRef.current && problemsLineRef.current) {
        masterTl.fromTo(
          projectsLineRef.current,
          { x: -24, opacity: 0.3 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.2'
        );

        masterTl.fromTo(
          problemsLineRef.current,
          { x: 24, opacity: 0.3 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.25'
        );
      }

      // STATE 5: STRUCTURE & RESOLUTION (Payoff settles calmly)
      if (payoffHeaderRef.current && payoffBothRef.current) {
        masterTl.fromTo(
          payoffHeaderRef.current,
          { y: 24, opacity: 0.4 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.1'
        );

        masterTl.fromTo(
          payoffBothRef.current,
          { scale: 0.95, y: 18, opacity: 0.4 },
          { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-charcoal text-paper py-28 md:py-44 px-6 md:px-12 overflow-hidden select-none border-t border-charcoal-light"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader number="01" title="ABOUT" category="PHILOSOPHY" theme="dark" />

        {/* Pure Typographic Editorial Scrollytelling Grid (Zero Duplicate Portrait) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative">
          {/* Left Column: Typographic Chaos -> Structure Hierarchy */}
          <div className="lg:col-span-8 flex flex-col justify-center z-20">
            {/* Phase 1: Introductory line */}
            <p
              ref={introLineRef}
              className="font-sans font-semibold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-paper-muted uppercase mb-1 will-change-transform"
            >
              I HAVE AN
            </p>

            {/* Phase 2: Dominant UNREASONABLE */}
            <h3
              ref={unreasonableRef}
              className="font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tighter text-paper uppercase leading-[0.85] my-2 md:my-4 will-change-transform origin-left"
            >
              UNREASONABLE
            </h3>

            {/* Phase 3: NUMBER OF IDEAS */}
            <p
              ref={numberIdeasRef}
              className="font-sans font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-paper-muted uppercase mb-10 md:mb-14 will-change-transform"
            >
              NUMBER OF IDEAS.
            </p>

            {/* Phase 4: Diverging Projects & Problems */}
            <div className="space-y-2 pl-6 md:pl-8 border-l-2 border-vermilion mb-12 md:mb-16">
              <p
                ref={projectsLineRef}
                className="font-mono text-base sm:text-lg md:text-xl text-paper tracking-wide font-medium will-change-transform"
              >
                Some become projects.
              </p>
              <p
                ref={problemsLineRef}
                className="font-mono text-base sm:text-lg md:text-xl text-paper-muted tracking-wide will-change-transform"
              >
                Some become problems.
              </p>
            </div>

            {/* Phase 5: Structure & Payoff (Narrative Handoff into Selected Work) */}
            <div className="space-y-2">
              <h4
                ref={payoffHeaderRef}
                className="font-sans font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-paper uppercase will-change-transform"
              >
                THE GOOD ONES
              </h4>
              <h4
                ref={payoffBothRef}
                className="font-sans font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-vermilion uppercase flex items-center gap-4 will-change-transform origin-left"
              >
                <span>BECOME BOTH.</span>
                <span className="inline-block h-4 w-4 md:h-6 md:w-6 bg-lime rounded-full" />
              </h4>
            </div>
          </div>

          {/* Right Column: Architectural Typographic Manifesto & Systems Index */}
          <div className="lg:col-span-4 relative flex flex-col justify-between h-full space-y-8">
            {/* Architectural Statement Block */}
            <div
              ref={statementCardRef}
              className="p-8 rounded-2xl bg-charcoal-light border border-charcoal-elevated space-y-6 shadow-2xl will-change-transform"
            >
              <div className="flex items-center justify-between font-mono text-xs text-paper-muted border-b border-charcoal-light pb-3">
                <span className="text-vermilion font-bold tracking-widest uppercase">DISCIPLINE // CORE</span>
                <span>2024–2026</span>
              </div>

              <h5 className="font-sans font-black text-2xl sm:text-3xl text-paper uppercase tracking-tight leading-snug">
                CHAOS IS RAW MATERIAL. STRUCTURE MAKES IT REAL.
              </h5>

              <p className="font-sans text-sm text-paper-muted leading-relaxed">
                Combining distributed AI intelligence, agentic multi-node consensus, and precision frontend engineering to create systems that feel intuitive, resilient, and visually unmistakable.
              </p>

              <div className="pt-2 flex items-center gap-2 font-mono text-xs text-vermilion font-bold tracking-widest uppercase">
                <span>SYSTEMS RESEARCH</span>
                <span>→</span>
              </div>
            </div>

            {/* Editorial Metadata Systems Index */}
            <div
              ref={metadataBlockRef}
              className="w-full space-y-3 font-mono text-xs border-t border-charcoal-light pt-6 will-change-transform"
            >
              <div className="flex justify-between text-paper-muted">
                <span className="tracking-wider">FOCUS</span>
                <span className="text-paper font-semibold">AI &amp; INTELLIGENT SYSTEMS</span>
              </div>
              <div className="flex justify-between text-paper-muted">
                <span className="tracking-wider">INTERFACES</span>
                <span className="text-paper font-semibold">EXPERIMENTAL &amp; SPATIAL</span>
              </div>
              <div className="flex justify-between text-paper-muted">
                <span className="tracking-wider">METHOD</span>
                <span className="text-paper font-semibold">PROTOTYPE → REFINE → SHIP</span>
              </div>
              <div className="flex justify-between text-paper-muted">
                <span className="tracking-wider">LOCATION</span>
                <span className="text-paper font-semibold">KOLKATA, INDIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
