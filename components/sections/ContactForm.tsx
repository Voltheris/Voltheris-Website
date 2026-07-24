"use client";

import { useState, type FormEvent } from "react";
import { TbCheck } from "react-icons/tb";
import { services } from "@/content/services";
import { FormField } from "@/components/ui/FormField";
import { useMagnetic } from "@/hooks/useMagnetic";

const initialState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  interest: "",
  message: "",
};

type FormState = typeof initialState;

/**
 * Presentational only — there's no email/CRM provider wired up yet.
 * Swap handleSubmit for a real API call when one is chosen; the
 * success state below is what should render once that call resolves.
 */
export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const magnetic = useMagnetic<HTMLButtonElement>(0.2);

  function update<K extends keyof FormState>(key: K) {
    return (value: string) => setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-card border border-gold/40 bg-sand p-10 text-center">
        <TbCheck className="text-3xl text-gold-text" aria-hidden="true" />
        <p className="mt-4 font-display text-display-m text-ink">Message received.</p>
        <p className="mx-auto mt-2 max-w-prose text-body-s text-ink-soft">
          We reply within one business day. If it’s urgent, booking a call
          directly below is faster.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Name"
          name="name"
          required
          value={form.name}
          onChange={update("name")}
          placeholder="Jane Whitfield"
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          placeholder="jane@company.com"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="Company"
          name="company"
          value={form.company}
          onChange={update("company")}
          placeholder="Company name"
        />
        <FormField
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          placeholder="Optional"
        />
      </div>

      <FormField
        as="select"
        label="What are you interested in?"
        name="interest"
        value={form.interest}
        onChange={update("interest")}
        placeholder="Select one"
        options={["General inquiry", ...services.map((s) => s.title)]}
      />

      <FormField
        as="textarea"
        rows={5}
        label="Message"
        name="message"
        required
        value={form.message}
        onChange={update("message")}
        placeholder="What's going on in your pipeline right now?"
      />

      <div className="flex flex-col items-start gap-3">
        <button
          ref={magnetic.ref}
          onPointerMove={magnetic.onPointerMove}
          onPointerLeave={magnetic.onPointerLeave}
          onPointerDown={magnetic.onPointerDown}
          onPointerUp={magnetic.onPointerUp}
          type="submit"
          className="rounded bg-ink px-8 py-4 font-mono text-eyebrow uppercase tracking-[0.1em] text-ivory transition-colors duration-300 ease-signature hover:bg-gold"
        >
          Send message
        </button>
        <p className="text-caption text-ink-faint">
          We reply within one business day.
        </p>
      </div>
    </form>
  );
}
