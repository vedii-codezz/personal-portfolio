"use client";

import { handleTabKeyDown } from "@/lib/tab-keyboard";

import { useState } from "react";
import type { LandmarkOrigin } from "@/data/projects/nikot";

interface NikotRadialFieldProps {
  origins: readonly LandmarkOrigin[];
}

export function NikotRadialField({ origins }: NikotRadialFieldProps) {
  const [selectedOriginId, setSelectedOriginId] = useState<string>(origins[0].id);

  const activeOrigin = origins.find((o) => o.id === selectedOriginId) || origins[0];
  const nearestStation = activeOrigin.candidateStations.find((s) => s.isNearest) || activeOrigin.candidateStations[0];

  return (
    <div className="nikot-radial-field space-y-8" data-radial-field>
      {/* Origin Selection Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 border border-line bg-[#0a0a0a] rounded">
        <div>
          <span className="font-mono text-[10px] text-secondary tracking-widest uppercase block mb-1">
            SELECT CONCEPTUAL ORIGIN
          </span>
          <span className="font-sans text-sm sm:text-base font-semibold text-primary">
            {activeOrigin.name} ({activeOrigin.bengaliName})
          </span>
        </div>

        {/* Origin Selector Tabs */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          onKeyDown={handleTabKeyDown}
          aria-label="Conceptual Origins"
        >
          {origins.map((origin) => {
            const isSelected = origin.id === selectedOriginId;
            return (
              <button
                key={origin.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                aria-controls={`origin-panel-${origin.id}`}
                id={`origin-tab-${origin.id}`}
                onClick={() => setSelectedOriginId(origin.id)}
                className={`px-3 py-2 font-mono text-xs rounded border transition-all min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? "bg-primary text-canvas border-primary font-bold"
                    : "bg-[#111111] text-secondary border-line hover:text-primary hover:border-primary/50"
                }`}
              >
                {origin.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Inspection Grid */}
      <div
        id={`origin-panel-${activeOrigin.id}`}
        role="tabpanel"
        aria-labelledby={`origin-tab-${activeOrigin.id}`}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Spatial Radial Field Diagram (Desktop / Tablet) */}
        <div className="lg:col-span-7 p-6 sm:p-8 border border-line bg-[#0a0a0a] rounded space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="font-mono text-xs font-semibold text-primary">
              RADIAL ACCESS SCHEMATIC
            </span>
            <span className="font-mono text-[11px] text-secondary">
              NOT TO SCALE
            </span>
          </div>

          {/* SVG Concentric Distance Contours */}
          <div className="relative w-full aspect-square max-h-[360px] mx-auto border border-line/40 bg-[#050505] rounded flex items-center justify-center p-4">
            <svg
              viewBox="-180 -180 360 360"
              className="w-full h-full text-primary"
              aria-hidden="true"
            >
              {/* Concentric distance rings */}
              <circle cx="0" cy="0" r="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.25" fill="none" />
              <circle cx="0" cy="0" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.25" fill="none" />
              <circle cx="0" cy="0" r="150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.2" fill="none" />

              {/* Ring Labels */}
              <text x="5" y="-55" fill="currentColor" fillOpacity="0.4" fontSize="9" fontFamily="monospace"></text>
              <text x="5" y="-105" fill="currentColor" fillOpacity="0.4" fontSize="9" fontFamily="monospace"></text>
              <text x="5" y="-155" fill="currentColor" fillOpacity="0.4" fontSize="9" fontFamily="monospace"></text>

              {/* Center Origin Node */}
              <circle cx="0" cy="0" r="6" fill="currentColor" />
              <circle cx="0" cy="0" r="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <text x="14" y="4" fill="currentColor" fontSize="10" fontFamily="monospace" fontWeight="bold">
                ORIGIN
              </text>

              {/* Candidate nodes: schematic positions do not encode geographic distance */}
              {activeOrigin.candidateStations.map((station, idx) => {
                // Approximate angular positions for clean display
                const angle = idx === 0 ? 35 : idx === 1 ? 165 : 285;
                const rad = (angle * Math.PI) / 180;
                const distanceScale = 65 + idx * 35; // Decorative spacing, not measured distance.
                const x = Math.round(distanceScale * Math.cos(rad));
                const y = Math.round(distanceScale * Math.sin(rad));

                return (
                  <g key={station.name}>
                    {/* Vector Connector */}
                    <line
                      x1="0"
                      y1="0"
                      x2={x}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth={station.isNearest ? "2" : "1"}
                      strokeOpacity={station.isNearest ? "0.9" : "0.3"}
                      strokeDasharray={station.isNearest ? undefined : "2 2"}
                    />

                    {/* Station Marker */}
                    <circle
                      cx={x}
                      cy={y}
                      r={station.isNearest ? 7 : 5}
                      fill={station.isNearest ? "#f3f3ef" : "#111111"}
                      stroke="#f3f3ef"
                      strokeWidth="1.5"
                    />

                    {/* Text Label */}
                    <text
                      x={x + (x > 0 ? 10 : -10)}
                      y={y + (y > 0 ? 12 : -8)}
                      textAnchor={x > 0 ? "start" : "end"}
                      fill="currentColor"
                      fillOpacity={station.isNearest ? 1 : 0.65}
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight={station.isNearest ? "bold" : "normal"}
                    >
                      {station.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="font-sans text-xs text-secondary leading-relaxed">
            {activeOrigin.context}
          </p>
        </div>

        {/* Right Column: Ranked Candidate Station Ledger */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="font-mono text-xs font-semibold text-primary uppercase">
              CANDIDATE NODES
            </span>
            <span className="font-mono text-[10px] text-secondary">
              CONCEPTUAL RELATIONSHIPS
            </span>
          </div>

          <div className="space-y-3">
            {activeOrigin.candidateStations.map((station, idx) => (
              <div
                key={station.name}
                className={`p-4 rounded border transition-all ${
                  station.isNearest
                    ? "bg-[#141414] border-primary"
                    : "bg-[#0a0a0a] border-line opacity-85"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      0{idx + 1}.
                    </span>
                    <div>
                      <span className="font-sans text-sm font-semibold text-primary block">
                        {station.name}
                      </span>
                      <span className="font-mono text-[10px] text-secondary">
                        {station.bengaliName} • {station.lineId}
                      </span>
                    </div>
                  </div>

                  {station.isNearest && (
                    <span className="font-mono text-[10px] px-2 py-0.5 border border-primary bg-primary text-canvas font-bold uppercase">
                      EXAMPLE FOCUS
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 mt-2 border-t border-line/60 font-mono text-xs">
                  <div>
                    <span className="text-secondary text-[10px] uppercase block">STRAIGHT-LINE</span>
                    <span className="text-primary font-medium">PROXIMITY</span>
                  </div>
                  <div>
                    <span className="text-secondary text-[10px] uppercase block">WALKING DURATION</span>
                    <span className="text-primary font-medium">
                      ACCESS CONNECTION
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Access Summary Callout */}
          <div className="p-4 border border-line bg-[#050505] rounded font-mono text-xs space-y-1">
            <span className="text-secondary text-[10px] uppercase tracking-wider block">
              CONCEPTUAL ENTRY NODE
            </span>
            <div className="text-primary font-medium">
              <span className="underline">{nearestStation.name}</span> connects {activeOrigin.name} to the example graph.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
