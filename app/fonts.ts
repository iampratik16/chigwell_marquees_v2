import localFont from "next/font/local";

// Display serif, high-contrast editorial (Fontshare Gambetta, self-hosted).
//
// Only the faces the site actually renders are listed. Every one here is
// preloaded, so an unused face costs real time on the critical path: nine
// faces held the connection for the first 1.5s on a throttled phone and
// pushed the hero poster (the LCP element) out to 3.6s. Headings are 400,
// and `font-medium` only ever lands on sans elements — so Medium, Semibold
// and Bold were downloaded on every visit and never drawn. The .woff2 files
// are still in ./fonts if a weight is ever needed; add it back here to use it.
export const gambetta = localFont({
  src: [
    { path: "./fonts/Gambetta-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Gambetta-Italic.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-gambetta",
  display: "swap",
  preload: true,
});

// Body / UI, neutral grotesque (Fontshare Switzer, self-hosted)
export const switzer = localFont({
  src: [
    // 600 is used by one rule only (.cursor-label); 700 by nothing.
    { path: "./fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Switzer-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
  preload: true,
});
