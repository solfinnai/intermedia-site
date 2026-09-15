"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "cn";

export function FaqList({
  items,
  className,
}: {
  items: readonly { title: string; body: string }[];
  className?: string;
}) {
  return (
    <Accordion className={cn("w-full border-t border-[#d9dce3]", className)}>
      {items.map((item) => (
        <AccordionItem key={item.title} value={item.title} className="border-[#d9dce3]">
          <AccordionTrigger className="py-6 font-heading text-lg font-medium tracking-[-0.02em] hover:no-underline md:text-[19px]">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="max-w-2xl pb-6 text-[15px] leading-relaxed text-[#636a77]">
            {item.body}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
