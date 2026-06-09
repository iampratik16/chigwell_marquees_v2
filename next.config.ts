import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // TODO: This redirect map is INCOMPLETE. Before launch, pull the full set
      // of old indexed URLs from Google Search Console (Pages report) or a
      // Screaming Frog crawl of the current live thechigwellmarquees.com, and
      // map every one to its new equivalent here. No old indexed URL should 404.
      // permanent: true emits a 308, which Google treats as a 301 for ranking.
      { source: "/event/corporate-events-essex", destination: "/occasions/corporate", permanent: true },
      { source: "/corporate-events-london", destination: "/occasions/corporate", permanent: true },
      { source: "/event/party-venue-essex-2", destination: "/occasions/celebrations", permanent: true },
      { source: "/party-venues-hire-essex", destination: "/occasions/celebrations", permanent: true },
      { source: "/event/asian-wedding-venue-in-essex", destination: "/occasions/weddings", permanent: true },
      { source: "/asian-wedding-mile-end", destination: "/occasions/weddings", permanent: true },
      { source: "/new-events-page", destination: "/occasions", permanent: true },
    ];
  },
};

export default nextConfig;
