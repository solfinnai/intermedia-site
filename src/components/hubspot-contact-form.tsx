"use client";

import { site } from "@/lib/data";
import {
  HUBSPOT_EMBED_SCRIPT_URL,
  HUBSPOT_PORTAL_ID,
  HUBSPOT_REGION,
  hubSpotFormIdsMatch,
} from "@/lib/hubspot";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const LOAD_TIMEOUT_MS = 15000;

type Phase = "pending" | "ready" | "accepted" | "rejected" | "unavailable";

type HubSpotFormEvent = CustomEvent<{ formId?: string; instanceId?: string }>;

function isThisForm(event: Event, formId: string) {
  const detail = (event as HubSpotFormEvent).detail;
  if (!detail?.formId) return true;
  return hubSpotFormIdsMatch(detail.formId, formId);
}

export function HubSpotContactForm({ formId }: { formId: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("pending");

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const markReady = () => {
      if (!frame.querySelector("iframe")) return;
      setPhase((current) => (current === "accepted" || current === "rejected" ? current : "ready"));
    };

    const onReady = (event: Event) => {
      if (!isThisForm(event, formId)) return;
      markReady();
    };
    const onSuccess = (event: Event) => {
      if (!isThisForm(event, formId)) return;
      setPhase("accepted");
    };
    const onFailed = (event: Event) => {
      if (!isThisForm(event, formId)) return;
      setPhase("rejected");
    };

    window.addEventListener("hs-form-event:on-ready", onReady);
    window.addEventListener("hs-form-event:on-submission:success", onSuccess);
    window.addEventListener("hs-form-event:on-submission:failed", onFailed);

    markReady();
    const observer = new MutationObserver(markReady);
    observer.observe(frame, { childList: true, subtree: true });

    const timeout = window.setTimeout(() => {
      setPhase((current) => (current === "pending" ? "unavailable" : current));
    }, LOAD_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeout);
      observer.disconnect();
      window.removeEventListener("hs-form-event:on-ready", onReady);
      window.removeEventListener("hs-form-event:on-submission:success", onSuccess);
      window.removeEventListener("hs-form-event:on-submission:failed", onFailed);
    };
  }, [formId]);

  if (phase === "accepted") {
    return (
      <div className="rounded-lg border border-[#d9dce3] bg-white p-8" role="status">
        <p className="text-xs font-semibold tracking-[0.14em] text-[#002d72] uppercase">Inquiry received</p>
        <h2 className="mt-3 font-heading text-3xl tracking-[-0.04em]">Thank you.</h2>
        <p className="mt-3 text-[#636a77]">
          HubSpot accepted your inquiry. We will reply to the work email you entered.
        </p>
        <p className="mt-4 text-sm text-[#636a77]">
          Need a direct line? Email{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#d9dce3] bg-white p-8">
      {phase === "rejected" ? (
        <p className="mb-5 text-sm text-red-700" role="alert">
          HubSpot did not accept this inquiry. Your entries are still in the form. Adjust anything marked on the form and submit again.
        </p>
      ) : null}
      {phase === "unavailable" ? (
        <div className="mb-5 text-sm text-red-700" role="alert">
          <p>The inquiry form did not finish loading. Reload the page to try again, or email {site.email}.</p>
          <button
            type="button"
            className="mt-3 underline"
            onClick={() => window.location.reload()}
          >
            Reload and try again
          </button>
        </div>
      ) : null}
      {phase === "pending" ? (
        <p className="mb-4 text-sm text-[#636a77]" role="status">
          Loading the inquiry form.
        </p>
      ) : null}
      <div
        ref={frameRef}
        className="hs-form-frame w-full"
        data-region={HUBSPOT_REGION}
        data-form-id={formId}
        data-portal-id={HUBSPOT_PORTAL_ID}
        data-instance-id="intermedia-contact"
      />
      <Script
        src={HUBSPOT_EMBED_SCRIPT_URL}
        strategy="afterInteractive"
        onError={() => setPhase("unavailable")}
      />
      <p className="mt-4 text-xs text-[#636a77]">
        This inquiry is sent to HubSpot. A thank-you appears only after HubSpot accepts it.
      </p>
    </div>
  );
}
