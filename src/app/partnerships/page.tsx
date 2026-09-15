import { ArrowLink, CtaBand, Eyebrow, PageHero } from "@/components/brand";
import { FaqList } from "@/components/faq-list";
import { partners, partnershipTypes, researchPartners } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnerships",
  description: "Custom partnerships across media, sports, entertainment, talent, and live experiences.",
};

const support = [
  { title: "Specialist partnership development", body: "An experienced team develops sponsorships, integrations, strategic partnerships, and experiential opportunities around your objectives." },
  { title: "Evaluation + measurement", body: "Proprietary tools and methods help evaluate brand alignment, audience fit, costs, and execution. Internal and partner reporting inform future investment." },
  { title: "Negotiation + added support", body: "We lead negotiations and pursue bonus media, promotional support, extensions, and other enhancements to the investment." },
  { title: "Partnership management", body: "We manage partner communication, timelines, deliverables, tracking, and campaign recaps." },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumb="Partnerships"
        eyebrow="Partnerships"
        title={
          <>
            An opportunity built
            <br />
            <span className="text-[#002d72]">around your brand.</span>
          </>
        }
        description="We develop custom partnerships around your audience, objectives, budget, and timing, then coordinate the work through execution."
        action={<ArrowLink href="/contact" variant="navy">Discuss an opportunity</ArrowLink>}
      />
      <section className="bg-[#10141d] px-[var(--pad)] py-20 text-white">
        <div className="grid gap-10 lg:grid-cols-2">
          <h2 className="font-heading text-[clamp(2rem,3.6vw,3.6rem)] tracking-[-0.05em]">Partnerships that fit your audience.</h2>
          <div className="space-y-4 text-[#aeb4c0]">
            <p>Our relationships span media companies, station groups, publishers, sports, entertainment, talent, and live experiences. We identify the partner and structure that fit the individual campaign.</p>
            <p>Each opportunity is evaluated for audience fit, brand alignment, cost, execution, and the outcomes you want to achieve.</p>
          </div>
        </div>
      </section>
      <section className="px-[var(--pad)] py-16">
        <Eyebrow className="text-[#002d72]">What we can create</Eyebrow>
        <h2 className="mt-4 mb-10 font-heading text-[clamp(2rem,3.6vw,3.6rem)] tracking-[-0.05em]">Explore the possibilities for your campaign.</h2>
        <FaqList items={partnershipTypes} />
      </section>
      <section className="bg-white px-[var(--pad)] py-16">
        <Eyebrow className="text-[#002d72]">Relationships across media</Eyebrow>
        <h2 className="mt-4 font-heading text-[clamp(2rem,3.6vw,3.6rem)] tracking-[-0.05em]">Access across the viewing landscape.</h2>
        <div className="mt-10 grid grid-cols-2 border border-[#d9dce3] md:grid-cols-4 lg:grid-cols-5">
          {partners.map((name) => (
            <div key={name} className="grid min-h-24 place-items-center border border-[#d9dce3] bg-[#f4f6f8] p-4 text-center font-heading text-lg font-semibold tracking-[-0.04em] hover:bg-[#002d72] hover:text-white">
              {name}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#636a77]">Selected relationships. Opportunities and availability depend on the individual campaign.</p>
      </section>
      <section className="px-[var(--pad)] py-16">
        <Eyebrow className="text-[#002d72]">Flexible scope</Eyebrow>
        <h2 className="mt-4 font-heading text-[clamp(2rem,3.6vw,3.6rem)] tracking-[-0.05em]">Build the right scale for the objective.</h2>
        <div className="mt-10 grid gap-6 border-t border-[#d9dce3] pt-8 sm:grid-cols-2 lg:grid-cols-5">
          {["Single day activation", "Custom integration", "Seasonal partnership", "Major sports + entertainment", "Multiple years and platforms"].map((item, i) => (
            <div key={item}>
              <small className="text-[#002d72]">0{i + 1}</small>
              <h3 className="mt-4 font-heading text-xl">{item}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="px-[var(--pad)] pb-16">
        <h2 className="mb-8 font-heading text-[clamp(2rem,3.4vw,3.2rem)] tracking-[-0.05em]">Support throughout the partnership.</h2>
        <FaqList items={support} />
      </section>
      <section className="bg-white px-[var(--pad)] py-16">
        <Eyebrow className="text-[#002d72]">Research + measurement partners</Eyebrow>
        <h2 className="mt-4 mb-10 font-heading text-[clamp(2rem,3.6vw,3.6rem)] tracking-[-0.05em]">Research that informs your buying decisions.</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {researchPartners.map((item) => (
            <article key={item.name} className="rounded-md border border-[#d9dce3] p-7">
              <h3 className="font-heading text-2xl">{item.name}</h3>
              <p className="mt-3 text-[#636a77]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Let’s discuss your partnership objectives." />
    </>
  );
}
