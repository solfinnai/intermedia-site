"use client";

import { ArrowLink, Eyebrow, SectionIndex, TextLink } from "@/components/brand";
import { CaseOpenButton } from "@/components/case-dialog";
import { HeroVideo, NewsletterBand, PlayReelButton } from "@/components/media";
import { capabilities, caseStudies, measurementSteps } from "@/lib/data";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const homeCases = [...caseStudies].filter((item) => item.featured).sort((a, b) => a.homeOrder - b.homeOrder);
const capabilityKeys = ["media", "measurement", "strategy", "creative", "partnerships"] as const;

export function HomePage() {
  return (
    <>
      <BlendedHero />
      <nav className="sticky top-[80px] z-40 flex min-h-14 items-center gap-8 overflow-auto border-b border-white/20 bg-[#0c243cf2] px-[var(--pad)] text-white backdrop-blur-md md:top-[96px]" aria-label="Homepage sections">
        <span className="hidden text-[12px] tracking-[0.14em] text-[#94adc8] md:inline">EXPLORE INTERMEDIA</span>
        <a href="#approach" className="shrink-0 py-4 text-sm text-[#adc0d6] hover:text-white">Our approach</a>
        <a href="#results" className="shrink-0 py-4 text-sm text-[#adc0d6] hover:text-white">Results</a>
        <a href="#measurement" className="shrink-0 py-4 text-sm text-[#adc0d6] hover:text-white">Measurement</a>
        <a href="#creative-attribution" className="shrink-0 py-4 text-sm text-[#adc0d6] hover:text-white">Creative & attribution</a>
        <a href="#capabilities" className="shrink-0 py-4 text-sm text-[#adc0d6] hover:text-white">Full service</a>
      </nav>
      <Approach />
      <Results />
      <Measurement />
      <CreativeAttribution />
      <Capabilities />
      <StartingPoint />
      <NewsletterBand />
      <section className="bg-[#002d72] px-[var(--pad)] py-20 text-white md:py-24">
        <Eyebrow className="text-[#c9d8ff]">Discuss your media strategy</Eyebrow>
        <h2 className="mt-6 max-w-4xl font-heading text-[clamp(2.6rem,6vw,6.4rem)] leading-[1.05] tracking-[-0.065em]">
          Let’s talk about your next media plan.
        </h2>
        <div className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <p className="max-w-md text-[#d7e2ff]">Tell us where you want to grow. We’ll help you build the media strategy to get there.</p>
          <ArrowLink href="/contact" variant="light">Start a conversation</ArrowLink>
        </div>
      </section>
    </>
  );
}

function BlendedHero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#0c243c] px-[var(--pad)] pt-[210px] pb-11 text-white" aria-labelledby="home-title" id="intro">
      <HeroVideo className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(0deg,#0c243c_0%,#0c243c99_12%,transparent_44%),linear-gradient(90deg,#0c243cf2_0%,#0c243cd4_28%,#0c243c66_62%,#0c243c28_100%),linear-gradient(180deg,#0c243cb0,transparent_32%)]" />
      <div className="max-w-[1000px]">
        <span className="mb-8 flex items-center gap-3.5 text-[13px] tracking-[0.13em] text-[#d3e1ed]">
          <i className="size-1.5 rounded-full bg-[#d5ebfb]" aria-hidden />
          INDEPENDENT SINCE 1974
        </span>
        <h1 id="home-title" className="font-heading text-[clamp(3rem,7.4vw,7.4rem)] leading-[1.02] tracking-[-0.065em] text-balance">
          The performance
          <br />
          TV agency.
        </h1>
        <p className="mt-8 max-w-[490px] text-lg leading-relaxed text-[#e0e7ee] md:text-[19px]">
          Strategic media buying and measurement across linear TV and streaming. We connect the media plan to your business goals.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-8">
          <ArrowLink href="/converged-tv" variant="light">Explore our approach</ArrowLink>
          <a href="#results" className="inline-flex items-center gap-3 text-[15px] font-semibold">
            See the results <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
      <div className="mt-16 flex flex-col-reverse items-stretch justify-between gap-6 border-t border-white/30 pt-6 sm:flex-row sm:items-center">
        <a href="#approach" className="flex items-center gap-4 text-sm text-[#b7cadd]">
          <span className="text-2xl">↓</span> Explore InterMedia
        </a>
        <PlayReelButton className="h-auto justify-start gap-4 bg-transparent px-0 text-white hover:bg-transparent" />
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="scroll-mt-40 bg-[#12304f] px-[var(--pad)] pt-20 pb-0 text-white">
      <SectionIndex left="01 / OUR APPROACH" right="STRATEGIC MEDIA BUYING" className="text-[#b7d0e8]" />
      <div className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <h2 className="font-heading text-[clamp(2.3rem,4.2vw,4.2rem)] tracking-[-0.055em]">
          A media plan built
          <br />
          around your audience.
        </h2>
        <p className="max-w-md justify-self-end text-[17px] leading-relaxed text-[#c5d6e8]">
          We plan linear and streaming together, use our network relationships to access inventory, and optimize against the outcomes that matter to your business.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <article className="flex flex-col rounded-[10px] border border-[#3d6488] bg-[#1a4568] p-7">
          <span className="text-[12px] tracking-[0.1em] text-[#c7e0f4]">01 / PLAN</span>
          <div className="mt-5 grid min-h-[170px] place-items-center gap-2 rounded-md border border-[#4f7aa0] bg-[#1f5278] p-4 text-center text-xs tracking-[0.08em]">
            <div className="flex w-full items-center justify-center gap-3">
              <span className="rounded bg-[#2b6896] px-3 py-2">LINEAR TV</span>
              <span>+</span>
              <span className="rounded bg-[#2b6896] px-3 py-2">STREAMING</span>
            </div>
            <strong className="rounded bg-[#3d82b4] px-4 py-2 text-sm">One media plan</strong>
          </div>
          <h3 className="mt-7 font-heading text-[26px] tracking-[-0.04em]">Converged TV planning</h3>
          <p className="mt-3 mb-6 text-[16px] text-[#d2e4f4]">Reach audiences across screens with one view of exposure, frequency, and response.</p>
          <TextLink href="/converged-tv" className="mt-auto text-[#e7f3ff]">Explore converged TV</TextLink>
        </article>
        <article className="flex flex-col rounded-[10px] border border-[#3d6488] bg-[#1a4568] p-7">
          <span className="text-[12px] tracking-[0.1em] text-[#c7e0f4]">02 / ACTIVATE</span>
          <div className="mt-5 grid min-h-[170px] grid-cols-2 gap-2 rounded-md border border-[#4f7aa0] bg-[#1f5278] p-4 text-center text-xs">
            {["Live sports", "Entertainment", "News", "Premium streaming"].map((label) => (
              <span key={label} className="rounded bg-[#2b6896] px-2 py-3">{label}</span>
            ))}
            <small className="col-span-2 text-[10px] tracking-[0.12em] text-[#c7e0f4]">DIRECT NETWORK & PUBLISHER RELATIONSHIPS</small>
          </div>
          <h3 className="mt-7 font-heading text-[26px] tracking-[-0.04em]">Experienced media buying</h3>
          <p className="mt-3 mb-6 text-[16px] text-[#d2e4f4]">Decades of relationships inform placement, negotiation, and access to premium inventory.</p>
          <TextLink href="/partnerships" className="mt-auto text-[#e7f3ff]">Explore our partnerships</TextLink>
        </article>
        <article className="flex flex-col rounded-[10px] border border-[#3d6488] bg-[#1a4568] p-7">
          <span className="text-[12px] tracking-[0.1em] text-[#c7e0f4]">03 / IMPROVE</span>
          <div className="mt-5 flex min-h-[170px] flex-col justify-end rounded-md border border-[#4f7aa0] bg-[#1f5278] p-4">
            <div className="flex h-20 items-end gap-1">
              {[22, 34, 27, 52, 42, 65, 49, 80, 68, 90, 71, 96].map((h, i) => (
                <i key={i} className={cn("flex-1 rounded-t-sm", i % 3 === 0 ? "bg-[#c5e4ff]" : "bg-[#4f8ab8]")} style={{ height: `${h}%` }} />
              ))}
            </div>
            <span className="mt-3 text-center text-xs text-[#d5ebfb]">Exposure → Response → Optimization</span>
          </div>
          <h3 className="mt-7 font-heading text-[26px] tracking-[-0.04em]">Measurement that informs decisions</h3>
          <p className="mt-3 mb-6 text-[16px] text-[#d2e4f4]">Connect media exposure to business outcomes, then use those findings to refine the plan.</p>
          <TextLink href="/measurement" className="mt-auto text-[#e7f3ff]">Explore measurement</TextLink>
        </article>
      </div>
      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 py-10 text-sm text-[#c5d6e8]">
        <span>Each decision is evaluated against performance.</span>
        <a href="#results" className="text-[#e7f3ff]">Explore the outcomes ↓</a>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="results" className="scroll-mt-40 bg-[#e9f0f6] px-[var(--pad)] pt-20 pb-16 text-[#0c243c]">
      <SectionIndex left="02 / CAMPAIGN RESULTS" right="MEDIA + MEASUREMENT" className="text-[#315170]" />
      <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <h2 className="font-heading text-[clamp(2.3rem,4.2vw,4.2rem)] tracking-[-0.055em]">
          The results
          <br />
          behind the approach.
        </h2>
        <p className="max-w-md text-[17px] text-[#5b6f84]">A closer look at how media strategy, buying, and attribution support campaign performance.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {homeCases.map((item, i) => (
          <article
            key={item.id}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-[10px] p-7",
              i === 0 ? "bg-[#002d72] text-white" : "border border-[#2b3e5b] bg-[#152236] text-white"
            )}
          >
            <span className="min-h-8 text-[12px] tracking-[0.1em] text-[#b0c5e1]">{item.category}</span>
            <div className="mt-4 font-heading text-[clamp(3.6rem,6vw,5.6rem)] leading-none tracking-[-0.07em]">{item.metric}</div>
            <h3 className="mt-3 font-heading text-[22px] text-[#d5e3f3]">{item.unit}</h3>
            <p className="mt-4 mb-8 text-[15px] leading-relaxed text-[#aebfd7]">{item.body}</p>
            <CaseOpenButton
              id={item.id}
              label="Explore case study"
              className="mt-auto h-auto justify-between rounded-none border border-white/20 bg-transparent px-0 text-white hover:bg-transparent"
            />
            <span className="pointer-events-none absolute right-5 bottom-4 font-heading text-5xl text-white/10">0{i + 1}</span>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-[#5c7085]">
        <p>Selected campaign outcomes. Results vary by campaign; attribution coverage is distinct from incremental sales.</p>
        <TextLink href="/results" className="text-[#002d72]">View all case studies</TextLink>
      </div>
    </section>
  );
}

function Measurement() {
  const [step, setStep] = useState(0);
  const current = measurementSteps[step];
  return (
    <section id="measurement" className="scroll-mt-40 bg-white px-[var(--pad)] pt-20 pb-4">
      <SectionIndex left="03 / MEASUREMENT" right="POWERED BY ACCUTRAK®" className="text-[#607085]" />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="text-sm font-semibold text-[#002d72]">Accutrak®</span>
          <h2 className="mt-4 font-heading text-[clamp(2.3rem,4.2vw,4.2rem)] tracking-[-0.055em]">
            Know how your
            <br />
            TV is performing.
          </h2>
          <p className="mt-5 max-w-md text-[#636a77]">
            Connect exposure to response across linear TV and streaming. Attribution, analytics, and marketing mix modeling show the contribution of each investment.
          </p>
          <div className="mt-8" role="tablist" aria-label="Explore the measurement process">
            {measurementSteps.map((item, i) => (
              <button
                key={item.number}
                type="button"
                role="tab"
                aria-selected={i === step}
                onClick={() => setStep(i)}
                className={cn(
                  "flex w-full items-center gap-4 border-b border-[#d9dce3] py-4 text-left",
                  i === step ? "text-[#002d72]" : "text-[#647287]"
                )}
              >
                <span className="text-xs">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <strong className="block">{item.title.split(".")[0]}</strong>
                  <small className="text-[#8090a5]">{item.text}</small>
                </span>
                <b className="ml-auto font-normal">↗</b>
              </button>
            ))}
          </div>
          <TextLink href="/measurement" className="mt-6 text-[#002d72]">Explore Accutrak</TextLink>
        </div>
        <div className="rounded-md border border-[#d6e0eb] bg-[#f7f9fb] p-5 shadow-[0_20px_80px_#002d720c]">
          <div className="mb-4 flex items-center justify-between text-xs text-[#607085]">
            <strong className="text-[#002d72]">Accutrak®</strong>
            <span>MEASUREMENT PROCESS</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>{current.label}</span>
            <span>ILLUSTRATIVE</span>
          </div>
          <svg viewBox="0 0 620 320" className="mt-3 w-full" role="img" aria-label="Illustration of response peaks above a baseline after TV airings">
            <defs>
              <linearGradient id="response-fill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#538fce" stopOpacity=".35" />
                <stop offset="1" stopColor="#538fce" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[60, 115, 170, 225, 280].map((y) => (
              <line key={y} x1="30" y1={y} x2="590" y2={y} stroke="#d5deea" />
            ))}
            {[100, 238, 379, 493].map((x) => (
              <rect key={x} x={x} y="267" width="12" height="13" rx="2" fill="#002d72" />
            ))}
            <path d="M30 247L75 247 100 241 115 153 127 194 155 237 205 237 238 225 252 101 270 151 294 220 347 225 379 211 392 66 410 147 435 213 467 218 493 200 505 94 524 155 551 214 590 210V280H30Z" fill="url(#response-fill)" />
            <path d="M30 249C180 243 210 237 310 235S480 222 590 221" fill="none" stroke="#8aa0b8" strokeWidth="2" strokeDasharray="5 6" />
            <path d="M30 247L75 247 100 241 115 153 127 194 155 237 205 237 238 225 252 101 270 151 294 220 347 225 379 211 392 66 410 147 435 213 467 218 493 200 505 94 524 155 551 214 590 210" fill="none" stroke="#4f7cff" strokeWidth="3" />
            <circle cx="392" cy="66" r="6" fill="#002d72" />
            <text x="404" y="46" fontSize="11" fill="#315170">RESPONSE ABOVE BASELINE</text>
          </svg>
          <div className="mt-4 rounded bg-white p-4">
            <span className="text-[12px] tracking-[0.12em] text-[#002d72]">{current.number}</span>
            <h3 className="mt-2 font-heading text-xl">{current.title}</h3>
            <p className="mt-2 text-sm text-[#636a77]">{current.text}</p>
          </div>
          <p className="mt-3 text-xs text-[#7a8796]">Illustration of the measurement process. No client campaign data is shown.</p>
        </div>
      </div>
    </section>
  );
}

function CreativeAttribution() {
  return (
    <section id="creative-attribution" className="scroll-mt-40 bg-[#0c243c] px-[var(--pad)] py-16 text-white">
      <SectionIndex left="03B / CREATIVE & ATTRIBUTION" right="FROM PHASE 1 CONCEPT 03" className="text-[#adc0d6]" />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-heading text-[clamp(2rem,3.6vw,3.6rem)] tracking-[-0.05em]">See the work, then see what it did.</h2>
        <p className="max-w-md text-[#adc0d6]">A browsable look at production stills and Accutrak reporting — creative and measurement, side by side.</p>
      </div>
      <div className="flex gap-4 overflow-auto pb-3">
        {[
          { href: "/creative", src: "/bts/bts-field-setup-960.webp", label: "On set", title: "Creative" },
          { href: "/creative", src: "/bts/bts-talent-camera-960.webp", label: "Talent", title: "Production" },
          { href: "/measurement", src: "/dashboards/dashboard-overview.png", label: "Accutrak", title: "Overview" },
          { href: "/measurement", src: "/dashboards/dashboard-lift.png", label: "Response", title: "Attribution" },
          { href: "/results", src: "/bts/bts-night-shoot-960.webp", label: "The work", title: "Results" },
        ].map((item) => (
          <Link key={item.title + item.label} href={item.href} className="min-w-[240px] shrink-0">
            <div className="relative h-40 overflow-hidden rounded-md">
              <Image src={item.src} alt={`${item.label}: ${item.title}`} fill className="object-cover" />
              <span className="absolute top-3 left-3 text-[11px] tracking-[0.14em]">{item.label}</span>
            </div>
            <h3 className="mt-3 font-heading text-xl">{item.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Capabilities() {
  const [active, setActive] = useState<(typeof capabilityKeys)[number]>("media");
  const item = capabilities[active];
  return (
    <section id="capabilities" className="scroll-mt-40 bg-gradient-to-b from-[#0c243c] to-[#12304f] px-[var(--pad)] pt-20 pb-16 text-white">
      <SectionIndex left="04 / THE FULL AGENCY" right="STRATEGY THROUGH PERFORMANCE" className="text-[#a9c2df]" />
      <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <h2 className="font-heading text-[clamp(2.3rem,4.2vw,4.2rem)] tracking-[-0.055em]">
          A full agency built
          <br />
          around performance.
        </h2>
        <p className="max-w-md text-[#acbfd6]">Media buying and measurement lead the approach. Strategy, creative, production, and partnerships support it at every stage.</p>
      </div>
      <div className="overflow-hidden rounded-md border border-[#35506e] lg:grid lg:grid-cols-[0.72fr_1.28fr]">
        <div className="flex flex-col bg-[#12304f] px-6 py-4" role="tablist">
          {capabilityKeys.map((key, i) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active === key}
              onClick={() => setActive(key)}
              className={cn(
                "flex items-center gap-4 border-b border-[#30485f] py-5 text-left",
                active === key ? "text-white" : "text-[#96acc5]"
              )}
            >
              <span className="text-xs">0{i + 1}</span>
              {key === "creative" ? "Creative & production" : key[0].toUpperCase() + key.slice(1)}
              <b className="ml-auto font-normal opacity-70">↗</b>
            </button>
          ))}
        </div>
        <div className="bg-[#1d4a70] p-8 md:p-12">
          <Eyebrow className="text-[#b8d2ef]">{item.label}</Eyebrow>
          <h3 className="mt-5 max-w-xl font-heading text-[clamp(1.8rem,3vw,3.2rem)] tracking-[-0.05em]">{item.title}</h3>
          <p className="mt-4 max-w-lg text-[#bdcee0]">{item.description}</p>
          <ul className="mt-6 space-y-2 text-[#bdcee0]">
            {item.items.map((line) => (
              <li key={line} className="before:mr-3 before:text-[#b8d2ef] before:content-['→']">{line}</li>
            ))}
          </ul>
          <ArrowLink href={item.href} variant="light" className="mt-8">
            {item.link}
          </ArrowLink>
        </div>
      </div>
      <Link href="/creative" className="mt-16 grid items-center gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-md">
          <Image
            src="/bts/bts-field-setup-960.webp"
            alt="InterMedia production crew setting a camera and lighting on a baseball field"
            width={960}
            height={640}
            className="aspect-[3/2] w-full object-cover transition duration-500 hover:scale-[1.03]"
          />
        </div>
        <div>
          <Eyebrow className="text-[#adc9e8]">Creative & production</Eyebrow>
          <h3 className="mt-5 font-heading text-[clamp(2rem,3.5vw,3.2rem)] tracking-[-0.045em]">Meet the team behind the work.</h3>
          <p className="mt-4 max-w-md text-[#acbfd6]">Explore our approach to creative development, production, and improving existing advertising.</p>
          <span className="mt-6 inline-flex text-[#d3e7fc]">Inside our creative team ↗</span>
        </div>
      </Link>
    </section>
  );
}

function StartingPoint() {
  return (
    <section className="bg-[#0f2d49] px-[var(--pad)] py-12">
      <aside className="mx-auto grid max-w-5xl gap-6 rounded-2xl bg-[#edf2f7] p-6 text-[#0c243c] md:grid-cols-[auto_1fr_1.1fr] md:items-center md:p-8">
        <div>
          <strong className="font-heading text-6xl tracking-[-0.06em]">
            50<span className="text-[#002d72]">+</span>
          </strong>
          <p className="mt-1 text-sm text-[#617187]">years of media expertise</p>
        </div>
        <div>
          <h2 className="font-heading text-[clamp(1.5rem,2.1vw,2rem)] tracking-[-0.04em]">Find your starting point.</h2>
          <p className="mt-2 max-w-xs text-sm text-[#617187]">A media plan shaped around the stage your brand is at.</p>
        </div>
        <div className="flex flex-col">
          {[
            { href: "/new-to-tv", label: "New to TV" },
            { href: "/ctv", label: "Expanding into streaming" },
            { href: "/converged-tv", label: "Connecting linear + CTV" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center justify-between border-t border-[#d5dee8] py-3 font-medium hover:text-[#002d72]">
              {item.label}
              <span aria-hidden>↗</span>
            </Link>
          ))}
        </div>
      </aside>
    </section>
  );
}
