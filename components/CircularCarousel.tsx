"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cylinderPosition, snapTarget, wrapIndex } from "./carousel-geometry";

export type CircularCarouselItem = { id: string; title: string; content: ReactNode };
type Props = {
  items: readonly CircularCarouselItem[];
  cardWidth?: number; gap?: number; perspective?: number; momentum?: number;
  depthFade?: number; cornerRadius?: number;
};

// Card wrappers own all spatial transforms. Artwork and the page's GSAP timelines
// never write to these nodes. Autoplay is deliberately absent: reading comes first.
export default function CircularCarousel({ items, cardWidth = 276, gap = 25, perspective = 2500, momentum = .6, depthFade = .35, cornerRadius = 12 }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const position = useRef(0);
  const target = useRef(0);
  const frame = useRef(0);
  const reduced = useRef(false);
  const width = useRef(cardWidth);
  const drag = useRef<{ id: number; startX: number; startY: number; lastX: number; lastTime: number; origin: number; velocity: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [active, setActive] = useState(0);

  const paint = () => {
    cards.current.forEach((card, index) => {
      if (!card) return;
      const p = cylinderPosition(index, position.current, items.length, width.current, width.current <= 260 ? -45 : gap);
      const visible = Math.abs(p.angle) < 100;
      card.style.transform = reduced.current
        ? `translate3d(${(index === wrapIndex(Math.round(position.current), items.length) ? 0 : Math.sign(p.x) * (width.current + gap))}px,0,0)`
        : `translate3d(${p.x}px,0,${p.z}px) rotateY(${p.angle}deg)`;
      card.style.opacity = visible ? String(1 - Math.min(1, Math.abs(p.angle) / 90) * depthFade) : "0";
      card.style.visibility = visible ? "visible" : "hidden";
      card.style.zIndex = String(100 - Math.round(Math.abs(p.angle)));
    });
  };
  const animate = () => {
    cancelAnimationFrame(frame.current);
    const tick = () => {
      const delta = target.current - position.current;
      position.current = reduced.current || Math.abs(delta) < .001 ? target.current : position.current + delta * .12;
      paint();
      if (position.current !== target.current) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };
  const focus = (next: number) => {
    target.current = next;
    setActive(wrapIndex(next, items.length));
    animate();
  };

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      reduced.current = media.matches;
      width.current = cards.current[0]?.getBoundingClientRect().width || cardWidth;
      // Read the untransformed size, since perspective changes bounding boxes.
      width.current = cards.current[0]?.offsetWidth || width.current;
      paint();
    };
    const observer = new ResizeObserver(measure);
    if (root.current) observer.observe(root.current);
    media.addEventListener("change", measure);
    measure();
    return () => { observer.disconnect(); media.removeEventListener("change", measure); cancelAnimationFrame(frame.current); };
    // Geometry is refreshed only when its inputs change, not on active-slide renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardWidth, gap, depthFade, items.length]);

  return <div ref={root} className="circular-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects"
    style={{ "--carousel-width": `${cardWidth}px`, "--carousel-perspective": `${perspective}px`, "--carousel-radius": `${cornerRadius}px` } as CSSProperties}>
    <p className="carousel-instruction" id="carousel-help">Drag to explore · or use the arrows</p>
    <div className="carousel-stage" tabIndex={0} aria-label="Project gallery" aria-describedby="carousel-help"
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          focus(event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : target.current + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}
      onPointerDown={event => {
        suppressClick.current = false;
        if (event.button !== 0 || (event.target as HTMLElement).closest("a,button:not(.carousel-preview)") || drag.current) return;
        cancelAnimationFrame(frame.current);
        suppressClick.current = false;
        drag.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, lastTime: event.timeStamp, origin: position.current, velocity: 0, moved: false };
      }}
      onPointerMove={event => {
        const d = drag.current;
        if (!d || d.id !== event.pointerId) return;
        const dx = event.clientX - d.startX;
        if (!d.moved) {
          if (Math.abs(event.clientY - d.startY) > Math.abs(dx) && Math.abs(event.clientY - d.startY) > 8) { drag.current = null; animate(); return; }
          if (Math.abs(dx) < 7) return;
          d.moved = true;
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        d.velocity = -(event.clientX - d.lastX) / Math.max(8, event.timeStamp - d.lastTime) * 180 / width.current;
        d.lastX = event.clientX; d.lastTime = event.timeStamp;
        position.current = d.origin - dx / (width.current + gap);
        paint();
      }}
      onPointerUp={event => {
        const d = drag.current;
        if (!d || d.id !== event.pointerId) return;
        drag.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        if (d.moved) {
          suppressClick.current = true;
          focus(snapTarget(position.current, event.timeStamp - d.lastTime > 100 ? 0 : d.velocity, momentum));
        } else animate();
      }}
      onPointerCancel={() => { drag.current = null; focus(Math.round(position.current)); }}
      onPointerLeave={() => {
        // Before capture starts, a release outside will not reach this surface.
        if (drag.current && !drag.current.moved) { drag.current = null; animate(); }
      }}
      onLostPointerCapture={event => {
        // Touch starts with implicit capture on the artwork. Its bubbling loss
        // during transfer to the stage is not the end of the swipe.
        if (event.target === event.currentTarget && drag.current) { drag.current = null; focus(Math.round(position.current)); }
      }}
      onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
      <div className="carousel-cylinder">
        {items.map((item, index) => <div key={item.id} ref={element => { cards.current[index] = element; }}
          className="carousel-card" data-active={index === active} role="group" aria-roledescription="slide"
          aria-label={`${index + 1} of ${items.length}: ${item.title}`} inert={index !== active}
          onClick={event => { if (!(event.target as HTMLElement).closest("a,button") && index !== active) focus(target.current + (wrapIndex(index - active + items.length / 2, items.length) - items.length / 2)); }}>
          {item.content}
        </div>)}
      </div>
      {/* Inert cards retain pointer focus targets through separate accessible preview buttons. */}
      <button className="carousel-preview carousel-preview-prev" tabIndex={-1} aria-hidden="true" onClick={() => focus(target.current - 1)} />
      <button className="carousel-preview carousel-preview-next" tabIndex={-1} aria-hidden="true" onClick={() => focus(target.current + 1)} />
    </div>
    <div className="carousel-controls">
      <button type="button" aria-label="Previous project" onClick={() => focus(target.current - 1)}>←</button>
      <div className="carousel-dots">{items.map((item, index) => <button type="button" key={item.id} aria-label={`Show ${item.title}`} aria-current={index === active ? "true" : undefined} onClick={() => focus(target.current + (wrapIndex(index - active + items.length / 2, items.length) - items.length / 2))}><span /></button>)}</div>
      <button type="button" aria-label="Next project" onClick={() => focus(target.current + 1)}>→</button>
    </div>
    <span className="carousel-sr" role="status" aria-live="polite" aria-atomic="true">{items[active]?.title}, project {active + 1} of {items.length}</span>
  </div>;
}
