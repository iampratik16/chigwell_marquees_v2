import nodemailer from "nodemailer";
import type { EnquiryPayload } from "@/lib/enquiry";

/**
 * Enquiry email, over plain SMTP to Office 365. No third-party sending service.
 *
 * Config (all six required, nothing hardcoded):
 *   SMTP_HOST            — smtp.office365.com
 *   SMTP_PORT            — 587
 *   SMTP_USER            — the authenticated mailbox
 *   SMTP_PASSWORD        — its password
 *   CONTACT_FROM_EMAIL   — must equal SMTP_USER (see below)
 *   CONTACT_TO_EMAIL     — comma-separated notification recipients
 *
 * CONTACT_TO_EMAIL is split and trimmed here, so who gets notified changes by
 * editing one env var in Vercel and redeploying — no code change.
 *
 * Verify credentials in isolation with scripts/smtp-check.mjs before blaming
 * the form, the validation or the deploy.
 */

const BRAND = "Team Chigwell Marquees";
/** Replies to the customer's auto-reply should reach the business, not the
 *  mailbox the mail happens to be sent from. */
const CUSTOMER_REPLY_TO = "info@thechigwellmarquees.com";

type MailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string[];
};

function readConfig(): MailConfig | null {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL,
  } = process.env;

  if (
    !SMTP_HOST ||
    !SMTP_PORT ||
    !SMTP_USER ||
    !SMTP_PASSWORD ||
    !CONTACT_FROM_EMAIL ||
    !CONTACT_TO_EMAIL
  ) {
    return null;
  }

  const to = CONTACT_TO_EMAIL.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!to.length) return null;

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
    from: CONTACT_FROM_EMAIL,
    to,
  };
}

const config = readConfig();

/** False when any of the six vars is missing — the route decides what to do. */
export const mailConfigured = config !== null;

/**
 * One transporter for the lifetime of the module, not one per request. The
 * Office 365 TLS handshake is the expensive part, not the send itself, so a
 * warm lambda reuses the authenticated session.
 *
 * `secure` is true only on 465. Port 587 upgrades via STARTTLS, and forcing
 * secure:true there hangs the connection instead of failing fast.
 */
const transporter = config
  ? nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    })
  : null;

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

const row = (label: string, value?: string) =>
  value
    ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#1a1a1a">${esc(value)}</td></tr>`
    : "";

/**
 * Notify the team. `replyTo` is the enquirer, so hitting Reply in the inbox
 * answers the customer rather than the sending mailbox.
 */
async function sendNotification(b: EnquiryPayload) {
  if (!transporter || !config) return;
  const lines = [
    ["Name", b.fullName],
    ["Email", b.email],
    ["Phone", b.phone],
    ["Guests", b.guests],
    ["Preferred date", b.preferredDate],
    ["Venue interest", b.venueInterest || undefined],
    ["Heard about us", b.hearAbout || undefined],
  ] as const;

  await transporter.sendMail({
    from: `"${BRAND}" <${config.from}>`,
    to: config.to,
    replyTo: `"${b.fullName}" <${b.email}>`,
    subject: `New enquiry — ${b.fullName}`,
    text:
      lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n") +
      (b.occasion ? `\n\nMessage:\n${b.occasion}` : ""),
    html: `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px">
      <p style="font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#8a7a52;margin:0 0 4px">New enquiry</p>
      <h2 style="margin:0 0 20px;font-size:21px;color:#1a1a1a">${esc(b.fullName)}</h2>
      <table style="border-collapse:collapse;font-size:15px">${lines.map(([k, v]) => row(k, v)).join("")}</table>
      ${b.occasion ? `<p style="margin:20px 0 6px;color:#6b6b6b;font-size:15px">Message</p><p style="margin:0;white-space:pre-wrap;font-size:15px;color:#1a1a1a">${esc(b.occasion)}</p>` : ""}
      <p style="margin:24px 0 0;font-size:13px;color:#8a8a8a">Reply to this email to answer ${esc(b.fullName)} directly.</p>
    </div>`,
  });
}

/** Acknowledge to the person who filled the form. */
async function sendAutoReply(b: EnquiryPayload) {
  if (!transporter || !config) return;
  const first = b.fullName.trim().split(/\s+/)[0] || "there";

  await transporter.sendMail({
    from: `"${BRAND}" <${config.from}>`,
    to: b.email,
    replyTo: CUSTOMER_REPLY_TO,
    subject: "We have your enquiry — The Chigwell Marquees",
    text: `Hi ${first},\n\nWe have your enquiry and the team will get back to you within 24 hrs.\n\nIf it is urgent, call us on 020 3196 0159.\n\nThe Chigwell Marquees\nChigwell Hall, 159 High Road, Chigwell, Essex IG7 6BD`,
    html: `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:520px;color:#1a1a1a">
      <p style="font-size:16px;margin:0 0 16px">Hi ${esc(first)},</p>
      <p style="font-size:16px;line-height:1.6;margin:0 0 16px">We have your enquiry and the team will get back to you within 24 hrs.</p>
      <p style="font-size:15px;line-height:1.6;color:#6b6b6b;margin:0 0 24px">If it is urgent, call us on <a href="tel:02031960159" style="color:#1a1a1a">020 3196 0159</a>.</p>
      <p style="font-size:14px;line-height:1.6;color:#8a8a8a;margin:0;border-top:1px solid #e6e2da;padding-top:16px">
        The Chigwell Marquees<br>Chigwell Hall, 159 High Road, Chigwell, Essex IG7 6BD
      </p>
    </div>`,
  });
}

/**
 * Send both emails. Settled independently so one failing cannot stop the
 * other — a bounced customer address must not cost the team its notification.
 * Returns the failures rather than throwing; the caller decides what a failed
 * send means for an enquiry that is already safely in the sheet.
 */
export async function sendEnquiryEmails(b: EnquiryPayload): Promise<Error[]> {
  if (!transporter) return [];
  const results = await Promise.allSettled([sendNotification(b), sendAutoReply(b)]);
  return results
    .filter((r): r is PromiseRejectedResult => r.status === "rejected")
    .map((r) => (r.reason instanceof Error ? r.reason : new Error(String(r.reason))));
}
