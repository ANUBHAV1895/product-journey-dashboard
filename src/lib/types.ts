export type EntryCategory =
  | "case-study"
  | "prd"
  | "teardown"
  | "experiment"
  | "learning"
  | "certification";

export const CATEGORY_LABELS: Record<EntryCategory, string> = {
  "case-study": "Case Studies",
  prd: "PRDs",
  teardown: "Product Teardowns",
  experiment: "Experiments / Projects",
  learning: "Learnings / Notes",
  certification: "Certifications / Courses",
};

export const CATEGORY_SINGULAR: Record<EntryCategory, string> = {
  "case-study": "Case Study",
  prd: "PRD",
  teardown: "Product Teardown",
  experiment: "Experiment / Project",
  learning: "Learning / Note",
  certification: "Certification / Course",
};

export type Tag =
  | "PRD"
  | "Research"
  | "UI/UX"
  | "Metrics"
  | "A/B Testing"
  | "Strategy"
  | "Growth"
  | "Analytics"
  | "User Research"
  | "Roadmap";

export const ALL_TAGS: Tag[] = [
  "PRD",
  "Research",
  "UI/UX",
  "Metrics",
  "A/B Testing",
  "Strategy",
  "Growth",
  "Analytics",
  "User Research",
  "Roadmap",
];

export interface EntryLink {
  label: string;
  url: string;
}

export interface PortfolioEntry {
  id: string;
  category: EntryCategory;
  title: string;
  description: string;
  tags: Tag[];
  links: EntryLink[];
  files: string[]; // file names (stored as data URLs in localStorage)
  date: string;
  status: "in-progress" | "completed" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  role: string;
  bio: string;
}
