import { ArrowLink, CtaBand, Eyebrow, PageHero, ProcessList, TextLink } from "@/components/brand";
import { FaqList } from "@/components/faq-list";
import { pathPages } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New to TV",
  description: "Give your brand room to grow with a measured first TV campaign.",
};

const page = pathPages["new-to-tv"];

export default function Page() {
  return (
    <>
      <PageHero
        crumb={page.label}
        eyebrow={page.label}
        title={
          <>
            Give your brand
            <br />
            <span className="text-[#002d72]">room to grow.</span>
          </>
        }
        description={page.description}
        action={<ArrowLink href="/contact" variant="navy">Talk about your TV strategy</ArrowLink>}
      />
      <section className="bg-[#10141d] px-[var(--pad)] py-16 text-white">
        <h3 className="mb-8 font-heading text-2xl">Explore the role of TV in acquisition.</h3>
        <svg viewBox="0 0 720 340" className="w-full" role="img" aria-label="Conceptual chart showing digital acquisition flattening while a combined digital and TV approach continues to grow">
          {[50, 110, 170, 230, 290].map((y) => (
            <line key={y} x1="30" y1={y} x2="685" y2={y} stroke="#ffffff12" />
          ))}
          <path d="M30 290 C150 260 220 240 310 208 S490 124 685 40 L685 290Z" fill="#4f7cff33" />
          <path d="M30 290 C150 260 205 212 300 201 S550 192 685 192" fill="none" stroke="#7d879a" strokeWidth="3" strokeDasharray="5 7" />
          <path d="M30 290 C150 260 220 240 310 208 S490 124 685 40" fill="none" stroke="#4f7cff" strokeWidth="4" />
          <text x="30" y="325" fill="#9ba7bd" fontSize="12">TEST</text>
          <text x="317" y="325" fill="#9ba7bd" fontSize="12">LEARN</text>
          <text x="647" y="325" fill="#9ba7bd" fontSize="12">SCALE</text>
        </svg>
        <p className="mt-4 text-xs text-[#a6aebf]">Conceptual illustration of the strategy. No forecast or campaign data is represented.</p>
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
