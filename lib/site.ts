/* Global facts, contact details and navigation, single source of truth. */

export const SITE = {
  name: "The Chigwell Marquees",
  shortName: "Chigwell Marquees",
  tagline: "A grand setting for remarkable occasions",
  description:
    "Two luxury marquee venues set within the 42-acre grounds of the Grade II listed Chigwell Hall estate in Essex, for weddings, celebrations and corporate events of 30 to 1,000 guests.",
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
      { label: "The Mega Marquee", href: "/venues/mega-marquee", blurb: "300 – 1,000 guests" },
      { label: "The Mini Marquee", href: "/venues/mini-marquee", blurb: "30 – 200 · starlit ceiling" },
      { label: "The Secret Garden", href: "/venues/secret-garden", blurb: "Outdoor ceremonies · up to 250" },
      { label: "The Suites", href: "/venues/suites", blurb: "Banqueting & Belmont · indoor" },
    ],
  },
  {
    label: "Occasions",
    href: "/occasions",
    children: [
      { label: "Weddings", href: "/occasions/weddings", blurb: "Garden, civil & Asian weddings" },
      { label: "Corporate Events", href: "/occasions/corporate", blurb: "Galas, conferences, festivals" },
      { label: "Faith-Based Events", href: "/occasions/faith-based", blurb: "Asian weddings, mitzvahs & ceremonies" },
      { label: "Private Celebrations", href: "/occasions/celebrations", blurb: "Birthdays, engagements, anniversaries" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Visit", href: "/visit" },
];

/** Credibility numbers, counted up on view. */
export const STATS = [
  { value: 42, suffix: "", label: "Acres of estate" },
  { value: 1000, suffix: "", label: "Guests at capacity" },
  { value: 600, suffix: "", label: "Free parking spaces" },
  { value: 2, suffix: "", label: "Marquees & a garden" },
] as const;

/** Quick facts band. */
export const FACTS = [
  { k: "Location", v: "Chigwell, Essex · IG7 6BD" },
  { k: "From London", v: "≈ 40 minutes · M25 in 15" },
  { k: "Licensed until", v: "Midnight, 7 days a week" },
  { k: "Hire", v: "Dry hire · no corkage" },
] as const;

/**
 * Real FAQs, single source of truth for both the visible /visit accordion
 * and the FAQPage JSON-LD (Google requires the marked-up Q&A to match the
 * on-page content exactly).
 */
export const FAQS = [
  {
    q: "What's the difference between your Mega and Mini Marquee?",
    a: "Capacity! Our Mega Marquee is the larger of the two venues, accommodating from 300 -1,000 guests. Our Mini Marquee is for a more intimate event accommodating for up to 200 guests.",
  },
  {
    q: "Is the venue licensed for Civil Ceremonies?",
    a: "Our Secret Garden and Belmont Suite are both licensed to hold Civil Ceremonies.",
  },
  {
    q: "Does the hire cost include catering?",
    a: "Unfortunately, no. The Chigwell Marquees are dry hire venues.",
  },
  {
    q: "How many hours does the hire charge include?",
    a: "12 Hours is standard however when holding your Civil Ceremony with us, this can be extended.",
  },
  {
    q: "Is there parking available at The Chigwell Marquees?",
    a: "Yes! And lots of it! We have approximately 600 carpark spaces available which are free for guests to use.",
  },
  {
    q: "Are fireworks permitted?",
    a: "No, they are not.",
  },
  {
    q: "What time does my event need to finish by?",
    a: "At The Chigwell Marquees, our license permits events to go on until midnight.",
  },
  {
    q: "What's the nearest tube station to The Chigwell Marquees?",
    a: "Chigwell Station is our nearest underground station. This is found on the Central Line. From here, it's a 15-minute walk to the venue or a 5-minute car journey.",
  },
  {
    q: "Do you have accommodation for guests at the venue?",
    a: "Sadly we do not.",
  },
  {
    q: "Are there nearby hotels for guests to stay?",
    a: "Yes! The Travelodge Chigwell is a 6-minute car journey away from The Chigwell Marquees. The Premier Inn Buckhurst Hill is a 7-minute car journey away from The Chigwell Marquees.",
  },
] as const;
