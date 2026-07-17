/**
 * Enquiry contract — the single source of truth for the enquiry payload shape.
 *
 * `submitEnquiry` POSTs this payload to /api/enquiry, which appends it to the
 * Google Sheet via an Apps Script web app. Any new field added here should also
 * be added to the sheet's columns and the Apps Script's appendRow.
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
 * Submit an enquiry to /api/enquiry, which records it in the Google Sheet.
 * Throws on failure so the form can tell the user rather than fake a success.
 */
export async function submitEnquiry(
  payload: EnquiryPayload & { company?: string },
): Promise<void> {
  const res = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`enquiry failed: ${res.status}`);
}
