"use client";

import { CaseOpenButton } from "@/components/case-dialog";
import { caseStudies } from "@/lib/data";
import { cn } from "cn";
import { useMemo, useState } from "react";

export function ResultsGrid() {
  const [filter, setFilter] = useState<"All results" | "Media" | "Measurement">("All results");
  const items = useMemo(
    () => (filter === "All results" ? caseStudies : caseStudies.filter((item) => item.filter === filter)),
    [filter]
  );

  return (
    <section className="px-[var(--pad)] pb-16">
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter case studies">
        {(["All results", "Media", "Measurement"] as const).map((label) => (
          <button
            key={label}
            type="button"
            aria-pressed={filter === label}
            onClick={() => setFilter(label)}
            className={cn(
              "rounded-full border px-4 py-2 text-[13px]",
              filter === label ? "border-[#10141d] bg-[#10141d] text-white" : "border-[#d9dce3] bg-white"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mb-6 text-sm text-[#636a77]">{items.length} case studies</p>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, i) => (
          <article
            key={item.id}
            className={cn(
              "flex min-h-[385px] flex-col rounded-md border p-7",
              i === 0 && filter === "All results" ? "border-[#002d72] bg-[#002d72] text-white" : "border-[#d9dce3] bg-white"
            )}
          >
            <span className="text-[12px] font-semibold tracking-[0.12em]">{item.category}</span>
            <div className="mt-6 font-heading text-[clamp(3.6rem,5vw,5.8rem)] leading-none tracking-[-0.07em]">{item.metric}</div>
            <div className="mt-3 text-lg">{item.unit}</div>
            <p className={cn("mt-4 mb-6 text-sm leading-relaxed", i === 0 && filter === "All results" ? "text-[#dbe5ff]" : "text-[#636a77]")}>
              {item.body}
            </p>
            <CaseOpenButton
              id={item.id}
              label="Explore the case study"
              className={cn(
                "mt-auto h-auto justify-between px-0 hover:bg-transparent",
                i === 0 && filter === "All results" ? "text-white" : "text-[#10141d]"
              )}
            />
          </article>
        ))}
      </div>
      <p className="mt-6 text-xs text-[#636a77]">
        Selected results from individual campaigns. Outcomes vary with the audience, investment, creative, and measurement approach.
      </p>
    </section>
  );
}
