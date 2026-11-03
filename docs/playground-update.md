# Portfolio playground update — 2026-11-03

Preserves the existing Obsidian / Gold gallery, portrait, and education (CGPA 9.1). Page order is Hero → Selected Work → Fun Projects → My Story. Exactly four main projects remain, with View Live and GitHub links; Pengu is separate.

## Sources and artwork

All five repository URLs and five deployments supplied in the brief returned HTTP 200 on 2026-11-03. Deployment titles identified Finora, VEYRA, APTLY, Nikot-e-Metro, and penguin-pixel. Existing main-project descriptions and conceptual visual studies were retained; studies remain explicitly labeled rather than presented as screenshots.

Pengu source: https://github.com/vedii-codezz/virtual-pet-pengu/tree/a1eeb08fd80b8d464f97cf7d1d1c297135bb2130

`public/images/pengu.png` is a transparent offline render of the repository's original `src/pet/penguin.js` and `src/pet/voxelShape.js`, also available in the adjacent penguin-pixel working directory. The original blue voxel geometry, material palette, eyes, blush, beak, flippers, and feet were preserved. Original source modules were used to construct the scene; visible cube faces were projected with an orthographic camera, depth sorted, shaded, and rasterized with Sharp. No model, pet application, audio, or Three.js runtime is bundled into this portfolio.

## Motion and accessibility

GSAP reveals headings with a stagger and pops decorative text into view. Float playback pauses outside the viewport. Pointer response applies only to fine pointers with hover. GSAP matchMedia disables motion when reduced motion is requested and cleans up listeners/tweens on unmount. Touch layouts remain static and scrolling is native. Buttons have keyboard focus styling, meaningful accessible names, and safe external-link attributes. Content is visible without animation JavaScript.

The cream section rounds into the dark gallery and continues into the existing ivory story. No extra runtime dependencies were added.

## Verification

- `npm run lint` passed with zero warnings.
- `npm run typecheck` passed.
- `npm run build` passed, including static generation; required approved execution outside the sandbox after an EPERM error on `.next/diagnostics`.
- Parsed the generated production HTML: all ten supplied URLs appear as links exactly once; four main projects retain the requested order; section order is home/work/playground/story; CGPA 9.1 remains.
- Inspected the generated character image. PNG is about 74 KB.
- Browser preview could not connect to the local dev server (connection timeout), so desktop/mobile visual and live interaction verification remain unconfirmed.
