import { CtaBand, Eyebrow, ProcessList, TextLink } from "@/components/brand";
import { CreativeGallery } from "@/components/creative-gallery";
import { PlayReelButton } from "@/components/media";
import { creativePhotos, creativeServices, creativeSteps } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative",
  description: "Creative developed for performance. Strategy, production, audits, and testing with Accutrak®.",
};

export default function Page() {
  const hero = creativePhotos.find((item) => item.id === "field-setup")!;
  return (
    <>
      <section className="px-[var(--pad)] pt-16 pb-10">
        <p className="mb-10 flex gap-3 text-xs text-[#636a77]">
          <Link href="/" className="hover:text-[#002d72]">Home</Link>
          <span>/</span>
          <span>Creative</span>
        </p>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow className="text-[#002d72]">Creative + production</Eyebrow>
            <h1 className="mt-5 font-heading text-[clamp(2.8rem,6vw,5.6rem)] leading-[1.05] tracking-[-0.065em]">
              Creative developed
              <br />
              <span className="text-[#002d72]">for performance.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-[#636a77]">
              Develop new advertising, audit existing work, and improve the assets you already have. Our creative team works alongside media buying and measurement throughout the campaign.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <PlayReelButton className="h-12 rounded-[5px] bg-[#002d72] px-5 text-white hover:bg-[#164785]">
                ▶ Play the agency reel
              </PlayReelButton>
              <a href="#creative-gallery" className="font-semibold">Explore the photos ↓</a>
            </div>
          </div>
          <figure>
            <Image src={hero.src} alt={hero.alt} width={960} height={640} className="aspect-[3/2] w-full rounded-md object-cover" priority />
          </figure>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-[#d9dce3] pt-5 text-sm text-[#636a77]">
          <span>STRATEGY · CREATIVE · PRODUCTION · MEASUREMENT</span>
          <p>A coordinated team for every stage of your campaign.</p>
        </div>
      </section>

      <section className="px-[var(--pad)] py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow className="text-[#002d72]">Our creative capabilities</Eyebrow>
            <h2 className="mt-4 font-heading text-[clamp(2rem,3.6vw,3.6rem)] tracking-[-0.05em]">Support throughout the creative process.</h2>
          </div>
          <p className="max-w-sm text-[#636a77]">Build a new campaign or develop the next version of work already in market.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {creativeServices.map((item) => {
            const photo = creativePhotos.find((photo) => photo.id === item.photo)!;
            return (
              <article key={item.number} className="overflow-hidden rounded-md border border-[#d9dce3] bg-white">
                <Image src={photo.src} alt={photo.alt} width={960} height={640} className="aspect-[3/2] w-full object-cover" />
                <div className="p-6">
                  <span className="text-xs text-[#002d72]">{item.number}</span>
                  <h3 className="mt-3 font-heading text-2xl">{item.title}</h3>
                  <p className="mt-3 text-[#636a77]">{item.text}</p>
                  <span className="mt-4 block text-sm text-[#8090a5]">{item.detail}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="creative-gallery" className="bg-white px-[var(--pad)] py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow className="text-[#002d72]">Behind the scenes</Eyebrow>
            <h2 className="mt-4 font-heading text-[clamp(2rem,3.6vw,3.6rem)] tracking-[-0.05em]">On set with InterMedia.</h2>
          </div>
          <p className="max-w-sm text-[#636a77]">A closer look at the crew, talent, and preparation behind the work. Select a photograph to explore all 11 images.</p>
        </div>
        <CreativeGallery />
        <p className="mt-8 text-sm text-[#636a77]">Photography from InterMedia productions, including CarShield campaigns.</p>
      </section>

      <section className="flex flex-col items-start justify-between gap-6 bg-[#0c243c] px-[var(--pad)] py-16 text-white md:flex-row md:items-center">
        <div>
          <Eyebrow className="text-[#adc9e8]">The finished work</Eyebrow>
          <h2 className="mt-4 font-heading text-4xl tracking-[-0.05em]">Watch the agency reel.</h2>
          <p className="mt-3 text-[#adc0d6]">See the creative in motion, with sound and full playback controls.</p>
        </div>
        <PlayReelButton className="h-auto gap-4 bg-white/10 px-5 py-4 text-white hover:bg-white/20">
          <span className="grid size-12 place-items-center rounded-full border border-white/70">▶</span>
          <span className="text-left">
            Play the 2026 reel
            <small className="mt-1 block text-xs text-[#aebed0]">60 seconds · Full HD</small>
          </span>
        </PlayReelButton>
      </section>

      <section className="px-[var(--pad)] py-16">
        <Eyebrow className="text-[#002d72]">Continuous creative testing</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-heading text-[clamp(2rem,3.6vw,3.6rem)] tracking-[-0.05em]">Each campaign informs what we create next.</h2>
        <p className="mt-4 mb-10 text-[#636a77]">Accutrak® connects creative decisions to campaign response.</p>
        <ProcessList steps={creativeSteps} />
        <div className="mt-8 flex flex-wrap gap-8">
          <TextLink href="/measurement" className="text-[#002d72]">Explore measurement</TextLink>
          <TextLink href="/results" className="text-[#002d72]">Explore campaign results</TextLink>
        </div>
      </section>
      <CtaBand title="Let’s develop your next campaign." />
    </>
  );
}
