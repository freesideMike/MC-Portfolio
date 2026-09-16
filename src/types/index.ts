export type Language = 'sv' | 'en';

export interface NavLink {
  label: string;
  href: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: 'code' | 'palette' | 'server' | 'sparkles' | 'layers';
  variant: 'light' | 'dark';
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent?: boolean;
  description: string;
  technologies: string[];
}

export interface ProjectMediaItem {
  type: 'image' | 'video-mockup';
  url: string;
  caption?: string;
  badge?: string;
}

export interface FeaturedProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  tags: string[];
  gallery?: ProjectMediaItem[];
  confidentialityNote?: string;
  keyHighlights?: string[];
  demoType?: 'analytics' | 'motion-game' | 'sagonatt';
  liveUrl?: string;
  githubUrl?: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  highlightWord: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  educationUrl: string;
}

export interface UIStrings {
  viewWork: string;
  getInTouch: string;
  resume: string;
  downloadResume: string;
  viewGithub: string;
  sendAMessage: string;
  close: string;
  copy: string;
  copied: string;
  sending: string;
  sendMessage: string;
  messageSent: string;
  messageSentDesc: string;
  sendAnother: string;
  sendError: string;
  tryAgain: string;
  yourName: string;
  yourEmail: string;
  yourMessage: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  readyToBuild: string;
  ctaSubtitle: string;
  builtWith: string;
  emailLabel: string;
  technicalArsenalTitle: string;
  technicalArsenalSubtitle: string;
  professionalExperienceTitle: string;
  professionalExperienceSubtitle: string;
  featuredProjectsTitle: string;
  featuredProjectsSubtitle: string;
  projectDeepDive: string;
  techAndTools: string;
  curriculumVitae: string;
  medieinstitutetGrad: string;
  coreProficiencies: string;
  cvNotice: string;
  interactiveSandbox: string;
  motionGameTab: string;
  sagonattTab: string;
}
