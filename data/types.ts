export type Confidence = "low" | "medium" | "high";
export type ReviewTier = "operational" | "material_judgment";

export interface StatementEffect {
  profit: number | null;
  cash: number | null;
  assets: number | null;
  liabilities: number | null;
  equity: number | null;
}

export interface Decision {
  id: string;
  category: string;
  reviewTier: ReviewTier;
  question: string;
  answer: string;
  evidence: string[];
  confidence: Confidence;
  aiProposal?: string;
  independentChallenge?: string;
  studentReasoning?: string;
  statementEffect?: StatementEffect;
  changedFromAI?: boolean;
  agentsDisagreed?: boolean;
}

export interface EvidenceItem {
  id: string;
  file: string;
  kind: string;
  reliability: "strong" | "medium" | "weak";
  rank: number;
  summary: string;
  contradicts?: string;
}

export interface ScheduleLine {
  label: string;
  value: number | null;
  note?: string;
  emphasis?: boolean;
}

export interface Schedule {
  id: string;
  title: string;
  lines: ScheduleLine[];
  proof: string;
}

export interface StatementLine {
  label: string;
  value: number;
  level?: "item" | "subtotal" | "total";
  note?: string;
}

export interface Reconciliation {
  id: string;
  check: string;
  left: string;
  leftValue: number;
  right: string;
  rightValue: number;
  passes: boolean;
  detail: string;
}

export interface Uncertainty {
  id: string;
  topic: string;
  description: string;
  basisChosen: string;
  low: number;
  best: number;
  high: number;
  profitEffectLow: number;
  profitEffectHigh: number;
  resolvedBy: string;
  relatedDecisions: string[];
}
