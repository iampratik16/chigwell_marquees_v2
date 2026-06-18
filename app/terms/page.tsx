import { pageMeta } from "@/lib/seo";
import LegalDoc, { type LegalSection } from "@/components/site/LegalDoc";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Terms of Hire | The Chigwell Marquees",
  description:
    "The terms and conditions for hiring The Chigwell Marquees, our two luxury marquee venues set in the grounds of Chigwell Hall, Essex.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    body: [
      `These terms of hire govern the agreement between you (the "Hirer") and The Chigwell Marquees (the "Venue") for the hire of our marquees, the Secret Garden and the grounds at ${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.county}, ${SITE.address.postcode}.`,
      "By confirming a booking and paying the deposit, you accept these terms on behalf of yourself and your guests.",
      "[PLACEHOLDER] Confirm the registered trading entity and any booking-form terms that should take precedence.",
    ],
  },
  {
    heading: "Definitions",
    body: [
      `"Event" means the function for which the Venue is hired. "Hire Period" means the agreed period of access, standard hire being twelve hours. "Deposit" means the sum payable to confirm a booking. "Balance" means the remaining hire fee.`,
    ],
  },
  {
    heading: "Bookings and deposits",
    body: [
      "A date can be held provisionally for a short period. A booking is only confirmed once we receive a signed booking form (or written confirmation) and the deposit.",
      "[PLACEHOLDER] State the deposit amount or percentage and whether it is non-refundable.",
    ],
  },
  {
    heading: "Payment",
    body: [
      "The balance of the hire fee, and any agreed security or breakage deposit, are due before the Event.",
      "[PLACEHOLDER] State the number of days before the Event by which the balance and security deposit are due, accepted payment methods, and any surcharges.",
    ],
  },
  {
    heading: "Cancellation and changes",
    body: [
      "If you need to cancel or move your Event, you must tell us in writing as soon as possible. Charges may apply depending on how much notice is given.",
      "We may cancel a booking in exceptional circumstances; in that event our liability is limited as set out in the “Liability and insurance” section.",
      "[PLACEHOLDER] Insert the cancellation charge scale (for example, sums retained by notice period) and the date-change policy.",
    ],
  },
  {
    heading: "Your responsibilities as Hirer",
    body: [
      "You are responsible for the conduct of your guests and suppliers, for keeping to the agreed guest numbers and timings, and for ensuring your Event complies with all applicable laws and our reasonable instructions.",
      "You must not exceed the stated capacity of the space hired, or use the Venue for any purpose other than the agreed Event.",
    ],
  },
  {
    heading: "Catering, alcohol and corkage",
    body: [
      "The Chigwell Marquees are dry-hire venues. You are free to appoint your own caterer and to supply your own drinks, and there is no corkage charge.",
      "The supply of alcohol and any regulated entertainment must comply with the Venue’s premises licence and applicable licensing law.",
    ],
  },
  {
    heading: "Damage, conduct and security",
    body: [
      "You are responsible for any loss or damage to the Venue, its fixtures or equipment caused by you, your guests or your suppliers, beyond fair wear and tear.",
      "[PLACEHOLDER] Confirm the security/breakage deposit amount, how deductions are assessed, and the timescale for its return.",
    ],
  },
  {
    heading: "Liability and insurance",
    body: [
      "Nothing in these terms excludes or limits our liability where it would be unlawful to do so, including for death or personal injury caused by negligence.",
      "Subject to that, our total liability arising out of a booking is limited to the hire fee paid. We are not liable for the acts or omissions of suppliers you appoint.",
      "[PLACEHOLDER] Specify any requirement for the Hirer or suppliers to hold public liability insurance.",
    ],
  },
  {
    heading: "Circumstances beyond our control",
    body: [
      "We are not liable for failure or delay in performing our obligations caused by events beyond our reasonable control. Where possible we will work with you to reschedule.",
    ],
  },
  {
    heading: "Licensing and hours",
    body: [
      "The Venue is licensed for events until midnight, seven days a week. Access times, set-up and break-down are as agreed within the Hire Period.",
      "[PLACEHOLDER] Confirm standard access and break-down times and any noise or curfew conditions attached to the licence.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction.",
    ],
  },
  {
    heading: "How to contact us",
    body: [
      `By email at ${SITE.email}, by phone on ${SITE.phone}, or by post at ${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.county}, ${SITE.address.postcode}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDoc
      eyebrow="Legal · Terms"
      title={"Terms\nof Hire."}
      intro="The terms and conditions that apply when you hire The Chigwell Marquees for your event."
      lastUpdated="9 June 2026 (draft)"
      sections={sections}
    />
  );
}
