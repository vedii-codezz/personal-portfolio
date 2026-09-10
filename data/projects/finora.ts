export const finoraData = {
  meta: {
    slug: "finora",
    number: "01",
    name: "FINORA",
    subtitle: "Multi-Agent Personal CFO",
    category: "MULTI-AGENT SYSTEM",
    timeline: "2026",
    status: "HACKATHON EXPLORATION",
    links: {
      github: "https://github.com/Adhirajsingh2507/Error-404-Not-Found",
      live: "https://vibeforge-cyan.vercel.app/",
    },
    coordinates: [
      { label: "SYSTEM TYPE", value: "MULTI-AGENT ORCHESTRATION" },
      { label: "FOUNDATION MODEL", value: "LLAMA 3.3 70B (GROQ) / NIM" },
      { label: "BACKEND INFRA", value: "FASTAPI / PYTHON 3.13 (STDLIB MATH)" },
      { label: "STATE ARCHITECTURE", value: "STATELESS SIGNED TOKENS (HS256)" },
    ],
  },
  hero: {
    headline: ["THE MODEL PLANS.", "THE ENGINE CALCULATES."],
    summary:
      "A deterministic-first financial intelligence system where language models plan specialist workflows, while standard-library Python executes the financial arithmetic and safety guardrails.",
  },
  tension: {
    heading: "The Core Tension: Arithmetic vs. Reasoning",
    eyebrow: "01 / PROBLEM SPACE",
    annotation: "INTERCONNECTED DECISION RIPPLES",
    intro:
      "Personal financial questions rarely exist in isolation. When a user asks 'Can I afford a ₹90,000 iPhone?', the answer is not a simple balance lookup.",
    body: [
      "A single purchase simultaneously impacts disposable cash flow, breaches or respects the 3-month emergency fund floor, alters debt-to-income limits if financed via EMI, incurs 18% GST, and potentially introduces merchant fraud risk.",
      "Generic conversational models fail on two distinct fronts: they hallucinate financial arithmetic, and they cannot guarantee hard regulatory or safety invariants. Finora isolates computation from planning to guarantee auditability.",
    ],
    ripples: [
      { domain: "LIQUIDITY", impact: "Immediate cash outlay vs. liquid portfolio reserves." },
      { domain: "SAFETY FLOOR", impact: "Preservation of 3-month living expense reserve." },
      { domain: "DEBT CAPACITY", impact: "40% maximum EMI-to-income regulatory cap." },
      { domain: "FRAUD DEFENSE", impact: "URL and UPI domain heuristic risk scoring." },
      { domain: "TAX OPTIMIZATION", impact: "18% GST component and business ITC eligibility." },
    ],
  },
  boundary: {
    heading: "The Deterministic-First Boundary",
    eyebrow: "02 / ARCHITECTURAL PRINCIPLE",
    annotation: "SEPARATION OF RESPONSIBILITIES",
    statement: "Language models plan and synthesize. Deterministic Python calculates and enforces.",
    comparison: [
      {
        layer: "PROBABILISTIC REASONING (LLM)",
        role: "Natural language parsing, intent routing, tool selection, conversational synthesis.",
        forbidden: "Never performs arithmetic, never issues unilateral safety verdicts.",
        runtime: "Llama 3.3 70B Versatile via Groq (~1-2s response)",
      },
      {
        layer: "DETERMINISTIC ENGINE (PYTHON)",
        role: "Exact loan amortization, emergency fund threshold math, fraud heuristic checks, tax computation.",
        forbidden: "No prompt engineering, zero hallucinations.",
        runtime: "Python 3.13 Standard Library only (math, hashlib, hmac)",
      },
    ],
  },
  topography: {
    heading: "System Topography",
    eyebrow: "03 / SYSTEM ARCHITECTURE",
    annotation: "FIVE-STAGE ORCHESTRATION PIPELINE",
    description:
      "Not every query requires the full multi-agent pipeline. The system uses an intent router to fast-path simple lookups with zero model calls.",
    stages: [
      {
        id: "router",
        step: "01",
        name: "INTENT ROUTER",
        type: "Rule-based classifier",
        detail:
          "Classifies query into FAST_DATA, FOLLOWUP_EXPLAIN, FOLLOWUP_WHATIF, FRAUD, or DECISION. Plain lookups ('What is my CIBIL score?') bypass LLMs completely (0 calls).",
        bypass: true,
      },
      {
        id: "orchestrator",
        step: "02",
        name: "CFO ORCHESTRATOR",
        type: "Planner (LLM Tool Calling)",
        detail:
          "For decisions, the model inspects AGENT_TOOLS schemas and plans which specialist tools to invoke. It returns structured function calls.",
        bypass: false,
      },
      {
        id: "agents",
        step: "03",
        name: "7 SPECIALIST AGENTS",
        type: "Deterministic Tools (finance_engine.py)",
        detail:
          "Runs selected deterministic Python functions. Produces exact numerical findings, formulas, and structured JSON results.",
        bypass: false,
      },
      {
        id: "judge",
        step: "04",
        name: "TWO-AXIS JUDGE",
        type: "Rule-based Reflection Guardrail",
        detail:
          "Validates findings on two independent axes: response_ok (answer validity) vs. transaction_safe (world safety). Bounded revision loop (≤2 passes).",
        bypass: false,
      },
      {
        id: "synthesis",
        step: "05",
        name: "SYNTHESIS & TRACE",
        type: "Auditable Output",
        detail:
          "LLM composes conversational recommendation citing agent findings and judge advisories. Strips private chain-of-thought and returns structured trace.",
        bypass: false,
      },
    ],
  },
  specialists: {
    heading: "The Seven Specialists",
    eyebrow: "04 / SPECIALIST AGENTS",
    annotation: "DETERMINISTIC DOMAIN TOOLS",
    description:
      "Each agent is a deterministic Python function over finance_engine.py paired with a strict JSON tool schema handed to the orchestrator.",
    agents: [
      {
        id: "budget",
        name: "BUDGET AGENT",
        tool: "analyze_budget",
        role: "Evaluates cash flow, monthly disposable income, and spending patterns.",
        inputs: "purchase_amount (optional float)",
        math: "disposable = monthly_income - monthly_expenses\nemergency_floor = monthly_expenses * 3",
        logicLabel: "RESERVE FORMULATION",
        finding: "Flags restaurant overspend (> ₹6,000) and calculates months of living expenses covered.",
        file: "backend/agents.py:analyze_budget",
      },
      {
        id: "affordability",
        name: "AFFORDABILITY AGENT",
        tool: "check_affordability",
        role: "Evaluates outright cash purchase impact against emergency reserves.",
        inputs: "amount (float)",
        math: "assert(liquid_savings - amount >= emergency_floor)\nverdict = SAFE if compliant else CAUTION / NOT_AFFORDABLE",
        logicLabel: "DETERMINISTIC ASSERTION",
        finding: "Outputs percentage of total savings consumed and explicit verdict (AFFORDABLE_SAFE / CAUTION / NOT_AFFORDABLE).",
        file: "backend/agents.py:check_affordability",
      },
      {
        id: "loan",
        name: "LOAN AGENT",
        tool: "evaluate_loan",
        role: "Simulates loan financing, exact EMI amortization, and total debt capacity.",
        inputs: "principal (float), annual_rate_pct (float), months (int)",
        math: "EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]\nassert: (EMI_total / monthly_income) <= 0.40",
        logicLabel: "AMORTIZATION FORMULATION",
        finding: "Computes exact rupee EMI and asserts against the 40% maximum regulatory debt-to-income threshold.",
        file: "backend/agents.py:evaluate_loan",
      },
      {
        id: "bills",
        name: "BILLS AGENT",
        tool: "check_upcoming_bills",
        role: "Scans recurring liabilities and cycle payment deadlines.",
        inputs: "None (reads profile store)",
        math: "scan(liabilities) -> filter(status == PENDING) -> sort_by(days_until_due)",
        logicLabel: "LIABILITY CYCLE LOGIC",
        finding: "Returns timeline of upcoming bills, days remaining until due dates, and cycle sum.",
        file: "backend/agents.py:check_upcoming_bills",
      },
      {
        id: "investment",
        name: "INVESTMENT AGENT",
        tool: "review_investments",
        role: "Assesses investment portfolio holdings, liquid value, and SIP discipline.",
        inputs: "None (reads profile store)",
        math: "verify(sip_discipline) -> evaluate(emergency_runway >= 3m) -> flag(premature_liquidation)",
        logicLabel: "PORTFOLIO DISCIPLINE LOGIC",
        finding: "Monitors monthly SIP allocations and evaluates whether liquidating assets for cash is advised.",
        file: "backend/agents.py:review_investments",
      },
      {
        id: "tax",
        name: "TAX AGENT",
        tool: "tax_check",
        role: "Computes GST component and evaluates business input tax credit eligibility.",
        inputs: "purchase_amount (float), via_business (bool)",
        math: "gst = amount * 0.18\neffective_cost = amount - (gst if itc_eligible else 0)",
        logicLabel: "DETERMINISTIC TAX RULE",
        finding: "Quantifies tax liability and determines whether purchase qualifies for input credit.",
        file: "backend/agents.py:tax_check",
      },
      {
        id: "fraud",
        name: "FRAUD AGENT",
        tool: "check_fraud_risk",
        role: "Vets merchant domains, UPI handles, and payment links against heuristic fraud rules.",
        inputs: "target (string: URL, domain, or UPI)",
        math: "check_tld(risk_list=['.xyz','.top','.click']) -> verify_upi_registry() -> risk_score",
        logicLabel: "HEURISTIC RISK PIPELINE",
        finding: "Detects high-risk TLDs (.xyz, .top, .click) and spoofed financial entities with score & rationale.",
        file: "backend/agents.py:check_fraud_risk",
      },
    ],
  },
  judge: {
    heading: "The Two-Axis Judge",
    eyebrow: "05 / REFLECTION GUARDRAIL",
    annotation: "SOLVING THE PASS/FAIL PARADOX",
    description:
      "Most agent systems conflate recommendation quality with transaction safety. The Judge introduces two orthogonal axes to evaluate autonomous financial advice.",
    axes: [
      {
        axis: "RESPONSE_OK",
        title: "Is the recommendation well-founded?",
        definition:
          "Checks if the planner selected relevant specialist agents, whether findings were generated, and if the reasoning is internally consistent.",
        rule: "Enforced by deterministic inspection of tool outputs. Triggers bounded revision if False.",
      },
      {
        axis: "TRANSACTION_SAFE",
        title: "Is the purchase / action financially safe?",
        definition:
          "Checks world constraints: Is fraud score zero? Does emergency fund remain ≥ 3 months? Is EMI-to-income ≤ 40%?",
        rule: "Advisory surfaced directly to the user. Does NOT invalidate a well-reasoned warning.",
      },
    ],
    paradoxExample: {
      query: "Is paytm-kyc-verify.xyz safe to pay ₹5,000?",
      agentFinding: "Fraud Agent flags .xyz domain and unverified KYC merchant as CRITICAL risk.",
      responseOk: true,
      responseOkLabel: "TRUE // Well-founded answer with high confidence (0.95)",
      transactionSafe: false,
      transactionSafeLabel: "FALSE // Dangerous transaction; payment should not proceed",
      resolution:
        "In a naive single-axis system, this returns 'FAILED / REVISE'. In Finora's two-axis architecture, the answer is approved as valid advice while the transaction is flagged as high danger.",
    },
  },
  trace: {
    heading: "Execution Trace & Provenance",
    eyebrow: "06 / EXPLAINABILITY",
    annotation: "AUDITABLE SYSTEM PROVENANCE",
    description:
      "To guarantee explainability without exposing vulnerable private chain-of-thought, Finora returns a structured JSON trace array representing concrete system state transitions.",
    sampleTrace: [
      {
        step: "01 // INTENT",
        event: "Router classified query as DECISION (purchase_amount: ₹90,000).",
      },
      {
        step: "02 // PLAN",
        event: "Orchestrator selected tools: check_affordability, analyze_budget, evaluate_loan.",
      },
      {
        step: "03 // AGENTS",
        event: "Affordability found outright cash breaches 3-month floor. Loan evaluated EMI at ₹7,930/mo (within 40% limit).",
      },
      {
        step: "04 // JUDGE",
        event: "response_ok: true, transaction_safe: false (caution: outright purchase breaches floor).",
      },
      {
        step: "05 // SYNTHESIS",
        event: "CFO phrased advice: 'Affordable via 12m financing, but defer paying outright to protect emergency cash.'",
      },
    ],
  },
  engineering: {
    heading: "Engineering Constraints & Stack",
    eyebrow: "07 / SYSTEM IMPLEMENTATION",
    annotation: "LIGHTWEIGHT & STATELESS",
    manifest: [
      { layer: "RUNTIME", stack: "Python 3.13 / FastAPI", note: "Lightweight async REST API" },
      { layer: "MODEL", stack: "Llama 3.3 70B / Groq", note: "Sub-second tool calling & synthesis" },
      { layer: "COMPUTATION", stack: "Python Standard Library", note: "math, hashlib, hmac (zero math packages)" },
      { layer: "STATE", stack: "Signed Session Tokens", note: "Stateless HS256 client persistence" },
      { layer: "FRONTEND", stack: "Vanilla JS / HTML5 / CSS", note: "Native ES modules & inline SVG" },
      { layer: "DEPLOYMENT", stack: "Vercel Python Serverless", note: "Single-origin api/index.py routing" },
    ],
    specs: [
      {
        title: "DETERMINISTIC STDLIB MONEY MATH",
        detail:
          "No external financial libraries or floating-point approximations. All EMI calculations, days-until logic, and heuristic risk scoring use standard Python 3.13 stdlib modules.",
      },
      {
        title: "STATELESS SIGNED SESSIONS (HS256)",
        detail:
          "Follow-up context is cryptographically signed and serialized into a client-stored token. The backend has zero database dependency, enabling zero cold-start penalty on serverless compute.",
      },
      {
        title: "SINGLE-ORIGIN VERCEL DEPLOYMENT",
        detail:
          "A unified api/index.py entrypoint routes both the REST API endpoints and static SPA assets under a single origin, completely eliminating cross-origin preflight latency.",
      },
      {
        title: "ZERO RUNTIME BUILD STEP",
        detail:
          "The client-side dashboard uses vanilla JavaScript with standard ES modules and native SVG rendering, ensuring immediate delivery without bundled runtime bloat.",
      },
    ],
  },
  role: {
    heading: "Team Context & Individual Role",
    eyebrow: "08 / CONTRIBUTION CONTEXT",
    annotation: "COLLABORATIVE HACKATHON PROJECT",
    context:
      "Finora was developed as a collaborative hackathon project exploring autonomous multi-agent systems in consumer finance.",
    statusNotice: "INDIVIDUAL CONTRIBUTION: REQUIRES USER CONFIRMATION",
    reflection:
      "Working within a multi-agent paradigm demonstrated that the hardest challenge is not prompting models to generate answers, but designing robust software boundaries that hold models accountable to deterministic laws.",
  },
  retrospective: {
    heading: "Retrospective & Trade-Offs",
    eyebrow: "09 / RETROSPECTIVE",
    annotation: "SYSTEM LESSONS",
    tradeoffs: [
      {
        title: "LATENCY VS. AUDITABILITY",
        takeaway:
          "A two-call pipeline (Plan → Execute → Synthesize) takes 1–2 seconds compared to sub-second single-prompt replies. In financial advice, correctness and auditability justify the latency budget.",
      },
      {
        title: "EPHEMERAL STORE BOUNDARIES",
        takeaway:
          "While signed tokens solved conversation continuity without a database, persistent user transactions were ephemeral in /tmp. Future production iterations would couple stateless orchestration with durable ledger storage.",
      },
      {
        title: "BOUNDED REVISION DISCIPLINE",
        takeaway:
          "Autonomous self-correction easily spirals into token loops. Hard-capping revisions to ≤ 2 iterations with deterministic pass criteria proved essential for cost and runtime predictability.",
      },
    ],
  },
  nextProject: {
    slug: "aptly",
    number: "02",
    name: "APTLY",
    subtitle: "Explainable Job Eligibility & ATS Assistant",
    category: "EXPLAINABLE ANALYSIS",
    statusNote: "NEXT CASE STUDY // COMING SOON",
  },
} as const;
