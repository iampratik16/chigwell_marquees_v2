"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_LUXE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Media } from "@/lib/media";

export type GalleryItem = Media & { cat: string };

const FILTERS = [
  { key: "all", label: "Everything" },
  { key: "weddings", label: "Weddings" },
  { key: "asian", label: "Asian Weddings" },
  { key: "engagements", label: "Engagements" },
  { key: "parties", label: "Parties" },
  { key: "birthdays", label: "Birthdays" },
  { key: "corporate", label: "Corporate Events" },
  { key: "civil", label: "Civil Ceremonies" },
];

export default function MasonryGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState("all");
  const [index, setIndex] = useState<number | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);

  const filtered = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.cat === active)),
    [active, items],
  );

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length)),
    [filtered.length],
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

  const current = index === null ? null : filtered[index];

  return (
    <div className="container-luxe">
      {/* Mobile: horizontal scroll filter row */}
      <div className="sticky top-16 z-20 -mx-[var(--gutter)] mb-8 flex gap-2 overflow-x-auto bg-bone/85 px-[var(--gutter)] py-3 backdrop-blur-md lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((f) => {
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

      <div className="lg:flex lg:gap-10 xl:gap-14">
        {/* Desktop: vertical, toggleable filter panel */}
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
                  {FILTERS.map((f) => {
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

        {/* Masonry via CSS columns */}
        <div className="min-w-0 flex-1 [column-gap:1rem] columns-1 sm:columns-2 lg:columns-2 xl:columns-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((m, i) => (
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
                className="group/g relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl bg-bone-dim"
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  width={m.width}
                  height={m.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/g:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover/g:bg-ink/10" />
              </motion.button>
            ))}
          </AnimatePresence>
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
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="92vw"
                  quality={80}
                  priority
                  className="rounded-lg object-contain shadow-2xl"
                />
              </div>
              <figcaption className="mt-3 max-w-2xl text-center text-sm text-bone/70">
                {current.alt} · {(index ?? 0) + 1} / {filtered.length}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
