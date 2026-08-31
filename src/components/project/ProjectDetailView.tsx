'use client';

import React from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { ProjectVisualMetaphor } from './ProjectVisualMetaphor';
import { MonospaceTag } from '../ui/MonospaceTag';
import { useCursor } from '../cursor/CursorContext';

interface ProjectDetailViewProps {
  project: Project;
  nextProject: Project;
}

export function ProjectDetailView({ project, nextProject }: ProjectDetailViewProps) {
  const { setCursorVariant, resetCursor } = useCursor();

  return (
    <div className="bg-cream min-h-screen text-ink pt-28 md:pt-36 pb-28 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between border-b border-ink/10 pb-6 mb-12">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ink hover:text-vermilion transition-colors uppercase"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={resetCursor}
          >
            <span>←</span>
            <span>BACK TO SELECTED WORK</span>
          </Link>
          <span className="font-mono text-xs text-ink-muted">
            PROJECT ({project.number})
          </span>
        </div>

        {/* Project Hero Header */}
        <header className="space-y-6 mb-16">
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-ink-muted">
            <span className="text-vermilion font-bold">({project.number})</span>
            <span>YEAR · {project.year}</span>
            <span>DISCIPLINE · {project.tags[0]}</span>
          </div>

          <h1 className="font-sans font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tighter text-ink uppercase leading-[0.85]">
            {project.title}
          </h1>

          <p className="font-sans text-2xl sm:text-3xl md:text-4xl text-ink-secondary font-bold tracking-tight max-w-4xl leading-snug">
            {project.subtitle} — {project.tagline}
          </p>

          {/* Tags and Links */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-ink/10">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <MonospaceTag key={tag} theme="light">{tag}</MonospaceTag>
              ))}
            </div>

            <div className="flex items-center gap-6">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold tracking-wider text-ink hover:text-vermilion transition-colors uppercase"
                >
                  [SOURCE REPO ↗]
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Big Visual Stage */}
        <section className="mb-24">
          <ProjectVisualMetaphor
            type={project.visualType}
            className="shadow-2xl"
            isHovered={true}
          />
        </section>

        {/* Editorial Sections */}
        <div className="space-y-24">
          {/* 1. Problem & Core Idea */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-ink/10 pt-12">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-vermilion tracking-widest uppercase">
                (01) THE CHALLENGE
              </span>
              <h2 className="font-sans font-black text-3xl md:text-4xl text-ink tracking-tight uppercase">
                Problem
              </h2>
              <p className="text-lg text-ink-secondary leading-relaxed">
                {project.details.problem}
              </p>
            </div>

            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-vermilion tracking-widest uppercase">
                (02) THE FORMULATION
              </span>
              <h2 className="font-sans font-black text-3xl md:text-4xl text-ink tracking-tight uppercase">
                Core Idea
              </h2>
              <p className="text-lg text-ink-secondary leading-relaxed">
                {project.details.idea}
              </p>
            </div>
          </section>

          {/* 2. System Architecture Pipeline */}
          <section className="border-t border-ink/10 pt-12">
            <div className="max-w-3xl mb-10">
              <span className="font-mono text-xs font-bold text-vermilion tracking-widest uppercase">
                (03) SYSTEM ARCHITECTURE
              </span>
              <h2 className="font-sans font-black text-4xl md:text-5xl text-ink tracking-tight mt-2 mb-4 uppercase">
                {project.details.architecture.title}
              </h2>
              <p className="text-lg text-ink-secondary">
                {project.details.architecture.description}
              </p>
            </div>

            {/* Step Nodes Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {project.details.architecture.nodes.map((node, i) => (
                <div
                  key={node}
                  className="p-6 bg-cream-alt rounded-xl border border-ink/5 flex flex-col justify-between h-40"
                >
                  <span className="font-mono text-xs font-bold text-vermilion">
                    0{i + 1}.
                  </span>
                  <span className="font-sans text-sm font-bold text-ink uppercase tracking-wide">
                    {node}
                  </span>
                  <span className="h-1 w-8 bg-vermilion rounded-full" />
                </div>
              ))}
            </div>
          </section>

          {/* 3. Key Capabilities */}
          <section className="border-t border-ink/10 pt-12">
            <span className="font-mono text-xs font-bold text-vermilion tracking-widest uppercase">
              (04) CAPABILITIES
            </span>
            <h2 className="font-sans font-black text-4xl md:text-5xl text-ink tracking-tight mt-2 mb-10 uppercase">
              Key Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.details.keyFeatures.map((feat, i) => (
                <div key={feat.title} className="p-8 bg-cream-alt rounded-2xl border border-ink/5 space-y-3">
                  <span className="font-mono text-xs text-vermilion font-bold">0{i + 1}.</span>
                  <h3 className="font-sans font-black text-2xl text-ink tracking-tight uppercase">
                    {feat.title}
                  </h3>
                  <p className="text-base text-ink-muted leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Interaction & Outcome */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-ink/10 pt-12">
            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-vermilion tracking-widest uppercase">
                (05) INTERACTION DESIGN
              </span>
              <h2 className="font-sans font-black text-3xl md:text-4xl text-ink tracking-tight uppercase">
                Interface Philosophy
              </h2>
              <p className="text-lg text-ink-secondary leading-relaxed">
                {project.details.interactionDesign}
              </p>
            </div>

            <div className="space-y-4">
              <span className="font-mono text-xs font-bold text-vermilion tracking-widest uppercase">
                (06) OUTCOME
              </span>
              <h2 className="font-sans font-black text-3xl md:text-4xl text-ink tracking-tight uppercase">
                Result &amp; Impact
              </h2>
              <p className="text-lg text-ink-secondary leading-relaxed">
                {project.details.outcome}
              </p>
            </div>
          </section>

          {/* 5. Tech Stack */}
          <section className="border-t border-ink/10 pt-12">
            <span className="font-mono text-xs font-bold text-vermilion tracking-widest uppercase">
              (07) TECH STACK
            </span>
            <div className="flex flex-wrap gap-3 mt-6">
              {project.details.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-cream-alt rounded-lg font-mono text-xs font-bold uppercase tracking-wider text-ink border border-ink/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Next Project Teaser */}
        <div className="mt-32 border-t-2 border-ink pt-16">
          <Link
            href={`/project/${nextProject.slug}`}
            className="group block"
            onMouseEnter={() => setCursorVariant('view', 'NEXT')}
            onMouseLeave={resetCursor}
          >
            <div className="flex items-center justify-between font-mono text-xs text-ink-muted mb-4 uppercase">
              <span>NEXT PROJECT</span>
              <span className="text-vermilion font-bold">({nextProject.number})</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-sans font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter text-ink group-hover:text-vermilion transition-colors uppercase">
                {nextProject.title}
              </h3>
              <span className="font-mono text-sm font-bold text-ink flex items-center gap-3">
                <span>VIEW CASE STUDY</span>
                <span className="text-2xl text-vermilion group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
