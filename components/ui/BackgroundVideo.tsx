"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  /**
   * Kept for call-site compatibility; intentionally NOT forwarded to the
   * <video> element. Both call sites render the same frame as an optimized
   * `<Image priority>` underlay — a `poster` attribute here re-downloaded the
   * raw JPG a second time (~135KB duplicate on the homepage).
   */
  poster?: string;
  className?: string;
};

/**
 * Full-bleed background clip. The poster underlay paints first; the clip
 * itself stays out of the critical path: `preload="metadata"` plus play() only
 * after window `load` (or immediately if the page is already loaded), so the
 * multi-MB download never competes with fonts, JS, or the LCP image.
 * We call play() ourselves since the autoPlay attribute alone is unreliable on
 * mobile Safari (it leaves a tap-to-play button).
 */
export default function BackgroundVideo({ src, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // required for autoplay on iOS/Safari

    const play = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const start = () => {
      play();
      v.addEventListener("loadeddata", play);
      v.addEventListener("canplay", play);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      v.removeEventListener("loadeddata", play);
      v.removeEventListener("canplay", play);
    };
  }, [src]);

  // No autoPlay attribute: it would override preload="metadata" and start the
  // download at parse time. The effect above calls play() after load.
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
