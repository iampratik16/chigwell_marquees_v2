"use client";

import { motion } from "framer-motion";
import { EASE_LUXE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Per-route transition. `template.tsx` re-mounts on every navigation, so the
 * curtain wipe + content fade play on each route change (and on first load).
 * The node structure is identical whether or not motion is reduced, only the
 * animation values change, so a post-mount reduced-motion flip never re-parents
 * the page subtree (which would crash React's reconciler).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] origin-bottom bg-ink"
        initial={{ scaleY: reduced ? 0 : 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: EASE_LUXE }}
      />
      <motion.div
        initial={{ opacity: reduced ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.4, ease: EASE_LUXE, delay: reduced ? 0 : 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
