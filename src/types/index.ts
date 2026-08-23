export interface NavLink {
  label: string;
  href: string;
}

export interface PricingLineItem {
  label: string;
  price: string;
}

export interface ScopeBlock {
  heading: string;
  body: string;
  items: string[];
  isLimit?: boolean;
}

export interface ThemeRow {
  name: string;
  note: string;
  chips: string[];
}

export interface DiffChange {
  op: "add" | "mod";
  label: string;
  path: string;
}

export interface DiffTier {
  id: string;
  name: string;
  description: string;
  changes: DiffChange[];
  price: string;
  time: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface TimeRow {
  label: string;
  time: string;
}

export interface CaseStudy {
  href: string;
  imgLabel: string;
  theme: string;
  title: string;
  body: string;
  outcomeLabel: string;
}

export interface FaqItem {
  question: string;
  answer: string; // may include inline <a> markup, rendered via dangerouslySetInnerHTML-free helper
  open?: boolean;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}
