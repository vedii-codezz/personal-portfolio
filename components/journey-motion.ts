export function journeyPoint(points: readonly { x: number; y: number }[], progress: number) {
  const index = Math.min(1, Math.max(0, progress)) * (points.length - 1);
  const a = points[Math.floor(index)];
  const b = points[Math.min(points.length - 1, Math.floor(index) + 1)];
  const fraction = index % 1;
  return { x: a.x + (b.x - a.x) * fraction, y: a.y + (b.y - a.y) * fraction };
}
