"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_LUXE, inView } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMounted } from "@/lib/useMounted";
import { cn } from "@/lib/utils";
import type { Media } from "@/lib/media";

type Props = {
  src: string;
  /** Poster + reduced-motion / pre-mount fallback. */
  poster: Media;
  ratio?: string;
  className?: string;
  cursorLabel?: string;
};

/** Looping muted feature video with a poster fallback; honours reduced motion. */
export default function RevealVideo({
  src,
  poster,
  ratio = "4 / 5",
  className,
  cursorLabel,
}: Props) {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  // Only fetch + decode the clip once it's about to enter the viewport. An
  // off-screen <video autoPlay> would otherwise download and decode on page
  // load, starving the hero of bandwidth and stuttering the main thread.
  useEffect(() => {
    if (near || reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }, // start loading ~300px before it scrolls in
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near, reduced]);

  const play = mounted && !reduced && near;

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden bg-bone-dim", className)}
      style={{ aspectRatio: ratio }}
      data-cursor={cursorLabel}
      initial={reduced ? false : { opacity: 0 }}
      whileInView={reduced ? undefined : { opacity: 1 }}
      viewport={{ ...inView }}
      transition={{ duration: 0.7, ease: EASE_LUXE }}
    >
      {play ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster.src}
          className="h-full w-full object-cover"
          aria-hidden
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={poster.src}
          alt={poster.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      )}
    </motion.div>
  );
}
