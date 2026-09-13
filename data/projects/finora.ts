// Public case-study content: approved M9.2B facts and explicitly conceptual examples.
export const finoraData = {
  "meta": {
    "slug": "finora",
    "number": "01",
    "name": "FINORA",
    "subtitle": "Multi-Agent Personal CFO",
    "category": "MULTI-AGENT SYSTEM",
    "timeline": "2026",
    "status": "HACKATHON EXPLORATION",
    "links": {
      "github": "https://github.com/Adhirajsingh2507/Error-404-Not-Found",
      "live": "https://vibeforge-cyan.vercel.app/"
    },
    "coordinates": [
      {
        "label": "SYSTEM TYPE",
        "value": "MULTI-AGENT ORCHESTRATION"
      },
      {
        "label": "LANGUAGE MODEL",
        "value": "PLANNING / INTERPRETATION / SYNTHESIS"
      },
      {
        "label": "DETERMINISTIC TOOLS",
        "value": "PYTHON CALCULATIONS / GUARDRAILS"
      },
      {
        "label": "EVALUATION",
        "value": "RESPONSE OK / TRANSACTION SAFE"
      }
    ]
  },
  "hero": {
    "headline": [
      "THE MODEL PLANS.",
      "THE ENGINE CALCULATES."
    ],
    "summary": "A personal CFO exploration where language models plan, interpret, and synthesize, while deterministic Python tools handle financial calculations and guardrails."
  },
  "tension": {
    "heading": "The Core Tension: Arithmetic vs. Reasoning",
    "eyebrow": "01 / PROBLEM SPACE",
    "annotation": "INTERCONNECTED DECISION RIPPLES",
    "intro": "Personal financial questions rarely exist in isolation. A single transaction inquiry requires structural verification across multiple interdependent domains.",
    "body": [
      "A purchase decision simultaneously impacts disposable liquidity, committed obligations, debt capacity limits, tax implications, and merchant safety.",
      "Conversational models alone fail on two distinct fronts: they risk arithmetic hallucination and cannot guarantee deterministic safety invariants. Finora isolates computation from planning."
    ],
    "ripples": [
      {
        "domain": "LIQUIDITY",
        "impact": "Immediate cash outlay relative to liquid reserve capacity."
      },
      {
        "domain": "SAFETY RESERVES",
        "impact": "Preservation of core living commitments and safety buffer."
      },
      {
        "domain": "DEBT CAPACITY",
        "impact": "Affordability assessment and periodic payment commitments."
      },
      {
        "domain": "FRAUD DEFENSE",
        "impact": "Payment destination and domain heuristic safety checks."
      },
      {
        "domain": "TAX & COMPLIANCE",
        "impact": "Applicable tax classification and deduction eligibility."
      }
    ]
  },
  "boundary": {
    "heading": "The Deterministic-First Boundary",
    "eyebrow": "02 / ARCHITECTURAL PRINCIPLE",
    "annotation": "SEPARATION OF RESPONSIBILITIES",
    "statement": "Language models plan and synthesize. Deterministic Python calculates and enforces.",
    "comparison": [
      {
        "layer": "LANGUAGE MODEL",
        "role": "Planning, interpretation, and synthesis.",
        "forbidden": "Financial calculations and guardrails belong to deterministic tools.",
        "runtime": "Language model"
      },
      {
        "layer": "DETERMINISTIC TOOLS",
        "role": "Financial calculations and guardrails.",
        "forbidden": "Calculation results inform interpretation; they do not replace it.",
        "runtime": "Python"
      }
    ]
  },
  "topography": {
    "heading": "System Topography",
    "eyebrow": "03 / SYSTEM ARCHITECTURE",
    "annotation": "FIVE-STAGE ORCHESTRATION PIPELINE",
    "description": "USER REQUEST → ROUTER → ORCHESTRATOR → SELECTED SPECIALIST AGENTS → JUDGE → PASS / REVISE → SYNTHESIS → FINAL RESPONSE",
    "stages": [
      {
        "id": "router",
        "step": "01",
        "name": "ROUTER",
        "type": "Request routing",
        "detail": "The user request enters the routing stage."
      },
      {
        "id": "orchestrator",
        "step": "02",
        "name": "ORCHESTRATOR",
        "type": "Language model planning",
        "detail": "Plans which specialist agents are relevant to the request."
      },
      {
        "id": "agents",
        "step": "03",
        "name": "SELECTED SPECIALIST AGENTS",
        "type": "Deterministic Python tools",
        "detail": "Selected specialists supply financial calculations and guardrail findings."
      },
      {
        "id": "judge",
        "step": "04",
        "name": "JUDGE",
        "type": "PASS / REVISE",
        "detail": "Evaluates RESPONSE OK and TRANSACTION SAFE before pass or revision."
      },
      {
        "id": "synthesis",
        "step": "05",
        "name": "SYNTHESIS",
        "type": "Language model synthesis",
        "detail": "Combines findings into the final response."
      }
    ]
  },
  "specialists": {
    "heading": "The Seven Specialists",
    "eyebrow": "04 / SPECIALIST AGENTS",
    "annotation": "DETERMINISTIC DOMAIN TOOLS",
    "description": "Seven specialist domains support the orchestrated workflow. Deterministic Python tools handle calculations and guardrails.",
    "agents": [
      {
        "id": "budget",
        "name": "BUDGET",
        "tool": "BUDGET",
        "role": "Budget analysis",
        "inputs": "Relevant request context",
        "math": "REQUEST CONTEXT → DETERMINISTIC CALCULATIONS / GUARDRAILS → FINDINGS",
        "logicLabel": "SPECIALIST RESPONSIBILITY",
        "finding": "Findings inform the Judge and final synthesis.",
        "file": "PYTHON SPECIALIST TOOLS"
      },
      {
        "id": "affordability",
        "name": "AFFORDABILITY",
        "tool": "AFFORDABILITY",
        "role": "Affordability analysis",
        "inputs": "Relevant request context",
        "math": "REQUEST CONTEXT → DETERMINISTIC CALCULATIONS / GUARDRAILS → FINDINGS",
        "logicLabel": "SPECIALIST RESPONSIBILITY",
        "finding": "Findings inform the Judge and final synthesis.",
        "file": "PYTHON SPECIALIST TOOLS"
      },
      {
        "id": "loan",
        "name": "LOAN",
        "tool": "LOAN",
        "role": "Loan analysis",
        "inputs": "Relevant request context",
        "math": "REQUEST CONTEXT → DETERMINISTIC CALCULATIONS / GUARDRAILS → FINDINGS",
        "logicLabel": "SPECIALIST RESPONSIBILITY",
        "finding": "Findings inform the Judge and final synthesis.",
        "file": "PYTHON SPECIALIST TOOLS"
      },
      {
        "id": "bills",
        "name": "BILLS",
        "tool": "BILLS",
        "role": "Bill analysis",
        "inputs": "Relevant request context",
        "math": "REQUEST CONTEXT → DETERMINISTIC CALCULATIONS / GUARDRAILS → FINDINGS",
        "logicLabel": "SPECIALIST RESPONSIBILITY",
        "finding": "Findings inform the Judge and final synthesis.",
        "file": "PYTHON SPECIALIST TOOLS"
      },
      {
        "id": "investment",
        "name": "INVESTMENT",
        "tool": "INVESTMENT",
        "role": "Investment analysis",
        "inputs": "Relevant request context",
        "math": "REQUEST CONTEXT → DETERMINISTIC CALCULATIONS / GUARDRAILS → FINDINGS",
        "logicLabel": "SPECIALIST RESPONSIBILITY",
        "finding": "Findings inform the Judge and final synthesis.",
        "file": "PYTHON SPECIALIST TOOLS"
      },
      {
        "id": "tax",
        "name": "TAX",
        "tool": "TAX",
        "role": "Tax analysis",
        "inputs": "Relevant request context",
        "math": "REQUEST CONTEXT → DETERMINISTIC CALCULATIONS / GUARDRAILS → FINDINGS",
        "logicLabel": "SPECIALIST RESPONSIBILITY",
        "finding": "Findings inform the Judge and final synthesis.",
        "file": "PYTHON SPECIALIST TOOLS"
      },
      {
        "id": "fraud",
        "name": "FRAUD",
        "tool": "FRAUD",
        "role": "Fraud analysis",
        "inputs": "Relevant request context",
        "math": "REQUEST CONTEXT → DETERMINISTIC CALCULATIONS / GUARDRAILS → FINDINGS",
        "logicLabel": "SPECIALIST RESPONSIBILITY",
        "finding": "Findings inform the Judge and final synthesis.",
        "file": "PYTHON SPECIALIST TOOLS"
      }
    ]
  },
  "judge": {
    "heading": "The Two-Axis Judge",
    "eyebrow": "05 / REFLECTION GUARDRAIL",
    "annotation": "SOLVING THE PASS/FAIL PARADOX",
    "description": "Most agent systems conflate recommendation quality with transaction safety. The Judge introduces two orthogonal axes to evaluate autonomous financial advice.",
    "axes": [
      {
        "axis": "RESPONSE_OK",
        "title": "Is the response well-founded?",
        "definition": "Evaluates response quality.",
        "rule": "Informs pass or revision."
      },
      {
        "axis": "TRANSACTION_SAFE",
        "title": "Is the proposed transaction safe?",
        "definition": "Evaluates transaction safety separately from response quality.",
        "rule": "Surfaces guardrail findings in the response."
      }
    ],
    "paradoxExample": {
      "query": "Can a well-founded response advise against a transaction?",
      "agentFinding": "Conceptual example: a specialist raises a safety concern.",
      "responseOk": true,
      "responseOkLabel": "TRUE // The response explains the concern.",
      "transactionSafe": false,
      "transactionSafeLabel": "FALSE // The transaction raises a safety concern.",
      "resolution": "[CONCEPTUAL VISUALIZATION] Response quality and transaction safety are separate dimensions. This illustrates their relationship, not a measured assessment."
    }
  },
  "trace": {
    "heading": "Execution Trace & Provenance",
    "eyebrow": "06 / EXPLAINABILITY",
    "annotation": "AUDITABLE SYSTEM PROVENANCE",
    "description": "The execution trace exposes the workflow stages: PLAN → AGENT → JUDGE → SYNTHESISE.",
    "sampleTrace": [
      {
        "step": "01 // PLAN",
        "event": "Plan the selected specialist workflow."
      },
      {
        "step": "02 // AGENT",
        "event": "Run deterministic calculations and guardrails."
      },
      {
        "step": "03 // JUDGE",
        "event": "Evaluate RESPONSE OK and TRANSACTION SAFE; pass or revise."
      },
      {
        "step": "04 // SYNTHESISE",
        "event": "Synthesize findings into the final response."
      }
    ]
  },
  "engineering": {
    "heading": "Engineering Constraints & Stack",
    "eyebrow": "07 / SYSTEM IMPLEMENTATION",
    "annotation": "LIGHTWEIGHT & STATELESS",
    "manifest": [
      {
        "layer": "INTERPRETATION",
        "stack": "Language model",
        "note": "Planning and interpretation"
      },
      {
        "layer": "COMPUTATION",
        "stack": "Deterministic Python tools",
        "note": "Financial calculations and guardrails"
      },
      {
        "layer": "RESPONSE",
        "stack": "Language model",
        "note": "Synthesis of findings"
      }
    ],
    "specs": [
      {
        "title": "SEPARATE RESPONSIBILITIES",
        "detail": "Language models plan, interpret, and synthesize; Python tools calculate and enforce guardrails."
      },
      {
        "title": "SELECTED SPECIALISTS",
        "detail": "The orchestrator selects relevant specialists from seven domains."
      },
      {
        "title": "TWO JUDGE DIMENSIONS",
        "detail": "RESPONSE OK and TRANSACTION SAFE remain distinct."
      },
      {
        "title": "EXPLICIT TRACE",
        "detail": "PLAN → AGENT → JUDGE → SYNTHESISE"
      }
    ]
  },
  "role": {
    "heading": "Team Context & Individual Role",
    "eyebrow": "08 / CONTRIBUTION CONTEXT",
    "annotation": "COLLABORATIVE HACKATHON PROJECT",
    "context": "Finora was developed as a collaborative hackathon project exploring autonomous multi-agent systems in consumer finance.",
    "statusNotice": "INDIVIDUAL CONTRIBUTION: REQUIRES USER CONFIRMATION",
    "reflection": "Working within a multi-agent paradigm demonstrated that the hardest challenge is not prompting models to generate answers, but designing robust software boundaries that hold models accountable to deterministic laws."
  },
  "retrospective": {
    "heading": "Retrospective & Trade-Offs",
    "eyebrow": "09 / RETROSPECTIVE",
    "annotation": "SYSTEM LESSONS",
    "tradeoffs": [
      {
        "title": "INTERPRETATION & CALCULATION",
        "takeaway": "The architecture separates language interpretation from financial calculation."
      },
      {
        "title": "RESPONSE & TRANSACTION",
        "takeaway": "A useful response can explain why a transaction raises a concern."
      },
      {
        "title": "TRACEABLE WORKFLOW",
        "takeaway": "Explicit stages make the path from planning to synthesis inspectable."
      }
    ]
  },
  "nextProject": {
    "slug": "aptly",
    "number": "02",
    "name": "APTLY",
    "subtitle": "Explainable Job Eligibility & ATS Assistant",
    "category": "EXPLAINABLE ANALYSIS",
    "statusNote": "NEXT CASE STUDY // COMING SOON"
  }
} as const;
