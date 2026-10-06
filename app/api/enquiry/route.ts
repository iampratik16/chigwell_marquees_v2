import { NextResponse } from "next/server";
import { z } from "zod";
import {
  EMAIL_RE,
  PHONE_RE,
  HEAR_ABOUT_OPTIONS,
  VENUE_INTEREST_OPTIONS,
  type EnquiryPayload,
} from "@/lib/enquiry";
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

  /* ── 1 · Record it ─────────────────────────────────────────────────── */

  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  let recorded = false;

  if (!url) {
    console.warn("[enquiry] SHEETS_WEBHOOK_URL not set — enquiry NOT recorded:", body.email);
  } else {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, secret }),
        cache: "no-store",
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
      recorded = true;
    } catch (err) {
      // Nothing has captured the enquiry at this point, so say so rather than
      // losing it in silence.
      console.error("[enquiry] failed to record:", err);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  }

  /* ── 2 · Email it ──────────────────────────────────────────────────── */

  // Checked after the sheet write so a misconfigured mailbox never costs us the
  // enquiry itself — it is already stored by the time we get here.
  if (!mailConfigured) {
    if (process.env.NODE_ENV === "production") {
      // Loud and visible. A quiet "ok" here would let every enquiry go
      // unemailed for months with the form looking perfectly healthy.
      console.error("[enquiry] SMTP not configured in production — recorded but NOT emailed:", body.email);
      return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 500 });
    }
    console.warn("[enquiry] SMTP not configured — skipping email (dev)");
    return NextResponse.json({ ok: true, recorded, delivered: false });
  }

  const failures = await sendEnquiryEmails(body);
  if (failures.length) {
    // Configured but the send failed. The enquiry is safely recorded, so the
    // customer sees success — showing an error would invite a resubmit and
    // duplicate the row for something that did go through.
    for (const err of failures) console.error("[enquiry] email failed:", err);
    return NextResponse.json({ ok: true, recorded, delivered: false });
  }

  return NextResponse.json({ ok: true, recorded, delivered: true });
}
