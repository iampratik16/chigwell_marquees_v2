import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Real, indexable routes only (styleguide is intentionally excluded, noindex).
// "" is the homepage and resolves to SITE.url.
const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/the-estate", priority: 0.8, changeFrequency: "monthly" },
  { path: "/venues", priority: 0.8, changeFrequency: "monthly" },
  { path: "/venues/mega-marquee", priority: 0.7, changeFrequency: "monthly" },
  { path: "/venues/mini-marquee", priority: 0.7, changeFrequency: "monthly" },
  { path: "/venues/secret-garden", priority: 0.7, changeFrequency: "monthly" },
  { path: "/venues/suites", priority: 0.7, changeFrequency: "monthly" },
  { path: "/occasions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/occasions/weddings", priority: 0.7, changeFrequency: "monthly" },
  { path: "/occasions/celebrations", priority: 0.7, changeFrequency: "monthly" },
  { path: "/occasions/corporate", priority: 0.7, changeFrequency: "monthly" },
  { path: "/occasions/faith-based", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/visit", priority: 0.9, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Build-time timestamp, refreshes whenever the site is redeployed.
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
