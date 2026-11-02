# Portfolio implementation

The target directory initially contained only IMG_20261018_152507.jpg.jpeg. No app, git repository, pages, or project data existed here. The adjacent Portfolio app was inspected read-only for stack conventions and public project facts; it is not modified.

## Design

Obsidian (#10100F), champagne (#D6AD68), ivory (#F3F0E9). A large editorial portrait cover pairs geometric sans typography with expressive serif italics. The unchanged original photograph is rendered with Next Image. My Story follows immediately on ivory. Four project chapters use original conceptual studies, explicitly labeled, rather than pretending to be product screenshots.

## Plan

- [x] Set up Next.js, React, TypeScript, Tailwind, GSAP, local Geist fonts, lint/typecheck/build scripts.
- [x] Build Hero, MyStory, SelectedWork, ProjectVisual and scoped motion components.
- [x] Keep exactly Finora, VEYRA, APTLY, Nikot-e-Metro in that order. Use evidence-backed descriptions, technologies and source links.
- [x] Verify lint, types, production build and asset integrity.
- [ ] Complete visual browser verification at desktop, tablet and mobile widths. Browser automation could not reliably attach to the local preview.

## Evidence

- Portrait: original JPEG in this directory, copied byte-for-byte into public/images/bedantika.jpeg.
- Descriptions and source URLs: ../Portfolio/data/projects.ts and ../Portfolio/data/projects/*.ts.
- APTLY stack: ../Aptly/README.md and package.json.
- VEYRA stack: ../Budget Analysis/package.json and src.
- Nikot-e-Metro stack: ../Nikot-e-Metro/package.json and src.
- Finora: ../Portfolio/data/projects/finora.ts documents Python deterministic tools; no additional framework inferred.
- No project screenshots found in the older portfolio public directory. Project visual studies are original conceptual artwork and carry visible labels.
- Deployment URLs in the old data require live reachability verification before inclusion.
- APTLY deployment verified in-browser: https://aptly-chi.vercel.app/ displays the APTLY opportunity intelligence interface.
- Compatibility decision: use TypeScript 6.0.3 instead of the neighboring app's 7.0.2, because the Next ESLint TypeScript parser declares support for versions below 6.1.0.

## Scope

Only the requested three sections plus essential navigation/footer. No unrelated pages are copied or changed. No remote fonts, image generation, scroll hijacking, pointer replacement, or unnecessary runtime dependencies.

## Verification record

- `npm run lint`: passed with zero warnings after naming the PostCSS configuration export.
- `npm run typecheck`: passed.
- `npm run build`: passed using the default Turbopack compiler, including TypeScript validation and static page generation.
- `npm run build -- --webpack`: also passed, including TypeScript validation and static page generation. Default build script remains unchanged.
- The sandbox's registry DNS and local sockets were restricted. Dependencies and server/build verification needed execution outside it. No remote font downloads are needed.
- A local dev request returned HTTP 200. Browser visual checks could not be completed because local browser tabs repeatedly timed out or failed to attach. No claim of measured overflow or browser hydration-error verification is made.
- SHA-256 equality verified for the original portrait and public copy.
- Source scan found no excluded project names in app, components, data, public, docs, or README.
- Independent component review found low contrast in ivory-section labels and footnote; both colors were darkened.
- The original package versions caused TypeScript peer warnings; selecting TypeScript 6.0.3 resolved those on the final install. npm also reports ESLint 9 as deprecated; lint itself completes without warnings.

## Files created

`app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/icon.svg`; `components/Hero.tsx`, `components/MyStory.tsx`, `components/SelectedWork.tsx`, `components/ProjectVisual.tsx`, `components/PortfolioMotion.tsx`; `data/education.ts`, `data/projects.ts`; `public/images/bedantika.jpeg`; `package.json`, `package-lock.json`, `tsconfig.json`, `next-env.d.ts`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`; `README.md`, `docs/implementation.md`. Next.js also generated `AGENTS.md` and `CLAUDE.md`. The original photo remains untouched.
