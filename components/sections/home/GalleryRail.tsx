"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { EASE_LUXE } from "@/lib/motion";
import { HOME_GALLERY } from "@/lib/media";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimatedLink from "@/components/ui/AnimatedLink";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMounted } from "@/lib/useMounted";
import { useIsDesktop } from "@/lib/useMediaQuery";

/** Asymmetric editorial composition (12-col on desktop) + per-tile parallax depth. */
const LAYOUT = [
  { span: "md:col-span-7", aspect: "md:aspect-[16/11]", depth: 46 },
  { span: "md:col-span-5", aspect: "md:aspect-[4/5]", depth: 72 },
  { span: "md:col-span-5", aspect: "md:aspect-[5/6]", depth: 64 },
  { span: "md:col-span-7", aspect: "md:aspect-[16/10]", depth: 40 },
  { span: "md:col-span-6", aspect: "md:aspect-[5/4]", depth: 54 },
  { span: "md:col-span-6", aspect: "md:aspect-[5/4]", depth: 54 },
];

function Heading() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <Eyebrow>Gallery</Eyebrow>
        <h2 className="mt-5 display-md">A glimpse inside</h2>
      </div>
      <p className="max-w-xs text-sm text-mist">
        Real weddings, parties and celebrations beneath the marquees.
      </p>
    </div>
  );
}

function Tile({
  item,
  layout,
  n,
  parallax,
  reveal,
  onOpen,
}: {
  item: (typeof HOME_GALLERY)[number];
  layout: (typeof LAYOUT)[number];
  n: number;
  parallax: boolean;
  reveal: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [layout.depth, -layout.depth]);

  return (
    <motion.figure
      ref={ref}
      className={`group/g relative col-span-1 ${layout.span} aspect-[4/5] ${layout.aspect} overflow-hidden rounded-2xl bg-bone`}
      initial={reveal ? { opacity: 0, y: 30 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.85, ease: EASE_LUXE }}
    >
      <motion.div style={parallax ? { y } : undefined} className="absolute inset-x-0 -inset-y-[18%]">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 50vw, 40vw"
          className="object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/g:scale-[1.05]"
        />
      </motion.div>

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
    </motion.figure>
  );
}

export default function GalleryRail() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const isDesktop = useIsDesktop();
  const parallax = mounted && !reduced && isDesktop;

  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + HOME_GALLERY.length) % HOME_GALLERY.length)),
    [],
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

  const current = index === null ? null : HOME_GALLERY[index];

  return (
    <section className="bg-bone-dim py-20 md:py-28">
      <div className="container-luxe">
        <Heading />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-5">
          {HOME_GALLERY.map((m, i) => (
            <Tile
              key={m.src}
              item={m}
              layout={LAYOUT[i % LAYOUT.length]}
              n={i + 1}
              parallax={parallax}
              reveal={mounted && !reduced}
              onOpen={() => setIndex(i)}
            />
          ))}
        </div>

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
                {current.alt} · {(index ?? 0) + 1} / {HOME_GALLERY.length}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
