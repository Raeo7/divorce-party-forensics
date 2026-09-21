import { fmt } from "@/components/Money";

/** Low / best / high estimate shown on a shared scale, with the certified point marked. */
export function RangeBar({ low, best, high }: { low: number; best: number; high: number }) {
  const span = high - low;
  const pad = span === 0 ? Math.max(high * 0.25, 1) : span * 0.35;
  const min = low - pad;
  const max = high + pad;
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div className="range">
      <div className="range-track">
        <span
          className="range-span"
          style={{ left: `${pct(low)}%`, width: `${Math.max(pct(high) - pct(low), 0.6)}%` }}
        />
        <span className="range-best" style={{ left: `${pct(best)}%` }} />
      </div>
      <div className="range-scale">
        <span>{fmt(low)}</span>
        <span className="mono" style={{ color: "var(--ink)", fontWeight: 600 }}>
          {fmt(best)} certified
        </span>
        <span>{fmt(high)}</span>
      </div>
    </div>
  );
}
