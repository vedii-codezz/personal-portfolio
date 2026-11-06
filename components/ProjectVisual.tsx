import type { Project } from "@/data/projects";

export function ProjectVisual({ slug }: { slug: Project["slug"] }) {
  return <div className={`project-visual visual-${slug}`} aria-hidden="true">
    <div className="visual-grid" />
    <div className="project-settle"><div className="project-parallax"><div className="project-pointer">
    {slug === "finora" && <div className="finora-study"><div className="finora-ring ring-outer" /><div className="finora-ring ring-inner" /><span className="agent agent-top">BUDGET</span><span className="agent agent-left">INVESTMENT</span><span className="agent agent-right">AFFORDABILITY</span><span className="agent agent-bottom">FRAUD ANALYSIS</span><div className="finora-core"><span>f<span className="core-dot">.</span></span><small>FINORA</small></div><span className="visual-bottom mono">SPECIALIZED REASONING. SHARED CONTEXT.</span></div>}
    {slug === "veyra" && <div className="veyra-study"><span className="visual-brand">VEYRA<span>®</span></span><div className="flow-ribbon ribbon-one" /><div className="flow-ribbon ribbon-two" /><div className="flow-ribbon ribbon-three" /><div className="veyra-caption mono"><span>OBSERVE.</span><span>UNDERSTAND.</span><span>REBALANCE.</span></div><span className="visual-bottom mono">THE SHAPE OF FINANCIAL CLARITY</span></div>}
    {slug === "aptly" && <div className="aptly-study"><span className="aptly-brand">APTLY<span>/</span></span><div className="evidence-sheet"><div className="sheet-header mono"><span>REQUIREMENT</span><span>EVIDENCE STATE</span></div><div><span>Skill match</span><b>MATCHED ↗</b></div><div><span>Experience</span><b className="partial">PARTIAL ↗</b></div><div><span>Tools</span><b className="unknown">UNKNOWN ↗</b></div><p className="mono">SOURCE → RULE → EVIDENCE → DECISION</p></div><span className="visual-bottom mono">ILLUSTRATIVE STATES / NOT A CANDIDATE ASSESSMENT</span></div>}
    {slug === "nikot-e-metro" && <div className="metro-study"><span className="metro-brand">নিকটে মেট্রো<span>NIKOT-E-METRO</span></span><svg className="metro-map" viewBox="0 0 600 350" fill="none"><path className="metro-line-one" d="M-20 310H130L330 110H620" /><path className="metro-line-two" d="M-10 60H180L370 250H620" /><path className="metro-line-three" d="M140 -20V125L330 315V380" />{[[100,310],[220,220],[330,110],[450,110],[100,60],[260,140],[370,250],[490,250],[140,80],[220,205],[330,315]].map(([cx,cy], i)=><circle key={i} cx={cx} cy={cy} r={i===1?10:6} />)}</svg><span className="visual-bottom mono">CONCEPTUAL NETWORK / NOT A LIVE ROUTE MAP</span></div>}
    </div></div></div>
    <span className="study-label mono">ORIGINAL VISUAL STUDY / NOT A PRODUCT SCREENSHOT</span>
  </div>;
}
