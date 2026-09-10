"use client";

import { useEffect, useRef } from "react";

interface KineticSkillsMarqueeProps {
  primarySkills: readonly string[];
  secondaryStatus: readonly { name: string; status: string }[];
}

export function KineticSkillsMarquee({
  primarySkills,
  secondaryStatus,
}: KineticSkillsMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!track1 || !track2) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      track1.style.transform = "none";
      track2.style.transform = "none";
      return;
    }

    let pos1 = 0;
    let pos2 = 0;
    let baseSpeed1 = 0.9; // Base movement left (pixels per frame)
    let baseSpeed2 = 0.7; // Base movement right (pixels per frame)
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let animFrameId: number;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Add scroll impulse to velocity (clamped to prevent jarring jumps)
      const impulse = Math.max(-14, Math.min(14, delta * 0.12));
      scrollVelocity += impulse;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const loop = () => {
      // Half width of track content for seamless wrapping
      const halfWidth1 = track1.scrollWidth / 2;
      const halfWidth2 = track2.scrollWidth / 2;

      // Inertial decay: return scrollVelocity smoothly back to 0
      scrollVelocity *= 0.92;

      // Effective speeds with scroll velocity influence
      const currentSpeed1 = baseSpeed1 + scrollVelocity * 0.7;
      const currentSpeed2 = baseSpeed2 - scrollVelocity * 0.5;

      pos1 -= currentSpeed1;
      pos2 += currentSpeed2;

      // Seamless wrap around
      if (halfWidth1 > 0) {
        if (pos1 <= -halfWidth1) pos1 += halfWidth1;
        if (pos1 > 0) pos1 -= halfWidth1;
      }

      if (halfWidth2 > 0) {
        if (pos2 >= 0) pos2 -= halfWidth2;
        if (pos2 < -halfWidth2) pos2 += halfWidth2;
      }

      track1.style.transform = `translate3d(${pos1}px, 0, 0)`;
      track2.style.transform = `translate3d(${pos2}px, 0, 0)`;

      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);

    const onMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(animFrameId);
        window.removeEventListener("scroll", onScroll);
        track1.style.transform = "none";
        track2.style.transform = "none";
      }
    };

    mediaQuery.addEventListener("change", onMediaChange);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("scroll", onScroll);
      mediaQuery.removeEventListener("change", onMediaChange);
    };
  }, []);

  // Prepare repeated tracks for continuous wrapping
  const repeatedTrack1 = [...primarySkills, ...primarySkills, ...primarySkills, ...primarySkills];
  const reversedSkills = [...primarySkills].reverse();
  const repeatedTrack2 = [...reversedSkills, ...reversedSkills, ...reversedSkills, ...reversedSkills];

  return (
    <div className="kinetic-marquee-wrapper overflow-hidden py-6 sm:py-8 border-y border-line my-10 select-none" ref={containerRef}>
      {/* Row 01: Enormous Filled Typography moving LEFT */}
      <div className="overflow-hidden py-2">
        <div
          ref={track1Ref}
          className="marquee-track inline-flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform"
          aria-hidden="true"
        >
          {repeatedTrack1.map((skill, index) => (
            <span
              key={`r1-${skill}-${index}`}
              className="font-sans font-extrabold uppercase tracking-tighter text-primary text-4xl sm:text-6xl md:text-8xl lg:text-9xl shrink-0 transition-opacity hover:opacity-80"
            >
              {skill} <span className="text-secondary/40 font-mono font-normal text-2xl sm:text-4xl lg:text-6xl ml-4 sm:ml-8">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 02: Outlined Typography moving RIGHT */}
      <div className="overflow-hidden py-2">
        <div
          ref={track2Ref}
          className="marquee-track inline-flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform"
          aria-hidden="true"
        >
          {repeatedTrack2.map((skill, index) => (
            <span
              key={`r2-${skill}-${index}`}
              className="font-sans font-extrabold uppercase tracking-tighter text-4xl sm:text-6xl md:text-8xl lg:text-9xl shrink-0"
              style={{
                WebkitTextStroke: "1.5px rgba(243, 243, 239, 0.5)",
                color: "transparent",
              }}
            >
              {skill} <span className="font-mono font-normal text-2xl sm:text-4xl lg:text-6xl ml-4 sm:ml-8" style={{ WebkitTextStroke: "1px rgba(163, 163, 160, 0.4)", color: "transparent" }}>//</span>
            </span>
          ))}
        </div>
      </div>

      {/* Secondary Status Strip: Currently Learning / Progressing */}
      <div className="mt-8 pt-6 border-t border-line/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-secondary">
            CURRENTLY LEARNING &amp; EXPANDING
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-8 font-mono text-xs">
          {secondaryStatus.map((item) => (
            <div key={item.name} className="flex items-center gap-2 border border-line bg-raised/40 px-3 py-1.5 rounded">
              <span className="text-primary font-medium">{item.name}</span>
              <span className="text-secondary/60">[{item.status}]</span>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Screen-Reader Summary */}
      <div className="sr-only">
        <h3>Primary technical skill set:</h3>
        <p>{primarySkills.join(", ")}</p>
        <h3>Currently learning:</h3>
        <p>{secondaryStatus.map(s => `${s.name} (${s.status})`).join(", ")}</p>
      </div>
    </div>
  );
}
