# BEDANTIKA MONDAL — PORTFOLIO

The personal portfolio and technical workspace of Bedantika Mondal, a Computer Science & Engineering student specializing in Artificial Intelligence and Machine Learning. The site explores intelligent systems, algorithmic interfaces, and experimental interaction design through interactive technical case studies.

**Live Portfolio:** [personal-portfolio-blush-tau-wfgo7q7k9o.vercel.app](https://personal-portfolio-blush-tau-wfgo7q7k9o.vercel.app/)  
**GitHub Profile:** [github.com/vedii-codezz](https://github.com/vedii-codezz)

---

## THE IDEA

Most engineering portfolios reduce complex engineering to a generic grid of cards—static screenshots accompanied by lists of keywords.

This portfolio uses editorial storytelling, purposeful motion, and deep technical case studies to document not just what was built, but how each system was reasoned about. Rather than relying on heavy third-party 3D runtimes, the site employs structured DOM interaction models, semantic instruments, and explicit constraints to let visitors inspect how the software functions.

---

## SELECTED WORK

The portfolio presents four systems across multi-agent orchestration, explainable decision engines, deterministic budgeting interfaces, and computed transit routing.

### 01 / FINORA
**Multi-Agent Personal CFO**  
*Collaborative Team Hackathon Project*

A multi-agent personal finance system exploring seven domain specialists coordinated through an LLM orchestration layer and validated by an orthogonal deterministic safety judge.

- **Case Study:** `/project/finora`
- **GitHub:** [github.com/Adhirajsingh2507/Error-404-Not-Found](https://github.com/Adhirajsingh2507/Error-404-Not-Found)
- **Live:** [vibeforge-cyan.vercel.app](https://vibeforge-cyan.vercel.app/)

### 02 / APTLY
**Explainable Job Eligibility & ATS Assistant**  
*Independent Project*

An explainability-first evaluation engine that decomposes job eligibility into structured evidence chains, transparent four-state eligibility evaluations, and deterministic gap analysis.

- **Case Study:** `/project/aptly`
- **GitHub:** [github.com/vedii-codezz/aptly](https://github.com/vedii-codezz/aptly)
- **Live:** [aptly-chi.vercel.app](https://aptly-chi.vercel.app/)

### 03 / VEYRA
**Budget Analysis & Financial Observation Interface**  
*Independent Project*

A frontend-only deterministic financial workspace that transforms synthetic transaction logs into structured budget allocations, liquidity velocity metrics, and a transparent financial health score without server persistence or external sync.

- **Case Study:** `/project/veyra`
- **GitHub:** [github.com/vedii-codezz/budget-analysis-veyra](https://github.com/vedii-codezz/budget-analysis-veyra)
- **Live:** [budget-analysis-veyra.vercel.app](https://budget-analysis-veyra.vercel.app/)

### 04 / NIKOT-E-METRO
**Kolkata Metro Navigation & Spatial Discovery System**  
*Independent Project*

A full-stack transit prototype exploring nearest-station discovery, multimodal routing, graph algorithms, and subterranean interchange concourse modeling for the Kolkata Metro network.

- **Case Study:** `/project/nikot-e-metro`
- **GitHub:** [github.com/vedii-codezz/nikot-e-metro](https://github.com/vedii-codezz/nikot-e-metro)
- **Live:** No verified public deployment

---

## CASE STUDY SYSTEM

Rather than forcing every project into a single card template, each case study features custom interactive instruments tailored to its problem space:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     FINORA      │     │      APTLY      │     │      VEYRA      │     │  NIKOT-E-METRO  │
│  Orchestration  │     │ Evidence Chain  │     │ Financial Field │     │ Spatial Transit │
│    Topology     │     │ & Status Matrix │     │ & Budget State  │     │  Routing Graph  │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

- **Finora — Orchestration Topology:** A topological view of coordinator delegation across seven domain specialists, validated by a dual-axis (`RESPONSE_OK` vs. `TRANSACTION_SAFE`) gatekeeper.
- **Aptly — Evidence Chain & Status Matrix:** A transparent breakdown classifying requirements into four distinct states (`ELIGIBLE`, `BORDERLINE`, `NOT_ELIGIBLE`, `UNKNOWN`), showing cited resume chunks and concrete remedy steps.
- **Veyra — Financial Field & Health Metric:** An interactive 50/30/20 budget envelope inspector, cash flow velocity chart, and deterministic 0–100 VeyraScore rubric.
- **Nikot-e-Metro — Spatial Routing Graph:** An interactive radial proximity heuristic field, Pareto multi-criteria trade-off matrix, and a physical subterranean concourse connection diagram.

---

## TECHNICAL FOUNDATION

The portfolio is built as a lightweight, statically prerendered web application using modern Web APIs and strict monochromatic design tokens:

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 & Vanilla CSS custom properties
- **Animation:** GSAP 3 & ScrollTrigger (scoped lifecycle contexts)
- **Testing:** Vitest & JSDOM for animation lifecycle and case-study invariant validation
- **Typography:** Geist Sans (editorial text) & Geist Mono (technical annotations and metadata)

The system includes responsive layouts, reduced-motion preferences, keyboard-accessible interactions, and static case-study routes. It does not rely on WebGL, Three.js, or heavyweight 3D runtime libraries.

---

## MOTION ARCHITECTURE

Motion in the portfolio is functional, restrained, and strictly scoped:

- **Desktop Horizontal Reel:** On screens 1024px and wider, Selected Work pins a single container track and translates projects horizontally across scroll progress.
- **Mobile Vertical Stack:** Below 1024px, horizontal pinning is disabled; the track converts into a standard vertical project sequence to eliminate touch gesture fighting.
- **Restrained Case Study Motion:** Case studies prioritize readable editorial prose and static diagrams. Finora uses exactly one pinned sequence on desktop; Aptly, Veyra, and Nikot use zero pinned sequences.
- **Reduced-Motion Support:** When `prefers-reduced-motion: reduce` is detected, ScrollTriggers unpin and elements revert to readable resting states immediately.
- **Lifecycle Cleanup:** All ScrollTrigger instances and timelines are bound to a scoped `gsap.context()` and reverted on unmount to prevent memory leaks during client-side navigation.

---

## DESIGN PRINCIPLES

- **MONOCHROME OVER DECORATION:** The site adheres to a five-value palette (`#050505`, `#F3F3EF`, `#A3A3A0`, `#111111`, and `rgba(255, 255, 255, 0.14)`). No arbitrary chromatic accents or decorative gradients.
- **SYSTEMS OVER SCREENSHOTS:** Projects are explained through structural diagrams, data models, and interactive instruments rather than passive device mockups.
- **MOTION WITH PURPOSE:** Animations exist to communicate spatial transitions and hierarchy, never as idle ornament.
- **EXPLAIN THE DECISION, NOT JUST THE FEATURE:** Case studies highlight why an architecture, algorithm, or boundary was chosen over alternatives.
- **LIMITATIONS ARE PART OF THE CASE STUDY:** Synthetic data scopes, client-side boundaries, absence of real-time transit telemetry, and collaborative team attribution are made explicit.

---

## VALIDATION

The repository includes a dedicated validation report covering type checks, tests, responsive behavior, motion lifecycle, reduced-motion behavior, and route validation.

See [VALIDATION.md](VALIDATION.md) for full audit reports and verification records.

---

## RUN LOCALLY

### Prerequisites
- Node.js 18.18+ or later
- npm

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/vedii-codezz/personal-portfolio.git
cd personal-portfolio
npm install
```

### Development Server
```bash
npm run dev
```

The application will be accessible at `http://127.0.0.1:4173`.

### Verification Commands
```bash
# Typecheck
npm run typecheck

# Run test suite
npm test

# Production build
npm run build

# Preview production build locally
npm run start
```

---

## PROJECT STRUCTURE

```text
personal-portfolio/
├── app/
│   ├── globals.css                # Monochromatic tokens, reset, typography
│   ├── work.css                   # Selected Work reel styling
│   ├── case-study.css             # Shared case study stage styles
│   ├── layout.tsx                 # Root HTML shell & metadata
│   ├── page.tsx                   # Homepage composition
│   └── project/                   # Static architectural case study routes
│       ├── aptly/page.tsx
│       ├── finora/page.tsx
│       ├── nikot-e-metro/page.tsx
│       └── veyra/page.tsx
├── components/
│   ├── about/                     # About section & editorial fragments
│   ├── case-study/                # Shared case study navigation & shell
│   ├── contact/                   # Minimal contact links
│   ├── hero/                      # Hero composition & portrait masking
│   ├── intro/                     # Core identity statement
│   ├── lab/                       # Experimental studies & SVG isometric wireframes
│   ├── layout/                    # Portfolio shell & GSAP lifecycle wrapper
│   ├── navigation/                # Top masthead & section anchor navigation
│   ├── project/                   # Custom instruments per case study
│   │   ├── aptly/                 # Status matrix & evidence chain
│   │   ├── finora/                # Agent topology & two-axis judge
│   │   ├── nikot/                 # Radial proximity field & interchange diagram
│   │   └── veyra/                 # 50/30/20 budget field & VeyraScore inspector
│   ├── tech-stack/                # Categorized skill taxonomy
│   └── work/                      # Selected Work reel & horizontal track
├── data/
│   ├── portfolio.ts               # Core site content, copy, and lab records
│   ├── projects.ts                # Selected Work summary records
│   └── projects/                  # In-depth case study data & specifications
├── lib/
│   ├── animations.ts              # Homepage GSAP setup & scroll timelines
│   ├── case-study-motion.ts       # Restrained case study reveal motion
│   └── project-reel.ts            # Horizontal scroll calculations & unpin thresholds
└── tests/
    ├── animations.test.ts         # Motion lifecycle & reduced-motion tests
    └── case-study.test.ts         # Case study invariants & pin constraint tests
```

---

## STATUS

```
PORTFOLIO // 2026
CURRENT STATE: COMPLETE
CASE STUDIES: LIVE
FINAL QA: PASSED (ALL CHECKS GREEN)
```

---

## AUTHOR

**Bedantika Mondal**  
CSE × AI/ML Student, Developer, Builder, Experimenter  
Kolkata, India

- **Live Portfolio:** [personal-portfolio-blush-tau-wfgo7q7k9o.vercel.app](https://personal-portfolio-blush-tau-wfgo7q7k9o.vercel.app/)  
- **GitHub:** [github.com/vedii-codezz](https://github.com/vedii-codezz)
