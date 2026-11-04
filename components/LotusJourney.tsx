"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Hand-drawn Bézier paths, ordered from the heart of the bloom outwards.
const petals = [
  "M140 310C96 273 91 229 140 176C189 229 184 273 140 310Z",
  "M140 310C112 273 110 244 140 207C170 244 168 273 140 310Z",
  "M140 310C123 291 125 273 140 253C155 273 157 291 140 310Z",
  "M140 310C95 299 57 276 49 230C91 231 115 248 140 310Z",
  "M140 310C185 299 223 276 231 230C189 231 165 248 140 310Z",
  "M140 310C99 278 57 270 20 286C57 321 95 329 140 310Z",
  "M140 310C181 278 223 270 260 286C223 321 185 329 140 310Z",
  "M140 310C109 304 84 315 68 337C103 326 112 351 140 310Z",
  "M140 310C171 304 196 315 212 337C177 326 168 351 140 310Z",
];
const leaves = [
  "M106 163C97 141 111 131 121 121C120 142 113 148 106 163Z",
  "M141 401C104 368 81 381 57 393C89 388 105 420 141 401Z",
  "M165 449C165 424 181 419 193 410C188 435 176 435 165 449Z",
  "M148 510C166 478 202 478 220 485C193 493 182 520 148 510Z",
  "M125 542C107 519 117 503 128 491C133 514 120 523 125 542Z",
  "M112 626C116 594 136 589 151 582C144 605 130 622 112 626Z",
];
const curls = [
  "M110 204C61 153 118 101 91 78C70 60 53 76 65 86",
  "M108 186C123 141 167 134 190 150C216 168 209 190 198 182",
  "M76 282C43 231 6 246 11 289C14 316 29 333 38 339",
  "M185 251C208 217 246 221 254 245C261 265 247 275 241 267",
  "M141 401C99 368 85 420 111 426C130 431 125 413 119 417",
  "M165 449C131 413 98 441 111 459C119 469 129 461 123 455",
  "M125 542C151 506 201 535 183 553C174 563 161 557 168 549",
  "M112 626C129 589 183 610 174 635C169 649 152 650 154 640",
];

export function LotusJourney() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    const section = svg?.closest(".story");
    if (!svg || !section) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const paths = svg.querySelectorAll<SVGPathElement>("[data-draw]");
      paths.forEach(path => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, fillOpacity: 0 });
      });
      const dots = svg.querySelectorAll("[data-dot]");
      gsap.set(dots, { opacity: 0 });
      const timeline = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
        trigger: section, start: "top 85%", end: "bottom 80%", scrub: 1,
        invalidateOnRefresh: true,
      } });
      const draw = (selector: string, at: number, duration: number, stagger = 0) => {
        timeline.to(svg.querySelectorAll(selector), { strokeDashoffset: 0, duration, stagger }, at);
      };
      timeline.to(svg.querySelectorAll('[data-dot="entrance"]'), { opacity: 1, duration: .12, stagger: .04 }, 0);
      draw('[data-draw="crown"]', .05, .2);
      draw('[data-draw="upper"]', .15, .4);
      draw('[data-draw="petal"]', .22, .25, .045);
      timeline.to(svg.querySelectorAll('[data-draw="petal"]'), { fillOpacity: .26, duration: .3, stagger: .025 }, .5);
      draw('[data-draw="vine"]', .78, 1.1);
      draw('[data-draw="curl"]', .2, .28, .17);
      draw('[data-draw="leaf"]', .32, .23, .23);
      timeline.to(svg.querySelectorAll('[data-draw="leaf"]'), { fillOpacity: .5, duration: .2, stagger: .23 }, .5);
      timeline.to(svg.querySelectorAll('[data-dot="vine"]'), { opacity: 1, duration: .1, stagger: .09 }, .85);
      draw('[data-draw="finish"]', 1.85, .22);
      timeline.to(svg.querySelectorAll('[data-dot="finish"]'), { opacity: 1, duration: .1, stagger: .05 }, 2.05);

      const vine = svg.querySelector<SVGPathElement>('[data-draw="vine"]')!;
      const marker = svg.querySelector<SVGGElement>(".journey-traveler")!;
      // Sample geometry once. Scroll frames only interpolate cached coordinates.
      const length = vine.getTotalLength();
      const points = Array.from({ length: 201 }, (_, i) => vine.getPointAtLength(length * i / 200));
      const travel = { progress: 0 };
      gsap.set(marker, { opacity: 0 });
      timeline.to(marker, { opacity: .85, duration: .08 }, .78);
      timeline.to(travel, { progress: 1, duration: 1.1, onUpdate: () => {
        const index = travel.progress * 200;
        const a = points[Math.floor(index)];
        const b = points[Math.min(200, Math.floor(index) + 1)];
        const fraction = index % 1;
        marker.setAttribute("transform", `translate(${a.x + (b.x - a.x) * fraction} ${a.y + (b.y - a.y) * fraction})`);
      } }, .78);
      timeline.to(marker, { opacity: 0, duration: .15 }, 1.88);
      let disposed = false;
      void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
      return () => { disposed = true; };
    }, svg);
    return () => media.revert();
  }, []);

  return <svg ref={ref} className="lotus-journey" viewBox="0 0 280 800" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <g className="journey-dots" fill="currentColor" stroke="none">
      {[13, 27, 44].map((y, i) => <circle key={y} data-dot="entrance" cx="140" cy={y} r={i === 2 ? 2.5 : 1.2} />)}
      {[[52, 348], [43, 337], [93, 468], [91, 480], [91, 492], [192, 565], [195, 577], [194, 589], [109, 675], [113, 686]].map(([x, y]) => <circle key={y} data-dot="vine" cx={x} cy={y} r={y % 2 ? 2 : 1.2} />)}
      {[765, 780, 792].map(y => <circle key={y} data-dot="finish" cx="140" cy={y} r={y === 765 ? 2.4 : 1.2} />)}
    </g>
    <g className="journey-diamonds">
      <path data-draw="crown" d="M140 56C138 73 135 79 126 86C135 90 138 98 140 111C142 98 145 90 154 86C145 79 142 73 140 56Z" />
      <path data-draw="finish" d="M140 714C138 731 135 737 126 744C135 748 138 756 140 766C142 756 145 748 154 744C145 737 142 731 140 714Z" />
    </g>
    <path className="journey-primary" data-draw="upper" d="M140 310C55 236 117 176 140 139C150 123 151 115 150 108" />
    <g className="journey-petals">{petals.map(d => <path key={d} data-draw="petal" d={d} />)}</g>
    <path className="journey-primary" data-draw="vine" d="M140 310C146 336 98 350 125 387C162 431 191 449 160 495C135 534 91 558 109 605C120 635 159 663 140 714" />
    <g className="journey-curls">{curls.map(d => <path key={d} data-draw="curl" d={d} />)}</g>
    <g className="journey-leaves">{leaves.map(d => <path key={d} data-draw="leaf" d={d} />)}</g>
    <g className="journey-traveler" opacity="0"><path d="M0 -7C-6 -1-4 3 0 6C4 3 6 -1 0 -7ZM0 6C-7 6-9 2-9 -1C-4 -1-2 2 0 6C2 2 4 -1 9 -1C9 2 7 6 0 6Z" /></g>
  </svg>;
}
