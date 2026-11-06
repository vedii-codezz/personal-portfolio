# Selected Work cylindrical carousel

Implemented on 6 November 2026. The change is limited to Selected Work, its artwork presentation, its former GSAP effects, and verification resources.

## Files

New components:
- `components/CircularCarousel.tsx`: client-side, user-controlled cylinder with a typed React content renderer.
- `components/carousel-geometry.ts`: cylinder coordinates, circular indexing, and bounded momentum snapping.

Modified:
- `components/SelectedWork.tsx`: retains the section header/count and renders the four editorial cards in their original order.
- `data/projects.ts`: adds carousel-specific descriptions; preserves original project facts, longer descriptions, and URLs.
- `components/ProjectVisual.tsx`: adds an optional compact presentation.
- `components/project-artwork.module.css`: fits all four original illustrations into the card artwork field.
- `app/globals.css`: scoped carousel framing, responsive dimensions, controls, focus, and theme-aware fades.
- `components/PortfolioMotion.tsx`: removes only the former project-grid reveals, pointer-follow, and per-project scroll parallax.

No dependencies were added or upgraded.

## Geometry and interaction

Each card moves on a cylinder using x = radius × sin(angle), z = radius × (cos(angle) − 1), and rotateY(angle), viewed through CSS perspective. Neighboring projects occupy angled depth planes; the far side is hidden. Wrapped angular positions preserve the four-project order without duplicating cards or links.

Pointer movement directly updates cylinder position. Release projects a bounded amount of velocity, rounds to a project, then eases to center using requestAnimationFrame. Previous/next, project dots, side previews, and keyboard navigation use the same target position. Autoplay is disabled. Animation frames, resize observation, and motion preference listeners are cleaned up on unmount.

Links use original data URLs, actual anchors, new tabs, and noopener/noreferrer. Pointer-down on links does not start dragging; a completed drag suppresses its follow-up click. Touch capture transfer from artwork to stage is distinguished from genuine stage capture loss.

## Artwork and layout

Artwork occupies 55% of each card. Compact spacing preserves Finora's agents and orbit, VEYRA's ribbons, APTLY's evidence sheet, and the metro's Bengali branding and network. The remaining area contains Instrument Serif titles, Newsreader copy, and consistently placed Live Demo and Source links.

Desktop cards are 360 × 610px. Below 768px, cards are up to 300 × 570px; at 320px the width becomes 248px. Smaller screens use a tighter cylinder radius and 1800px perspective, exposing small neighbor previews. The gallery clips its own horizontal overflow. Pan-y and pinch-zoom remain available for touch scrolling and zoom.

## GSAP and accessibility

The carousel exclusively owns spatial card transforms. Existing section-header reveal hooks remain, as do the portfolio:reveal/portfolio:ready lifecycle and all unrelated motion code. No per-card ScrollTriggers were introduced.

The stage supports Left/Right, Home, and End. Labeled previous/next and named project controls provide accessible alternatives to dragging. Only the active card is interactive and exposed through the slide group; inactive cards are inert and can be selected through the named controls. A polite status announces the selected project. Links and controls have visible focus indicators. Reduced motion removes depth rotation and interpolation while preserving navigation.

## Verification

All commands and browser assertions listed below passed. A failing emulated-touch swipe exposed an implicit pointer-capture transfer bug; the same test passed after the capture-loss handler was corrected. Independent code review also identified a pending gesture after release outside the stage before the drag threshold. A browser regression reproduced it, and pending gestures now clear on pointer leave. The reviewer confirmed the fix with no remaining actionable findings.

- `node --test scripts/carousel.test.mjs`: wrapping, curved depth geometry, and bounded release snapping.
- `npm run lint`, `npm run typecheck`, and `npm run build`.
- Existing theme, lotus loader, journey, closing sections, loader viewport, and floral coverage scripts.
- `node scripts/verify-carousel-browser.mjs`: isolated installed Chromium with native CDP, using the production server on port 3001.
- Screenshots: `docs/carousel-verification/{320,390,768,1024,1440,1920}-{light,dark}.png`.

The browser suite checks all four cards' content fit at every requested width, page overflow, cylindrical transforms, link semantics, controls, keyboard selection, mouse drag, reduced motion, emulated touch swipe, inactive-card focus exclusion, and real new-tab clicks. Screenshots were also visually inspected at mobile and desktop sizes.

## Limits

Browser coverage uses Chromium and emulated touch, rather than physical iOS/Android devices or Safari/Firefox. Link checks verify new-tab behavior and preserve the supplied destinations; they do not certify the external projects' uptime or functionality. No assistive-technology session was performed. The component is a focused local implementation, with the custom React renderer and geometry options needed here, rather than a complete reimplementation of every optional setting in the reference API.
