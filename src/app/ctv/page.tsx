import { ArrowLink, CtaBand, Eyebrow, PageHero, ProcessList, TextLink } from "@/components/brand";
import { FaqList } from "@/components/faq-list";
import { pathPages } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expanding into CTV",
  description: "Reach your audience across streaming with a connected media mix.",
};

const page = pathPages.ctv;

export default function Page() {
  return (
    <>
      <PageHero
        crumb={page.label}
        eyebrow={page.label}
        title={
          <>
            Reach your audience
            <br />
            <span className="text-[#002d72]">across streaming.</span>
          </>
        }
        description={page.description}
        action={<ArrowLink href="/contact" variant="navy">Talk about your TV strategy</ArrowLink>}
      />
      <section className="bg-[#10141d] px-[var(--pad)] py-16 text-white">
        <Eyebrow className="text-[#c0caff]">Audience planning</Eyebrow>
        <h2 className="mt-4 font-heading text-4xl tracking-[-0.05em]">Explore a connected media mix.</h2>
        <p className="mt-3 text-[#aeb4c0]">A typical plan can expand across viewing environments.</p>
        <div className="mt-8 flex h-24 overflow-hidden rounded-md">
          <div className="grid flex-[65] place-items-center bg-[#002d72]">Linear</div>
          <div className="grid flex-[15] place-items-center bg-[#406295] text-center text-sm">Premium streaming</div>
          <div className="grid flex-[12] place-items-center bg-[#7f96b8] text-center text-sm text-[#091837]">Live sports</div>
          <div className="grid flex-[8] place-items-center bg-[#bfcadc] text-center text-sm text-[#091837]">FAST</div>
        </div>
        <p className="mt-4 text-xs text-[#a6aebf]">Illustrative mix for exploring the design. Your media plan is tailored to your audience and objectives.</p>
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
