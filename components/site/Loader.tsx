"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_LUXE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * First-load splash: the brand crown draws itself in, the wordmark rises, and a
 * 0→100 counter tracks real readiness before the whole screen lifts away to
 * reveal the site. Mounted in the root layout, so it runs once per full document
 * load (a cold visit or a refresh) and never on client-side navigation.
 *
 * The counter eases toward a target that ramps while the page loads and snaps to
 * 100 on the window `load` event (fonts + hero image done). A hard cap guarantees
 * it dismisses even if `load` never fires.
 */

const MIN_MS = 700; // never flash by
const MAX_MS = 3600; // never hang past this

export default function Loader() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  // Lock scroll while the splash is up (matches Header's mobile-menu lock).
  useEffect(() => {
    if (!visible) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (reduced) {
      // Reduced motion: skip the count/draw, snap to done and lift away.
      const t = window.setTimeout(() => {
        setProgress(100);
        setVisible(false);
      }, 250);
      return () => window.clearTimeout(t);
    }

    let raf = 0;
    let cur = 0;
    let ready = document.readyState === "complete";
    const onReady = () => {
      ready = true;
    };
    if (!ready) window.addEventListener("load", onReady, { once: true });

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      // Target creeps to 90% while loading; the real `load` event (or the cap)
      // releases it to 100%. ponytail: eased simulation gated by a real signal —
      // byte-accurate progress isn't worth a Resource Timing observer here.
      let target = Math.min(90, (elapsed / 1800) * 90);
      if ((ready && elapsed > MIN_MS) || elapsed > MAX_MS) target = 100;

      cur += (target - cur) * 0.09;
      const shown = target >= 100 && target - cur < 0.4 ? 100 : Math.round(cur);
      setProgress(shown);

      if (shown >= 100) {
        window.setTimeout(() => setVisible(false), 420);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onReady);
    };
  }, [reduced]);

  return (
    <>
      {/* No-JS safety net: never trap a scriptless visitor behind the splash. */}
      <noscript>
        <style>{`.site-loader{display:none!important}`}</style>
      </noscript>
      <AnimatePresence>
        {visible && (
        <motion.div
          key="site-loader"
          className="site-loader fixed inset-0 z-[110] flex flex-col items-center justify-center bg-bone"
          initial={false}
          exit={reduced ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduced ? 0.3 : 0.9, ease: EASE_LUXE }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_LUXE, delay: reduced ? 0 : 0.1 }}
            >
              <Image
                src="/logo.png"
                alt="The Chigwell Marquees"
                width={630}
                height={156}
                priority
                sizes="(max-width: 640px) 240px, 320px"
                className="h-16 w-auto sm:h-20"
              />
            </motion.div>

            {/* Progress: hairline track + counter */}
            <div className="mt-10 flex w-44 flex-col items-center gap-3">
              <div className="h-px w-full overflow-hidden bg-line-soft">
                <div
                  className="h-full bg-champagne transition-[width] duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-display text-2xl tabular-nums tracking-tight text-ink">
                {progress}
                <span className="ml-0.5 align-super text-xs text-mist">%</span>
              </span>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
