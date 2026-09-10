# Bedantika Mondal — Portfolio

Milestone 1: Navigation, Hero, Intro, and Selected Work only.

## Local development
`npm ci` then `npm run dev`. Preview: http://127.0.0.1:4173.

`npm run build` creates a production Next.js build. `npm run start` serves it on the same port after stopping the development server. `npm run typecheck` validates TypeScript. `npm test` verifies motion preference handling and cleanup with the real GSAP implementation in jsdom.

## Structure
- `app/`: App Router layout, page composition, theme tokens and responsive styles.
- `components/layout/`: Small client boundary that owns GSAP initialization and cleanup.
- `components/navigation/`, `hero/`, `intro/`, `work/`, `ui/`: Reusable server-rendered presentation components.
- `data/portfolio.ts`: All portfolio copy, metadata, navigation, portrait configuration and nullable contact values.
- `data/projects.ts`: Typed project records with stable slugs and supplied destinations.
- `lib/animations.ts`: Scoped GSAP timeline, two section-level ScrollTriggers, reduced-motion media query and cleanup.
- `public/images/bedantika.jpg`: Original supplied image, rendered through Next Image optimization.
- `tests/animations.test.ts`: Reduced-motion startup, live preference change and remount cleanup tests.

## Future extension
`SelectedWork` → `ProjectTrack` → `ProjectItem` preserves the track and item boundaries for a later translating reel. Future `app/project/[slug]/page.tsx` pages can consume the same project records; no case-study routes or fake destinations have been added. Email and LinkedIn remain null. GSAP is the only animation owner; Framer Motion is deferred until an interaction calls for it.

The existing Sites project identity is retained, but this milestone is local-only. No static export or deployment adapter is imposed on the Next.js foundation.
