export function floralCoverage(width: number, height: number) {
  const diagonal = Math.hypot(width, height);
  return {
    radius: Math.ceil(diagonal / 2) + 6,
    travel: diagonal * 1.15,
    panels: Array.from({ length: 8 }, (_, i) => {
      return { angle: i * 45 + (i % 2 ? 1 : -1) };
    }),
  };
}

export function floralPose(geometry: ReturnType<typeof floralCoverage>, index: number, expansion: number, exit: number) {
  const angle = geometry.panels[index].angle * Math.PI / 180;
  const bend = (index % 2 ? -1 : 1) * exit * geometry.radius * .12;
  return {
    x: Math.sin(angle) * geometry.travel * exit + Math.cos(angle) * bend,
    y: -Math.cos(angle) * geometry.travel * exit + Math.sin(angle) * bend,
    scale: expansion,
    rotation: geometry.panels[index].angle + (index % 2 ? -3 : 3) * exit,
  };
}

export const floralPetalPath = "M0 20C-140-25-120-140 0-200C120-140 140-25 0 20Z";
