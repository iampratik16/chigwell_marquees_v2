/* Per-page metadata builder — single source of truth for titles, canonicals
   and the full Open Graph / Twitter set. metadataBase (set in the root layout)
   resolves the relative `path`/`image` to absolute non-www https URLs, so the
   canonical and og:url always point at the canonical host. */

import type { Metadata } from "next";
import { SITE } from "./site";

const DEFAULT_OG_IMAGE = "/og/og-default.jpg";

type PageMetaArgs = {
  /** The full <title>. Used verbatim (absolute), so include the brand. */
  title: string;
  /** Meta description, ~150–160 chars. */
  description: string;
  /** Canonical path, e.g. "/venues/mega-marquee". Also becomes og:url. */
  path: string;
  /** OG image path; defaults to the sitewide venue image. */
  image?: string;
  /** Alt text for the OG image. */
  imageAlt?: string;
};

/**
 * Builds a complete, self-consistent Metadata object for a route.
 *
 * Next.js merges metadata *shallowly*, so a page that defines `openGraph`
 * replaces the layout's `openGraph` wholesale — every page therefore needs the
 * full set (type, locale, siteName, images) here, not just the per-page bits.
 */
export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
}: PageMetaArgs): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: SITE.name,
      url: path,
      title,
      description,
      images: [
        { url: image, width: 1200, height: 630, alt: imageAlt ?? `${SITE.name} — ${title}` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
