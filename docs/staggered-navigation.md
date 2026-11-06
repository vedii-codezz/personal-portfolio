# Staggered editorial navigation

The navigation now uses a right-opening, layered editorial panel while retaining the existing geometric lotus wordmark and a single Bloom / After Dark toggle. No dependencies were introduced.

## Files

- `components/StaggeredMenu.tsx`: accessible client menu, header integration, one reversible GSAP timeline, focus management, background isolation, and anchor navigation.
- `components/staggered-menu.css`: scoped responsive layout, existing theme palette mappings, serif labels, numbered items, and reduced-motion styling.
- `data/navigation.ts`: the six requested homepage destinations and three original social destinations.
- `app/page.tsx`: replaces the former horizontal header navigation with the menu; other sections remain unchanged.
- `scripts/verify-navigation-browser.mjs`: isolated Chromium/CDP interaction and screenshot verification.
- `scripts/verify-closing-sections.mjs`: checks stack/contact anchors through the rendered menu after the header extraction.
- `docs/navigation-verification/`: screenshots at 320, 390, 768, 1024, and 1440px in both themes.

## Behavior

The first colored layer slides in, followed by the second and main panel. Large Instrument Serif labels reveal vertically with a stagger, followed by the Newsreader social links. The overlapping opening sequence is approximately 900ms; closing reverses the same timeline at a faster rate. Rapid toggles change the direction of that existing timeline instead of stacking animations. Reduced-motion transitions move immediately to the requested state. Each panel explicitly resets GSAP's pixel translation so percentage-based movement remains correctly aligned after resizing.

Theme-aware variables use Wine Plum and Peach Fuzz in Bloom, and the existing dark browns and peach accents in After Dark. Changing the existing toggle while open updates the menu without closing it. Mobile header controls stack beside the original branding at narrow widths. The panel becomes full-width below 900px, and scrolls internally on short screens.

The open navigation shell becomes a modal dialog containing the original header controls and menu panel. Main content, footer, and skip link are temporarily inert. Focus starts on Home, cycles within the dialog, and returns to Menu on close. Escape, Menu/Close, the backdrop, and same-page navigation all close the panel. Scroll styles and prior inert values are restored exactly; the loader's existing stable scrollbar gutter is retained without duplicate compensation. Anchor scrolling occurs after unlock. External social links use new tabs with noopener/noreferrer; Email retains its mailto link.

Menu opening is gated while the lotus loader or floral transition is active. Menu animations have their own scoped GSAP context and clean up timelines, listeners, pending focus frames, inert state, and scroll locks on unmount. Existing page motion and carousel transforms remain under their original owners.

## Verification

All listed static checks and browser suites passed. Final responsive screenshots were regenerated against the optimized production build. Browser assertions also verify first-open panel visibility before keyboard use, absence of hidden horizontal scrolling, and correct alignment after resizing. The existing theme, lotus, journey, closing-section, viewport, floral coverage, and carousel geometry scripts passed. Independent review confirmed the final transform and gutter fixes.

The browser suite exercises loader gating; all six anchors; social URLs/security attributes; focus entry, wrapping, and return; Escape; scroll lock/restoration; live theme changes; five responsive widths; visible numbering and lotus contrast; unclipped labels; internal scrolling at 320×430; rapid toggles; reduced motion; and browser exception detection. The existing carousel browser regression checks mouse/touch dragging, snapping, navigation, reduced motion, link activation, and inactive-card focus exclusion.

Static checks: npm run lint, npm run typecheck, npm run build. Regression scripts cover the theme, lotus lifecycle, journey, closing sections, loader viewport, floral coverage, and carousel geometry. Independent review found no substantive code issues; browser testing additionally catches visual/cascade and resize behavior.

## Limits

Browser tests use Chromium with emulated mobile viewports rather than physical devices, Safari, or Firefox. Keyboard and DOM accessibility were tested; no screen-reader session was performed. Social hrefs and security attributes are checked, but external account uptime is not certified. The browser verifier requires the locally installed Chromium revision and a server on port 3001; it is a local verification tool rather than portable CI infrastructure.
