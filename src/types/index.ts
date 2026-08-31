export interface Project {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  tags: string[];
  year: string;
  featured: boolean;
  visualType: 'network' | 'matrix' | 'analytics' | 'transit';
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
  };
  details: {
    problem: string;
    idea: string;
    architecture: {
      title: string;
      description: string;
      nodes: string[];
    };
    keyFeatures: {
      title: string;
      description: string;
    }[];
    interactionDesign: string;
    techStack: string[];
    outcome: string;
  };
}

export interface LabExperiment {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'active' | 'wip' | 'archived';
  tags: string[];
  year: string;
  type: 'physics' | 'vector-field' | 'llm-tokens' | 'geometry';
}

export interface Technology {
  name: string;
  category: 'Languages' | 'AI & ML' | 'Frontend' | 'Frameworks' | 'Systems';
  usedIn: string[]; // project slugs
}

export interface SiteConfig {
  name: string;
  identity: string;
  roleSubtitle: string;
  location: string;
  year: string;
  status: string;
  bioQuote: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
  };
  aboutMetadata: {
    label: string;
    value: string;
  }[];
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
}
