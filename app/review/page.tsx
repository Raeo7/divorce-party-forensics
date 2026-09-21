import Link from "next/link";
import { decisions, materialJudgments } from "@/data/decisions";
import { agentDisagreements } from "@/data/agents";
import { balanceSheet, boardRecommendation, profitAndLoss, reconciliations, uncertainties } from "@/data/financials";
import { DecisionCard } from "@/components/DecisionCard";
import { fmt, signed } from "@/components/Money";

export const metadata = {
  title: "DPI-HT-01 Assessor Review",
  description: "Compact assessor view: disagreements, overrides, low-confidence decisions and unresolved uncertainty.",
};

export default function Review() {
  const overrides = decisions.filter((d) => d.changedFromAI === true);
  const disagreed = decisions.filter((d) => d.agentsDisagreed === true);
  const lowConf = decisions.filter((d) => d.confidence === "low");
  const medConf = decisions.filter((d) => d.confidence === "medium");
  const flagged = new Set([
    ...overrides.map((d) => d.id),
    ...disagreed.map((d) => d.id),
    ...lowConf.map((d) => d.id),
    ...medConf.map((d) => d.id),
  ]);
  const flaggedDecisions = decisions.filter((d) => flagged.has(d.id));
  const allPass = reconciliations.every((r) => r.passes);
  const netProfit = profitAndLoss.find((l) => l.level === "total")?.value ?? 0;
  const totalAssets = balanceSheet.find((l) => l.label === "Total assets")?.value ?? 0;

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <strong>DPI-HT-01 &middot; assessor view</strong>
          <a href="#status">Status</a>
          <a href="#flags">Flags</a>
          <a href="#checks">Checks</a>
          <a href="#open">Unresolved</a>
          <a href="#material">25 material</a>
          <Link href="/">Full report</Link>
          <a href="/submission.json">/submission.json</a>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">Compact assessor view</p>
          <h1>Review summary</h1>
          <p className="lede">
            Everything an assessor needs to check in one screen: whether the statements reconcile, where the two
            independent analyses disagreed, where I overrode the AI, which decisions carry less than full confidence and
            what remains unresolved.
          </p>
          <div className="kpis" id="status">
            <div className="kpi">
              <div className="label">Decisions</div>
              <div className="value">{decisions.length} / 100</div>
              <div className="sub">
                {materialJudgments.length} material, {decisions.length - materialJudgments.length} operational
              </div>
            </div>
            <div className="kpi">
              <div className="label">Reconciliations</div>
              <div className="value">
                {reconciliations.filter((r) => r.passes).length} / {reconciliations.length}
              </div>
              <div className="sub">{allPass ? "all pass" : "failures present"}</div>
            </div>
            <div className="kpi">
              <div className="label">Net profit</div>
              <div className="value">{fmt(netProfit)}</div>
              <div className="sub">claimed {fmt(boardRecommendation.claimedProfit)}</div>
            </div>
            <div className="kpi">
              <div className="label">Balance sheet</div>
              <div className="value">{fmt(totalAssets)}</div>
              <div className="sub">assets = liabilities + equity</div>
            </div>
          </div>
        </div>
      </header>

      <section id="flags">
        <div className="wrap">
          <h2>Flags</h2>
          <p className="section-note">
            The four categories the assignment asks to be highlighted. Every flagged item links to the full decision
            record.
          </p>

          <div className="card">
            <h3>Agent disagreements &middot; {agentDisagreements.length}</h3>
            <p className="note" style={{ marginBottom: 10 }}>
              All three are presentation differences. The two independent analyses agreed on every certified number in
              the statements, including net profit of 72,000, total assets of 540,000 and the derived opening equity of
              170,000.
            </p>
            <div className="tbl-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Topic</th>
                    <th>Resolution</th>
                    <th>Profit effect</th>
                  </tr>
                </thead>
                <tbody>
                  {agentDisagreements.map((d) => (
                    <tr key={d.id}>
                      <td className="did">{d.id}</td>
                      <td>{d.topic}</td>
                      <td>{d.resolution}</td>
                      <td>
                        <span className="pill ok">none</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3>Student overrides of the AI answer &middot; {overrides.length}</h3>
            <div className="tbl-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Question</th>
                    <th>First AI proposal</th>
                    <th>Certified instead</th>
                    <th className="num">Profit effect</th>
                  </tr>
                </thead>
                <tbody>
                  {overrides.map((d) => (
                    <tr key={d.id}>
                      <td>
                        <a className="did" href={`#${d.id}`}>
                          {d.id}
                        </a>
                      </td>
                      <td>{d.question}</td>
                      <td>{d.aiProposal}</td>
                      <td>{d.answer}</td>
                      <td className="num">
                        {d.statementEffect?.profit === null || d.statementEffect?.profit === undefined
                          ? "n/a"
                          : signed(d.statementEffect.profit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <h3>
              Decisions below full confidence &middot; {medConf.length} medium, {lowConf.length} low
            </h3>
            <div className="tbl-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Question</th>
                    <th>Tier</th>
                    <th>Confidence</th>
                    <th>Why it is not high</th>
                  </tr>
                </thead>
                <tbody>
                  {[...lowConf, ...medConf].map((d) => (
                    <tr key={d.id}>
                      <td>
                        <a className="did" href={`#${d.id}`}>
                          {d.id}
                        </a>
                      </td>
                      <td>{d.question}</td>
                      <td>
                        {d.reviewTier === "material_judgment" ? (
                          <span className="pill accent">material</span>
                        ) : (
                          <span className="pill">operational</span>
                        )}
                      </td>
                      <td>
                        <span className={d.confidence === "low" ? "pill bad" : "pill warn"}>{d.confidence}</span>
                      </td>
                      <td className="note" style={{ display: "table-cell" }}>
                        {shortWhy(d.id)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="checks">
        <div className="wrap">
          <h2>Required financial checks</h2>
          <div className="card">
            <div className="tbl-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Check</th>
                    <th className="num">Left</th>
                    <th className="num">Right</th>
                    <th className="num">Diff</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reconciliations.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <span className="did">{r.id}</span> {r.check}
                      </td>
                      <td className="num">{fmt(r.leftValue)}</td>
                      <td className="num">{fmt(r.rightValue)}</td>
                      <td className="num">{fmt(r.leftValue - r.rightValue)}</td>
                      <td>
                        <span className={r.passes ? "pill ok" : "pill bad"}>{r.passes ? "pass" : "fail"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="open">
        <div className="wrap">
          <h2>Unresolved uncertainty</h2>
          <div className="card">
            <div className="tbl-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Topic</th>
                    <th className="num">Low</th>
                    <th className="num">Best</th>
                    <th className="num">High</th>
                    <th className="num">Profit swing</th>
                    <th>Decisions</th>
                  </tr>
                </thead>
                <tbody>
                  {uncertainties.map((u) => (
                    <tr key={u.id}>
                      <td className="did">{u.id}</td>
                      <td>{u.topic}</td>
                      <td className="num">{fmt(u.low)}</td>
                      <td className="num">{fmt(u.best)}</td>
                      <td className="num">{fmt(u.high)}</td>
                      <td className="num">
                        {signed(u.profitEffectLow)} / {signed(u.profitEffectHigh)}
                      </td>
                      <td className="mono" style={{ fontSize: 12 }}>
                        {u.relatedDecisions.join(" ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="note" style={{ marginTop: 10 }}>
              Combined, these bound certified net profit between roughly 58,000 and 86,000 against a claimed 312,000.
            </p>
          </div>
        </div>
      </section>

      <section id="material">
        <div className="wrap">
          <h2>Flagged decision records</h2>
          <p className="section-note">
            The {flaggedDecisions.length} decisions carrying an override, a disagreement or less than full confidence,
            in full.
          </p>
          {flaggedDecisions.map((d) => (
            <DecisionCard key={d.id} decision={d} />
          ))}
        </div>
      </section>

      <footer>
        <div className="wrap">
          Assessor view. Full report at <Link href="/">/</Link>; machine-readable answer at{" "}
          <a href="/submission.json">/submission.json</a> with all {decisions.length} decision IDs.
        </div>
      </footer>
    </>
  );
}

function shortWhy(id: string): string {
  const map: Record<string, string> = {
    D006: "Platform settlement dates are payout cycles, so the split of the 270,000 across months is not directly evidenced.",
    D007: "Same platform timing issue, plus the 53,000 open balance mixes a confirmed loss with unconfirmed exposure.",
    D014: "No month-level payroll evidence exists; the even 31,000 split is an allocation, not a record.",
    D015: "No month-level payroll evidence exists; the even 31,000 split is an allocation, not a record.",
    D016: "No month-level payroll evidence exists; the even 31,000 split is an allocation, not a record.",
    D017: "No month-level payroll evidence exists; the even 31,000 split is an allocation, not a record.",
    D018: "No month-level payroll evidence exists; the even 31,000 split is an allocation, not a record.",
    D019: "No month-level payroll evidence exists; the even 31,000 split is an allocation, not a record.",
    D020: "No month-level payroll evidence exists; the even 31,000 split is an allocation, not a record.",
    D021: "No month-level payroll evidence exists; the even 31,000 split is an allocation, not a record.",
    D024: "No invoice was seen, so a capitalised licence or a prepayment cannot be positively excluded.",
    D025: "No final meter reading after 31 August, so a small accrual cannot be excluded.",
    D033: "The treatment rests on an absence of documents rather than positive evidence of personal use.",
    D034: "Concluding nil from the absence of evidence; a policy paid outside this bank account cannot be excluded.",
    D047: "Same as D033: unvouched spending with no positive evidence either way.",
    D048: "Rests on the count-versus-consumption conflict; the alternative basis moves profit by 9,000.",
    D054: "Subscription term not evidenced.",
    D055: "Cut-off after 31 August not evidenced.",
    D056: "The 24,000 has no asset register, useful lives or method behind it.",
    D060: "Concluding nil from the absence of evidence.",
    D066: "Final acceptance is a customer email rather than a signed page.",
    D071: "No ageing history exists, so the decision not to provide against the 88,000 of aged balances is a judgment.",
    D073: "Counsel's range is symmetric and unweighted, so 25,000 is a stated best estimate rather than a computed figure.",
    D074: "Only one external estimate exists and it cannot be independently recomputed.",
    D075: "The 9,000 count-versus-consumption variance is unreconciled.",
    D078: "Concluding nil from the absence of evidence.",
    D083: "Inherits the estimation uncertainty in the 24,000 depreciation charge.",
    D086: "Inherits the 9,000 inventory variance.",
    D089: "Aggregates every estimation uncertainty in the case; range roughly 58,000 to 86,000.",
    D098: "Supplier appetite for renegotiation is not evidenced; the exposure and concentration are.",
  };
  return map[id] ?? "Judgment recorded below full confidence; see the decision record.";
}
