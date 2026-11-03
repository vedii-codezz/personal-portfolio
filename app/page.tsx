import { Hero } from "@/components/Hero";
import { MyStory } from "@/components/MyStory";
import { SelectedWork } from "@/components/SelectedWork";
import { PortfolioMotion } from "@/components/PortfolioMotion";
import { FunProjects } from "@/components/FunProjects";
import { Brand } from "@/components/Brand";
import { ThemeControl } from "@/components/ThemeControl";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Bedantika Mondal, home"><Brand /></a>
        <span className="header-note mono">INTELLIGENCE × EXPRESSION</span>
        <nav aria-label="Main navigation">
          <a href="#work">Selected work <span>04</span></a>
          <a href="#playground">Playground <span aria-hidden="true">✳</span></a>
          <a href="#story">My story <span aria-hidden="true">↗</span></a>
        </nav>
        <ThemeControl />
      </header>
      <main id="main">
        <Hero />
        <SelectedWork />
        <FunProjects />
        <MyStory />
      </main>
      <footer className="site-footer">
        <a className="wordmark" href="#home" aria-label="Bedantika Mondal, back to top"><Brand /></a>
        <p className="mono">BEDANTIKA MONDAL <span>© 2026</span></p>
        <a className="back-top" href="#home">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
      <PortfolioMotion />
    </>
  );
}
