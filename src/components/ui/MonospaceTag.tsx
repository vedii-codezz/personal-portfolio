import React from 'react';
import { cn } from '@/lib/utils';

interface MonospaceTagProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  theme?: 'light' | 'dark';
}

export function MonospaceTag({ children, className, active, theme = 'light' }: MonospaceTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase transition-colors duration-200',
        theme === 'light'
          ? active
            ? 'bg-vermilion text-paper font-medium'
            : 'bg-cream-alt/70 text-ink-secondary hover:bg-cream-dark/60 hover:text-ink'
          : active
          ? 'bg-vermilion text-paper font-medium'
          : 'bg-charcoal-light/70 text-paper-muted hover:bg-charcoal-elevated hover:text-paper',
        className
      )}
    >
      <span
        className={cn(
          'h-1 w-1 rounded-full',
          active
            ? 'bg-paper'
            : theme === 'light'
            ? 'bg-ink/30'
            : 'bg-paper/30'
        )}
      />
      {children}
    </span>
  );
}
