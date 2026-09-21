"use client";

import { useMemo, useState } from "react";
import type { Decision } from "@/data/types";
import { DecisionCard } from "@/components/DecisionCard";

type TierFilter = "all" | "material_judgment" | "operational";
type FlagFilter = "all" | "override" | "disagreed" | "notHigh";

const categories = [
  ["all", "Any area"],
  ["evidence_matching", "Evidence"],
  ["classification", "Classification"],
  ["estimation", "Estimation"],
  ["board_decision", "Board"],
] as const;

export function DecisionBrowser({ decisions }: { decisions: Decision[] }) {
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState<TierFilter>("all");
  const [category, setCategory] = useState<string>("all");
  const [flag, setFlag] = useState<FlagFilter>("all");

  const counts = useMemo(
    () => ({
      material: decisions.filter((d) => d.reviewTier === "material_judgment").length,
      operational: decisions.filter((d) => d.reviewTier === "operational").length,
      override: decisions.filter((d) => d.changedFromAI === true).length,
      disagreed: decisions.filter((d) => d.agentsDisagreed === true).length,
      notHigh: decisions.filter((d) => d.confidence !== "high").length,
      byCategory: (c: string) =>
        c === "all" ? decisions.length : decisions.filter((d) => d.category === c).length,
    }),
    [decisions],
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return decisions.filter((d) => {
      if (tier !== "all" && d.reviewTier !== tier) return false;
      if (category !== "all" && d.category !== category) return false;
      if (flag === "override" && d.changedFromAI !== true) return false;
      if (flag === "disagreed" && d.agentsDisagreed !== true) return false;
      if (flag === "notHigh" && d.confidence === "high") return false;
      if (!q) return true;
      return [
        d.id,
        d.question,
        d.answer,
        d.studentReasoning ?? "",
        d.aiProposal ?? "",
        d.independentChallenge ?? "",
        d.evidence.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [decisions, query, tier, category, flag]);

  return (
    <div>
      <div className="browser-bar">
        <input
          className="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 100 decisions by id, question, reasoning or evidence — try “villa”, “D075”, “liquidator”"
          aria-label="Search decisions"
        />
        <div className="filter-row">
          <button
            className="fbtn"
            aria-pressed={tier === "all"}
            onClick={() => setTier("all")}
            type="button"
          >
            Every tier<span className="n">{decisions.length}</span>
          </button>
          <button
            className="fbtn"
            aria-pressed={tier === "material_judgment"}
            onClick={() => setTier("material_judgment")}
            type="button"
          >
            Material<span className="n">{counts.material}</span>
          </button>
          <button
            className="fbtn"
            aria-pressed={tier === "operational"}
            onClick={() => setTier("operational")}
            type="button"
          >
            Operational<span className="n">{counts.operational}</span>
          </button>

          <span className="filter-sep" />

          {categories.map(([value, label]) => (
            <button
              key={value}
              className="fbtn"
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
              type="button"
            >
              {label}
              <span className="n">{counts.byCategory(value)}</span>
            </button>
          ))}

          <span className="filter-sep" />

          <button
            className="fbtn"
            aria-pressed={flag === "override"}
            onClick={() => setFlag(flag === "override" ? "all" : "override")}
            type="button"
          >
            Overrode AI<span className="n">{counts.override}</span>
          </button>
          <button
            className="fbtn"
            aria-pressed={flag === "disagreed"}
            onClick={() => setFlag(flag === "disagreed" ? "all" : "disagreed")}
            type="button"
          >
            Agents differed<span className="n">{counts.disagreed}</span>
          </button>
          <button
            className="fbtn"
            aria-pressed={flag === "notHigh"}
            onClick={() => setFlag(flag === "notHigh" ? "all" : "notHigh")}
            type="button"
          >
            Below high confidence<span className="n">{counts.notHigh}</span>
          </button>

          <span className="result-count">
            {shown.length} shown
          </span>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="empty">Nothing matches that filter.</p>
      ) : (
        shown.map((d) => <DecisionCard key={d.id} decision={d} />)
      )}
    </div>
  );
}
