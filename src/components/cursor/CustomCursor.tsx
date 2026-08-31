'use client';

import { useEffect, useRef, useState } from 'react';
import { useCursor } from './CursorContext';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/gsap';

export function CustomCursor() {
  const { cursorVariant, cursorText } = useCursor();
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    setIsTouch(isTouchDevice);
  }, []);

  useEffect(() => {
    if (!mounted || isTouch || prefersReducedMotion) return;

    const dot = cursorDotRef.current;
    const follower = cursorFollowerRef.current;
    if (!dot || !follower) return;

    // Direct GSAP quickSetters & quickTo for zero-overhead pointer tracking
    const xDotSet = gsap.quickSetter(dot, 'x', 'px');
    const yDotSet = gsap.quickSetter(dot, 'y', 'px');

    const xFollowerTo = gsap.quickTo(follower, 'x', { duration: 0.2, ease: 'power2.out' });
    const yFollowerTo = gsap.quickTo(follower, 'y', { duration: 0.2, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
      xDotSet(e.clientX);
      yDotSet(e.clientY);
      xFollowerTo(e.clientX);
      yFollowerTo(e.clientY);
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mounted, isTouch, prefersReducedMotion]);

  if (!mounted || isTouch || prefersReducedMotion) return null;

  const isTextMode = ['view', 'open', 'copy', 'copied', 'explore'].includes(cursorVariant);
  const displayText = cursorText || cursorVariant.toUpperCase();

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Primary Precision Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200 pointer-events-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isTextMode
            ? 'h-1 w-1 bg-vermilion opacity-0'
            : cursorVariant === 'hover'
            ? 'h-2 w-2 bg-vermilion'
            : 'h-1.5 w-1.5 bg-vermilion'
        }`}
      />

      {/* 2. Secondary Tactile Follower Ring / Interactive Pill */}
      <div
        ref={cursorFollowerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-[9px] tracking-widest uppercase transition-all duration-300 pointer-events-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          cursorVariant === 'default'
            ? 'h-9 w-9 border border-paper/40 dark:border-paper/40 bg-transparent mix-blend-difference'
            : cursorVariant === 'hover'
            ? 'h-12 w-12 border border-vermilion/90 bg-vermilion/10 scale-105'
            : cursorVariant === 'copied'
            ? 'h-16 w-16 border border-lime bg-charcoal text-lime font-bold scale-110 shadow-2xl'
            : 'h-16 w-16 border border-vermilion bg-charcoal text-paper font-semibold shadow-2xl'
        }`}
      >
        {isTextMode && (
          <span className="select-none animate-fadeIn leading-none text-[9px] font-bold tracking-wider text-vermilion">
            {displayText}
          </span>
        )}
      </div>
    </div>
  );
}
