# Enquiry form → Google Sheet

The contact form (`/visit`) POSTs to `app/api/enquiry/route.ts`, which forwards the
enquiry to a Google Apps Script web app that appends a row to the Sheet.

Sheet: https://docs.google.com/spreadsheets/d/1iJXcV3_yZbTxMj1RT4LAjdqCkvp4QNt5UFa5R5sI_3k/edit

No Google Cloud project, service account or API key is needed — the script runs
as you, inside your own Sheet.

## 1. Add the script

Go to [script.google.com](https://script.google.com) → **New project** (or open the
Sheet → Extensions → Apps Script). Delete the placeholder in `Code.gs` and paste:

```js
/** The Chigwell Marquees — enquiry sink. Appends /visit enquiries to the Sheet. */

// Must match SHEETS_WEBHOOK_SECRET in Vercel. Use a long random string.
const SECRET = 'PASTE_A_LONG_RANDOM_STRING_HERE';

// Open by ID so this works as a STANDALONE script too — a standalone script has
// no active spreadsheet, so getActiveSpreadsheet() would return null.
const SHEET_ID = '1iJXcV3_yZbTxMj1RT4LAjdqCkvp4QNt5UFa5R5sI_3k';
const SHEET_NAME = 'Enquiries';

const HEADERS = [
  'Timestamp', 'Name', 'Email', 'Phone', 'Occasion',
  'Preferred date', 'Preferred month', 'Guests', 'Venue interest', 'Consent',
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return json({ ok: false, error: 'no_body' });

    const body = JSON.parse(e.postData.contents);
    if (!SECRET || body.secret !== SECRET) return json({ ok: false, error: 'unauthorised' });

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      body.fullName || '',
      body.email || '',
      body.phone || '',
      body.occasion || '',
      body.preferredDate || '',
      body.preferredMonth || '',
      body.guests || '',
      (body.venueInterest || []).join(', '),
      body.consent ? 'Yes' : 'No',
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Run this ONCE from the editor to grant permissions and verify the Sheet opens. */
function testSetup() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  Logger.log('Opened OK: ' + ss.getName());
}
```

Replace `SECRET` with a long random string (`openssl rand -hex 24`) and **Save**.
The `Enquiries` tab and its header row are created automatically on first use.

## 2. Authorise, then deploy

Run **`testSetup`** from the editor first → Review permissions → your account →
Advanced → "Go to … (unsafe)" → Allow. The log should print `Opened OK: …`.
This grants the Sheets scope so the first real submission can't fail on it.

Then: **Deploy → New deployment → ⚙ → Web app**

- Description: `Enquiry sink`
- Execute as: **Me**
- Who has access: **Anyone**

**Deploy** → authorise when prompted (it's your own script; the "unverified app"
warning is expected — Advanced → Go to project) → copy the **Web app URL**
(ends in `/exec`).

> "Anyone" is required because Vercel calls it anonymously. The URL is only ever
> used server-side and is protected by the shared secret, so it is never exposed
> to visitors.

## 3. Add the env vars

Vercel → Project → **Settings → Environment Variables** (Production):

| Name | Value |
|---|---|
| `SHEETS_WEBHOOK_URL` | the `/exec` URL from step 2 |
| `SHEETS_WEBHOOK_SECRET` | the same string you set as `SECRET` |

Then **redeploy** — env vars only apply to a new build.

To test locally instead, put the same two lines in `.env.local`.

## Behaviour

| State | Result |
|---|---|
| Env vars set, script reachable | Row appended, user sees the thank-you |
| Env vars **not** set | Form still succeeds, enquiry **not** recorded, warning logged |
| Set but script fails | User sees "couldn't send — please call", nothing lost silently |

## Changing the fields

`EnquiryPayload` in `lib/enquiry.ts` is the contract. Add a field there → add it
to `HEADERS` and `appendRow` above, in the same order.
