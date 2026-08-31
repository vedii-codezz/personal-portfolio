import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  number: string;
  title: string;
  category?: string;
  theme?: 'light' | 'dark';
  className?: string;
}

export function SectionHeader({ number, title, category, theme = 'light', className }: SectionHeaderProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6 mb-14 md:mb-20',
        isDark ? 'border-charcoal-light' : 'border-ink/10',
        className
      )}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span
          className={cn(
            'font-mono text-xs md:text-sm font-semibold tracking-widest',
            isDark ? 'text-vermilion' : 'text-vermilion'
          )}
        >
          ({number})
        </span>
        <h2
          className={cn(
            'text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black tracking-tighter uppercase',
            isDark ? 'text-paper' : 'text-ink'
          )}
        >
          {title}
        </h2>
      </div>
      {category && (
        <span
          className={cn(
            'font-mono text-xs tracking-widest uppercase',
            isDark ? 'text-paper-muted' : 'text-ink-muted'
          )}
        >
          {category}
        </span>
      )}
    </div>
  );
}
