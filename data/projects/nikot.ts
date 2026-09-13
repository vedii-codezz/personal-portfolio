// Public case-study content: approved M9.2B facts and explicitly conceptual examples.
export const nikotData = {
  "meta": {
    "slug": "nikot-e-metro",
    "number": "04",
    "name": "NIKOT-E-METRO",
    "bengaliName": "নিকটে মেট্রো",
    "subtitle": "KOLKATA METRO NAVIGATION & SPATIAL DISCOVERY SYSTEM",
    "category": "SPATIAL COMPUTATION & MULTIMODAL TRANSIT",
    "timeline": "2024",
    "status": "INDEPENDENT SYSTEM / COMPLETED",
    "links": {
      "github": "https://github.com/vedii-codezz/nikot-e-metro",
      "live": null
    },
    "coordinates": [
      {
        "label": "PROJECT",
        "value": "KOLKATA METRO NAVIGATION"
      },
      {
        "label": "DISCOVERY",
        "value": "HAVERSINE NEARBY-STATION LOGIC"
      },
      {
        "label": "ROUTING",
        "value": "DIJKSTRA / A* / PARETO"
      },
      {
        "label": "DATA",
        "value": "BUNDLED PROJECT TRANSIT DATASET"
      }
    ]
  },
  "hero": {
    "headline": [
      "TRANSIT MAPS ASSUME YOU ARE ALREADY AT THE STATION.",
      "NAVIGATION BEGINS WHERE YOU STAND."
    ],
    "supportingPrinciple": "SPATIAL DISCOVERY. GRAPH ROUTING. MULTIMODAL TRANSIT.",
    "summary": "Kolkata Metro spatial navigation connecting user location, nearby stations, a transit graph, and route options.",
    "datasetNotice": "Nikot's bundled routing dataset is not guaranteed to represent the current real-world 2026 network. Visual examples are conceptual, not live transit data."
  },
  "lastMileGap": {
    "eyebrow": "01 / THE LAST-MILE GAP",
    "heading": "Schematics Show Lines. Commuters Stand on Streets.",
    "annotation": "THE DISCONNECT BETWEEN CARTOGRAPHY & ACCESS",
    "problemSummary": "Standard metro maps operate in transit isolation: they depict station-to-station relationships along abstract diagonals, presuming that the traveller is already situated at an access node on the network. In a dense South Asian metropolis like Kolkata, the primary friction is almost always the unstructured last-mile street journey to the network.",
    "comparison": [
      {
        "dimension": "TRANSIT MAP",
        "premise": "Begins with station nodes",
        "focus": "Connections across a network",
        "blindspot": "The journey to the network needs context"
      },
      {
        "dimension": "SPATIAL NAVIGATION",
        "premise": "Begins where the user stands",
        "focus": "Location → Nearby stations → Transit graph → Route options",
        "blindspot": "Nearby-station computation precedes route selection"
      }
    ],
    "dilemmas": [
      {
        "q": "WHERE DOES NAVIGATION BEGIN?",
        "context": "User location provides the starting point for nearby-station computation."
      },
      {
        "q": "WHICH ROUTE FITS THE JOURNEY?",
        "context": "Travel duration, transfer count, and walking duration create different priorities."
      },
      {
        "q": "HOW DOES SEARCH CONNECT TO THE GRAPH?",
        "context": "Bilingual English/Bengali search helps discover station entries."
      }
    ]
  },
  "locationMath": {
    "eyebrow": "02 / LOCATION BECOMES DISTANCE",
    "heading": "Location → Nearby Stations",
    "annotation": "HAVERSINE MATRIX & PEDESTRIAN RE-RANKING",
    "description": "Haversine logic supports nearby-station computation.",
    "stages": [
      {
        "step": "01",
        "name": "USER LOCATION",
        "formula": "YOU ARE HERE",
        "detail": "Location is used transiently as the starting point."
      },
      {
        "step": "02",
        "name": "HAVERSINE",
        "formula": "LOCATION → PROXIMITY",
        "detail": "Haversine logic evaluates nearby-station proximity."
      },
      {
        "step": "03",
        "name": "NEARBY STATIONS",
        "formula": "PROXIMITY → CANDIDATES",
        "detail": "Candidate station nodes connect discovery to the transit graph."
      }
    ],
    "divergenceCase": "Proximity and route choice are distinct: nearby-station discovery supplies candidates for graph routing."
  },
  "radialField": {
    "eyebrow": "03 / THE NEAREST-STATION FIELD",
    "heading": "Nearby-Station Discovery",
    "annotation": "[CONCEPTUAL VISUALIZATION] SPATIAL RELATIONSHIPS",
    "description": "A schematic relationship between an origin and candidate nodes; positions do not encode real geography or distance.",
    "origins": [
      {
        "id": "A",
        "name": "ORIGIN A",
        "bengaliName": "ধারণামূলক",
        "context": "[CONCEPTUAL VISUALIZATION] Example origin and candidate nodes; not a real map or navigation recommendation.",
        "candidateStations": [
          {
            "name": "STATION A",
            "bengaliName": "স্টেশন",
            "lineId": "LINE A",
            "isNearest": true
          },
          {
            "name": "STATION B",
            "bengaliName": "স্টেশন",
            "lineId": "LINE B",
            "isNearest": false
          },
          {
            "name": "STATION C",
            "bengaliName": "স্টেশন",
            "lineId": "LINE C",
            "isNearest": false
          }
        ]
      },
      {
        "id": "B",
        "name": "ORIGIN B",
        "bengaliName": "ধারণামূলক",
        "context": "[CONCEPTUAL VISUALIZATION] Example origin and candidate nodes; not a real map or navigation recommendation.",
        "candidateStations": [
          {
            "name": "STATION A",
            "bengaliName": "স্টেশন",
            "lineId": "LINE A",
            "isNearest": false
          },
          {
            "name": "STATION B",
            "bengaliName": "স্টেশন",
            "lineId": "LINE B",
            "isNearest": true
          },
          {
            "name": "STATION C",
            "bengaliName": "স্টেশন",
            "lineId": "LINE C",
            "isNearest": false
          }
        ]
      },
      {
        "id": "C",
        "name": "ORIGIN C",
        "bengaliName": "ধারণামূলক",
        "context": "[CONCEPTUAL VISUALIZATION] Example origin and candidate nodes; not a real map or navigation recommendation.",
        "candidateStations": [
          {
            "name": "STATION A",
            "bengaliName": "স্টেশন",
            "lineId": "LINE A",
            "isNearest": false
          },
          {
            "name": "STATION B",
            "bengaliName": "স্টেশন",
            "lineId": "LINE B",
            "isNearest": false
          },
          {
            "name": "STATION C",
            "bengaliName": "স্টেশন",
            "lineId": "LINE C",
            "isNearest": true
          }
        ]
      }
    ]
  },
  "graphTopology": {
    "eyebrow": "04 / THE CITY BECOMES A GRAPH",
    "heading": "The City Becomes a Graph",
    "annotation": "TOPOLOGICAL ENCODING & OPERATIONAL FILTERING",
    "description": "Station nodes are connected by track edges, transfer edges, and walking connections.",
    "networkSummary": "The bundled project transit dataset supports the graph; it is not a statement of current network operations.",
    "linesInDataset": [
      {
        "code": "NODE",
        "name": "STATION NODES",
        "bengaliName": "স্টেশন",
        "status": "GRAPH CONCEPT",
        "terminals": "Station entries",
        "note": "Nodes represent stations."
      },
      {
        "code": "TRACK",
        "name": "TRACK EDGES",
        "bengaliName": "সংযোগ",
        "status": "GRAPH CONCEPT",
        "terminals": "Connected station nodes",
        "note": "Edges represent track connections."
      },
      {
        "code": "TRANSFER",
        "name": "TRANSFER EDGES",
        "bengaliName": "সংযোগ",
        "status": "GRAPH CONCEPT",
        "terminals": "Connections between lines",
        "note": "A transfer is represented as a graph connection."
      },
      {
        "code": "WALK",
        "name": "WALKING CONNECTIONS",
        "bengaliName": "সংযোগ",
        "status": "GRAPH CONCEPT",
        "terminals": "Location to network",
        "note": "Walking connections relate access to the transit graph."
      }
    ]
  },
  "tradeoffTheory": {
    "eyebrow": "05 / ROUTING IS A TRADE-OFF",
    "heading": "The Shortest Path is Rarely the Best Journey",
    "annotation": "MULTI-CRITERIA PARETO OPTIMIZATION",
    "description": "Route options balance travel duration, transfer count, and walking duration.",
    "criteria": [
      {
        "name": "TRAVEL DURATION",
        "goal": "Compare journey duration",
        "priority": "Duration is one route-selection dimension"
      },
      {
        "name": "TRANSFER COUNT",
        "goal": "Compare line changes",
        "priority": "Transfers are a separate dimension"
      },
      {
        "name": "WALKING DURATION",
        "goal": "Compare walking duration",
        "priority": "Walking effort is considered separately"
      }
    ],
    "paretoNote": "PARETO: An option dominates another when it is no worse in every dimension and better in at least one. Non-dominated alternatives expose trade-offs."
  },
  "paretoMatrix": {
    "eyebrow": "06 / THE PARETO ROUTE MATRIX",
    "heading": "Pareto Route Options",
    "annotation": "[CONCEPTUAL VISUALIZATION] ROUTE TRADE-OFFS",
    "description": "DIJKSTRA / A* / PARETO — routing concepts shown without exact route values.",
    "journeyOverview": {
      "corridor": "ORIGIN → TRANSIT GRAPH → DESTINATION",
      "distanceApprox": "CONCEPTUAL ROUTE OPTIONS",
      "verifiedDatasetCost": "No route measurements or current service claims"
    },
    "options": [
      {
        "criteriaId": "fastest",
        "criteriaLabel": "TRAVEL DURATION",
        "summary": "Compare journey duration",
        "priority": "Duration is one route-selection dimension",
        "stages": [
          {
            "label": "YOU ARE HERE",
            "detail": "Origin for nearby-station discovery"
          },
          {
            "label": "NEARBY STATIONS",
            "detail": "Candidate access nodes"
          },
          {
            "label": "TRANSIT GRAPH",
            "detail": "Track, transfer, and walking connections"
          },
          {
            "label": "ROUTE OPTIONS",
            "detail": "Compare travel duration, transfer count, and walking duration"
          }
        ]
      },
      {
        "criteriaId": "fewest_transfers",
        "criteriaLabel": "TRANSFER COUNT",
        "summary": "Compare line changes",
        "priority": "Transfers are a separate dimension",
        "stages": [
          {
            "label": "YOU ARE HERE",
            "detail": "Origin for nearby-station discovery"
          },
          {
            "label": "NEARBY STATIONS",
            "detail": "Candidate access nodes"
          },
          {
            "label": "TRANSIT GRAPH",
            "detail": "Track, transfer, and walking connections"
          },
          {
            "label": "ROUTE OPTIONS",
            "detail": "Compare travel duration, transfer count, and walking duration"
          }
        ]
      },
      {
        "criteriaId": "least_walking",
        "criteriaLabel": "WALKING DURATION",
        "summary": "Compare walking duration",
        "priority": "Walking effort is considered separately",
        "stages": [
          {
            "label": "YOU ARE HERE",
            "detail": "Origin for nearby-station discovery"
          },
          {
            "label": "NEARBY STATIONS",
            "detail": "Candidate access nodes"
          },
          {
            "label": "TRANSIT GRAPH",
            "detail": "Track, transfer, and walking connections"
          },
          {
            "label": "ROUTE OPTIONS",
            "detail": "Compare travel duration, transfer count, and walking duration"
          }
        ]
      }
    ]
  },
  "interchangeAnatomy": {
    "eyebrow": "07 / INTERCHANGE IS PART OF THE JOURNEY",
    "heading": "Transfer as a Graph Connection",
    "annotation": "[CONCEPTUAL VISUALIZATION] LINE CONNECTION",
    "hubName": "LINE A → TRANSFER → LINE B",
    "hubBengaliName": "ধারণামূলক সংযোগ",
    "hubContext": "Conceptual graph relationship, not actual station infrastructure.",
    "transferModel": [
      {
        "phase": "01",
        "title": "LINE A",
        "detail": "Origin line in the conceptual graph."
      },
      {
        "phase": "02",
        "title": "TRANSFER",
        "detail": "Transfer edge connects the lines."
      },
      {
        "phase": "03",
        "title": "LINE B",
        "detail": "Destination line in the conceptual graph."
      }
    ],
    "penaltyPhilosophy": "[CONCEPTUAL VISUALIZATION] This connection shows a graph relationship only."
  },
  "bilingualSearch": {
    "eyebrow": "08 / BILINGUAL CITY SEARCH",
    "heading": "Dual-Script Station & Landmark Normalization",
    "annotation": "ENGLISH & BENGALI (বাংলা) INDEXING",
    "description": "Bilingual English/Bengali search supports station discovery.",
    "samples": [
      {
        "english": "Station A",
        "bengali": "স্টেশন এ",
        "code": "A",
        "type": "CONCEPTUAL SEARCH EXAMPLE"
      },
      {
        "english": "Station B",
        "bengali": "স্টেশন বি",
        "code": "B",
        "type": "CONCEPTUAL SEARCH EXAMPLE"
      }
    ],
    "normalizationRule": "SEARCH: English and Bengali names support discovery of station entries."
  },
  "serverArchitecture": {
    "eyebrow": "09 / MAP + SERVER ARCHITECTURE",
    "heading": "Navigation Architecture",
    "annotation": "SERVER-SIDE ROUTING & DATA PIPELINE",
    "description": "Discovery connects to a bundled transit graph and route options.",
    "stackGroups": [
      {
        "category": "SPATIAL DISCOVERY",
        "items": [
          {
            "name": "Haversine",
            "detail": "Nearby-station logic"
          }
        ]
      },
      {
        "category": "ROUTING",
        "items": [
          {
            "name": "Dijkstra",
            "detail": "Graph routing"
          },
          {
            "name": "A*",
            "detail": "Graph search"
          },
          {
            "name": "Pareto",
            "detail": "Travel duration / transfer count / walking duration"
          }
        ]
      },
      {
        "category": "DATA",
        "items": [
          {
            "name": "Bundled project transit dataset",
            "detail": "Not guaranteed to reflect current real-world network state"
          }
        ]
      },
      {
        "category": "SEARCH",
        "items": [
          {
            "name": "English / Bengali",
            "detail": "Bilingual station search"
          }
        ]
      }
    ]
  },
  "resilience": {
    "eyebrow": "10 / RESILIENCE & FALLBACKS",
    "heading": "Dataset & Availability Boundaries",
    "annotation": "FAULT-TOLERANT TRANSIT AVAILABILITY",
    "description": "Bundled transit data is separate from live service telemetry. No offline PWA capability is claimed.",
    "tiers": [
      {
        "subsystem": "TRANSIT DATA",
        "primary": "Bundled project dataset",
        "fallback": "Current network state is not guaranteed",
        "behavior": "The portfolio describes the project data boundary."
      },
      {
        "subsystem": "SERVICE TELEMETRY",
        "primary": "Computed route options",
        "fallback": "No real-time delay feed",
        "behavior": "No live train tracking is implemented."
      },
      {
        "subsystem": "LOCATION",
        "primary": "Transient nearby-station computation",
        "fallback": "No location persistence feature",
        "behavior": "Location supplies nearby-station computation."
      }
    ]
  },
  "geolocationPrivacy": {
    "eyebrow": "11 / GEOLOCATION & LIVE-DATA BOUNDARY",
    "heading": "Data Handling Realities and Network Boundaries",
    "annotation": "PRIVACY SPECIFICATIONS & OPERATIONAL LIMITS",
    "privacyPoints": [
      "User location is used transiently for nearby-station computation; no location persistence feature is implemented."
    ],
    "liveDataBoundary": [
      "NOT REAL-TIME: No live train tracking or real-time delay feed.",
      "Bundled project transit data is not guaranteed to represent the current real-world 2026 network state."
    ]
  },
  "authorship": {
    "eyebrow": "12 / INDEPENDENT PROJECT",
    "heading": "Solo Repository Authorship",
    "annotation": "DIRECT REPOSITORY PROVENANCE",
    "attribution": "DESIGNED AND BUILT BY BEDANTIKA MONDAL",
    "summary": "An independent Kolkata Metro navigation project by Bedantika Mondal.",
    "areas": [
      {
        "domain": "TRANSIT GRAPH",
        "detail": "Station nodes, track edges, transfer edges, and walking connections."
      },
      {
        "domain": "ROUTING",
        "detail": "Dijkstra, A*, and Pareto routing."
      },
      {
        "domain": "NEARBY STATIONS",
        "detail": "Haversine nearby-station logic."
      },
      {
        "domain": "BILINGUAL SEARCH",
        "detail": "English/Bengali station search."
      }
    ]
  },
  "retrospective": {
    "eyebrow": "13 / RETROSPECTIVE",
    "heading": "Reflections on Urban Transit Computation",
    "annotation": "TECHNICAL TRADE-OFFS & LESSONS",
    "reflections": [
      {
        "title": "NAVIGATION STARTS WITH LOCATION",
        "body": "Nearby-station discovery connects a user origin to the network."
      },
      {
        "title": "TRANSFERS ARE GRAPH RELATIONSHIPS",
        "body": "Transfer edges connect lines without implying specific station infrastructure."
      },
      {
        "title": "ROUTING INVOLVES TRADE-OFFS",
        "body": "Travel duration, transfer count, and walking duration remain separate considerations."
      },
      {
        "title": "KEEP DATA BOUNDARIES VISIBLE",
        "body": "Bundled project data is distinct from current service telemetry."
      }
    ]
  }
} as const;

export type LandmarkOrigin = (typeof nikotData.radialField.origins)[number];
export type ParetoRouteOption = (typeof nikotData.paretoMatrix.options)[number];
