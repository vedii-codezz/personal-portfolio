# LUMA — Project 05

Added LUMA to Selected Work after Finora, VEYRA, APTLY, and Nikot-e-Metro. No dependencies were added.

## Verified project facts

Inspected LUMA at commit `f46aeeee804c52c4da556840032049381582355b`:

- [README](https://github.com/vedii-codezz/luma/blob/f46aeeee804c52c4da556840032049381582355b/README.md): editorial workspace, credential-free demo, subject organization, Supabase authentication, and private PDF storage code. Live mode requires a configured backend; AI/RAG, document extraction, generated quizzes, and computed mastery are not implemented.
- [Auth actions](https://github.com/vedii-codezz/luma/blob/f46aeeee804c52c4da556840032049381582355b/src/features/auth/actions.ts): signup, login, recovery/update, and logout implementations.
- [Study actions](https://github.com/vedii-codezz/luma/blob/f46aeeee804c52c4da556840032049381582355b/src/features/study/actions.ts): authenticated subject creation, edits, deletion, and workspace loading.
- [Document upload route](https://github.com/vedii-codezz/luma/blob/f46aeeee804c52c4da556840032049381582355b/src/app/api/documents/route.ts): authenticated private PDF storage without extraction/indexing.
- [Dashboard source](https://github.com/vedii-codezz/luma/blob/f46aeeee804c52c4da556840032049381582355b/src/components/views/DashboardView.tsx) and package metadata informed the visual direction and technology list. Demo mastery/tutor/quiz displays are not represented as completed live capabilities.

The short description, category, title, GitHub URL, and Live Demo URL match the supplied metadata exactly. The longer description distinguishes implemented flows from configuration requirements and planned AI functionality. LUMA's hosted authentication/storage were not integration-tested as part of this portfolio change.

## Artwork and layout

The new original visual study uses a dark mineral-green background, warm ivory LUMA wordmark, muted sage subject rail, and a central document/library composition. Inline SVG document sheets and CSS panels suggest the actual workspace architecture. It contains no stock photography, chatbot imagery, AI claims, or fake mastery metrics.

The existing original-visual-study label and conceptual footnote treatment are reused. Artwork uses the same compact frame and tiled cylinder renderer as the other projects. Existing artwork functions and styles are unchanged; the added styles are scoped to LUMA.

Card dimensions, typography, border radius, spacing, stage sizes, and responsive breakpoints are unchanged.

## Count and carousel

Selected Work now displays 05 / PROJECTS, derived from the data list rather than a hardcoded value. LUMA's card is labeled 05 / SELECTED WORK. The staggered navigation does not display a project count, so its six navigation chapters and behavior remain unchanged.

Neither CircularCarousel.tsx nor carousel-geometry.ts was modified. Existing count-based geometry changes the five-card angular step to 72 degrees and the desktop ring radius to approximately 239.5px. Curved surfaces, camera motion, momentum, snapping, dragging, keyboard controls, click-to-focus, offscreen pausing, active-link accessibility, and disabled autoplay remain intact.

## Files changed

Product:
- data/projects.ts — luma slug, fifth project record, and exact short carousel copy.
- components/SelectedWork.tsx — data-driven padded project count.
- components/ProjectVisual.tsx — new LumaArtwork and slug rendering.
- components/project-artwork.module.css — LUMA-only artwork styles.
- app/globals.css — LUMA-only visual palette.

Verification:
- scripts/luma.test.mjs — server-rendered five-card/count/link/order checks and five-position wraparound geometry.
- Existing carousel, compact-layout, ring, and navigation browser verifiers now derive counts/angles from project data.
- The ring verifier adds explicit five-position traversal, LUMA/Finora wraparound, actual LUMA link clicks, and both-theme captures.
- docs/luma-verification/ contains screenshots and measurements; this document records the implementation.

## Verification

All commands and browser checks listed below passed, including actual LUMA Live Demo/Source new-tab clicks and both directions of LUMA/Finora wraparound. Final LUMA captures were visually inspected in Bloom and After Dark.

Commands used:
- npm run lint
- npm run typecheck
- npm run build
- node --test scripts/luma.test.mjs scripts/carousel.test.mjs
- node scripts/verify-compact-carousel.mjs --luma
- node scripts/verify-ring-carousel.mjs --luma
- node scripts/verify-carousel-browser.mjs --quick
- Existing theme, lotus lifecycle, journey, closing-section, loader viewport, and floral coverage checks.

The new five-card rendering tests failed against the four-project implementation before the addition, then passed. Browser layout checks cover 320×640, 390×844, 768×1024, 1366×768, 1440×900, and 1920×1080 in both themes. All five cards are checked for content/artwork containment, real 3D placement, and page overflow; vertical touch scrolling and dragging across links are also exercised.

Browser verification uses Chromium and emulated touch rather than physical devices, other browser engines, or screen-reader sessions. Independent review found no actionable scope or product regressions. Motion-preference tests explicitly wait for the media change and return the gallery to view before waiting for animation; no carousel mechanics were changed to accommodate the tests.
