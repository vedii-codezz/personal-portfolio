export function wrapIndex(value: number, count: number) { return ((value % count) + count) % count; }
export function cylinderPosition(index: number, position: number, count: number, width: number, gap: number) {
  const offset = wrapIndex(index - position + count / 2, count) - count / 2;
  const angle = offset * 60;
  const radians = angle * Math.PI / 180;
  const radius = (width + gap) / Math.sin(Math.PI / 3);
  return { x: radius * Math.sin(radians), z: radius * (Math.cos(radians) - 1), angle };
}
export function snapTarget(position: number, velocity: number, momentum: number) {
  return Math.round(position + Math.max(-.8, Math.min(.8, velocity * momentum)));
}
