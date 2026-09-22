import type { Decision } from "@/data/types";
import { signed } from "@/components/Money";

const confidenceTag = (c: Decision["confidence"]) =>
  c === "high" ? "tag ok" : c === "medium" ? "tag warn" : "tag bad";

function Effect({ decision }: { decision: Decision }) {
  const e = decision.statementEffect;
  if (!e) return null;
  const cells: [string, number | null][] = [
    ["Profit", e.profit],
    ["Cash", e.cash],
    ["Assets", e.assets],
    ["Liabilities", e.liabilities],
    ["Equity", e.equity],
  ];
  return (
    <div className="dblock">
      <div className="h">Statement effect against the rejected alternative</div>
      <div className="chips">
        {cells.map(([k, v]) => (
          <span key={k} className={`chip ${v === null || v === 0 ? "" : v > 0 ? "up" : "down"}`}>
            <span className="k">{k}</span> {v === null ? "n/a" : signed(v)}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Every decision renders its full certified content in the page text.
 * Nothing is hidden behind a disclosure control: collapsed content is absent
 * from innerText, so an automated reader would not see the work at all.
 *
 * `full` adds the two AI positions, the certification reasoning and the
 * statement effect. Those render once, in the AI review trail, which owns the
 * canonical anchor for each material judgment.
 */
export function DecisionCard({
  decision,
  full = false,
  idPrefix = "",
}: {
  decision: Decision;
  full?: boolean;
  idPrefix?: string;
}) {
  const isMaterial = decision.reviewTier === "material_judgment";
  return (
    <article className="decision" id={`${idPrefix}${decision.id}`}>
      <header className="dhead">
        <span className="did">{decision.id}</span>
        <h4 className="dq">{decision.question}</h4>
        {isMaterial ? <span className="tag solid">material judgment</span> : null}
        {decision.changedFromAI ? <span className="tag warn">overrode AI</span> : null}
        {decision.agentsDisagreed ? <span className="tag bad">agents differed</span> : null}
        <span className={confidenceTag(decision.confidence)}>{decision.confidence} confidence</span>
      </header>

      <div className="dbody">
        <div className="dblock final">
          <div className="h">Certified answer</div>
          <p>{decision.answer}</p>
        </div>

        {full && decision.aiProposal && decision.independentChallenge ? (
          <div className="trail">
            <div>
              <div className="h">Agent 1 · first AI proposal</div>
              <p>{decision.aiProposal}</p>
            </div>
            <div>
              <div className="h">Agent 2 · independent analysis</div>
              <p>{decision.independentChallenge}</p>
            </div>
          </div>
        ) : null}

        {full && decision.studentReasoning ? (
          <div className="dblock final">
            <div className="h">My reasoning and certification</div>
            <p>{decision.studentReasoning}</p>
          </div>
        ) : null}

        {full ? <Effect decision={decision} /> : null}

        <div className="dblock">
          <div className="h">Evidence</div>
          <div className="chips">
            {decision.evidence.map((e) => (
              <span key={e} className="chip">
                {e}
              </span>
            ))}
            {!full && isMaterial ? (
              <a className="chip up" href={`#${decision.id}`}>
                full review record
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
