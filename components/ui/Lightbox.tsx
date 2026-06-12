"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_LUXE } from "@/lib/motion";
import type { Media } from "@/lib/media";

type LightboxContextValue = {
  /** Open the lightbox on a single image. */
  open: (media: Media) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

/**
 * App-wide single-image lightbox. Any component can call `useLightbox().open(media)`
 * to present a full, contained view of an image with a darkened backdrop.
 */
export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<Media | null>(null);

  const open = useCallback((media: Media) => setCurrent(media), []);
  const close = useCallback(() => setCurrent(null), []);

  // Close on Escape, and lock body scroll while open.
  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [current, close]);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-xl md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_LUXE }}
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:bg-bone hover:text-ink"
            >
              <span className="text-xl leading-none">×</span>
            </button>
            <motion.figure
              key={current.src}
              className="relative flex max-h-full max-w-6xl flex-col items-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: EASE_LUXE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="92vw"
                priority
                className="h-auto max-h-[82vh] w-auto rounded-lg object-contain shadow-2xl"
              />
              <figcaption className="mt-4 max-w-2xl text-center text-sm text-bone/70">
                {current.alt}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}

/** Access the app-wide lightbox. Returns a no-op opener if no provider is mounted. */
export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  return ctx ?? { open: () => {} };
}
