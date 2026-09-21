import Link from "next/link";
import { decisions, materialJudgments } from "@/data/decisions";
import { evidenceRegister, injectionAttempts } from "@/data/evidence";
import { agentComparison, agentDisagreements, agentProtocol, openInformationRequests } from "@/data/agents";
import {
  balanceSheet,
  boardRecommendation,
  cashFlow,
  currency,
  directMethodCheck,
  openingBalanceSheet,
  profitAndLoss,
  reconciliations,
  reportingDate,
  schedules,
  uncertainties,
} from "@/data/financials";
import { Statement } from "@/components/Statement";
import { DecisionCard } from "@/components/DecisionCard";
import { Money, fmt, signed } from "@/components/Money";

const nav = [
  ["summary", "Summary"],
  ["evidence", "Evidence"],
  ["schedules", "Schedules"],
  ["statements", "Statements"],
  ["reconciliations", "Reconciliations"],
  ["trail", "AI review trail"],
  ["decisions", "100 decisions"],
  ["uncertainty", "Uncertainty"],
  ["board", "Board"],
] as const;

export default function Home() {
  const overrides = decisions.filter((d) => d.changedFromAI === true);
  const lowConfidence = decisions.filter((d) => d.confidence === "low");
  const mediumConfidence = decisions.filter((d) => d.confidence === "medium");

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <strong>DPI-HT-01</strong>
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
          <Link href="/review">/review</Link>
          <a href="/submission.json">/submission.json</a>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">
            Divorce Party International Ltd. &middot; takeover data room &middot; {reportingDate} &middot; {currency}
          </p>
          <h1>The accounts said 312,000. The bank said otherwise.</h1>
          <p className="lede">
            A forensic reconstruction of the Profit and Loss Statement, Cash Flow Statement and Balance Sheet at{" "}
            {reportingDate}, built from twelve conflicting evidence files. Every material number traces to a source
            outside the company: the bank, a signed contract, a third-party invoice, a physical count, a liquidator or
            external counsel.
          </p>
          <div className="kpis">
            <div className="kpi">
              <div className="label">Certified net profit</div>
              <div className="value">{fmt(boardRecommendation.correctedProfit)}</div>
              <div className="sub">claimed {fmt(boardRecommendation.claimedProfit)}</div>
            </div>
            <div className="kpi">
              <div className="label">Profit overstated by</div>
              <div className="value neg">{fmt(boardRecommendation.profitOverstatement)}</div>
              <div className="sub">77% of the claim</div>
            </div>
            <div className="kpi">
              <div className="label">Closing cash</div>
              <div className="value">{fmt(boardRecommendation.correctedCash)}</div>
              <div className="sub">claimed {fmt(boardRecommendation.claimedCash)}</div>
            </div>
            <div className="kpi">
              <div className="label">Balance sheet</div>
              <div className="value">540,000</div>
              <div className="sub">balances; 8 of 8 checks pass</div>
            </div>
          </div>
        </div>
      </header>

      <section id="summary">
        <div className="wrap">
          <h2>What was wrong, in one page</h2>
          <p className="section-note">
            Revenue is real. The reporting was not. The bridge below is the whole case: 240,000 of the 312,000 claimed
            profit does not survive contact with the evidence.
          </p>
          <div className="card">
            <div className="tbl-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Bridge from the claim to the certified position</th>
                    <th className="num">EUR</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Management profit as presented</td>
                    <td className="num">312,000</td>
                    <td>Used in the takeover deck</td>
                  </tr>
                  <tr>
                    <td>September deposits removed from revenue</td>
                    <td className="num neg">(90,000)</td>
                    <td>Events on 15 and 24 September; nothing delivered by 31 August</td>
                  </tr>
                  <tr>
                    <td>Bank advance removed from income</td>
                    <td className="num neg">(50,000)</td>
                    <td>The agreement calls it a loan and requires repayment</td>
                  </tr>
                  <tr>
                    <td>Materials and wages understated</td>
                    <td className="num neg">(24,000)</td>
                    <td>620,000 stated against 644,000 reconstructed</td>
                  </tr>
                  <tr>
                    <td>Other operating costs overstated</td>
                    <td className="num pos">27,000</td>
                    <td>168,000 stated against 141,000 of actual cash overhead</td>
                  </tr>
                  <tr>
                    <td>Depreciation never booked</td>
                    <td className="num neg">(24,000)</td>
                    <td>Management recorded nil on 260,000 of assets in use</td>
                  </tr>
                  <tr>
                    <td>Damaged stock not written down</td>
                    <td className="num neg">(22,000)</td>
                    <td>Water damage under a leaking pipe; independently assessed as unsaleable</td>
                  </tr>
                  <tr>
                    <td>Liquidated customer not impaired</td>
                    <td className="num neg">(18,000)</td>
                    <td>Liquidator confirms no distribution expected</td>
                  </tr>
                  <tr>
                    <td>Legal provision omitted</td>
                    <td className="num neg">(25,000)</td>
                    <td>Counsel wrote &ldquo;probable&rdquo; on the reporting date</td>
                  </tr>
                  <tr>
                    <td>Disposal obligation omitted</td>
                    <td className="num neg">(2,000)</td>
                    <td>Net realisable value of the damaged stock is negative</td>
                  </tr>
                  <tr className="row-subtotal">
                    <td>Corrected operating profit</td>
                    <td className="num">84,000</td>
                    <td />
                  </tr>
                  <tr>
                    <td>Interest expense never recognised</td>
                    <td className="num neg">(12,000)</td>
                    <td>Loan schedule; 10,000 paid, 2,000 accrued</td>
                  </tr>
                  <tr className="row-total">
                    <td>Certified net profit</td>
                    <td className="num">72,000</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="callout">
            <p>
              The 110,000 the founder spent on a personal villa and card does not appear in this bridge and that is the
              point. Management charged it to profit; it is a distribution. It reduces equity either way, so it changes
              profit by 110,000 without changing net assets at all &mdash; which is precisely why it matters to anyone
              pricing an earn-out on profit.
            </p>
          </div>
        </div>
      </section>

      <section id="evidence">
        <div className="wrap">
          <h2>Evidence register</h2>
          <p className="section-note">
            Twelve files, ranked by reliability as the board order requires: bank and signed contracts first, then
            third-party invoices, then warehouse and delivery records, then internal operations, then management
            spreadsheets, then email and unsupported claims. Where files conflict, the stronger source wins and the
            conflict is recorded rather than smoothed away.
          </p>
          <div className="card">
            <div className="tbl-scroll">
              <table>
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Kind</th>
                    <th>Rank</th>
                    <th>What it establishes</th>
                  </tr>
                </thead>
                <tbody>
                  {evidenceRegister
                    .slice()
                    .sort((a, b) => a.rank - b.rank)
                    .map((e) => (
                      <tr key={e.id}>
                        <td className="mono">{e.file}</td>
                        <td>{e.kind}</td>
                        <td>
                          <span
                            className={
                              e.reliability === "strong"
                                ? "pill ok"
                                : e.reliability === "medium"
                                  ? "pill warn"
                                  : "pill bad"
                            }
                          >
                            {e.reliability}
                          </span>
                        </td>
                        <td>
                          {e.summary}
                          {e.contradicts ? <span className="note">Conflict: {e.contradicts}</span> : null}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 style={{ marginTop: 26 }}>Instructions embedded in the evidence, and why none was followed</h3>
          <p className="section-note">
            Six sentences in the case files are written to steer whoever reads them. They are untrusted case content.
            Each one is recorded as evidence of management override risk and refused.
          </p>
          {injectionAttempts.map((a) => (
            <div className="callout bad" key={a.id}>
              <p className="quote">&ldquo;{a.quote}&rdquo;</p>
              <p className="note" style={{ marginTop: 6 }}>
                {a.source}
              </p>
              <p style={{ marginTop: 8 }}>{a.response}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="schedules">
        <div className="wrap">
          <h2>Supporting schedules</h2>
          <p className="section-note">
            Seven schedules built first, then used to produce the statements. Each carries its own arithmetic proof.
          </p>
          {schedules.map((s) => (
            <div className="card" key={s.id}>
              <h3>
                {s.id} &middot; {s.title}
              </h3>
              <div className="tbl-scroll">
                <table className="narrow">
                  <tbody>
                    {s.lines.map((l) => (
                      <tr key={l.label} className={l.emphasis ? "row-subtotal" : undefined}>
                        <td>
                          {l.label}
                          {l.note ? <span className="note">{l.note}</span> : null}
                        </td>
                        <td className="num">{l.value === null ? "n/a" : <Money value={l.value} />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="note" style={{ marginTop: 10 }}>
                Proof: {s.proof}
              </p>
            </div>
          ))}
          <div className="card">
            <h3>Opening balance sheet at 1 January 2026</h3>
            <p className="note" style={{ marginBottom: 10 }}>
              Two of these balances appear nowhere in the data room and had to be derived. Trade payables of 45,000 come
              from the supplier roll-forward: three suppliers reconcile exactly to their bank payments, but Event Things
              Europe was paid 45,000 more than its current-period activity, which can only have discharged a balance
              brought forward. Interest payable of nil comes from the interest roll-forward against the bank-confirmed
              closing accrual of 2,000. Opening equity of 170,000 is then a residual &mdash; and the fact that it later
              reconciles exactly to closing equity of 132,000 is a genuine cross-check, not a restatement.
            </p>
            <div className="tbl-scroll">
              <table className="narrow">
                <tbody>
                  {openingBalanceSheet.map((l) => (
                    <tr key={l.label} className={l.level === "total" ? "row-subtotal" : undefined}>
                      <td>
                        {l.label}
                        {l.note ? <span className="note">{l.note}</span> : null}
                      </td>
                      <td className="num">
                        <Money value={l.value} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="statements">
        <div className="wrap">
          <h2>The three statements</h2>
          <p className="section-note">
            Period 1 January to {reportingDate}. All figures in {currency}.
          </p>
          <Statement title="Profit and Loss Statement" lines={profitAndLoss} />
          <div className="grid-2">
            <Statement title="Cash Flow Statement (indirect)" lines={cashFlow} />
            <div>
              <Statement title="Direct-method operating check" lines={directMethodCheck} />
              <div className="callout">
                <p>
                  Both methods produce operating cash of 139,000 from entirely separate inputs. The indirect method
                  starts from profit; the direct method adds up the bank lines. Agreement between them is the strongest
                  single test that the reconstruction holds together.
                </p>
              </div>
            </div>
          </div>
          <Statement title={`Balance Sheet at ${reportingDate}`} lines={balanceSheet} />
        </div>
      </section>

      <section id="reconciliations">
        <div className="wrap">
          <h2>Reconciliations</h2>
          <p className="section-note">
            The seven checks the assignment requires, plus a supplier payable check that is what makes the opening
            balance sheet derivable at all.
          </p>
          {reconciliations.map((r) => (
            <div className="card" key={r.id}>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                <span className="did">{r.id}</span>
                <h3 style={{ flex: "1 1 280px", margin: 0 }}>{r.check}</h3>
                <span className={r.passes ? "pill ok" : "pill bad"}>{r.passes ? "reconciles" : "fails"}</span>
              </div>
              <div className="tbl-scroll" style={{ marginTop: 10 }}>
                <table className="narrow">
                  <tbody>
                    <tr>
                      <td>{r.left}</td>
                      <td className="num">{fmt(r.leftValue)}</td>
                    </tr>
                    <tr>
                      <td>{r.right}</td>
                      <td className="num">{fmt(r.rightValue)}</td>
                    </tr>
                    <tr className="row-subtotal">
                      <td>Difference</td>
                      <td className="num">{fmt(r.leftValue - r.rightValue)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="note" style={{ marginTop: 8 }}>
                {r.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="trail">
        <div className="wrap">
          <h2>AI review trail</h2>
          <p className="section-note">{agentProtocol.method}</p>
          <div className="callout">
            <p>{agentProtocol.convergence}</p>
          </div>

          <div className="card">
            <h3>Where the two independent analyses landed</h3>
            <div className="tbl-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Figure</th>
                    <th className="num">Agent 1</th>
                    <th className="num">Agent 2</th>
                    <th className="num">Certified</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {agentComparison.map((c) => (
                    <tr key={c.metric}>
                      <td>{c.metric}</td>
                      <td className="num">{c.agent1}</td>
                      <td className="num">{c.agent2}</td>
                      <td className="num">
                        <strong>{c.certified}</strong>
                      </td>
                      <td>
                        <span className={c.agreed ? "pill ok" : "pill warn"}>
                          {c.agreed ? "agreed" : "differed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 style={{ marginTop: 22 }}>The three points where the analyses genuinely differed</h3>
          {agentDisagreements.map((d) => (
            <div className="card" key={d.id}>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                <span className="did">{d.id}</span>
                <h3 style={{ flex: "1 1 260px", margin: 0 }}>{d.topic}</h3>
              </div>
              <div className="dblock" style={{ marginTop: 10 }}>
                <div className="h">Agent 1</div>
                <p>{d.agent1Position}</p>
              </div>
              <div className="dblock">
                <div className="h">Agent 2</div>
                <p>{d.agent2Position}</p>
              </div>
              <div className="dblock final">
                <div className="h">How I resolved it</div>
                <p>{d.resolution}</p>
              </div>
              <div className="chips">
                <span className="chip">{d.profitEffect}</span>
                {d.relatedDecisions.map((r) => (
                  <a className="chip" key={r} href={`#${r}`}>
                    {r}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <h3 style={{ marginTop: 22 }}>The 25 material judgments</h3>
          <p className="section-note">
            Each records the first AI proposal, the independent second analysis, my certified answer and reasoning, the
            statement effect and whether I overrode the AI. I overrode it on {overrides.length}: {" "}
            {overrides.map((o) => o.id).join(", ")}.
          </p>
          {materialJudgments.map((d) => (
            <DecisionCard key={d.id} decision={d} />
          ))}
        </div>
      </section>

      <section id="decisions">
        <div className="wrap">
          <h2>All 100 decisions</h2>
          <p className="section-note">
            {decisions.length} decisions: {materialJudgments.length} material judgments and{" "}
            {decisions.length - materialJudgments.length} operational. {mediumConfidence.length} are held at medium
            confidence and {lowConfidence.length} at low. Click any row to open it.
          </p>
          <div className="filters">
            <span className="pill accent">material &middot; {materialJudgments.length}</span>
            <span className="pill">operational &middot; {decisions.length - materialJudgments.length}</span>
            <span className="pill warn">overrode AI &middot; {overrides.length}</span>
            <span className="pill ok">high confidence &middot; {decisions.filter((d) => d.confidence === "high").length}</span>
            <span className="pill warn">medium &middot; {mediumConfidence.length}</span>
          </div>
          {decisions.map((d) => (
            <DecisionCard key={d.id} decision={d} />
          ))}
        </div>
      </section>

      <section id="uncertainty">
        <div className="wrap">
          <h2>Material uncertainty</h2>
          <p className="section-note">
            Six areas where the evidence does not settle the answer. Each shows the basis chosen, the range, the profit
            effect of moving within that range, and what would resolve it. Taken together, the plausible range bounds
            net profit between roughly 58,000 and 86,000. None of it gets near 312,000.
          </p>
          {uncertainties.map((u) => (
            <div className="card" key={u.id}>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap" }}>
                <span className="did">{u.id}</span>
                <h3 style={{ flex: "1 1 260px", margin: 0 }}>{u.topic}</h3>
                <span className="pill">
                  {fmt(u.low)} &middot; {fmt(u.best)} &middot; {fmt(u.high)}
                </span>
              </div>
              <p style={{ color: "var(--ink-2)", marginTop: 8 }}>{u.description}</p>
              <div className="dblock final">
                <div className="h">Basis chosen</div>
                <p>{u.basisChosen}</p>
              </div>
              <div className="chips">
                <span className="chip">
                  profit effect {signed(u.profitEffectLow)} to {signed(u.profitEffectHigh)}
                </span>
                {u.relatedDecisions.map((r) => (
                  <a className="chip" key={r} href={`#${r}`}>
                    {r}
                  </a>
                ))}
              </div>
              <p className="note" style={{ marginTop: 8 }}>
                Resolved by: {u.resolvedBy}
              </p>
            </div>
          ))}

          <div className="card">
            <h3>Open information requests</h3>
            <ul className="clean">
              {openInformationRequests.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="board">
        <div className="wrap">
          <h2>Board recommendation</h2>
          <p className="lede">{boardRecommendation.headline}</p>

          <div className="grid-2">
            <div className="card">
              <h3>Corrected profit and cash</h3>
              <div className="tbl-scroll">
                <table className="narrow">
                  <tbody>
                    <tr>
                      <td>Claimed profit</td>
                      <td className="num">{fmt(boardRecommendation.claimedProfit)}</td>
                    </tr>
                    <tr>
                      <td>Certified profit</td>
                      <td className="num">{fmt(boardRecommendation.correctedProfit)}</td>
                    </tr>
                    <tr className="row-subtotal">
                      <td>Overstatement</td>
                      <td className="num neg">{fmt(boardRecommendation.profitOverstatement)}</td>
                    </tr>
                    <tr>
                      <td>Claimed cash</td>
                      <td className="num">{fmt(boardRecommendation.claimedCash)}</td>
                    </tr>
                    <tr>
                      <td>Confirmed cash</td>
                      <td className="num">{fmt(boardRecommendation.correctedCash)}</td>
                    </tr>
                    <tr className="row-subtotal">
                      <td>Cash that does not exist</td>
                      <td className="num neg">{fmt(boardRecommendation.cashOverstatement)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card">
              <h3>Working capital and solvency</h3>
              <div className="tbl-scroll">
                <table className="narrow">
                  <tbody>
                    <tr>
                      <td>Current assets</td>
                      <td className="num">{fmt(boardRecommendation.workingCapital.currentAssets)}</td>
                    </tr>
                    <tr>
                      <td>Current liabilities</td>
                      <td className="num">{fmt(boardRecommendation.workingCapital.currentLiabilities)}</td>
                    </tr>
                    <tr className="row-subtotal">
                      <td>Net working capital</td>
                      <td className="num">{fmt(boardRecommendation.workingCapital.netWorkingCapital)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="note" style={{ marginTop: 10 }}>
                {boardRecommendation.workingCapital.note}
              </p>
            </div>
          </div>

          <div className="callout warn">
            <p>{boardRecommendation.solvencyWarning}</p>
          </div>

          <div className="card">
            <h3>Five immediate control actions</h3>
            <ol className="clean">
              {boardRecommendation.fiveControlActions.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ol>
          </div>

          <div className="card">
            <h3>Should the core business continue?</h3>
            <p style={{ color: "var(--ink)" }}>
              <span className="pill ok">Yes &mdash; continue</span>
            </p>
            <p style={{ color: "var(--ink-2)" }}>{boardRecommendation.continuationReasoning}</p>
          </div>

          <div className="callout bad">
            <p>{boardRecommendation.earnOutPosition}</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          Case DPI-HT-01 &middot; Divorce Party International Ltd. &middot; reporting date {reportingDate} &middot;{" "}
          {currency} &middot; VAT and corporate income tax out of scope. Assessor views:{" "}
          <Link href="/review">/review</Link> and <a href="/submission.json">/submission.json</a>.
        </div>
      </footer>
    </>
  );
}
