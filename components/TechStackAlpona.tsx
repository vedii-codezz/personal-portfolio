type AlponaProps = { variant: string; back?: boolean };

// Original line drawings: shared rice-paste strokes, four different compositions.
function PetalFan({ x, y, radius = 44, count = 9 }: { x: number; y: number; radius?: number; count?: number }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M${-radius} 0 A${radius} ${radius} 0 0 1 ${radius} 0 M${-radius + 5} 0 A${radius - 5} ${radius - 5} 0 0 1 ${radius - 5} 0`} />
    {Array.from({ length: count }, (_, index) => <g key={index} transform={`rotate(${-82 + index * 164 / (count - 1)})`}>
      <path d={`M0 ${-radius - 2} C-9 ${-radius - 12} -6 ${-radius - 25} 0 ${-radius - 29} C7 ${-radius - 23} 9 ${-radius - 12} 0 ${-radius - 2} Z`} />
      <path d={`M0 ${-radius - 5} Q-2 ${-radius - 15} 0 ${-radius - 23}`} />
      <circle cy={-radius - 36} r="1.4" className="alpona-dot" />
    </g>)}
  </g>;
}

function Lotus({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M0 0 C-14-12-12-24 0-34 C12-23 14-12 0 0 Z M0 0 C-22-2-28-15-27-24 C-13-22-4-12 0 0 M0 0 C21-3 29-15 27-24 C13-21 4-12 0 0 M-30-10 Q-19 7 0 3 Q19 7 30-10" />
    <circle cy="-42" r="1.8" className="alpona-dot" />
  </g>;
}

export function TechStackAlpona({ variant, back = false }: AlponaProps) {
  return <svg className={`toolkit-alpona${back ? " toolkit-alpona-back" : ""}`} viewBox="0 0 360 380"
    preserveAspectRatio="none" aria-hidden="true" focusable="false" fill="none" stroke="currentColor"
    strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
    {/* Broken edge rules leave the editorial center open. */}
    <g className="alpona-edge">
      <path d="M14 83 V32 Q14 15 32 15 H91 M269 365 H328 Q346 365 346 348 V302" />
      <path d="M20 69 V33 Q20 21 33 21 H71 M290 359 H327 Q340 359 340 346 V323" />
      <circle cx="98" cy="15" r="1.6" className="alpona-dot" />
      <circle cx="262" cy="365" r="1.6" className="alpona-dot" />
    </g>
    {variant === "01" && <g>
      <g className="alpona-upper">
      <path d="M265 102 C305 108 342 87 331 62 C324 46 304 56 311 69 C315 76 324 73 323 67 M265 102 C290 92 278 72 291 59 C299 51 306 47 305 36 C331 48 352 68 342 91 C331 118 287 120 265 102 Z M278 103 C295 100 302 88 300 78" />
      <Lotus x={282} y={103} scale={.56} />
      </g>
      <PetalFan x={103} y={315} radius={31} count={7} />
      <path d="M148 312 Q190 296 224 307 Q240 312 248 303 C254 295 242 291 240 298" />
      {[0, 1, 2, 3].map(index => <circle key={index} cx={174 + index * 14} cy={318} r="1.6" className="alpona-dot" />)}
    </g>}
    {variant === "02" && <g>
      <g className="alpona-upper">
      <path d="M196 77 C221 49 247 61 256 82 C263 100 291 106 310 91 C329 76 317 53 303 60 C291 66 301 80 308 72 M211 68 C227 68 232 56 229 48 C216 47 211 57 211 68 Z M253 77 C268 74 273 63 270 55 C258 55 251 65 253 77 Z M281 96 C285 80 296 80 299 84 C295 95 288 98 281 96" />
      </g>
      <path d="M33 295 C58 313 74 295 94 286 C120 273 143 286 138 299 C135 307 122 307 123 298 M49 300 Q52 283 66 283 Q67 296 49 300 M82 292 Q81 278 92 273 Q98 286 82 292 M101 284 Q115 272 126 277 Q120 290 101 284" />
      <Lotus x={284} y={310} scale={.64} />
      <path d="M213 311 Q235 301 253 306 M317 306 Q324 309 332 305" />
    </g>}
    {variant === "03" && <g>
      <g className="alpona-upper">
      <PetalFan x={278} y={105} radius={30} count={9} />
      <path d="M234 109 H322 M244 114 H312" />
      </g>
      <PetalFan x={180} y={315} radius={36} count={11} />
      <Lotus x={180} y={311} scale={.56} />
      <path d="M50 306 H103 M257 306 H310" />
      <circle cx="114" cy="306" r="2" className="alpona-dot" /><circle cx="246" cy="306" r="2" className="alpona-dot" />
    </g>}
    {variant === "04" && <g>
      <g className="alpona-upper">
      <path d="M242 67 H322 V117 M248 73 H316 V111 M275 77 Q296 78 304 96 Q286 98 275 77 Z M311 105 Q293 112 289 124 Q308 126 311 105 Z M301 78 Q306 85 310 87 M274 67 Q278 58 286 58 Q288 66 280 67" />
      </g>
      <path d="M39 266 V310 H91 M45 274 V304 H83 M49 287 Q66 285 71 298 Q56 303 49 287 Z M45 267 Q59 266 62 279 Q48 280 45 267" />
      <Lotus x={271} y={311} scale={.65} />
      {[0, 1, 2, 3, 4, 5].map(index => <circle key={index} cx={121 + index * 15} cy="309" r="1.6" className="alpona-dot" />)}
    </g>}
  </svg>;
}
