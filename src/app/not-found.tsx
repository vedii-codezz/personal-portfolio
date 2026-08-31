import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-cream flex flex-col items-center justify-center px-6 text-center select-none">
      <span className="font-mono text-xs text-vermilion tracking-widest uppercase font-bold mb-4">
        ERROR · 404
      </span>
      <h1 className="font-sans font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter text-ink uppercase mb-4">
        PAGE NOT FOUND
      </h1>
      <p className="font-mono text-sm text-ink-muted max-w-md mb-8">
        The requested pathway does not exist in this catalog.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-ink text-paper hover:bg-vermilion transition-colors font-mono text-xs uppercase tracking-widest font-bold"
      >
        RETURN TO HOMEPAGE [←]
      </Link>
    </div>
  );
}
