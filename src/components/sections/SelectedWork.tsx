'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { ProjectVisualMetaphor } from '../project/ProjectVisualMetaphor';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const HOLD = 1.7;
const MOVE = 1;
const FINAL_HOLD = 2.2;

export function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current!;
      const scenes = gsap.utils.toArray<HTMLElement>('.work-scene', section);
      const position = (offset: number) => offset === 0 ? 0 : offset > 0 ? offset * window.innerWidth * 0.72 : offset * window.innerWidth * 0.55;
      scenes.forEach((scene, index) => {
        gsap.set(scene.querySelector('.work-title'), { y: index ? 20 : 0 });
        gsap.set(scene.querySelector('[data-work-details]'), { opacity: index ? 0 : 1 });
        gsap.set(scene.querySelector('.work-number'), { opacity: index ? 0.06 : 0.18 });
        gsap.set(scene, { x: () => position(index), scale: index ? 0.92 : 1, opacity: index ? 0.45 : 1 });
      });
      scenes.forEach((scene, index) => {
        scene.inert = index !== 0;
        scene.setAttribute('aria-hidden', String(index !== 0));
      });
      let active = -1;
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'selected-work-stage', trigger: section, start: 'top top',
          end: () => `+=${window.innerHeight * 5.5}`,
          pin: true, pinSpacing: true, scrub: 0.85,
          anticipatePin: 1, invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const next = Math.min(projects.length - 1, Math.max(0, Math.floor((tl.time() + MOVE / 2) / (HOLD + MOVE))));
          if (active === next) return;
          active = next;
          setActiveIndex(next);
          scenes.forEach((scene, index) => {
            scene.inert = index !== next;
            scene.setAttribute('aria-hidden', String(index !== next));
            scene.style.zIndex = String(index === next ? 3 : 1);
          });
        },
      });
      tl.to({}, { duration: HOLD });
      for (let chapter = 1; chapter < scenes.length; chapter++) {
        const at = tl.duration();
        scenes.forEach((scene, index) => {
          const offset = index - chapter;
          tl.to(scene, {
            x: () => position(offset), scale: offset === 0 ? 1 : 0.92,
            opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.45 : 0,
            duration: MOVE, ease: 'none',
          }, at);
          tl.to(scene.querySelector('.work-title'), { y: offset === 0 ? 0 : 20, duration: MOVE, ease: 'none' }, at);
          tl.to(scene.querySelector('[data-work-details]'), { opacity: offset === 0 ? 1 : 0, duration: MOVE, ease: 'none' }, at);
          tl.to(scene.querySelector('.work-number'), { opacity: offset === 0 ? 0.18 : 0.06, duration: MOVE, ease: 'none' }, at);
          tl.fromTo(scene.querySelector('.work-visual'), { y: offset === 0 ? 12 : 0 }, { y: offset === 0 ? 0 : -12, duration: MOVE, ease: 'none', immediateRender: false }, at);
        });
        tl.to({}, { duration: chapter === scenes.length - 1 ? FINAL_HOLD : HOLD });
      }
      let disposed = false;
      let frame = 0;
      void document.fonts.ready.then(() => {
        if (!disposed) frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        scenes.forEach(scene => { scene.inert = false; scene.removeAttribute('aria-hidden'); scene.style.removeProperty('z-index'); });
      };
    }, sectionRef);
    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="work-section bg-charcoal text-paper border-t border-charcoal-elevated" aria-labelledby="work-heading">
      <div className="work-pin">
        <header className="work-header font-mono text-xs tracking-widest">
          <h2 id="work-heading"><span className="text-vermilion">02 / </span> SELECTED WORK</h2>
          <span className="text-paper-muted">ARCHITECTURES &amp; SYSTEMS</span>
        </header>
        <div className="work-stage">
          {projects.map((project, index) => (
            <article key={project.slug} className="work-scene" data-active={activeIndex === index} aria-label={`${project.number} ${project.title}`}>
              <span className="work-number" aria-hidden="true">{project.number}</span>
              <div className="work-copy">
                <p className="font-mono text-xs tracking-widest text-paper-muted mb-6">PROJECT {project.number} / {project.year}</p>
                <h3 className="work-title"><Link href={`/project/${project.slug}`}>{project.title}</Link></h3>
                <div data-work-details>
                  <p className="text-paper-muted text-base leading-relaxed mt-6 max-w-sm">{project.tagline}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-paper-muted mt-6">{project.tags.slice(0, 3).join(' / ')}</p>
                  <Link href={`/project/${project.slug}`} className="work-cta inline-flex items-center gap-5 mt-9 font-mono text-xs tracking-widest hover:text-vermilion">VIEW PROJECT <span className="text-vermilion">→</span></Link>
                </div>
              </div>
              <div className="work-visual" aria-hidden="true">
                <ProjectVisualMetaphor type={project.visualType} scrollProgress={1} />
              </div>
            </article>
          ))}
        </div>
        <footer className="work-footer font-mono text-xs text-paper-muted tracking-widest">
          <ol className="work-index" aria-label="Project progress">
            {projects.map((project, index) => <li key={project.slug} aria-current={index === activeIndex ? 'step' : undefined} className={index === activeIndex ? 'text-paper' : 'opacity-40'}><span className={index === activeIndex ? 'text-vermilion' : ''}>{project.number}</span> {project.title}</li>)}
          </ol><span>0{activeIndex + 1} / 04</span>
        </footer>
      </div>
    </section>
  );
}
