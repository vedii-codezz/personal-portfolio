# Wine Plum × Peach Fuzz × Geometric Lotus

Implemented 2026-11-03 in the existing Next.js 16.3.4 portfolio. Section order, project descriptions, all ten project links, hero photograph, education, and GSAP interactions are preserved. Existing local Geist Sans/Mono and Georgia editorial typography are retained; no fonts or runtime dependencies were added. The existing site has no contact section or contact CTA, so none was invented.

## Identity

The supplied Bedantika Logo Collection Board informed two custom SVG variants in `components/Brand.tsx`: a symmetric geometric lotus for navbar/footer and a fine-line lotus with flourishes and ornamental dots in My Story. These are vector interpretations of concepts 01 and 02, not crops from the raster board. `app/icon.svg` is a simplified lotus with OS-aware light/dark colors.

`app/globals.css` defines semantic background, surface, card, foreground, muted text, accent, border, and button tokens for both palettes. Legacy token aliases keep the existing component styling compatible. Project conceptual visual studies and Pengu's character colors remain intact. Light mode alternates peach, cream, and blush surfaces; dark mode uses warm plum, espresso, and coral.

## Themes

An inline pre-paint initializer in `app/layout.tsx` resolves the saved preference or OS theme. `components/ThemeControl.tsx` supplies the Bloom / After Dark button, sliding flower/moon thumb, and keyboard-accessible preference menu. Preferences are light, dark, and system. Manual selection persists in `bedantika-theme`; system mode responds to OS changes. Storage failures use an in-memory preference. Cross-tab storage changes synchronize, and listeners clean up on unmount. Escape closes the menu and returns focus to its trigger. Reduced-motion CSS removes nonessential transitions.

## Verification

- Browser inspected hero in both themes, dark mobile Pengu, and dark tablet education/ornament/footer.
- Browser verified manual Bloom persistence on reload, restoration to System (OS dark), keyboard menu dismissal, and no console warnings/errors during the inspected session.
- Measured no horizontal overflow at 320, 390, 768, and 1006 CSS-pixel viewports. Small mobile header uses two rows with branding/toggle above navigation.
- `node scripts/verify-theme.mjs` exercises the actual pre-paint initializer and theme-controller functions: OS detection and changes, manual override, reload persistence, return to system, blocked storage, and listener cleanup.
- Semantic foreground/muted/accent text contrast across all four theme surfaces exceeds 4.5:1. Lowest tested ratios: light muted 5.64:1; dark accent 6.12:1. Decorative borders are not text indicators.
- Existing image files and project destinations are preserved. No deployment configuration changes.

Full assistive-technology testing and a formal accessibility audit were not performed.
