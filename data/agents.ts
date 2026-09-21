export interface AgentFigure {
  metric: string;
  agent1: string;
  agent2: string;
  certified: string;
  agreed: boolean;
}

export const agentProtocol = {
  method:
    "Two AI analyses were run independently. Agent 1 extracted the evidence and proposed treatments. Agent 2 was " +
    "given the original evidence files only - not Agent 1's conclusions, not its workings and not its numbers - and " +
    "was asked to perform its own reconstruction from scratch. It was never asked to critique Agent 1. The two " +
    "results were compared only after both were complete, and the final certification is mine.",
  agent1Scope:
    "Full evidence extraction, opening balance derivation, seven supporting schedules, three statements, eight " +
    "reconciliations and a first pass at all 100 decisions.",
  agent2Scope:
    "Independent reconstruction from the twelve original case files, with a required register of every evidential " +
    "conflict and a quantified alternative for each.",
  convergence:
    "The two analyses agree on every certified figure in the three statements: revenue 960,000, net profit 72,000, " +
    "closing cash 60,000, total assets 540,000, total liabilities 408,000, closing equity 132,000 and opening equity " +
    "170,000. Both independently derived the two opening balances that appear nowhere in the data room - trade " +
    "payables of 45,000 and interest payable of nil - and both resolved the inventory conflict in favour of the " +
    "physical count. That convergence from separate starting points is the strongest evidence that the reconstruction " +
    "is reproducible, which is the standard the assignment sets.",
};

export const agentComparison: AgentFigure[] = [
  { metric: "Revenue", agent1: "960,000", agent2: "960,000", certified: "960,000", agreed: true },
  { metric: "Cost of sales (presentation)", agent1: "476,000", agent2: "508,000", certified: "476,000", agreed: false },
  { metric: "Gross profit / margin", agent1: "484,000 / 50.4%", agent2: "452,000 / 47.1%", certified: "484,000 / 50.4%", agreed: false },
  { metric: "Total operating expenses", agent1: "400,000", agent2: "368,000", certified: "400,000", agreed: false },
  { metric: "Operating profit", agent1: "84,000", agent2: "84,000", certified: "84,000", agreed: true },
  { metric: "Net profit", agent1: "72,000", agent2: "72,000", certified: "72,000", agreed: true },
  { metric: "Closing cash", agent1: "60,000", agent2: "60,000", certified: "60,000", agreed: true },
  { metric: "Net receivables", agent1: "168,000", agent2: "168,000", certified: "168,000", agreed: true },
  { metric: "Closing inventory", agent1: "121,000", agent2: "121,000", certified: "121,000", agreed: true },
  { metric: "Materials consumed", agent1: "396,000", agent2: "396,000", certified: "396,000", agreed: true },
  { metric: "PPE net book value", agent1: "191,000", agent2: "191,000", certified: "191,000", agreed: true },
  { metric: "Total assets", agent1: "540,000", agent2: "540,000", certified: "540,000", agreed: true },
  { metric: "Total liabilities", agent1: "408,000", agent2: "408,000", certified: "408,000", agreed: true },
  { metric: "Closing equity", agent1: "132,000", agent2: "132,000", certified: "132,000", agreed: true },
  { metric: "Opening equity (derived)", agent1: "170,000", agent2: "170,000", certified: "170,000", agreed: true },
  { metric: "Opening trade payables (derived)", agent1: "45,000", agent2: "45,000", certified: "45,000", agreed: true },
  { metric: "Owner distributions", agent1: "110,000", agent2: "110,000", certified: "110,000", agreed: true },
  { metric: "Operating cash flow", agent1: "139,000", agent2: "139,000", certified: "139,000", agreed: true },
  { metric: "Loan presentation", agent1: "not split", agent2: "non-current", certified: "non-current", agreed: false },
];

export interface AgentDisagreement {
  id: string;
  topic: string;
  agent1Position: string;
  agent2Position: string;
  resolution: string;
  profitEffect: string;
  relatedDecisions: string[];
}

export const agentDisagreements: AgentDisagreement[] = [
  {
    id: "X1",
    topic: "Where the inventory write-down and the machine repair sit in the P&L",
    agent1Position:
      "Keep the 22,000 damaged-stock write-down and the 10,000 emergency machine repair below gross profit as " +
      "separately identified charges. Cost of sales 476,000, gross margin 50.4 per cent.",
    agent2Position:
      "Include both in cost of sales, since the write-down is an inventory cost and the repair maintains production " +
      "equipment. Cost of sales 508,000, gross margin 47.1 per cent.",
    resolution:
      "Certified Agent 1's presentation. The board is deciding whether to continue trading, so gross margin has to " +
      "show what it recurringly costs to deliver a sale. A flood under a leaking pipe and an emergency breakdown are " +
      "abnormal and are more useful shown separately. Agent 2's presentation is equally acceptable under normal " +
      "reporting practice and both margins are disclosed here so a reader can use whichever they prefer.",
    profitEffect: "None. Both presentations give operating profit of 84,000 and net profit of 72,000.",
    relatedDecisions: ["D045", "D048", "D049", "D058", "D072"],
  },
  {
    id: "X2",
    topic: "Whether the bank loan is current or non-current",
    agent1Position: "Did not split the balance sheet between current and non-current.",
    agent2Position:
      "Present the 131,000 loan as non-current, while flagging that no repayment schedule was supplied and that if " +
      "the whole balance were current, working capital swings from a surplus of 72,000 to a deficit of 59,000.",
    resolution:
      "Adopted Agent 2's presentation and its warning. The split is unevidenced, so the balance sheet shows the loan " +
      "as non-current and the working-capital note states both outcomes. Obtaining the repayment schedule from the " +
      "bank is an open information request.",
    profitEffect: "None. Total liabilities, net assets and profit are unchanged either way.",
    relatedDecisions: ["D085", "D094"],
  },
  {
    id: "X3",
    topic: "Whether the R-17 loss is shown as a write-off or an allowance",
    agent1Position: "Direct write-off of 18,000, leaving net receivables of 168,000 on the face of the balance sheet.",
    agent2Position:
      "Show gross receivables of 186,000 with an allowance of 18,000, so that both the gross exposure and the " +
      "impairment remain visible.",
    resolution:
      "Adopted Agent 2's presentation on the face of the balance sheet, because keeping the gross figure visible is " +
      "more useful to a board that also has to worry about the 88,000 of aged balances behind it. The decision itself " +
      "remains a specific write-off, not a general allowance.",
    profitEffect: "None. Net receivables are 168,000 on both presentations.",
    relatedDecisions: ["D057", "D071", "D076"],
  },
];

export const openInformationRequests = [
  "Owner card transaction detail for the 40,000 of unvouched spending (D047).",
  "Loan repayment schedule, to split the 131,000 between current and non-current (D085).",
  "Fixed asset register with useful lives and in-service dates, to support the 24,000 depreciation charge (D074).",
  "Direct balance confirmations from Freedom Festivals (58,000) and Phoenix HR (30,000) (D071).",
  "Recount of the warehouse against the purchase ledger, to trace the 9,000 inventory variance (D075).",
  "Confirmation from the insurance broker whether any policy exists, since nothing appears in the bank (D034, D078).",
];
