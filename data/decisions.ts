import type { Decision } from "@/data/types";

/**
 * Convention for `statementEffect` on material judgments:
 * the figures are the effect of the certified treatment measured against the
 * specific alternative that was rejected (normally management's treatment).
 * A positive profit number means the certified treatment reports more profit
 * than the rejected alternative would have.
 */

const monthlyPayroll = (month: string, id: string): Decision => ({
  id,
  category: "evidence_matching",
  reviewTier: "operational",
  question: `Resolve the source and treatment of ${month} payroll.`,
  answer:
    `${month} payroll is EUR 31,000 of the EUR 248,000 total expense, recognised in the month the staff worked. ` +
    "No month-specific bank line exists: the bank export carries one combined settlement of EUR 231,000 dated 31 August, " +
    "so the payment date carries no information about which month the cost belongs to. The payroll file gives no monthly " +
    "split, and 248,000 divided over the eight months to 31 August is exactly 31,000, which is the only allocation the " +
    "evidence supports. The cost is accrued when worked, not when paid.",
  evidence: ["E07:Payroll totals", "E02:PAYROLL 231,000 dated 2026-08-31"],
  confidence: "medium",
});

export const decisions: Decision[] = [
  // ---------------------------------------------------------------- D001-D040
  {
    id: "D001",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of NorthStar receipt.",
    answer:
      "Bank credit RCPT-NS of EUR 180,000 on 12 February, described 'N STAR EVENTS'. It settles INV-26012 " +
      "(EUR 180,000 of Finally Single Boxes, accepted 12 February) in full. The CRM spells the customer three ways " +
      "('North Star', 'N STAR', NorthStar Events) but the invoice number, the amount and the date all match a single " +
      "contract, so this is one customer and one sale, not three. Treated as collection of a trade receivable arising " +
      "from revenue of 180,000 recognised on acceptance. No balance remains.",
    evidence: ["E02:RCPT-NS", "E04:INV-26012", "E03:C-001"],
    confidence: "high",
  },
  {
    id: "D002",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Freedom receipt 1.",
    answer:
      "Bank credit RCPT-FF of EUR 142,000 on 18 March, described 'FREEDOM FEST 1/2'. It is a part settlement of " +
      "INV-26031 (EUR 200,000 of Never Call Back Boxes, accepted 18 March). The '1/2' in the bank narrative signals a " +
      "second instalment that never arrived. Revenue of 200,000 is recognised on acceptance; EUR 58,000 remains a " +
      "trade receivable at 31 August.",
    evidence: ["E02:RCPT-FF", "E04:INV-26031", "E03:C-002"],
    confidence: "high",
  },
  {
    id: "D003",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Phoenix receipt.",
    answer:
      "Bank credit RCPT-PHX of EUR 70,000 on 29 April, described 'PHOENIX PEOPLE TEAM'. It part settles INV-26047 " +
      "(EUR 100,000 Divorce Victory Party, completed 29 April). Final acceptance is a customer email rather than a " +
      "signed page, but the event was performed and the customer paid 70,000 on the completion date, which corroborates " +
      "acceptance. Revenue 100,000; EUR 30,000 remains receivable.",
    evidence: ["E02:RCPT-PHX", "E04:INV-26047", "E03:C-003"],
    confidence: "high",
  },
  {
    id: "D004",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Liberty receipt.",
    answer:
      "Bank credit RCPT-LIB of EUR 95,000 on 20 June. It part settles INV-26063 (EUR 120,000 mixed order delivered " +
      "20 June). The customer message 'Accepted in full' confirms delivery was accepted without deduction, so the " +
      "unpaid 25,000 is a collection problem, not a revenue problem. Revenue 120,000; EUR 25,000 remains receivable.",
    evidence: ["E02:RCPT-LIB", "E04:INV-26063", "E04:customer acceptance message", "E03:C-004"],
    confidence: "high",
  },
  {
    id: "D005",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Opening receivable receipt.",
    answer:
      "Bank credit RCPT-001 of EUR 35,000 on 10 January, described 'Old customer AR settlement'. It relates to a sale " +
      "made before 1 January, so it is not revenue of this period. It is the collection of the opening trade receivable " +
      "and it is what establishes opening receivables of EUR 35,000, a balance stated nowhere else in the data room.",
    evidence: ["E02:RCPT-001"],
    confidence: "high",
  },
  {
    id: "D006",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Finally Single web receipts.",
    answer:
      "Bank credit PLAT-FSB of EUR 250,000 on 1 August, 'STRIPE SETTLEMENT FINALLY SINGLE'. The CRM line WEB-FSB shows " +
      "invoiced value of EUR 270,000 against cash matched of EUR 250,000 with EUR 20,000 flagged as a platform " +
      "receivable. Revenue of 270,000 is recognised across January to August as boxes were despatched; EUR 20,000 is a " +
      "receivable from the payment platform at 31 August. The single August settlement date is a payout cycle, not the " +
      "date of sale.",
    evidence: ["E02:PLAT-FSB", "E03:WEB-FSB"],
    confidence: "medium",
  },
  {
    id: "D007",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Never Call Back web receipts.",
    answer:
      "Bank credit PLAT-NCB of EUR 37,000 on 15 August. CRM line WEB-NCB shows EUR 90,000 invoiced, EUR 37,000 matched " +
      "and EUR 53,000 gross open, of which the R-17 customer accounts for EUR 18,000. Revenue of 90,000 is recognised " +
      "across the period; gross receivable 53,000, reduced to 35,000 after the R-17 write-off.",
    evidence: ["E02:PLAT-NCB", "E03:WEB-NCB", "E11:R-17 liquidator notice"],
    confidence: "medium",
  },
  {
    id: "D008",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of New Beginnings deposit.",
    answer:
      "Bank credit DEP-NB of EUR 60,000 on 28 August, 'NEW BEGINNINGS SEPT'. The contract file records delivery on " +
      "15 September 2026 with no goods or service delivered by 31 August. Cash increases; revenue does not. Recorded as " +
      "a contract liability of EUR 60,000.",
    evidence: ["E02:DEP-NB", "E04:NB-SEP", "E03:FUT-01"],
    confidence: "high",
  },
  {
    id: "D009",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Fresh Freedom deposit.",
    answer:
      "Bank credit DEP-FF2 of EUR 30,000 on 29 August, 'FRESH FREEDOM SEPT'. Delivery date 24 September 2026, nothing " +
      "delivered by 31 August. Recorded as a contract liability of EUR 30,000, not revenue.",
    evidence: ["E02:DEP-FF2", "E04:FF-SEP", "E03:FUT-02"],
    confidence: "high",
  },
  {
    id: "D010",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Box supplier payment.",
    answer:
      "Bank debit SUP-BOX of EUR 105,000. BoxWorks invoiced EUR 130,000 with EUR 25,000 unpaid at 31 August, so exactly " +
      "105,000 of this period's purchases was settled. The payment matches to the euro and carries no opening-balance " +
      "element. Operating cash outflow; the goods are in purchases because the goods-received stamps pre-date 31 August.",
    evidence: ["E02:SUP-BOX", "E06:BoxWorks batch"],
    confidence: "high",
  },
  {
    id: "D011",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Glass supplier payment.",
    answer:
      "Bank debit SUP-GLS of EUR 92,000. Glass & Drama Ltd. invoiced EUR 120,000 with EUR 28,000 unpaid, so 92,000 of " +
      "current purchases was settled. Exact match, no opening-balance element. Operating cash outflow.",
    evidence: ["E02:SUP-GLS", "E06:Glass & Drama Ltd."],
    confidence: "high",
  },
  {
    id: "D012",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Print supplier payment.",
    answer:
      "Bank debit SUP-PRT of EUR 81,000. Print Again SIA invoiced EUR 95,000 with EUR 14,000 unpaid, so 81,000 of " +
      "current purchases was settled. Exact match. Operating cash outflow.",
    evidence: ["E02:SUP-PRT", "E06:Print Again SIA"],
    confidence: "high",
  },
  {
    id: "D013",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Event supplier payment.",
    answer:
      "Bank debit SUP-EVT of EUR 100,000, and this is the one supplier line that does not match. Event Things Europe " +
      "invoiced EUR 114,000 with EUR 59,000 unpaid, so only EUR 55,000 of this period's purchases was settled. The " +
      "remaining EUR 45,000 must have discharged a balance brought forward. That is the derivation of opening trade " +
      "payables of EUR 45,000, a figure stated nowhere in the data room: opening 45,000 + purchases 459,000 - payments " +
      "378,000 = confirmed closing 126,000.",
    evidence: ["E02:SUP-EVT", "E06:Event Things Europe", "E06:TOTAL 459,000 / 126,000 unpaid"],
    confidence: "high",
  },
  monthlyPayroll("January", "D014"),
  monthlyPayroll("February", "D015"),
  monthlyPayroll("March", "D016"),
  monthlyPayroll("April", "D017"),
  monthlyPayroll("May", "D018"),
  monthlyPayroll("June", "D019"),
  monthlyPayroll("July", "D020"),
  monthlyPayroll("August", "D021"),
  {
    id: "D022",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Rent payments.",
    answer:
      "Bank debit RENT of EUR 48,000 dated 31 August, described 'Rent Jan-Aug'. One settlement covering eight months, " +
      "EUR 6,000 per month. The cost belongs to the period of occupancy and the full 48,000 falls inside the reporting " +
      "period, so expense and cash agree and no rent accrual or prepayment arises at 31 August.",
    evidence: ["E02:RENT"],
    confidence: "high",
  },
  {
    id: "D023",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Meta and influencer payments.",
    answer:
      "Bank debit MKT of EUR 55,000, 'Meta, TikTok and influencers'. Advertising consumed as delivered; no asset is " +
      "created. Marketing expense of EUR 55,000. Note that the founder attempted to add the EUR 70,000 villa to this " +
      "line; that attempt is rejected at D046, so marketing stays at 55,000.",
    evidence: ["E02:MKT", "E10:14:22 message"],
    confidence: "high",
  },
  {
    id: "D024",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Software payments.",
    answer:
      "Bank debit SOFT of EUR 16,000, 'Software subscriptions'. Subscriptions are consumed over the term and the whole " +
      "amount is described as the period's subscriptions, so it is an operating expense of EUR 16,000 with no " +
      "capitalised licence and no prepayment evidenced.",
    evidence: ["E02:SOFT"],
    confidence: "medium",
  },
  {
    id: "D025",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Utilities payments.",
    answer:
      "Bank debit UTIL of EUR 12,000. Operating expense for the period. No evidence of a final meter reading after " +
      "31 August, so no additional accrual is raised.",
    evidence: ["E02:UTIL"],
    confidence: "medium",
  },
  {
    id: "D026",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Repair transfer.",
    answer:
      "Bank debit REPAIR of EUR 10,000, 'Emergency machine work'. It matches repair invoice R-771 dated 3 July for a " +
      "replacement belt, cleaning and calibration. The invoice states the work restored normal output and did not " +
      "increase capacity or extend useful life, so it is an expense. The management asset schedule classified it as " +
      "PPE; that is rejected. See D045 and D077.",
    evidence: ["E02:REPAIR", "E06:R-771", "E08:Replacement belt + calibration"],
    confidence: "high",
  },
  {
    id: "D027",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Packaging machine payment.",
    answer:
      "Bank debit CAPEX-PACK of EUR 60,000, 'PACK-O-MATIC 9000'. It matches equipment invoice A-910, machine installed " +
      "and available for use 10 May. Capitalised as PPE and shown as an investing outflow. The management schedule " +
      "labelled it 'Repair'; that is rejected at D043.",
    evidence: ["E02:CAPEX-PACK", "E06:A-910", "E08:Pack-O-Matic 9000"],
    confidence: "high",
  },
  {
    id: "D028",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Photo booth payment.",
    answer:
      "Bank debit CAPEX-PHOTO of EUR 20,000, 'Regret Photo Booth'. It matches equipment invoice P-404, available for " +
      "use 10 May. Capitalised as PPE and shown as an investing outflow. The management schedule labelled it " +
      "'Marketing expense'; that is rejected at D044.",
    evidence: ["E02:CAPEX-PHOTO", "E06:P-404", "E08:Regret Photo Booth"],
    confidence: "high",
  },
  {
    id: "D029",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Loan receipt.",
    answer:
      "Bank credit LOAN-ADV of EUR 50,000 on 1 March, 'BALTIC BANK FACILITY'. The signed agreement calls it a loan and " +
      "requires repayment. It is a financing inflow and an increase in debt. The finance manager's label of 'strategic " +
      "income', and the founder's instruction to call it 'other income', are rejected. See D042.",
    evidence: ["E02:LOAN-ADV", "E09:New advance 1 Mar", "E01:Strategic bank income", "E10:08:07 message"],
    confidence: "high",
  },
  {
    id: "D030",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Loan repayments.",
    answer:
      "Bank debit PRINCIPAL of EUR 19,000. Confirmed by the loan file as principal repaid. Financing outflow that " +
      "reduces the liability; it does not touch profit. Closing principal 100,000 + 50,000 - 19,000 = 131,000, which " +
      "the bank confirms in writing.",
    evidence: ["E02:PRINCIPAL", "E09:Principal repaid", "E11:Bank confirmation loan principal 131,000"],
    confidence: "high",
  },
  {
    id: "D031",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Interest payments.",
    answer:
      "Bank debit INT of EUR 10,000 is interest paid. The loan schedule shows interest expense of EUR 12,000 for the " +
      "period. The EUR 2,000 difference is unpaid interest at 31 August, independently confirmed by the bank. Interest " +
      "expense 12,000 in the P&L, 10,000 in operating cash flow, 2,000 as a liability.",
    evidence: ["E02:INT", "E09:Interest expense 12,000 / Interest paid 10,000", "E11:accrued unpaid interest 2,000"],
    confidence: "high",
  },
  {
    id: "D032",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Villa deposit.",
    answer:
      "Bank debit VILLA of EUR 70,000, 'SUNSET VILLA RESERVATION', paid on the owner card. The reservation is in the " +
      "founder's personal name and no customer meeting occurred. The label 'customer research' has no supporting " +
      "document. Treated as an owner distribution of EUR 70,000 charged to equity and shown as a financing outflow. " +
      "See D046.",
    evidence: ["E02:VILLA", "E09:Owner villa reservation", "E09:villa in founder's personal name", "E10:14:22-14:31"],
    confidence: "high",
  },
  {
    id: "D033",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Owner card spending.",
    answer:
      "Bank debit OWNERCARD of EUR 40,000, \"Chairman's platinum card\". No invoices, no approvals and no business " +
      "purpose are evidenced anywhere in the data room. Treated as an owner distribution of EUR 40,000 charged to " +
      "equity and shown as a financing outflow. See D047.",
    evidence: ["E02:OWNERCARD", "E09:Other owner card spending", "E07:Founder bonus row - no employment approval"],
    confidence: "medium",
  },
  {
    id: "D034",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Insurance movement.",
    answer:
      "There is none. No insurance payment, invoice, policy or accrual appears in the bank export, the purchase file, " +
      "the payroll file, the asset file or the management workbook. The bank export is arithmetically complete for the " +
      "whole period, so an insurance payment could not have been omitted from it. Recorded as nil rather than estimated, " +
      "because inventing an amount would breach the rule against evidence that is not in the case files. If a policy " +
      "exists it is paid outside this bank account and must be requested from the broker.",
    evidence: ["E02:complete bank export, no insurance line", "E01:Management P&L contains no insurance line"],
    confidence: "medium",
  },
  {
    id: "D035",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Water-damaged stock.",
    answer:
      "Basement 'premium' stock with a carrying value of EUR 22,000, counted as physically present by Marta on " +
      "31 August but wet and unsaleable, sitting under a leaking pipe. An independent post-takeover assessment confirms " +
      "it is not saleable and that disposal will cost about EUR 2,000, which is not included in the 22,000. Written down " +
      "to nil. The 2,000 is disclosed as expected future expenditure, not provided: no disposal contract, statute or " +
      "lease term obliged the company to clear the goods at 31 August. The founder's position that 'if it still exists, it is inventory' is " +
      "rejected. See D058 and D072.",
    evidence: ["E05:Basement premium stock", "E05:handwritten leaking pipe note", "E11:Independent stock assessment", "E10:16:05-16:06"],
    confidence: "high",
  },
  {
    id: "D036",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Customer insolvency.",
    answer:
      "Customer R-17 with an outstanding balance of EUR 18,000 entered liquidation. The liquidator's notice arrived on " +
      "3 September, after the reporting date, but it confirms a condition that already existed at 31 August, and the " +
      "sales team already knew on the day of the takeover. It is an adjusting event, so the receivable is written off " +
      "in the period to 31 August. The founder's instruction to leave it in receivables is rejected. See D057 and D071.",
    evidence: ["E11:R-17 liquidator notice", "E04:Return R-17", "E10:18:03-18:08"],
    confidence: "high",
  },
  {
    id: "D037",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Former employee claim.",
    answer:
      "External counsel wrote on 31 August, the reporting date itself, that a former employee claim is probable with a " +
      "best estimate of EUR 25,000 and a reasonable range of EUR 20,000 to EUR 30,000. No payment had been made. A " +
      "present obligation from a past event that is probable and reliably estimable is a provision. Recognised at " +
      "EUR 25,000. The instruction to delete the word 'probable' is rejected. See D059 and D073.",
    evidence: ["E09:External counsel 31 August", "E11:External lawyer confirmation", "E10:17:40-17:41"],
    confidence: "high",
  },
  {
    id: "D038",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Purchase total.",
    answer:
      "EUR 459,000 of materials purchased in the period across four suppliers (130,000 + 120,000 + 95,000 + 114,000), " +
      "from third-party invoices with independently confirmed balances. All goods-received stamps pre-date 31 August, " +
      "so the whole 459,000 enters the inventory roll-forward on a goods-received basis. EUR 126,000 was unpaid at " +
      "31 August. Management spreadsheets that use payment date instead of receipt date are rejected.",
    evidence: ["E06:TOTAL 459,000", "E06:goods-received stamps dated before 31 August", "E05:purchase records 459,000"],
    confidence: "high",
  },
  {
    id: "D039",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Cash collections total.",
    answer:
      "Customer cash received in the period is EUR 899,000: EUR 809,000 of trade collections plus EUR 90,000 of " +
      "September deposits. The 809,000 splits into 35,000 settling the opening receivable and 774,000 against this " +
      "period's revenue (180,000 + 142,000 + 70,000 + 95,000 + 250,000 + 37,000). Only the 809,000 belongs in the " +
      "receivables roll-forward; the 90,000 is a liability movement.",
    evidence: ["E02:all customer credit lines"],
    confidence: "high",
  },
  {
    id: "D040",
    category: "evidence_matching",
    reviewTier: "operational",
    question: "Resolve the source and treatment of Closing bank balance.",
    answer:
      "EUR 60,000. The bank export closes at 60,000 and the running balance reconciles line by line " +
      "(80,000 + 949,000 - 969,000). The post-takeover bank confirmation independently states 60,000. The management " +
      "workbook's EUR 186,000, which its own note says 'includes undeposited promises', is rejected. The overstatement " +
      "is EUR 126,000.",
    evidence: ["E02:closing balance", "E11:Bank confirmation closing cash 60,000", "E01:Cash per management 186,000"],
    confidence: "high",
  },

  // ---------------------------------------------------------------- D041-D070
  {
    id: "D041",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify September customer deposits.",
    answer:
      "Contract liability of EUR 90,000 (NB-SEP 60,000 and FF-SEP 30,000). Not revenue in the period to 31 August.",
    evidence: ["E04:NB-SEP / FF-SEP delivery dates", "E02:DEP-NB", "E02:DEP-FF2", "E03:FUT-01", "E03:FUT-02", "E10:08:04-08:06"],
    confidence: "high",
    aiProposal:
      "Contract liability of 90,000. Revenue is recognised when the promised goods or service are delivered, and both " +
      "events are dated in September with nothing delivered by 31 August.",
    independentChallenge:
      "The independent analysis reached the same treatment from the delivery dates alone, without relying on the " +
      "message traffic, and added that the deposits are non-refundable in form only: the company still has to buy and " +
      "deliver two events out of a 60,000 cash balance, so the liability is a real operating obligation and not a " +
      "presentation nicety.",
    studentReasoning:
      "The performance obligation is the event, and neither event had happened at the reporting date. Cash received is " +
      "not a performance indicator. The founder's own finance manager said on the day 'Delivery is next month', which " +
      "is a contemporaneous admission that nothing had been delivered. I also checked the alternative that these might " +
      "be non-refundable cancellation fees, which could be revenue; there is no cancellation and no such clause, so it " +
      "fails. This is the single largest revenue correction in the case.",
    statementEffect: { profit: -90000, cash: 0, assets: 0, liabilities: 90000, equity: -90000 },
    changedFromAI: false,
  },
  {
    id: "D042",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify New bank borrowing.",
    answer: "Financing inflow and a liability of EUR 50,000. Not income of any kind.",
    evidence: ["E09:New advance 1 Mar - bank and agreement", "E02:LOAN-ADV", "E01:Strategic bank income 50,000", "E10:08:07"],
    confidence: "high",
    aiProposal:
      "Financing liability. A loan creates an obligation to repay, so it cannot meet the definition of income; it " +
      "increases cash and debt simultaneously.",
    independentChallenge:
      "The independent analysis agreed and pushed further on the consequence: because the advance was taken on 1 March " +
      "and the closing principal of 131,000 is bank-confirmed, treating it as income would also have left the balance " +
      "sheet 50,000 short of the confirmed liability. The error was therefore detectable from the bank confirmation " +
      "alone, without any judgment about the agreement.",
    studentReasoning:
      "Two independent documents call it a loan: the signed agreement and the bank's own confirmation of a closing " +
      "principal of 131,000, which only works as 100,000 + 50,000 - 19,000. The labels 'strategic income' and 'other " +
      "income' come from a spreadsheet and a WhatsApp message, the two weakest sources in the ranking. There is no " +
      "version of the facts in which borrowed money is income.",
    statementEffect: { profit: -50000, cash: 0, assets: 0, liabilities: 50000, equity: -50000 },
    changedFromAI: false,
  },
  {
    id: "D043",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Packaging machine.",
    answer: "Capitalise EUR 60,000 as property, plant and equipment from 10 May. Investing outflow, not an expense.",
    evidence: ["E06:A-910 installed 10 May", "E02:CAPEX-PACK", "E08:management class 'Repair'"],
    confidence: "high",
    aiProposal:
      "Capitalise 60,000. The invoice describes a packaging machine installed on 10 May, which is a long-term resource, " +
      "and the management label 'Repair' contradicts the invoice narrative.",
    independentChallenge:
      "The independent analysis agreed on capitalisation and separately flagged the pattern: the same schedule that " +
      "calls a new machine a repair also calls a belt replacement an asset. It concluded the labels in that file are " +
      "systematically inverted and should carry no weight at all, rather than being assessed line by line.",
    studentReasoning:
      "The test is whether the spending creates a long-term resource. A Pack-O-Matic 9000 installed and available for " +
      "use on 10 May plainly does. Calling it a repair pulls 60,000 of cost into this period's profit and removes an " +
      "asset from the balance sheet, which is convenient for a seller who wants a low asset base but a high claimed " +
      "profit - except it lowers profit, which is why I treat the label as carelessness rather than design. Either way " +
      "the invoice outranks the spreadsheet.",
    statementEffect: { profit: 60000, cash: 0, assets: 60000, liabilities: 0, equity: 60000 },
    changedFromAI: false,
  },
  {
    id: "D044",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Photo booth.",
    answer: "Capitalise EUR 20,000 as property, plant and equipment from 10 May. Investing outflow, not marketing.",
    evidence: ["E06:P-404 available for use 10 May", "E02:CAPEX-PHOTO", "E08:management class 'Marketing expense'"],
    confidence: "high",
    aiProposal:
      "Capitalise 20,000. It is equipment available for use, used to deliver the Divorce Victory Party events, so it is " +
      "a revenue-earning asset rather than promotional spending.",
    independentChallenge:
      "The independent analysis agreed but noted the one genuine argument for expensing: a photo booth could be a " +
      "promotional prop rather than production equipment. It rejected that reading because the event product " +
      "explicitly includes a photographer, which makes the booth part of what the customer buys, not part of how the " +
      "company advertises.",
    studentReasoning:
      "The distinguishing question is whether the booth earns revenue or attracts it. The Divorce Victory Party " +
      "includes a photographer as a deliverable, so the booth is used in delivering the service the customer pays for. " +
      "That makes it equipment. It is also on an equipment invoice, P-404, with an availability date, which is how an " +
      "asset is documented and not how an advertising spend is documented.",
    statementEffect: { profit: 20000, cash: 0, assets: 20000, liabilities: 0, equity: 20000 },
    changedFromAI: false,
  },
  {
    id: "D045",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Machine belt and calibration.",
    answer: "Expense EUR 10,000 in the period. Do not capitalise.",
    evidence: ["E06:R-771 3 July - restored normal output, no added capacity or life", "E02:REPAIR", "E08:management class 'PPE'"],
    confidence: "high",
    aiProposal:
      "Expense 10,000. The invoice itself states the work restored normal output and did not increase capacity or " +
      "extend useful life, which is the definition of a repair.",
    independentChallenge:
      "The independent analysis agreed and made the point that this is the mirror image of D043: management capitalised " +
      "the repair and expensed the asset. Correcting only one of the two would have left the asset base wrong in the " +
      "other direction, so the pair has to be corrected together.",
    studentReasoning:
      "The capitalisation test has one question: did the spending create or improve a long-term resource, or did it " +
      "restore normal operation? The third-party invoice answers it directly and in the company's own disfavour, which " +
      "makes it credible. Capitalising it would spread 10,000 of this period's running cost into future periods and " +
      "inflate both assets and profit.",
    statementEffect: { profit: -10000, cash: 0, assets: -10000, liabilities: 0, equity: -10000 },
    changedFromAI: false,
  },
  {
    id: "D046",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Owner villa deposit.",
    answer:
      "Distribution to the owner of EUR 70,000, charged directly to equity and shown as a financing outflow. Not " +
      "marketing, not a bonus, not an expense.",
    evidence: ["E09:Owner villa reservation", "E09:villa in founder's personal name, no customer meeting", "E02:VILLA", "E10:14:22-14:31", "E07:Founder bonus - no employment approval"],
    confidence: "high",
    aiProposal:
      "Distribution of 70,000. Personal owner spending is a distribution unless a genuine business purpose is evidenced, " +
      "and the villa is in the founder's personal name with no customer meeting.",
    independentChallenge:
      "The independent analysis agreed on distribution and tested a third treatment I had not considered: recognising " +
      "a 110,000 receivable from the founder. It rejected it because there is no loan agreement, no repayment term and " +
      "the founder has departed, so recognising an asset would be unsupportable - and it showed that if the receivable " +
      "were recognised and then fully provided against, closing equity would be an identical 134,000 but reported " +
      "profit would fall to a loss of 36,000 on the certified basis. It also noted that the label changed from 'customer research' to " +
      "'marketing' to 'bonus' in nine minutes while the underlying transaction never changed at all.",
    studentReasoning:
      "There are three candidate treatments and I tested all three. Marketing fails because no customer meeting " +
      "occurred and a villa in a personal name is not an advertising medium. Employee bonus fails because the payroll " +
      "file itself records 'No employment approval', and the WhatsApp shows the label being chosen after the finance " +
      "manager objected that it was personal - a label chosen to fit a problem, not to describe a fact. Distribution " +
      "is what remains. The subtle part, which I want on the record, is that this decision does not change total " +
      "equity at all: management's treatment reduced equity through profit, mine reduces it through distributions. It " +
      "changes the shape of equity and it changes profit by 70,000, which is exactly what the earn-out is priced on.",
    statementEffect: { profit: 70000, cash: 0, assets: 0, liabilities: 0, equity: 0 },
    changedFromAI: false,
  },
  {
    id: "D047",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Owner card spending.",
    answer: "Distribution to the owner of EUR 40,000, charged to equity and shown as a financing outflow.",
    evidence: ["E02:OWNERCARD", "E09:Other owner card spending", "E07:Founder bonus row"],
    confidence: "medium",
    aiProposal:
      "Distribution of 40,000. No invoices or approvals support a business purpose, and it was spent on the same " +
      "personal card as the villa.",
    independentChallenge:
      "The independent analysis reached the same treatment and framed the test as an either-or that this spending " +
      "fails twice: an expense requires either an approved remuneration obligation, which is absent, or consumption of " +
      "a resource in the business, which is also absent. It agreed the recovery question is a legal matter that may " +
      "still be worth pursuing commercially, but is not a recognition question at 31 August. It rated the evidence " +
      "here weaker than for the villa, since for the villa there is a document proving a personal purpose whereas here " +
      "there is only an absence of documents.",
    studentReasoning:
      "I deliberately hold this at medium confidence and I want to be able to defend the difference. For the villa I " +
      "have positive evidence of a personal purpose. For this 40,000 I have no evidence either way, only an " +
      "unapproved card with no invoices behind it. The default for unvouched owner spending is a distribution, because " +
      "the burden of proof sits with the person claiming a business purpose. If the card statement later shows " +
      "legitimate business costs, profit falls by up to 40,000 and equity is unchanged - the same mechanism as D046 " +
      "running in reverse.",
    statementEffect: { profit: 40000, cash: 0, assets: 0, liabilities: 0, equity: 0 },
    changedFromAI: false,
  },
  {
    id: "D048",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Physical product materials consumed.",
    answer:
      "Cost of goods sold of EUR 396,000, presented above the gross profit line. Measured by anchoring on the physical " +
      "count rather than on the stated consumption figure.",
    evidence: ["E05:count 79,000 + 42,000 + 22,000", "E05:purchases 459,000, consumption 405,000, opening 80,000", "E06:TOTAL 459,000"],
    confidence: "medium",
    aiProposal:
      "Cost of goods sold of EUR 405,000, taken directly from the warehouse file's statement that physical product " +
      "materials consumed on valid delivered sales were 405,000, giving closing inventory of 134,000 gross.",
    independentChallenge:
      "The independent analysis identified the same 9,000 conflict and anchored on the physical count instead: " +
      "80,000 + 459,000 - 143,000 = 396,000. Its reasoning went further than mine in one respect. It observed that " +
      "the phrase 'consumed on valid delivered sales' is deliberately narrow: it excludes scrap, samples, breakage and " +
      "any materials already committed to the two September events, all of which are real consumptions that fall " +
      "outside that definition. On that reading the 9,000 is not necessarily an error at all, merely a different " +
      "measurement boundary. It also flagged that anchoring on the count is the less conservative direction, since it " +
      "raises profit by 9,000, and insisted the choice be justified on evidence weight rather than prudence.",
    studentReasoning:
      "I changed my answer. My first pass took the 405,000 because it was the number printed on the page, which is " +
      "exactly the trap the case is built around. Two records cannot both be right: the count says 143,000 is present, " +
      "the roll-forward using 405,000 says 134,000 should be. I anchored on the count for three reasons. It is dated at " +
      "the reporting date. It is corroborated twice, because Marta's count agrees to the system on both good-stock " +
      "lines and 79,000 + 42,000 equals exactly the 121,000 I carry. And the document that supplies the 405,000 also " +
      "warns that the system behind it was not updated, so it is self-impeaching. The 9,000 does not disappear: I " +
      "carry it as an unreconciled variance in uncertainty U1 with the full alternative quantified, because burying a " +
      "difference is worse than disclosing one.",
    statementEffect: { profit: 9000, cash: 0, assets: 9000, liabilities: 0, equity: 9000 },
    changedFromAI: true,
  },
  {
    id: "D049",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Event staff payroll.",
    answer:
      "Direct cost of services of EUR 80,000, presented above the gross profit line. Not administrative expense.",
    evidence: ["E07:Event delivery staff 80,000 - 'Works directly on paid events', management treatment 'Admin'"],
    confidence: "high",
    aiProposal:
      "Direct cost of services. The payroll file's own note says the staff work directly on paid events, which is the " +
      "definition of a direct delivery cost.",
    independentChallenge:
      "The independent analysis agreed that the 80,000 belongs in cost of sales and quantified management's error " +
      "precisely: pushing 80,000 out of cost of sales while pushing 72,000 in understates cost of sales by a net " +
      "8,000 and distorts gross margin in both directions at once, leaving total payroll expense unchanged so that " +
      "nothing looks wrong at the bottom of the page. It then took a different view on presentation from mine, " +
      "placing the 22,000 inventory write-down and the 10,000 machine repair inside cost of sales as well, which " +
      "gives cost of sales of 508,000 and a gross margin of 47.1 per cent rather than my 50.4 per cent. Net profit is " +
      "identical on both presentations, since the choice only moves charges across the gross profit line.",
    studentReasoning:
      "This decision does not change profit by a single euro, and I want to say that plainly rather than hide it. It " +
      "moves 80,000 across the gross profit line, taking gross margin from 58.8 per cent to 50.4 per cent. That matters " +
      "because the board is about to decide whether to keep running events and has to fund two September events out of " +
      "60,000 of cash. A margin that excludes the people who deliver the service is not a margin. Management had the " +
      "classification exactly inverted in both directions - event staff in admin, the sales team in COGS - which is why " +
      "I treat the functional labels in that file as unreliable rather than debatable. The two analyses did genuinely " +
      "differ on where the 22,000 write-down and the 10,000 repair sit, and I kept them below gross profit on purpose: " +
      "a flood under a leaking pipe and an emergency machine breakdown are not the recurring cost of selling a gift " +
      "box, and the board is about to decide whether to keep trading, which needs a margin that shows what normal " +
      "delivery costs. Both presentations reach the certified 74,000, so nothing turns on it except what the board " +
      "reads as normal.",
    statementEffect: { profit: 0, cash: 0, assets: 0, liabilities: 0, equity: 0 },
    changedFromAI: false,
    agentsDisagreed: true,
  },
  {
    id: "D050",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Sales team payroll.",
    answer:
      "Selling expense of EUR 72,000, below the gross profit line. Management tagged it COGS, which is wrong: the " +
      "commercial team wins orders, it does not produce or deliver the goods.",
    evidence: ["E07:Sales and partnerships 72,000 - 'Commercial team', management treatment 'COGS'"],
    confidence: "high",
  },
  {
    id: "D051",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Office payroll.",
    answer:
      "Administrative expense of EUR 96,000. This is the one functional label management got right. It includes the " +
      "former finance manager.",
    evidence: ["E07:Office and finance 96,000"],
    confidence: "high",
  },
  {
    id: "D052",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Rent.",
    answer: "Operating expense of EUR 48,000 for January to August. Fully paid, no accrual or prepayment at 31 August.",
    evidence: ["E02:RENT"],
    confidence: "high",
  },
  {
    id: "D053",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Marketing.",
    answer:
      "Operating expense of EUR 55,000. The villa is excluded from this line; see D046.",
    evidence: ["E02:MKT", "E10:14:22"],
    confidence: "high",
  },
  {
    id: "D054",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Software.",
    answer: "Operating expense of EUR 16,000. Subscriptions consumed in the period, no capitalised licence.",
    evidence: ["E02:SOFT"],
    confidence: "medium",
  },
  {
    id: "D055",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Utilities.",
    answer: "Operating expense of EUR 12,000.",
    evidence: ["E02:UTIL"],
    confidence: "medium",
  },
  {
    id: "D056",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Depreciation.",
    answer:
      "Operating expense of EUR 24,000 and a non-cash charge. Management booked nil.",
    evidence: ["E08:Period depreciation - not booked, independent schedule estimates 24,000", "E08:Opening accumulated depreciation 45,000"],
    confidence: "medium",
    aiProposal:
      "Recognise 24,000 of depreciation expense, the figure from the independent schedule, and add it to opening " +
      "accumulated depreciation of 45,000 to give 69,000.",
    independentChallenge:
      "The independent analysis agreed on the amount for want of any alternative but was more critical of its quality. " +
      "It pointed out that 24,000 is a single unexplained number with no asset register, no useful lives and no " +
      "in-service dates behind it, and that the two May additions were only in use for less than four months of the " +
      "period, so the figure cannot be checked for reasonableness. It recommended a lower confidence rating and an " +
      "explicit uncertainty range rather than presenting 24,000 as a reliable measurement.",
    studentReasoning:
      "The principle is not in doubt: assets in use lose value and management booking zero depreciation is not a policy, " +
      "it is an omission that overstates both profit and assets. The measurement is the weak part. I have one external " +
      "estimate of 24,000 and nothing to test it against. I checked whether it was even plausible - opening cost of " +
      "180,000 depreciating over roughly eight years gives about 15,000 for eight months, and the two new assets add a " +
      "few thousand more for their four months in use - so 24,000 sits in a sensible region, and I accept it. I record " +
      "it at medium confidence with a range of 18,000 to 32,000 in uncertainty U4 and a recommendation that the board " +
      "commission a fixed asset register, because right now nobody can prove this number.",
    statementEffect: { profit: -24000, cash: 0, assets: -24000, liabilities: 0, equity: -24000 },
    changedFromAI: false,
  },
  {
    id: "D057",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Bad receivable.",
    answer:
      "Expense of EUR 18,000 and a reduction of trade receivables. A specific write-off of the R-17 balance, not an " +
      "allowance.",
    evidence: ["E11:R-17 liquidator notice - no distribution expected", "E04:Return R-17", "E03:WEB-NCB comment 'see R-17'", "E10:18:03-18:08"],
    confidence: "high",
    aiProposal:
      "Write off 18,000. The customer is in liquidation with no distribution expected, so the asset no longer meets the " +
      "definition of a receivable.",
    independentChallenge:
      "The independent analysis agreed and focused on the timing question rather than the amount: the liquidator's " +
      "notice is dated 3 September, after the reporting date, so it had to decide whether this was an adjusting or a " +
      "non-adjusting event. It concluded adjusting, because insolvency is a condition that develops over months and " +
      "the company's own sales team already knew about it on the day of the takeover, which is before the reporting " +
      "date in substance.",
    studentReasoning:
      "Two questions had to be answered and only the second is genuinely difficult. Is it uncollectible? Yes, a " +
      "liquidator has confirmed no distribution. Does it belong to this period? The notice arrived on 3 September, but " +
      "a company does not become insolvent on the morning the letter is typed. The financial condition existed at " +
      "31 August, the letter merely confirms it, so it is an adjusting event and the loss belongs here. I used a " +
      "specific write-off rather than an allowance because the loss is identified, confirmed and measured - an " +
      "allowance is for losses you expect but cannot name. The founder's 'a zero is emotionally aggressive' is not an " +
      "accounting argument.",
    statementEffect: { profit: -18000, cash: 0, assets: -18000, liabilities: 0, equity: -18000 },
    changedFromAI: false,
  },
  {
    id: "D058",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Damaged stock.",
    answer:
      "Write the EUR 22,000 basement stock down to nil. Total charge EUR 22,000. The EUR 2,000 quoted to remove it is " +
      "NOT provided - it is disclosed as expected future expenditure, because no present obligation to dispose existed " +
      "at 31 August.",
    evidence: ["E05:Basement premium stock 22,000, wet, cannot be sold", "E05:disposal quote 2,000 not in carrying value", "E11:Independent stock assessment", "E10:16:06"],
    confidence: "high",
    aiProposal:
      "Write off 22,000. The stock is physically present but unsaleable, and physical existence does not guarantee " +
      "financial value.",
    independentChallenge:
      "The independent analysis reached the same 22,000 write-off and then argued for provisioning the 2,000 as well, on " +
      "the basis that net realisable value is selling price less costs to sell and is therefore negative. It noted the " +
      "counter-argument that the quote arrived in September and no disposal contract yet exists. On review that " +
      "counter-argument is the stronger one, and I did not follow the recommendation.",
    studentReasoning:
      "The 22,000 write-off is not in doubt: three sources agree the stock is unsaleable, and physical existence is not " +
      "recoverable value. The disposal cost is where I went wrong first time and have now corrected. I had reasoned that " +
      "net realisable value is nil less 2,000 of costs to sell, therefore negative, therefore the shortfall is a " +
      "liability. That conflates two different rules. Measuring inventory at the lower of cost and net realisable value " +
      "floors the ASSET at nil; it does not create a LIABILITY. A liability requires a present obligation, legal or " +
      "constructive, arising from a past event. I tested for one and found none: there is no disposal contract at " +
      "31 August - the quote itself is dated 3 to 5 September - no statute or lease term requiring clearance is in " +
      "evidence, and there is no past practice or published policy that would create a valid expectation in anyone " +
      "else. So the company has an intention to spend 2,000, not an obligation. Intentions are disclosed, not provided. " +
      "This also restores consistency with D071, where I declined to book a bad-debt allowance precisely because it had " +
      "no evidential basis; provisioning here would have been the same error in the opposite direction. If the warehouse " +
      "lease or a regulation does oblige clearance, the provision returns and profit falls from 74,000 to 72,000 - that " +
      "alternative is quantified in uncertainty U5.",
    statementEffect: { profit: -22000, cash: 0, assets: -22000, liabilities: 0, equity: -22000 },
    changedFromAI: true,
  },
  {
    id: "D059",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Probable legal claim.",
    answer: "Provision of EUR 25,000 recognised as a liability with a matching expense.",
    evidence: ["E09:External counsel 31 August - probable, best estimate 25,000, range 20,000-30,000", "E11:External lawyer confirmation", "E10:17:40-17:41"],
    confidence: "high",
    aiProposal:
      "Provide 25,000. A present obligation from a past event that is probable and can be estimated meets the " +
      "recognition test, and counsel's best estimate is 25,000.",
    independentChallenge:
      "The independent analysis agreed on recognition and challenged the measurement point instead: with a range of " +
      "20,000 to 30,000 and no indication that any point in the range is more likely, it questioned whether the " +
      "mid-point is a measurement or a convention. It also noted that the letter is dated 31 August, the reporting " +
      "date itself, so there is no adjusting-event question to resolve, unlike the R-17 write-off.",
    studentReasoning:
      "Recognition is straightforward and I treat it as settled: counsel wrote 'probable' on the reporting date and " +
      "gave a number, which is exactly the recognition test. The measurement needed a decision. I used 25,000 because " +
      "it is counsel's own stated best estimate, not because it happens to be the mid-point - if counsel had said the " +
      "best estimate was 20,000 within a 20,000 to 30,000 range I would have used 20,000. A provision is a " +
      "best-estimate measurement, not a worst case, so 30,000 would be over-provision and 20,000 would ignore the " +
      "advice. The 5,000 either way sits in uncertainty U2. Management's reason for omitting it - that 'negative energy " +
      "reduces valuation' - is evidence of override risk and feeds decision D097.",
    statementEffect: { profit: -25000, cash: 0, assets: 0, liabilities: 25000, equity: -25000 },
    changedFromAI: false,
  },
  {
    id: "D060",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Insurance consumed.",
    answer:
      "Nil. No insurance cost is evidenced anywhere in the case files, and the bank export is complete for the period, " +
      "so none was paid from this account. Recorded as nil rather than estimated. See D034 and D078.",
    evidence: ["E02:complete bank export, no insurance line", "E01:Management P&L contains no insurance line"],
    confidence: "medium",
  },
  {
    id: "D061",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Unpaid interest.",
    answer:
      "Liability of EUR 2,000. Interest expense of 12,000 less interest paid of 10,000. Independently confirmed by the " +
      "bank.",
    evidence: ["E09:Interest expense 12,000 / Interest paid 10,000", "E11:accrued unpaid interest 2,000"],
    confidence: "high",
  },
  {
    id: "D062",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Unpaid payroll.",
    answer:
      "Liability of EUR 32,000. Opening accrual 15,000 plus expense 248,000 less cash paid 231,000. The payroll file " +
      "left this line blank ('closing amount not calculated').",
    evidence: ["E07:Opening unpaid payroll 15,000, expense 248,000, cash 231,000", "E02:PAYROLL 231,000"],
    confidence: "high",
  },
  {
    id: "D063",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Unpaid suppliers.",
    answer:
      "Liability of EUR 126,000: BoxWorks 25,000, Glass & Drama 28,000, Print Again 14,000, Event Things 59,000. " +
      "Independently confirmed with the suppliers.",
    evidence: ["E06:126,000 unpaid, balances independently confirmed"],
    confidence: "high",
  },
  {
    id: "D064",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Delivered NorthStar contract.",
    answer:
      "Revenue of EUR 180,000 recognised on 12 February. One customer and one sale, despite three spellings across the " +
      "records. Fully collected, no closing receivable.",
    evidence: ["E04:INV-26012 accepted 12 Feb", "E02:RCPT-NS 'N STAR EVENTS'", "E03:C-001 'North Star / N STAR'"],
    confidence: "high",
    aiProposal:
      "Recognise 180,000. Goods delivered and formally accepted on 12 February, and the cash arrived the same day.",
    independentChallenge:
      "The independent analysis agreed on recognition but treated the real risk here as duplication rather than timing. " +
      "Three different spellings of one customer across the CRM, the bank and the contract file is precisely the " +
      "pattern that produces a triple-counted sale, and it recommended proving the identity through the invoice number " +
      "and amount rather than the name before accepting the revenue once.",
    studentReasoning:
      "The recognition point is easy: signed acceptance on 12 February and full payment the same day. The judgment " +
      "worth defending is that this is one sale. The board order warns that files contain duplicates, and 'North Star', " +
      "'N STAR EVENTS' and 'NorthStar Events' appearing across three files is exactly how a duplicate is manufactured. " +
      "I matched on invoice number, amount and date rather than on name: INV-26012, 180,000 and 12 February appear once " +
      "each. If I had matched on name I could have recognised 540,000 of revenue from a single 180,000 contract. That " +
      "is the failure mode this decision exists to catch.",
    statementEffect: { profit: 180000, cash: 0, assets: 0, liabilities: -180000, equity: 180000 },
    changedFromAI: false,
  },
  {
    id: "D065",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Delivered Freedom contract.",
    answer:
      "Revenue of EUR 200,000 recognised on 18 March, the full contract value. EUR 58,000 remains a trade receivable.",
    evidence: ["E04:INV-26031 accepted 18 Mar, 58,000 remains", "E02:RCPT-FF 142,000 'FREEDOM FEST 1/2'", "E03:C-002"],
    confidence: "high",
    aiProposal:
      "Recognise the full 200,000 on acceptance and carry 58,000 as a receivable. Revenue follows delivery, not " +
      "collection.",
    independentChallenge:
      "The independent analysis agreed on the 200,000 and separated the two questions management had merged: whether " +
      "the sale happened, and whether the money will arrive. It recognised the full amount but flagged that a balance " +
      "unpaid since March with a bank narrative reading '1/2' is an ageing signal, and asked whether an allowance was " +
      "needed - a question it routed to the receivables estimate rather than to revenue.",
    studentReasoning:
      "The most common error in this case is letting cash drive revenue, and this contract is where it bites hardest. " +
      "The customer accepted 200,000 of goods on 18 March, so 200,000 is earned; the 58,000 shortfall is a collection " +
      "question, not a revenue question, and mixing them would understate revenue and hide a credit problem at the same " +
      "time. I recognise 200,000 and deal with recoverability separately at D071, where I decide not to provide against " +
      "it and disclose that choice in uncertainty U3. The '1/2' in the bank reference is the strongest hint in the file " +
      "that a second instalment was expected and never came.",
    statementEffect: { profit: 200000, cash: 0, assets: 58000, liabilities: -142000, equity: 200000 },
    changedFromAI: false,
  },
  {
    id: "D066",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Completed Phoenix event.",
    answer:
      "Revenue of EUR 100,000 recognised on 29 April when the event was performed. EUR 30,000 remains a trade " +
      "receivable.",
    evidence: ["E04:INV-26047 completed 29 Apr, acceptance is a customer email", "E02:RCPT-PHX 70,000", "E03:C-003"],
    confidence: "medium",
    aiProposal:
      "Recognise 100,000 on 29 April. The event was completed, which is when the performance obligation for a service " +
      "is satisfied.",
    independentChallenge:
      "The independent analysis agreed but rated it the weakest of the four contracts on evidence quality, because " +
      "final acceptance is an email rather than a signed page. It concluded the email is sufficient when combined with " +
      "a 70,000 payment made on the completion date itself, since a customer who disputes an event does not pay 70 per " +
      "cent of it that day, but recommended recording the decision at medium confidence.",
    studentReasoning:
      "A service is earned when it is performed, and a Divorce Victory Party is either held or not held - there is no " +
      "partial delivery to argue about. It was held on 29 April. The weakness is documentary: the other three contracts " +
      "have signed acceptance, this one has an email, and an email is weaker evidence. What rescues it is the payment " +
      "behaviour. EUR 70,000 arrived on the completion date, which is corroboration by conduct, and the customer has " +
      "never disputed the balance. I therefore recognise the full 100,000 but hold confidence at medium and list the " +
      "30,000 among the balances to be confirmed directly with the customer.",
    statementEffect: { profit: 100000, cash: 0, assets: 30000, liabilities: -70000, equity: 100000 },
    changedFromAI: false,
  },
  {
    id: "D067",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Delivered Liberty order.",
    answer:
      "Revenue of EUR 120,000 recognised on 20 June. EUR 25,000 remains a trade receivable.",
    evidence: ["E04:INV-26063 delivered 20 Jun, 25,000 unpaid", "E04:'Accepted in full' customer message", "E02:RCPT-LIB 95,000", "E03:C-004"],
    confidence: "high",
    aiProposal:
      "Recognise 120,000 on delivery on 20 June, with 25,000 carried as a receivable.",
    independentChallenge:
      "The independent analysis agreed and noted that this contract sits in a file titled 'Returns and Angry " +
      "Customers', which primes a reader to expect a credit note or a return. It checked for one and found the opposite: " +
      "the only customer message on the file accepts the order in full and complains about glitter approvingly. It " +
      "warned against letting the filename influence the treatment.",
    studentReasoning:
      "The trap here is the file title. It invites you to assume a dispute and to defer revenue or provide for a " +
      "return. The actual evidence says the reverse: 'The boxes arrived. The glitter was excessive, which was exactly " +
      "the point. Accepted in full.' That is an unqualified acceptance, so the full 120,000 is earned on 20 June. The " +
      "25,000 outstanding is a payment-timing matter with no dispute attached to it. The board order states that dates " +
      "matter more than filenames and this is the decision where that instruction earns its place.",
    statementEffect: { profit: 120000, cash: 0, assets: 25000, liabilities: -95000, equity: 120000 },
    changedFromAI: false,
  },
  {
    id: "D068",
    category: "classification",
    reviewTier: "material_judgment",
    question: "Classify Undelivered September events.",
    answer:
      "No revenue. EUR 90,000 carried as a contract liability until the events are delivered on 15 and 24 September. " +
      "This is the measurement half of D041.",
    evidence: ["E04:NB-SEP 15 Sep / FF-SEP 24 Sep - no goods or service delivered by 31 August", "E03:FUT-01 / FUT-02 'Management included in August'", "E10:08:04-08:06"],
    confidence: "high",
    aiProposal:
      "Defer all 90,000. Neither event has occurred, so no performance obligation has been satisfied and no revenue " +
      "can be recognised.",
    independentChallenge:
      "The independent analysis agreed on deferral and tested the one argument that could have supported partial " +
      "recognition: whether any preparation costs had been incurred that might justify recognising revenue over time. " +
      "It found no supplier invoice, no venue booking and no cost allocation for either September event anywhere in the " +
      "purchase records, so there is nothing to recognise even on an over-time basis.",
    studentReasoning:
      "This is the same 90,000 as D041 seen from the revenue side rather than the liability side, and the two must not " +
      "be added together when reading the statements. The founder's argument was that 'September is basically next " +
      "week' and 'cash is cash'. Neither is a recognition criterion. What decided it for me is that the obligation is " +
      "still live and expensive: the company has taken 90,000 and still owes two complete events - venue, cake, DJ, " +
      "photographer - which it must fund out of 60,000 of cash. Calling that revenue would report a profit on work the " +
      "company has not done and cannot obviously afford to do.",
    statementEffect: { profit: -90000, cash: 0, assets: 0, liabilities: 90000, equity: -90000 },
    changedFromAI: false,
  },
  {
    id: "D069",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Loan principal payment.",
    answer:
      "Financing outflow of EUR 19,000 that reduces the loan liability. No effect on profit. Only the interest element " +
      "reaches the P&L.",
    evidence: ["E02:PRINCIPAL", "E09:Principal repaid 19,000"],
    confidence: "high",
  },
  {
    id: "D070",
    category: "classification",
    reviewTier: "operational",
    question: "Classify Equipment purchase.",
    answer:
      "Investing outflow of EUR 80,000 (packaging machine 60,000 and photo booth 20,000). Both assets were available " +
      "for use on 10 May and are capitalised. See D043 and D044.",
    evidence: ["E02:CAPEX-PACK", "E02:CAPEX-PHOTO", "E06:A-910", "E06:P-404"],
    confidence: "high",
  },

  // ---------------------------------------------------------------- D071-D090
  {
    id: "D071",
    category: "estimation",
    reviewTier: "material_judgment",
    question: "Estimate Closing bad-debt allowance/write-off and document the basis.",
    answer:
      "Specific write-off of EUR 18,000 against the R-17 balance. No general allowance on the remaining EUR 168,000. " +
      "This is the measurement half of D057 and must not be counted twice.",
    evidence: ["E11:R-17 liquidator notice", "E03:WEB-NCB 53,000 gross open 'see R-17'", "E04:no recovery expected"],
    confidence: "medium",
    aiProposal:
      "Write off 18,000 for R-17 and add a general allowance of around 10 per cent against the aged Freedom and " +
      "Phoenix balances, roughly 9,000, on the basis that balances open since March and April are at elevated risk.",
    independentChallenge:
      "The independent analysis took the opposite view on the general allowance. It found no ageing history, no prior " +
      "loss experience and no dispute or distress indicator for either customer, and argued that a percentage chosen " +
      "without a loss rate is an invented number rather than an estimate. It recommended a specific write-off only, " +
      "with the aged exposure disclosed and quantified instead of provided.",
    studentReasoning:
      "I changed my answer and I think the change is right. My first instinct was to sprinkle a general allowance over " +
      "the aged balances, which looks prudent and is actually undisciplined: I had no loss rate, no ageing profile and " +
      "no history, so any percentage I picked would have been a number I made up, and the assignment prohibits " +
      "inventing evidence. The R-17 write-off is different in kind - the loss is named, confirmed by a liquidator and " +
      "measured at 18,000. So I write off what is proven and disclose what is merely worrying. The exposure is real " +
      "and large: Freedom has owed 58,000 since March and Phoenix 30,000 since April, 88,000 in total, and I put that " +
      "in uncertainty U3 with the full downside quantified so that nobody can say it was hidden. If confirmations come " +
      "back badly, profit falls by up to 88,000 and the recommendation to continue the business would need revisiting.",
    statementEffect: { profit: -18000, cash: 0, assets: -18000, liabilities: 0, equity: -18000 },
    changedFromAI: true,
  },
  {
    id: "D072",
    category: "estimation",
    reviewTier: "material_judgment",
    question: "Estimate Damaged inventory write-off and document the basis.",
    answer:
      "Write-off of EUR 22,000 to nil. The EUR 2,000 disposal quote is disclosed as expected future expenditure, not " +
      "provided. Measurement half of D058.",
    evidence: ["E05:22,000 carrying value, cannot be sold", "E05:disposal quote 2,000, not in the carrying value", "E11:Independent stock assessment"],
    confidence: "high",
    aiProposal: "Write off the full 22,000 carrying value, since the stock has no saleable value.",
    independentChallenge:
      "The independent analysis confirmed the 22,000 and argued the 2,000 should also be carried as a liability, on the " +
      "grounds that net realisable value is selling price less costs to sell and is therefore negative. It did flag the " +
      "counter-argument - the quote arrived in September and no disposal contract exists. I have certified against its " +
      "recommendation: the counter-argument is decisive, because a negative measurement of an asset is not the same " +
      "thing as an obligation.",
    studentReasoning:
      "The 22,000 is not in dispute: three separate sources say the stock is unsaleable. The disposal cost is the " +
      "judgment, and I have corrected it. My earlier answer provided 2,000 on the reasoning that net realisable value " +
      "was negative. That was wrong in principle. The lower-of-cost-and-NRV rule measures an asset and floors it at " +
      "nil; recognising a liability is a separate test requiring a present obligation - legal or constructive - from a " +
      "past event. Owning goods that are worthless is not an obligation to spend money removing them. I looked for an " +
      "obligation and none exists at the reporting date: no disposal contract was signed, the quote is dated 3 to 5 " +
      "September, no clearance requirement in a lease or regulation appears anywhere in the data room, and there is no " +
      "past practice or announcement creating an expectation in a third party. So the 2,000 is disclosed as expected " +
      "future expenditure and charged when incurred. Certified profit is therefore 74,000, not 72,000. The no-provision " +
      "and provision positions are both quantified in uncertainty U5. The write-off remains a control finding as well " +
      "as a number: stock sat under a leaking pipe long enough to destroy 22,000 of goods and nobody acted, which is " +
      "why D096 recommends disposal and D097 recommends investigating the override.",
    statementEffect: { profit: -22000, cash: 0, assets: -22000, liabilities: 0, equity: -22000 },
    changedFromAI: true,
  },
  {
    id: "D073",
    category: "estimation",
    reviewTier: "material_judgment",
    question: "Estimate Legal provision and document the basis.",
    answer:
      "EUR 25,000, counsel's written best estimate within a range of EUR 20,000 to EUR 30,000. Measurement half of " +
      "D059.",
    evidence: ["E09:best estimate 25,000, range 20,000-30,000", "E11:External lawyer confirmation"],
    confidence: "medium",
    aiProposal: "Provide 25,000, the best estimate stated by external counsel.",
    independentChallenge:
      "The independent analysis accepted 25,000 but questioned whether a best estimate stated as a single point inside " +
      "a symmetric range is a measurement or a default. It observed that the case gives no probability weighting across " +
      "the range and recommended that the 5,000 either side be disclosed explicitly rather than absorbed, so that a " +
      "reader can see the provision is a judgment and not a computed figure.",
    studentReasoning:
      "I use the best estimate because that is what a provision is measured at - not the worst case, which would " +
      "over-provide by 5,000, and not the floor, which would ignore the advice I was given. The figure comes from an " +
      "external lawyer writing on the reporting date, which is about as strong as estimation evidence gets in this " +
      "data room. I hold confidence at medium rather than high, because the range is symmetric and unweighted, so " +
      "25,000 is the centre of an interval rather than a calculated number. The 5,000 either way is in uncertainty U2. " +
      "For the board this matters less as a number than as a signal: the claim was omitted entirely, and the stated " +
      "reason was that it would reduce valuation.",
    statementEffect: { profit: -25000, cash: 0, assets: 0, liabilities: 25000, equity: -25000 },
    changedFromAI: false,
  },
  {
    id: "D074",
    category: "estimation",
    reviewTier: "material_judgment",
    question: "Estimate Period depreciation and document the basis.",
    answer:
      "EUR 24,000 for the eight months to 31 August, from the independent schedule. Closing accumulated depreciation " +
      "45,000 + 24,000 = 69,000. Measurement half of D056.",
    evidence: ["E08:independent schedule estimates 24,000, not booked by management", "E08:opening cost 180,000, accumulated 45,000", "E06:A-910 and P-404 in use 10 May"],
    confidence: "medium",
    aiProposal: "Charge 24,000, the only external estimate available, and roll accumulated depreciation to 69,000.",
    independentChallenge:
      "The independent analysis accepted the figure while rating the evidence behind it as the weakest of any number " +
      "in the reconstruction. It stressed that there is no asset register, no useful lives, no residual values and no " +
      "policy, and that the two May additions were in service for less than four of the eight months, so a single " +
      "aggregate figure cannot be tested. It recommended a range of roughly 18,000 to 32,000 be disclosed.",
    studentReasoning:
      "Booking nothing was not an option: management's zero is an omission, and assets in use for eight months have " +
      "consumed value. So the question is only how much. I have exactly one external number and no schedule behind it, " +
      "which is uncomfortable, so I sanity-checked it rather than accepting it blind. Opening cost of 180,000 over a " +
      "life of roughly eight years is about 22,500 a year, or 15,000 for eight months; the machine and booth at 80,000 " +
      "over five to ten years from 10 May add roughly 3,000 to 8,000 for their four months in service. That brackets " +
      "24,000 comfortably, so the estimate is plausible even though it is unproven. Medium confidence, range 18,000 to " +
      "32,000 in U4, and a board action to build a fixed asset register.",
    statementEffect: { profit: -24000, cash: 0, assets: -24000, liabilities: 0, equity: -24000 },
    changedFromAI: false,
  },
  {
    id: "D075",
    category: "estimation",
    reviewTier: "material_judgment",
    question: "Estimate Closing inventory and document the basis.",
    answer:
      "EUR 121,000. The physical count of EUR 143,000 less the EUR 22,000 of unsaleable basement stock. It equals the " +
      "two good-stock lines counted by Marta, 79,000 and 42,000.",
    evidence: ["E05:count 79,000 + 42,000 + 22,000 = 143,000", "E05:opening 80,000, purchases 459,000, consumption 405,000", "E11:Independent stock assessment", "E01:Inventory 143,000 'system value before basement review'"],
    confidence: "medium",
    aiProposal:
      "EUR 112,000: take the stated consumption of 405,000, giving gross closing inventory of 134,000, then deduct the " +
      "22,000 of damaged stock.",
    independentChallenge:
      "The independent analysis reached 121,000 by anchoring on the count instead of the consumption figure. Its " +
      "argument was that of the four inputs to the roll-forward - opening inventory, purchases, consumption and the " +
      "closing balance - the consumption figure is the weakest and is therefore the correct residual to flex: " +
      "purchases of 459,000 are corroborated by third-party invoices, supplier confirmations and the bank, while the " +
      "405,000 has no supporting document at all. It also pressed the point that a balance sheet must state the asset " +
      "that exists, and a count is direct evidence of existence in a way a consumption statistic never is.",
    studentReasoning:
      "This is the decision where I disagreed with my own first answer, and it is the only genuine evidential conflict " +
      "in the case. Opening 80,000 plus purchases 459,000 less consumption 405,000 gives 134,000 gross; the count says " +
      "143,000 gross. One of the two is wrong by 9,000. I chose the count because it was performed at the reporting " +
      "date by someone who physically walked the warehouse, and because the consumption figure is produced by a system " +
      "that the same page admits was not updated - it impeaches itself. The decisive corroboration is arithmetic: " +
      "79,000 plus 42,000 is exactly 121,000, so my closing figure is built from two counted lines rather than from a " +
      "residual. Under the alternative, inventory is 112,000 and profit is 65,000 instead of 74,000. That whole 9,000 " +
      "is disclosed in uncertainty U1 with a recommendation to recount against the purchase ledger, because the " +
      "honest position is that this number has a known error bar, not that it is certain.",
    statementEffect: { profit: -22000, cash: 0, assets: -22000, liabilities: 0, equity: -22000 },
    changedFromAI: true,
  },
  {
    id: "D076",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Closing receivables and document the basis.",
    answer:
      "EUR 168,000 net: gross 186,000 less the 18,000 R-17 write-off. Gross is proved twice - by roll-forward " +
      "(35,000 + 960,000 - 809,000) and by adding the five open balances (58,000 + 30,000 + 25,000 + 20,000 + 53,000).",
    evidence: ["E04:open balances", "E03:platform receivables 20,000 and 53,000", "E02:collections", "E11:R-17"],
    confidence: "high",
  },
  {
    id: "D077",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Repair versus improvement amount and document the basis.",
    answer:
      "Repair EUR 10,000, improvement EUR 0. Invoice R-771 states the work restored normal output without increasing " +
      "capacity or extending useful life, so there is no element to split out and capitalise.",
    evidence: ["E06:R-771", "E02:REPAIR", "E08:management class 'PPE'"],
    confidence: "high",
  },
  {
    id: "D078",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Insurance expense and document the basis.",
    answer:
      "EUR 0. The basis is the absence of evidence in a complete record: the bank export reconciles line by line for " +
      "the whole period and contains no insurance payment, and no insurance appears in the purchase, payroll, asset or " +
      "management files. Estimating a figure would mean inventing evidence. Listed as an open information request to " +
      "the broker.",
    evidence: ["E02:complete bank export, no insurance line", "E01:Management P&L contains no insurance line"],
    confidence: "medium",
  },
  {
    id: "D079",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Interest payable and document the basis.",
    answer: "EUR 2,000. Expense 12,000 less paid 10,000, independently confirmed by the bank after the takeover.",
    evidence: ["E09:Interest expense / Interest paid", "E11:accrued unpaid interest 2,000"],
    confidence: "high",
  },
  {
    id: "D080",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Accrued payroll and document the basis.",
    answer:
      "EUR 32,000. Opening 15,000 plus expense 248,000 less cash paid 231,000. The 231,000 ties to the single combined " +
      "payroll line in the bank export, which is what makes the accrual computable at all.",
    evidence: ["E07:opening 15,000, expense 248,000, cash 231,000", "E02:PAYROLL"],
    confidence: "high",
  },
  {
    id: "D081",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Customer deposit liability and document the basis.",
    answer: "EUR 90,000: NB-SEP 60,000 for the 15 September event and FF-SEP 30,000 for the 24 September event.",
    evidence: ["E02:DEP-NB", "E02:DEP-FF2", "E04:NB-SEP / FF-SEP"],
    confidence: "high",
  },
  {
    id: "D082",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate PPE closing cost and document the basis.",
    answer:
      "EUR 260,000: opening 180,000 plus the packaging machine 60,000 and the photo booth 20,000. The belt replacement " +
      "of 10,000 is excluded because it is a repair.",
    evidence: ["E08:opening cost 180,000", "E06:A-910", "E06:P-404", "E06:R-771"],
    confidence: "high",
  },
  {
    id: "D083",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Accumulated depreciation and document the basis.",
    answer: "EUR 69,000: opening 45,000 plus the period charge of 24,000. Closing net book value EUR 191,000.",
    evidence: ["E08:accumulated depreciation 45,000", "E08:independent schedule 24,000"],
    confidence: "medium",
  },
  {
    id: "D084",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Supplier payable and document the basis.",
    answer:
      "EUR 126,000, independently confirmed with the four suppliers. It also reconciles: opening 45,000 plus purchases " +
      "459,000 less payments 378,000.",
    evidence: ["E06:126,000 unpaid, independently confirmed", "E02:four supplier payment lines"],
    confidence: "high",
  },
  {
    id: "D085",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Closing loan and document the basis.",
    answer:
      "EUR 131,000: opening 100,000 plus advance 50,000 less principal repaid 19,000. Confirmed in writing by the bank.",
    evidence: ["E09:loan movements", "E11:Bank confirmation loan principal 131,000"],
    confidence: "high",
  },
  {
    id: "D086",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Physical COGS and document the basis.",
    answer:
      "EUR 396,000: opening 80,000 plus purchases 459,000 less counted closing stock of 143,000. The damaged 22,000 is " +
      "shown separately as a write-off rather than buried in COGS. The alternative basis of 405,000 is disclosed in " +
      "uncertainty U1. See D048 and D075.",
    evidence: ["E05:count", "E05:consumption 405,000", "E06:purchases 459,000"],
    confidence: "medium",
  },
  {
    id: "D087",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Service direct payroll and document the basis.",
    answer:
      "EUR 80,000, the event delivery staff line, recognised as a direct cost of services above gross profit. Cash paid " +
      "was 75,000, so 5,000 of it sits inside the closing payroll accrual.",
    evidence: ["E07:Event delivery staff 80,000 expense / 75,000 cash"],
    confidence: "high",
  },
  {
    id: "D088",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Owner distributions and document the basis.",
    answer:
      "EUR 110,000: villa 70,000 plus owner card 40,000. This is the same 110,000 that the payroll file presents as a " +
      "founder 'bonus'; it is one outflow, not two, which the bank proves because payroll cash of 231,000 already " +
      "excludes it. Charged to equity and shown as financing.",
    evidence: ["E02:VILLA", "E02:OWNERCARD", "E07:Founder bonus 110,000", "E09:owner card items"],
    confidence: "high",
  },
  {
    id: "D089",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Net profit and document the basis.",
    answer:
      "EUR 74,000. Revenue 960,000 less cost of sales 476,000 gives gross profit of 484,000; less operating expenses of " +
      "398,000 gives operating profit of 86,000; less interest of 12,000 gives 74,000. Management claimed 312,000, an " +
      "overstatement of 238,000.",
    evidence: [
      "E02:complete bank export",
      "E04:signed acceptances",
      "E06:third-party invoices",
      "E07:payroll totals",
      "E11:post-takeover confirmations",
      "E01:Management profit 312,000",
      "Derived: schedules S1-S7",
    ],
    confidence: "medium",
  },
  {
    id: "D090",
    category: "estimation",
    reviewTier: "operational",
    question: "Estimate Closing cash and document the basis.",
    answer:
      "EUR 60,000, from the bank export and confirmed independently by the bank. Also proved by the cash-flow " +
      "roll-forward: 80,000 + 139,000 - 80,000 - 79,000 = 60,000. Management's 186,000 is rejected.",
    evidence: ["E02:closing balance", "E11:Bank confirmation", "E01:Cash per management 186,000"],
    confidence: "high",
  },

  // ---------------------------------------------------------------- D091-D100
  {
    id: "D091",
    category: "board_decision",
    reviewTier: "material_judgment",
    question: "Approve corrected accounts before valuation",
    answer:
      "Approve. The corrected accounts are the only version that reconciles to the bank, to confirmed supplier and " +
      "loan balances and to the physical stock count. No valuation, earn-out or refinancing discussion should proceed " +
      "on the management figures.",
    evidence: [
      "E11:Bank confirmation",
      "E06:confirmed supplier balances",
      "E05:physical count",
      "E09:counsel opinion",
      "E01:Management workbook",
      "Derived: reconciliations R1-R8",
    ],
    confidence: "high",
    aiProposal:
      "Approve the corrected accounts. They reconcile on all seven required checks, whereas the management workbook " +
      "does not reconcile to the bank at all.",
    independentChallenge:
      "The independent analysis agreed and added the point that decided it: the management figures cannot be corrected " +
      "line by line because they do not form a coherent set. The workbook describes its own cash as including " +
      "'undeposited promises' and leaves closing payroll 'not calculated', so there is no management balance sheet to " +
      "compare against - only a claimed profit and a claimed cash number that the bank contradicts by 126,000.",
    studentReasoning:
      "I can prove my numbers and management cannot prove theirs, and that asymmetry is the whole argument. Every " +
      "material figure I report ties to something outside the company: cash to the bank, the loan and interest to a " +
      "bank confirmation, payables to supplier confirmations, stock to a physical count, the legal provision to " +
      "counsel, the bad debt to a liquidator. The seven required checks all pass, and opening equity of 170,000 was " +
      "derived independently from the supplier roll-forward yet still lands the equity reconciliation exactly on " +
      "134,000, which is a real cross-check rather than a restatement. I record the balance-sheet effects as not " +
      "applicable rather than guessing them, because management never produced a balance sheet that balances - their " +
      "own file says cash includes promises and payroll was never calculated. Profit falls by 238,000 and cash by " +
      "126,000.",
    statementEffect: { profit: -238000, cash: -126000, assets: null, liabilities: null, equity: null },
    changedFromAI: false,
  },
  {
    id: "D092",
    category: "board_decision",
    reviewTier: "operational",
    question: "Freeze owner-card access",
    answer:
      "Yes, today. EUR 110,000 left the company on the founder's card in eight months with no approval, including " +
      "EUR 70,000 for a villa in his personal name. That is 149 per cent of the certified profit for the period and " +
      "183 per cent of the cash left in the bank. " +
      "Revoke the card, revoke payment authority and obtain the full transaction detail.",
    evidence: ["E02:VILLA", "E02:OWNERCARD", "E09:owner card items", "E07:no employment approval"],
    confidence: "high",
  },
  {
    id: "D093",
    category: "board_decision",
    reviewTier: "operational",
    question: "Move September deposits to contract liabilities",
    answer:
      "Yes. Reclassify EUR 90,000 out of revenue into contract liabilities and track it separately. The cash has " +
      "already been spent, and the two events still have to be delivered in September out of a EUR 60,000 balance.",
    evidence: ["E04:NB-SEP / FF-SEP", "E02:DEP-NB", "E02:DEP-FF2", "E10:08:04"],
    confidence: "high",
  },
  {
    id: "D094",
    category: "board_decision",
    reviewTier: "operational",
    question: "Begin weekly 13-week cash forecast",
    answer:
      "Yes, owned by finance and reviewed weekly. Cash fell from 80,000 to 60,000 while the company reported a profit, " +
      "and EUR 126,000 of supplier debt, EUR 32,000 of unpaid payroll and two funded-but-undelivered events all land in " +
      "the next quarter. The forecast must model supplier terms and both September events explicitly.",
    evidence: ["E02:closing 60,000", "E06:126,000 unpaid", "E07:closing accrual", "E04:September events"],
    confidence: "high",
  },
  {
    id: "D095",
    category: "board_decision",
    reviewTier: "operational",
    question: "Stop credit sales to insolvent/high-risk customers",
    answer:
      "Yes. Stop credit supply to R-17 immediately, since it is in liquidation, and suspend further credit to any " +
      "customer without a confirmed balance. Obtain direct confirmations for the EUR 88,000 owed by Freedom Festivals " +
      "and Phoenix HR before shipping again.",
    evidence: ["E11:R-17 liquidator notice", "E04:open balances", "E03:CRM open balances"],
    confidence: "high",
  },
  {
    id: "D096",
    category: "board_decision",
    reviewTier: "operational",
    question: "Dispose of damaged stock",
    answer:
      "Yes. Accept the EUR 2,000 disposal quote and clear the basement. The cost is disclosed rather than provided at " +
      "31 August, because no obligation to dispose existed then; accepting the quote is what creates it, and the 2,000 " +
      "will be charged in the period the board commits. The goods have no saleable value, they are " +
      "already written off, and selling water-damaged gift boxes would create a returns and reputation problem worth " +
      "more than 22,000. Fix the leaking pipe at the same time.",
    evidence: ["E05:basement stock, leaking pipe note", "E11:Independent stock assessment, disposal 2,000"],
    confidence: "high",
  },
  {
    id: "D097",
    category: "board_decision",
    reviewTier: "operational",
    question: "Investigate management override and duplicate sources",
    answer:
      "Yes. There is contemporaneous written evidence of intent to misstate: book deposits as sales, call the loan " +
      "income, relabel personal spending as a bonus, delete 'probable' from legal advice and leave a liquidated " +
      "customer in receivables. The workbook also says formulas were replaced with values. Investigate the override, " +
      "de-duplicate the customer master where one customer is spelled three ways, and restore segregation of duties " +
      "over journals and the inventory system.",
    evidence: ["E10:full message set", "E01:'Some formulas were replaced with values'", "E03:three spellings of NorthStar", "E05:inventory system not updated"],
    confidence: "high",
  },
  {
    id: "D098",
    category: "board_decision",
    reviewTier: "operational",
    question: "Renegotiate supplier terms",
    answer:
      "Yes. EUR 126,000 is unpaid against EUR 60,000 of cash, and the largest exposure is a single supplier, Event " +
      "Things Europe, at EUR 59,000. Agree a written payment plan before the September events are ordered, since the " +
      "same supplier base has to deliver them.",
    evidence: ["E06:unpaid balances by supplier", "E02:closing cash 60,000", "E04:September events"],
    confidence: "medium",
  },
  {
    id: "D099",
    category: "board_decision",
    reviewTier: "operational",
    question: "Continue core Finally Single and event operations",
    answer:
      "Yes, continue. Revenue of EUR 960,000 is real and every euro is supported by a signed acceptance, a delivery " +
      "date or a platform settlement. Gross profit is EUR 484,000, a 50.4 per cent margin after charging the staff who " +
      "actually deliver the events, and operating cash flow was positive at EUR 139,000. The company did not lose money " +
      "on what it sold; it lost 238,000 of reported profit to bad accounting and 110,000 of cash to the founder. Both " +
      "are fixable and neither is a trading problem.",
    evidence: [
      "E04:signed acceptances",
      "E03:CRM delivered rows",
      "E02:Stripe settlements and customer receipts",
      "Derived: revenue schedule S1",
      "Derived: cash flow statement",
    ],
    confidence: "high",
  },
  {
    id: "D100",
    category: "board_decision",
    reviewTier: "material_judgment",
    question: "Use claimed management profit for earn-out",
    answer:
      "No. Do not use the claimed EUR 312,000 for any earn-out, valuation or covenant calculation. The certified basis " +
      "is EUR 74,000, and the walk from one to the other is the reconciled bridge in section 01 of the report, not an " +
      "approximate list of errors.",
    evidence: [
      "E01:Management profit 312,000 'Used in takeover deck'",
      "E10:08:04-08:07",
      "Derived: reconciliations R1-R8",
    ],
    confidence: "high",
    aiProposal:
      "Reject the 312,000. It includes 90,000 of undelivered deposits and 50,000 of borrowing as income and omits " +
      "depreciation, bad debt, the stock write-off and the legal provision. The proposal also listed the owner's " +
      "110,000 as if it widened the gap, which is the wrong sign.",
    independentChallenge:
      "The independent analysis agreed on rejection and made the point that the number is not merely wrong but " +
      "unusable. It is not an error that can be adjusted to, because the workbook's own notes describe its inputs as " +
      "'approximate', say 'some items omitted' and admit that formulas were replaced with hard values. It recommended " +
      "the board also ask what the 312,000 was used for, since the file states it went into the takeover deck.",
    studentReasoning:
      "The gap is 238,000, and the bridge that actually reconciles runs: 312,000 claimed, less 90,000 of September " +
      "deposits that were not revenue, less 50,000 of bank borrowing that was not income, less 24,000 because " +
      "management's 'materials and wages' of 620,000 understates the reconstructed 644,000, PLUS 27,000 because their " +
      "'operating costs' of 168,000 overstates the 141,000 of actual cash overhead, less 24,000 of depreciation never " +
      "booked, less 22,000 of dead stock, less 18,000 of bad debt and less 25,000 of legal provision - giving operating " +
      "profit of 86,000 - then less 12,000 of interest, giving 74,000. Every step ties. " +
      "I want to be explicit about one sign, because my earlier explanation had it wrong. Reclassifying the founder's " +
      "110,000 out of expenses and into distributions does not deepen the gap - it RAISES profit by 110,000. It does " +
      "not appear as a standalone line in the bridge because management's two cost aggregates are marked 'Approximate' " +
      "and 'Some items omitted' in their own file, so their composition cannot be traced; the reclassification is " +
      "absorbed inside the two aggregate-difference lines above. Its effect on total equity is nil either way, which is " +
      "the point: it moves 110,000 between profit and distributions without changing net assets, and an earn-out priced " +
      "on profit is exactly what that movement distorts. " +
      "Two separate things are wrong with the 312,000 and only one is arithmetic. The other is that it was constructed " +
      "on purpose: the message traffic shows the deposits and the loan being relabelled deliberately, and the file says " +
      "the number went into the takeover deck. An earn-out priced on a profit figure the seller engineered transfers " +
      "the whole error to the buyer. Certified profit is 74,000, and I would put the 88,000 of aged receivables in " +
      "front of the board before anyone prices even that.",
    statementEffect: { profit: -238000, cash: -126000, assets: null, liabilities: null, equity: null },
    changedFromAI: false,
  },
];

export const materialJudgments = decisions.filter((d) => d.reviewTier === "material_judgment");
export const operationalDecisions = decisions.filter((d) => d.reviewTier === "operational");
