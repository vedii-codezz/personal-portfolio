export function floralCoverage(width: number, height: number) {
  const diagonal = Math.hypot(width, height);
  return {
    radius: Math.ceil(diagonal / 2) + 4,
    travel: diagonal * 1.15,
    panels: Array.from({ length: 8 }, (_, i) => {
      const angle = i * Math.PI / 4;
      const point = (a: number) => [width / 2 + Math.cos(a) * diagonal * 2, height / 2 + Math.sin(a) * diagonal * 2];
      // A small angular overlap prevents subpixel seams at the panel boundaries.
      const start = point(angle - Math.PI / 8 - .004);
      const end = point(angle + Math.PI / 8 + .004);
      return { angle, start, end,
        clip: `polygon(50% 50%, ${start[0] / width * 100}% ${start[1] / height * 100}%, ${end[0] / width * 100}% ${end[1] / height * 100}%)` };
    }),
  };
}
