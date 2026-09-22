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
  profitBridge,
  reconciliations,
  reportingDate,
  schedules,
  uncertainties,
} from "@/data/financials";
import { Statement } from "@/components/Statement";
import { DecisionCard } from "@/components/DecisionCard";
import { DecisionBrowser } from "@/components/DecisionBrowser";
import { Bridge } from "@/components/Bridge";
import { RangeBar } from "@/components/RangeBar";
import { JudgmentSummary } from "@/components/JudgmentSummary";
import { Money, fmt, signed } from "@/components/Money";

const sections = [
  ["bridge", "The bridge"],
  ["board", "Board"],
  ["uncertainty", "Uncertainty"],
  ["statements", "Statements"],
  ["checks", "Checks"],
  ["evidence", "Evidence"],
  ["schedules", "Schedules"],
  ["trail", "AI trail"],
  ["decisions", "Decisions"],
] as const;

function SectionHead({
  id,
  num,
  title,
  note,
}: {
  id: string;
  num: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="sec-head" id={id}>
      <div className="sec-num">{num}</div>
      <h2>{title}</h2>
      {note ? <p className="sec-note">{note}</p> : null}
    </div>
  );
}

export default function Home() {
  const overrides = decisions.filter((d) => d.changedFromAI === true);

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <Link href="/" className="brand">
            DPI-HT-01
          </Link>
          <nav className="topnav">
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
            <Link href="/review" className="cta">
              Review
            </Link>
            <a href="/submission.json" className="cta">
              JSON
            </a>
          </nav>
        </div>
      </div>

      <header className="hero">
        <div className="wrap">
          <span className="stamp">Takeover data room · reconstructed</span>
          <p className="hero-meta">
            Case DPI-HT-01 · Divorce Party International Ltd. · {reportingDate} · {currency}
          </p>
          <h1>
            The accounts said <span className="struck">312,000</span>. The bank said{" "}
            <em>72,000</em>.
          </h1>
          <p className="lede">
            A forensic reconstruction of the Profit and Loss Statement, Cash Flow Statement and
            Balance Sheet, built from twelve evidence files that contradict each other on purpose.
            Every material number traces to a source outside the company: the bank, a signed
            contract, a third-party invoice, a physical count, a liquidator, external counsel.
          </p>

          <div className="ledger">
            <div className="ledger-cell">
              <div className="k">Certified profit</div>
              <div className="v">{fmt(boardRecommendation.correctedProfit)}</div>
              <div className="s">
                claimed {fmt(boardRecommendation.claimedProfit)} — overstated by{" "}
                <span className="neg">{fmt(boardRecommendation.profitOverstatement)}</span>
              </div>
            </div>
            <div className="ledger-cell">
              <div className="k">Cash at bank</div>
              <div className="v">{fmt(boardRecommendation.correctedCash)}</div>
              <div className="s">
                claimed {fmt(boardRecommendation.claimedCash)} —{" "}
                <span className="neg">{fmt(boardRecommendation.cashOverstatement)}</span> does not
                exist
              </div>
            </div>
            <div className="ledger-cell">
              <div className="k">Balance sheet</div>
              <div className="v">540,000</div>
              <div className="s">balances; 8 of 8 checks reconcile</div>
            </div>
            <div className="ledger-cell">
              <div className="k">Decisions certified</div>
              <div className="v">100</div>
              <div className="s">
                {materialJudgments.length} material judgments, {overrides.length} where I overrode
                the AI
              </div>
            </div>
          </div>

          <div className="orientation">
            <div className="h">How to assess this submission</div>
            <p>
              This page carries the whole reconstruction in full: the evidence register, seven
              supporting schedules, all three statements, eight reconciliations, the two-agent
              review trail for every material judgment, all 100 certified decisions, the uncertainty
              register and the board recommendation. Nothing is hidden behind a control that has to
              be clicked.
            </p>
            <ul className="clean">
              <li>
                <strong>/</strong> — this page, the complete report.
              </li>
              <li>
                <strong>/review</strong> — compact assessor view: agent disagreements, student
                overrides, decisions below full confidence, unresolved uncertainty.
              </li>
              <li>
                <strong>/submission.json</strong> — the machine-readable answer, all 100 decision
                IDs, valid against the supplied submission schema.
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section>
        <div className="wrap">
          <SectionHead
            id="bridge"
            num="01"
            title="Where 240,000 of profit went"
            note="Revenue is real. The reporting was not. This is the whole case in one walk: from the figure management put in the takeover deck to the figure the evidence supports."
          />
          <div className="card">
            <Bridge steps={profitBridge} />
          </div>
          <div className="callout">
            <p>
              The 110,000 the founder spent on a personal villa and card does not appear in this
              walk, and that is the point. Management charged it to profit; it is a distribution. It
              reduces equity either way, so it changes profit by 110,000 without changing net assets
              at all — which is precisely why it matters to anyone pricing an earn-out on profit.
            </p>
          </div>

          <h3 style={{ marginTop: 34, marginBottom: 6 }}>
            The {materialJudgments.length} material judgments at a glance
          </h3>
          <p className="sec-note" style={{ gridColumn: "auto", marginBottom: 16 }}>
            Every material judgment, its certified position, what it does to profit against the
            alternative I rejected, and how confident I am. The full record for each — the first AI
            proposal, the independent second analysis and my certification — is in the AI review
            trail below.
          </p>
          <JudgmentSummary judgments={materialJudgments} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead id="board" num="02" title="Board recommendation" />
          <p
            style={{
              fontFamily: "var(--font-display-stack)",
              fontSize: "clamp(24px, 3.4vw, 34px)",
              lineHeight: 1.18,
              margin: "0 0 26px",
              maxWidth: "24ch",
            }}
          >
            {boardRecommendation.headline}
          </p>

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
                      <td className="num">
                        {fmt(boardRecommendation.workingCapital.currentLiabilities)}
                      </td>
                    </tr>
                    <tr className="row-subtotal">
                      <td>Net working capital</td>
                      <td className="num">
                        {fmt(boardRecommendation.workingCapital.netWorkingCapital)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="note" style={{ marginTop: 12 }}>
                {boardRecommendation.workingCapital.note}
              </p>
            </div>
          </div>

          <div className="callout warn">
            <p>{boardRecommendation.solvencyWarning}</p>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Five immediate control actions</h3>
            <ol className="clean">
              {boardRecommendation.fiveControlActions.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ol>
          </div>

          <div className="card">
            <div className="card-head">
              <h3 style={{ margin: 0, flex: "1 1 auto" }}>Should the core business continue?</h3>
              <span className="tag ok">Yes — continue</span>
            </div>
            <p style={{ color: "var(--ink-2)", margin: 0, maxWidth: "var(--measure)" }}>
              {boardRecommendation.continuationReasoning}
            </p>
          </div>

          <div className="callout bad">
            <p>{boardRecommendation.earnOutPosition}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead
            id="uncertainty"
            num="03"
            title="Material uncertainty"
            note="Six areas where the evidence does not settle the answer. Each shows the range, where the certified figure sits inside it, the profit effect of moving within it, and what would resolve it. Together they bound net profit between roughly 58,000 and 86,000. None of it gets near 312,000."
          />
          {uncertainties.map((u) => (
            <div className="card" key={u.id}>
              <div className="card-head">
                <span className="did">{u.id}</span>
                <h3 style={{ margin: 0, flex: "1 1 240px" }}>{u.topic}</h3>
                <span className="chip down">
                  profit {signed(u.profitEffectLow)} / {signed(u.profitEffectHigh)}
                </span>
              </div>
              <p style={{ color: "var(--ink-2)", margin: "0 0 4px", maxWidth: "var(--measure)" }}>
                {u.description}
              </p>
              <RangeBar low={u.low} best={u.best} high={u.high} />
              <div className="dblock final" style={{ marginTop: 16 }}>
                <div className="h">Basis chosen</div>
                <p>{u.basisChosen}</p>
              </div>
              <div className="chips">
                <span className="chip">
                  <span className="k">Resolved by</span> {u.resolvedBy}
                </span>
                {u.relatedDecisions.map((r) => (
                  <a className="chip" key={r} href={`#${r}`}>
                    {r}
                  </a>
                ))}
              </div>
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

      <section>
        <div className="wrap">
          <SectionHead
            id="statements"
            num="04"
            title="The three statements"
            note={`Period 1 January to ${reportingDate}. All figures in ${currency}. VAT and corporate income tax are out of scope.`}
          />
          <div className="grid-2">
            <Statement title="Profit and Loss Statement" lines={profitAndLoss} />
            <Statement title={`Balance Sheet at ${reportingDate}`} lines={balanceSheet} />
          </div>
          <div className="grid-2">
            <Statement title="Cash Flow Statement · indirect" lines={cashFlow} />
            <div>
              <Statement title="Direct-method operating check" lines={directMethodCheck} />
              <div className="callout">
                <p>
                  Both methods produce operating cash of 139,000 from entirely separate inputs. The
                  indirect method starts from profit; the direct method adds up the bank lines.
                  Agreement between the two is the strongest single test that the reconstruction
                  holds together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead
            id="checks"
            num="05"
            title="Reconciliations"
            note="The seven checks the assignment requires, plus a supplier payable check — which is the one that makes the opening balance sheet derivable at all."
          />
          <div className="checks">
            {reconciliations.map((r) => (
              <div className="check" key={r.id}>
                <div className="id">{r.id}</div>
                <div className="name">{r.check}</div>
                <div className="vals">
                  <span>{fmt(r.leftValue)}</span>
                  <span className="eq">=</span>
                  <span>{fmt(r.rightValue)}</span>
                  <span className={r.passes ? "tag ok" : "tag bad"} style={{ marginLeft: "auto" }}>
                    {r.passes ? "reconciles" : "fails"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {reconciliations.map((r) => (
            <article className="decision" key={r.id} id={r.id}>
              <header className="dhead">
                <span className="did">{r.id}</span>
                <h4 className="dq">{r.check}</h4>
                <span className={r.passes ? "tag ok" : "tag bad"}>
                  difference {fmt(r.leftValue - r.rightValue)}
                </span>
              </header>
              <div className="dbody">
                <div className="tbl-scroll">
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
                <p className="note" style={{ marginTop: 12 }}>
                  {r.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead
            id="evidence"
            num="06"
            title="Evidence register"
            note="Twelve files, ranked as the board order requires: bank and signed contracts first, then third-party invoices, then warehouse and delivery records, then internal operations, then management spreadsheets, then email and unsupported claims. Where files conflict the stronger source wins, and the conflict is recorded rather than smoothed away."
          />
          <div className="card">
            <div className="tbl-scroll">
              <table>
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Kind</th>
                    <th>Weight</th>
                    <th>What it establishes</th>
                  </tr>
                </thead>
                <tbody>
                  {evidenceRegister
                    .slice()
                    .sort((a, b) => a.rank - b.rank)
                    .map((e) => (
                      <tr key={e.id}>
                        <td className="mono" style={{ fontSize: 13 }}>
                          {e.file}
                        </td>
                        <td>{e.kind}</td>
                        <td>
                          <span
                            className={
                              e.reliability === "strong"
                                ? "tag ok"
                                : e.reliability === "medium"
                                  ? "tag warn"
                                  : "tag bad"
                            }
                          >
                            {e.reliability}
                          </span>
                        </td>
                        <td>
                          {e.summary}
                          {e.contradicts ? (
                            <span className="note">
                              <strong style={{ color: "var(--alarm)" }}>Conflict.</strong>{" "}
                              {e.contradicts}
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 style={{ marginTop: 34, marginBottom: 4 }}>
            Six instructions embedded in the evidence, and why none was followed
          </h3>
          <p className="sec-note" style={{ gridColumn: "auto", marginBottom: 18 }}>
            These sentences are written to steer whoever reads the file. They are untrusted case
            content. Each is recorded as evidence of management override risk and refused.
          </p>
          {injectionAttempts.map((a) => (
            <div className="callout bad" key={a.id}>
              <p className="quote">&ldquo;{a.quote}&rdquo;</p>
              <p className="src" style={{ marginTop: 8 }}>
                {a.source}
              </p>
              <p style={{ marginTop: 10 }}>{a.response}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead
            id="schedules"
            num="07"
            title="Supporting schedules"
            note="Seven schedules built first, then used to produce the statements. Each carries its own arithmetic proof, so any figure can be recomputed without trusting the one above it."
          />
          {schedules.map((s) => (
            <div className="card" key={s.id}>
              <div className="card-head">
                <span className="did">{s.id}</span>
                <h3 style={{ margin: 0 }}>{s.title}</h3>
              </div>
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
              <p className="note" style={{ marginTop: 14 }}>
                <strong style={{ color: "var(--ink-2)" }}>Proof.</strong> {s.proof}
              </p>
            </div>
          ))}

          <div className="card">
            <div className="card-head">
              <span className="did">S0</span>
              <h3 style={{ margin: 0 }}>Opening balance sheet at 1 January 2026</h3>
            </div>
            <p className="note" style={{ marginBottom: 14 }}>
              Two of these balances appear nowhere in the data room and had to be derived. Trade
              payables of 45,000 come from the supplier roll-forward: three suppliers reconcile
              exactly to their bank payments, but Event Things Europe was paid 45,000 more than its
              current-period activity, which can only have discharged a balance brought forward.
              Interest payable of nil comes from the interest roll-forward against the bank-confirmed
              closing accrual of 2,000. Opening equity of 170,000 is then a residual — and the fact
              that it later reconciles exactly to closing equity of 132,000 is a genuine cross-check,
              not a restatement.
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

      <section>
        <div className="wrap">
          <SectionHead id="trail" num="08" title="AI review trail" note={agentProtocol.method} />
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
                      <td className="num" style={{ color: "var(--ink-3)" }}>
                        {c.agent1}
                      </td>
                      <td className="num" style={{ color: "var(--ink-3)" }}>
                        {c.agent2}
                      </td>
                      <td className="num" style={{ fontWeight: 600 }}>
                        {c.certified}
                      </td>
                      <td>
                        <span className={c.agreed ? "tag ok" : "tag warn"}>
                          {c.agreed ? "agreed" : "differed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 style={{ marginTop: 34, marginBottom: 14 }}>
            The three points where the analyses genuinely differed
          </h3>
          {agentDisagreements.map((d) => (
            <div className="card" key={d.id}>
              <div className="card-head">
                <span className="did">{d.id}</span>
                <h3 style={{ margin: 0, flex: "1 1 260px" }}>{d.topic}</h3>
                <span className="tag ok">no profit effect</span>
              </div>
              <div className="trail">
                <div>
                  <div className="h">Agent 1</div>
                  <p style={{ margin: 0, color: "var(--ink-2)" }}>{d.agent1Position}</p>
                </div>
                <div>
                  <div className="h">Agent 2</div>
                  <p style={{ margin: 0, color: "var(--ink-2)" }}>{d.agent2Position}</p>
                </div>
              </div>
              <div className="dblock final">
                <div className="h">How I resolved it</div>
                <p>{d.resolution}</p>
              </div>
              <div className="chips">
                {d.relatedDecisions.map((r) => (
                  <a className="chip" key={r} href={`#${r}`}>
                    {r}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <h3 style={{ marginTop: 34, marginBottom: 6 }}>The 25 material judgments</h3>
          <p className="sec-note" style={{ gridColumn: "auto", marginBottom: 16 }}>
            Each records the first AI proposal, the independent second analysis, my certified answer
            and reasoning, the statement effect and whether I overrode the AI. I overrode it on{" "}
            {overrides.length}: {overrides.map((o) => o.id).join(", ")}.
          </p>
          {materialJudgments.map((d) => (
            <DecisionCard key={d.id} decision={d} full />
          ))}
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead
            id="decisions"
            num="09"
            title="All 100 decisions"
            note="Search the full text of every decision, or filter by tier, category and flag. Each record carries its certified answer, the evidence it rests on and a confidence rating."
          />
          <DecisionBrowser decisions={decisions} />
        </div>
      </section>

      <footer>
        <div className="wrap">
          Case DPI-HT-01 · Divorce Party International Ltd. · reporting date {reportingDate} ·{" "}
          {currency} · VAT and corporate income tax out of scope.
          <br />
          Assessor views: <Link href="/review">/review</Link> and{" "}
          <a href="/submission.json">/submission.json</a>.
        </div>
      </footer>
    </>
  );
}
