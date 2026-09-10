# Bedantika Mondal — Implementation plan

## Milestone 4 — FINORA Case Study (/project/finora)

Full architectural case study for **FINORA (Multi-Agent Personal CFO)** grounded in the verified repository implementation.

### Narrative Arc:
- `00 / PROJECT HERO`: Monumental display typography, coordinates, abstract orchestration graphic, Live Project & GitHub links.
- `01 / THE CORE TENSION`: Arithmetic vs. Reasoning — why financial AI fails on raw LLM prompts; ripple effects of personal finance decisions.
- `02 / THE DETERMINISTIC-FIRST BOUNDARY`: "The Model Plans. The Engine Calculates." Fast-path router vs. multi-agent pipeline.
- `03 / SYSTEM TOPOGRAPHY` (Signature Visual 1): Cinematic 5-stage orchestration schematic (Router → Planner → Specialists → Judge → Synthesis) with fast-path bypass. One desktop pinned sequence (≥1024px).
- `04 / THE SEVEN SPECIALISTS` (Signature Visual 2): Non-card interactive instrument stage (Budget, Affordability, Loan, Bills, Investment, Tax, Fraud) with exact formulas, inputs, and output schemas.
- `05 / THE TWO-AXIS JUDGE` (Signature Visual 3): Reflection guardrail (`response_ok` vs `transaction_safe`) solving the fraud paradox; bounded ≤ 2 revision loop.
- `06 / TRACE & EXPLAINABILITY`: Execution provenance without private chain-of-thought; structural decision timeline.
- `07 / ENGINEERING CONSTRAINTS & STACK`: Stdlib-only money math, signed stateless HS256 tokens, single-origin Vercel Python serverless function.
- `08 / TEAM CONTEXT & ROLE`: Collaborative hackathon context with student-builder framing (contribution details cleanly marked for user confirmation).
- `09 / RETROSPECTIVE & TRADE-OFFS`: Engineering trade-offs (latency vs. accuracy, ephemeral state limits, next steps).
- `10 / NEXT CASE STUDY`: Monumental transition to 02 / APTLY (safe non-broken link).

### Implementation Phases:
- **Phase 4.1:** Data model (`data/projects/finora.ts`) + reusable case-study infrastructure (`components/case-study/*`) + route (`app/project/finora/page.tsx`) + Project Hero.
- **Phase 4.2:** Core Tension + Deterministic Boundary + Engineering Stack sections.
- **Phase 4.3:** The 3 Signature Visuals (System Topography, 7-Specialist Stage, Two-Axis Judge Matrix) + Trace view.
- **Phase 4.4:** Team/Role shell + Retrospective + Next Project teaser + responsive/a11y validation + homepage link connection.

## Completed milestones
- Milestone 1: Navigation, Hero, Intro, Selected Work foundation.
- Milestone 2: Cinematic pinned Selected Work reel (Finora, Aptly, Veyra, Nikot-e-Metro) with project visuals and keyboard access.
- Milestone 2.1: Visual art-direction, responsive validation, performance, and accessibility polish.
- Milestone 3: Full implementation of About, Tech Stack, Lab, and Contact.
- Milestone 3.1: Art-direction polish (rule reduction, breathing room, surface feedback, colophon grouping).
