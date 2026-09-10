import { workPresentation } from "@/data/project-visuals";

function Finora() {
  const data = workPresentation.visuals.finora;
  return <svg viewBox="0 0 520 480" role="img" aria-label={data.label}>
    <g className="diagram-lines">
      <path d="M30 225H70M305 225H340M340 55V395M340 55H395M340 110H395M340 165H395M340 225H395M340 285H395M340 340H395M340 395H395M188 275V435H400" />
      <path className="active-path" d="M30 225H70M305 225H395" />
      <rect className="orchestrator-node" x="70" y="175" width="235" height="100" />
      <circle cx="340" cy="225" r="4" fill="currentColor" />
    </g>
    <g className="diagram-text"><text x="30" y="153">{data.input}</text><text x="188" y="233" textAnchor="middle" className="diagram-strong">{data.center}</text>
      {data.agents.map((agent, i) => <g key={agent}><circle cx="395" cy={[55,110,165,225,285,340,395][i]} r="3" fill="currentColor"/><text x="505" textAnchor="end" y={[43,98,153,213,273,328,383][i]}>{agent}</text></g>)}
      <text x="198" y="418">{data.judge}</text><text x="345" y="458">{data.output}</text>
    </g>
  </svg>;
}

function Aptly() {
  const data = workPresentation.visuals.aptly;
  return <div className="matrix" aria-label={data.label}>
    <div className="matrix-annotation metadata">{data.annotation}</div>
    <div className="matrix-header metadata"><span>{data.heading}</span><span>{data.state}</span></div>
    {data.rows.map(([label,state]) => <div className="matrix-row" key={label}><span>{label}</span><span className={`matrix-state state-${state.toLowerCase()}`}><i aria-hidden="true" />{state}</span></div>)}
    <details className="matrix-reason"><summary>{data.why}<span aria-hidden="true">+</span></summary><p>{data.reasoning}</p></details>
  </div>;
}

function Veyra() {
  const data = workPresentation.visuals.veyra;
  return <svg viewBox="0 0 520 480" role="img" aria-label={data.label}>
    <g className="diagram-text"><text x="30" y="40">{data.heading}</text><text x="30" y="450">{data.incoming}</text><text x="208" y="450">{data.allocation}</text><text x="407" y="450">{data.outgoing}</text></g>
    <g fill="currentColor">
      <path d="M40 105H235V190H40Z" opacity=".85"/>
      <path d="M40 200H130V310H40Z" opacity=".34"/>
      <path d="M140 200H235V250H140Z" opacity=".14"/>
      <path d="M140 260H235V310H140Z" opacity=".55"/>
      <path d="M264 382L414 102H465L315 382Z" opacity=".9"/>
      <path d="M335 382L433 200H465L367 382Z" opacity=".13"/>
    </g>
    <g className="diagram-lines"><path d="M30 85H485M30 405H485M250 65V420"/><path d="M30 355H170L250 275H355L485 145" className="flow-line"/><circle cx="250" cy="275" r="5" fill="#050505"/><path d="M30 335V375M485 125V165"/></g>
  </svg>;
}

function Metro() {
  const data = workPresentation.visuals["nikot-e-metro"];
  return <svg viewBox="0 0 520 480" role="img" aria-label={data.label}>
    <g className="diagram-text"><text x="30" y="40">{data.heading}</text><text x="30" y="450">{data.annotation}</text></g>
    <g fill="none" stroke="currentColor"><path d="M30 395V275L230 75H500" strokeWidth="2" opacity=".28"/><path d="M15 145H160L405 390H500" strokeWidth="4" opacity=".48"/><path d="M125 410V325L350 100V65" strokeWidth="5" /></g>
    <g className="station-nodes">{[[30,395],[30,300],[90,215],[160,145],[230,75],[370,75],[500,75],[15,145],[80,145],[405,390],[500,390],[125,410],[125,325],[350,100],[350,65]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5"/>)}<circle cx="227.5" cy="212.5" r="18"/><circle cx="227.5" cy="212.5" r="10"/><circle cx="160" cy="145" r="11"/></g>
    <g className="diagram-text"><text x="262" y="235">{data.interchange}</text><text x="385" y="110">{data.station}</text></g>
  </svg>;
}

export function ProjectVisual({ slug }: { slug: string }) {
  const key = slug as keyof typeof workPresentation.visuals;
  const data = workPresentation.visuals[key];
  if (!data) return null;
  return <figure className={`project-visual visual-${slug}`}>
    <div className="visual-body">{slug === "finora" ? <Finora /> : slug === "aptly" ? <Aptly /> : slug === "veyra" ? <Veyra /> : <Metro />}</div>
    <figcaption className="metadata">{data.caption}</figcaption>
  </figure>;
}
