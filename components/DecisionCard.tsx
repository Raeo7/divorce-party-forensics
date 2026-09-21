import type { Decision } from "@/data/types";
import { signed } from "@/components/Money";

const confidencePill = (c: Decision["confidence"]) =>
  c === "high" ? "pill ok" : c === "medium" ? "pill warn" : "pill bad";

function EffectRow({ decision }: { decision: Decision }) {
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
      <div className="h">Statement effect versus the rejected alternative</div>
      <div className="chips">
        {cells.map(([k, v]) => (
          <span key={k} className="chip">
            {k} {v === null ? "n/a" : signed(v)}
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
        {isMaterial ? <span className="pill accent">material</span> : null}
        {decision.changedFromAI ? <span className="pill warn">overrode AI</span> : null}
        {decision.agentsDisagreed ? <span className="pill bad">agents differed</span> : null}
        <span className={confidencePill(decision.confidence)}>{decision.confidence}</span>
      </summary>
      <div className="dbody">
        <div className="dblock final">
          <div className="h">Certified answer</div>
          <p>{decision.answer}</p>
        </div>
        {isMaterial && decision.aiProposal ? (
          <div className="dblock">
            <div className="h">First AI proposal (Agent 1)</div>
            <p>{decision.aiProposal}</p>
          </div>
        ) : null}
        {isMaterial && decision.independentChallenge ? (
          <div className="dblock">
            <div className="h">Independent second analysis (Agent 2)</div>
            <p>{decision.independentChallenge}</p>
          </div>
        ) : null}
        {isMaterial && decision.studentReasoning ? (
          <div className="dblock final">
            <div className="h">My reasoning and certification</div>
            <p>{decision.studentReasoning}</p>
          </div>
        ) : null}
        <EffectRow decision={decision} />
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
