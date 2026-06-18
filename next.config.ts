import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Default trailing-slash handling (trailingSlash: false): Next.js 308-redirects
  // `/path/` → `/path`, after which the rules below fire. So both `/venues` and
  // `/venues/` resolve to the new URL (the slashed variant via one extra 308 hop).
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
    minimumCacheTTL: 2678400, // 31 days
  },

  async redirects() {
    return [
      // ════════════════════════════════════════════════════════════════
      // SEO MIGRATION — old WordPress (thechigwellmarquees.com) → new app
      // Source of truth: old /sitemap.xml (parsed). Every destination below
      // is a real, existing route on this site (verified). permanent: true
      // emits HTTP 308, which Google treats as a 301 for passing ranking signals.
      //
      // NOTE on /venues: the route on this site is /spaces, so /venues 301s to
      // /spaces (renaming the route to /venues is a separate, larger change —
      // out of scope for this redirects-only task).
      // ════════════════════════════════════════════════════════════════

      // ── Core pages ──────────────────────────────────────────────────
      { source: "/about-chigwell-marquees", destination: "/the-estate", permanent: true },
      { source: "/faqs", destination: "/the-estate", permanent: true }, // FAQs now live on About Us
      { source: "/contact-us", destination: "/visit", permanent: true },
      { source: "/enquiry", destination: "/visit", permanent: true },

      // ── Venues (route kept as /spaces) ──────────────────────────────
      { source: "/venues", destination: "/spaces", permanent: true },
      { source: "/venue/mega-marquee", destination: "/spaces/mega-marquee", permanent: true },
      { source: "/venue/mini-marquee", destination: "/spaces/mini-marquee", permanent: true },
      { source: "/venue/secret-garden", destination: "/spaces/secret-garden", permanent: true },

      // ── Events / occasions ──────────────────────────────────────────
      { source: "/events", destination: "/occasions", permanent: true },
      { source: "/new-events-page", destination: "/occasions", permanent: true },
      { source: "/event/weddings", destination: "/occasions/weddings", permanent: true },
      { source: "/event/civil-ceremony-venue", destination: "/occasions/weddings", permanent: true },
      { source: "/asian-wedding-mile-end", destination: "/occasions/faith-based", permanent: true },
      { source: "/event/corporate-events", destination: "/occasions/corporate", permanent: true },
      { source: "/corporate-events-london", destination: "/occasions/corporate", permanent: true },
      { source: "/event/parties", destination: "/occasions/celebrations", permanent: true },
      { source: "/event/engagement-party-venues", destination: "/occasions/celebrations", permanent: true },
      { source: "/event/birthday-party-venues", destination: "/occasions/celebrations", permanent: true },
      { source: "/party-venues-essex", destination: "/occasions/celebrations", permanent: true },
      { source: "/christmas-booking", destination: "/occasions/celebrations", permanent: true },

      // ── Testimonials / case studies → relevant occasion (or gallery) ─
      { source: "/testimonials", destination: "/gallery", permanent: true },
      { source: "/testimonials/bollywood-themed-engagement-party", destination: "/occasions/celebrations", permanent: true },
      { source: "/testimonials/amy-danny-summer-wedding-mini-marquee", destination: "/occasions/weddings", permanent: true },
      { source: "/testimonials/the-perfect-christmas-party-venue", destination: "/occasions/celebrations", permanent: true },
      { source: "/testimonials/festifit-saturday-8th-june-2019-mega-marquee", destination: "/occasions/corporate", permanent: true },

      // ── Legal ───────────────────────────────────────────────────────
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/cookies-policy", destination: "/privacy", permanent: true }, // privacy policy covers cookies
      { source: "/terms-conditions", destination: "/terms", permanent: true },

      // ── Legacy GSC-derived sources (kept; destinations valid) ────────
      { source: "/event/corporate-events-essex", destination: "/occasions/corporate", permanent: true },
      { source: "/event/party-venue-essex-2", destination: "/occasions/celebrations", permanent: true },
      { source: "/event/asian-wedding-venue-in-essex", destination: "/occasions/weddings", permanent: true },
      { source: "/party-venues-hire-essex", destination: "/occasions/celebrations", permanent: true },

      // ── PROVISIONAL — confirm before launch (avoids a 404 meanwhile) ─
      // /wedding-packages-chigwell: no packages page exists → weddings for now.
      { source: "/wedding-packages-chigwell", destination: "/occasions/weddings", permanent: true },
      // /sitemap (old HTML sitemap page): no equivalent → homepage for now.
      { source: "/sitemap", destination: "/", permanent: true },

      // ════════════════════════════════════════════════════════════════
      // GOOGLE SEARCH CONSOLE SUPPLEMENT — paste removed/ranking old URLs
      // that are NOT in the sitemap here, then map each to a real route:
      // { source: "/old-path", destination: "/new-path", permanent: true },
      // ════════════════════════════════════════════════════════════════
    ];
  },
};

export default nextConfig;
