export interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  iconName: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export interface CaseStudy {
  id: string;
  title: string;
  tag: string;
  description: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  techStack: string[];
  externalUrl?: string;
  architectureType: 'erp' | 'rag';
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  impacts: string[];
  techUsed: string[];
}
