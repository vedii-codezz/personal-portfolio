import { useId } from "react";
import { floralPetalPath } from "./floral-coverage";

export function FloralCoverage() {
  const id = useId().replace(/:/g, "");
  return <div className="loader-floral-cover" data-floral-cover aria-hidden="true">
    <div className="loader-floral-underlay" data-floral-underlay />
    {Array.from({ length: 8 }, (_, panel) => <div className="loader-floral-panel" data-floral-panel key={panel}>
      <svg viewBox="-150 -210 300 240" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-${panel}`} x1="-.2" y1="1" x2=".8" y2="0">
            <stop stopColor="#E5938F" /><stop offset=".42" stopColor="#FFD2BE" /><stop offset=".8" stopColor="#FFE9DF" /><stop offset="1" stopColor="#FFD2BE" />
          </linearGradient>
        </defs>
        <path d={floralPetalPath} fill={`url(#${id}-${panel})`} />
      </svg>
    </div>)}
  </div>;
}
