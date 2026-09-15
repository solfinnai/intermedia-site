import { Eyebrow, TextLink } from "@/components/brand";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/data";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Let’s Talk",
  description: "Tell us a little about your brand and what you want to achieve.",
};

export default function Page() {
  return (
    <section className="px-[var(--pad)] pt-16 pb-24">
      <p className="mb-10 flex gap-3 text-xs text-[#636a77]">
        <Link href="/" className="hover:text-[#002d72]">Home</Link>
        <span>/</span>
        <span>Let’s talk</span>
      </p>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow className="text-[#002d72]">Start a conversation</Eyebrow>
          <h1 className="mt-5 font-heading text-[clamp(3rem,6vw,6rem)] leading-[1.05] tracking-[-0.065em]">
            Where do you
            <br />
            want to <span className="text-[#002d72]">grow?</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-[#636a77]">
            Tell us a little about your brand and what you want to achieve. We’ll help you work through the next step.
          </p>
          <TextLink href={`mailto:${site.email}`} className="mt-8 text-[#002d72]" external>
            {site.email}
          </TextLink>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
