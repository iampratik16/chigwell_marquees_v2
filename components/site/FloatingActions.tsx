"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_LUXE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SITE, whatsappLink } from "@/lib/site";
import WhatsAppGlyph from "@/components/ui/WhatsAppGlyph";
import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  VENUE_INTEREST_OPTIONS,
  submitEnquiry,
  validateContact,
  type ContactErrors,
  type EnquiryPayload,
  type VenueInterest,
} from "@/lib/enquiry";

const fieldBase =
  "w-full border-b border-line bg-transparent py-2.5 text-ink placeholder:text-mist/70 focus:border-ink focus:outline-none transition-colors";

export default function FloatingActions() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  const clearError = (key: keyof ContactErrors) =>
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));

  // Focus management while the dialog is open: initial focus, Esc, focus trap,
  // and a body-scroll lock (for the mobile bottom sheet).
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("input, textarea, button, select")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab" && panel) {
        const list = Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.offsetParent !== null);
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

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
      occasion: ((data.get("message") as string) ?? "").trim(),
      fullName,
      email,
      phone,
      venueInterest: data.getAll("venueInterest") as VenueInterest[],
      consent,
    };

    setErrors({});
    setSubmitError(false);
    setBusy(true);
    try {
      // SAME pipeline as the main /visit form.
      await submitEnquiry(payload);
      setSent(true);
    } catch {
      setSubmitError(true);
    } finally {
      setBusy(false);
    }
  };

  const enter = reduced
    ? { initial: false as const, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, y: 16, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.96 },
      };

  return (
    <>
      {/* Floating buttons — hidden while the panel is open */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="fab"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: EASE_LUXE, delay: reduced ? 0 : 0.6 }}
            className="fixed bottom-5 right-4 z-30 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            {/* WhatsApp — directly above the enquiry launcher */}
            <a
              href={whatsappLink(true)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on WhatsApp"
              className="flex h-16 w-16 items-center justify-center rounded-full border border-bone/15 bg-ink/90 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-colors duration-400 hover:bg-botanical focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
            >
              <WhatsAppGlyph className="h-8 w-8 text-[#f8b25a]" />
            </a>

            {/* Quick-enquiry launcher — lower / primary */}
            <button
              ref={launcherRef}
              type="button"
              onClick={() => {
                setSent(false);
                setSubmitError(false);
                setErrors({});
                setOpen(true);
              }}
              aria-label="Open quick enquiry to book a viewing"
              aria-haspopup="dialog"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#7a5c1e 0%,#b8902f 18%,#e9cf72 42%,#f3e2a0 50%,#d4af37 64%,#a77e26 82%,#7a5c1e 100%)",
              }}
              className="flex items-center gap-3 rounded-full border border-[#8a651c] px-8 py-5 text-[0.82rem] font-medium uppercase tracking-[0.16em] text-ink shadow-[inset_0_1px_0_rgba(255,250,225,0.55),0_12px_40px_-12px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-5 w-5">
                <path d="M4 5h16v11H8l-4 4V5Z" strokeLinejoin="round" />
              </svg>
              Book a Viewing
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick-enquiry dialog */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_LUXE }}
              onClick={close}
              className="fixed inset-0 z-[80] bg-ink/45 backdrop-blur-sm"
            />
            <motion.div
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="quick-enquiry-title"
              data-lenis-prevent
              {...enter}
              transition={{ duration: 0.45, ease: EASE_LUXE }}
              className={cn(
                "fixed z-[85] flex max-h-[86svh] flex-col overflow-y-auto bg-bone text-ink shadow-2xl",
                "inset-x-0 bottom-0 rounded-t-[1.5rem] p-6",
                "sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[24rem] sm:max-w-[calc(100vw-3rem)] sm:rounded-[1.25rem] sm:p-7",
              )}
              style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow text-champagne">Quick enquiry</span>
                  <h2 id="quick-enquiry-title" className="mt-2 font-display text-2xl">
                    Let&apos;s talk
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close quick enquiry"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink/60 transition-colors hover:border-ink/40 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
                >
                  <span className="text-lg leading-none">×</span>
                </button>
              </div>

              {sent ? (
                <div className="flex flex-1 flex-col justify-center py-6">
                  <span className="eyebrow text-champagne">Thank you</span>
                  <h3 className="mt-3 font-display text-2xl">Your enquiry is on its way.</h3>
                  <p className="mt-3 text-sm text-mist">
                    Our events team will be in touch shortly. For anything urgent,
                    call <a className="text-ink underline" href={SITE.phoneHref}>{SITE.phone}</a>.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-6 inline-flex w-fit items-center rounded-full bg-ink px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-bone transition-colors hover:bg-botanical"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="qe-name" className="eyebrow mb-1 block text-mist">Full name *</label>
                    <input
                      id="qe-name" name="fullName" required aria-required="true"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "qe-name-error" : undefined}
                      onInput={() => clearError("fullName")}
                      className={fieldBase} placeholder="Full name"
                    />
                    {errors.fullName && <p id="qe-name-error" role="alert" className="mt-1.5 text-sm text-[#a23b2d]">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label htmlFor="qe-email" className="eyebrow mb-1 block text-mist">Email address *</label>
                    <input
                      id="qe-email" name="email" type="email" required aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "qe-email-error" : undefined}
                      onInput={() => clearError("email")}
                      className={fieldBase} placeholder="you@email.com"
                    />
                    {errors.email && <p id="qe-email-error" role="alert" className="mt-1.5 text-sm text-[#a23b2d]">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="qe-phone" className="eyebrow mb-1 block text-mist">Phone number *</label>
                    <input
                      id="qe-phone" name="phone" type="tel" required aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "qe-phone-error" : undefined}
                      onInput={() => clearError("phone")}
                      className={fieldBase} placeholder="07000 000000"
                    />
                    {errors.phone && <p id="qe-phone-error" role="alert" className="mt-1.5 text-sm text-[#a23b2d]">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="qe-message" className="eyebrow mb-1 block text-mist">Your message</label>
                    <textarea id="qe-message" name="message" rows={3} className={cn(fieldBase, "resize-none")} placeholder="A few words about your occasion…" />
                  </div>

                  <fieldset>
                    <legend className="eyebrow mb-2 block text-mist">Venue interest</legend>
                    <div className="flex flex-col gap-1">
                      {VENUE_INTEREST_OPTIONS.map((v) => (
                        <label key={v} className="flex min-h-[44px] cursor-pointer items-center gap-3 text-ink">
                          <input type="checkbox" name="venueInterest" value={v} className="h-4 w-4 accent-botanical" />
                          <span className="text-[0.9rem]">{v}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="flex items-start gap-3">
                    <input
                      id="qe-consent" name="consent" type="checkbox" required aria-required="true"
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "qe-consent-error" : undefined}
                      onChange={() => clearError("consent")}
                      className="mt-1 h-4 w-4 accent-botanical"
                    />
                    <label htmlFor="qe-consent" className="text-sm text-mist">
                      I agree to be contacted and accept the terms &amp; privacy policy.
                    </label>
                  </div>
                  {errors.consent && <p id="qe-consent-error" role="alert" className="-mt-2 text-sm text-[#a23b2d]">{errors.consent}</p>}

                  {submitError && (
                    <p role="alert" className="text-sm text-[#a23b2d]">
                      Something went wrong. Please try again or call {SITE.phone}.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={busy}
                    className="mt-1 inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[0.74rem] font-medium uppercase tracking-[0.16em] text-bone transition-colors duration-500 hover:bg-botanical disabled:opacity-60"
                  >
                    {busy ? "Sending…" : "Send enquiry"}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
