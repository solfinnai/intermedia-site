import { CtaBand, Eyebrow, PageHero, ProcessList, TextLink } from "@/components/brand";
import { FaqList } from "@/components/faq-list";
import { DashboardExplorer } from "@/components/dashboard-explorer";
import { caseStudies, measurementProcess, measurementUses } from "@/lib/data";
import { CaseOpenButton } from "@/components/case-dialog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Measurement",
  description: "Accutrak® connects exposure to outcomes across linear and CTV.",
};

export default function Page() {
  const featured = [caseStudies[0], caseStudies[3]];
  return (
    <>
      <PageHero
        crumb="Measurement"
        eyebrow="Measurement"
        title={
          <>
            See what’s driving
            <br />
            <span className="text-[#002d72]">your growth.</span>
          </>
        }
        description="Accutrak® connects exposure to outcomes across linear and CTV. Understand the contribution of your media, then use the evidence to inform your next investment."
      />
      <section className="px-[var(--pad)] pb-16">
        <DashboardExplorer />
      </section>
      <section className="bg-[#10141d] px-[var(--pad)] py-20 text-white">
        <Eyebrow className="text-[#c0caff]">Linear + CTV attribution</Eyebrow>
        <h2 className="mt-5 max-w-3xl font-heading text-[clamp(2.2rem,4vw,4.2rem)] tracking-[-0.055em]">
          Understand the response behind the numbers.
        </h2>
        <p className="mt-4 max-w-xl text-[#aeb4c0]">Accutrak® isolates incremental response and connects it to the media driving it.</p>
        <div className="mt-12 text-white [&_h3]:text-white [&_li]:border-white/15 [&_p]:text-[#aeb4c0] [&_span]:text-[#89a9ff]">
          <ProcessList steps={measurementProcess} />
        </div>
      </section>
      <section className="px-[var(--pad)] py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow className="text-[#002d72]">Data you can use</Eyebrow>
            <h2 className="mt-5 font-heading text-[clamp(2rem,3.4vw,3.4rem)] tracking-[-0.05em]">Turn measurement into decisions.</h2>
          </div>
          <FaqList items={measurementUses} />
        </div>
      </section>
      <section className="bg-white px-[var(--pad)] py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <Eyebrow className="text-[#002d72]">Measurement in practice</Eyebrow>
            <h2 className="mt-4 font-heading text-[clamp(2rem,3.4vw,3.4rem)] tracking-[-0.05em]">A fuller view of CTV.</h2>
          </div>
          <TextLink href="/results" className="text-[#002d72]">All case studies</TextLink>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((item) => (
            <article key={item.id} className="flex min-h-[320px] flex-col rounded-md border border-[#d9dce3] bg-white p-7">
              <span className="text-[12px] font-semibold tracking-[0.12em]">{item.category}</span>
              <div className="mt-6 font-heading text-6xl tracking-[-0.07em]">{item.metric}</div>
              <div className="mt-2">{item.unit}</div>
              <p className="mt-4 mb-6 text-sm text-[#636a77]">{item.body}</p>
              <CaseOpenButton id={item.id} label="Explore the case study" className="mt-auto h-auto justify-between px-0" />
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Make your next decision with better evidence." />
    </>
  );
}
