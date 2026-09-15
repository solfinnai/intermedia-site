import { CtaBand, Eyebrow, PageHero } from "@/components/brand";
import { FaqList } from "@/components/faq-list";
import { NewsletterBand } from "@/components/media";
import { beliefs, faqs, team, timeline } from "@/lib/data";
import Image from "next/image";

export function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About us"
        eyebrow="About InterMedia"
        title={
          <>
            Independent media expertise
            <br />
            <span className="text-[#002d72]">since 1974.</span>
          </>
        }
        description="Five decades of helping brands grow through accountable media, informed strategy, and measurable results."
      />

      <section className="grid items-center gap-12 px-[var(--pad)] pb-16 lg:grid-cols-[1fr_minmax(280px,460px)]">
        <div>
          <Eyebrow className="text-[#002d72]">Our agency</Eyebrow>
          <h2 className="mt-5 font-heading text-[clamp(2rem,3.6vw,3.6rem)] tracking-[-0.05em]">
            Specialists working as one team.
          </h2>
          <p className="mt-4 max-w-lg text-[#636a77]">
            Media buyers, strategists, analysts, and creative teams work together around your campaign objectives.
          </p>
        </div>
        <figure>
          <Image
            src="/brand/intermedia-office.png"
            alt="InterMedia office building with the original InterMedia sign"
            width={680}
            height={453}
            className="w-full rounded-md object-cover"
          />
          <figcaption className="mt-3 text-sm text-[#636a77]">InterMedia Advertising</figcaption>
        </figure>
      </section>

      <section className="px-[var(--pad)] pb-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <h2 className="font-heading text-[clamp(2rem,3.6vw,3.4rem)] tracking-[-0.05em]">
            Experience that keeps developing.
          </h2>
          <div>
            <p className="text-lg text-[#636a77]">
              InterMedia has evolved alongside television, expanding its roots in direct response into an integrated agency spanning TV, streaming, digital, creative, and analytics.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <strong className="font-heading text-5xl tracking-[-0.06em] text-[#002d72]">50+</strong>
                <span className="mt-2 block text-sm text-[#636a77]">Years of media expertise</span>
              </div>
              <div>
                <strong className="font-heading text-5xl tracking-[-0.06em] text-[#002d72]">1974</strong>
                <span className="mt-2 block text-sm text-[#636a77]">Founded by Syd Yallen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-[var(--pad)] py-20" id="team">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow className="text-[#002d72]">The people behind the work</Eyebrow>
            <h2 className="mt-4 font-heading text-[clamp(2.2rem,4vw,4rem)] tracking-[-0.055em]">Meet InterMedia.</h2>
          </div>
          <p className="max-w-sm text-[#636a77]">Expertise across strategy, media, creative, analytics, and operations.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          {team.map((person) => (
            <article key={person.name}>
              <div className="relative mb-4 aspect-[4/4.4] overflow-hidden rounded-md bg-[#dfe4ec]">
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="(max-width: 700px) 50vw, 25vw"
                    className="object-cover object-top grayscale transition duration-500 hover:scale-[1.04] hover:grayscale-0"
                  />
                ) : (
                  <div className="grid h-full place-items-center bg-[#e4e8ef] px-4 text-center">
                    <div>
                      <span className="font-heading text-5xl text-[#082b64]">
                        {person.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </span>
                      <p className="mt-3 text-[11px] tracking-[0.12em] text-[#636a77] uppercase">Photo placeholder</p>
                    </div>
                  </div>
                )}
              </div>
              <h3 className="font-heading text-[21px] tracking-[-0.03em]">{person.name}</h3>
              <p className="mt-1 text-[13px] text-[#636a77]">{person.role}</p>
              {"placeholder" in person && person.placeholder ? (
                <p className="mt-2 text-[11px] leading-snug text-[#8a93a3]">{person.note}</p>
              ) : null}
            </article>
          ))}
        </div>
        <p className="mt-8 text-xs text-[#8a93a3]">
          Headshots display in black and white, then in color on hover. Christina LaMair and Derek Shipp are listed from public InterMedia materials and do not yet have matching portraits.
        </p>
      </section>

      <section className="bg-[#f4f6f8] px-[var(--pad)] py-16" id="faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow className="text-[#002d72]">Frequently asked</Eyebrow>
            <h2 className="mt-5 font-heading text-[clamp(2rem,3.6vw,3.6rem)] tracking-[-0.05em]">
              Get to know
              <br />
              performance TV.
            </h2>
            <a href="#stay-connected" className="mt-8 inline-flex min-h-12 items-center rounded-[5px] bg-[#002d72] px-5 text-sm font-semibold text-white">
              Stay connected
            </a>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <section id="stay-connected">
        <NewsletterBand />
        <div className="grid gap-5 bg-white px-[var(--pad)] py-14 md:grid-cols-3">
          <a href="https://intermedia.beehiiv.com/subscribe" target="_blank" rel="noopener noreferrer" className="flex min-h-[210px] flex-col rounded-md border border-[#d9dce3] p-7">
            <h3 className="font-heading text-[29px] tracking-[-0.04em]">AdGrowth Weekly</h3>
            <p className="mt-3 text-[15px] text-[#636a77]">Ideas and observations on performance marketing.</p>
            <span className="mt-auto pt-6 font-semibold">Read and subscribe ↗</span>
          </a>
          <a href="https://www.linkedin.com/company/intermedia-advertising/" target="_blank" rel="noopener noreferrer" className="flex min-h-[210px] flex-col rounded-md border border-[#d9dce3] p-7">
            <h3 className="font-heading text-[29px] tracking-[-0.04em]">LinkedIn</h3>
            <p className="mt-3 text-[15px] text-[#636a77]">Conversations, agency updates, and industry perspectives.</p>
            <span className="mt-auto pt-6 font-semibold">Follow InterMedia ↗</span>
          </a>
          <a href="https://www.instagram.com/intermediaadv/" target="_blank" rel="noopener noreferrer" className="flex min-h-[210px] flex-col rounded-md border border-[#d9dce3] p-7">
            <h3 className="font-heading text-[29px] tracking-[-0.04em]">Behind the scenes</h3>
            <p className="mt-3 text-[15px] text-[#636a77]">See the work and the people who bring it to life.</p>
            <span className="mt-auto pt-6 font-semibold">Explore Instagram ↗</span>
          </a>
        </div>
      </section>

      <section className="px-[var(--pad)] py-16">
        <Eyebrow className="text-[#002d72]">What we believe</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-heading text-[clamp(2rem,3.4vw,3.2rem)] tracking-[-0.05em]">
          TV advertising should work harder, and be more accessible.
        </h2>
        <ul className="mt-8 max-w-2xl space-y-4">
          {beliefs.map((item) => (
            <li key={item} className="border-t border-[#d9dce3] pt-4 text-[#636a77]">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white px-[var(--pad)] py-16">
        <Eyebrow className="text-[#002d72]">Our evolution</Eyebrow>
        <h2 className="mt-4 font-heading text-[clamp(2rem,3.6vw,3.6rem)] tracking-[-0.05em]">Built through every era of television.</h2>
        <div className="mt-10 flex gap-8 overflow-auto pb-4">
          {timeline.map((item) => (
            <article key={item.year} className="min-w-[260px] border-t border-[#c7cfdf] pt-6">
              <strong className="font-heading text-5xl tracking-[-0.06em] text-[#002d72]">{item.year}</strong>
              <h3 className="mt-4 font-heading text-xl">{item.title}</h3>
              <p className="mt-3 text-sm text-[#636a77]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
