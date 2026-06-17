/**
 * Enquiry contract — the single source of truth for the enquiry payload shape.
 *
 * NOTE: this build has no backend. `submitEnquiry` simulates a send. To go live,
 * wire it to a route handler / email service and forward this exact payload —
 * the email/notification template should include every field below.
 */

export const VENUE_INTEREST_OPTIONS = [
  // NOTE: the venue pages state the Mega range as 300–1,000; this form uses the
  // client-specified 250–1,000 label. Flagged for alignment, not changed elsewhere.
  "Mini Marquee (30–200 Guests)",
  "Mega Marquee (250–1,000 Guests)",
] as const;

export type VenueInterest = (typeof VENUE_INTEREST_OPTIONS)[number];

export type EnquiryPayload = {
  /** Free-text "Tell us about your occasion" (replaces the old occasion dropdown). */
  occasion: string;
  fullName: string;
  email: string;
  phone: string;
  /** Optional exact date (yyyy-mm-dd). */
  preferredDate?: string;
  /** Optional month for enquirers without a fixed date (e.g. "June"). */
  preferredMonth?: string;
  /** Optional approximate guest count. */
  guests?: string;
  /** Zero, one or both venues. */
  venueInterest: VenueInterest[];
  consent: boolean;
};

/* ── Shared validation (used by the main form and the quick-enquiry panel) ── */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^[+(]?[\d][\d\s()+-]{6,}$/;

export type ContactErrors = Partial<
  Record<"fullName" | "email" | "phone" | "consent", string>
>;

export function validateContact(v: {
  fullName: string;
  email: string;
  phone: string;
  consent: boolean;
}): ContactErrors {
  const e: ContactErrors = {};
  if (!v.fullName) e.fullName = "Please enter your full name.";
  if (!v.email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email)) e.email = "Please enter a valid email address.";
  if (!v.phone) e.phone = "Please enter a phone number.";
  else if (!PHONE_RE.test(v.phone)) e.phone = "Please enter a valid phone number.";
  if (!v.consent) e.consent = "Please accept the terms to continue.";
  return e;
}

/**
 * Submit an enquiry. Replace the body with a POST to your route handler /
 * email service; keep the `EnquiryPayload` shape as the contract.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  // TODO: POST payload to /api/enquiry (or an email service such as Resend).
  if (typeof console !== "undefined") {
    console.info("[enquiry] payload ready to send:", payload);
  }
  await new Promise((resolve) => setTimeout(resolve, 700));
}
