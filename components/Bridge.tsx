import type { BridgeStep } from "@/data/financials";
import { fmt, signed } from "@/components/Money";

/**
 * Waterfall from management's claimed profit to the certified figure.
 * Each step's bar spans the gap between the running totals either side of it,
 * so the eye follows the money down the page.
 */
export function Bridge({ steps }: { steps: BridgeStep[] }) {
  const domain = Math.max(...steps.map((s) => s.running));

  return (
    <div className="bridge">
      {steps.map((step, i) => {
        const isFloat = step.delta !== null;
        const prev = steps[i - 1]?.running ?? step.running;
        const lo = isFloat ? Math.min(prev, step.running) : 0;
        const hi = isFloat ? Math.max(prev, step.running) : step.running;

        return (
          <div className={`bridge-row is-${step.kind}`} key={step.label}>
            <div className="bridge-label">
              {step.label}
              <span className="bridge-why">{step.why}</span>
            </div>
            <div className="bridge-track">
              <span
                className={`bridge-bar ${step.kind}`}
                style={{
                  left: `${(lo / domain) * 100}%`,
                  width: `${Math.max((hi - lo) / domain, 0.004) * 100}%`,
                  animationDelay: `${0.25 + i * 0.06}s`,
                }}
              />
            </div>
            <div className="bridge-val">
              {isFloat && step.delta !== null ? signed(step.delta) : fmt(step.running)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
