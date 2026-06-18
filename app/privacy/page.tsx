import { pageMeta } from "@/lib/seo";
import LegalDoc, { type LegalSection } from "@/components/site/LegalDoc";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Privacy Policy | The Chigwell Marquees",
  description:
    "How The Chigwell Marquees collects, uses and protects your personal data when you enquire about or visit our luxury marquee venue in Essex.",
  path: "/privacy",
});

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      `The Chigwell Marquees ("we", "us", "our") provides marquee venue hire at ${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.county}, ${SITE.address.postcode}, and operates this website.`,
      "We are the data controller responsible for your personal data. You can contact us about this policy or your data at any time using the details in the “How to contact us” section below.",
      "[PLACEHOLDER] Add the registered company name and number, and the ICO data-protection registration number, once confirmed.",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "Enquiry details you give us directly: your name, email address, telephone number, event type, preferred dates, approximate guest numbers and any message you send through our enquiry form or by email, phone or WhatsApp.",
      "Booking and correspondence records created while we plan and deliver your event.",
      "Technical and usage data collected automatically when you visit the website, such as IP address, device and browser type, and pages viewed, where analytics or similar technologies are in use.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "To respond to your enquiry, prepare quotes and answer your questions.",
      "To administer and deliver a confirmed booking, including coordinating with you and your chosen suppliers.",
      "To manage payments, keep accounts and meet our legal and regulatory obligations.",
      "To improve the website and, where you have agreed, to send you relevant updates.",
    ],
  },
  {
    heading: "Our legal bases for processing",
    body: [
      "Under UK GDPR we rely on: performance of a contract (to deliver a booking you have made); our legitimate interests (to respond to enquiries and run our business); your consent (for optional marketing); and compliance with a legal obligation (for example, tax and accounting records).",
      "Where we rely on consent, you can withdraw it at any time without affecting processing carried out before withdrawal.",
    ],
  },
  {
    heading: "Sharing your information",
    body: [
      "We may share your information with trusted suppliers involved in your event (for example caterers, bar and entertainment providers) only as needed to deliver it, and with service providers who support our business (such as IT, hosting and payment processors).",
      "We may disclose information where required by law or to establish, exercise or defend legal claims. We do not sell your personal data.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "We keep personal data only for as long as necessary for the purposes set out above, including to meet legal, accounting or reporting requirements.",
      "[PLACEHOLDER] Confirm specific retention periods (for example, enquiry data retained for X months, booking and financial records retained for X years).",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Under UK data protection law you have the right to access, correct, erase, restrict or object to our processing of your personal data, the right to data portability, and the right to withdraw consent where processing is based on consent.",
      "To exercise any of these rights, contact us using the details below. You also have the right to complain to the Information Commissioner’s Office (ICO) at ico.org.uk.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "The website may use cookies or similar technologies to function correctly and to understand how it is used.",
      "[PLACEHOLDER] Add a full cookie list and a cookie-consent mechanism before launch if any non-essential cookies (for example analytics or advertising) are used.",
    ],
  },
  {
    heading: "Other websites",
    body: [
      "Our site may link to third-party websites and social media. This policy does not cover those sites, and we are not responsible for their content or privacy practices.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The current version, and the date it was last updated, will always appear on this page.",
    ],
  },
  {
    heading: "How to contact us",
    body: [
      `By email at ${SITE.email}, by phone on ${SITE.phone}, or by post at ${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.county}, ${SITE.address.postcode}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      eyebrow="Legal · Privacy"
      title={"Privacy\nPolicy."}
      intro="How we collect, use and protect your personal data, and the rights you have over it."
      lastUpdated="9 June 2026 (draft)"
      sections={sections}
    />
  );
}
