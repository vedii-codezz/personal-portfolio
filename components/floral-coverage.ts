export function floralCoverage(width: number, height: number) {
  const diagonal = Math.hypot(width, height);
  return {
    radius: Math.ceil(diagonal / 2) + 6,
    travel: diagonal * 1.85,
    panels: Array.from({ length: 8 }, (_, i) => {
      return { angle: i * 45 + [ -6, 3, -2, 5, -4, 2, -3, 4 ][i] };
    }),
  };
}

export function floralPose(geometry: ReturnType<typeof floralCoverage>, index: number, expansion: number, exit: number) {
  const angle = geometry.panels[index].angle * Math.PI / 180;
  const bend = (index % 2 ? -1 : 1) * Math.sin(exit * Math.PI) * geometry.radius * .08;
  return {
    x: Math.sin(angle) * geometry.travel * exit + Math.cos(angle) * bend,
    y: -Math.cos(angle) * geometry.travel * exit + Math.sin(angle) * bend,
    scale: expansion,
    rotation: geometry.panels[index].angle + (index % 2 ? -1.5 : 1.5) * exit,
  };
}

// Continuous tangents at crown and base: broad organic surfaces at camera scale.
export const floralPetalPath = "M0 24C-166 60-152-200-18-200C116-200 166-12 0 24Z";
