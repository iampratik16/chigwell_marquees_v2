/* Global facts, contact details and navigation, single source of truth. */

export const SITE = {
  name: "The Chigwell Marquees",
  shortName: "Chigwell Marquees",
  tagline: "A grand setting for remarkable occasions",
  description:
    "Two luxury marquee venues set within the 42-acre grounds of the Grade II listed Chigwell Hall in Essex, for weddings, celebrations and corporate events of 30 to 1,000 guests.",
  url: "https://thechigwellmarquees.com",
  phone: "020 3196 0159",
  phoneHref: "tel:02031960159",
  phoneIntl: "+442031960159", // E.164, single source for schema.org telephone
  email: "info@thechigwellmarquees.com",
  /** Single source of truth for WhatsApp — number, greeting and display format. */
  whatsapp: {
    number: "447549517417",
    greeting: "Hi, I'd like to enquire about The Chigwell Marquees.",
    display: "+44 7549 517417",
  },
  address: {
    venue: "Chigwell Hall",
    street: "159 High Road",
    /** Combined form, kept for the footer, terms and schema.org. */
    line1: "Chigwell Hall, 159 High Road",
    city: "Chigwell",
    county: "Essex",
    postcode: "IG7 6BD",
    maps: "https://www.google.com/maps/search/?api=1&query=The+Chigwell+Marquees+159+High+Road+Chigwell+IG7+6BD",
  },
} as const;

/** wa.me link built from the single-source-of-truth WhatsApp config. */
export function whatsappLink(withGreeting = true): string {
  const base = `https://wa.me/${SITE.whatsapp.number}`;
  return withGreeting
    ? `${base}?text=${encodeURIComponent(SITE.whatsapp.greeting)}`
    : base;
}

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/thechigwellmarquees/" },
  { label: "Facebook", href: "https://www.facebook.com/thechigwellmarquees/" },
  { label: "TikTok", href: "https://www.tiktok.com/@thechigwellmarquees" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCkorur4vvYUVoTDh5GAYzsw" },
] as const;

export type NavChild = { label: string; href: string; blurb?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    label: "About Us",
    href: "/the-estate",
  },
  {
    label: "Venues",
    href: "/venues",
    children: [
      { label: "The Mega Marquee", href: "/venues/mega-marquee", blurb: "200 – 1,000 guests" },
      { label: "The Mini Marquee", href: "/venues/mini-marquee", blurb: "30 – 200 · with the Secret Garden" },
      { label: "Chigwell Hall", href: "/venues/suites", blurb: "Banqueting & Belmont · indoor" },
    ],
  },
  {
    label: "Occasions",
    href: "/occasions",
    children: [
      { label: "Weddings", href: "/occasions/weddings", blurb: "Garden, civil & Asian weddings" },
      { label: "Corporate Events", href: "/occasions/corporate", blurb: "Galas, conferences, festivals" },
      { label: "Cultural & Religious Events", href: "/occasions/faith-based", blurb: "Asian weddings, mitzvahs & ceremonies" },
      { label: "Private Celebrations", href: "/occasions/celebrations", blurb: "Birthdays, engagements, anniversaries" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/visit" },
];

/** Credibility numbers, counted up on view. */
export const STATS = [
  { value: 42, suffix: "", label: "Acres of grounds" },
  { value: 1000, suffix: "", label: "Maximum guest capacity" },
  { value: 600, suffix: "", label: "Complimentary parking spaces" },
  { value: 2, suffix: "", label: "Dedicated marquee venues" },
] as const;

/** Quick facts band. */
export const FACTS = [
  { k: "Location", v: "Chigwell Hall, 159 High Road, Chigwell, Essex IG7 6BD" },
  { k: "Getting Here", v: "Approximately five minutes by car from Chigwell Underground Station on the Central Line." },
  { k: "Parking", v: "Extensive complimentary on-site guest parking." },
  { k: "Hire", v: "Dry-hire venue" },
] as const;

/**
 * Real FAQs, single source of truth for both the visible /visit accordion
 * and the FAQPage JSON-LD (Google requires the marked-up Q&A to match the
 * on-page content exactly).
 */
export const FAQS = [
  {
    q: "What's the difference between the Mega and Mini Marquee?",
    a: "The Mega Marquee is our larger venue, accommodating events from 200 to 1,000 guests. The Mini Marquee provides a more intimate setting for events of 30 to 200 guests.",
  },
  {
    q: "Is the venue licensed for civil ceremonies?",
    a: "Selected areas at The Chigwell Marquees are licensed for civil ceremonies. Please speak to our events team about the options available for your chosen venue and date.",
  },
  {
    q: "Does the hire cost include catering?",
    a: "No. The Chigwell Marquees operates as a dry-hire venue, giving you flexibility when choosing your approved caterer and other suppliers.",
  },
  {
    q: "How many hours does the hire charge include?",
    a: "Access and event timings depend on your venue and booking. Our events team will confirm your setup, event and departure times when discussing your booking.",
  },
  {
    q: "Is parking available?",
    a: "Yes. Extensive complimentary on-site parking is available for guests.",
  },
  {
    q: "Are fireworks permitted?",
    a: "No. Fireworks are not permitted within the grounds.",
  },
  {
    q: "What time does my event need to finish?",
    a: "Event timings are subject to the venue licence and your booking agreement. Our events team will confirm the permitted timings for your event.",
  },
  {
    q: "What is the nearest Underground station?",
    a: "Chigwell Underground Station on the Central Line is the nearest station, approximately five minutes away by car.",
  },
  {
    q: "Do you have accommodation?",
    a: "Guest accommodation is not currently available on site.",
  },
  {
    q: "Are there hotels nearby?",
    a: "Yes. A number of hotels are located within a short drive of The Chigwell Marquees.",
  },
] as const;
