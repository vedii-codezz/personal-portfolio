import { useId } from "react";

// Back to front: seven crown petals, six open petals, four low cupped petals.
export const lotusPetals = [
  ...[-66, -44, -22, 0, 22, 44, 66].map(angle => ({ angle, size: .91, tilt: 8, tone: "crown" })),
  ...[-78, -49, -19, 19, 49, 78].map(angle => ({ angle, size: .92, tilt: 30, tone: "silk" })),
  ...[-76, -30, 30, 76].map(angle => ({ angle, size: .74, tilt: 58, tone: "rose" })),
];

export function LoaderPetals() {
  const id = useId().replace(/:/g, "");
  return <div className="loader-lotus" data-loader-lotus>
    <div className="loader-lotus-aura" data-lotus-aura />
    <div className="loader-petal-stage" data-petal-stage>
      {lotusPetals.map((petal, i) => <div className="loader-petal" data-lotus-petal key={i}>
        <svg viewBox="0 0 120 190" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={`${id}-silk-${i}`} x1="24" y1="178" x2="81" y2="14" gradientUnits="userSpaceOnUse">
              <stop stopColor={petal.tone === "rose" ? "#762937" : "#934556"} />
              <stop offset=".43" stopColor={petal.tone === "crown" ? "#ECA7A0" : "#E5938F"} />
              <stop offset=".79" stopColor="#FFD2BE" />
              <stop offset="1" stopColor={petal.tone === "crown" ? "#FFF1D8" : "#FFE9DF"} />
            </linearGradient>
            <linearGradient id={`${id}-edge-${i}`} x1="30" y1="170" x2="76" y2="10" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E5938F" stopOpacity="0" /><stop offset="1" stopColor="#FFF1E9" stopOpacity=".8" />
            </linearGradient>
          </defs>
          <path d="M60 184C28 164 3 130 11 91C16 61 40 33 60 7C80 33 104 61 109 91C117 130 92 164 60 184Z" fill={`url(#${id}-silk-${i})`} />
          <path d="M60 182C43 133 38 84 60 9C82 84 77 133 60 182Z" fill="#FFF1E9" opacity=".08" />
          <path d="M60 183C28 164 3 130 11 91C16 61 40 33 60 7C80 33 104 61 109 91C117 130 92 164 60 183Z" stroke={`url(#${id}-edge-${i})`} strokeWidth=".8" />
          <path d="M60 176C53 132 52 91 60 31M57 167C36 128 27 100 39 67M63 167C84 128 93 100 81 67" stroke="#FFF1E9" strokeOpacity=".16" strokeWidth=".65" />
        </svg>
      </div>)}
      <div className="loader-lotus-heart" data-lotus-heart />
    </div>
  </div>;
}
