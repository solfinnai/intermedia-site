import { PageHero } from "@/components/brand";
import { CtaBand } from "@/components/brand";
import { ResultsGrid } from "@/components/results-grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore how InterMedia uses media planning, audience targeting, and measurement to improve campaign performance.",
};

export default function Page() {
  return (
    <>
      <PageHero
        crumb="Case studies"
        eyebrow="Case studies"
        title={
          <>
            Campaign results
            <br />
            <span className="text-[#002d72]">you can explore.</span>
          </>
        }
        description="Explore how InterMedia uses media planning, audience targeting, and measurement to improve campaign performance."
      />
      <ResultsGrid />
      <CtaBand />
    </>
  );
}
