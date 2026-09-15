"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLink, Eyebrow } from "@/components/brand";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { createContext, useContext, useMemo, useState } from "react";

const CaseDialogContext = createContext<{
  open: (id: string) => void;
} | null>(null);

export function useCaseDialog() {
  const ctx = useContext(CaseDialogContext);
  if (!ctx) throw new Error("useCaseDialog must be used within CaseDialogProvider");
  return ctx;
}

export function CaseDialogProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const study = caseStudies.find((item) => item.id === id) as CaseStudy | undefined;
  const value = useMemo(() => ({ open: (next: string) => setId(next) }), []);

  return (
    <CaseDialogContext.Provider value={value}>
      {children}
      <Dialog open={Boolean(study)} onOpenChange={(open) => !open && setId(null)}>
        <DialogContent className="max-h-[88dvh] overflow-auto border-0 bg-[#f4f6f8] p-8 sm:max-w-2xl sm:p-12">
          {study ? (
            <>
              <DialogHeader>
                <Eyebrow className="text-[#002d72]">{study.category}</Eyebrow>
                <DialogTitle className="font-heading text-[clamp(1.9rem,4vw,3.2rem)] tracking-[-0.05em]">
                  {study.title}
                </DialogTitle>
                <DialogDescription className="sr-only">{study.body}</DialogDescription>
              </DialogHeader>
              <p className="font-heading text-[clamp(4rem,8vw,6.2rem)] leading-none tracking-[-0.07em] text-[#002d72]">
                {study.metric}
              </p>
              <p className="mt-2 text-lg text-[#10141d]">{study.unit}</p>
              <h3 className="mt-8 font-heading text-xl">The approach</h3>
              <p className="mt-2 text-[#636a77]">{study.approach}</p>
              <h3 className="mt-6 font-heading text-xl">The outcome</h3>
              <p className="mt-2 text-[#636a77]">{study.result}</p>
              <p className="mt-6 text-xs text-[#636a77]">
                Results reflect the individual campaign described. The scope and outcome of each engagement vary.
              </p>
              <div className="mt-8">
                <ArrowLink href="/contact" variant="navy">
                  Discuss your goals
                </ArrowLink>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </CaseDialogContext.Provider>
  );
}

export function CaseOpenButton({
  id,
  label,
  className,
}: {
  id: string;
  label: string;
  className?: string;
}) {
  const { open } = useCaseDialog();
  return (
    <Button
      variant="ghost"
      className={className}
      onClick={() => open(id)}
      aria-label={`Explore case study: ${label}`}
    >
      {label} <span aria-hidden>↗</span>
    </Button>
  );
}
