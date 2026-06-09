"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Renders the REAL value in the server HTML (so crawlers and AI read the true
 * figure, never 0), then progressively enhances: on the client it resets to 0
 * while still below the fold and counts up to the value when it scrolls into
 * view. If it is already on screen at load, or reduced motion is requested,
 * the real value simply stays put, no animation, no flash.
 */
export default function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.9,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  // SSR and the first client render both show the real value (hydration-safe).
  const [display, setDisplay] = useState(value);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // If it's already visible at load, keep the rendered value (avoid a flash).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    // Below the fold: drop to 0 off-screen, then animate up once it's in view.
    setDisplay(0);

    let raf = 0;
    let start = 0;
    let done = false;

    const run = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setDisplay(Math.round(easeOutExpo(p) * value));
      if (p < 1) raf = requestAnimationFrame(run);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          done = true;
          raf = requestAnimationFrame(run);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}
