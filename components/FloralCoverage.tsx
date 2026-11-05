import { useId } from "react";
import { floralPetalPath } from "./floral-coverage";

export function FloralCoverage() {
  const id = useId().replace(/:/g, "");
  return <div className="loader-floral-cover" data-floral-cover aria-hidden="true">
    {Array.from({ length: 8 }, (_, panel) => <div className="loader-floral-panel" data-floral-panel key={panel}>
      <svg viewBox="-150 -210 300 240" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-${panel}`} x1="-.2" y1="1" x2=".8" y2="0">
            <stop stopColor="#934556" /><stop offset=".42" stopColor="#E5938F" /><stop offset=".8" stopColor="#FFD2BE" /><stop offset="1" stopColor="#FFE9DF" />
          </linearGradient>
        </defs>
        <path d={floralPetalPath} fill={`url(#${id}-${panel})`} stroke="#FFD2BE" strokeOpacity=".35" strokeWidth=".25" />
        <path d="M0 17C-10-50-14-120 0-192M-3 8C-65-60-70-110-35-150M3 8C65-60 70-110 35-150" stroke="#FFF1E9" strokeWidth=".4" strokeOpacity=".18" fill="none" />
      </svg>
    </div>)}
  </div>;
}
