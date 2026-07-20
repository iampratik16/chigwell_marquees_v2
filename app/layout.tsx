import type { Metadata, Viewport } from "next";
import { gambetta, switzer } from "./fonts";
import { SITE } from "@/lib/site";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Loader from "@/components/site/Loader";
import Grain from "@/components/effects/Grain";
import Cursor from "@/components/effects/Cursor";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import FloatingActions from "@/components/site/FloatingActions";
import JsonLd from "@/components/site/JsonLd";
import { LightboxProvider } from "@/components/ui/Lightbox";
import { localBusiness, organization } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "The Chigwell Marquees | Luxury Marquee Wedding Venue in Essex",
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "marquee venue Essex",
    "wedding venue Essex",
    "Chigwell Hall",
    "Asian wedding venue",
    "corporate event venue",
    "luxury marquee hire",
  ],
  // Defaults only: no title/description here so each page's own copy fills
  // og/twitter, and no canonical here so it doesn't leak to every route.
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: SITE.name,
    images: [
      { url: "/og/og-default.jpg", width: 1200, height: 630, alt: `${SITE.name}, luxury marquee venue in Essex` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/og-default.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#16130f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${gambetta.variable} ${switzer.variable}`}>
      <body className="bg-bone text-ink antialiased">
        <JsonLd data={[organization, localBusiness]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-bone"
        >
          Skip to content
        </a>
        <Loader />
        <SmoothScroll>
          <Grain />
          <Cursor />
          <LightboxProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <FloatingActions />
          </LightboxProvider>
        </SmoothScroll>
        {/* Real-user Core Web Vitals -> Vercel dashboard. No-op until Speed
            Insights is enabled on the Vercel project. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
