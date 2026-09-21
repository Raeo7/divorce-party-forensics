import type {
  Reconciliation,
  Schedule,
  StatementLine,
  Uncertainty,
} from "@/data/types";

export const reportingDate = "31 August 2026";
export const currency = "EUR";

export const openingBalanceSheet: StatementLine[] = [
  { label: "Cash at bank", value: 80000, note: "Bank export opening line" },
  { label: "Trade receivables", value: 35000, note: "Collected 10 Jan as RCPT-001" },
  { label: "Inventory", value: 80000, note: "Stated in the warehouse file" },
  { label: "PPE at cost", value: 180000 },
  { label: "Accumulated depreciation", value: -45000 },
  { label: "Total assets", value: 330000, level: "total" },
  { label: "Trade payables", value: 45000, note: "Derived from the supplier roll-forward" },
  { label: "Accrued payroll", value: 15000, note: "Stated in the payroll file" },
  { label: "Bank loan", value: 100000, note: "Signed bank confirmation" },
  { label: "Total liabilities", value: 160000, level: "total" },
  { label: "Opening equity", value: 170000, level: "total" },
];

export const schedules: Schedule[] = [
  {
    id: "S1",
    title: "Revenue and receivables",
    lines: [
      { label: "INV-26012 NorthStar Events, accepted 12 Feb", value: 180000 },
      { label: "INV-26031 Freedom Festivals, accepted 18 Mar", value: 200000 },
      { label: "INV-26047 Phoenix HR event, completed 29 Apr", value: 100000 },
      { label: "INV-26063 Liberty Hotels, delivered 20 Jun", value: 120000 },
      { label: "WEB-FSB Finally Single web sales, Jan to Aug", value: 270000 },
      { label: "WEB-NCB Never Call Back web sales, Jan to Aug", value: 90000 },
      { label: "Total revenue recognised", value: 960000, emphasis: true },
      {
        label: "NB-SEP deposit, event 15 Sep - excluded",
        value: 0,
        note: "60,000 held as a contract liability",
      },
      {
        label: "FF-SEP deposit, event 24 Sep - excluded",
        value: 0,
        note: "30,000 held as a contract liability",
      },
      {
        label: "Bank advance 1 Mar - excluded",
        value: 0,
        note: "50,000 is financing, not income",
      },
      { label: "Opening receivables", value: 35000 },
      { label: "Add credit revenue", value: 960000 },
      { label: "Less collections in period", value: -809000 },
      { label: "Gross closing receivables", value: 186000, emphasis: true },
      { label: "Less R-17 specific write-off", value: -18000 },
      { label: "Net closing receivables", value: 168000, emphasis: true },
    ],
    proof:
      "Gross 186,000 is confirmed component by component: Freedom 58,000 + Phoenix 30,000 + Liberty 25,000 + platform Finally Single 20,000 + platform Never Call Back 53,000. Collections of 809,000 are the sum of the ten customer credits in the bank export excluding the two September deposits.",
  },
  {
    id: "S2",
    title: "Inventory and cost of goods sold",
    lines: [
      { label: "Opening inventory", value: 80000 },
      { label: "Purchases of materials", value: 459000, note: "Third-party invoices, all received before 31 Aug" },
      { label: "Materials available", value: 539000, emphasis: true },
      { label: "Less closing inventory at count", value: -143000, note: "79,000 + 42,000 + 22,000 damaged" },
      { label: "Cost of goods sold before write-off", value: 396000, emphasis: true },
      { label: "Damaged basement stock written off", value: -22000 },
      { label: "Closing inventory carried", value: 121000, emphasis: true },
      {
        label: "Memo: consumption stated by operations",
        value: 405000,
        note: "9,000 above the count-derived figure - unreconciled variance, disclosed",
      },
    ],
    proof:
      "Closing inventory equals opening + purchases - COGS - write-offs: 80,000 + 459,000 - 396,000 - 22,000 = 121,000. The 121,000 equals the two counted good-stock lines (79,000 + 42,000) exactly.",
  },
  {
    id: "S3",
    title: "Payroll",
    lines: [
      { label: "Event delivery staff - direct cost of services", value: 80000, note: "Management tagged this Admin" },
      { label: "Sales and partnerships - selling expense", value: 72000, note: "Management tagged this COGS" },
      { label: "Office and finance - administrative expense", value: 96000 },
      { label: "Total payroll expense", value: 248000, emphasis: true },
      { label: "Opening accrued payroll", value: 15000 },
      { label: "Less payroll cash paid", value: -231000, note: "Agrees to the bank line exactly" },
      { label: "Closing accrued payroll", value: 32000, emphasis: true },
      {
        label: "Founder 'bonus' reclassified out of payroll",
        value: -110000,
        note: "Same cash as villa 70,000 + owner card 40,000; treated as a distribution",
      },
    ],
    proof:
      "15,000 + 248,000 - 231,000 = 32,000. Cash of 231,000 ties to the single PAYROLL line in the bank export, which proves the founder 110,000 is not an additional outflow.",
  },
  {
    id: "S4",
    title: "Operating expenses",
    lines: [
      { label: "Rent", value: 48000 },
      { label: "Marketing - Meta, TikTok and influencers", value: 55000 },
      { label: "Software subscriptions", value: 16000 },
      { label: "Utilities", value: 12000 },
      { label: "Machine repair and calibration", value: 10000, note: "Expensed, not capitalised" },
      { label: "Depreciation", value: 24000 },
      { label: "Bad debt write-off", value: 18000 },
      { label: "Damaged inventory write-off", value: 22000 },
      { label: "Disposal provision", value: 2000 },
      { label: "Legal provision", value: 25000 },
      { label: "Sales and partnerships payroll", value: 72000 },
      { label: "Office and finance payroll", value: 96000 },
      { label: "Total operating expenses", value: 400000, emphasis: true },
      { label: "Insurance", value: 0, note: "No insurance payment appears in the bank export or any schedule" },
    ],
    proof:
      "The five cash overhead lines (48 + 55 + 16 + 12 + 10 = 141,000) agree line for line with the bank export. The remaining 259,000 are non-cash charges and accruals supported by the independent depreciation schedule, the liquidator notice, the stock assessment and counsel's opinion.",
  },
  {
    id: "S5",
    title: "PPE and depreciation",
    lines: [
      { label: "Opening cost", value: 180000 },
      { label: "Pack-O-Matic 9000 packaging machine, in use 10 May", value: 60000, note: "Capitalised" },
      { label: "Regret Photo Booth, in use 10 May", value: 20000, note: "Capitalised" },
      { label: "Closing cost", value: 260000, emphasis: true },
      { label: "Opening accumulated depreciation", value: 45000 },
      { label: "Period depreciation", value: 24000 },
      { label: "Closing accumulated depreciation", value: 69000, emphasis: true },
      { label: "Closing net book value", value: 191000, emphasis: true },
      {
        label: "Belt replacement and calibration - expensed",
        value: 10000,
        note: "Restored normal output only; no added capacity or life",
      },
    ],
    proof:
      "180,000 + 80,000 additions = 260,000 cost, which agrees to the two CAPEX lines in the bank export. 45,000 + 24,000 = 69,000, giving NBV of 191,000.",
  },
  {
    id: "S6",
    title: "Debt and interest",
    lines: [
      { label: "Opening bank loan", value: 100000 },
      { label: "New advance 1 Mar", value: 50000 },
      { label: "Principal repaid", value: -19000 },
      { label: "Closing loan principal", value: 131000, emphasis: true, note: "Agrees to bank confirmation" },
      { label: "Opening interest payable", value: 0 },
      { label: "Interest expense for the period", value: 12000 },
      { label: "Interest paid", value: -10000 },
      { label: "Closing interest payable", value: 2000, emphasis: true, note: "Agrees to bank confirmation" },
    ],
    proof:
      "100,000 + 50,000 - 19,000 = 131,000 and 0 + 12,000 - 10,000 = 2,000. Both closing figures are independently confirmed by the bank in the post-takeover evidence pack.",
  },
  {
    id: "S7",
    title: "Equity and distributions",
    lines: [
      { label: "Opening equity", value: 170000, note: "Derived: opening assets 330,000 less liabilities 160,000" },
      { label: "Net profit for the period", value: 72000 },
      { label: "Owner villa reservation", value: -70000, note: "Personal name, no customer meeting" },
      { label: "Other owner card spending", value: -40000, note: "No business purpose evidenced" },
      { label: "Closing equity", value: 132000, emphasis: true },
    ],
    proof:
      "170,000 + 72,000 - 110,000 = 132,000, which equals total assets 540,000 less total liabilities 408,000 computed independently.",
  },
];

export const profitAndLoss: StatementLine[] = [
  { label: "Revenue", value: 960000 },
  { label: "Cost of materials", value: -396000 },
  { label: "Direct event delivery payroll", value: -80000 },
  { label: "Gross profit", value: 484000, level: "subtotal" },
  { label: "Sales and partnerships payroll", value: -72000 },
  { label: "Office and finance payroll", value: -96000 },
  { label: "Rent", value: -48000 },
  { label: "Marketing", value: -55000 },
  { label: "Software", value: -16000 },
  { label: "Utilities", value: -12000 },
  { label: "Machine repair and calibration", value: -10000 },
  { label: "Depreciation", value: -24000 },
  { label: "Bad debt write-off", value: -18000 },
  { label: "Damaged inventory write-off", value: -22000 },
  { label: "Disposal provision", value: -2000 },
  { label: "Legal provision", value: -25000 },
  { label: "Operating profit", value: 84000, level: "subtotal" },
  { label: "Interest expense", value: -12000 },
  { label: "Net profit for the period", value: 72000, level: "total" },
];

export const cashFlow: StatementLine[] = [
  { label: "Net profit for the period", value: 72000 },
  { label: "Depreciation", value: 24000, note: "Non-cash" },
  { label: "Increase in trade receivables", value: -133000, note: "35,000 to 168,000 net of the write-off" },
  { label: "Increase in inventory", value: -41000, note: "80,000 to 121,000 net of the write-off" },
  { label: "Increase in trade payables", value: 81000 },
  { label: "Increase in accrued payroll", value: 17000 },
  { label: "Increase in interest payable", value: 2000 },
  { label: "Increase in contract liabilities", value: 90000, note: "The two September deposits" },
  { label: "Increase in provisions", value: 27000, note: "Legal 25,000 and disposal 2,000" },
  { label: "Net cash from operating activities", value: 139000, level: "subtotal" },
  { label: "Purchase of packaging machine", value: -60000 },
  { label: "Purchase of photo booth", value: -20000 },
  { label: "Net cash used in investing activities", value: -80000, level: "subtotal" },
  { label: "New bank advance", value: 50000 },
  { label: "Loan principal repaid", value: -19000 },
  { label: "Distributions to owner", value: -110000, note: "Villa 70,000 and card 40,000" },
  { label: "Net cash used in financing activities", value: -79000, level: "subtotal" },
  { label: "Net decrease in cash", value: -20000, level: "subtotal" },
  { label: "Cash at 1 January 2026", value: 80000 },
  { label: "Cash at 31 August 2026", value: 60000, level: "total" },
];

export const directMethodCheck: StatementLine[] = [
  { label: "Collections from customers", value: 809000 },
  { label: "Deposits received for September events", value: 90000 },
  { label: "Payments to material suppliers", value: -378000 },
  { label: "Payroll paid", value: -231000 },
  { label: "Rent, marketing, software, utilities and repair paid", value: -141000 },
  { label: "Interest paid", value: -10000 },
  { label: "Net cash from operating activities", value: 139000, level: "total" },
];

export const balanceSheet: StatementLine[] = [
  { label: "Property, plant and equipment at cost", value: 260000 },
  { label: "Accumulated depreciation", value: -69000 },
  { label: "Non-current assets", value: 191000, level: "subtotal" },
  { label: "Inventory", value: 121000, note: "143,000 counted less 22,000 unsaleable" },
  { label: "Trade receivables, gross", value: 186000 },
  { label: "Allowance for impairment", value: -18000, note: "R-17 liquidation" },
  { label: "Cash at bank", value: 60000, note: "Bank confirmation" },
  { label: "Current assets", value: 349000, level: "subtotal" },
  { label: "Total assets", value: 540000, level: "total" },
  { label: "Trade payables", value: 126000 },
  { label: "Accrued payroll", value: 32000 },
  { label: "Contract liabilities", value: 90000, note: "September events" },
  { label: "Provisions", value: 27000, note: "Legal 25,000 and disposal 2,000" },
  { label: "Interest payable", value: 2000 },
  { label: "Current liabilities", value: 277000, level: "subtotal" },
  { label: "Bank loan", value: 131000, note: "Shown non-current; no repayment schedule was supplied" },
  { label: "Total liabilities", value: 408000, level: "subtotal" },
  { label: "Equity", value: 132000, level: "subtotal" },
  { label: "Total liabilities and equity", value: 540000, level: "total" },
];

export const reconciliations: Reconciliation[] = [
  {
    id: "R1",
    check: "The balance sheet balances",
    left: "Total assets",
    leftValue: 540000,
    right: "Total liabilities and equity",
    rightValue: 540000,
    passes: true,
    detail:
      "60,000 + 168,000 + 121,000 + 191,000 = 540,000 against 408,000 of liabilities plus 132,000 of equity.",
  },
  {
    id: "R2",
    check: "Closing cash agrees with the bank and with the cash-flow roll-forward",
    left: "Bank export and bank confirmation",
    leftValue: 60000,
    right: "Opening 80,000 plus net movement (20,000)",
    rightValue: 60000,
    passes: true,
    detail:
      "Operating 139,000, investing (80,000), financing (79,000). The direct-method operating check independently produces the same 139,000.",
  },
  {
    id: "R3",
    check: "Revenue and receivables reconcile",
    left: "Opening 35,000 + revenue 960,000 - collections 809,000 - write-off 18,000",
    leftValue: 168000,
    right: "Net closing receivables",
    rightValue: 168000,
    passes: true,
    detail:
      "Gross 186,000 is also proved by the five open components: 58,000 + 30,000 + 25,000 + 20,000 + 53,000.",
  },
  {
    id: "R4",
    check: "Inventory and COGS reconcile",
    left: "Opening 80,000 + purchases 459,000 - COGS 396,000 - write-off 22,000",
    leftValue: 121000,
    right: "Closing inventory carried",
    rightValue: 121000,
    passes: true,
    detail:
      "121,000 equals the two counted good-stock lines. The 9,000 difference against the stated consumption of 405,000 is disclosed as uncertainty U1, not buried.",
  },
  {
    id: "R5",
    check: "PPE cost and accumulated depreciation reconcile",
    left: "Opening cost 180,000 + additions 80,000",
    leftValue: 260000,
    right: "Closing cost, with accumulated depreciation of 45,000 + 24,000 = 69,000",
    rightValue: 260000,
    passes: true,
    detail: "Net book value 191,000. Additions agree to the two CAPEX lines in the bank export.",
  },
  {
    id: "R6",
    check: "Debt principal, interest expense, interest paid and interest payable reconcile",
    left: "100,000 + 50,000 - 19,000 principal; 0 + 12,000 - 10,000 interest",
    leftValue: 131000,
    right: "Bank-confirmed principal 131,000 with interest payable 2,000",
    rightValue: 131000,
    passes: true,
    detail: "Both closing balances are confirmed in writing by the bank after the takeover.",
  },
  {
    id: "R7",
    check: "Opening equity plus profit minus distributions equals closing equity",
    left: "170,000 + 72,000 - 110,000",
    leftValue: 132000,
    right: "Closing equity from the balance sheet",
    rightValue: 132000,
    passes: true,
    detail:
      "Opening equity of 170,000 was derived independently from opening assets and liabilities, so this is a genuine cross-check rather than a restatement.",
  },
  {
    id: "R8",
    check: "Supplier payables reconcile",
    left: "Opening 45,000 + purchases 459,000 - payments 378,000",
    leftValue: 126000,
    right: "Independently confirmed supplier balances",
    rightValue: 126000,
    passes: true,
    detail:
      "25,000 + 28,000 + 14,000 + 59,000 = 126,000. The roll-forward is what establishes the opening payable of 45,000.",
  },
];

export const uncertainties: Uncertainty[] = [
  {
    id: "U1",
    topic: "Inventory count against stated consumption",
    description:
      "The physical count at 31 August totals 143,000 but opening inventory plus purchases less the stated consumption of 405,000 implies 134,000. The two records differ by 9,000 and the file itself states the inventory system was not updated.",
    basisChosen:
      "Anchored on the physical count, because it is a warehouse record taken at the reporting date and outranks an internal consumption figure from an admittedly stale system.",
    low: 112000,
    best: 121000,
    high: 121000,
    profitEffectLow: -9000,
    profitEffectHigh: 0,
    resolvedBy:
      "Recount by item with the purchase ledger open, and trace the 9,000 to either an understated purchase or an overstated issue.",
    relatedDecisions: ["D048", "D075", "D086"],
  },
  {
    id: "U2",
    topic: "Legal provision measurement",
    description:
      "Counsel states the employee claim is probable with a best estimate of 25,000 within a reasonable range of 20,000 to 30,000. No payment had been made by 31 August.",
    basisChosen: "Best estimate of 25,000, the mid-point and counsel's own stated expectation.",
    low: 20000,
    best: 25000,
    high: 30000,
    profitEffectLow: 5000,
    profitEffectHigh: -5000,
    resolvedBy: "Settlement negotiation or a court filing date.",
    relatedDecisions: ["D059", "D073"],
  },
  {
    id: "U3",
    topic: "Recoverability of aged receivables",
    description:
      "Freedom Festivals has owed 58,000 since March and Phoenix HR 30,000 since April. Both accepted delivery, and there is no evidence of dispute or distress, so no allowance is booked. There is also no ageing history on which to build a general allowance.",
    basisChosen:
      "Specific write-off of the liquidated customer only. No general allowance, because a percentage would be invented rather than evidenced.",
    low: 0,
    best: 0,
    high: 88000,
    profitEffectLow: 0,
    profitEffectHigh: -88000,
    resolvedBy: "Direct balance confirmations from Freedom Festivals and Phoenix HR, and a collection attempt.",
    relatedDecisions: ["D057", "D071", "D076"],
  },
  {
    id: "U4",
    topic: "Depreciation basis",
    description:
      "Management booked no depreciation. The only figure available is an independent schedule estimate of 24,000 for the period. No asset-by-asset useful lives or residual values exist in the data room.",
    basisChosen: "The independent 24,000 estimate, as the sole external figure available.",
    low: 18000,
    best: 24000,
    high: 32000,
    profitEffectLow: 6000,
    profitEffectHigh: -8000,
    resolvedBy: "Build a fixed asset register with lives and in-service dates for all five asset groups.",
    relatedDecisions: ["D056", "D074", "D083"],
  },
  {
    id: "U5",
    topic: "Disposal cost of the damaged stock",
    description:
      "The independent quote to remove the water-damaged stock is 2,000 and is not included in the 22,000 carrying value. Whether it is an obligation at 31 August or a September cost is a judgment.",
    basisChosen:
      "Provided at 31 August. The damage occurred before the reporting date and the goods must be removed, so net realisable value is negative and the shortfall is a liability.",
    low: 0,
    best: 2000,
    high: 2000,
    profitEffectLow: 2000,
    profitEffectHigh: 0,
    resolvedBy: "Place the disposal order and book the actual invoice.",
    relatedDecisions: ["D058", "D072"],
  },
  {
    id: "U6",
    topic: "Recoverability of the owner distributions",
    description:
      "110,000 left the company for the founder's personal benefit. It is treated as a distribution. Whether any of it is recoverable as a receivable from the former owner is a legal question, not an accounting one, at this date.",
    basisChosen: "Distribution in full. No recovery asset is recognised without a legal claim or an admission.",
    low: 0,
    best: 0,
    high: 110000,
    profitEffectLow: 0,
    profitEffectHigh: 0,
    resolvedBy: "Legal review of whether the payments are recoverable from the founder.",
    relatedDecisions: ["D046", "D047", "D088"],
  },
];

export const boardRecommendation = {
  headline: "The business is operationally viable. Its reported position was not.",
  correctedProfit: 72000,
  claimedProfit: 312000,
  profitOverstatement: 240000,
  correctedCash: 60000,
  claimedCash: 186000,
  cashOverstatement: 126000,
  workingCapital: {
    currentAssets: 349000,
    currentLiabilities: 277000,
    netWorkingCapital: 72000,
    note:
      "Current assets of 349,000 (cash 60,000 + net receivables 168,000 + inventory 121,000) against current liabilities of 277,000, with the 131,000 loan shown as non-current. Liquidity is thin: 60,000 of cash against 126,000 owed to suppliers whose balances are already confirmed, and 90,000 of deposits for events that still have to be bought and delivered in September. No repayment schedule for the loan was supplied. If the whole 131,000 were in fact current, the 72,000 surplus becomes a deficit of 59,000, so obtaining that schedule is an urgent information request.",
  },
  solvencyWarning:
    "The 90,000 of September deposits has already been spent. Those two events must be delivered out of a 60,000 cash balance while 126,000 of supplier debt and 32,000 of unpaid payroll fall due. The loan facility is drawn to 131,000 and 19,000 of principal was repaid this period without a schedule. A 13-week cash forecast is not optional.",
  fiveControlActions: [
    "Freeze the owner card and revoke all founder payment authority today. 110,000 left the company on it in eight months with no approval.",
    "Move the 90,000 of September deposits into a separately tracked contract-liability ledger and stop recognising cash receipts as sales.",
    "Start a weekly 13-week cash forecast owned by finance, with supplier terms and the two September events modelled explicitly.",
    "Stop credit sales to customers without a confirmed balance, and obtain direct confirmations for the 88,000 owed by Freedom Festivals and Phoenix HR.",
    "Restore segregation of duties over journal entries and the inventory system. The finance manager replaced formulas with hard values and the stock system was never updated.",
  ],
  continueCoreBusiness: true,
  continuationReasoning:
    "Revenue of 960,000 is real: every euro of it is supported by a signed acceptance, a delivery date or a platform settlement. Gross margin is 484,000, or 50.4 per cent, and operating cash flow was positive at 139,000. The company did not lose money on what it sold. It lost 240,000 of reported profit to bad accounting and 110,000 of cash to the founder. Continue the Finally Single line and the event business, fix the controls, and treat the 312,000 profit claim as unusable for the earn-out.",
  earnOutPosition:
    "Do not use the claimed management profit of 312,000 for any earn-out or valuation calculation. It includes 90,000 of undelivered deposits as sales, 50,000 of borrowing as income, and omits 24,000 of depreciation, 18,000 of bad debt, 22,000 of dead stock, 25,000 of legal provision and the reclassification of 110,000 of owner spending. Certified profit is 72,000.",
};
