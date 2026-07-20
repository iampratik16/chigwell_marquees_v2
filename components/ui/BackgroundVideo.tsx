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
 * Full-bleed background clip. The poster underlay paints first; the clip stays
 * off the critical path — it ships with `preload="none"` so zero bytes (not even
 * metadata) move at parse time. After window `load`, the effect upgrades preload
 * to "metadata" and calls play().
 *
 * Why the upgrade matters: Safari/WebKit is unreliable at starting a video from
 * a cold `preload="none"` via a scripted play() — it can sit on the poster
 * forever, and our loadeddata/canplay fallbacks can't rescue it because those
 * events never fire without a load. Flipping to "metadata" lets canplay fire, so
 * the fallback works and desktop Safari keeps its motion — all still gated behind
 * `load`, so nothing hits the critical path.
 *
 * We call play() ourselves since the autoPlay attribute alone is unreliable on
 * mobile Safari (it leaves a tap-to-play button).
 */
export default function BackgroundVideo({ src, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // required for autoplay on iOS/Safari

    // ponytail: convention over config — every clip ships a "<name>-sm.mp4"
    // sibling (see lib/media.real.ts). Setting the element's src directly
    // overrides the <source> child before any bytes are fetched.
    if (window.matchMedia("(max-width: 767px)").matches) {
      v.src = src.replace(/\.mp4$/, "-sm.mp4");
    }

    const play = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const start = () => {
      // Now that the page has loaded, allow the browser to fetch metadata.
      // The element ships with preload="none" so nothing loads at parse time;
      // upgrading to "metadata" here lets Safari's canplay event fire (its
      // scripted-play from a cold "none" is unreliable) without ever touching
      // the critical path.
      v.preload = "metadata";
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

  // No autoPlay attribute, and preload="none" at parse time: together they keep
  // ALL video bytes (even metadata) off the critical path. The effect above,
  // after window load, upgrades preload to "metadata" and calls play().
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
