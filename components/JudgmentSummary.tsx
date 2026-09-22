import type { Decision } from "@/data/types";
import { signed } from "@/components/Money";

/** First sentence of the certified answer, for the at-a-glance table. */
const headline = (answer: string): string => {
  const end = answer.search(/\.\s/);
  return end === -1 ? answer : answer.slice(0, end + 1);
};

/**
 * All 25 material judgments in one scannable table, placed early in the report.
 * A reader who never reaches the full trail still gets every certified position,
 * its profit effect and its confidence.
 */
export function JudgmentSummary({ judgments }: { judgments: Decision[] }) {
  return (
    <div className="card">
      <div className="tbl-scroll">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Judgment</th>
              <th>Certified position</th>
              <th className="num">Profit effect</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {judgments.map((d) => (
              <tr key={d.id}>
                <td>
                  <a className="did" href={`#${d.id}`}>
                    {d.id}
                  </a>
                </td>
                <td>
                  {d.question}
                  {d.changedFromAI ? (
                    <span className="note">Overrode the first AI answer.</span>
                  ) : null}
                </td>
                <td style={{ color: "var(--ink-2)" }}>{headline(d.answer)}</td>
                <td className="num">
                  {d.statementEffect?.profit === null || d.statementEffect?.profit === undefined
                    ? "n/a"
                    : signed(d.statementEffect.profit)}
                </td>
                <td>
                  <span
                    className={
                      d.confidence === "high" ? "tag ok" : d.confidence === "medium" ? "tag warn" : "tag bad"
                    }
                  >
                    {d.confidence}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
