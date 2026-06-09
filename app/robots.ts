import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Only the production domain (thechigwellmarquees.com) should be indexable.
  // Preview deployments (*.vercel.app) and local builds must stay out of the
  // search index, otherwise the staging copy competes with the real site.
  // VERCEL_ENV is "production" only on the production deployment.
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/styleguide" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
