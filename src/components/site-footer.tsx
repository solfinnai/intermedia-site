import { site } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[#f4f6f8] px-[var(--pad)] pt-16 pb-6 text-[#10141d]">
      <div className="mb-12 grid items-center gap-8 md:grid-cols-3">
        <Link href="/" aria-label="InterMedia home">
          <Image src="/brand/intermedia-original.png" alt={site.name} width={240} height={42} className="h-10 w-auto" />
        </Link>
        <p className="text-sm text-[#636a77]">
          Independent media expertise
          <br />
          since 1974.
        </p>
        <div className="flex flex-col gap-1 md:items-end">
          <Link href="/contact" className="font-heading text-xl tracking-[-0.03em] hover:text-[#002d72]">
            Start a conversation ↗
          </Link>
          <a href={`mailto:${site.email}`} className="text-sm text-[#636a77]">
            {site.email}
          </a>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-[#d9dce3] py-6 text-[13px]">
        <Link href="/new-to-tv">Find your path</Link>
        <Link href="/measurement">Measurement</Link>
        <Link href="/creative">Creative</Link>
        <Link href="/results">Case studies</Link>
        <Link href="/partnerships">Partnerships</Link>
        <Link href="/about">About us</Link>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
        <a href={site.newsletter} target="_blank" rel="noopener noreferrer">
          AdGrowth Weekly ↗
        </a>
      </div>
      <div className="flex flex-wrap items-center gap-4 border-t border-[#d9dce3] pt-5 text-xs text-[#636a77]">
        <span>© 2026 InterMedia Advertising. All rights reserved.</span>
        <span className="md:ml-auto">PHASE 2 · CONCEPT 05 / BLENDED VIDEO</span>
        <a href="#main" className="hover:text-[#002d72]">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
