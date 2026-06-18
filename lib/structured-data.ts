/* JSON-LD structured data, single source of truth for rich results. */

import { SITE, SOCIALS } from "./site";

/** Stable @id for the venue so other nodes (services, events) can reference it. */
export const VENUE_ID = `${SITE.url}/#venue`;
/** Stable @id for the brand/publisher organisation. */
export const ORG_ID = `${SITE.url}/#organization`;

const AREA_SERVED = [
  { "@type": "AdministrativeArea", name: "Essex" },
  { "@type": "City", name: "London" },
];

/**
 * Sitewide LocalBusiness / EventVenue node, injected once in the root layout.
 * The multi-type array lets it carry both venue (maximumAttendeeCapacity) and
 * local-business (priceRange) properties.
 */
export const localBusiness = {
  "@context": "https://schema.org",
  "@type": ["EventVenue", "LocalBusiness"],
  "@id": VENUE_ID,
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: SITE.phoneIntl,
  email: SITE.email,
  image: `${SITE.url}/og/og-default.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.line1,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.county,
    postalCode: SITE.address.postcode,
    addressCountry: "GB",
  },
  // Verified to postcode precision from the IG7 6BD record for Chigwell Hall,
  // High Road. Owner: confirm this matches the pin in your Google Business
  // Profile exactly — wrong coordinates hurt local ranking.
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.624856,
    longitude: 0.076094,
  },
  hasMap: SITE.address.maps,
  // TODO(owner): add openingHoursSpecification only if you publish set
  // viewing/office hours. Do NOT invent them.
  maximumAttendeeCapacity: 1000,
  priceRange: "££££",
  areaServed: AREA_SERVED,
  sameAs: SOCIALS.map((s) => s.href),
};

/**
 * Organisation (brand / publisher) node, injected once in the root layout
 * beside the venue. Supplies the logo used for the Google knowledge panel.
 */
export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/og/og-default.jpg`,
  email: SITE.email,
  telephone: SITE.phoneIntl,
  sameAs: SOCIALS.map((s) => s.href),
};

type Crumb = { name: string; path: string };

/** BreadcrumbList for a nested route. Pass the full trail from Home down. */
export function breadcrumbList(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

type ServiceArgs = { name: string; serviceType: string; description: string; path: string };

/** A venue-hire Service offered by the business (used on the Occasions pages). */
export function serviceNode({ name, serviceType, description, path }: ServiceArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: `${SITE.url}${path}`,
    provider: { "@id": VENUE_ID },
    areaServed: AREA_SERVED,
  };
}

type Faq = { q: string; a: string };

/** FAQPage node. The Q&A must match the on-page accordion content. */
export function faqPage(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
