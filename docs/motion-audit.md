# Portfolio motion audit and implementation

Date: 2026-11-06

## Scope and decisions

Apply the supplied cinematic × playful brief using the installed GSAP 3.15 and ScrollTrigger. Preserve layout, themes, portrait, SVG artwork, project copy and URLs, four toolkit categories and all 19 technologies. No dependencies added. Read Next's bundled `use-client.md` before editing.

An extension of the existing ownership model fits the brief better than a second animation controller: the loader master remains the sole hero clock, the botanical component owns its SVG, and PortfolioMotion owns page interactions. Nested project layers separate transforms rather than relying on overwrite behavior.

## Audit findings

Before changes, PortfolioMotion had generic `[data-reveal]` entrances, independent project masks, toolkit and contact reveals, Pengu doodle entrances/float/pointer movement, desktop portrait parallax and project pointer movement. LoaderLotus appended heroEntrance to its master timeline. LotusJourney built a responsive scrubbed SVG timeline, cached traveler geometry and used a cleaned ResizeObserver/font-ready refresh. CSS owned badge/link/button hover states, Pengu doodle hovers and an always-running scroll-cue animation.

- Project information used the generic reveal separately from its visual mask; replaced with one article timeline.
- Pointer movement read bounding rectangles on every event; bounds now refresh on entry and on scroll/resize only while hovered.
- The scroll cue's CSS loop ran off-screen; replaced with a visibility-controlled GSAP loop.
- Pengu already paused its float outside the viewport. Both loops now also pause while the document is hidden.
- LotusJourney initialized during the loader; it now uses the same guarded reveal/ready lifecycle and animation-frame boundary as PortfolioMotion.
- Contact's outer social group entered together; links now enter in GitHub/LinkedIn order.
- Doodle entrance transforms could compete with CSS hovers; the entrance now owns opacity only.
- Email CSS hover translation would compete with magnetism; CSS now owns its color and arrow only.

## Final ownership

| Element/effect | Owner | Properties/lifecycle |
| --- | --- | --- |
| Lotus bloom, petals, screen transition | LoaderLotus | Unchanged master; reveal/ready preserved |
| Hero name, portrait frame, supporting content/header | hero-entrance | Loader-owned timeline; masked lines and 1.03 portrait settle |
| Hero portrait image | PortfolioMotion desktop media branch | Scrubbed 4% vertical shift, separate from frame entrance |
| Scroll cue | PortfolioMotion | Visible-only repeating vertical motion |
| Section eyebrows and headings | PortfolioMotion generic reveal | Once-only rise/opacity |
| Project label, mask and information | PortfolioMotion article timeline | Label → mask → title → description/technologies → links |
| Project artwork entrance | `.project-settle` | Scale 1.035 → 1 |
| Project scroll depth | `.project-parallax` | Desktop scrub, −5px → 5px |
| Project pointer movement | `.project-pointer` | Fine pointer, bounded ±5px |
| Project hover artwork/arrow/contrast | CSS | Inner study scale 1.012; arrow moves 3px |
| Pengu section/doodles | PortfolioMotion | Existing section reveal, opacity-only doodle reveal |
| Pengu idle | `.pengu-float` | Visible-only float, slightly faster during fine-pointer hover |
| Pengu pointer response | `.pengu-character` | Fine-pointer translation and subtle tilt |
| Pengu click/tap/keyboard response | `.pengu-reaction` button | Prebuilt guarded bounce; existing spark briefly responds |
| Botanical drawing/traveler | LotusJourney | Existing responsive SVG, reversible scrub |
| Education details and CGPA | PortfolioMotion | Once-only at 48%/72% of the botanical scroll range; reverse scrolling does not hide them |
| Toolkit cards/badges | PortfolioMotion | Small card stagger, then 40ms badge stagger |
| Badge hover | CSS inner span | 3px lift, border/background; separate from badge entrance |
| Contact heading | PortfolioMotion | Sequential masked lines |
| Contact supporting text and links | PortfolioMotion | Description → email → GitHub → LinkedIn |
| Email magnetism | PortfolioMotion | Fine pointer, quickTo, ±6px, reset on leave |

## Lifecycle and accessibility review

GSAP matchMedia reverts its animations and ScrollTriggers on cleanup and media changes. Event handlers are removed; scheduled initialization frames are cancelled. LotusJourney retains observer/font refresh disposal. Both page controllers start once from either lifecycle event and escape the loader's context before creating animations. There is no second hero entrance or page replay after ready.

All added motion is inside no-preference media branches; reduced-motion visitors retain readable content and completed botanical strokes. Pointer following and hover artwork effects require a fine pointer. Character activation is a native button supporting keyboard and touch, with pan-y touch behavior and a visible focus outline. Reactions are prebuilt and ignore clicks while active. Default HTML remains visible without JavaScript.

## Verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed, including TypeScript and static generation. Initial sandbox run encountered EPERM cleaning `.next`; permitted retry succeeded.
- `git diff --check`: passed.
- Browser inspection reached the existing port-3000 preview, which served the previous build (the new Pengu button was absent). A separate fresh production server started successfully on port 3001, but the in-app browser timed out connecting to it. New desktop/mobile motion, reduced-motion switching and hover/click behavior therefore remain visually unverified; compilation is not a substitute for those checks.

Recommended visual checks: fresh-load loader/hero once; slowly scroll every project; compare 1440px, 900px and 390px widths in both themes; hover and leave each artwork/email; activate Pengu with click, touch and Enter; reverse-scroll the vine; toggle reduced motion; navigate away/back and check for duplicate listeners or triggers.
