export const workPresentation = {
  indexLabel: "Project chapters",
  chapterLabel: "Go to project",
  guide: "SCROLL TO EXPLORE",
  staticGuide: "PROJECT CHAPTERS",
  visualCaption: "CONCEPTUAL SYSTEM STUDY",
  visuals: {
    finora: {
      label: "Orchestration study: input passes through an orchestrator and specialist agents to judgment and synthesis.",
      input: "INPUT", center: "ORCHESTRATOR", judge: "JUDGE", output: "SYNTHESIS",
      agents: ["BUDGET", "AFFORDABILITY", "LOAN", "BILLS", "INVESTMENT", "TAX", "FRAUD"],
      caption: "DISTRIBUTED REASONING / SHARED CONTEXT",
    },
    aptly: {
      label: "Illustrative explainability matrix showing requirement states, not a real candidate assessment.",
      heading: "REQUIREMENT", state: "EVIDENCE STATE", annotation: "ILLUSTRATIVE STATES",
      rows: [["SKILL MATCH", "MATCHED"], ["EXPERIENCE", "PARTIAL"], ["PROJECT FIT", "MATCHED"], ["TOOLS", "MISSING"], ["ROLE ALIGNMENT", "UNKNOWN"]],
      why: "WHY?", reasoning: "A requirement needs supporting evidence. Missing information is kept distinct from a mismatch.",
      caption: "REQUIREMENTS / EVIDENCE / REASONING",
    },
    veyra: {
      label: "Abstract financial geometry: categories, segments, and flow lines. No live financial values.",
      heading: "A VIEW OF THE FLOW", incoming: "INFLOW", allocation: "ALLOCATION", outgoing: "OUTFLOW",
      caption: "STRUCTURE / BALANCE / PERSPECTIVE",
    },
    "nikot-e-metro": {
      label: "Conceptual transit network with station and interchange nodes; not an actual route map.",
      heading: "CONNECTIONS, MADE CLEAR", station: "STATION", interchange: "INTERCHANGE", annotation: "CONCEPTUAL / NOT TO SCALE",
      caption: "NEARBY / CONNECT / NAVIGATE",
    },
  },
} as const;
