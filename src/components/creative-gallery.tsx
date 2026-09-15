"use client";

import { creativePhotos } from "@/lib/data";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function CreativeGallery() {
  const [active, setActive] = useState<string | null>(null);
  const index = creativePhotos.findIndex((item) => item.id === active);
  const photo = index >= 0 ? creativePhotos[index] : null;
  const gallery = useMemo(
    () => ["camera-movement", "talent-camera", "crew-framing", "location-work", "between-takes", "field-direction"],
    []
  );

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {gallery.map((id) => {
          const item = creativePhotos.find((photo) => photo.id === id);
          if (!item) return null;
          return (
            <figure key={item.id}>
              <button type="button" className="group block w-full" onClick={() => setActive(item.id)} aria-label={`Enlarge photo: ${item.title}`}>
                <Image src={item.src} alt={item.alt} width={960} height={640} className="aspect-[3/2] w-full rounded-md object-cover" />
              </button>
              <figcaption className="mt-3 flex justify-between text-sm text-[#636a77]">
                <span>{item.title}</span>
                <span>INTERMEDIA / ON SET</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <Dialog open={Boolean(photo)} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-4xl overflow-hidden border-0 bg-[#081727] p-0 text-white sm:max-w-4xl">
          {photo ? (
            <>
              <div className="flex items-center justify-between px-5 py-4 text-xs tracking-[0.14em]">
                <DialogTitle>INTERMEDIA / BEHIND THE SCENES</DialogTitle>
              </div>
              <Image src={photo.src} alt={photo.alt} width={960} height={640} className="w-full object-cover" />
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <h2 className="font-heading text-2xl">{photo.title}</h2>
                  <p className="mt-1 text-sm text-[#adc0d3]">{photo.caption}</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <button type="button" onClick={() => setActive(creativePhotos[(index - 1 + creativePhotos.length) % creativePhotos.length].id)}>←</button>
                  <span>{index + 1} / {creativePhotos.length}</span>
                  <button type="button" onClick={() => setActive(creativePhotos[(index + 1) % creativePhotos.length].id)}>→</button>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
