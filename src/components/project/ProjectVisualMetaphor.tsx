'use client';

import React from 'react';

interface ProjectVisualMetaphorProps {
  type: 'network' | 'matrix' | 'analytics' | 'transit';
  className?: string;
  isHovered?: boolean;
  scrollProgress?: number; // 0 to 1 scroll-driven progression
}

export function ProjectVisualMetaphor({
  type,
  className = '',
  isHovered = false,
  scrollProgress = 1,
}: ProjectVisualMetaphorProps) {
  // Normalize scroll progress
  const progress = Math.max(0.1, Math.min(1, scrollProgress));

  return (
    <div
      className={`relative w-full aspect-[16/10] overflow-hidden flex items-center justify-center transition-all duration-500 select-none rounded-2xl ${
        type === 'network'
          ? 'bg-cream-alt text-ink border border-ink/10'
          : type === 'matrix'
          ? 'bg-paper text-ink border border-ink/10'
          : type === 'analytics'
          ? 'bg-charcoal text-paper border border-charcoal-elevated'
          : 'bg-cream text-ink border border-ink/10'
      } ${isHovered ? 'scale-[1.01] shadow-2xl' : 'shadow-md'} ${className}`}
    >
      {/* 1. FINORA — Multi-Agent Consensus Orchestration */}
      {type === 'network' && (
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full p-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Circles */}
          <circle cx="300" cy="200" r="140" stroke="#161514" strokeOpacity="0.08" strokeWidth="1.5" strokeDasharray="6 8" />
          <circle cx="300" cy="200" r="80" stroke="#161514" strokeOpacity="0.12" strokeWidth="1.5" />

          {/* Dynamic Communication Arcs */}
          <g stroke="#161514" strokeOpacity={isHovered ? '0.6' : '0.3'} strokeWidth="2">
            <line x1="300" y1="200" x2="160" y2="120" strokeDasharray="4 4" />
            <line x1="300" y1="200" x2="440" y2="120" strokeDasharray="4 4" />
            <line x1="300" y1="200" x2="440" y2="280" strokeDasharray="4 4" />
            <line x1="300" y1="200" x2="160" y2="280" strokeDasharray="4 4" />
            <path
              d="M 160 120 Q 300 60 440 120"
              stroke="#FF5A36"
              strokeWidth={isHovered ? '2.5' : '1.5'}
              strokeDasharray="400"
              strokeDashoffset={400 * (1 - progress)}
              fill="none"
              className="transition-all duration-300"
            />
            <path
              d="M 160 280 Q 300 340 440 280"
              stroke="#FF5A36"
              strokeWidth={isHovered ? '2.5' : '1.5'}
              strokeDasharray="400"
              strokeDashoffset={400 * (1 - progress)}
              fill="none"
              className="transition-all duration-300"
            />
          </g>

          {/* Central Consensus Hub */}
          <circle cx="300" cy="200" r="32" fill="#161514" />
          <circle cx="300" cy="200" r="10" fill="#FF5A36" className={isHovered ? 'animate-ping' : ''} />
          <text x="300" y="204" textAnchor="middle" fill="#F6F2EC" fontSize="9" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.05em">
            SYNTHESIS
          </text>

          {/* Agent 1: Auditor */}
          <g transform="translate(160, 120)">
            <rect x="-45" y="-18" width="90" height="36" rx="18" fill="#F2EEE8" stroke="#161514" strokeWidth="1.5" />
            <circle cx="-28" cy="0" r="4" fill="#FF5A36" />
            <text x="6" y="4" textAnchor="middle" fill="#161514" fontSize="10" fontFamily="monospace" fontWeight="bold">
              AUDITOR
            </text>
          </g>

          {/* Agent 2: Strategist */}
          <g transform="translate(440, 120)">
            <rect x="-50" y="-18" width="100" height="36" rx="18" fill="#F2EEE8" stroke="#161514" strokeWidth="1.5" />
            <circle cx="-32" cy="0" r="4" fill="#FF5A36" />
            <text x="6" y="4" textAnchor="middle" fill="#161514" fontSize="10" fontFamily="monospace" fontWeight="bold">
              STRATEGIST
            </text>
          </g>

          {/* Agent 3: Tax Specialist */}
          <g transform="translate(440, 280)">
            <rect x="-45" y="-18" width="90" height="36" rx="18" fill="#F2EEE8" stroke="#161514" strokeWidth="1.5" />
            <circle cx="-28" cy="0" r="4" fill="#FF5A36" />
            <text x="6" y="4" textAnchor="middle" fill="#161514" fontSize="10" fontFamily="monospace" fontWeight="bold">
              TAX GUARD
            </text>
          </g>

          {/* Agent 4: Risk Evaluator */}
          <g transform="translate(160, 280)">
            <rect x="-45" y="-18" width="90" height="36" rx="18" fill="#F2EEE8" stroke="#161514" strokeWidth="1.5" />
            <circle cx="-28" cy="0" r="4" fill="#FF5A36" />
            <text x="6" y="4" textAnchor="middle" fill="#161514" fontSize="10" fontFamily="monospace" fontWeight="bold">
              RISK AGENT
            </text>
          </g>

          {/* Minimal Label */}
          <text x="40" y="40" fill="#A39D94" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">
            MULTI-AGENT CONSENSUS GRAPH
          </text>
          <text x="560" y="40" textAnchor="end" fill="#FF5A36" fontSize="10" fontFamily="monospace" fontWeight="bold">
            FINORA // 2025
          </text>
        </svg>
      )}

      {/* 2. APTLY — Semantic Career & Qualification Mapping */}
      {type === 'matrix' && (
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full p-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Grid Lines */}
          <g stroke="#161514" strokeOpacity="0.08">
            <line x1="80" y1="90" x2="520" y2="90" />
            <line x1="80" y1="150" x2="520" y2="150" />
            <line x1="80" y1="210" x2="520" y2="210" />
            <line x1="80" y1="270" x2="520" y2="270" />
          </g>

          {/* Semantic Skill Rows */}
          <g>
            {/* Competency 1 */}
            <text x="80" y="125" fill="#161514" fontSize="11" fontFamily="sans-serif" fontWeight="bold">SYSTEM ARCHITECTURE</text>
            <rect x="260" y="112" width="180" height="18" rx="9" fill="#E8E0D6" />
            <rect
              x="260"
              y="112"
              width={170 * progress}
              height="18"
              rx="9"
              fill="#FF5A36"
              className="transition-all duration-300"
            />
            <text x="460" y="126" fill="#161514" fontSize="11" fontFamily="monospace" fontWeight="bold">94% MATCH</text>

            {/* Competency 2 */}
            <text x="80" y="185" fill="#161514" fontSize="11" fontFamily="sans-serif" fontWeight="bold">LLM &amp; MULTI-AGENT</text>
            <rect x="260" y="172" width="180" height="18" rx="9" fill="#E8E0D6" />
            <rect
              x="260"
              y="172"
              width={178 * progress}
              height="18"
              rx="9"
              fill="#161514"
              className="transition-all duration-300"
            />
            <text x="460" y="186" fill="#161514" fontSize="11" fontFamily="monospace" fontWeight="bold">98% MATCH</text>

            {/* Competency 3 */}
            <text x="80" y="245" fill="#161514" fontSize="11" fontFamily="sans-serif" fontWeight="bold">INTERACTION DESIGN</text>
            <rect x="260" y="232" width="180" height="18" rx="9" fill="#E8E0D6" />
            <rect
              x="260"
              y="232"
              width={155 * progress}
              height="18"
              rx="9"
              fill="#FF5A36"
              className="transition-all duration-300"
            />
            <text x="460" y="246" fill="#161514" fontSize="11" fontFamily="monospace" fontWeight="bold">88% MATCH</text>
          </g>

          {/* Semantic Trajectory Curve */}
          <path
            d="M 120 320 Q 300 290 480 320"
            stroke="#161514"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />
          <circle cx="300" cy="305" r="5" fill="#FF5A36" />

          <text x="40" y="40" fill="#A39D94" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">
            EXPLAINABLE CAREER INTELLIGENCE
          </text>
          <text x="560" y="40" textAnchor="end" fill="#161514" fontSize="10" fontFamily="monospace" fontWeight="bold">
            APTLY // 2025
          </text>
        </svg>
      )}

      {/* 3. VEYRA — Personal Financial Intelligence, Cashflow & Budget Health */}
      {type === 'analytics' && (
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full p-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Grid Accent */}
          <line x1="60" y1="310" x2="540" y2="310" stroke="#2D2B28" strokeWidth="1.5" />
          <line x1="60" y1="210" x2="540" y2="210" stroke="#2D2B28" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="60" y1="110" x2="540" y2="110" stroke="#2D2B28" strokeWidth="1" strokeDasharray="3 3" />

          {/* Spending Category Blocks & Budget Runway */}
          <g>
            {/* Category 1: Fixed / Housing */}
            <rect x="100" y={310 - 120 * progress} width="45" height={120 * progress} rx="8" fill="#242321" stroke="#2D2B28" className="transition-all duration-300" />
            <text x="122" y="332" textAnchor="middle" fill="#A39D94" fontSize="10" fontFamily="sans-serif">HOUSING</text>

            {/* Category 2: Discretionary / Living */}
            <rect x="180" y={310 - 160 * progress} width="45" height={160 * progress} rx="8" fill="#242321" stroke="#2D2B28" className="transition-all duration-300" />
            <text x="202" y="332" textAnchor="middle" fill="#A39D94" fontSize="10" fontFamily="sans-serif">LIVING</text>

            {/* Category 3: Savings / Investment */}
            <rect x="260" y={310 - 200 * progress} width="45" height={200 * progress} rx="8" fill="#FF5A36" className="transition-all duration-300" />
            <text x="282" y="332" textAnchor="middle" fill="#FF5A36" fontSize="10" fontFamily="sans-serif" fontWeight="bold">SAVINGS</text>

            {/* Category 4: Education & Tech */}
            <rect x="340" y={310 - 140 * progress} width="45" height={140 * progress} rx="8" fill="#242321" stroke="#2D2B28" className="transition-all duration-300" />
            <text x="362" y="332" textAnchor="middle" fill="#A39D94" fontSize="10" fontFamily="sans-serif">GROWTH</text>

            {/* Category 5: Buffer */}
            <rect x="420" y={310 - 180 * progress} width="45" height={180 * progress} rx="8" fill="#C8FF3D" className="transition-all duration-300" />
            <text x="442" y="332" textAnchor="middle" fill="#C8FF3D" fontSize="10" fontFamily="sans-serif" fontWeight="bold">BUFFER</text>
          </g>

          {/* Smooth Cashflow Trajectory Curve */}
          <path
            d="M 80 260 Q 200 220 280 140 T 440 100 T 520 80"
            fill="none"
            stroke={isHovered ? '#FF5A36' : '#F6F2EC'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="500"
            strokeDashoffset={500 * (1 - progress)}
            className="transition-all duration-300"
          />

          <circle cx="520" cy="80" r="6" fill="#FF5A36" />

          <text x="40" y="40" fill="#A39D94" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">
            PERSONAL CASHFLOW &amp; BUDGET HEALTH
          </text>
          <text x="560" y="40" textAnchor="end" fill="#FF5A36" fontSize="10" fontFamily="monospace" fontWeight="bold">
            VEYRA // 2024
          </text>
        </svg>
      )}

      {/* 4. NIKOT-E-METRO — Clean Topological Transit & Line Graphics */}
      {type === 'transit' && (
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full p-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Line 1: North-South Main (Vermilion) */}
          <path
            d="M 300 60 L 300 340"
            stroke="#FF5A36"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="300"
            strokeDashoffset={300 * (1 - progress)}
            className="transition-all duration-300"
          />

          {/* Line 2: East-West Corridor (Charcoal) */}
          <path
            d="M 100 200 L 500 200"
            stroke="#161514"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="400"
            strokeDashoffset={400 * (1 - progress)}
            className="transition-all duration-300"
          />

          {/* Line 3: Diagonal Loop */}
          <path
            d="M 160 300 L 300 200 L 440 100"
            stroke="#A39D94"
            strokeWidth="4"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />

          {/* Central Major Interchange Node */}
          <circle
            cx="300"
            cy="200"
            r="18"
            fill="#F2EEE8"
            stroke="#161514"
            strokeWidth="4"
          />
          <circle cx="300" cy="200" r="7" fill="#FF5A36" />
          <text x="300" y="240" textAnchor="middle" fill="#161514" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
            CENTRAL INTERCHANGE
          </text>

          {/* Stations */}
          <circle cx="300" cy="120" r="6" fill="#F2EEE8" stroke="#FF5A36" strokeWidth="3" />
          <circle cx="300" cy="280" r="6" fill="#F2EEE8" stroke="#FF5A36" strokeWidth="3" />
          <circle cx="180" cy="200" r="6" fill="#F2EEE8" stroke="#161514" strokeWidth="3" />
          <circle cx="420" cy="200" r="6" fill="#F2EEE8" stroke="#161514" strokeWidth="3" />

          <text x="40" y="40" fill="#A39D94" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">
            TOPOLOGICAL TRANSIT GRAPH
          </text>
          <text x="560" y="40" textAnchor="end" fill="#161514" fontSize="10" fontFamily="monospace" fontWeight="bold">
            NIKOT-E-METRO // 2024
          </text>
        </svg>
      )}
    </div>
  );
}
