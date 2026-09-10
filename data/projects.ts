export type Project = {
  slug: string;
  number: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  links: { github: string | null; live: string | null; caseStudy?: string | null };
};

export const projects = [
  {
    slug: "finora", number: "01", name: "FINORA",
    subtitle: "Multi-Agent Personal CFO", category: "MULTI-AGENT SYSTEM",
    description: "A multi-agent financial intelligence system with specialized agents for budgeting, affordability, loans, bills, investments, tax, and fraud analysis.",
    links: {
      caseStudy: "/project/finora",
      github: "https://github.com/Adhirajsingh2507/Error-404-Not-Found",
      live: "https://vibeforge-cyan.vercel.app/",
    },
  },
  {
    slug: "aptly", number: "02", name: "APTLY",
    subtitle: "Explainable Job Eligibility & ATS Assistant", category: "EXPLAINABLE ANALYSIS",
    description: "Analyzes job requirements and explains why a candidate matches, partially matches, or fails requirements—beyond an unexplained score.",
    links: {
      caseStudy: "/project/aptly",
      github: "https://github.com/vedii-codezz/aptly",
      live: "https://aptly-chi.vercel.app/",
    },
  },
  {
    slug: "veyra", number: "03", name: "VEYRA",
    subtitle: "Budget Analysis", category: "FRONTEND EXPERIENCE",
    description: "A frontend-focused financial analysis experience that makes personal financial information easier to understand through a polished visual interface.",
    links: {
      caseStudy: "/project/veyra",
      github: "https://github.com/vedii-codezz/budget-analysis-veyra",
      live: "https://budget-analysis-veyra.vercel.app/",
    },
  },
  {
    slug: "nikot-e-metro", number: "04", name: "NIKOT-E-METRO",
    subtitle: "Kolkata Metro Navigation", category: "INTERACTIVE NAVIGATION",
    description: "A Kolkata Metro navigation experience for finding nearby stations, understanding routes and interchanges, and navigating the city more easily.",
    links: {
      caseStudy: "/project/nikot-e-metro",
      github: "https://github.com/vedii-codezz/nikot-e-metro",
      live: null,
    },
  },
] as const satisfies readonly Project[];
