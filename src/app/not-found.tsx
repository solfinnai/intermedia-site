import { ArrowLink } from "@/components/brand";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-start justify-center px-[var(--pad)] py-24">
      <p className="text-xs font-semibold tracking-[0.16em] text-[#002d72] uppercase">Page not found</p>
      <h1 className="mt-4 font-heading text-[clamp(2.8rem,6vw,5.5rem)] tracking-[-0.06em]">
        This page isn’t on the plan.
      </h1>
      <p className="mt-5 max-w-md text-[#636a77]">
        The page you’re looking for doesn’t exist, or the link has moved. Return home or start a conversation with the team.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <ArrowLink href="/" variant="navy">Back to InterMedia</ArrowLink>
        <ArrowLink href="/contact" variant="dark">Let’s talk</ArrowLink>
      </div>
    </section>
  );
}
