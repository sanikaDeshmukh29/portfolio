// Type definitions for the portfolio project

export interface GitHubProject {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  archived: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  technologies: string[];
  responsibilities: string[];
  achievements?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}
