"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactInterests, site } from "@/lib/data";
import { useState } from "react";

type Review = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  interest: string;
  message: string;
};

export function ContactForm() {
  const [review, setReview] = useState<Review | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (review) {
    const body = `Name: ${review.firstName} ${review.lastName}\nCompany: ${review.company}\nEmail: ${review.email}\nInterest: ${review.interest}\n\n${review.message}`;
    const href = `mailto:${site.email}?subject=${encodeURIComponent("Website inquiry: " + review.interest)}&body=${encodeURIComponent(body)}`;
    return (
      <div className="rounded-lg border border-[#d9dce3] bg-white p-8">
        <p className="text-xs font-semibold tracking-[0.14em] text-[#002d72] uppercase">Ready to review</p>
        <h2 className="mt-3 font-heading text-3xl tracking-[-0.04em]">Your inquiry is ready.</h2>
        <p className="mt-3 text-[#636a77]">Review your details below. Open your email app to send the inquiry to InterMedia.</p>
        <dl className="mt-6 grid grid-cols-[110px_1fr] gap-3 text-sm">
          <dt className="text-[#636a77]">Name</dt>
          <dd>{review.firstName} {review.lastName}</dd>
          <dt className="text-[#636a77]">Company</dt>
          <dd>{review.company}</dd>
          <dt className="text-[#636a77]">Email</dt>
          <dd>{review.email}</dd>
          <dt className="text-[#636a77]">Exploring</dt>
          <dd>{review.interest}</dd>
          <dt className="text-[#636a77]">Objective</dt>
          <dd className="whitespace-pre-wrap">{review.message}</dd>
        </dl>
        <a href={href} className="mt-8 inline-flex min-h-12 items-center rounded-[5px] bg-[#002d72] px-5 text-sm font-semibold text-white">
          Open email draft ↗
        </a>
        <button type="button" className="mt-5 block text-sm underline" onClick={() => setReview(null)}>
          ← Edit your details
        </button>
        <p className="mt-4 text-xs text-[#636a77]">Your inquiry has not been sent. This preview keeps the details only on this page.</p>
      </div>
    );
  }

  return (
    <form
      className="rounded-lg border border-[#d9dce3] bg-white p-8"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity()) {
          setError("Please complete the required fields.");
          return;
        }
        const data = new FormData(form);
        setError(null);
        setReview({
          firstName: String(data.get("firstName") ?? "").trim(),
          lastName: String(data.get("lastName") ?? "").trim(),
          company: String(data.get("company") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          interest: String(data.get("interest") ?? ""),
          message: String(data.get("message") ?? "").trim(),
        });
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="first-name">First name</Label>
          <Input id="first-name" name="firstName" autoComplete="given-name" required maxLength={80} className="h-11 rounded-none border-0 border-b" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input id="last-name" name="lastName" autoComplete="family-name" required maxLength={80} className="h-11 rounded-none border-0 border-b" />
        </div>
      </div>
      <div className="mt-5 space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" autoComplete="organization" required maxLength={150} className="h-11 rounded-none border-0 border-b" />
      </div>
      <div className="mt-5 space-y-2">
        <Label htmlFor="email">Work email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required maxLength={160} className="h-11 rounded-none border-0 border-b" />
      </div>
      <div className="mt-5 space-y-2">
        <Label htmlFor="interest">What are you exploring?</Label>
        <select id="interest" name="interest" className="h-11 w-full border-0 border-b border-input bg-transparent text-sm">
          {contactInterests.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="mt-5 space-y-2">
        <Label htmlFor="message">What would you like to achieve?</Label>
        <Textarea id="message" name="message" rows={4} required maxLength={2500} className="rounded-none border-0 border-b" />
      </div>
      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
      <Button type="submit" className="mt-8 h-12 rounded-[5px] bg-[#002d72] px-6 text-white hover:bg-[#164785]">
        Review your inquiry ↗
      </Button>
      <p className="mt-4 text-xs text-[#636a77]">Preview mode: review your details, then open an email draft. This form does not submit to a CRM.</p>
    </form>
  );
}
