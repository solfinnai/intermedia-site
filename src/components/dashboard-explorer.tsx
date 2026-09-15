"use client";

import { dashboards } from "@/lib/data";
import { cn } from "cn";
import Image from "next/image";
import { useState } from "react";

export function DashboardExplorer() {
  const [index, setIndex] = useState(0);
  const current = dashboards[index];
  return (
    <div className="rounded-lg border border-[#d9dce3] bg-[#e9edf5] p-6 md:p-10">
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Accutrak dashboard views">
        {dashboards.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full border px-4 py-2 text-[13px]",
              i === index ? "border-[#10141d] bg-[#10141d] text-white" : "border-[#d9dce3] bg-white"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-md bg-white">
        <Image src={current.file} alt={current.alt} width={1500} height={760} className="h-auto w-full" />
      </div>
      <p className="mt-4 text-xs text-[#636a77]">Actual dashboard examples supplied by InterMedia. Select a view to explore the reporting.</p>
    </div>
  );
}
