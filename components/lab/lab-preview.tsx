type PreviewType = "kinetic" | "wireframe" | "model" | "data";

interface LabPreviewProps {
  type: PreviewType;
  experimentId: string;
}

export function LabPreview({ type, experimentId }: LabPreviewProps) {
  return (
    <div
      id="lab-preview-pane"
      role="region"
      aria-label={`Interactive schematic preview for experiment ${experimentId}`}
      className="lab-instrument-frame flex flex-col justify-between border border-line bg-canvas p-6"
    >
      <div className="instrument-bar flex items-center justify-between border-b border-line pb-4">
        <span className="metadata text-primary">INSTRUMENT // {experimentId}</span>
        <span className="metadata text-secondary">PREVIEW / STATIC SCHEMATIC</span>
      </div>

      <div className="instrument-canvas flex flex-1 items-center justify-center py-6">
        {type === "kinetic" && <KineticPreview />}
        {type === "wireframe" && <WireframePreview />}
        {type === "model" && <ModelPreview />}
        {type === "data" && <DataPreview />}
      </div>

      <div className="instrument-status flex items-center justify-between border-t border-line pt-4">
        <span className="metadata text-xs text-secondary">SAMPLING: MONOCHROME 2D/SVG</span>
        <span className="metadata text-xs text-primary" aria-live="polite">
          STATE: ACTIVE // {experimentId}
        </span>
      </div>
    </div>
  );
}

function KineticPreview() {
  return (
    <svg viewBox="0 0 360 220" className="h-auto w-full max-w-[340px]" role="img" aria-label="Kinetic typography schematic">
      {/* Grid lines and coordinate rulers */}
      <line x1="30" y1="20" x2="330" y2="20" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
      <line x1="30" y1="110" x2="330" y2="110" stroke="rgba(255,255,255,0.25)" />
      <line x1="30" y1="200" x2="330" y2="200" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
      <line x1="60" y1="20" x2="60" y2="200" stroke="rgba(255,255,255,0.12)" />
      <line x1="180" y1="20" x2="180" y2="200" stroke="rgba(255,255,255,0.12)" />
      <line x1="300" y1="20" x2="300" y2="200" stroke="rgba(255,255,255,0.12)" />

      {/* Crosshair anchors */}
      <path d="M55 110H65M60 105V115M175 110H185M180 105V115M295 110H305M300 105V115" stroke="#f3f3ef" strokeWidth="1" />

      {/* Kinetic typographical study */}
      <text x="60" y="95" fill="#f3f3ef" fontFamily="var(--font-geist)" fontSize="28" fontWeight="600" letterSpacing="-0.04em">KINETIC</text>
      <text x="60" y="145" fill="#a3a3a0" fontFamily="var(--font-geist-mono)" fontSize="11" letterSpacing="0.1em">T: 1.04s // EASE: EXPO.OUT</text>
      <text x="60" y="165" fill="#a3a3a0" fontFamily="var(--font-geist-mono)" fontSize="10">PIN_OFFSET: 0.00 / Y_DELTA: +48px</text>

      {/* Boundary indicator */}
      <rect x="30" y="20" width="300" height="180" fill="none" stroke="rgba(255,255,255,0.12)" />
    </svg>
  );
}

function WireframePreview() {
  return (
    <svg viewBox="0 0 360 220" className="h-auto w-full max-w-[340px]" role="img" aria-label="Isometric 3D wireframe schematic">
      {/* 3D Wireframe Cube Projection */}
      <g stroke="#f3f3ef" strokeWidth="1.2" fill="none">
        {/* Front Face */}
        <polygon points="110,90 190,55 190,135 110,170" />
        {/* Top Face */}
        <polygon points="110,90 190,55 250,85 170,120" />
        {/* Right Face */}
        <polygon points="190,55 250,85 250,165 190,135" />
      </g>

      {/* Hidden Interior Axes (dashed) */}
      <g stroke="#a3a3a0" strokeWidth="1" strokeDasharray="3 3" fill="none">
        <line x1="110" y1="170" x2="170" y2="120" />
        <line x1="170" y1="120" x2="250" y2="165" />
        <line x1="170" y1="120" x2="170" y2="40" />
      </g>

      {/* Coordinates labels */}
      <text x="95" y="185" fill="#a3a3a0" fontFamily="var(--font-geist-mono)" fontSize="9">P0(0,0,0)</text>
      <text x="185" y="45" fill="#f3f3ef" fontFamily="var(--font-geist-mono)" fontSize="9">P1(0,1,1)</text>
      <text x="255" y="175" fill="#a3a3a0" fontFamily="var(--font-geist-mono)" fontSize="9">P2(1,0,0)</text>

      <text x="35" y="205" fill="#a3a3a0" fontFamily="var(--font-geist-mono)" fontSize="10">PROJECTION: ISOMETRIC // ROT_Y: 35.26°</text>
    </svg>
  );
}

function ModelPreview() {
  // Strictly monochrome, technical transformer layer schematic
  return (
    <svg viewBox="0 0 360 220" className="h-auto w-full max-w-[340px]" role="img" aria-label="Technical transformer architecture schematic">
      {/* Input token embedding bar */}
      <rect x="40" y="180" width="280" height="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" />
      <text x="180" y="193" fill="#a3a3a0" fontFamily="var(--font-geist-mono)" fontSize="9" textAnchor="middle">
        INPUT EMBEDDINGS [B, S, 512]
      </text>

      {/* Projections Q, K, V */}
      <path d="M90 180V140M180 180V140M270 180V140" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

      {/* Linear Weight Blocks */}
      <rect x="65" y="115" width="50" height="24" fill="#050505" stroke="#f3f3ef" strokeWidth="1" />
      <text x="90" y="131" fill="#f3f3ef" fontFamily="var(--font-geist-mono)" fontSize="10" textAnchor="middle">W_q</text>

      <rect x="155" y="115" width="50" height="24" fill="#050505" stroke="#f3f3ef" strokeWidth="1" />
      <text x="180" y="131" fill="#f3f3ef" fontFamily="var(--font-geist-mono)" fontSize="10" textAnchor="middle">W_k</text>

      <rect x="245" y="115" width="50" height="24" fill="#050505" stroke="#f3f3ef" strokeWidth="1" />
      <text x="270" y="131" fill="#f3f3ef" fontFamily="var(--font-geist-mono)" fontSize="10" textAnchor="middle">W_v</text>

      {/* Attention Core Block */}
      <path d="M90 115V85H180M180 115V85M270 115V85H180" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <rect x="60" y="45" width="240" height="38" fill="rgba(255,255,255,0.04)" stroke="#f3f3ef" strokeWidth="1.2" />
      <text x="180" y="62" fill="#f3f3ef" fontFamily="var(--font-geist)" fontSize="11" fontWeight="500" textAnchor="middle">
        SCALED DOT-PRODUCT ATTENTION
      </text>
      <text x="180" y="76" fill="#a3a3a0" fontFamily="var(--font-geist-mono)" fontSize="9" textAnchor="middle">
        Softmax(Q · K^T / sqrt(d_k)) · V
      </text>

      {/* Logits output line */}
      <line x1="180" y1="45" x2="180" y2="20" stroke="#f3f3ef" strokeWidth="1.2" />
      <text x="180" y="14" fill="#a3a3a0" fontFamily="var(--font-geist-mono)" fontSize="9" textAnchor="middle">
        PROJECTION OUTPUT [B, S, 512]
      </text>
    </svg>
  );
}

function DataPreview() {
  return (
    <svg viewBox="0 0 360 220" className="h-auto w-full max-w-[340px]" role="img" aria-label="Data science distribution schematic">
      {/* Coordinate axes */}
      <line x1="50" y1="180" x2="310" y2="180" stroke="#f3f3ef" strokeWidth="1" />
      <line x1="50" y1="30" x2="50" y2="180" stroke="#f3f3ef" strokeWidth="1" />

      {/* Axis ticks */}
      <line x1="50" y1="140" x2="45" y2="140" stroke="#a3a3a0" />
      <line x1="50" y1="100" x2="45" y2="100" stroke="#a3a3a0" />
      <line x1="50" y1="60" x2="45" y2="60" stroke="#a3a3a0" />
      <line x1="115" y1="180" x2="115" y2="185" stroke="#a3a3a0" />
      <line x1="180" y1="180" x2="180" y2="185" stroke="#a3a3a0" />
      <line x1="245" y1="180" x2="245" y2="185" stroke="#a3a3a0" />

      {/* Discrete threshold guide */}
      <line x1="180" y1="40" x2="180" y2="180" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
      <text x="180" y="32" fill="#f3f3ef" fontFamily="var(--font-geist-mono)" fontSize="9" textAnchor="middle">μ = 0.00</text>

      {/* Statistical Curve */}
      <path
        d="M55 178 Q120 176, 150 120 T180 52 T210 120 Q240 176, 305 178"
        fill="none"
        stroke="#f3f3ef"
        strokeWidth="1.5"
      />

      {/* Quantile / residual sample markers */}
      <circle cx="150" cy="120" r="3" fill="#050505" stroke="#f3f3ef" strokeWidth="1.2" />
      <circle cx="180" cy="52" r="3" fill="#050505" stroke="#f3f3ef" strokeWidth="1.2" />
      <circle cx="210" cy="120" r="3" fill="#050505" stroke="#f3f3ef" strokeWidth="1.2" />

      <text x="270" y="70" fill="#a3a3a0" fontFamily="var(--font-geist-mono)" fontSize="9">σ = 1.00</text>
      <text x="270" y="85" fill="#a3a3a0" fontFamily="var(--font-geist-mono)" fontSize="9">N = 10,000</text>
    </svg>
  );
}
