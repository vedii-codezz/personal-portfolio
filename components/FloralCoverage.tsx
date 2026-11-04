import { useId } from "react";

export function FloralCoverage() {
  const id = useId().replace(/:/g, "");
  return <div className="loader-floral-cover" data-floral-cover aria-hidden="true">
    {Array.from({ length: 8 }, (_, panel) => <div className="loader-floral-panel" data-floral-panel key={panel}>
      <svg viewBox="-500 -500 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-${panel}`} x1="-.2" y1="1" x2=".8" y2="0">
            <stop stopColor="#934556" /><stop offset=".42" stopColor="#E5938F" /><stop offset=".8" stopColor="#FFD2BE" /><stop offset="1" stopColor="#FFE9DF" />
          </linearGradient>
        </defs>
        {/* Continuous macro-petal silk backing fills every pixel, including corners. */}
        <path d="M-500-500H500V500H-500Z" fill={`url(#${id}-${panel})`} />
        {Array.from({ length: 8 }, (_, i) => <g key={i} transform={`rotate(${i * 45})`}>
          <path d="M0 620C-600 180-580-380 0-900C580-380 600 180 0 620Z" fill={`url(#${id}-${panel})`} stroke="#FFD2BE" strokeOpacity=".35" strokeWidth="1.2" />
          <path d="M0 570C-60 180-85-260 0-820M-25 480C-220 100-280-200-160-490" stroke="#FFF1E9" strokeWidth="1.8" strokeOpacity=".14" fill="none" />
        </g>)}
      </svg>
    </div>)}
  </div>;
}
