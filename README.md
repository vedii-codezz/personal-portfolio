# Bedantika Mondal — Creative Lab

A portrait-led portfolio in obsidian, champagne gold, and warm ivory. Built with Next.js App Router, React, TypeScript, Tailwind CSS, and GSAP. Fonts are served locally through `next/font/local`.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. Production: `npm run build` then `npm start`.

## Validate

```sh
npm run lint
npm run typecheck
npm run build
```

## Edit content

- `components/Hero.tsx`: portrait and introduction.
- `data/education.ts`: ongoing education; add future timeline records here.
- `data/projects.ts`: exactly four projects in display order. Only populated `live` links are rendered as active previews.
- `components/ProjectVisual.tsx`: original conceptual project artwork, visibly distinguished from product screenshots.
- `components/PortfolioMotion.tsx`: GSAP entrance, reveal, parallax, and pointer interactions; media query contexts revert animations and listeners when preferences change or the component unmounts.
- `app/globals.css`: design tokens, section styles, breakpoints, reduced-motion overrides.

## Asset integrity and provenance

The supplied `IMG_20261018_152507.jpg.jpeg` is preserved at the root and copied unchanged to `public/images/bedantika.jpeg`. Next Image optimizes delivery and crops through CSS; no face edits, generated replacements, or retouching are applied.

Only this folder is modified. The neighboring older portfolio and project repositories were read for content and stack evidence. See `docs/implementation.md` for provenance. APTLY's deployment was verified in the browser and is linked. Other live-preview locations remain explicit placeholders. GitHub URLs come from existing local project records.

The page is server-rendered with visible content before JavaScript. Animated styles are applied only for `prefers-reduced-motion: no-preference`; native anchor navigation also works without JavaScript. Parallax and pointer movement are restricted to desktop fine-pointer devices.

Lint, type-checking and the default production build passed. Local HTTP returned 200, but visual browser verification remains incomplete because browser automation could not reliably attach to the preview. See the verification record for details.
