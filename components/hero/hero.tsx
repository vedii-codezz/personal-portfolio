import Image from "next/image";
import { portfolio } from "@/data/portfolio";

export function Hero() {
  const { hero, nameLines } = portfolio;
  return <section className="hero site-gutter" aria-labelledby="hero-title" data-hero>
    <div className="hero-meta metadata" data-hero-meta>
      <span>{hero.academic}</span>
      <span className="hero-roles">{hero.roles.map(role => <span key={role}>{role}</span>)}</span>
    </div>
    <div className="hero-composition">
      <div className="portrait-mask" data-portrait-mask>
        <Image {...hero.portrait} preload sizes="(max-width: 640px) 76vw, (max-width: 1000px) 48vw, 38vw"
          className="hero-portrait" />
      </div>
      <h1 id="hero-title" className="hero-title">
        {nameLines.map((line, i) => <span className={`hero-line hero-line-${i + 1}`} key={line}>
          <span data-hero-line>{line}</span>
        </span>)}
      </h1>
      <div className="hero-statement" data-hero-meta>
        <p>{hero.statement.map(line => <span key={line}>{line}</span>)}</p>
        <a href="#work" className="hero-work-link"><span className="work-arrow" aria-hidden="true">↓</span>{hero.workLabel}</a>
      </div>
      <span className="portrait-caption metadata text-secondary" data-hero-meta>{hero.portraitLabel}</span>
    </div>
  </section>;
}
