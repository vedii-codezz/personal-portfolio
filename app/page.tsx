import { PortfolioShell } from "@/components/layout/portfolio-shell";
import { Navigation } from "@/components/navigation/navigation";
import { Hero } from "@/components/hero/hero";
import { Intro } from "@/components/intro/intro";
import { SelectedWork } from "@/components/work/selected-work";
import { About } from "@/components/about/about";
import { TechStack } from "@/components/tech-stack/tech-stack";
import { Lab } from "@/components/lab/lab";
import { Contact } from "@/components/contact/contact";
import { portfolio } from "@/data/portfolio";

export default function Home() {
  return (
    <PortfolioShell>
      <a className="skip-link" href="#main">
        {portfolio.navigation.skipLabel}
      </a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Intro />
        <SelectedWork />
        <About />
        <TechStack />
        <Lab />
        <Contact />
      </main>
    </PortfolioShell>
  );
}
