// Public case-study content: approved M9.2B facts and explicitly conceptual examples.
export const veyraData = {
  "meta": {
    "slug": "veyra",
    "number": "03",
    "name": "VEYRA",
    "subtitle": "BUDGET ANALYSIS & FINANCIAL OBSERVATION INTERFACE",
    "category": "COMPUTATIONAL UI & FINANCIAL VISUALIZATION",
    "timeline": "2024",
    "status": "INDEPENDENT SYSTEM / COMPLETED",
    "links": {
      "github": "https://github.com/vedii-codezz/budget-analysis-veyra",
      "live": "https://budget-analysis-veyra.vercel.app/"
    },
    "coordinates": [
      {
        "label": "PROJECT ARCHITECTURE",
        "value": "INDEPENDENT SYSTEM"
      },
      {
        "label": "CORE REPOSITORY",
        "value": "SOLO AUTHORSHIP (BEDANTIKA MONDAL)"
      },
      {
        "label": "ENGINE TYPE",
        "value": "DETERMINISTIC CLIENT CALCULATION"
      },
      {
        "label": "STACK CORE",
        "value": "NEXT.JS 14 / TYPESCRIPT / ZUSTAND"
      }
    ]
  },
  "hero": {
    "headline": [
      "RAW TRANSACTIONS ARE NOISE.",
      "STRUCTURE TURNS THEM INTO DECISIONS."
    ],
    "supportingPrinciple": "DETERMINISTIC ARITHMETIC. VISUAL FINANCIAL CLARITY.",
    "summary": "A budget analysis interface that organizes transactions into categories, calculations, and financial observations using client-side in-memory Zustand state.",
    "syntheticDataNotice": "SYNTHETIC DEMO DATA // MARCH 2024 — Income ₹95,000; spend ₹58,400; savings ₹36,600; savings rate 38.5%. Category and score diagrams are conceptual."
  },
  "tension": {
    "eyebrow": "01 / THE PROBLEM WITH THE LEDGER",
    "heading": "Chronology Records Events. It Fails to Explain Them.",
    "annotation": "TABULAR NOISE VS. STRUCTURAL AWARENESS",
    "syntheticNotice": "[CONCEPTUAL VISUALIZATION] TRANSACTION STRUCTURE",
    "sampleTransactions": [
      {
        "id": "TX-1",
        "date": "ENTRY",
        "merchant": "Housing record",
        "amount": "AMOUNT",
        "tag": "HOUSING"
      },
      {
        "id": "TX-2",
        "date": "ENTRY",
        "merchant": "Food record",
        "amount": "AMOUNT",
        "tag": "FOOD"
      },
      {
        "id": "TX-3",
        "date": "ENTRY",
        "merchant": "Transport record",
        "amount": "AMOUNT",
        "tag": "TRANSPORT"
      },
      {
        "id": "TX-4",
        "date": "ENTRY",
        "merchant": "Shopping record",
        "amount": "AMOUNT",
        "tag": "SHOPPING"
      },
      {
        "id": "TX-5",
        "date": "ENTRY",
        "merchant": "Entertainment record",
        "amount": "AMOUNT",
        "tag": "ENTERTAINMENT"
      },
      {
        "id": "TX-6",
        "date": "ENTRY",
        "merchant": "Utilities record",
        "amount": "AMOUNT",
        "tag": "UTILITIES"
      }
    ],
    "ledgerCritique": [
      {
        "question": "WHERE IS THE MONEY ACTUALLY FLOWING?",
        "failure": "A chronological list interlaces recurring housing bills with trivial coffee runs, burying structural patterns under temporal noise.",
        "solution": "Veyra groups transactions into strict category envelopes with proportional spending fields."
      },
      {
        "question": "WHICH BUDGET CEILING IS UNDER STRESS?",
        "failure": "Single debit rows provide zero context on cumulative burn relative to planned monthly thresholds.",
        "solution": "Every transaction immediately updates category budget headroom, exposing variance before ceilings are exceeded."
      },
      {
        "question": "HOW MUCH LIQUID MARGIN REMAINS?",
        "failure": "Account balances show cash on hand but fail to discount upcoming fixed obligations or track net savings rate.",
        "solution": "Continuous cash-flow partitioning isolates essential commitments from discretionary liquidity."
      },
      {
        "question": "WHAT DOES THE MONTH ACTUALLY MEAN?",
        "failure": "Standard bank statements deliver passive historical accounting instead of active decision-grade insight.",
        "solution": "A deterministic score pipeline connects inputs, formula, score, and tier."
      }
    ]
  },
  "engine": {
    "eyebrow": "02 / THE DETERMINISTIC FINANCE ENGINE",
    "heading": "Zero Inference. Verifiable Mathematical Foundations.",
    "annotation": "TRANSPARENT CLIENT ARITHMETIC",
    "description": "Deterministic calculations connect transaction inputs to financial observations.",
    "formulas": [
      {
        "label": "MONTHLY INCOME",
        "math": "INCOME",
        "explanation": "Approved synthetic monthly income.",
        "fixtureValue": "₹95,000"
      },
      {
        "label": "MONTHLY SPEND",
        "math": "SUM OF SPEND",
        "explanation": "Approved synthetic monthly spend.",
        "fixtureValue": "₹58,400"
      },
      {
        "label": "MONTHLY SAVINGS",
        "math": "INCOME − SPEND",
        "explanation": "Approved synthetic monthly savings.",
        "fixtureValue": "₹36,600"
      },
      {
        "label": "SAVINGS RATE",
        "math": "SAVINGS / INCOME",
        "explanation": "Savings as a share of income.",
        "fixtureValue": "38.5%"
      }
    ]
  },
  "pipeline": {
    "eyebrow": "03 / FROM TRANSACTIONS TO STRUCTURE",
    "heading": "The Five-Stage Transformation Pipeline",
    "annotation": "DATA REFINEMENT PROGRESSION",
    "description": "A conceptual progression shows how transaction records can become financial observations.",
    "stages": [
      {
        "step": "01",
        "name": "RAW INGESTION",
        "unit": "Transaction Record",
        "dataForm": "{ id, title, merchant, amount, category, date }",
        "output": "Transaction records provide the input."
      },
      {
        "step": "02",
        "name": "CATEGORY NORMALIZATION",
        "unit": "Category Bucket",
        "dataForm": "k \\in {Housing, Food, Transport, Shopping, ...}",
        "output": "Records are organized into named categories."
      },
      {
        "step": "03",
        "name": "SUBTOTAL AGGREGATION",
        "unit": "Cumulative Spend",
        "dataForm": "C_{spent}(k) = \\sum t.amount",
        "output": "Category records inform calculated totals."
      },
      {
        "step": "04",
        "name": "BUDGET VARIANCE DELTA",
        "unit": "Headroom & Utilization",
        "dataForm": "\\Delta(k) = C_{allocated}(k) - C_{spent}(k)",
        "output": "Spend and allocation inform a category observation."
      },
      {
        "step": "05",
        "name": "DERIVED OBSERVABLES",
        "unit": "Composite Metrics",
        "dataForm": "VeyraScore, Cash-Flow River, Savings Rate",
        "output": "Calculations inform score and flow observations."
      }
    ]
  },
  "budgetField": {
    "eyebrow": "04 / THE BUDGET FIELD",
    "heading": "Category Envelopes & Budget State",
    "annotation": "SIGNATURE VISUAL 01 // CATEGORY ALLOCATION MATRIX",
    "description": "[CONCEPTUAL VISUALIZATION] Named categories illustrate budget relationships without category amounts or measured utilization.",
    "statusLegend": [
      {
        "label": "HEALTHY",
        "rule": "Within allocation",
        "trait": "Available headroom"
      },
      {
        "label": "WARNING",
        "rule": "Approaching allocation",
        "trait": "Attention may be needed"
      },
      {
        "label": "EXCEEDED",
        "rule": "Beyond allocation",
        "trait": "Allocation needs review"
      }
    ],
    "categories": [
      {
        "category": "Housing",
        "description": "Housing records contribute to category spend and budget observations."
      },
      {
        "category": "Food",
        "description": "Food records contribute to category spend and budget observations."
      },
      {
        "category": "Transport",
        "description": "Transport records contribute to category spend and budget observations."
      },
      {
        "category": "Shopping",
        "description": "Shopping records contribute to category spend and budget observations."
      },
      {
        "category": "Entertainment",
        "description": "Entertainment records contribute to category spend and budget observations."
      },
      {
        "category": "Healthcare",
        "description": "Healthcare records contribute to category spend and budget observations."
      },
      {
        "category": "Utilities",
        "description": "Utilities records contribute to category spend and budget observations."
      },
      {
        "category": "Education",
        "description": "Education records contribute to category spend and budget observations."
      }
    ]
  },
  "veyraScore": {
    "eyebrow": "05 / THE VEYRASCORE",
    "heading": "Inputs → Formula → Score → Tier",
    "annotation": "[VERIFIED ARCHITECTURE] SCORE STRUCTURE",
    "notice": "Structural explanation only. No score, weights, or tier result is published.",
    "stages": [
      {
        "id": "inputs",
        "name": "INPUTS",
        "explanation": "Financial inputs provide the starting point.",
        "relationship": "INPUTS → FORMULA"
      },
      {
        "id": "formula",
        "name": "FORMULA",
        "explanation": "Deterministic calculations process the inputs.",
        "relationship": "FORMULA → SCORE"
      },
      {
        "id": "score",
        "name": "SCORE",
        "explanation": "Calculation produces a score.",
        "relationship": "SCORE → TIER"
      },
      {
        "id": "tier",
        "name": "TIER",
        "explanation": "The score maps to a tier. No specific tier is asserted here.",
        "relationship": "SCORE → TIER"
      }
    ]
  },
  "cashFlow": {
    "eyebrow": "06 / THE CASH-FLOW SYSTEM",
    "heading": "Conceptual Financial Flow Visualization",
    "annotation": "[CONCEPTUAL VISUALIZATION] FINANCIAL RELATIONSHIPS",
    "description": "Conceptual financial flow visualization. Fixed branches show relationships, not measured channel proportions.",
    "baselineInflow": "₹95,000",
    "inflowLabel": "GROSS MONTHLY INFLOW",
    "inflowNotice": "SYNTHETIC DEMONSTRATION FIXTURE // MARCH 2024",
    "streams": [
      {
        "channel": "TRANSACTIONS",
        "classification": "INPUT RECORDS",
        "description": "Transaction records are inputs to financial observation.",
        "includedCategories": [
          "Record",
          "Category"
        ]
      },
      {
        "channel": "CATEGORIES",
        "classification": "ORGANIZATION",
        "description": "Categories organize transaction records.",
        "includedCategories": [
          "Grouping",
          "Observation"
        ]
      },
      {
        "channel": "SPEND",
        "classification": "APPROVED SYNTHETIC TOTAL",
        "description": "The March 2024 synthetic spend is ₹58,400.",
        "includedCategories": [
          "₹58,400"
        ]
      },
      {
        "channel": "SAVINGS",
        "classification": "APPROVED SYNTHETIC TOTAL",
        "description": "The March 2024 synthetic savings are ₹36,600 (38.5% of income).",
        "includedCategories": [
          "₹36,600",
          "38.5%"
        ]
      }
    ]
  },
  "reactivity": {
    "eyebrow": "07 / REACTIVE FINANCIAL STATE",
    "heading": "Client-Side In-Memory State",
    "annotation": "IN-MEMORY STATE ORCHESTRATION",
    "description": "Financial state is held in client-side in-memory Zustand. No persistent storage is implemented.",
    "mutationFlow": [
      {
        "step": "01",
        "label": "USER INPUT",
        "detail": "Financial records enter the interface."
      },
      {
        "step": "02",
        "label": "ZUSTAND STATE",
        "detail": "State is held in client memory."
      },
      {
        "step": "03",
        "label": "CALCULATION",
        "detail": "Deterministic calculations derive observations."
      },
      {
        "step": "04",
        "label": "UI UPDATE",
        "detail": "The interface reflects the updated state."
      }
    ],
    "benchmarkNote": "STORAGE BOUNDARY: No database, authentication, or persistent storage."
  },
  "engineering": {
    "eyebrow": "08 / ENGINEERING THE INTERFACE",
    "heading": "The Implemented Frontend Architecture",
    "annotation": "TECHNICAL LEDGER & DEPENDENCY BOUNDARIES",
    "description": "Veyra's codebase is structured around single-responsibility modules in Next.js 14, pairing TypeScript type safety with composable client components.",
    "stackGroups": [
      {
        "category": "STATE",
        "items": [
          {
            "name": "Client-side Zustand",
            "detail": "In-memory financial state"
          }
        ]
      },
      {
        "category": "COMPUTATION",
        "items": [
          {
            "name": "Deterministic calculation",
            "detail": "Inputs inform financial observations"
          }
        ]
      },
      {
        "category": "STORAGE",
        "items": [
          {
            "name": "No persistent storage",
            "detail": "No database or authentication is implemented"
          }
        ]
      }
    ]
  },
  "scopeDiscipline": {
    "eyebrow": "09 / FRONTEND-ONLY BY DESIGN",
    "heading": "Deliberate Architectural Boundaries",
    "annotation": "THE MERIT OF PROTOTYPE RIGOR",
    "intro": "Engineering integrity requires transparency about what was built versus what was intentionally left out of scope. Veyra was conceived and built as a frontend computational prototype to explore financial data visualization, not as a commercial banking backend.",
    "boundaries": [
      {
        "boundary": "NO PERSISTENT DATABASE",
        "reality": "Package dependencies such as @neondatabase/serverless and drizzle-orm were explored during early scaffolding but never connected to a live database or schema. All state is strictly ephemeral in Zustand."
      },
      {
        "boundary": "NO USER AUTHENTICATION",
        "reality": "There are no login forms, JWT tokens, or multi-tenant database partitions. The interface operates as a local single-user sandbox."
      },
      {
        "boundary": "NO LIVE BANK SYNC (PLAID / OPEN BANKING)",
        "reality": "No external banking APIs or aggregators are queried. All data originates from curated synthetic JSON fixtures."
      },
      {
        "boundary": "NO PREDICTIVE AI / MACHINE LEARNING",
        "reality": "All insights, thresholds, and scores are derived through direct deterministic arithmetic, not probabilistic machine learning models."
      }
    ]
  },
  "authorship": {
    "eyebrow": "10 / INDEPENDENT PROJECT",
    "heading": "Solo Repository Authorship",
    "annotation": "DIRECT REPOSITORY PROVENANCE",
    "attribution": "DESIGNED AND BUILT BY BEDANTIKA MONDAL",
    "summary": "Veyra is an independent exploration of personal finance interfaces by Bedantika Mondal.",
    "areas": [
      {
        "domain": "FINANCIAL CALCULATION ENGINE",
        "detail": "Formulated and implemented all deterministic formulas for category spend, budget variance, and the composite VeyraScore."
      },
      {
        "domain": "INTERACTIVE DATA VISUALIZATION",
        "detail": "Architected the spatial Budget Field, Cash-Flow River geometry, and responsive category inspection drawers."
      },
      {
        "domain": "FRONTEND SYSTEM IMPLEMENTATION",
        "detail": "Built the complete Next.js 14 application, Zustand state store, and CSS layout architecture."
      },
      {
        "domain": "DEPLOYMENT & OPTIMIZATION",
        "detail": "Configured build pipelines and deployed the live interactive application to Vercel."
      }
    ]
  },
  "retrospective": {
    "eyebrow": "11 / RETROSPECTIVE",
    "heading": "Observations from Designing Financial UI",
    "annotation": "ENGINEERING TRADE-OFFS & REFLECTIONS",
    "reflections": [
      {
        "title": "MATHEMATICAL TRANSPARENCY OVER BLACK-BOX METRICS",
        "body": "Showing the relationship between inputs, formula, score, and tier makes the score structure inspectable without asserting an unverified result."
      },
      {
        "title": "SPATIAL PROPORTION COMMUNICATES FASTER THAN TABLES",
        "body": "Category structure offers another way to inspect financial records alongside a chronological ledger."
      },
      {
        "title": "CLIENT-SIDE REACTIVITY CREATES INTUITIVE FEEDBACK",
        "body": "In-memory state connects user input with updated financial observations."
      },
      {
        "title": "PROTOTYPE DISCIPLINE PROTECTS DESIGN FOCUS",
        "body": "Resisting the urge to prematurely build authentication or relational databases allowed full creative attention to be dedicated to visualization mechanics, typography, and responsive ergonomics."
      }
    ]
  },
  "nextProject": {
    "index": "12",
    "nextNumber": "04",
    "nextName": "NIKOT-E-METRO",
    "nextSubtitle": "KOLKATA METRO TRANSIT NAVIGATOR",
    "nextCategory": "TRANSIT ARCHITECTURE & WAYFINDING"
  },
  "fixture": {
    "month": "MARCH 2024",
    "income": 95000,
    "spend": 58400,
    "savings": 36600,
    "savingsRate": "38.5%"
  }
} as const;

export type CategoryBudgetData = (typeof veyraData.budgetField.categories)[number];
export type ScoreStageData = (typeof veyraData.veyraScore.stages)[number];
export type CashFlowStreamData = (typeof veyraData.cashFlow.streams)[number];
