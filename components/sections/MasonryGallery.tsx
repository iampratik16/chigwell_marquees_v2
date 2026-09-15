"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_LUXE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Media } from "@/lib/media";
import { CANONICAL_SRC } from "@/lib/gallery-duplicates";

export type GalleryItem = Media & { cat: string };

export type GalleryFilter = { key: string; label: string };

/** Every category the site knows about, in display order. */
export const ALL_FILTERS: GalleryFilter[] = [
  { key: "all", label: "All Images" },
  { key: "weddings", label: "Weddings" },
  { key: "asian", label: "Asian Weddings" },
  { key: "engagements", label: "Engagements" },
  { key: "parties", label: "Parties" },
  { key: "birthdays", label: "Birthdays" },
  { key: "corporate", label: "Corporate Events" },
  { key: "civil", label: "Civil Ceremonies" },
  { key: "the-space", label: "The Space" },
];

/** Keep only the filters that actually match something in `items`. */
function filtersFor(items: GalleryItem[]): GalleryFilter[] {
  const present = new Set(items.map((i) => i.cat));
  return ALL_FILTERS.filter((f) => f.key === "all" || present.has(f.key));
}

export default function MasonryGallery({
  items,
  initialCount,
}: {
  items: GalleryItem[];
  /** Show only this many at first, with a "See more" button for the rest. */
  initialCount?: number;
}) {
  // The same photograph reached the site under several filenames. Keep the
  // first copy of each and skip the rest, so nothing shows twice. Done here
  // rather than in the source lists because every gallery passes through this
  // component, and a repeat on /gallery may be a venue gallery's only copy.
  const unique = useMemo(() => {
    const seen = new Set<string>();
    return items.filter((i) => {
      const id = CANONICAL_SRC[i.src] ?? i.src;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [items]);
  const filters = useMemo(() => filtersFor(unique), [unique]);
  // One category (plus "all") means the filters would do nothing — hide them.
  const showFilters = filters.length > 2;
  const [active, setActive] = useState("all");
  const [index, setIndex] = useState<number | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);

  const filtered = useMemo(
    () => (active === "all" ? unique : unique.filter((i) => i.cat === active)),
    [active, unique],
  );

  // Collapsed by default when `initialCount` is set, so a long gallery does not
  // force the reader to scroll past it. Everything below runs on `visible`, so
  // the lightbox only steps through what is actually on screen.
  const [expanded, setExpanded] = useState(false);
  const visible = useMemo(
    () => (initialCount && !expanded ? filtered.slice(0, initialCount) : filtered),
    [filtered, initialCount, expanded],
  );
  // Capped galleries render as an even grid — a flat "tray" that ends on a
  // straight edge. Ragged masonry columns left a large hole under the shorter
  // column once the list was capped. The uncapped /gallery page keeps masonry.
  const tray = Boolean(initialCount);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  // Keyboard controls + scroll lock while the lightbox is open.
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

  const current = index === null ? null : visible[index];

  return (
    <div className="container-luxe">
      {/* Mobile: horizontal scroll filter row */}
      {showFilters && (
      <div className="sticky top-16 z-20 -mx-[var(--gutter)] mb-8 flex gap-2 overflow-x-auto bg-bone/85 px-[var(--gutter)] py-3 backdrop-blur-md lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((f) => {
          const on = active === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-colors duration-400",
                on ? "border-ink bg-ink text-bone" : "border-line text-ink/70 hover:border-ink/40 hover:text-ink",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      )}

      <div className="lg:flex lg:gap-10 xl:gap-14">
        {/* Desktop: vertical, toggleable filter panel */}
        {showFilters && (
        <aside
          className={cn(
            "hidden shrink-0 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block",
            panelOpen ? "lg:w-52" : "lg:w-11",
          )}
        >
          <div className="sticky top-28">
            <div className={cn("flex items-center", panelOpen ? "justify-between" : "justify-center")}>
              {panelOpen && (
                <span className="text-[0.66rem] uppercase tracking-[0.24em] text-ink/45">Browse</span>
              )}
              <button
                onClick={() => setPanelOpen((o) => !o)}
                aria-label={panelOpen ? "Collapse filters" : "Expand filters"}
                aria-expanded={panelOpen}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink/60 transition-colors hover:border-ink/40 hover:text-ink"
              >
                <span className="text-lg leading-none">{panelOpen ? "‹" : "›"}</span>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {panelOpen && (
                <motion.nav
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_LUXE }}
                  className="mt-6 flex flex-col gap-1"
                >
                  {filters.map((f) => {
                    const on = active === f.key;
                    return (
                      <button
                        key={f.key}
                        onClick={() => setActive(f.key)}
                        className={cn(
                          "group/f relative overflow-hidden rounded-lg px-4 py-2.5 text-left text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
                          on ? "bg-ink text-bone" : "text-ink/60 hover:bg-ink/[0.05] hover:text-ink",
                        )}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </aside>
        )}

        <div
          className={cn(
            "min-w-0 flex-1",
            tray
              ? "grid grid-cols-2 gap-4 lg:grid-cols-3"
              : "[column-gap:1rem] columns-1 sm:columns-2 lg:columns-2 xl:columns-3",
          )}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((m, i) => (
              <motion.button
                key={m.src}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: EASE_LUXE, delay: (i % 6) * 0.04 }}
                onClick={() => setIndex(i)}
                data-cursor="View"
                aria-label={`View image: ${m.alt}`}
                className={cn(
                  "group/g relative block w-full overflow-hidden rounded-xl bg-bone-dim",
                  tray ? "aspect-[4/3]" : "mb-4 break-inside-avoid",
                )}
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  width={m.width}
                  height={m.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={cn(
                    "w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/g:scale-[1.04]",
                    tray ? "h-full" : "h-auto",
                  )}
                />
                <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover/g:bg-ink/10" />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {initialCount && filtered.length > initialCount && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            data-cursor={expanded ? "Less" : "More"}
            className="rounded-full border border-ink/25 px-8 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-400 hover:border-ink hover:bg-ink hover:text-bone"
          >
            {expanded ? "Show less" : "See more"}
          </button>
        </div>
      )}

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
            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:bg-bone hover:text-ink"
            >
              <span className="text-xl leading-none">×</span>
            </button>

            {/* Prev / Next */}
            <button
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:bg-bone hover:text-ink md:left-6"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Next"
              className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:bg-bone hover:text-ink md:right-6"
            >
              ›
            </button>

            <motion.figure
              key={current.src}
              className="relative flex max-h-full w-full max-w-[1600px] flex-col items-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: EASE_LUXE }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[80vh] w-[92vw] max-w-[1600px]">
                {/* Low-res blurred backdrop: loads near-instantly (~15KB) so the
                    frame is never black while the full image optimizes. */}
                <Image
                  src={current.src}
                  alt=""
                  aria-hidden
                  fill
                  sizes="24vw"
                  quality={65}
                  className="rounded-lg object-contain opacity-60 blur-xl"
                />
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 1600px"
                  quality={80}
                  priority
                  className="rounded-lg object-contain shadow-2xl"
                />
              </div>
              <figcaption className="mt-3 max-w-2xl text-center text-sm text-bone/70">
                {current.alt} · {(index ?? 0) + 1} / {visible.length}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
