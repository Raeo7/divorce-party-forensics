import type { StatementLine } from "@/data/types";
import { Money } from "@/components/Money";

export function Statement({ title, lines }: { title: string; lines: StatementLine[] }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="tbl-scroll">
        <table className="narrow">
          <tbody>
            {lines.map((l) => (
              <tr
                key={l.label}
                className={
                  l.level === "total" ? "row-total" : l.level === "subtotal" ? "row-subtotal" : undefined
                }
              >
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
  );
}
