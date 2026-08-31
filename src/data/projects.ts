import { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'finora',
    number: '01',
    title: 'FINORA',
    subtitle: 'Multi-Agent Personal CFO',
    tagline: 'Autonomous multi-agent financial consensus & real-time liquidity planning',
    description: 'An autonomous multi-agent financial intelligence ecosystem where specialized neural agents debate cashflow optimization, savings buffers, and tax vulnerabilities.',
    tags: ['AI Agents', 'Finance', 'System Design', 'Web'],
    year: '2025',
    featured: true,
    visualType: 'network',
    links: {
      github: 'https://github.com/bedantikamondal/finora',
      demo: '#',
    },
    details: {
      problem: 'Traditional financial planning tools are static spreadsheets that place the entire cognitive load of analysis and strategy on the user.',
      idea: 'Deploy an ensemble of specialized autonomous agents (Auditor, Strategist, Tax Specialist, Risk Evaluator) that actively converse and synthesize balanced financial advice.',
      architecture: {
        title: 'Multi-Agent Consensus Flow',
        description: 'Asynchronous event bus routing user state between specialized LLM agents with deterministic budget safety boundaries.',
        nodes: [
          'Cashflow Ingestion',
          'Agent Debate Chamber',
          'Budget Guard Layer',
          'Consensus Synthesizer',
          'Actionable Recommendations'
        ]
      },
      keyFeatures: [
        {
          title: 'Dialectic Agent Debate',
          description: 'Specialized LLM personas challenge aggressive spending or high-risk assumptions in real time.'
        },
        {
          title: 'Predictive Cashflow Routing',
          description: 'Autonomous forecasting of recurring liabilities against opportunistic savings.'
        },
        {
          title: 'Transparent Rationales',
          description: 'Clear, human-readable explanations behind every recommendation and trade-off.'
        }
      ],
      interactionDesign: 'Clean typographic layout paired with interactive agent topology diagrams visualizing collaborative consensus flows.',
      techStack: ['Python', 'LangGraph', 'Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI'],
      outcome: 'Validated prototype delivering actionable, multi-perspective financial clarity.'
    }
  },
  {
    slug: 'aptly',
    number: '02',
    title: 'APTLY',
    subtitle: 'Explainable Career Intelligence',
    tagline: 'Vector-space career trajectory analysis & qualification gap mapping',
    description: 'A transparent career intelligence platform utilizing semantic embeddings and NLP to map skill relevance, qualification gaps, and growth vectors without opaque algorithmic bias.',
    tags: ['NLP', 'Vector Search', 'Explainability', 'Next.js'],
    year: '2025',
    featured: true,
    visualType: 'matrix',
    links: {
      github: 'https://github.com/bedantikamondal/aptly',
      demo: '#',
    },
    details: {
      problem: 'Recruitment algorithms and resume parsers operate as opaque black boxes, giving candidates no constructive feedback on why a profile fell short.',
      idea: 'Construct a bidirectional vector decomposition engine that highlights precise requirement-evidence alignments with explainable attribution scores.',
      architecture: {
        title: 'Semantic Vector Decomposition',
        description: 'Semantic projection matching candidate experience tokens against job requirement graphs.',
        nodes: [
          'Experience Tokenizer',
          'Embedding Alignment Layer',
          'Gap Attribution Matrix',
          'Trajectory Projection Engine'
        ]
      },
      keyFeatures: [
        {
          title: 'Explainable Match Matrix',
          description: 'Interactive heatmaps detailing exact textual evidence supporting competency scores.'
        },
        {
          title: 'Skill Delta Trajectories',
          description: 'Predictive paths showing the highest ROI skills to bridge next-level role gaps.'
        },
        {
          title: 'Bias-Resistant Embeddings',
          description: 'Calibrated representations normalized against demographic and institutional skew.'
        }
      ],
      interactionDesign: 'Spatial matrix visualization that highlights cross-node connections when inspecting specific competencies.',
      techStack: ['Python', 'PyTorch', 'Transformers', 'Next.js', 'Tailwind CSS', 'FastAPI'],
      outcome: 'Transparent evaluation benchmark with high user confidence in explainable scoring.'
    }
  },
  {
    slug: 'veyra',
    number: '03',
    title: 'VEYRA',
    subtitle: 'Financial Intelligence & Budgeting',
    tagline: 'Personal cashflow visualization, spending behavior analytics, & smart budgeting',
    description: 'A thoughtful personal finance and budgeting dashboard designed to provide effortless clarity over spending categories, budget health, savings velocity, and future cashflow forecasts.',
    tags: ['Personal Finance', 'Data Visualization', 'UI/UX', 'Next.js'],
    year: '2024',
    featured: true,
    visualType: 'analytics',
    links: {
      github: 'https://github.com/bedantikamondal/veyra',
      demo: '#',
    },
    details: {
      problem: 'Most personal finance apps are either cluttered with generic charts or fail to give users an intuitive emotional sense of their financial trajectory.',
      idea: 'An editorial financial dashboard engineered around clear category hierarchies, spending velocity indicators, and proactive cashflow runway calculations.',
      architecture: {
        title: 'Personal Budget & Cashflow Engine',
        description: 'Client-side aggregation pipeline transforming raw transaction feeds into intuitive category breakdowns and spending forecasts.',
        nodes: [
          'Transaction Stream Ingestion',
          'Category Classification Core',
          'Runway & Burn Velocity Evaluator',
          'Interactive Visual Dashboard'
        ]
      },
      keyFeatures: [
        {
          title: 'Budget Health & Velocity Index',
          description: 'Clear visual gauge showing real-time spending pace against monthly budget milestones.'
        },
        {
          title: 'Category Spending Heatmaps',
          description: 'Intuitive breakdown of recurring fixed expenses versus discretionary spending behavior.'
        },
        {
          title: 'Cashflow Runway Forecasting',
          description: 'Dynamic projections factoring in upcoming recurring bills, pay cycles, and savings goals.'
        }
      ],
      interactionDesign: 'Tactile category filters, smooth scrubbing curves, and editorial typography that makes personal finance calming rather than stressful.',
      techStack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Chart.js'],
      outcome: 'Streamlined personal finance dashboard offering instant budget awareness in under 10 seconds of review.'
    }
  },
  {
    slug: 'nikot-e-metro',
    number: '04',
    title: 'NIKOT-E-METRO',
    subtitle: 'West Bengal Metro Navigation',
    tagline: 'Topological transit routing & rapid urban mobility companion',
    description: 'A modern, lightweight urban mobility platform for West Bengal metro networks, featuring clean topological line maps, rapid route synthesis, and interchange navigation.',
    tags: ['Maps', 'Urban Mobility', 'Web', 'PWA'],
    year: '2024',
    featured: true,
    visualType: 'transit',
    links: {
      github: 'https://github.com/bedantikamondal/nikot-e-metro',
      demo: '#',
    },
    details: {
      problem: 'Regional commuter transit apps are often slow to load, cluttered with ads, and difficult to navigate on fast commutes.',
      idea: 'A featherweight, offline-capable topological transit system map with instantaneous pathfinding and clear interchange guidance.',
      architecture: {
        title: 'Topological Graph Traversal',
        description: 'Client-side Dijkstra traversal running over pre-compiled transit graph matrices.',
        nodes: [
          'Offline Graph Cache',
          'Interchange Penalty Matrix',
          'Fast Traversal Engine',
          'Dynamic SVG Map Renderer'
        ]
      },
      keyFeatures: [
        {
          title: 'Zero-Latency Route Finding',
          description: 'Calculates shortest path and optimal interchange in under 5 milliseconds completely on the client.'
        },
        {
          title: 'Topological Interactive Map',
          description: 'Bespoke vector network visualization showing live line status and interchange nodes.'
        },
        {
          title: 'Instant Offline Cache',
          description: 'Ultra-lightweight bundle allowing instant lookup even in low-connectivity subway corridors.'
        }
      ],
      interactionDesign: 'Clean interactive transit line vectors, station node pulsing, and instant route preview drawer.',
      techStack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'SVG Geometry', 'PWA'],
      outcome: 'Delivers instantaneous station lookup with zero server roundtrip latency.'
    }
  }
];
