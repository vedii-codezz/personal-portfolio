'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCursor } from '../cursor/CursorContext';
import { siteConfig } from '@/data/site';

const NAV_ITEMS = [
  { label: 'WORK', href: '/#work' },
  { label: 'ABOUT', href: '/#about' },
  { label: 'CONTACT', href: '/#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursorVariant, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
        isScrolled
          ? 'bg-charcoal/90 backdrop-blur-md border-b border-charcoal-light py-4 shadow-lg text-paper'
          : 'bg-transparent py-6 md:py-8 text-paper'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={resetCursor}
        >
          <span className="font-sans font-black tracking-tighter text-lg md:text-xl text-paper group-hover:text-vermilion transition-colors duration-200 uppercase">
            {siteConfig.name.split(' ')[0]}
          </span>
          <span className="h-2 w-2 rounded-full bg-vermilion" />
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-mono text-xs tracking-widest text-paper-muted hover:text-paper transition-colors duration-200 py-1 relative group"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={resetCursor}
            >
              <span className="text-charcoal-light text-[10px] mr-1 group-hover:text-vermilion transition-colors">
                0{index + 1}.
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Location & Contact Trigger on desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-wider text-paper-muted uppercase">
            {siteConfig.location}
          </span>
          <Link
            href="/#contact"
            className="font-mono text-[11px] font-bold tracking-widest px-3.5 py-1.5 bg-paper text-charcoal hover:bg-vermilion hover:text-paper transition-colors uppercase rounded-full"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={resetCursor}
          >
            LET&apos;S TALK
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden font-mono text-xs tracking-widest text-paper py-2 px-3 bg-charcoal-light border border-charcoal-elevated rounded-md"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? 'CLOSE [✕]' : 'MENU [☰]'}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[62px] bg-charcoal border-b border-charcoal-light px-6 py-8 flex flex-col gap-6 backdrop-blur-xl animate-fadeIn shadow-2xl">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans text-3xl font-black tracking-tight text-paper hover:text-vermilion transition-colors flex items-baseline justify-between"
            >
              <span>{item.label}</span>
              <span className="font-mono text-sm text-vermilion">0{index + 1}</span>
            </Link>
          ))}
          <div className="pt-6 border-t border-charcoal-light flex justify-between items-center font-mono text-xs text-paper-muted">
            <span>{siteConfig.location}</span>
            <span>{siteConfig.year}</span>
          </div>
        </div>
      )}
    </header>
  );
}
