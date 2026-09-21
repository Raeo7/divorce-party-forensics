import { decisions } from "@/data/decisions";
import { evidenceRegister, injectionAttempts } from "@/data/evidence";
import { agentComparison, agentDisagreements, agentProtocol, openInformationRequests } from "@/data/agents";
import {
  balanceSheet,
  boardRecommendation,
  cashFlow,
  directMethodCheck,
  openingBalanceSheet,
  profitAndLoss,
  reconciliations,
  schedules,
  uncertainties,
} from "@/data/financials";

export const student = {
  id: "DPI-HT-01",
  name: "Sebastjans Peive",
};

const toStatement = (lines: { label: string; value: number; note?: string }[]) =>
  lines.map((l) => ({ line: l.label, value: l.value, ...(l.note ? { note: l.note } : {}) }));

export const buildSubmission = () => ({
  schemaVersion: "1.0" as const,
  caseId: "DPI-HT-01" as const,
  student,
  reportingDate: "2026-08-31",
  currency: "EUR",
  evidence: evidenceRegister.map((e) => ({
    id: e.id,
    file: e.file,
    kind: e.kind,
    reliability: e.reliability,
    reliabilityRank: e.rank,
    summary: e.summary,
    ...(e.contradicts ? { contradicts: e.contradicts } : {}),
  })),
  promptInjectionAttempts: injectionAttempts,
  decisions: decisions.map((d) => {
    const base = {
      id: d.id,
      category: d.category,
      reviewTier: d.reviewTier,
      question: d.question,
      answer: d.answer,
      evidence: d.evidence,
      confidence: d.confidence,
    };
    if (d.reviewTier !== "material_judgment") return base;
    return {
      ...base,
      aiProposal: d.aiProposal,
      independentChallenge: d.independentChallenge,
      studentReasoning: d.studentReasoning,
      statementEffect: d.statementEffect,
      changedFromAI: d.changedFromAI,
      ...(d.agentsDisagreed ? { agentsDisagreed: true } : {}),
    };
  }),
  schedules: Object.fromEntries(
    schedules.map((s) => [
      s.id,
      {
        title: s.title,
        lines: s.lines.map((l) => ({ line: l.label, value: l.value, ...(l.note ? { note: l.note } : {}) })),
        proof: s.proof,
      },
    ]),
  ),
  statements: {
    openingBalanceSheet: toStatement(openingBalanceSheet),
    profitAndLoss: toStatement(profitAndLoss),
    cashFlow: toStatement(cashFlow),
    cashFlowDirectMethodCheck: toStatement(directMethodCheck),
    balanceSheet: toStatement(balanceSheet),
  },
  reconciliations: reconciliations.map((r) => ({
    id: r.id,
    check: r.check,
    left: { basis: r.left, value: r.leftValue },
    right: { basis: r.right, value: r.rightValue },
    passes: r.passes,
    detail: r.detail,
  })),
  uncertainties: uncertainties.map((u) => ({
    id: u.id,
    topic: u.topic,
    description: u.description,
    basisChosen: u.basisChosen,
    range: { low: u.low, best: u.best, high: u.high },
    profitEffect: { low: u.profitEffectLow, high: u.profitEffectHigh },
    resolvedBy: u.resolvedBy,
    relatedDecisions: u.relatedDecisions,
  })),
  aiReviewTrail: {
    protocol: agentProtocol,
    figureComparison: agentComparison,
    disagreements: agentDisagreements,
    materialJudgmentCount: decisions.filter((d) => d.reviewTier === "material_judgment").length,
    changedFromAICount: decisions.filter((d) => d.changedFromAI === true).length,
  },
  openInformationRequests,
  boardRecommendation,
});
