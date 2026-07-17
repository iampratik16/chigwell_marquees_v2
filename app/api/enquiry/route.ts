import { NextResponse } from "next/server";
import { validateContact, type EnquiryPayload } from "@/lib/enquiry";

/**
 * Enquiry sink. Re-validates server-side, then forwards to the Google Sheet
 * via an Apps Script web app. The script URL + secret stay on the server, so
 * the endpoint can't be scraped and posted to directly from the browser.
 *
 * Config (Vercel env):
 *   SHEETS_WEBHOOK_URL    — the Apps Script /exec URL
 *   SHEETS_WEBHOOK_SECRET — shared secret, must match the script's SECRET
 *
 * Until those are set this behaves exactly as the old stub did (accepts and
 * drops), so deploying it can never regress the live form — but it logs loudly.
 */

type Body = EnquiryPayload & { company?: string };

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: hidden from real users, so anything here is a bot. Accept and bin.
  if (body.company) return NextResponse.json({ ok: true });

  const errors = validateContact({
    fullName: body.fullName ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    consent: !!body.consent,
  });
  if (Object.values(errors).some(Boolean)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;

  if (!url) {
    console.warn(
      "[enquiry] SHEETS_WEBHOOK_URL not set — enquiry NOT recorded:",
      body.email,
    );
    return NextResponse.json({ ok: true, recorded: false });
  }

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
      throw new Error(
        `sheet rejected (${res.status}): ${reply?.error ?? text.slice(0, 200)}`,
      );
    }

    return NextResponse.json({ ok: true, recorded: true });
  } catch (err) {
    // Configured but failing: tell the user, so the enquiry isn't lost in silence.
    console.error("[enquiry] failed to record:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
