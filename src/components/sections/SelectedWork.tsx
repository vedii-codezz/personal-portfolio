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
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const mobileStageRefs = useRef<(HTMLElement | null)[]>([]);
  const activeIndexRef = useRef(0);

  const { setCursorVariant, resetCursor } = useCursor();
  const prefersReducedMotion = useReducedMotion();

  const setCardRef = useCallback((el: HTMLElement | null, index: number) => {
    cardRefs.current[index] = el;
  }, []);

  // The desktop track has exactly one transform owner: this GSAP timeline.
  // Keeping setup here also makes every hot reload clean up its pin and spacer.
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !pin || !viewport || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        // Always clear stale inline x values before measuring/recreating.
        gsap.set(track, { clearProps: 'transform' });
        const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
        const measure = () => {
          const distance = track.scrollWidth - viewport.clientWidth;
          return { distance: Math.max(0, distance), viewportWidth: viewport.clientWidth };
        };
        const { distance } = measure();
        if (distance <= 0 || cards.length !== projects.length) return;

        // A card's offset is measured in track coordinates. The final card is
        // clamped to the real maximum, so the track always visibly reaches it.
        const measureStops = () => {
          const maxDistance = measure().distance;
          const origin = cards[0].offsetLeft;
          return cards.map((card, index) => index === cards.length - 1
            ? -maxDistance
            : gsap.utils.clamp(-maxDistance, 0, -(card.offsetLeft - origin)));
        };
        let stops = measureStops();

        // Chapter time is intentionally weighted toward looking, rather than moving.
        const hold = 2;
        const move = 0.9;
        const finalHold = 2.5;
        const setCardOpacity = cards.map((card) => gsap.quickSetter(card, 'opacity'));
        const setCardScale = cards.map((card) => gsap.quickSetter(card, 'scale'));
        const setReveal = cards.map((card) =>
          gsap.utils.toArray<HTMLElement>('[data-work-reveal]', card).map((element) => ({
            opacity: gsap.quickSetter(element, 'opacity'),
            y: gsap.quickSetter(element, 'y'),
          }))
        );
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'selected-work-horizontal',
            trigger: section,
            start: 'top top',
            end: () => {
              const next = measure().distance;
              return `+=${Math.max(next + window.innerHeight * 2, window.innerHeight * 4)}`;
            },
            pin: true,
            // The section is a flex child; GSAP otherwise disables spacing,
            // letting Contact cover Work before its horizontal journey ends.
            pinSpacing: true,
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefreshInit: () => { stops = measureStops(); },
          },
          // Scrub continues after the last scroll event. Follow the rendered
          // animation so the counter and card focus settle on the same chapter.
          onUpdate: () => {
            const currentX = Number(gsap.getProperty(track, 'x')) || 0;
            const nearest = stops.reduce(
              (best, stop, index) => Math.abs(stop - currentX) < Math.abs(stops[best] - currentX) ? index : best,
              0
            );
            // The closest chapter owns the editorial counter. State changes only
            // at chapter boundaries; the per-frame polish stays in GSAP.
            if (activeIndexRef.current !== nearest) {
              activeIndexRef.current = nearest;
              setActiveIndex(nearest);
            }

            cards.forEach((_, index) => {
              const focus = gsap.utils.clamp(0, 1, 1 - Math.abs(currentX - stops[index]) / 560);
              setCardOpacity[index](0.42 + focus * 0.58);
              setCardScale[index](0.975 + focus * 0.025);
              setReveal[index].forEach((setter) => {
                setter.opacity(0.72 + focus * 0.28);
                setter.y((1 - focus) * 18);
              });
            });
          },
        });
        tl.to({}, { duration: hold });
        cards.slice(1).forEach((_, index) => {
          const isFinal = index === cards.length - 2;
          tl.to(track, {
            x: () => stops[index + 1],
            duration: move,
            ease: 'none',
          });
          if (isFinal) {
            tl.to({}, { duration: finalHold - 0.35 });
            tl.to(pin, { opacity: 0.9, duration: 0.35, ease: 'none' });
          } else {
            tl.to({}, { duration: hold });
          }
        });

        // Refresh once fonts and the other sections' effects have settled.
        // Cancel this work on breakpoint changes, unmounts and hot reloads.
        let disposed = false;
        let refreshFrame = 0;
        void document.fonts.ready.then(() => {
          if (!disposed) refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
        });
        return () => {
          disposed = true;
          cancelAnimationFrame(refreshFrame);
          gsap.set(track, { clearProps: 'transform' });
          gsap.set(pin, { clearProps: 'opacity' });
          cards.forEach((card) => gsap.set(card, { clearProps: 'opacity,transform' }));
          gsap.set(track.querySelectorAll('[data-work-reveal]'), { clearProps: 'opacity,transform' });
        };
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
      className="work-section relative bg-charcoal text-paper select-none border-t border-charcoal-elevated"
    >
      {/* ========================================================= */}
      {/* DESKTOP PINNED HORIZONTAL SCROLL (min-width: 1024px)      */}
      {/* ========================================================= */}
      <div ref={pinRef} className="work-pin hidden lg:flex h-screen w-full flex-col justify-between py-8 xl:py-10 px-8 xl:px-14 overflow-hidden relative">
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
          <aside className="work-intro w-[24vw] min-w-[280px] max-w-[360px] shrink-0 pr-8 xl:pr-12 flex flex-col justify-between h-full py-4 z-20 bg-charcoal/95 backdrop-blur-md border-r border-charcoal-light">
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
            className="work-viewport flex-1 h-full overflow-hidden relative"
          >
            {/* Track: physically translates left via GSAP — width: max-content makes it wider than viewport */}
            <div
              ref={trackRef}
              className="work-track flex flex-nowrap items-stretch h-full py-2 will-change-transform"
            >
              {projects.map((project, index) => {
                const isHovered = hoveredSlug === project.slug;
                const isActive = activeIndex === index;

                return (
                  <article
                    key={project.slug}
                    ref={(el) => setCardRef(el, index)}
                    className="project-card shrink-0 h-full flex flex-col justify-between py-4 px-8 xl:px-12 relative select-none"
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
                      data-work-reveal
                      className="absolute -top-4 -right-4 font-sans font-thin text-[13rem] xl:text-[17rem] 2xl:text-[20rem] leading-none text-charcoal-light/35 select-none pointer-events-none z-0 tracking-tighter"
                      aria-hidden="true"
                    >
                      {project.number}
                    </div>

                    {/* Stage Top Bar */}
                    <div data-work-reveal className="flex items-center justify-between font-mono text-xs text-paper-muted border-b border-charcoal-light pb-2 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-vermilion font-bold">({project.number})</span>
                        <span className="tracking-widest uppercase">CHAPTER // {project.subtitle}</span>
                      </div>
                      <span className="tracking-widest">{project.year}</span>
                    </div>

                    {/* Stage Middle: Open Visual Metaphor */}
                    <div data-work-reveal className="my-auto py-3 relative z-10">
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
                    <div data-work-reveal className="space-y-3 pt-2 relative z-10">
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
