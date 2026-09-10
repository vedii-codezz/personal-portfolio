import { portfolio } from "@/data/portfolio";
import { ExternalLink } from "@/components/ui/external-link";

export function Navigation() {
  const { navigation, contact } = portfolio;
  return <header className="navigation site-gutter" data-nav>
    <a className="wordmark" href="#top" aria-label={navigation.homeLabel}>{portfolio.initials}<span aria-hidden="true">.</span></a>
    <span className="nav-edition metadata text-secondary">{navigation.edition}</span>
    <nav aria-label={navigation.label} className="flex items-center gap-6 sm:gap-9">
      {navigation.links.map(link => <a key={link.href} href={link.href} className="nav-link">{link.label}</a>)}
      <ExternalLink href={contact.github} className="nav-github">{portfolio.work.sourceLabel}</ExternalLink>
    </nav>
  </header>;
}
