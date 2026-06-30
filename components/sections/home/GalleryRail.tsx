"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_LUXE } from "@/lib/motion";
import { HOME_GALLERY } from "@/lib/media";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedLink from "@/components/ui/AnimatedLink";
import { cn } from "@/lib/utils";
import { useIsDesktop } from "@/lib/useMediaQuery";

const TOTAL = HOME_GALLERY.length;

function Heading() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <Eyebrow>Gallery</Eyebrow>
        <h2 className="mt-5 display-md">A glimpse inside</h2>
      </div>
    </div>
  );
}

function Card({ item, n, onOpen }: { item: (typeof HOME_GALLERY)[number]; n: number; onOpen: () => void }) {
  return (
    <figure className="group/g relative aspect-[4/3] overflow-hidden rounded-2xl bg-bone">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 92vw, 46vw"
        className="object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/g:scale-[1.05]"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover/g:opacity-90" />
      <button
        type="button"
        onClick={onOpen}
        data-cursor="View"
        aria-label={`Enlarge image: ${item.alt}`}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex h-[4.5rem] w-[4.5rem] scale-90 items-center justify-center rounded-full border border-bone/70 bg-ink/25 text-[0.66rem] uppercase tracking-[0.22em] text-bone opacity-0 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/g:scale-100 group-hover/g:opacity-100">
          View
        </span>
      </button>
      <figcaption className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-ink/55 px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-bone backdrop-blur">
        {String(n).padStart(2, "0")}
      </figcaption>
    </figure>
  );
}

export default function GalleryRail() {
  const isDesktop = useIsDesktop();
  const perView = isDesktop ? 2 : 1;
  const pages = Math.ceil(TOTAL / perView);

  const [page, setPage] = useState(0);
  const [index, setIndex] = useState<number | null>(null); // lightbox

  // Keep the active page valid when the viewport crosses the breakpoint.
  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1));
  }, [pages]);

  const goto = useCallback((p: number) => setPage(Math.max(0, Math.min(pages - 1, p))), [pages]);
  const atStart = page === 0;
  const atEnd = page >= pages - 1;

  // Exact offset as a percentage of the track (slides are border-box, no gaps).
  const offset = (page * perView * 100) / TOTAL;

  // Touch swipe (phone/tablet): a clear horizontal drag flips the page.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchStart.current;
    touchStart.current = null;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) goto(page + (dx < 0 ? 1 : -1));
  };

  // Lightbox controls
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + TOTAL) % TOTAL)),
    [],
  );
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [index, close, step]);
  const current = index === null ? null : HOME_GALLERY[index];

  const Arrow = ({ dir, disabled }: { dir: -1 | 1; disabled: boolean }) => (
    <button
      type="button"
      onClick={() => goto(page + dir)}
      disabled={disabled}
      aria-label={dir === 1 ? "Next" : "Previous"}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-lg text-ink transition-all duration-300",
        disabled ? "cursor-not-allowed opacity-30" : "hover:border-ink hover:bg-ink hover:text-bone",
      )}
    >
      {dir === 1 ? "→" : "←"}
    </button>
  );

  return (
    <section className="overflow-hidden bg-bone-dim py-16 md:py-20">
      <div className="container-luxe">
        <Heading />

        {/* Carousel viewport — swipeable on touch devices */}
        <div
          className="relative mt-12 touch-pan-y overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(-${offset}%)`,
              transition: "transform 0.75s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {HOME_GALLERY.map((m, i) => (
              <div key={m.src} className="box-border px-2 md:px-2.5" style={{ flex: `0 0 ${100 / perView}%` }}>
                <Card item={m} n={i + 1} onOpen={() => setIndex(i)} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls: pill pagination + arrows */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2" role="tablist" aria-label="Gallery pages">
            {Array.from({ length: pages }).map((_, i) => {
              const on = i === page;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goto(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    on ? "w-8 bg-ink" : "w-2 bg-ink/25 hover:bg-ink/45",
                  )}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <Arrow dir={-1} disabled={atStart} />
            <Arrow dir={1} disabled={atEnd} />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-bone px-8 py-10 md:flex-row md:items-center">
          <div>
            <h3 className="display-md">Every angle of the estate.</h3>
            <p className="mt-3 max-w-md text-mist">
              Real weddings, parties and celebrations beneath the marquees.
            </p>
          </div>
          <AnimatedLink href="/gallery" arrow cursorLabel="Gallery">
            View the full gallery
          </AnimatedLink>
        </div>
      </div>

      {/* Lightbox */}
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:bg-bone hover:text-ink md:left-6"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next"
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:bg-bone hover:text-ink md:right-6"
            >
              ›
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
                {current.alt} · {(index ?? 0) + 1} / {TOTAL}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
