'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { technologies } from '@/data/technologies';
import { SectionHeader } from '../ui/SectionHeader';
import { useCursor } from '../cursor/CursorContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/gsap';

export function TechStack() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { setCursorVariant, resetCursor } = useCursor();
  const prefersReducedMotion = useReducedMotion();

  const half = Math.ceil(technologies.length / 2);
  const row1 = technologies.slice(0, half);
  const row2 = technologies.slice(half);

  const row1List = [...row1, ...row1, ...row1];
  const row2List = [...row2, ...row2, ...row2];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return;

      gsap.to(row1Ref.current, {
        x: '-=300',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      gsap.to(row2Ref.current, {
        x: '+=300',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const activeTechObj = technologies.find((t) => t.name === selectedTech);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative bg-charcoal text-paper py-28 md:py-44 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <SectionHeader number="05" title="TECH STACK" category="CAPABILITIES" theme="dark" />

        <p className="font-sans text-xl md:text-2xl font-semibold text-paper-muted max-w-xl leading-snug">
          Core technologies, models, and architectures. Click any technology to trace its production deployment.
        </p>
      </div>

      {/* Row 1 Marquee Band */}
      <div className="relative w-full overflow-hidden py-4 bg-charcoal-light/60 border-y border-charcoal-elevated">
        <div
          ref={row1Ref}
          className="flex whitespace-nowrap gap-10 md:gap-16 w-max will-change-transform"
        >
          {row1List.map((tech, i) => {
            const isSelected = selectedTech === tech.name;
            const isHovered = hoveredTech === tech.name;
            const isDimmed = (hoveredTech && !isHovered) || (selectedTech && !isSelected);

            return (
              <button
                type="button"
                key={`r1-${tech.name}-${i}`}
                onClick={() => setSelectedTech(isSelected ? null : tech.name)}
                onMouseEnter={() => {
                  setHoveredTech(tech.name);
                  setCursorVariant('hover');
                }}
                onMouseLeave={() => {
                  setHoveredTech(null);
                  resetCursor();
                }}
                className={`group inline-flex items-center gap-4 transition-all duration-300 focus:outline-none ${
                  isDimmed ? 'opacity-20' : 'opacity-100'
                }`}
              >
                <span
                  className={`font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase transition-colors duration-200 ${
                    isSelected
                      ? 'text-vermilion'
                      : isHovered
                      ? 'text-paper'
                      : 'text-paper-muted'
                  }`}
                >
                  {tech.name}
                </span>
                <span className="font-mono text-sm text-vermilion font-bold">/</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2 Marquee Band (Reverse direction) */}
      <div className="relative w-full overflow-hidden py-4 bg-charcoal-dark border-b border-charcoal-elevated">
        <div
          ref={row2Ref}
          className="flex whitespace-nowrap gap-10 md:gap-16 w-max will-change-transform -translate-x-1/3"
        >
          {row2List.map((tech, i) => {
            const isSelected = selectedTech === tech.name;
            const isHovered = hoveredTech === tech.name;
            const isDimmed = (hoveredTech && !isHovered) || (selectedTech && !isSelected);

            return (
              <button
                type="button"
                key={`r2-${tech.name}-${i}`}
                onClick={() => setSelectedTech(isSelected ? null : tech.name)}
                onMouseEnter={() => {
                  setHoveredTech(tech.name);
                  setCursorVariant('hover');
                }}
                onMouseLeave={() => {
                  setHoveredTech(null);
                  resetCursor();
                }}
                className={`group inline-flex items-center gap-4 transition-all duration-300 focus:outline-none ${
                  isDimmed ? 'opacity-20' : 'opacity-100'
                }`}
              >
                <span
                  className={`font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase transition-colors duration-200 ${
                    isSelected
                      ? 'text-vermilion'
                      : isHovered
                      ? 'text-paper'
                      : 'text-paper-muted'
                  }`}
                >
                  {tech.name}
                </span>
                <span className="font-mono text-sm text-vermilion font-bold">/</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Project Trace Drawer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12">
        {selectedTech && activeTechObj ? (
          <div className="p-8 bg-charcoal-light border-2 border-vermilion rounded-2xl animate-fadeIn shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal-elevated pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-vermilion" />
                <span className="font-sans font-black text-2xl text-paper uppercase">
                  {activeTechObj.name}
                </span>
                <span className="font-mono text-xs text-vermilion uppercase font-semibold">
                  ({activeTechObj.category})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTech(null)}
                className="font-mono text-xs text-paper-muted hover:text-vermilion transition-colors"
              >
                [CLOSE ✕]
              </button>
            </div>

            <div className="space-y-4">
              <p className="font-mono text-xs text-paper-muted uppercase tracking-wider">
                FEATURED IN PRODUCTION SYSTEMS:
              </p>
              {activeTechObj.usedIn.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {activeTechObj.usedIn.map((slug) => (
                    <Link
                      key={slug}
                      href={`/project/${slug}`}
                      className="inline-flex items-center gap-3 px-5 py-2.5 bg-charcoal-elevated border border-charcoal-light hover:border-vermilion hover:text-vermilion font-mono text-xs font-bold tracking-wider uppercase transition-colors rounded-lg"
                      onMouseEnter={() => setCursorVariant('view')}
                      onMouseLeave={resetCursor}
                    >
                      <span>USED IN: {slug.toUpperCase()}</span>
                      <span className="text-vermilion">→</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="font-mono text-xs text-paper-muted italic">
                  Utilized in experimental research and lab explorations.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between font-mono text-xs text-paper-muted border-t border-charcoal-light pt-6">
            <span>CLICK ANY TECHNOLOGY TO TRACE PROJECT FOOTPRINT</span>
            <span>BEDANTIKA MONDAL · 2026</span>
          </div>
        )}
      </div>
    </section>
  );
}
