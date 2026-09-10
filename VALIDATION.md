# Milestone 2 audit — 10 September 2026

## Scope and result
Audited the existing cinematic reel without rebuilding the architecture, adding sections, routes, dependencies, or Milestone 3 work. Development preview remains running at http://127.0.0.1:4173.

## Required commands
- `npm run typecheck`: passed.
- `npm run build`: passed; Next.js 16.3.4 production compilation, TypeScript and prerendering completed.
- `npm test -- --maxWorkers=1 --no-file-parallelism`: all 6 tests passed after the fixes.

## Browser checks
| Viewport | Result |
| --- | --- |
| 1440 × 1000 | One pinned stage. All four chapters reached via the index, with matching active indicator and track position. Final chapter aligns with the stage; no horizontal overflow. Hero face remains unobscured. |
| 1280 × 800 | One pinned stage. Reverse chapter navigation works. Expanded Aptly explanation and caption now fit completely. No horizontal overflow. |
| 768 × 1024 | Pinned mode as configured. Aptly matrix, copy and links fit. No horizontal overflow. |
| 767 × 1024 | Breakpoint teardown removes the pin spacer and hidden/inert panel states; all four chapters return vertically. No horizontal overflow. |
| 390 × 844 | Zero pin spacers, zero hidden project panels, four vertically ordered chapters. Diagram and text bounds stay inside the viewport. No horizontal overflow. |
| 320 × 740 | Zero pin spacers, all four chapters visible in the document. All SVG labels remain inside the viewport after legibility polish. Final chapter and hero visually inspected. No horizontal overflow. |

- Pinned sequence begins at the stage, immediately after its section label. Ending the sequence leaves the last chapter visible with only the intended 48px bottom padding, not an empty viewport or oversized gap.
- Track uses `scrub: 0.4`; chapter moves respond promptly and settle at the expected panel. No per-descendant fly-in choreography was introduced.
- Browser DOM confirms inactive chapters have `inert` and `aria-hidden`; the active chapter has neither. Keyboard reverse-tab from the index reaches the active Aptly disclosure and GitHub link, skipping inactive project links. Native Live/GitHub anchors retain all six supplied destinations and external-link attributes; destination-site availability is outside this audit.
- Aptly's native WHY? disclosure opens and closes correctly. Its expanded caption was rechecked against viewport bounds after the fix.
- FINORA, APTLY, VEYRA, NIKOT-E-METRO remain present. Nikot-e-Metro has zero destination links.
- Home returned to `#top` with scrollY 0; Intro landed about 32px below the viewport top; Work reached the section and chapter index. Portrait image loaded successfully through Next Image.
- Final browser console capture: zero warnings and zero errors.

## Bugs and polish
1. **Expanded matrix clipping:** at 1280 × 800, Aptly's open explanation pushed its caption approximately 7px past the clipped viewport. Extended compact-stage spacing to 860px height and reduced matrix padding. Caption bounds now fit.
2. **Diagram labels too small:** SVG viewBox scaling reduced labels to around 6–8px on phones. Increased narrow-layout SVG type and moved Finora's agent labels above their nodes with right alignment. Labels remain within bounds at 320px.
3. **Off-screen animation work:** Finora's active path could animate even while the entire stage was outside the viewport. Gate its CSS animation on the pinned trigger's active state, and remove that state on cleanup.

## Final motion architecture and performance
- Existing PortfolioShell client lifecycle owns `gsap.context()` and `gsap.matchMedia()` cleanup.
- Desktop ≥768px, height ≥620px, no reduced-motion preference: one `project-reel` pinned ScrollTrigger, one master timeline, one translating track, scrub 0.4.
- Intro retains one once-only entrance trigger. Mobile uses one once-only track entrance instead of a pinned trigger. Hero entrance remains a non-scroll timeline. No per-row, per-letter, or diagram ScrollTriggers.
- Chapter index and panel accessibility mutate only when the rounded chapter index changes; no React state updates occur in scroll callbacks.
- Track measurements occur during setup/refresh through GSAP's invalidated function values. The per-frame callback checks timeline progress and performs no layout measurements; no custom read/write layout-thrashing loop.
- Source and computed-style audit found no permanent `will-change`. No blur, WebGL, new dependencies, or multiple fullscreen effect layers. Only the bounded active SVG path animates, and only while the stage is active. No GPU/FPS profiling claim is made.

## Reduced motion and cleanup evidence
Real GSAP/ScrollTrigger tests in jsdom verify: reduced-motion startup creates no DOM motion or pin; live preference change removes the pin spacer, hidden states, transforms and clipping; remount does not accumulate triggers; exactly one primary pin is created; index changes follow chapter thresholds; mobile and short-height modes stay unpinned. Browser breakpoint changes independently confirmed spacer and accessibility-state cleanup.

The preview browser exposes viewport overrides but no reduced-motion emulation control. Reduced-motion preference changes were therefore tested with a simulated media query in the actual GSAP lifecycle tests, not by changing the user's OS preference. CSS also disables smooth scrolling/transitions and path animation under reduced motion; all static chapter content remains the baseline. This is the remaining browser-emulation limitation.

## Files modified during this audit
- `app/work.css`: compact matrix spacing, legible narrow SVG labels, active-stage path-animation gate.
- `components/work/project-visual.tsx`: Finora label positioning.
- `lib/project-reel.ts`: stage-active animation state and teardown.
- `tests/animations.test.ts`: short-height fallback and intermediate chapter-threshold assertions.
- `VALIDATION.md`: this audit and findings.

No files or dependencies were added during the audit. Milestone 3 has not started.

---

# Milestone 1 validation — archived

## Checks completed
- `npm run typecheck`: passed.
- `npm run build`: passed on Next.js 16.3.4; home page successfully prerendered. No static export configuration is used; Next serves the application and image optimization.
- `npm test -- --maxWorkers=1 --no-file-parallelism`: 3 tests passed.
- Next development server returns HTTP 200 at http://127.0.0.1:4173.
- Browser console after navigation and responsive checks: no warnings or errors captured.
- Desktop 1440 × 1000: hero and dark Intro visually inspected; portrait loaded; no horizontal overflow (scroll width equals client width, 1425px excluding scrollbar).
- Tablet 768 × 1024: hero/photo layout visually inspected; image loaded; no horizontal overflow (753px client and scroll width).
- Mobile 390 × 844: hero crop and Selected Work visually inspected; no horizontal overflow.
- Narrow mobile 320 × 740: project text and final entry inspected; no horizontal overflow (305px client and scroll width); headings, paragraphs, metadata, and navigation remain inside the viewport.
- Portrait: optimized `/_next/image` response loaded successfully; real source dimensions supplied to Next Image are 2048 × 3104. Desktop object position 50% 53%; mobile 50% 58%. CSS cover crops without stretching.
- Desktop Intro anchor landed at about 32px from viewport top. Mobile Selected Work and tablet hero work anchor also landed at about 32px. Home anchor returned to the hero.
- Four projects present; Nikot-e-Metro renders zero links. Other destinations match supplied configuration; external destination contents were not audited.
- Reduced-motion startup creates no DOM animation or section triggers. Switching to reduced motion restores opacity, transforms, and clipping. Cleanup/remount does not accumulate ScrollTriggers. These checks use the actual GSAP implementation in jsdom with a simulated media query; the preview browser did not expose a reduced-motion emulation control, so OS-level reduced-motion rendering was not directly browser-tested. The CSS reduced-motion rule disables smooth scrolling and transitions.
- Temporary viewport overrides were reset. The local preview remains running; no deployment or Milestone 2 work was performed.

## Files created
- `package.json`, `package-lock.json`: exact dependency versions and development/build/test commands.
- `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`: Next.js, TypeScript, Tailwind and workspace configuration.
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`: local fonts/metadata, page composition, monochrome design system and responsive styles.
- `components/layout/portfolio-shell.tsx`: client motion lifecycle boundary.
- `components/navigation/navigation.tsx`, `components/hero/hero.tsx`, `components/intro/intro.tsx`: initial page sections.
- `components/work/selected-work.tsx`, `components/work/project-track.tsx`, `components/work/project-item.tsx`: reusable index/track/item structure.
- `components/ui/external-link.tsx`, `components/ui/section-label.tsx`: shared presentation primitives.
- `data/portfolio.ts`, `data/projects.ts`: centralized copy and typed project records.
- `lib/animations.ts`: GSAP/ScrollTrigger infrastructure.
- `public/images/bedantika.jpg`: supplied portrait copied unchanged.
- `tests/animations.test.ts`: reduced-motion and lifecycle verification.
- `README.md`, `VALIDATION.md`: run instructions and validation report.
- Next-generated: `next-env.d.ts`, `AGENTS.md`, `CLAUDE.md`.

## Files modified
- `IMPLEMENTATION_PLAN.md`, `DESIGN_SYSTEM.md`: revised before implementation to reflect the approved stack, scope, and visual decisions.
- `.openai/hosting.json`: retained the existing project identity and removed obsolete static-directory configuration.

## Files removed
- `dist/index.html`, `dist/styles.css`, `dist/script.js`, `dist/content.js`, `dist/portrait.jpg` and the empty `dist` directory.
- `preview.cjs`: replaced by the Next development server.

No About, Tech Stack, Lab, Contact, project case studies, or pinned sequences were added. Email and LinkedIn remain null. Framer Motion was not added because the current interactions are entirely owned by GSAP.
