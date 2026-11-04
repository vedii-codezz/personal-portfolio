# Lotus loader implementation plan

**Goal:** Add the requested lotus-only opening sequence without changing the portfolio's design or content.

**Architecture:** A progressively enhanced fixed overlay contains individually shaded SVG petals, animated with the existing GSAP dependency. A pre-paint flag prevents content flashes; a small lifecycle controller handles inert content, document completion, bounded recovery, reduced motion, and cleanup. One master timeline owns the lotus and hero entrance; existing scroll animations remain independent.

**Reference:** Reviewed the uploaded 3.97-second video as eight sampled frames. Use its layered pink bloom and gentle unfolding; omit its text and figurative centerpiece as requested.

**Decisions:** Use local SVG rather than Spline to avoid publishing the sanctuary, downloading a 3D runtime, or introducing an external readiness delay. Replay on every full document load, including section links and restored documents. No storage or cookie skip flags. Internal navigation and theme changes do not replay. Normal duration approximately 3.63 seconds; reduced motion approximately 0.5 seconds. No new runtime dependencies.

**Refinement:** The theme-aware veil crossfades beneath the dark radial backdrop. Petals accelerate along ordered bent trajectories with staggered rotation and several larger foreground petals. Hero entrance starts at 2.52 seconds, overlapping the burst rather than following it. Portrait precedes staggered names and supporting UI. BFCache restarts the sequence and isolates stale document-recovery timers.

Root-page replay resets the browser-restored scroll offset before reveal so the sequence ends at the hero. Explicit section hashes preserve their navigation target. Refresh replay, both theme presentations, and the overlapping petal/hero frame were checked in the production browser; device-specific hard-refresh shortcuts, reduced-motion emulation, and true BFCache restoration remain manual checks.

- [x] Test lifecycle behavior before implementation: first visit, repeat visits, blocked storage, cleanup, and interaction recovery.
- [x] Implement loader component, shaded petals, GSAP bloom/expansion/radial wipe, and CSS.
- [x] Add the pre-paint guard and coordinate existing hero motion; preserve all sections and theme logic.
- [x] Verify lifecycle tests, existing theme checks, lint, TypeScript, production build, desktop/mobile browser presentation, and runtime logs.

**Verification:** Lifecycle test first failed for the missing controller, then passed with first-paint, storage, deep-link, interaction, Strict Mode and hydration-recovery checks. Existing theme checks pass. Lint and TypeScript pass. Production build passes. Browser checked at 1280×720 and 390×844: lotus-only opening, centered composition, overlay removal, original sections, no horizontal overflow on mobile, and clean warning/error logs after the GSAP scope correction. Reduced-motion path reviewed (0.5-second fade, no burst), but not visually emulated in the browser. A focused reviewer found one completion-listener cleanup issue; fixed with immediate idempotent teardown.

**Review focus:** No content flash before hydration; no interaction lock after failure or unmount; reduced motion avoids the burst; Strict Mode cleanup is reversible; no-JavaScript navigation remains available. All page content remains server-rendered. CSS contains a bounded recovery in addition to the JavaScript timeout.
