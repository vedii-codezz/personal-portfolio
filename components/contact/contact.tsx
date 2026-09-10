import { portfolio } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/section-label";
import { ExternalLink } from "@/components/ui/external-link";

export function Contact() {
  const contact = portfolio.contact;

  return (
    <footer id={portfolio.contact.id ?? "contact"} className="contact site-gutter pt-20 pb-12" aria-labelledby="contact-title" data-contact>
      <SectionLabel
        index={portfolio.contact.index ?? "06"}
        label={portfolio.contact.label ?? "CONTACT"}
        annotation={portfolio.contact.annotation ?? "CHANNELS & COLLABORATION"}
      />

      <div className="contact-layout pt-16 md:pt-24" data-contact-reveal>
        {/* Monumental Typographic Finale */}
        <div className="contact-headline border-b border-line pb-16 md:pb-24">
          <span className="metadata text-secondary">{portfolio.contact.eyebrow}</span>
          <h2 id="contact-title" className="contact-display mt-6 font-medium leading-none tracking-tighter">
            {portfolio.contact.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p className="mt-8 max-w-md text-base text-secondary md:text-lg">
            {portfolio.contact.invitation}
          </p>

          <div className="mt-10 flex flex-wrap gap-8 text-sm">
            {contact.github && (
              <ExternalLink href={contact.github} className="contact-action font-mono text-primary text-base">
                {portfolio.contact.githubLabel} ↗
              </ExternalLink>
            )}
            {/* Note: LinkedIn and Email are null in data/portfolio.ts, so no dead links are rendered */}
            {contact.linkedin && (
              <ExternalLink href={contact.linkedin} className="contact-action font-mono text-primary text-base">
                LinkedIn ↗
              </ExternalLink>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="contact-action font-mono text-primary text-base">
                {contact.email} ↗
              </a>
            )}
          </div>
        </div>

        {/* Restrained Colophon */}
        <div className="colophon mt-12 flex flex-col gap-6 text-xs font-mono text-secondary sm:flex-row sm:justify-between md:mt-16">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-8">
            <div>{portfolio.contact.colophon.name}</div>
            <div>{portfolio.contact.colophon.edition}</div>
          </div>
          <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-8 sm:text-right">
            <div>{portfolio.contact.colophon.stack}</div>
            <div>{portfolio.contact.colophon.location}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
