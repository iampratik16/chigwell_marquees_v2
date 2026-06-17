"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_LUXE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  VENUE_INTEREST_OPTIONS,
  submitEnquiry,
  validateContact,
  type ContactErrors,
  type EnquiryPayload,
  type VenueInterest,
} from "@/lib/enquiry";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const fieldBase =
  "w-full border-b border-line bg-transparent py-3 text-ink placeholder:text-mist/70 focus:border-ink focus:outline-none transition-colors";

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow mb-1 block text-mist">
      {children}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-[#a23b2d]">
      {message}
    </p>
  );
}

export default function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});

  const clearError = (key: keyof ContactErrors) =>
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const fullName = (data.get("fullName") as string)?.trim() ?? "";
    const email = (data.get("email") as string)?.trim() ?? "";
    const phone = (data.get("phone") as string)?.trim() ?? "";
    const consent = data.get("consent") === "on";

    const next = validateContact({ fullName, email, phone, consent });

    if (Object.values(next).some(Boolean)) {
      setErrors(next);
      const firstKey = (["fullName", "email", "phone", "consent"] as const).find((k) => next[k]);
      if (firstKey) form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    const payload: EnquiryPayload = {
      occasion: ((data.get("occasion") as string) ?? "").trim(),
      fullName,
      email,
      phone,
      preferredDate: ((data.get("preferredDate") as string) ?? "") || undefined,
      preferredMonth: ((data.get("preferredMonth") as string) ?? "") || undefined,
      guests: ((data.get("guests") as string) ?? "") || undefined,
      venueInterest: data.getAll("venueInterest") as VenueInterest[],
      consent,
    };

    setErrors({});
    setBusy(true);
    try {
      await submitEnquiry(payload);
      setSent(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_LUXE }}
            className="flex min-h-[400px] flex-col justify-center"
          >
            <span className="eyebrow text-champagne">Thank you</span>
            <h3 className="mt-5 display-md">Your enquiry is on its way.</h3>
            <p className="mt-5 max-w-md text-mist">
              Our events team will be in touch shortly. For anything urgent, call
              us on <a className="text-ink underline" href="tel:02031960159">020 3196 0159</a>.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2"
          >
            {/* 1 · Tell us about your occasion — moved to the top */}
            <div className="sm:col-span-2">
              <Label htmlFor="occasion">Tell us about your occasion</Label>
              <textarea
                id="occasion"
                name="occasion"
                rows={4}
                className={cn(fieldBase, "resize-none")}
                placeholder="A few words about your day, the occasion, your vision…"
              />
            </div>

            {/* 2 · Full name (required) */}
            <div className="sm:col-span-1">
              <Label htmlFor="fullName">Full name *</Label>
              <input
                id="fullName"
                name="fullName"
                required
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                onInput={() => clearError("fullName")}
                className={fieldBase}
                placeholder="Full name"
              />
              <FieldError id="fullName-error" message={errors.fullName} />
            </div>

            {/* 3 · Email (required) */}
            <div className="sm:col-span-1">
              <Label htmlFor="email">Email address *</Label>
              <input
                id="email"
                name="email"
                type="email"
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                onInput={() => clearError("email")}
                className={fieldBase}
                placeholder="you@email.com"
              />
              <FieldError id="email-error" message={errors.email} />
            </div>

            {/* 4 · Phone (required) */}
            <div className="sm:col-span-1">
              <Label htmlFor="phone">Phone number *</Label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                onInput={() => clearError("phone")}
                className={fieldBase}
                placeholder="07000 000000"
              />
              <FieldError id="phone-error" message={errors.phone} />
            </div>

            {/* 5 · Preferred date (optional) */}
            <div className="sm:col-span-1">
              <Label htmlFor="preferredDate">Preferred date</Label>
              <input id="preferredDate" name="preferredDate" type="date" className={fieldBase} />
            </div>

            {/* 6 · Preferred month (optional, secondary) */}
            <div className="sm:col-span-1">
              <Label htmlFor="preferredMonth">Preferred month</Label>
              <select
                id="preferredMonth"
                name="preferredMonth"
                aria-describedby="preferredMonth-help"
                className={cn(fieldBase, "appearance-none")}
                defaultValue=""
              >
                <option value="">No preference…</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <p id="preferredMonth-help" className="mt-1.5 text-sm text-mist">
                For clients who don&apos;t yet have a date.
              </p>
            </div>

            {/* 7 · Number of guests (optional) */}
            <div className="sm:col-span-1">
              <Label htmlFor="guests">Number of guests</Label>
              <input id="guests" name="guests" type="number" min={1} className={fieldBase} placeholder="e.g. 220" />
            </div>

            {/* Venue interest (optional, multi-select) */}
            <fieldset className="sm:col-span-2">
              <legend className="eyebrow mb-3 block text-mist">Venue interest</legend>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
                {VENUE_INTEREST_OPTIONS.map((v) => (
                  <label
                    key={v}
                    className="flex min-h-[44px] cursor-pointer items-center gap-3 text-ink"
                  >
                    <input
                      type="checkbox"
                      name="venueInterest"
                      value={v}
                      className="h-4 w-4 accent-botanical"
                    />
                    <span className="text-[0.95rem]">{v}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Consent (required) */}
            <div className="sm:col-span-2">
              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                  onChange={() => clearError("consent")}
                  className="mt-1 h-4 w-4 accent-botanical"
                />
                <label htmlFor="consent" className="text-sm text-mist">
                  I agree to be contacted about my enquiry and accept the terms &amp;
                  privacy policy.
                </label>
              </div>
              <FieldError id="consent-error" message={errors.consent} />
            </div>

            <div className="sm:col-span-2 mt-2">
              <button
                type="submit"
                disabled={busy}
                data-cursor="Send"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-bone transition-colors duration-500 hover:bg-botanical disabled:opacity-60"
              >
                {busy ? "Sending…" : "Send enquiry"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
