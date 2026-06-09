/* JSON-LD structured data, single source of truth for rich results. */

import { SITE, SOCIALS } from "./site";

/** Stable @id for the venue so other nodes (services, events) can reference it. */
export const VENUE_ID = `${SITE.url}/#venue`;

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
  telephone: "+442031960159",
  email: SITE.email,
  image: `${SITE.url}/og/og-default.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Chigwell Hall, 159 High Road",
    addressLocality: "Chigwell",
    addressRegion: "Essex",
    postalCode: "IG7 6BD",
    addressCountry: "GB",
  },
  // TODO(before launch): add `geo` with the EXACT coordinates from the Google
  // Business Profile (Business Profile Manager -> the pinned map location).
  // Do NOT guess the latitude/longitude, wrong coords hurt local ranking.
  // Once known, add alongside `address`:
  //   geo: { "@type": "GeoCoordinates", latitude: <lat>, longitude: <lng> },
  maximumAttendeeCapacity: 1000,
  priceRange: "££££",
  areaServed: AREA_SERVED,
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
