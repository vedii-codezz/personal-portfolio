'use client';

import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { MonospaceTag } from '../ui/MonospaceTag';
import { ProjectVisualMetaphor } from '../project/ProjectVisualMetaphor';
import { useCursor } from '../cursor/CursorContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function SelectedWork() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const mobileStageRefs = useRef<(HTMLElement | null)[]>([]);

  const { setCursorVariant, resetCursor } = useCursor();
  const prefersReducedMotion = useReducedMotion();

  const setCardRef = useCallback((el: HTMLElement | null, index: number) => {
    cardRefs.current[index] = el;
  }, []);

  // useLayoutEffect ensures DOM measurements happen after render but before paint
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =========================================================
      // DESKTOP: PINNED HORIZONTAL SCROLL (>= 1024px)
      // =========================================================
      mm.add('(min-width: 1024px)', () => {
        // Force layout recalculation
        ScrollTrigger.refresh();

        const trackWidth = track.scrollWidth;
        const viewportWidth = viewport.clientWidth;
        const maxX = trackWidth - viewportWidth;

        // DEBUG: Verify measurements (will remove after verification)
        console.log('[SelectedWork] Measurements:', {
          trackWidth,
          viewportWidth,
          maxX,
        });

        if (maxX <= 0) {
          console.warn('[SelectedWork] maxX is <= 0. Horizontal scroll cannot work.');
          return;
        }

        // Calculate stop positions for each project card
        const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
        const stopPositions = cards.map((card) => {
          // card.offsetLeft is relative to its offsetParent (the track).
          // We negate it to get the required track translateX.
          const pos = -card.offsetLeft;
          // Clamp: don't go past the maximum scrollable distance
          return Math.max(-maxX, Math.min(0, pos));
        });

        console.log('[SelectedWork] Stop positions:', stopPositions);
        console.log('[SelectedWork] Card offsets:', cards.map((c, i) => ({
          project: projects[i]?.title,
          offsetLeft: c.offsetLeft,
          stopX: stopPositions[i],
        })));

        // Total scroll runway: generous vertical distance
        const totalScrollDistance = window.innerHeight * 6;

        // Build segmented timeline with holds
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${totalScrollDistance}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              // Map progress to active project index
              // Total timeline duration = 10.6 units
              // FINORA hold: 0 - 1.6 => progress 0 - 0.151
              // Move to APTLY: 1.6 - 2.6 => progress 0.151 - 0.245
              // APTLY hold: 2.6 - 4.2 => progress 0.245 - 0.396
              // Move to VEYRA: 4.2 - 5.2 => progress 0.396 - 0.491
              // VEYRA hold: 5.2 - 6.8 => progress 0.491 - 0.642
              // Move to NIKOT: 6.8 - 7.8 => progress 0.642 - 0.736
              // NIKOT hold: 7.8 - 10.0 => progress 0.736 - 1.0
              if (p < 0.20) {
                setActiveIndex(0);
              } else if (p < 0.45) {
                setActiveIndex(1);
              } else if (p < 0.70) {
                setActiveIndex(2);
              } else {
                setActiveIndex(3);
              }
            },
          },
        });

        // 1. FINORA HOLD (1.6 units)
        tl.to({}, { duration: 1.6 });

        // 2. MOVE TO APTLY (1.0 units)
        tl.to(track, {
          x: stopPositions[1] || -maxX * 0.33,
          duration: 1.0,
          ease: 'power2.inOut',
        });

        // 3. APTLY HOLD (1.6 units)
        tl.to({}, { duration: 1.6 });

        // 4. MOVE TO VEYRA (1.0 units)
        tl.to(track, {
          x: stopPositions[2] || -maxX * 0.66,
          duration: 1.0,
          ease: 'power2.inOut',
        });

        // 5. VEYRA HOLD (1.6 units)
        tl.to({}, { duration: 1.6 });

        // 6. MOVE TO NIKOT-E-METRO (1.0 units)
        tl.to(track, {
          x: stopPositions[3] || -maxX,
          duration: 1.0,
          ease: 'power2.inOut',
        });

        // 7. NIKOT-E-METRO FINAL HOLD (2.2 units)
        tl.to({}, { duration: 2.2 });
      });

      // =========================================================
      // MOBILE / TABLET: NATURAL VERTICAL STACK (< 1024px)
      // =========================================================
      mm.add('(max-width: 1023px)', () => {
        mobileStageRefs.current.forEach((stage) => {
          if (!stage) return;
          gsap.fromTo(
            stage,
            { y: 35, opacity: 0.3 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stage,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 0.8,
              },
            }
          );
        });
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-charcoal text-paper select-none border-t border-charcoal-elevated"
    >
      {/* ========================================================= */}
      {/* DESKTOP PINNED HORIZONTAL SCROLL (min-width: 1024px)      */}
      {/* ========================================================= */}
      <div className="hidden lg:flex h-screen w-full flex-col justify-between py-8 xl:py-10 px-8 xl:px-14 overflow-hidden relative">
        {/* Top Minimal Editorial Meta Header */}
        <div className="w-full flex items-center justify-between font-mono text-xs text-paper-muted border-b border-charcoal-light pb-3 z-20">
          <div className="flex items-center gap-3">
            <span className="font-bold text-vermilion text-sm">02</span>
            <span className="text-charcoal-light">/</span>
            <span className="tracking-widest uppercase font-semibold text-paper">SELECTED WORK</span>
            <span className="text-paper-muted">· ARCHITECTURES &amp; SYSTEMS</span>
          </div>

          {/* Active Chapter Counter */}
          <div className="flex items-center gap-4">
            <span className="tracking-widest text-paper font-bold font-mono">
              CHAPTER 0{activeIndex + 1} / 0{projects.length}
            </span>
            <div className="w-24 h-1 bg-charcoal-light rounded-full overflow-hidden">
              <div
                className="h-full bg-vermilion transition-all duration-500 ease-out"
                style={{ width: `${((activeIndex + 1) / projects.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Middle Stage: Left Intro + Viewport with Track */}
        <div className="my-auto flex w-full h-[76vh] relative">
          {/* Left Anchor Panel — fixed intro sidebar */}
          <aside className="w-[24vw] min-w-[280px] max-w-[360px] shrink-0 pr-8 xl:pr-12 flex flex-col justify-between h-full py-4 z-20 bg-charcoal/95 backdrop-blur-md border-r border-charcoal-light">
            <div>
              <span className="font-mono text-xs font-bold text-vermilion tracking-widest uppercase mb-4 block">
                CURATED INDEX // 2024–2026
              </span>

              {/* Dominant Headline */}
              <h2 className="font-sans font-black text-6xl xl:text-7xl 2xl:text-8xl tracking-tighter text-paper uppercase leading-[0.84] mb-6">
                REAL<br />
                IDEAS.<br />
                <span className="text-vermilion">BUILT.</span>
              </h2>

              <p className="font-sans text-sm xl:text-base text-paper-muted leading-snug tracking-tight font-medium max-w-xs mb-8">
                Four distinct systems where curiosity met code and ideas turned into real things.
              </p>
            </div>

            {/* Bottom Directional Cue */}
            <div className="space-y-4 pt-6 border-t border-charcoal-light">
              <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-paper uppercase">
                <span>EXPLORE CHAPTERS</span>
                <span className="text-vermilion animate-pulse">→</span>
              </div>
            </div>
          </aside>

          {/* Viewport: visible project window — overflow hidden clips the track */}
          <div
            ref={viewportRef}
            className="flex-1 h-full overflow-hidden relative"
          >
            {/* Track: physically translates left via GSAP — width: max-content makes it wider than viewport */}
            <div
              ref={trackRef}
              className="flex flex-nowrap items-stretch h-full py-2 will-change-transform"
              style={{ width: 'max-content' }}
            >
              {projects.map((project, index) => {
                const isHovered = hoveredSlug === project.slug;
                const isActive = activeIndex === index;

                return (
                  <article
                    key={project.slug}
                    ref={(el) => setCardRef(el, index)}
                    className={`shrink-0 h-full flex flex-col justify-between py-4 px-8 xl:px-12 transition-opacity duration-500 relative select-none ${
                      isActive
                        ? 'opacity-100'
                        : 'opacity-40'
                    }`}
                    style={{ width: 'min(55vw, 780px)' }}
                    onMouseEnter={() => {
                      setHoveredSlug(project.slug);
                      setCursorVariant('view', 'VIEW');
                    }}
                    onMouseLeave={() => {
                      setHoveredSlug(null);
                      resetCursor();
                    }}
                  >
                    {/* Oversized Thin Architectural Background Number */}
                    <div
                      className="absolute -top-4 -right-4 font-sans font-thin text-[13rem] xl:text-[17rem] 2xl:text-[20rem] leading-none text-charcoal-light/35 select-none pointer-events-none z-0 tracking-tighter"
                      aria-hidden="true"
                    >
                      {project.number}
                    </div>

                    {/* Stage Top Bar */}
                    <div className="flex items-center justify-between font-mono text-xs text-paper-muted border-b border-charcoal-light pb-2 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-vermilion font-bold">({project.number})</span>
                        <span className="tracking-widest uppercase">CHAPTER // {project.subtitle}</span>
                      </div>
                      <span className="tracking-widest">{project.year}</span>
                    </div>

                    {/* Stage Middle: Open Visual Metaphor */}
                    <div className="my-auto py-3 relative z-10">
                      <Link
                        href={`/project/${project.slug}`}
                        className="block focus:outline-none overflow-hidden rounded-2xl border border-charcoal-elevated bg-charcoal-light"
                      >
                        <ProjectVisualMetaphor
                          type={project.visualType}
                          isHovered={isHovered}
                          scrollProgress={isActive ? 1 : 0.5}
                          className="transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </Link>
                    </div>

                    {/* Stage Bottom: Typography & Case Study Action */}
                    <div className="space-y-3 pt-2 relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                        <Link href={`/project/${project.slug}`} className="block group">
                          <h3 className="font-sans font-black text-3xl xl:text-4xl 2xl:text-5xl tracking-tighter uppercase text-paper group-hover:text-vermilion transition-colors duration-200">
                            {project.title}
                          </h3>
                        </Link>

                        {/* Monospace Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <MonospaceTag key={tag} active={isHovered} theme="dark">
                              {tag}
                            </MonospaceTag>
                          ))}
                        </div>
                      </div>

                      <p className="font-sans text-sm xl:text-base font-medium text-paper-muted leading-snug line-clamp-2 max-w-xl">
                        {project.tagline}
                      </p>

                      {/* Action Links */}
                      <div className="pt-2 flex items-center justify-between border-t border-charcoal-light font-mono text-xs font-bold tracking-widest uppercase">
                        <Link
                          href={`/project/${project.slug}`}
                          className="inline-flex items-center gap-2 text-paper hover:text-vermilion transition-colors py-1 group"
                        >
                          <span>VIEW CASE STUDY</span>
                          <span className="text-vermilion group-hover:translate-x-1.5 transition-transform">→</span>
                        </Link>

                        {project.links?.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-paper-muted hover:text-paper transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            [GITHUB ↗]
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Architectural Chapter Progress Bar */}
        <div className="w-full flex items-center justify-between font-mono text-xs text-paper-muted pt-3 border-t border-charcoal-light z-20">
          <div className="flex items-center gap-6 xl:gap-10">
            {projects.map((p, i) => (
              <div
                key={p.slug}
                className={`flex items-center gap-2.5 transition-all duration-300 ${
                  activeIndex === i
                    ? 'text-vermilion font-bold scale-105'
                    : 'text-paper-muted opacity-40'
                }`}
              >
                <span className="font-mono">0{i + 1}</span>
                <span className="tracking-wider uppercase hidden sm:inline">{p.title}</span>
                {i < projects.length - 1 && <span className="text-charcoal-light ml-4 sm:ml-6">/</span>}
              </div>
            ))}
          </div>

          <span className="tracking-widest text-[11px] text-paper-muted hidden md:inline">
            SCROLL TO ADVANCE CHAPTERS
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE / TABLET VERTICAL CHAPTER STACK (< 1024px)        */}
      {/* ========================================================= */}
      <div className="lg:hidden py-20 px-6 sm:px-10 max-w-3xl mx-auto space-y-20">
        {/* Mobile Intro Header */}
        <div className="space-y-4 border-b border-charcoal-light pb-8">
          <div className="flex items-center gap-3 font-mono text-xs text-paper-muted">
            <span className="text-vermilion font-bold text-sm">02</span>
            <span className="uppercase tracking-widest font-semibold text-paper">SELECTED WORK</span>
          </div>

          <h2 className="font-sans font-black text-5xl sm:text-6xl tracking-tighter text-paper uppercase leading-[0.86]">
            REAL<br />
            IDEAS.<br />
            <span className="text-vermilion">BUILT.</span>
          </h2>

          <p className="font-sans text-base text-paper-muted leading-snug tracking-tight font-medium">
            Four distinct systems where curiosity met code and ideas turned into real things.
          </p>
        </div>

        {/* Mobile Project Chapters */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              ref={(el) => {
                mobileStageRefs.current[index] = el;
              }}
              className="space-y-6 relative"
            >
              {/* Giant Mobile Number */}
              <div
                className="font-sans font-thin text-7xl text-charcoal-light/60 tracking-tighter select-none"
                aria-hidden="true"
              >
                {project.number}
              </div>

              <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-charcoal-light text-paper-muted">
                <span className="text-vermilion font-bold text-sm">
                  ({project.number})
                </span>
                <span className="uppercase tracking-wider">
                  {project.subtitle} · {project.year}
                </span>
              </div>

              <Link
                href={`/project/${project.slug}`}
                className="block rounded-2xl overflow-hidden border border-charcoal-elevated bg-charcoal-light"
              >
                <ProjectVisualMetaphor
                  type={project.visualType}
                  scrollProgress={1}
                />
              </Link>

              <div className="space-y-3">
                <Link href={`/project/${project.slug}`} className="block">
                  <h3 className="font-sans font-black text-3xl sm:text-4xl tracking-tighter uppercase text-paper hover:text-vermilion transition-colors">
                    {project.title}
                  </h3>
                </Link>

                <p className="font-sans text-base font-semibold text-paper-muted leading-snug">
                  {project.tagline}
                </p>

                <p className="text-sm text-paper-muted/80 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <MonospaceTag key={tag} theme="dark">
                      {tag}
                    </MonospaceTag>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-charcoal-light font-mono text-xs font-bold tracking-widest uppercase">
                  <Link
                    href={`/project/${project.slug}`}
                    className="inline-flex items-center gap-2 text-paper hover:text-vermilion transition-colors"
                  >
                    <span>VIEW CASE STUDY</span>
                    <span className="text-vermilion">→</span>
                  </Link>

                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-paper-muted hover:text-paper transition-opacity"
                    >
                      [GITHUB ↗]
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
