"use client";

import { ArrowLink, Eyebrow } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Pause, Play } from "lucide-react";
import { createContext, useContext, useState } from "react";

const ReelContext = createContext<{ openReel: () => void } | null>(null);

export function useReel() {
  const ctx = useContext(ReelContext);
  if (!ctx) throw new Error("useReel must be used within ReelProvider");
  return ctx;
}

export function ReelProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ReelContext.Provider value={{ openReel: () => setOpen(true) }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl border-0 bg-[#081727] p-0 text-white sm:rounded-lg">
          <div className="flex items-center justify-between px-5 py-4">
            <DialogTitle className="text-sm font-medium">InterMedia · 2026 agency reel</DialogTitle>
          </div>
          <video
            className="aspect-video w-full bg-black"
            controls
            playsInline
            autoPlay
            poster="/video/reel-poster.jpg"
          >
            <source src="/video/studio-preview.mp4" type="video/mp4" />
          </video>
          <p className="px-5 py-4 text-sm text-[#adc0d3]">
            Creative developed as part of InterMedia’s integrated agency services.
          </p>
        </DialogContent>
      </Dialog>
    </ReelContext.Provider>
  );
}

export function PlayReelButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { openReel } = useReel();
  return (
    <Button variant="ghost" className={className} onClick={openReel}>
      {children ?? (
        <>
          <span className="grid size-12 place-items-center rounded-full border border-white/70">▶</span>
          <span className="text-left">
            Watch our 2026 reel
            <small className="mt-1 block text-xs text-[#aebed0]">Creative developed by InterMedia</small>
          </span>
        </>
      )}
    </Button>
  );
}

export function HeroVideo({ className }: { className?: string }) {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <video
        className={className}
        muted
        loop
        playsInline
        autoPlay
        poster="/video/reel-poster.jpg"
        aria-label="Selections from InterMedia's client work"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        style={{ filter: "brightness(1.22) saturate(0.92) contrast(1.04)" }}
      >
        <source src="/video/studio-preview.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        className="absolute top-[6.75rem] right-8 z-10 grid size-11 place-items-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-sm md:top-[7.5rem]"
        aria-label={paused ? "Play background video" : "Pause background video"}
        onClick={(event) => {
          const video = event.currentTarget.closest("section")?.querySelector("video");
          if (!video) return;
          if (video.paused) void video.play();
          else video.pause();
        }}
      >
        {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
      </button>
    </>
  );
}

export function NewsletterBand() {
  return (
    <section className="bg-[#143a6b] px-[var(--pad)] py-14 text-white md:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Eyebrow className="text-[#c9dff4]">AdGrowth Weekly</Eyebrow>
          <h2 className="mt-4 max-w-xl font-heading text-[clamp(2rem,3.5vw,3.4rem)] tracking-[-0.05em]">
            Ideas on performance marketing, every week.
          </h2>
          <p className="mt-4 max-w-lg text-[#d3e4f4]">
            Stay connected to InterMedia’s observations on TV, streaming, attribution, and the campaigns that move brands.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 rounded-xl border border-white/20 bg-white/8 p-6">
          <p className="text-sm text-[#d3e4f4]">Read the latest issue and subscribe on Beehiiv.</p>
          <ArrowLink href="https://intermedia.beehiiv.com/subscribe" variant="light" className="w-full sm:w-auto">
            Subscribe to AdGrowth Weekly
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
