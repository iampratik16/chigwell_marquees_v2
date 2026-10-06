/**
 * Standalone SMTP check. Proves the Office 365 credentials work on their own,
 * before any of this is wired into the enquiry route — so a failure can only
 * be the SMTP settings, never the form, the validation or the deploy.
 *
 *   node --env-file=.env.local scripts/smtp-check.mjs you@example.com
 *
 * Needs Node 20.6+ for --env-file (we are on 20.15).
 */
import nodemailer from "nodemailer";

const to = process.argv[2];
if (!to) {
  console.error("Usage: node --env-file=.env.local scripts/smtp-check.mjs <recipient>");
  process.exit(1);
}

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_FROM_EMAIL } = process.env;

const missing = Object.entries({ SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_FROM_EMAIL })
  .filter(([, v]) => !v)
  .map(([k]) => k);
if (missing.length) {
  console.error(`Missing in .env.local: ${missing.join(", ")}`);
  if (missing.includes("SMTP_PASSWORD")) console.error("→ paste the mailbox password on the SMTP_PASSWORD line.");
  process.exit(1);
}

// Port 587 upgrades via STARTTLS, so secure stays false. secure:true is for
// 465 only and would hang here.
const port = Number(SMTP_PORT);
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: port === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
});

/** Turn the usual Office 365 rejections into something actionable. */
function explain(err) {
  const text = `${err.code ?? ""} ${err.responseCode ?? ""} ${err.response ?? ""} ${err.message ?? ""}`;
  if (/535 5\.7\.139|SmtpClientAuthentication is disabled/i.test(text))
    return [
      "Authenticated SMTP is disabled for this mailbox — the usual cause.",
      "Fix: Microsoft 365 admin centre → Users → pratik@radlabs.tech → Mail →",
      "     Manage email apps → tick 'Authenticated SMTP' → Save. Allow a few minutes.",
      "Or:  Set-CASMailbox pratik@radlabs.tech -SmtpClientAuthenticationDisabled $false",
    ].join("\n");
  if (/535 5\.7\.3|5\.7\.57|authenticate/i.test(text))
    return "Credentials rejected. Check the password is exact (no quotes, no trailing space).";
  if (/550 5\.7\.60|SendAsDenied/i.test(text))
    return "From address is not the authenticated mailbox — CONTACT_FROM_EMAIL must equal SMTP_USER.";
  if (/504.*authentication type/i.test(text))
    return "Server refused the auth mechanism offered.";
  if (/ETIMEDOUT|ECONNECTION|ENOTFOUND|ECONNREFUSED/i.test(text))
    return `Could not reach ${SMTP_HOST}:${port} — check host, port and any network/firewall blocking 587.`;
  return null;
}

try {
  console.log(`1/2  verifying ${SMTP_USER} against ${SMTP_HOST}:${port} …`);
  await transporter.verify();
  console.log("     connection + authentication OK");

  console.log(`2/2  sending a test message to ${to} …`);
  const info = await transporter.sendMail({
    // Masked display name over the real authenticated address — exactly how
    // the live emails will appear.
    from: `"Team Chigwell Marquees" <${CONTACT_FROM_EMAIL}>`,
    to,
    subject: "SMTP check — The Chigwell Marquees",
    text: "If you are reading this, the SMTP credentials work. Nothing else is wired up yet.",
  });
  console.log(`     accepted: ${info.accepted.join(", ") || "(none)"}`);
  if (info.rejected?.length) console.log(`     rejected: ${info.rejected.join(", ")}`);
  console.log(`     messageId: ${info.messageId}`);
  console.log("\nPASS — check the inbox (and the spam folder) to confirm it arrived.");
} catch (err) {
  console.error("\nFAIL");
  console.error(`  ${err.message}`);
  if (err.response) console.error(`  server said: ${err.response}`);
  const hint = explain(err);
  if (hint) console.error(`\n${hint}`);
  process.exit(1);
}
