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
  email: "info@thechigwellmarquees.com",
  whatsapp: "https://wa.me/message/QDPSE2YBQRTTC1",
  address: {
    line1: "Chigwell Hall, 159 High Road",
    city: "Chigwell",
    county: "Essex",
    postcode: "IG7 6BD",
    maps: "https://www.google.com/maps/search/?api=1&query=The+Chigwell+Marquees+159+High+Road+Chigwell+IG7+6BD",
  },
} as const;

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
    label: "The Estate",
    href: "/the-estate",
  },
  {
    label: "Spaces",
    href: "/spaces",
    children: [
      { label: "The Mega Marquee", href: "/spaces/mega-marquee", blurb: "300 – 1,000 guests" },
      { label: "The Mini Marquee", href: "/spaces/mini-marquee", blurb: "30 – 200 · starlit ceiling" },
      { label: "The Secret Garden", href: "/spaces/secret-garden", blurb: "Outdoor ceremonies · up to 250" },
    ],
  },
  {
    label: "Occasions",
    href: "/occasions",
    children: [
      { label: "Weddings", href: "/occasions/weddings", blurb: "Garden, civil & Asian weddings" },
      { label: "Celebrations", href: "/occasions/celebrations", blurb: "Birthdays, engagements, mitzvahs" },
      { label: "Corporate", href: "/occasions/corporate", blurb: "Galas, conferences, festivals" },
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
    q: "What's the difference between the Mega and Mini Marquee?",
    a: "Capacity. The Mega Marquee is the larger of the two, accommodating from 300 to 1,000 guests. The Mini Marquee is for a more intimate event, for up to 200.",
  },
  {
    q: "Are the venues licensed for civil ceremonies?",
    a: "Yes, our Secret Garden and Belmont Suite are both licensed to hold civil ceremonies, and the Mini Marquee is licensed too.",
  },
  {
    q: "Does the hire cost include catering?",
    a: "No, The Chigwell Marquees are dry-hire venues, so you're free to bring your own caterer. There's no corkage, either.",
  },
  {
    q: "How many hours does the hire include?",
    a: "Twelve hours is standard. When you hold your civil ceremony with us, this can be extended.",
  },
  {
    q: "Is there parking?",
    a: "Yes, and lots of it. We have approximately 600 car-park spaces, free for your guests to use.",
  },
  {
    q: "What time does my event need to finish?",
    a: "Our licence permits events to run until midnight, seven days a week.",
  },
  {
    q: "What's the nearest tube station?",
    a: "Chigwell Station, on the Central Line, a 15-minute walk or a 5-minute car journey from the venue.",
  },
  {
    q: "Are there nearby hotels for guests?",
    a: "Yes. The Travelodge Chigwell is a 6-minute drive away, and the Premier Inn Buckhurst Hill is around 7 minutes.",
  },
] as const;
