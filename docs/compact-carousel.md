# Compact cylindrical Selected Work refinement

This is a proportional refinement of the existing carousel. It retains the same cylindrical geometry function, animation loop, momentum/snapping, pointer capture handling, keyboard controls, active-slide accessibility, project data, links, and no-autoplay behavior. No dependencies or new product components were added.

## Old and new dimensions

All measurements below came from Chromium at the requested viewport dimensions.

| Viewport | Previous card | New card | Previous stage | New stage | Controls bottom, before → after |
| --- | --- | --- | --- | --- | --- |
| 320 × 640 | 248 × 570 | 248 × 440 | 660 | 472 | 1010 → 754 |
| 390 × 844 | 300 × 570 | 260 × 440 | 660 | 472 | 1011 → 754 |
| 768 × 1024 | 360 × 610 | 264 × 420 | 700 | 452 | 1160 → 771 |
| 1366 × 768 | 360 × 610 | 276 × 410 | 700 | 442 | 1236 → 767 |
| 1440 × 900 | 360 × 610 | 276 × 430 | 700 | 462 | 1246 → 808 |
| 1920 × 1080 | 360 × 610 | 276 × 430 | 700 | 462 | 1262 → 820 |

The section was aligned with scrollIntoView, retaining the existing 24px document scroll padding. At 1440 × 900 the eyebrow, complete heading, centered project card, controls, and section end fit together. At 1366 × 768 the controls also fit just inside the viewport. Smaller viewports use natural page scrolling; the section has no fixed height or scroll trap.

## Geometry and layout

Card dimensions are genuinely smaller; the carousel is not scaled as a whole. The measured card width continues to feed the existing sine/cosine depth geometry and rotateY positioning. Default width is now 276px. The existing negative-gap rule is reserved for widths up to 260px, keeping mobile previews close while desktop/tablet cards retain the normal 25px gap.

Desktop cylinder radius falls from approximately 444.6px to 347.6px. Mobile uses the existing -45px spacing: radius is approximately 248.3px for a 260px card, and 234.4px for the narrowest 248px card. Neighboring cards retain 60-degree angles and negative depth. Perspective remains 2500px on desktop, 2100px on tablet, and 1800px on mobile.

Stage clearance falls from 90px to 32px. Section top padding, heading spacing, and gallery bottom spacing are reduced. The work heading uses responsive display type with a smaller short-laptop override. Card titles are 36px on desktop and 34px on mobile; descriptions are 14px/13.5px and links 14.5px/14px. Link hit areas remain at least 44px tall. Artwork occupies 51% of each card.

## Artwork

All four existing SVG/CSS identities remain. Compact styles reduce the Finora core and agent plaques, VEYRA wordmark and supporting copy, APTLY document typography and sheet padding, and metro identity sizing. The duplicate screenshot disclaimer and APTLY's decorative evidence-trail line are hidden in compact mode, while the visual-study label and footnotes remain. No stock images or new artwork were introduced.

## Files

Product changes:
- `components/CircularCarousel.tsx`: default card width and responsive spacing threshold only.
- `app/globals.css`: scoped Selected Work dimensions, spacing, typography, artwork proportions, and responsive rules.
- `components/project-artwork.module.css`: compact-only artwork adjustments.

Verification and report:
- `scripts/verify-compact-carousel.mjs`.
- `docs/compact-carousel-verification/before/` and `after/`: six viewport pairs in both themes, measurements, and all four active desktop artworks.
- This report.

Project data, SelectedWork markup, ProjectVisual markup, carousel-geometry.ts, PortfolioMotion, staggered navigation, loader, hero, and other sections are unchanged.

## Verification results

Passed:
- npm run lint, npm run typecheck, npm run build.
- node --test scripts/carousel.test.mjs.
- node scripts/verify-compact-carousel.mjs: exact six viewport sizes, both themes, four complete card layouts, artwork containment, real depth transforms, desktop heading/gallery/control fit, and no page overflow.
- node scripts/verify-compact-carousel.mjs --scroll-only: native emulated vertical touch scrolling through the gallery and a pointer drag across the link row without external navigation.
- node scripts/verify-carousel-browser.mjs --quick: pointer-release regression, previous/next, click preview, keyboard selection, mouse/touch drag and snap, reduced motion, real Live Demo/Source new-tab clicks without rotation, and inactive-slide focus exclusion.
- Existing theme, lotus lifecycle, journey, closing sections, loader viewport, and floral coverage scripts.
- Independent read-only review found no actionable regressions.

Before/after screenshots were actually captured and inspected, including desktop, narrow mobile, and APTLY's compact evidence artwork. The new compact-size assertion failed against the old implementation before the product changes were made.

## Limits

Browser coverage uses Chromium and emulated touch, not physical devices or Safari/Firefox. Mobile intentionally permits natural scrolling rather than compressing every element into a 640px viewport. Decorative artwork microtype is smaller; essential titles, descriptions, and links remain separate readable card content. The local browser script requires installed Chromium and a production server on port 3001.
