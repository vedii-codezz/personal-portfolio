'use client';

import React, { useState } from 'react';
import { labExperiments } from '@/data/lab';
import { SectionHeader } from '../ui/SectionHeader';
import { MonospaceTag } from '../ui/MonospaceTag';
import { useCursor } from '../cursor/CursorContext';

export function Lab() {
  const [activeExp, setActiveExp] = useState<string | null>(null);
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <section
      id="lab"
      className="relative bg-cream-alt py-28 md:py-44 px-6 md:px-12 max-w-7xl mx-auto select-none border-t border-ink/5"
    >
      <SectionHeader number="04" title="LAB &amp; STUDIES" category="EXPERIMENTS" theme="light" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <p className="font-sans text-xl md:text-2xl font-bold text-ink-secondary max-w-xl leading-snug">
          An ongoing playground for creative coding studies, interaction physics, and early generative prototypes.
        </p>
        <span className="font-mono text-xs text-ink-muted tracking-widest uppercase">
          0{labExperiments.length} ACTIVE EXPERIMENTS
        </span>
      </div>

      {/* Modular Experimental Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {labExperiments.map((exp) => {
          const isHovered = activeExp === exp.id;

          return (
            <div
              key={exp.id}
              className={`group relative bg-cream p-8 md:p-10 flex flex-col justify-between transition-all duration-500 rounded-2xl border ${
                isHovered
                  ? 'border-vermilion shadow-2xl scale-[1.01]'
                  : 'border-ink/10 shadow-sm'
              }`}
              onMouseEnter={() => {
                setActiveExp(exp.id);
                setCursorVariant('explore', 'EXP');
              }}
              onMouseLeave={() => {
                setActiveExp(null);
                resetCursor();
              }}
            >
              {/* Card Top */}
              <div className="flex items-center justify-between font-mono text-xs text-ink-muted border-b border-ink/10 pb-4 mb-6">
                <span className="text-vermilion font-bold tracking-wider">
                  STUDY ({exp.number})
                </span>
                <span className="uppercase text-[11px] tracking-wider text-ink font-semibold">
                  {exp.year}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3 mb-8">
                <h3 className="font-sans font-black text-3xl md:text-4xl tracking-tight text-ink group-hover:text-vermilion transition-colors uppercase">
                  {exp.title}
                </h3>
                <p className="font-mono text-xs text-vermilion tracking-wide uppercase font-semibold">
                  {exp.subtitle}
                </p>
                <p className="text-base text-ink-secondary leading-relaxed pt-1">
                  {exp.description}
                </p>
              </div>

              {/* Interactive Visual Playground Window */}
              <div className="relative w-full h-40 bg-cream-alt rounded-xl overflow-hidden flex items-center justify-center mb-8 border border-ink/5">
                {/* EXP 001: Scroll Physics Preview */}
                {exp.type === 'physics' && (
                  <div className="w-full px-8 flex flex-col gap-3">
                    <div className="flex justify-between font-mono text-xs text-ink-muted font-bold">
                      <span>MOMENTUM CURVE</span>
                      <span>{isHovered ? 'VELOCITY: MAX' : 'VELOCITY: IDLE'}</span>
                    </div>
                    <div className="w-full h-3 bg-cream rounded-full overflow-hidden relative">
                      <div
                        className="h-full bg-vermilion transition-all duration-300 rounded-full"
                        style={{ width: isHovered ? '92%' : '35%' }}
                      />
                    </div>
                    <div className="font-mono text-[10px] text-ink-secondary text-right">
                      SPRING DAMPING // 0.82
                    </div>
                  </div>
                )}

                {/* EXP 002: Vector Field Preview */}
                {exp.type === 'vector-field' && (
                  <div className="grid grid-cols-6 gap-4 p-4">
                    {[...Array(18)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full transition-transform duration-300 flex items-center justify-center"
                        style={{
                          backgroundColor: isHovered && i % 2 === 0 ? '#FF5A36' : '#161514',
                          transform: isHovered
                            ? `rotate(${i * 25}deg) scale(1.3)`
                            : `rotate(${i * 10}deg)`,
                        }}
                      >
                        <div className="w-1 h-1 bg-paper rounded-full" />
                      </div>
                    ))}
                  </div>
                )}

                {/* EXP 003: LLM Token Attention Preview */}
                {exp.type === 'llm-tokens' && (
                  <div className="flex flex-wrap gap-2 p-4 justify-center">
                    {['PROMPT', 'ATTENTION', 'WEIGHT', '0.96', 'SYNTHESIS', 'TOKENS'].map((token, i) => (
                      <span
                        key={i}
                        className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md transition-colors duration-300 ${
                          isHovered && i % 2 === 0
                            ? 'bg-vermilion text-paper'
                            : 'bg-cream text-ink border border-ink/10'
                        }`}
                      >
                        {token}
                      </span>
                    ))}
                  </div>
                )}

                {/* EXP 004: Three.js Parametric Study Preview */}
                {exp.type === 'geometry' && (
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`w-16 h-16 border-2 border-ink rounded-lg transition-transform duration-700 ${
                        isHovered ? 'rotate-45 scale-110 border-vermilion' : 'rotate-12'
                      }`}
                    />
                    <div
                      className={`absolute w-12 h-12 border-2 border-dashed border-vermilion rounded-full transition-transform duration-1000 ${
                        isHovered ? '-rotate-90 scale-125' : 'rotate-45'
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* Bottom Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <MonospaceTag key={tag} active={isHovered} theme="light">
                    {tag}
                  </MonospaceTag>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
