import { ArrowLink, CtaBand, Eyebrow, PageHero, ProcessList, TextLink } from "@/components/brand";
import { FaqList } from "@/components/faq-list";
import { pathPages } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Converged TV",
  description: "One strategy for linear TV and streaming, with shared measurement.",
};

const page = pathPages["converged-tv"];

export default function Page() {
  return (
    <>
      <PageHero
        crumb={page.label}
        eyebrow={page.label}
        title={
          <>
            One strategy for
            <br />
            <span className="text-[#002d72]">linear TV and streaming.</span>
          </>
        }
        description={page.description}
        action={<ArrowLink href="/contact" variant="navy">Talk about your TV strategy</ArrowLink>}
      />
      <section className="bg-[#10141d] px-[var(--pad)] py-16 text-white">
        <Eyebrow className="text-[#c0caff]">A shared view of performance</Eyebrow>
        <h2 className="mt-4 font-heading text-4xl tracking-[-0.05em]">Plan across the whole picture.</h2>
        <p className="mt-3 text-[#aeb4c0]">Audience insight connects each channel to a common business objective.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Linear TV", "Scale + reach"],
            ["02", "Streaming", "Precision + additional reach"],
            ["03", "Accutrak®", "Attribution + optimization"],
          ].map(([n, title, body]) => (
            <div key={title} className="rounded-md border border-white/20 p-6 text-center">
              <span className="text-xs text-[#7498ff]">{n}</span>
              <strong className="mt-3 block font-heading text-2xl">{title}</strong>
              <small className="text-[#aab7d2]">{body}</small>
            </div>
          ))}
        </div>
      </section>
      <section className="px-[var(--pad)] py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <h2 className="font-heading text-[clamp(2rem,3.6vw,3.4rem)] tracking-[-0.05em]">{page.heading}</h2>
          <div>
            <p className="text-lg text-[#636a77]">{page.copy}</p>
            <TextLink href="/measurement" className="mt-6 text-[#002d72]">Explore our measurement approach</TextLink>
          </div>
        </div>
      </section>
      <section className="bg-white px-[var(--pad)] py-16">
        <Eyebrow className="text-[#002d72]">How we approach it</Eyebrow>
        <h2 className="mt-4 mb-10 font-heading text-[clamp(2rem,3.4vw,3.4rem)] tracking-[-0.05em]">A strategy you can act on.</h2>
        <ProcessList steps={page.steps} />
      </section>
      <section className="px-[var(--pad)] py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow className="text-[#002d72]">Your questions</Eyebrow>
            <h2 className="mt-5 font-heading text-[clamp(2rem,3.4vw,3.2rem)] tracking-[-0.05em]">A useful place to start.</h2>
          </div>
          <FaqList items={page.faqs} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
