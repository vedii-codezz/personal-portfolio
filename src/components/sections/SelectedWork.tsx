'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { ProjectVisualMetaphor } from '../project/ProjectVisualMetaphor';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/* ── Timeline weights ─────────────────────────────────────── */
const HOLDS = [1.3, 1.3, 1.3, 1.6]; // per-project hold duration
const MOVES = [0.8, 0.8, 0.8]; // inter-project transition
const TOTAL =
  HOLDS.reduce((a, b) => a + b, 0) + MOVES.reduce((a, b) => a + b, 0); // 7.9
const SCRUB = 0.45;
const SCROLL_FACTOR = 0.7; // viewport-heights per timeline unit → ~5.53vh total

/* Pre-compute active-index switch thresholds (midpoint of each transition) */
const THRESHOLDS: number[] = [];
(() => {
  let t = 0;
  for (let i = 0; i < MOVES.length; i++) {
    t += HOLDS[i] + MOVES[i] * 0.5;
    THRESHOLDS.push(t);
    t += MOVES[i] * 0.5;
  }
})();

/* Per-card surface theme */
const THEMES = ['cream', 'neutral', 'dark', 'light'] as const;

/* Card width as fraction of the available project viewport */
const CARD_FRACTION = 0.91;

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const indexRefs = useRef<(HTMLElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const section = sectionRef.current!;
        const track = trackRef.current!;
        const viewport = viewportRef.current!;

        /* Cache card + index DOM refs once */
        const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
        const indices = indexRefs.current.filter(Boolean) as HTMLElement[];
        const counter = counterRef.current;

        /* ── Measure & size cards (viewport width minus intro column) ── */
        const measure = () => {
          const vw = viewport.offsetWidth;
          const cw = Math.round(vw * CARD_FRACTION);
          track.style.setProperty('--card-w', `${cw}px`);
          return cw;
        };
        measure();

        /* ── Active-index tracker (no React state, no re-renders) ── */
        let active = 0;

        /* ── ONE master timeline + ONE ScrollTrigger ── */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => {
              measure(); // recalc card width on refresh / resize
              return `+=${TOTAL * window.innerHeight * SCROLL_FACTOR}`;
            },
            pin: true,
            pinSpacing: true,
            scrub: SCRUB,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          onUpdate() {
            /* Derive active index from playhead vs pre-computed thresholds */
            const time = tl.time();
            let next = 0;
            for (let i = 0; i < THRESHOLDS.length; i++) {
              if (time >= THRESHOLDS[i]) next = i + 1;
            }
            if (active === next) return; // threshold unchanged → skip work
            active = next;

            /* Direct DOM attribute updates — zero React re-renders */
            for (let i = 0; i < cards.length; i++) {
              cards[i].setAttribute('data-active', String(i === next));
            }
            for (let i = 0; i < indices.length; i++) {
              indices[i].setAttribute('data-current', String(i === next));
            }
            if (counter) {
              counter.textContent = `0${next + 1} / 0${projects.length}`;
            }
          },
        });

        /* Initial hold for FINORA */
        tl.to({}, { duration: HOLDS[0] });

        /* Move + hold for each subsequent project */
        for (let i = 0; i < MOVES.length; i++) {
          const idx = i + 1;
          tl.to(track, {
            x: () =>
              -(idx * Math.round(viewportRef.current!.offsetWidth * CARD_FRACTION)),
            duration: MOVES[i],
            ease: 'none',
          });
          tl.to({}, { duration: HOLDS[idx] });
        }

        /* Refresh ScrollTrigger after web fonts load */
        let disposed = false;
        let raf = 0;
        void document.fonts.ready.then(() => {
          if (!disposed)
            raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        });

        return () => {
          disposed = true;
          cancelAnimationFrame(raf);
          track.style.removeProperty('--card-w');
          cards.forEach((c) => c.removeAttribute('data-active'));
          indices.forEach((li) => li.removeAttribute('data-current'));
        };
      },
      sectionRef,
    );

    return () => mm.revert();
  }, []);

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <section
      id="work"
      ref={sectionRef}
      className="work-section bg-charcoal text-paper border-t border-charcoal-elevated"
      aria-labelledby="work-heading"
    >
      <div className="work-pin">
        {/* ── Top header bar ── */}
        <header className="work-header font-mono text-xs tracking-widest">
          <h2 id="work-heading">
            <span className="text-vermilion">02 / </span>SELECTED WORK
          </h2>
          <span className="work-header-sub text-paper-muted">
            ARCHITECTURES &amp; SYSTEMS
          </span>
        </header>

        {/* ── Body: intro column + project viewport ── */}
        <div className="work-body">
          <aside className="work-intro">
            <p className="font-mono text-xs tracking-widest opacity-50 mb-6">
              PORTFOLIO · {projects.length} PROJECTS
            </p>
            <h3 className="work-intro-title font-sans font-black tracking-tighter uppercase leading-[0.88]">
              REAL
              <br />
              IDEAS.
              <br />
              <span className="text-vermilion">BUILT.</span>
            </h3>
            <p className="work-intro-desc font-sans text-sm leading-relaxed mt-6">
              Four distinct systems where curiosity met code and ideas turned
              into real things.
            </p>
          </aside>

          <div className="work-viewport" ref={viewportRef}>
            <div className="work-track" ref={trackRef}>
              {projects.map((project, index) => (
                <article
                  key={project.slug}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="work-card"
                  data-theme={THEMES[index]}
                  data-active={index === 0 ? 'true' : 'false'}
                  aria-label={`Project ${project.number}: ${project.title}`}
                >
                  <span className="work-card-number" aria-hidden="true">
                    {project.number}
                  </span>
                  <div className="work-card-copy">
                    <p className="work-card-meta font-mono">
                      PROJECT {project.number} / {project.year}
                    </p>
                    <h3 className="work-card-title font-sans font-black tracking-tighter uppercase">
                      <Link href={`/project/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="work-card-tagline">{project.tagline}</p>
                    <p className="work-card-tags font-mono">
                      {project.tags.slice(0, 3).join(' / ')}
                    </p>
                    <Link
                      href={`/project/${project.slug}`}
                      className="work-card-cta font-mono"
                    >
                      VIEW PROJECT{' '}
                      <span className="text-vermilion">→</span>
                    </Link>
                  </div>
                  <div className="work-card-visual" aria-hidden="true">
                    <ProjectVisualMetaphor
                      type={project.visualType}
                      scrollProgress={1}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* ── Progress footer ── */}
        <footer className="work-footer font-mono text-xs tracking-widest">
          <ol className="work-index" aria-label="Project progress">
            {projects.map((project, index) => (
              <li
                key={project.slug}
                ref={(el) => {
                  indexRefs.current[index] = el;
                }}
                data-current={index === 0 ? 'true' : 'false'}
              >
                <span>{project.number}</span> {project.title}
              </li>
            ))}
          </ol>
          <span ref={counterRef}>01 / 0{projects.length}</span>
        </footer>
      </div>
    </section>
  );
}
