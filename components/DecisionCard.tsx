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
          <span
            key={k}
            className={`chip ${v === null || v === 0 ? "" : v > 0 ? "up" : "down"}`}
          >
            <span className="k">{k}</span> {v === null ? "n/a" : signed(v)}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DecisionCard({ decision, open = false }: { decision: Decision; open?: boolean }) {
  const isMaterial = decision.reviewTier === "material_judgment";
  return (
    <details className="decision" open={open} id={decision.id}>
      <summary>
        <span className="did">{decision.id}</span>
        <span className="dq">{decision.question}</span>
        {isMaterial ? <span className="tag solid">material</span> : null}
        {decision.changedFromAI ? <span className="tag warn">overrode AI</span> : null}
        {decision.agentsDisagreed ? <span className="tag bad">agents differed</span> : null}
        <span className={confidenceTag(decision.confidence)}>{decision.confidence}</span>
      </summary>
      <div className="dbody">
        <div className="dblock final">
          <div className="h">Certified answer</div>
          <p>{decision.answer}</p>
        </div>

        {isMaterial && decision.aiProposal && decision.independentChallenge ? (
          <div className="trail">
            <div>
              <div className="h">Agent 1 · first proposal</div>
              <p style={{ margin: 0, color: "var(--ink-2)" }}>{decision.aiProposal}</p>
            </div>
            <div>
              <div className="h">Agent 2 · independent analysis</div>
              <p style={{ margin: 0, color: "var(--ink-2)" }}>{decision.independentChallenge}</p>
            </div>
          </div>
        ) : null}

        {isMaterial && decision.studentReasoning ? (
          <div className="dblock final">
            <div className="h">My reasoning and certification</div>
            <p>{decision.studentReasoning}</p>
          </div>
        ) : null}

        <Effect decision={decision} />

        <div className="dblock">
          <div className="h">Evidence</div>
          <div className="chips">
            {decision.evidence.map((e) => (
              <span key={e} className="chip">
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
}
