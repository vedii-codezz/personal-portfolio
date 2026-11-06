# React Bits cylinder motion integration

Implemented 7 November 2026. This changes carousel movement and rendering architecture while retaining the four compact editorial project cards, their typography, artwork, descriptions, and URLs. No dependencies were added.

## Reference used

The attachment received in this chat contained only the written brief. The mentioned recording, JavaScript component, and CSS files were absent from its attachment folder and the workspace. The implementation therefore uses the official [CircularCarousel source](https://github.com/DavidHDev/react-bits/blob/main/src/content/Components/CircularCarousel/CircularCarousel.jsx), [stylesheet](https://github.com/DavidHDev/react-bits/blob/main/src/content/Components/CircularCarousel/CircularCarousel.css), and [live demo](https://reactbits.dev/components/circular-carousel).

The official demo was opened in Chromium, captured, and visually inspected. Its default ten-image ring is denser than this portfolio's four-project ring. No exact match to the unavailable supplied recording is claimed. Attribution and license terms are retained in `docs/third-party/react-bits-license.txt`.

## Geometry and movement

The old renderer placed flat cards at wrapped 60-degree offsets. The replacement rotates a complete parent ring with four 90-degree project positions. Its radius blends chord and arc spacing according to curvature; the full-curve desktop radius is approximately 191.6px for 276px cards with a 25px gap.

Each visual surface comprises eight overlapping strips. The strips receive their own cylindrical x displacement, recessed z depth, and local rotation, so the artwork bends instead of remaining a flat rotated rectangle. Percentage-free physical geometry is recomputed from actual responsive card widths.

A camera sits behind the ring radius and applies the configured tilt, eased pointer parallax, and velocity-dependent radius swell. The ring uses angular velocity, momentum projection, and a critically damped spring integrated in small time steps. Mouse, touch, wheel/trackpad, keyboard, dots, and arrow controls all operate on that same angular state. Autoplay remains disabled.

## Live card content and artwork

`SelectedWork` supplies the existing ProjectVisual artwork separately from the editorial article. The original artwork component and its CSS are unchanged. Decorative front strips repeat only that aria-hidden artwork and clip it at the correct source offset. The reverse surfaces use shaded theme/project-color panels rather than mirrored interactive content.

Every project retains one live Instrument Serif title, one Newsreader description, and one pair of actual anchors. There are exactly four h3 elements and eight project anchors in the gallery, and none inside the tiled surfaces. The readable editorial layer remains attached to the same rotating card, in front of its curved background; its available width follows the cylinder's visible chord. Live text is not rasterized or copied into tiles.

Original card colors, framing palette, font sizes, description copy, link destinations, order, and artwork identities remain. Bending naturally changes the visible width and perspective of the covers. Multiple neighboring curved surfaces are visible; the four-project count is preserved without inventing repeated project entries.

## Compact sizing and responsiveness

Existing CSS card dimensions remain:

| Viewport | Card dimensions |
| --- | --- |
| 320 × 640 | 248 × 440px |
| 390 × 844 | 260 × 440px |
| 768 × 1024 | 264 × 420px |
| 1366 × 768 | 276 × 410px |
| 1440 × 900 | 276 × 430px |
| 1920 × 1080 | 276 × 430px |

Artwork remains approximately 51% of the card. The Selected Work heading, count, gallery, and controls retain their compact layout and fit together at 1440 × 900. Actual card widths determine the radius and tile transforms; the entire scene is not scaled down. Existing theme backgrounds drive depth fading instead of a permanent black fade.

## Accessibility, interaction, and cleanup

Only the active live article is interactive; inactive live content is inert and its slide group is hidden from the accessibility tree. Named project buttons provide access to all four entries, and selection is announced through the existing polite status. Decorative strips are aria-hidden and contain no focusable links. Visible focus styles and keyboard navigation remain.

Reduced motion removes bending, tilt, parallax, rise movement, and spring interpolation while preserving readable artwork, live text, and controls for every project. Vertical touch scrolling is retained. A link press does not start a drag, and a completed drag suppresses its follow-up pointer click. Keyboard activation remains available after a gesture.

The rise entrance waits for the gallery to be visible and the loader's reveal lifecycle. Intersection and document-visibility listeners pause animation frames; settled scenes also stop requesting frames. Cleanup removes observers/listeners, pending wheel timers, and animation frames. No per-tile ScrollTriggers or competing GSAP transforms were introduced.

Independent review found an interrupted-snap edge case: a press canceled the spring before becoming a drag. A native regression reproduced a ring stranded near 45 degrees. The fix leaves the spring intact until the horizontal threshold is reached; stationary releases and vertical gestures now settle to the intended 90-degree target. The reviewer confirmed the correction with no remaining substantive findings.

## Files changed

Product:
- `components/CircularCarousel.tsx`: parent ring/camera, tiled decorative renderer, angular motion, input handling, visibility pausing, entrance and cleanup.
- `components/carousel-geometry.ts`: arc radius, strip geometry, angular spring and release helpers.
- `components/SelectedWork.tsx`: splits artwork from the single live editorial article.
- `app/globals.css`: scoped 3D camera, curved strip framing, live editorial layer, depth shading, and reduced-motion surface styles.

Verification/documentation:
- `scripts/carousel.test.mjs`: new ring, bending, momentum, and refresh-rate settling tests.
- `scripts/verify-carousel-browser.mjs`: adapts existing geometry/click/focus assertions to the new renderer.
- `scripts/verify-compact-carousel.mjs`: verifies tiled artwork layout and saves separate ring captures with --ring.
- `scripts/verify-ring-carousel.mjs`: native entrance, uniqueness, curved-card clicking, trackpad, pause/resume, snap interruption, and reduced-motion checks.
- `docs/ring-carousel-verification/`: captures and measurements, including the official reference and entrance.
- This report and the React Bits attribution file.

The loader, hero, portrait, staggered navigation, theme toggle, project data, ProjectVisual source, artwork styles, Pengu, story, tech stack, contact, footer, and PortfolioMotion are unchanged.

## Tests executed

Passed:
- npm run lint
- npm run typecheck
- npm run build
- node --test scripts/carousel.test.mjs
- node scripts/verify-compact-carousel.mjs --ring: all six specified viewport dimensions, both themes, four complete card layouts/artworks, genuine ring transforms, compact desktop heading/control fit, vertical touch scrolling, drag/link safety, and no page overflow.
- node scripts/verify-carousel-browser.mjs --quick: pointer-release regression, controls, keyboard selection, click-to-focus, mouse/touch drag and snapping, reduced motion, actual Live Demo/Source new-tab clicks, and inactive-live-card exclusion.
- node scripts/verify-ring-carousel.mjs: rise entrance, eight-strip curvature, exact original URLs, unique links/titles, physical control and curved-neighbor clicks, horizontal wheel input, offscreen pause/resume, both snap-interruption regressions, and reduced-motion navigation through all four projects.
- node scripts/verify-ring-carousel.mjs --reference: captured the official demo for visual inspection.
- Existing theme, lotus lifecycle, journey, closing-section, loader viewport, and floral coverage regressions.

Production screenshots were captured and inspected for desktop, mobile, and active artwork. Browser suites assert no runtime exceptions.

## Remaining limits

The supplied recording cannot be compared because it was not attached. Visual comparison used the official live demo instead. Browser coverage is Chromium with emulated touch; physical devices, Safari/Firefox, and screen-reader sessions were not exercised. Reverse faces are decorative shaded panels; live text stays readable on the outward-facing card rather than being tiled or mirrored. Local verification scripts require installed Chromium and a server on port 3001.
