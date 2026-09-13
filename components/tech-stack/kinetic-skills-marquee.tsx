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
    const container = containerRef.current;
    if (!track1 || !track2 || !container) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      track1.style.transform = "none";
      track2.style.transform = "none";
    }

    let pos1 = 0;
    let pos2 = 0;
    const baseSpeed1 = 0.9; // Base movement left (pixels per frame)
    const baseSpeed2 = 0.7; // Base movement right (pixels per frame)
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let animFrameId: number | null = null;
    let isRunning = false;
    let hasActivated = false;
    let activationTimer: ReturnType<typeof setTimeout> | null = null;
    let intersectionRatio = 0;
    let isIntersecting = false;
    const hasObserver = "IntersectionObserver" in window;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Add scroll impulse to velocity (clamped to prevent jarring jumps)
      const impulse = Math.max(-14, Math.min(14, delta * 0.12));
      scrollVelocity += impulse;
    };

    const loop = () => {
      if (!isRunning) return;

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

    const startAnimation = () => {
      if (isRunning || mediaQuery.matches) return;
      isRunning = true;
      lastScrollY = window.scrollY;
      window.addEventListener("scroll", onScroll, { passive: true });
      animFrameId = requestAnimationFrame(loop);
    };

    const pauseAnimation = () => {
      if (!isRunning) return;
      isRunning = false;
      window.removeEventListener("scroll", onScroll);
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    };

    const clearActivation = () => {
      if (activationTimer !== null) clearTimeout(activationTimer);
      activationTimer = null;
    };

    const syncVisibility = () => {
      if (mediaQuery.matches) {
        clearActivation();
        pauseAnimation();
        scrollVelocity = 0;
        track1.style.transform = "none";
        track2.style.transform = "none";
        return;
      }
      if (!hasObserver) {
        startAnimation();
        return;
      }
      if (isIntersecting && intersectionRatio >= 0.35) {
        // Meaningfully visible in viewport (threshold ~35%)
        if (!hasActivated) {
          // First arrival: small intentional delay (450ms) before wake up
          if (activationTimer === null) {
            activationTimer = setTimeout(() => {
              activationTimer = null;
              if (mediaQuery.matches || !isIntersecting || intersectionRatio < 0.15) return;
              hasActivated = true;
              startAnimation();
            }, 450);
          }
        } else {
          // Subsequent re-entry: resume immediately from existing position
          clearActivation();
          startAnimation();
        }
      } else if (!isIntersecting || intersectionRatio < 0.15) {
        // Substantially outside viewport: pause loop to conserve resources
        clearActivation();
        pauseAnimation();
      }
    };

    const observer = hasObserver ? new IntersectionObserver(entries => {
      const entry = entries[0];
      if (!entry) return;
      intersectionRatio = entry.intersectionRatio;
      isIntersecting = entry.isIntersecting;
      syncVisibility();
    }, { threshold: [0, 0.15, 0.35] }) : null;
    observer?.observe(container.closest("section") || container);
    mediaQuery.addEventListener("change", syncVisibility);
    syncVisibility();

    return () => {
      clearActivation();
      pauseAnimation();
      observer?.disconnect();
      mediaQuery.removeEventListener("change", syncVisibility);
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

      {/* Single Compact Status Line: Loud in motion, light in surrounding information */}
      <div className="mt-8 pt-6 border-t border-line/30 flex items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse motion-reduce:animate-none" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-secondary">
            CURRENTLY LEARNING // JAVA / DATA SCIENCE
          </span>
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
