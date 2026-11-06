# Editorial serif redesign

Implemented in the existing homepage, preserving its section order and project data.

- Instrument Serif regular/italic supplies display typography; Newsreader variable regular/italic supplies body and UI. Noto Serif Bengali supplies the Bengali study identity. All use next/font/google, self-hosted at build time, with serif fallbacks and swap behavior. Font fetching succeeded in the production build.
- app/layout.tsx configures fonts; app/globals.css updates typography and responsive editorial layouts; SelectedWork.tsx puts metadata, title, artwork, and details in reading order; ProjectVisual.tsx marks Bengali text with lang=bn; PortfolioMotion.tsx sequences title before artwork while retaining separate settle/parallax/pointer transforms.
- Finora: full-width feature with oversized title and two-column lower panel. VEYRA: asymmetric copy/artwork split. APTLY: reversed spread with an offset evidence illustration. Nikot-e-Metro: broad map with a narrower side column and transit-inspired title rule.
- Below 761px the spreads use metadata/title/artwork/details order, comfortable body text, and touch-sized links. Existing semantic colors, focus styling, reduced-motion branches, and content remain intact.

Verification performed:

- npm run lint and npm run typecheck passed.
- Production build passed with all three font families fetched and optimized.
- All six existing scripts/verify-*.mjs checks passed (closing sections, curved floral coverage, journey, loader viewport, lotus lifecycle, themes).
- Production browser DOM checks at 320, 390, 768, 1024, 1440, and 1920px reported no page-level horizontal overflow and loaded fonts.
- Screenshot inspection covered desktop hero and all four project spreads, mobile hero and Finora, both themes, and Pengu. Clicked the theme control and Pengu reaction button. Confirmed the eight rendered project destinations match project data.
- Visual refinement: replaced VEYRA's full arch with a rounded upper corner to avoid clipping its original study lettering.

Limitations: no automated contrast or cumulative-layout-shift measurement; no full keyboard-only traversal, browser reduced-motion emulation, external destination uptime check, or comprehensive runtime animation recording. Reduced-motion and keyboard focus behavior were retained in source. Existing logic checks are not substitutes for full end-to-end interaction tests.
