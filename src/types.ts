export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Network Security' | 'Defensive Security' | 'AI / ML';
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
  description: string;
  bullets: string[];
  architecture: string[];
  codeSnippetId?: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Intermediate' | 'Proficient' | 'Learning';
    description: string;
    tag?: string;
  }[];
}

export interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  filename: string;
  description: string;
  code: string;
  sampleOutput: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  contentMarkdown: string;
  terminalCommand: string;
  tags: string[];
}

export interface GitHubUserStats {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export type ThemeMode = 'dark' | 'light';
