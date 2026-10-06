import { NextResponse } from "next/server";
import { z } from "zod";
import {
  EMAIL_RE,
  PHONE_RE,
  HEAR_ABOUT_OPTIONS,
  VENUE_INTEREST_OPTIONS,
  type EnquiryPayload,
} from "@/lib/enquiry";
import { waitUntil } from "@vercel/functions";
import { mailConfigured, sendEnquiryEmails } from "@/lib/mailer";

/**
 * Enquiry sink. Validates, records the enquiry in the Google Sheet via an Apps
 * Script web app, then emails the team and acknowledges to the enquirer.
 *
 * Config (Vercel env):
 *   SHEETS_WEBHOOK_URL / SHEETS_WEBHOOK_SECRET — the sheet pipeline
 *   SMTP_* / CONTACT_* (six vars)              — see lib/mailer.ts
 *
 * The script URL, the secret and the mailbox password stay on the server, so
 * the endpoint can't be scraped and posted to directly from the browser.
 */

// nodemailer opens real TCP sockets, which the edge runtime cannot do.
export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Server-side schema. This is a public endpoint, so nothing is trusted — but
 * the rules come from lib/enquiry.ts rather than being restated here, so the
 * client and the server cannot drift apart.
 */
const Schema = z.object({
  occasion: z.string().max(5000).optional(),
  fullName: z.string().trim().min(1).max(200),
  email: z.string().trim().max(320).regex(EMAIL_RE),
  phone: z.string().trim().max(50).regex(PHONE_RE),
  preferredDate: z.string().max(40).optional(),
  guests: z.string().max(40).optional(),
  hearAbout: z.union([z.enum(HEAR_ABOUT_OPTIONS), z.literal("")]).optional(),
  venueInterest: z.union([z.enum(VENUE_INTEREST_OPTIONS), z.literal("")]).optional(),
  consent: z.literal(true),
});

/** How long to wait on the Apps Script before giving up on the sheet. Without
 *  a cap, a hanging or broken script holds the customer's form open
 *  indefinitely; the email is an independent record, so losing the race here
 *  is survivable. */
const SHEET_TIMEOUT_MS = 6000;

/** Append to the Google Sheet. Resolves true only if the row was really saved. */
async function recordToSheet(body: EnquiryPayload): Promise<boolean> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;

  if (!url) {
    console.warn("[enquiry] SHEETS_WEBHOOK_URL not set — enquiry NOT recorded:", body.email);
    return false;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, secret }),
      cache: "no-store",
      signal: AbortSignal.timeout(SHEET_TIMEOUT_MS),
    });

    // Apps Script answers 200 with an HTML error page when the script itself
    // fails (e.g. "Script function not found: doPost"), so the status alone
    // proves nothing — the row is only saved if it echoes back {ok:true}.
    const text = await res.text();
    let reply: { ok?: boolean; error?: string } | null = null;
    try {
      reply = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      reply = null;
    }
    if (!res.ok || !reply?.ok) {
      throw new Error(`sheet rejected (${res.status}): ${reply?.error ?? text.slice(0, 200)}`);
    }
    return true;
  } catch (err) {
    // Not fatal on its own: the email is a second, independent record of the
    // enquiry. Only losing both counts as losing the enquiry.
    console.error("[enquiry] failed to record:", err);
    return false;
  }
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: hidden from real users, so anything here is a bot. Accept and bin
  // before validating, so a bot learns nothing from the response.
  if ((raw as { company?: string })?.company) {
    return NextResponse.json({ ok: true });
  }

  const parsed = Schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const body: EnquiryPayload = { ...parsed.data, occasion: parsed.data.occasion ?? "" };

  /* ── 1 · Record it and email it, at the same time ──────────────────── */

  // Run concurrently, not in sequence. They are independent, and waiting for
  // one before starting the other made the customer sit through the sum of
  // both — which is how a slow sheet turned into a nine-second "Sending…".
  const recordPromise = recordToSheet(body);

  if (!mailConfigured) {
    const recorded = await recordPromise;
    if (process.env.NODE_ENV === "production") {
      // Loud and visible. A quiet "ok" here would let every enquiry go
      // unemailed for months with the form looking perfectly healthy.
      console.error("[enquiry] SMTP not configured in production:", body.email);
      return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 500 });
    }
    console.warn("[enquiry] SMTP not configured — skipping email (dev)");
    return NextResponse.json({ ok: true, recorded, delivered: false }, { status: recorded ? 200 : 502 });
  }

  /* ── 2 · Finish after answering ────────────────────────────────────── */

  // Office 365 takes ~7s to accept a message from Vercel's network — 1.5s from
  // a laptop, but that is the number that matters here. Making the customer
  // watch "Sending…" for that long invites them to give up or submit twice, so
  // the response goes out immediately and the work finishes behind it.
  //
  // waitUntil is what makes that safe: it keeps the function alive until the
  // promise settles, rather than the platform freezing it the moment the
  // response is flushed. Outside Vercel there is no such guarantee, so we
  // simply await instead — slower locally, never dropped.
  const t0 = Date.now();
  const work = Promise.all([recordPromise, sendEnquiryEmails(body)]).then(
    ([recorded, failures]) => {
      for (const err of failures) console.error("[enquiry] email failed:", err);
      const delivered = failures.length === 0;
      console.warn(
        `[enquiry] ${body.email} — recorded:${recorded} delivered:${delivered} in ${Date.now() - t0}ms`,
      );
      // Nothing captured it. Loud, because the customer has already been told
      // it went through and only this log will say otherwise.
      if (!recorded && !delivered) {
        console.error("[enquiry] LOST — neither sheet nor email captured it:", body.email);
      } else if (!recorded) {
        console.error("[enquiry] sheet unavailable — captured by email only:", body.email);
      }
    },
  );

  if (process.env.VERCEL) waitUntil(work);
  else await work;

  return NextResponse.json({ ok: true });
}
