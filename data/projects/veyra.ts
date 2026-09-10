export interface TransactionFixture {
  id: string;
  title: string;
  merchant: string;
  amount: number;
  category: string;
  date: string;
}

export interface CategoryBudgetData {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  utilization: number;
  status: "healthy" | "warning" | "exceeded";
  transactionCount: number;
  topMerchant: string;
  varianceNote: string;
}

export interface ScoreFactorData {
  id: string;
  name: string;
  weightPercent: number;
  weightDecimal: number;
  score: number;
  contribution: number;
  formula: string;
  explanation: string;
  benchmark: string;
  derivedFrom: string;
}

export interface CashFlowStreamData {
  channel: string;
  amount: number;
  percentage: number;
  classification: string;
  description: string;
  includedCategories: string[];
}

export const veyraData = {
  meta: {
    slug: "veyra",
    number: "03",
    name: "VEYRA",
    subtitle: "BUDGET ANALYSIS & FINANCIAL OBSERVATION INTERFACE",
    category: "COMPUTATIONAL UI & FINANCIAL VISUALIZATION",
    timeline: "2024",
    status: "INDEPENDENT SYSTEM / COMPLETED",
    links: {
      github: "https://github.com/vedii-codezz/budget-analysis-veyra",
      live: "https://budget-analysis-veyra.vercel.app/",
    },
    coordinates: [
      { label: "PROJECT ARCHITECTURE", value: "INDEPENDENT SYSTEM" },
      { label: "CORE REPOSITORY", value: "SOLO AUTHORSHIP (BEDANTIKA MONDAL)" },
      { label: "ENGINE TYPE", value: "DETERMINISTIC CLIENT CALCULATION" },
      { label: "STACK CORE", value: "NEXT.JS 14 / TYPESCRIPT / ZUSTAND" },
    ],
  },

  hero: {
    headline: [
      "RAW TRANSACTIONS ARE NOISE.",
      "STRUCTURE TURNS THEM INTO DECISIONS.",
    ],
    supportingPrinciple: "DETERMINISTIC ARITHMETIC. VISUAL FINANCIAL CLARITY.",
    summary:
      "A client-side personal finance observatory that transforms chronological debit line-items into spatial category allocations, transparent health indices, and continuous cash-flow streams without server round-trips.",
    syntheticDataNotice:
      "NOTICE: All figures presented in this case study are synthetic demonstration fixtures (March 2024 baseline). They do not represent real bank accounts, real user data, or personal finances.",
  },

  tension: {
    eyebrow: "01 / THE PROBLEM WITH THE LEDGER",
    heading: "Chronology Records Events. It Fails to Explain Them.",
    annotation: "TABULAR NOISE VS. STRUCTURAL AWARENESS",
    syntheticNotice: "SYNTHETIC FIXTURE EXCERPT // MARCH 2024 LEDGER",
    sampleTransactions: [
      { id: "TX-01", date: "2024-03-02", merchant: "Urban Shelter Prop", amount: "₹25,000", tag: "HOUSING" },
      { id: "TX-02", date: "2024-03-04", merchant: "Nature Fresh Mart", amount: "₹4,800", tag: "FOOD" },
      { id: "TX-03", date: "2024-03-07", merchant: "Metro Rail Transit", amount: "₹1,200", tag: "TRANSPORT" },
      { id: "TX-04", date: "2024-03-10", merchant: "Bistro 11 Dining", amount: "₹2,400", tag: "FOOD" },
      { id: "TX-05", date: "2024-03-14", merchant: "Aura Apparel Lab", amount: "₹8,600", tag: "SHOPPING" },
      { id: "TX-06", date: "2024-03-18", merchant: "Aura Apparel Lab", amount: "₹3,400", tag: "SHOPPING" },
    ],
    ledgerCritique: [
      {
        question: "WHERE IS THE MONEY ACTUALLY FLOWING?",
        failure: "A chronological list interlaces recurring housing bills with trivial coffee runs, burying structural patterns under temporal noise.",
        solution: "Veyra groups transactions into strict category envelopes with proportional spending fields.",
      },
      {
        question: "WHICH BUDGET CEILING IS UNDER STRESS?",
        failure: "Single debit rows provide zero context on cumulative burn relative to planned monthly thresholds.",
        solution: "Every transaction immediately updates category budget headroom, exposing variance before ceilings are exceeded.",
      },
      {
        question: "HOW MUCH LIQUID MARGIN REMAINS?",
        failure: "Account balances show cash on hand but fail to discount upcoming fixed obligations or track net savings rate.",
        solution: "Continuous cash-flow partitioning isolates essential commitments from discretionary liquidity.",
      },
      {
        question: "WHAT DOES THE MONTH ACTUALLY MEAN?",
        failure: "Standard bank statements deliver passive historical accounting instead of active decision-grade insight.",
        solution: "A 4-factor deterministic scoring engine calculates overall financial discipline into an interpretable metric.",
      },
    ],
  },

  engine: {
    eyebrow: "02 / THE DETERMINISTIC FINANCE ENGINE",
    heading: "Zero Inference. Verifiable Mathematical Foundations.",
    annotation: "TRANSPARENT CLIENT ARITHMETIC",
    description:
      "Financial interfaces require mathematical certainty rather than probabilistic guesswork. Veyra executes all transformations via pure, deterministic functions in src/lib/finance/index.ts, ensuring that every displayed total, variance flag, and health subscore is directly auditable.",
    formulas: [
      {
        label: "TOTAL MONTHLY SPEND",
        math: "S_{total} = \\sum_{t \\in T} t.amount",
        explanation: "Arithmetic sum of all outbound transaction amounts across the billing cycle.",
        fixtureValue: "₹58,400",
      },
      {
        label: "NET MONTHLY SAVINGS",
        math: "S_{net} = \\max(0, \\, I_{monthly} - S_{total})",
        explanation: "Remaining income after subtracting cumulative monthly expenditures from baseline earnings.",
        fixtureValue: "₹36,600 (from ₹95,000 base)",
      },
      {
        label: "SAVINGS RATE EFFICIENCY",
        math: "R_{savings} = \\left( \\frac{S_{net}}{I_{monthly}} \\right) \\times 100",
        explanation: "Proportional ratio of preserved capital against total earned gross income.",
        fixtureValue: "38.53%",
      },
      {
        label: "CATEGORY SPEND ACCUMULATION",
        math: "C_{spent}(k) = \\sum_{t \\in T, \\, t.category = k} t.amount",
        explanation: "Grouped summation mapping discrete transaction rows into designated budget categories.",
        fixtureValue: "8 Discrete Partitions",
      },
      {
        label: "BUDGET UTILIZATION RATIO",
        math: "U(k) = \\left( \\frac{C_{spent}(k)}{C_{allocated}(k)} \\right) \\times 100",
        explanation: "Percentage of allocated category ceiling consumed, driving variance threshold states.",
        fixtureValue: "Varies by Category",
      },
    ],
  },

  pipeline: {
    eyebrow: "03 / FROM TRANSACTIONS TO STRUCTURE",
    heading: "The Five-Stage Transformation Pipeline",
    annotation: "DATA REFINEMENT PROGRESSION",
    description:
      "Veyra processes raw data through an ordered progression rather than an opaque graph. Instead of displaying a chaotic list of events, the client engine refines inputs through five discrete computational layers.",
    stages: [
      {
        step: "01",
        name: "RAW INGESTION",
        unit: "Transaction Record",
        dataForm: "{ id, title, merchant, amount, category, date }",
        output: "Disjointed chronological entries with heterogeneous amounts and merchant labels.",
      },
      {
        step: "02",
        name: "CATEGORY NORMALIZATION",
        unit: "Category Bucket",
        dataForm: "k \\in {Housing, Food, Transport, Shopping, ...}",
        output: "Transactions are grouped into 8 standardized financial envelopes.",
      },
      {
        step: "03",
        name: "SUBTOTAL AGGREGATION",
        unit: "Cumulative Spend",
        dataForm: "C_{spent}(k) = \\sum t.amount",
        output: "Each envelope resolves its exact monetary sum and transaction velocity.",
      },
      {
        step: "04",
        name: "BUDGET VARIANCE DELTA",
        unit: "Headroom & Utilization",
        dataForm: "\\Delta(k) = C_{allocated}(k) - C_{spent}(k)",
        output: "Calculates remaining liquidity and assigns threshold status (Healthy / Warning / Exceeded).",
      },
      {
        step: "05",
        name: "DERIVED OBSERVABLES",
        unit: "Composite Metrics",
        dataForm: "VeyraScore, Cash-Flow River, Savings Rate",
        output: "High-level visual systems provide immediate, actionable clarity.",
      },
    ],
  },

  budgetField: {
    eyebrow: "04 / THE BUDGET FIELD",
    heading: "Spatial Allocation Envelopes & Variance Thresholds",
    annotation: "SIGNATURE VISUAL 01 // CATEGORY ALLOCATION MATRIX",
    description:
      "Traditional budgets display numbers in text columns. The Budget Field projects planned allocations and actual expenditures onto proportional geometry, rendering spending velocity, remaining margin, and threshold stress in a unified analytical matrix.",
    statusLegend: [
      { label: "HEALTHY", rule: "Utilization < 80%", trait: "Normal hairline border, quiet surface, positive headroom" },
      { label: "WARNING", rule: "80% ≤ Utilization < 100%", trait: "Dense diagonal indicator, elevated luminance, constrained margin" },
      { label: "EXCEEDED", rule: "Utilization ≥ 100%", trait: "Inverted typography, solid indicator fill, negative variance" },
    ],
    categories: [
      {
        category: "Housing",
        allocated: 25000,
        spent: 25000,
        remaining: 0,
        utilization: 100.0,
        status: "exceeded",
        transactionCount: 1,
        topMerchant: "Urban Shelter Prop",
        varianceNote: "Fully absorbed fixed obligation. Zero headroom remaining.",
      },
      {
        category: "Food",
        allocated: 15000,
        spent: 7200,
        remaining: 7800,
        utilization: 48.0,
        status: "healthy",
        transactionCount: 3,
        topMerchant: "Nature Fresh Mart",
        varianceNote: "Comfortable buffer. 52% allocated capacity intact.",
      },
      {
        category: "Transport",
        allocated: 8000,
        spent: 2800,
        remaining: 5200,
        utilization: 35.0,
        status: "healthy",
        transactionCount: 2,
        topMerchant: "Metro Rail Transit",
        varianceNote: "Low burn rate. Commute expenses well below planned limit.",
      },
      {
        category: "Shopping",
        allocated: 10000,
        spent: 12000,
        remaining: -2000,
        utilization: 120.0,
        status: "exceeded",
        transactionCount: 2,
        topMerchant: "Aura Apparel Lab",
        varianceNote: "Overrun by ₹2,000 (+20%). Directly impacts Expense Stability score.",
      },
      {
        category: "Entertainment",
        allocated: 6000,
        spent: 3400,
        remaining: 2600,
        utilization: 56.67,
        status: "healthy",
        transactionCount: 1,
        topMerchant: "CineVerse Plex",
        varianceNote: "Moderate burn. 43.3% headroom preserved.",
      },
      {
        category: "Healthcare",
        allocated: 5000,
        spent: 1800,
        remaining: 3200,
        utilization: 36.0,
        status: "healthy",
        transactionCount: 1,
        topMerchant: "Apex Diagnostics",
        varianceNote: "Discretionary medical buffer intact.",
      },
      {
        category: "Utilities",
        allocated: 7000,
        spent: 6200,
        remaining: 800,
        utilization: 88.57,
        status: "warning",
        transactionCount: 2,
        topMerchant: "State Electric Grid",
        varianceNote: "Threshold alert: 88.6% consumed. ₹800 remaining until overspend.",
      },
      {
        category: "Education",
        allocated: 5000,
        spent: 0,
        remaining: 5000,
        utilization: 0.0,
        status: "healthy",
        transactionCount: 0,
        topMerchant: "None recorded",
        varianceNote: "100% capacity reserved for planned courses.",
      },
    ] as CategoryBudgetData[],
  },

  veyraScore: {
    eyebrow: "05 / THE VEYRASCORE",
    heading: "A 4-Factor Weighted Composite Financial Index",
    annotation: "SIGNATURE VISUAL 02 // COMPOSITE HEALTH ENGINE",
    notice:
      "PROJECT-SPECIFIC INTERNAL METRIC: VeyraScore is a prototype composite indicator designed to synthesize multiple spending variables into a single interpretable benchmark. It does NOT represent a credit bureau score, creditworthiness rating, or financial advisory certification.",
    compositeScore: 78,
    tier: "STRONG",
    tierDefinition: "Calculated composite ≥ 75. Demonstrates disciplined primary savings with localized discretionary pressure.",
    tiers: [
      { tier: "EXCELLENT", range: "85 – 100", trait: "Optimal savings rate (>35%), zero budget breaches, minimal discretionary variance." },
      { tier: "STRONG", range: "75 – 84", trait: "High primary savings, solid fixed allocations, minor category overruns." },
      { tier: "STABLE", range: "60 – 74", trait: "Positive cash-flow, moderate budget discipline, variable discretionary ratio." },
      { tier: "ATTENTION", range: "45 – 59", trait: "Constrained savings margin, multiple categories at warning or exceeded thresholds." },
      { tier: "CRITICAL", range: "0 – 44", trait: "Negative net savings, severe budget breaches, high discretionary burn." },
    ],
    factors: [
      {
        id: "savingsHealth",
        name: "SAVINGS HEALTH",
        weightPercent: 35,
        weightDecimal: 0.35,
        score: 100,
        contribution: 35.0,
        formula: "\\min(100, \\, (R_{savings} / 35) \\times 100)",
        explanation: "Evaluates net savings against a 35% target savings rate. A 38.5% rate achieves the 100-point ceiling.",
        benchmark: "Target: ≥ 35% of Gross Inflow",
        derivedFrom: "₹36,600 saved on ₹95,000 monthly income (38.53%)",
      },
      {
        id: "budgetDiscipline",
        name: "BUDGET DISCIPLINE",
        weightPercent: 25,
        weightDecimal: 0.25,
        score: 75,
        contribution: 18.75,
        formula: "(\\text{Compliant Categories} / \\text{Total Categories}) \\times 100",
        explanation: "Proportion of budget envelopes where actual spend remained strictly at or below allocated ceilings.",
        benchmark: "Target: 100% Envelope Adherence",
        derivedFrom: "6 of 8 categories compliant (Housing at cap, Shopping exceeded by ₹2,000)",
      },
      {
        id: "expenseStability",
        name: "EXPENSE STABILITY",
        weightPercent: 20,
        weightDecimal: 0.20,
        score: 34,
        contribution: 6.8,
        formula: "\\max(0, \\, (1 - (R_{discretionary} / 0.40)) \\times 100)",
        explanation: "Penalizes disproportionate spending on discretionary lifestyle categories (Shopping + Entertainment) vs total spend.",
        benchmark: "Target: Discretionary Ratio < 40%",
        derivedFrom: "₹15,400 discretionary spend over ₹58,400 total spend (26.37% ratio)",
      },
      {
        id: "goalProgress",
        name: "GOAL PROGRESS",
        weightPercent: 20,
        weightDecimal: 0.20,
        score: 87,
        contribution: 17.4,
        formula: "(\\sum C_{current} / \\sum T_{target}) \\times 100",
        explanation: "Composite funding trajectory across all active user-defined savings goals (Emergency Fund, Travel, Hardware).",
        benchmark: "Target: 100% Cumulative Funding",
        derivedFrom: "₹1,30,500 accumulated across ₹1,50,000 in target savings milestones",
      },
    ] as ScoreFactorData[],
  },

  cashFlow: {
    eyebrow: "06 / THE CASH-FLOW SYSTEM",
    heading: "Parametric Inflow Branching & Capital Allocation",
    annotation: "SIGNATURE VISUAL 03 // LIQUIDITY DISTRIBUTION",
    description:
      "Rather than treating money as an amorphous single balance, Veyra models cash movement as a parametric branching stream. Gross income arrives as a single inflow and immediately bifurcates into four functional channels with explicit capital priorities.",
    baselineInflow: "₹95,000",
    inflowLabel: "GROSS MONTHLY INFLOW",
    inflowNotice: "SYNTHETIC DEMONSTRATION FIXTURE // MARCH 2024",
    streams: [
      {
        channel: "ESSENTIALS",
        amount: 28500,
        percentage: 30.0,
        classification: "NON-NEGOTIABLE FIXED COMMITMENTS",
        description: "Housing mortgage/rent, utilities, vital transit, and baseline nutrition.",
        includedCategories: ["Housing (₹25,000)", "Utilities (₹6,200 sub-alloc)", "Transport (₹2,800 sub-alloc)"],
      },
      {
        channel: "LIFESTYLE",
        amount: 18400,
        percentage: 19.37,
        classification: "DISCRETIONARY CONSUMPTION",
        description: "Apparel, dining out, recreation, and cultural entertainment.",
        includedCategories: ["Shopping (₹12,000)", "Entertainment (₹3,400)", "Dining (₹3,000)"],
      },
      {
        channel: "INVESTMENTS",
        amount: 11500,
        percentage: 12.1,
        classification: "LONG-TERM CAPITAL FORMATION",
        description: "Systematic monthly mutual fund allocations and tax-saving deposits.",
        includedCategories: ["Index Fund SIP (₹7,500)", "Retirement Anchor (₹4,000)"],
      },
      {
        channel: "LIQUID BUFFER",
        amount: 36600,
        percentage: 38.53,
        classification: "UNCOMMITTED CAPITAL & SAVINGS",
        description: "Liquid reserve available for emergency reserves or short-term milestone funding.",
        includedCategories: ["High-Yield Liquidity Reserve", "Short-Term Goal Envelopes"],
      },
    ] as CashFlowStreamData[],
  },

  reactivity: {
    eyebrow: "07 / REACTIVE FINANCIAL STATE",
    heading: "Real-Time Client-Side Recalculation",
    annotation: "IN-MEMORY STATE ORCHESTRATION",
    description:
      "Veyra executes zero round-trips to an external server when updating financial state. Every interaction flows through an in-memory Zustand store that immediately recomputes derived totals, budget variance deltas, and the composite VeyraScore across the entire UI.",
    mutationFlow: [
      {
        step: "01",
        label: "USER MUTATION",
        detail: "User adds, edits, or removes a transaction via the client modal interface.",
      },
      {
        step: "02",
        label: "ZUSTAND STORE UPDATE",
        detail: "The in-memory transaction array updates deterministically without blocking the main UI thread.",
      },
      {
        step: "03",
        label: "FUNCTIONAL RECALCULATION",
        detail: "calculateCategorySpend, calculateSavings, and calculateVeyraScore re-execute as pure synchronous operations.",
      },
      {
        step: "04",
        label: "SYNCHRONOUS UI RE-RENDER",
        detail: "The Budget Field, Score Gauge, and Cash-Flow streams re-render with fresh values instantaneously.",
      },
    ],
    benchmarkNote:
      "ARCHITECTURE NOTE: All computations are synchronous JavaScript functions operating over in-memory arrays. Because there is no network latency, recomputations complete within the single browser animation frame.",
  },

  engineering: {
    eyebrow: "08 / ENGINEERING THE INTERFACE",
    heading: "The Implemented Frontend Architecture",
    annotation: "TECHNICAL LEDGER & DEPENDENCY BOUNDARIES",
    description:
      "Veyra's codebase is structured around single-responsibility modules in Next.js 14, pairing TypeScript type safety with composable client components.",
    stackGroups: [
      {
        category: "CORE RUNTIME",
        items: [
          { name: "Next.js 14", detail: "App Router architecture with fast React server component page shells" },
          { name: "TypeScript", detail: "Strict typing for financial models, transaction objects, and health indices" },
        ],
      },
      {
        category: "STATE & LOGIC",
        items: [
          { name: "Zustand", detail: "Lightweight, un-opinionated in-memory store for instant transaction mutations" },
          { name: "Pure Finance Math", detail: "src/lib/finance/index.ts housing all deterministic calculations" },
        ],
      },
      {
        category: "GEOMETRY & MOTION",
        items: [
          { name: "GSAP & ScrollTrigger", detail: "Controlled section transitions with zero scroll-jacking" },
          { name: "Framer Motion", detail: "Spring physics for category drawer interactions and modal dialogs" },
          { name: "Lenis", detail: "Smooth inertia scrolling supporting the narrative reading rhythm" },
        ],
      },
      {
        category: "STYLING & ICONS",
        items: [
          { name: "Tailwind CSS", detail: "Utility-first layout geometry with custom design system variables" },
          { name: "Lucide React", detail: "Crisp, lightweight geometric icons for financial categories" },
        ],
      },
    ],
  },

  scopeDiscipline: {
    eyebrow: "09 / FRONTEND-ONLY BY DESIGN",
    heading: "Deliberate Architectural Boundaries",
    annotation: "THE MERIT OF PROTOTYPE RIGOR",
    intro:
      "Engineering integrity requires transparency about what was built versus what was intentionally left out of scope. Veyra was conceived and built as a frontend computational prototype to explore financial data visualization, not as a commercial banking backend.",
    boundaries: [
      {
        boundary: "NO PERSISTENT DATABASE",
        reality: "Package dependencies such as @neondatabase/serverless and drizzle-orm were explored during early scaffolding but never connected to a live database or schema. All state is strictly ephemeral in Zustand.",
      },
      {
        boundary: "NO USER AUTHENTICATION",
        reality: "There are no login forms, JWT tokens, or multi-tenant database partitions. The interface operates as a local single-user sandbox.",
      },
      {
        boundary: "NO LIVE BANK SYNC (PLAID / OPEN BANKING)",
        reality: "No external banking APIs or aggregators are queried. All data originates from curated synthetic JSON fixtures.",
      },
      {
        boundary: "NO PREDICTIVE AI / MACHINE LEARNING",
        reality: "All insights, thresholds, and scores are derived through direct deterministic arithmetic, not probabilistic machine learning models.",
      },
    ],
  },

  authorship: {
    eyebrow: "10 / INDEPENDENT PROJECT",
    heading: "Solo Repository Authorship",
    annotation: "DIRECT REPOSITORY PROVENANCE",
    attribution: "DESIGNED AND BUILT BY BEDANTIKA MONDAL",
    summary:
      "Veyra is an independent exploration of personal finance interfaces. Git history verifies 100% of commits authored by Bedantika Mondal across the project lifecycle.",
    areas: [
      {
        domain: "FINANCIAL CALCULATION ENGINE",
        detail: "Formulated and implemented all deterministic formulas for category spend, budget variance, and the composite VeyraScore.",
      },
      {
        domain: "INTERACTIVE DATA VISUALIZATION",
        detail: "Architected the spatial Budget Field, Cash-Flow River geometry, and responsive category inspection drawers.",
      },
      {
        domain: "FRONTEND SYSTEM IMPLEMENTATION",
        detail: "Built the complete Next.js 14 application, Zustand state store, and CSS layout architecture.",
      },
      {
        domain: "DEPLOYMENT & OPTIMIZATION",
        detail: "Configured build pipelines and deployed the live interactive application to Vercel.",
      },
    ],
  },

  retrospective: {
    eyebrow: "11 / RETROSPECTIVE",
    heading: "Observations from Designing Financial UI",
    annotation: "ENGINEERING TRADE-OFFS & REFLECTIONS",
    reflections: [
      {
        title: "MATHEMATICAL TRANSPARENCY OVER BLACK-BOX METRICS",
        body: "Users distrust financial indicators when the underlying arithmetic is hidden. Breaking VeyraScore down into four transparent sub-metrics with exposed formulas builds immediate credibility.",
      },
      {
        title: "SPATIAL PROPORTION COMMUNICATES FASTER THAN TABLES",
        body: "A user scanning an 8-row financial table must perform mental arithmetic to understand burn rates. Spatial envelope geometry allows the brain to grasp category stress in fractions of a second.",
      },
      {
        title: "CLIENT-SIDE REACTIVITY CREATES INTUITIVE FEEDBACK",
        body: "By keeping the calculation engine in-memory, changing or removing a single transaction updates every downstream chart without delay, creating a tight feedback loop between cause and effect.",
      },
      {
        title: "PROTOTYPE DISCIPLINE PROTECTS DESIGN FOCUS",
        body: "Resisting the urge to prematurely build authentication or relational databases allowed full creative attention to be dedicated to visualization mechanics, typography, and responsive ergonomics.",
      },
    ],
  },

  nextProject: {
    index: "12",
    nextNumber: "04",
    nextName: "NIKOT-E-METRO",
    nextSubtitle: "KOLKATA METRO TRANSIT NAVIGATOR",
    nextCategory: "TRANSIT ARCHITECTURE & WAYFINDING",
  },
} as const;
