export type Project = {
  slug: "finora" | "veyra" | "aptly" | "nikot-e-metro";
  name: string; category: string; title: string; description: string;
  technologies: readonly string[]; github: string; live: string | null;
};

// Public project facts verified against the adjacent original portfolio and project source.
// See docs/implementation.md for source locations. Visual studies are not screenshots.
export const projects: readonly Project[] = [
  {
    slug: "finora", name: "Finora", category: "AI / MULTI-AGENT SYSTEMS",
    title: "Many minds. One financial perspective.",
    description: "A multi-agent personal CFO exploration. Specialized agents handle budgeting, affordability, loans, bills, investments, tax, and fraud analysis, while deterministic Python tools handle calculations and guardrails.",
    technologies: ["Python", "Multi-agent orchestration", "Language models"],
    github: "https://github.com/Adhirajsingh2507/Error-404-Not-Found", live: null,
  },
  {
    slug: "veyra", name: "VEYRA", category: "CREATIVE FRONTEND / FINANCIAL VISUALIZATION",
    title: "Make sense of the flow.",
    description: "A frontend-focused budget analysis experience. Transactions become categories, calculations, and financial observations through a considered visual interface and client-side state.",
    technologies: ["Next.js", "TypeScript", "Zustand", "GSAP"],
    github: "https://github.com/vedii-codezz/budget-analysis-veyra", live: null,
  },
  {
    slug: "aptly", name: "APTLY", category: "AI / EXPLAINABLE OPPORTUNITY INTELLIGENCE",
    title: "Not just if you fit. Why.",
    description: "An explainable job eligibility and ATS assistant that compares candidate evidence with opportunity requirements. Gemini interprets messy language; a deterministic TypeScript engine decides eligibility.",
    technologies: ["Next.js", "TypeScript", "Gemini", "Zod"],
    github: "https://github.com/vedii-codezz/aptly", live: "https://aptly-chi.vercel.app/",
  },
  {
    slug: "nikot-e-metro", name: "Nikot-e-Metro", category: "SPATIAL COMPUTATION / INTERACTIVE NAVIGATION",
    title: "A city, more connected.",
    description: "A Kolkata Metro navigation experience connecting user location, nearby stations, routes, and interchanges. Spatial discovery and graph-based routing help make the journey easier to understand.",
    technologies: ["Next.js", "TypeScript", "MapLibre", "Drizzle ORM"],
    github: "https://github.com/vedii-codezz/nikot-e-metro", live: null,
  },
];
