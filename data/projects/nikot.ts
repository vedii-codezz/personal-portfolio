export interface LandmarkOrigin {
  id: string;
  name: string;
  bengaliName: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  context: string;
  candidateStations: {
    name: string;
    bengaliName: string;
    straightLineKm: number;
    walkingDistanceKm: number;
    walkingMinutes: number;
    lineId: string;
    isNearest: boolean;
    routeQuality: "routed" | "estimated";
  }[];
}

export interface ParetoRouteOption {
  criteriaId: "fastest" | "fewest_transfers" | "least_walking";
  criteriaLabel: string;
  summary: string;
  totalDurationMinutes: number;
  walkingDurationMinutes: number;
  metroDurationMinutes: number;
  transferCount: number;
  stages: {
    type: "walk" | "board" | "ride" | "transfer" | "alight";
    label: string;
    detail: string;
    durationMinutes: number;
    lineCode?: string;
  }[];
}

export const nikotData = {
  meta: {
    slug: "nikot-e-metro",
    number: "04",
    name: "NIKOT-E-METRO",
    bengaliName: "নিকটে মেট্রো",
    subtitle: "KOLKATA METRO NAVIGATION & SPATIAL DISCOVERY SYSTEM",
    category: "SPATIAL COMPUTATION & MULTIMODAL TRANSIT",
    timeline: "2024",
    status: "INDEPENDENT SYSTEM / COMPLETED",
    links: {
      github: "https://github.com/vedii-codezz/nikot-e-metro",
      live: null,
    },
    coordinates: [
      { label: "PROJECT ARCHITECTURE", value: "INDEPENDENT SYSTEM" },
      { label: "CORE REPOSITORY", value: "SOLO AUTHORSHIP (BEDANTIKA MONDAL)" },
      { label: "SYSTEM ARCHITECTURE", value: "FULL-STACK TRANSIT PROTOTYPE" },
      { label: "STACK CORE", value: "NEXT.JS 14 / POSTGRESQL / MAPLIBRE GL" },
    ],
  },

  hero: {
    headline: [
      "TRANSIT MAPS ASSUME YOU ARE ALREADY AT THE STATION.",
      "NAVIGATION BEGINS WHERE YOU STAND.",
    ],
    supportingPrinciple: "SPATIAL DISCOVERY. GRAPH ROUTING. MULTIMODAL TRANSIT.",
    summary:
      "A full-stack rapid transit navigator and spatial station discovery prototype designed for Kolkata’s expanding metro network. It translates real-world coordinates into nearest-station access vectors, resolves multimodal transfers through an operational topology graph, and evaluates journeys across multiple Pareto criteria.",
    datasetNotice:
      "NOTICE: Operational status references reflect the network state represented within Nikot's bundled routing dataset, not unverified live service telemetry.",
  },

  lastMileGap: {
    eyebrow: "01 / THE LAST-MILE GAP",
    heading: "Schematics Show Lines. Commuters Stand on Streets.",
    annotation: "THE DISCONNECT BETWEEN CARTOGRAPHY & ACCESS",
    problemSummary:
      "Standard metro maps operate in transit isolation: they depict station-to-station relationships along abstract diagonals, presuming that the traveller is already situated on a subway platform. In a dense South Asian metropolis like Kolkata, the primary friction is almost always the unstructured last-mile street journey to the network.",
    comparison: [
      {
        dimension: "SCHEMATIC TRANSIT MAP",
        premise: "Assumes entry at station platform",
        focus: "Station-to-station rail travel",
        blindspot: "Ignores walking distance, barriers, and entry concourses",
      },
      {
        dimension: "REAL-WORLD COMMUTE",
        premise: "Begins at a street coordinate or landmark",
        focus: "Pedestrian approach → Platform entry → Transfer → Destination",
        blindspot: "Requires spatial proximity calculation before network routing can begin",
      },
    ],
    dilemmas: [
      {
        q: "WHICH STATION IS TRULY ACCESSIBLE?",
        context: "A station that is 800m away in a straight line may be separated by an uncrossable rail yard, requiring a 1.8km detour.",
      },
      {
        q: "IS AN INTERCHANGE WORTH THE DWELL TIME?",
        context: "Transferring between lines involves subterranean concourses, security gates, and train headways that often exceed the time saved on rails.",
      },
      {
        q: "HOW DOES A LANDMARK CONVERT TO TRANSIT?",
        context: "Visitors navigate by historic cultural hubs (e.g. Victoria Memorial, College Street) rather than knowing municipal station codes.",
      },
    ],
  },

  locationMath: {
    eyebrow: "02 / LOCATION BECOMES DISTANCE",
    heading: "From Geographic Coordinates to Radial Proximity",
    annotation: "HAVERSINE MATRIX & PEDESTRIAN RE-RANKING",
    description:
      "To discover the optimal transit entry point, Nikot executes a two-stage spatial discovery pipeline: first calculating spherical distance across all candidate stations, then re-ranking top candidates against pedestrian street networks.",
    stages: [
      {
        step: "STAGE 01",
        name: "HAVERSINE GREAT-CIRCLE FILTER",
        formula: "d = 2R \\cdot \\operatorname{atan2}\\left(\\sqrt{a}, \\sqrt{1-a}\\right)",
        detail:
          "Computes great-circle distance between user origin coordinates and all 76 metro stations in Nikot's database. Isolates the top 5 nearest candidates at sub-millisecond computation.",
      },
      {
        step: "STAGE 02",
        name: "PEDESTRIAN WALKING ESTIMATION",
        formula: "T_{walk} = \\max\\left(1, \\, \\operatorname{round}\\left(\\frac{d}{4.8\\text{ km/h}} \\times 60\\right)\\right)",
        detail:
          "Converts distance into pedestrian duration using an urban standard baseline velocity of 4.8 km/h (~80 m/min).",
      },
      {
        step: "STAGE 03",
        name: "STREET NETWORK RE-RANKING",
        formula: "T_{actual} = \\text{PedestrianProvider}(O, D)",
        detail:
          "For top candidates, Nikot queries pedestrian route services (Valhalla / OSRM) to decode real sidewalk turn-by-turn geometry, detecting physical barriers that straight-line math misses.",
      },
    ],
    divergenceCase:
      "TECHNICAL PRINCIPLE: Straight-line nearest is not always pedestrian nearest. Physical barriers (rail yards, water bodies, walled compounds) mean a station with shorter great-circle distance can require a longer walking route than a seemingly farther station.",
  },

  radialField: {
    eyebrow: "03 / THE NEAREST-STATION FIELD",
    heading: "Radial Station Discovery Across Kolkata Landmarks",
    annotation: "SIGNATURE VISUAL 01 // SPATIAL PROXIMITY ENGINE",
    description:
      "Explore how Nikot resolves real-world origin coordinates against candidate metro stations. Selecting an origin illustrates the spatial delta between straight-line Haversine distance and real pedestrian walking access.",
    origins: [
      {
        id: "victoria",
        name: "Victoria Memorial",
        bengaliName: "ভিক্টোরিয়া মেমোরিয়াল",
        coordinates: { latitude: 22.5448, longitude: 88.3426 },
        context: "Southern Maidan cultural landmark surrounded by green parkland perimeter.",
        candidateStations: [
          {
            name: "Rabindra Sadan",
            bengaliName: "রবীন্দ্র সদন",
            straightLineKm: 0.95,
            walkingDistanceKm: 1.2,
            walkingMinutes: 15,
            lineId: "Line 1 (Blue)",
            isNearest: true,
            routeQuality: "routed",
          },
          {
            name: "Maidan",
            bengaliName: "ময়দান",
            straightLineKm: 1.1,
            walkingDistanceKm: 1.35,
            walkingMinutes: 17,
            lineId: "Line 1 (Blue)",
            isNearest: false,
            routeQuality: "routed",
          },
          {
            name: "Netaji Bhavan",
            bengaliName: "নেতাজি ভবন",
            straightLineKm: 1.65,
            walkingDistanceKm: 2.1,
            walkingMinutes: 26,
            lineId: "Line 1 (Blue)",
            isNearest: false,
            routeQuality: "estimated",
          },
        ],
      },
      {
        id: "howrah",
        name: "Howrah Railway Station",
        bengaliName: "হাওড়া রেলওয়ে স্টেশন",
        coordinates: { latitude: 22.5855, longitude: 88.3432 },
        context: "Busiest railway terminus in India, situated on the western bank of the Hooghly River.",
        candidateStations: [
          {
            name: "Howrah Metro",
            bengaliName: "হাওড়া",
            straightLineKm: 0.15,
            walkingDistanceKm: 0.2,
            walkingMinutes: 2,
            lineId: "Line 2 (Green)",
            isNearest: true,
            routeQuality: "routed",
          },
          {
            name: "Howrah Maidan",
            bengaliName: "হাওড়া ময়দান",
            straightLineKm: 1.3,
            walkingDistanceKm: 1.6,
            walkingMinutes: 20,
            lineId: "Line 2 (Green)",
            isNearest: false,
            routeQuality: "routed",
          },
          {
            name: "Mahatma Gandhi Road",
            bengaliName: "মহাত্মা গান্ধী রোড",
            straightLineKm: 1.85,
            walkingDistanceKm: 2.7,
            walkingMinutes: 34,
            lineId: "Line 1 (Blue)",
            isNearest: false,
            routeQuality: "estimated",
          },
        ],
      },
      {
        id: "techno",
        name: "Techno India University",
        bengaliName: "টেকনো ইন্ডিয়া বিশ্ববিদ্যালয়",
        coordinates: { latitude: 22.5768, longitude: 88.4344 },
        context: "Educational hub in Salt Lake Sector V IT district.",
        candidateStations: [
          {
            name: "Salt Lake Sector V",
            bengaliName: "সল্টলেক সেক্টর ৫",
            straightLineKm: 0.45,
            walkingDistanceKm: 0.5,
            walkingMinutes: 6,
            lineId: "Line 2 (Green)",
            isNearest: true,
            routeQuality: "routed",
          },
          {
            name: "Karunamoyee",
            bengaliName: "করুণাময়ী",
            straightLineKm: 1.4,
            walkingDistanceKm: 1.7,
            walkingMinutes: 21,
            lineId: "Line 2 (Green)",
            isNearest: false,
            routeQuality: "routed",
          },
          {
            name: "Central Park",
            bengaliName: "সেন্ট্রাল পার্ক",
            straightLineKm: 2.1,
            walkingDistanceKm: 2.6,
            walkingMinutes: 32,
            lineId: "Line 2 (Green)",
            isNearest: false,
            routeQuality: "estimated",
          },
        ],
      },
    ] as LandmarkOrigin[],
  },

  graphTopology: {
    eyebrow: "04 / THE CITY BECOMES A GRAPH",
    heading: "Modeling Transit Geography as a Directed Graph",
    annotation: "TOPOLOGICAL ENCODING & OPERATIONAL FILTERING",
    description:
      "Nikot structures the Kolkata transit network as a directed adjacency graph. Each station is a node, adjacent track segments are weighted directed edges, and transfer hubs contain concourse connection edges with transfer dwell penalties.",
    networkSummary:
      "Within Nikot's routing dataset, 76 station entries are cataloged across 6 corridors. The routing graph enforces strict operational status filtering: incomplete or planned extensions are excluded from pathfinding.",
    linesInDataset: [
      {
        code: "Line 1",
        name: "Blue Line",
        bengaliName: "ব্লু লাইন (উত্তর-দক্ষিণ)",
        status: "Operational",
        terminals: "Dakshineswar ↔ Kavi Subhash",
        note: "32 stations • Primary north-south arterial spine.",
      },
      {
        code: "Line 2",
        name: "Green Line",
        bengaliName: "গ্রিন লাইন (পূর্ব-পশ্চিম)",
        status: "Operational in dataset",
        terminals: "Howrah Maidan ↔ Salt Lake Sector V",
        note: "12 stations • Subaqueous Hooghly river tunnel connecting Howrah and Kolkata.",
      },
      {
        code: "Line 3",
        name: "Purple Line",
        bengaliName: "পার্পল লাইন",
        status: "Partially Operational in dataset",
        terminals: "Joka ↔ Majerhat",
        note: "6 operational stations • Central extension towards Esplanade excluded from routing.",
      },
      {
        code: "Line 6",
        name: "Orange Line",
        bengaliName: "অরেঞ্জ লাইন",
        status: "Partially Operational in dataset",
        terminals: "Kavi Subhash ↔ Beleghata",
        note: "9 operational stations • Airport extension excluded from routing.",
      },
      {
        code: "Line 4",
        name: "Yellow Line",
        bengaliName: "ইয়েলো লাইন",
        status: "Partially Operational in dataset",
        terminals: "Noapara ↔ Jai Hind (Airport)",
        note: "4 operational stations • Interchanges with Blue Line at Noapara.",
      },
      {
        code: "Line 5",
        name: "Pink Line",
        bengaliName: "পিঙ্ক লাইন",
        status: "Planned in dataset",
        terminals: "Baranagar ↔ Barrackpore",
        note: "11 planned stations • Fully disabled in pathfinding graph.",
      },
    ],
  },

  tradeoffTheory: {
    eyebrow: "05 / ROUTING IS A TRADE-OFF",
    heading: "The Shortest Path is Rarely the Best Journey",
    annotation: "MULTI-CRITERIA PARETO OPTIMIZATION",
    description:
      "Conventional routers minimize a single metric (either distance or theoretical in-vehicle time). In urban transit, commuters balance competing priorities: saving 4 minutes on a train is rarely worth climbing three flights of stairs to transfer lines. Nikot uses a multi-label Pareto routing engine to calculate non-dominated journey alternatives.",
    criteria: [
      {
        name: "FASTEST OVERALL",
        goal: "Minimizes total elapsed door-to-door trip duration",
        priority: "Accepts transfers and moderate walking if train speeds reduce total time",
      },
      {
        name: "FEWEST TRANSFERS",
        goal: "Minimizes line changes and concourse traversal",
        priority: "Favors single-train rides, eliminating platform transfer friction",
      },
      {
        name: "LEAST WALKING",
        goal: "Minimizes first-mile and last-mile pedestrian effort",
        priority: "Prioritizes the closest available stations to origin and destination",
      },
    ],
    paretoNote:
      "PARETO PRINCIPLE: A route option is retained only if no other option is strictly superior across all three dimensions simultaneously. If two criteria yield an identical physical path, Nikot displays that shared reality truthfully rather than fabricating artificial variance.",
  },

  paretoMatrix: {
    eyebrow: "06 / THE PARETO ROUTE MATRIX",
    heading: "Multi-Criteria Journey Selection: Howrah to Sector V",
    annotation: "SIGNATURE VISUAL 02 // MULTI-LABEL PARETO ENGINE",
    description:
      "A verified journey across the Hooghly river corridor demonstrates how Nikot's Multi-Label Dijkstra evaluates trade-offs between travel duration, transfer friction, and pedestrian distance.",
    journeyOverview: {
      corridor: "Howrah Railway Station → Techno India University (Sector V)",
      distanceApprox: "16.4 km total network span",
      verifiedDatasetCost: "Calculated from Nikot's bundled operational graph",
    },
    options: [
      {
        criteriaId: "fastest",
        criteriaLabel: "FASTEST JOURNEY",
        summary: "Continuous east-west transit through the subaqueous Hooghly river tunnel.",
        totalDurationMinutes: 37,
        walkingDurationMinutes: 8,
        metroDurationMinutes: 29,
        transferCount: 0,
        stages: [
          { type: "walk", label: "Walk to Howrah Metro", detail: "Concourse access from railway terminal", durationMinutes: 2 },
          { type: "board", label: "Board Green Line", detail: "Platform 1 towards Salt Lake Sector V", durationMinutes: 1, lineCode: "Line 2" },
          { type: "ride", label: "Direct Metro Transit", detail: "11 stations via Esplanade & Sealdah", durationMinutes: 27, lineCode: "Line 2" },
          { type: "alight", label: "Alight at Salt Lake Sector V", detail: "Exit via Gate 2 / Ring Road", durationMinutes: 1, lineCode: "Line 2" },
          { type: "walk", label: "Walk to Techno India", detail: "Pedestrian sidewalk via IT Park Street", durationMinutes: 6 },
        ],
      },
      {
        criteriaId: "fewest_transfers",
        criteriaLabel: "FEWEST TRANSFERS",
        summary: "Zero-transfer single-seat journey along the continuous Green Line corridor.",
        totalDurationMinutes: 37,
        walkingDurationMinutes: 8,
        metroDurationMinutes: 29,
        transferCount: 0,
        stages: [
          { type: "walk", label: "Walk to Howrah Metro", detail: "Concourse access from railway terminal", durationMinutes: 2 },
          { type: "board", label: "Board Green Line", detail: "Platform 1 towards Salt Lake Sector V", durationMinutes: 1, lineCode: "Line 2" },
          { type: "ride", label: "Direct Metro Transit", detail: "11 stations via Esplanade & Sealdah", durationMinutes: 27, lineCode: "Line 2" },
          { type: "alight", label: "Alight at Salt Lake Sector V", detail: "Exit via Gate 2 / Ring Road", durationMinutes: 1, lineCode: "Line 2" },
          { type: "walk", label: "Walk to Techno India", detail: "Pedestrian sidewalk via IT Park Street", durationMinutes: 6 },
        ],
      },
      {
        criteriaId: "least_walking",
        criteriaLabel: "LEAST WALKING",
        summary: "Prioritizes closest platform access, minimizing overall pedestrian effort.",
        totalDurationMinutes: 40,
        walkingDurationMinutes: 6,
        metroDurationMinutes: 34,
        transferCount: 0,
        stages: [
          { type: "walk", label: "Direct Platform Access", detail: "Shortest ingress via Station Subway", durationMinutes: 1 },
          { type: "board", label: "Board Green Line", detail: "Platform 1 towards Salt Lake Sector V", durationMinutes: 1, lineCode: "Line 2" },
          { type: "ride", label: "Direct Metro Transit", detail: "11 stations via Esplanade & Sealdah", durationMinutes: 27, lineCode: "Line 2" },
          { type: "alight", label: "Alight at Salt Lake Sector V", detail: "Immediate egress through North Gate", durationMinutes: 1, lineCode: "Line 2" },
          { type: "walk", label: "Short Pedestrian Approach", detail: "Direct connection to campus front", durationMinutes: 5 },
        ],
      },
    ] as ParetoRouteOption[],
  },

  interchangeAnatomy: {
    eyebrow: "07 / INTERCHANGE IS PART OF THE JOURNEY",
    heading: "Modeling Physical Transfers: Esplanade Concourse",
    annotation: "SIGNATURE VISUAL 03 // INTERCHANGE CONCOURSE TOPOLOGY",
    description:
      "A transfer between two metro lines is not an instantaneous graph hop. It involves walking up staircases, traversing security concourses, and waiting for connecting trains. Nikot models transfers as explicit physical edges with measurable dwell penalties.",
    hubName: "Esplanade Interchange Hub",
    hubBengaliName: "এসপ্ল্যানেড ইন্টারচেঞ্জ হাব",
    hubContext:
      "The primary multimodal intersection of Kolkata Metro, linking the 1984 North-South Line 1 (Blue) with the deep subaqueous East-West Line 2 (Green).",
    transferModel: [
      {
        phase: "01. ARRIVAL",
        title: "Alight at Line 1 Platform",
        detail: "Train arrives at Esplanade North-South subterranean platform level.",
        dwellMinutes: 1,
      },
      {
        phase: "02. CONCOURSE PASSAGEWAY",
        title: "Subterranean Pedestrian Transfer",
        detail: "Traverse the dedicated subterranean connecting passageway between stations.",
        dwellMinutes: 3,
      },
      {
        phase: "03. SECURITY & GATES",
        title: "Platform Ingress",
        detail: "Pass through automated fare gates and descend to the deep East-West platform level.",
        dwellMinutes: 1,
      },
      {
        phase: "04. DEPARTURE",
        title: "Board Line 2 Train",
        detail: "Wait for connecting headway and board East-West service towards Sector V.",
        dwellMinutes: 3,
      },
    ],
    penaltyPhilosophy:
      "ROUTING INVARIANT: In Nikot's routing weights, an interchange carries a 5-minute penalty in branch scoring to discourage unnecessary line changes, but displayed trip time reflects verified physical transfer duration.",
  },

  bilingualSearch: {
    eyebrow: "08 / BILINGUAL CITY SEARCH",
    heading: "Dual-Script Station & Landmark Normalization",
    annotation: "ENGLISH & BENGALI (বাংলা) INDEXING",
    description:
      "Kolkata commuters move fluidly between English and Bengali names. Nikot indexes stations and landmarks across both scripts, standardizing Unicode sequences and diacritics to ensure identical search resolution.",
    samples: [
      { english: "Esplanade", bengali: "এসপ্ল্যানেড", code: "ESP", type: "Interchange Station" },
      { english: "Howrah Maidan", bengali: "হাওড়া ময়দান", code: "HWM", type: "Terminal Station" },
      { english: "Victoria Memorial", bengali: "ভিক্টোরিয়া মেমোরিয়াল", code: "LND-01", type: "Cultural Landmark" },
      { english: "College Street (Boi Para)", bengali: "কলেজ স্ট্রিট (বইপাড়া)", code: "LND-05", type: "Literary District" },
      { english: "Dakshineswar Kali Temple", bengali: "দক্ষিণেশ্বর কালীবাড়ি", code: "LND-08", type: "Heritage Landmark" },
    ],
    normalizationRule:
      "SEARCH BEHAVIOR: Queries are normalized by lowercasing Latin text, trimming whitespace, and stripping zero-width joiners in Bengali Unicode strings. Searching 'এসপ্ল্যানেড' or 'Esplanade' maps directly to the same internal entity ID: 'esplanade'.",
  },

  serverArchitecture: {
    eyebrow: "09 / MAP + SERVER ARCHITECTURE",
    heading: "The Full-Stack Prototype Implementation",
    annotation: "SERVER-SIDE ROUTING & DATA PIPELINE",
    description:
      "Unlike pure client-side prototypes, Nikot implements an active Next.js 14 server layer handling geocoding, spatial queries, and graph caching backed by PostgreSQL and fallback datasets.",
    stackGroups: [
      {
        category: "SERVER RUNTIME & API",
        items: [
          { name: "Next.js 14 App Router", detail: "REST Route Handlers for /api/stations/nearby, /api/routes, and /api/search" },
          { name: "Zod Schema Validation", detail: "Strict request validation for latitude, longitude, and station ID parameters" },
        ],
      },
      {
        category: "DATA ACCESS & PERSISTENCE",
        items: [
          { name: "PostgreSQL / Neon Serverless", detail: "Database connection for relational station and line schemas" },
          { name: "Drizzle ORM", detail: "Type-safe relational queries and migration management" },
          { name: "Bundled Local Datasets", detail: "In-memory TypeScript data fallbacks ensuring zero offline failure" },
        ],
      },
      {
        category: "PATHFINDING & GEO ENGINES",
        items: [
          { name: "Multi-Label Dijkstra", detail: "Custom TypeScript Pareto pathfinding over cached graph structures" },
          { name: "A* Guided Search", detail: "Haversine-guided single-objective search for instant route lookups" },
          { name: "Pedestrian Routing Services", detail: "Valhalla / OSRM-foot clients with fallback to Haversine walking math" },
        ],
      },
      {
        category: "CARTOGRAPHY & CLIENT UI",
        items: [
          { name: "MapLibre GL v4.7.1", detail: "Used in original project for custom vector cartography and 3D extrusions" },
          { name: "Tailwind CSS & Framer Motion", detail: "Responsive layout and state-driven interface transitions" },
        ],
      },
    ],
  },

  resilience: {
    eyebrow: "10 / RESILIENCE & FALLBACKS",
    heading: "Graceful Degradation: Database to Bundled Data",
    annotation: "FAULT-TOLERANT TRANSIT AVAILABILITY",
    description:
      "Transit software must not crash when cloud network connectivity fluctuates. Nikot is architected with strict fallback boundaries across both its data tier and its pedestrian routing services.",
    tiers: [
      {
        subsystem: "STATION & TRANSIT DATA",
        primary: "Neon PostgreSQL Cloud Database",
        fallback: "Bundled Local TypeScript Datasets (METRO_STATIONS, METRO_LINES)",
        behavior: "If database connection fails, repository automatically serves bundled static data seamlessly.",
      },
      {
        subsystem: "PEDESTRIAN ROUTING",
        primary: "Valhalla / OSRM-foot Routing Daemons",
        fallback: "Haversine Straight-Line Math + 4.8 km/h Walk Model",
        behavior: "If external pedestrian endpoints timeout, the system falls back to mathematical estimation instantly.",
      },
      {
        subsystem: "GRAPH ACCESS",
        primary: "Cached In-Memory Server Graph (getServerMetroGraph)",
        fallback: "On-demand graph reconstruction from bundled fixtures",
        behavior: "Graph is built once and reused across subsequent user requests.",
      },
    ],
  },

  geolocationPrivacy: {
    eyebrow: "11 / GEOLOCATION & LIVE-DATA BOUNDARY",
    heading: "Data Handling Realities and Network Boundaries",
    annotation: "PRIVACY SPECIFICATIONS & OPERATIONAL LIMITS",
    privacyPoints: [
      "Geolocation begins in the browser via navigator.geolocation with explicit user permission.",
      "Origin coordinates are transmitted to Nikot's server-side Route Handlers to perform nearest-station and route calculations.",
      "If external pedestrian routing is active, coordinate pairs may be forwarded to pedestrian services (e.g. Valhalla / OSRM) to compute street walking geometry.",
      "Nikot implements zero user accounts, zero password stores, and zero persistent location tracking history.",
    ],
    liveDataBoundary: [
      "COMPUTED: Station sequence, walking estimates, transfer dwell, and multi-criteria route options.",
      "NOT REAL-TIME: Nikot does not consume a real-time transit feed; Nikot does NOT receive live GPS telemetry from trains, crowd congestion sensors, or live dispatch alerts.",
      "All route durations reflect published schedule baselines and calculated pedestrian speeds.",
    ],
  },

  authorship: {
    eyebrow: "12 / INDEPENDENT PROJECT",
    heading: "Solo Repository Authorship",
    annotation: "DIRECT REPOSITORY PROVENANCE",
    attribution: "DESIGNED AND BUILT BY BEDANTIKA MONDAL",
    summary:
      "Nikot-e-Metro was conceived, engineered, and tested independently by Bedantika Mondal. Git repository history confirms 100% of commits authored across the project lifecycle.",
    areas: [
      {
        domain: "TRANSIT GRAPH TOPOLOGY",
        detail: "Modeled all 6 Kolkata Metro corridors, physical station connections, and operational/planned status boundaries.",
      },
      {
        domain: "MULTI-LABEL PATHFINDING",
        detail: "Implemented Multi-Label Dijkstra, A* search, and Pareto dominance pruning algorithms in TypeScript.",
      },
      {
        domain: "SPATIAL DISCOVERY ENGINE",
        detail: "Built two-stage nearest station ranking combining Haversine spherical math with pedestrian routing fallbacks.",
      },
      {
        domain: "FULL-STACK INTEGRATION",
        detail: "Architected Next.js 14 route handlers, Drizzle ORM schemas, and test suite of 57 verified tests.",
      },
    ],
  },

  retrospective: {
    eyebrow: "13 / RETROSPECTIVE",
    heading: "Reflections on Urban Transit Computation",
    annotation: "TECHNICAL TRADE-OFFS & LESSONS",
    reflections: [
      {
        title: "STRAIGHT-LINE DISTANCE IS NOT URBAN WALKABILITY",
        body: "Urban geometry contains physical walls, railway yards, and fenced thoroughfares. Relying purely on Haversine distance misleads commuters; incorporating real pedestrian routing is essential for true transit access.",
      },
      {
        title: "A TRANSFER IS PART OF THE ROUTE, NOT A FOOTNOTE",
        body: "Treating interchanges as zero-cost graph transitions produces mathematically optimal routes that human commuters reject. Factoring in concourse traversal and platform dwell makes pathfinding realistic.",
      },
      {
        title: "THE FASTEST PATH IS NOT ALWAYS THE BEST PATH",
        body: "Commuters frequently prefer staying on a single train over transferring, even if it adds 3 minutes to the ride. Multi-criteria Pareto optimization respects human travel preferences.",
      },
      {
        title: "HONEST BOUNDARIES BUILD TRUST IN TRANSIT SOFTWARE",
        body: "Users respect transit apps when they clearly distinguish computed timetable calculations from live vehicle telemetry. Transparent data limitations establish authentic engineering credibility.",
      },
    ],
  },
} as const;
