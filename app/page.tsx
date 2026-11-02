import { Hero } from "@/components/Hero";
import { MyStory } from "@/components/MyStory";
import { SelectedWork } from "@/components/SelectedWork";
import { PortfolioMotion } from "@/components/PortfolioMotion";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Bedantika Mondal, home">b<span>m.</span><i aria-hidden="true">✳</i></a>
        <span className="header-note mono">INTELLIGENCE × EXPRESSION</span>
        <nav aria-label="Main navigation">
          <a href="#work">Selected work <span>04</span></a>
          <a href="#story">My story <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <main id="main">
        <Hero />
        <MyStory />
        <SelectedWork />
      </main>
      <footer className="site-footer">
        <a className="wordmark" href="#home" aria-label="Back to top">bm.</a>
        <p className="mono">BEDANTIKA MONDAL <span>© 2026</span></p>
        <a className="back-top" href="#home">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
      <PortfolioMotion />
    </>
  );
}
