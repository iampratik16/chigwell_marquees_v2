import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tree-shake framer-motion's barrel so each page ships only the motion
  // primitives it uses — smaller JS, faster hydration/render across the site.
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // 65 exists for full-bleed atmospheric backgrounds that sit behind scrims
    // (TwoSpaces crossfade panels) — compression artifacts are invisible there.
    qualities: [65, 75, 80],
    minimumCacheTTL: 2678400, // 31 days
  },

  // Vercel serves /public assets with `max-age=0, must-revalidate`, so every
  // repeat visit re-downloaded ~3MB of media. Media filenames are versioned in
  // practice (suffixed variants: garden-waterfall-10f etc.) — when replacing a
  // file, RENAME it; never overwrite in place, or visitors keep the old copy
  // for up to a year.
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Brand assets change rarely but are overwritten in place — cache a
        // day, serve stale while revalidating.
        source: "/:file(logo.png|logo-footer.png|cursor-crown.png)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },

  // trailingSlash defaults to `false`: the new site's canonical URLs are
  // slash-less (matching every canonical tag + sitemap entry). A request to a
  // legacy "/path/" is first 308-normalised to "/path", which then matches the
  // rules below — so BOTH "/path" and "/path/" reach the final destination.
  async redirects() {
    return [
      // permanent: true emits HTTP 308, which Google treats as a 301 for the
      // purpose of passing ranking signals. Every destination below is a real,
      // verified 200 route on the new site.

      // ── Core · About · Contact ──────────────────────────────────────────
      { source: "/about-chigwell-marquees", destination: "/the-estate", permanent: true },
      { source: "/faqs", destination: "/the-estate", permanent: true }, // FAQs now live on the About page
      { source: "/contact-us", destination: "/visit", permanent: true },
      { source: "/enquiry", destination: "/visit", permanent: true },

      // ── Venues ──────────────────────────────────────────────────────────
      // The old site's /venues is preserved outright as a real page (no redirect).
      // Catch the interim /spaces/* staging URLs and the old singular /venue/*.
      { source: "/spaces", destination: "/venues", permanent: true },
      { source: "/spaces/mega-marquee", destination: "/venues/mega-marquee", permanent: true },
      { source: "/spaces/mini-marquee", destination: "/venues/mini-marquee", permanent: true },
      { source: "/spaces/secret-garden", destination: "/venues/secret-garden", permanent: true },
      { source: "/spaces/suites", destination: "/venues/suites", permanent: true },
      { source: "/venue/mega-marquee", destination: "/venues/mega-marquee", permanent: true },
      { source: "/venue/mini-marquee", destination: "/venues/mini-marquee", permanent: true },
      { source: "/venue/secret-garden", destination: "/venues/secret-garden", permanent: true },

      // ── Events · Occasions ──────────────────────────────────────────────
      { source: "/events", destination: "/occasions", permanent: true },
      { source: "/new-events-page", destination: "/occasions", permanent: true },
      { source: "/event/weddings", destination: "/occasions/weddings", permanent: true },
      { source: "/event/civil-ceremony-venue", destination: "/occasions/weddings", permanent: true },
      { source: "/event/corporate-events", destination: "/occasions/corporate", permanent: true },
      { source: "/corporate-events-london", destination: "/occasions/corporate", permanent: true },
      { source: "/event/parties", destination: "/occasions/celebrations", permanent: true },
      { source: "/event/engagement-party-venues", destination: "/occasions/celebrations", permanent: true },
      { source: "/event/birthday-party-venues", destination: "/occasions/celebrations", permanent: true },
      { source: "/party-venues-essex", destination: "/occasions/celebrations", permanent: true },
      { source: "/christmas-booking", destination: "/occasions/celebrations", permanent: true },
      // Asian/Indian wedding equity now targets the Faith-Based page (which exists).
      { source: "/asian-wedding-mile-end", destination: "/occasions/faith-based", permanent: true },

      // ── Testimonials (removed) → Gallery / closest occasion ─────────────
      { source: "/testimonials", destination: "/gallery", permanent: true },
      { source: "/testimonials/bollywood-themed-engagement-party", destination: "/occasions/celebrations", permanent: true },
      { source: "/testimonials/amy-danny-summer-wedding-mini-marquee", destination: "/occasions/weddings", permanent: true },
      { source: "/testimonials/the-perfect-christmas-party-venue", destination: "/occasions/celebrations", permanent: true },
      { source: "/testimonials/festifit-saturday-8th-june-2019-mega-marquee", destination: "/occasions/corporate", permanent: true },

      // ── Legal ───────────────────────────────────────────────────────────
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/cookies-policy", destination: "/privacy", permanent: true },
      { source: "/terms-conditions", destination: "/terms", permanent: true },

      // ── Provisional (no exact successor — confirm against Search Console) ─
      // PROVISIONAL: ranks for "wedding packages" / "cheap wedding venue". If it
      // has real GSC traffic, build a dedicated packages page and repoint here.
      { source: "/wedding-packages-chigwell", destination: "/occasions/weddings", permanent: true },
      // PROVISIONAL: old HTML sitemap page, no equivalent. (Does NOT affect
      // /sitemap.xml, which is a different path served by app/sitemap.ts.)
      { source: "/sitemap", destination: "/", permanent: true },

      // ── Additional legacy slugs (from prior crawl, not in the primary map) ─
      // Kept defensively: a redirect for a dead URL is free; dropping one for a
      // still-indexed URL loses equity. Confirm/prune against Search Console.
      { source: "/event/corporate-events-essex", destination: "/occasions/corporate", permanent: true },
      { source: "/event/party-venue-essex-2", destination: "/occasions/celebrations", permanent: true },
      { source: "/party-venues-hire-essex", destination: "/occasions/celebrations", permanent: true },
      { source: "/event/asian-wedding-venue-in-essex", destination: "/occasions/faith-based", permanent: true },

      // ── GSC SUPPLEMENT ──────────────────────────────────────────────────
      // Paste removed-but-still-linked old URLs from the Search Console Pages
      // export (or a Screaming Frog crawl of the live site) below, mapping each
      // to its closest 200 successor. No old indexed URL should be left to 404.
      // { source: "/old-url", destination: "/new-url", permanent: true },
    ];
  },
};

export default nextConfig;
