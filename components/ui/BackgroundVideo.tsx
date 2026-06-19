"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  /** First-frame poster, shown only until the clip can play. */
  poster: string;
  className?: string;
};

/**
 * Full-bleed background clip that starts as fast as the network allows.
 * `preload="auto"` begins the download immediately and we call play()
 * ourselves on the earliest ready event, since the autoPlay attribute alone
 * is unreliable on mobile Safari (it leaves a tap-to-play button on the poster).
 */
export default function BackgroundVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // required for autoplay on iOS/Safari
    const play = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    play();
    v.addEventListener("loadeddata", play);
    v.addEventListener("canplay", play);
    return () => {
      v.removeEventListener("loadeddata", play);
      v.removeEventListener("canplay", play);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
