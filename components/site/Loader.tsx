"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_LUXE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * First-load splash: the wordmark rises and a 0→100 counter tracks readiness
 * before the screen lifts away. Two rules keep it from ever *feeling* slow:
 *
 * 1. It gates on `document.fonts.ready` (what the reveal actually needs) —
 *    NEVER on window `load`, which waits for every below-fold image and the
 *    hero video and turned a 300ms page into a 5s one.
 * 2. It runs once per browser session (sessionStorage). Reloads and return
 *    visits within the session skip straight to the site.
 */

const MIN_MS = 400; // never flash by
const MAX_MS = 1800; // hard cap: reveal even if fonts stall
const SEEN_KEY = "tcm-splash-seen";

export default function Loader() {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  // Skip path (already seen / reduced motion) exits with a quick fade instead
  // of the full curtain lift.
  const [fast, setFast] = useState(false);

  // Lock scroll while the splash is up (matches Header's mobile-menu lock).
  useEffect(() => {
    if (!visible) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(SEEN_KEY);
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // storage unavailable (private mode): behave like a first visit
    }

    if (seen || reduced) {
      // Snap to done and fade out. `fast` must land in a render before the
      // element is removed so AnimatePresence picks up the fade exit.
      let raf = requestAnimationFrame(() => {
        setProgress(100);
        setFast(true);
        raf = requestAnimationFrame(() => {
          performance.mark("splash:dismissed");
          setVisible(false);
        });
      });
      return () => cancelAnimationFrame(raf);
    }

    let raf = 0;
    let cur = 0;
    let ready = false;
    // Fonts are the only asset the reveal is allowed to wait for.
    document.fonts.ready.then(() => {
      ready = true;
    });

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      // Target creeps to 90% while fonts load; readiness (or the cap)
      // releases it to 100%.
      let target = Math.min(90, (elapsed / 700) * 90);
      if ((ready && elapsed > MIN_MS) || elapsed > MAX_MS) target = 100;

      cur += (target - cur) * 0.2;
      const shown = target >= 100 && target - cur < 0.4 ? 100 : Math.round(cur);
      setProgress(shown);

      if (shown >= 100) {
        window.setTimeout(() => {
          // RUM hook: when the site actually became visible (exit anim starts).
          performance.mark("splash:dismissed");
          setVisible(false);
        }, 150);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
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
          exit={fast ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: fast ? 0.25 : 0.55, ease: EASE_LUXE }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_LUXE, delay: reduced ? 0 : 0.05 }}
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
