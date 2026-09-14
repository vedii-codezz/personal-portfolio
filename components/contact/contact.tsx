import { portfolio } from "@/data/portfolio";
import { ExternalLink } from "@/components/ui/external-link";

export function Contact() {
  const { contact } = portfolio;

  return (
    <footer
      id={contact.id ?? "contact"}
      className="contact site-gutter min-h-[90svh] flex flex-col justify-between pt-24 pb-12 border-t border-line"
      aria-labelledby="contact-title"
      data-contact
    >
      {/* Top Label */}
      <div className="flex items-center justify-between border-b border-line pb-4 font-mono text-xs uppercase tracking-widest text-secondary">
        <span>06 // FINALE</span>
        <span>KOLKATA / WEST BENGAL</span>
      </div>

      {/* Monumental Typographic Ending */}
      <div className="contact-headline my-auto py-12" data-contact-reveal>
        <h2 id="contact-title" className="contact-display font-sans font-extrabold text-[12vw] sm:text-[10vw] lg:text-[8.5vw] leading-[0.88] tracking-tighter text-primary">
          <span className="block">LET'S BUILD</span>
          <span className="block text-secondary/60">SOMETHING</span>
          <span className="block">WORTH</span>
          <span className="block text-primary">EXPLORING.</span>
        </h2>

        {/* Singular Verified Action */}
        <div className="mt-12 sm:mt-16 flex items-center gap-6">
          {contact.github && (
            <ExternalLink
              href={contact.github}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-primary text-canvas font-mono text-sm font-semibold rounded hover:bg-primary/90 transition-colors"
            >
              <span>GITHUB // @vedii-codezz</span>
            </ExternalLink>
          )}
        </div>
      </div>

      {/* Restrained Colophon */}
      <div className="colophon border-t border-line pt-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 font-mono text-xs text-secondary/70">
        <div>{contact.colophon.name} • {contact.colophon.edition}</div>
        <div className="text-secondary/50">{contact.colophon.stack}</div>
      </div>
    </footer>
  );
}
