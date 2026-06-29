"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedLink from "@/components/ui/AnimatedLink";
import { EASE_LUXE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

type Area = {
  numeral: string;
  name: string;
  capacity: string;
  copy: string;
  href: string;
  media: { src: string; alt: string };
};

/* Four estate settings presented in one cinematic, tabbed stage. */
const AREAS: Area[] = [
  {
    numeral: "I",
    name: "The Mega Marquee",
    capacity: "300 – 1,000 guests",
    copy: "High ceilings, neutral interiors, a state-of-the-art sound & lighting rig and a fully functioning kitchen, a grand blank canvas for weddings, galas and corporate showcases.",
    href: "/venues/mega-marquee",
    media: { src: "/media/mega-photo-35.jpg", alt: "Inside the Mega Marquee dressed for a celebration" },
  },
  {
    numeral: "II",
    name: "The Mini Marquee",
    capacity: "30 – 200 guests",
    copy: "Floor-to-ceiling glass, built-in air conditioning and a white-canopy starlit ceiling that switches on as evening falls, opening onto the Secret Garden.",
    href: "/venues/mini-marquee",
    media: { src: "/media/mini-8c.jpg", alt: "The Mini Marquee, an intimate light-filled setting" },
  },
  {
    numeral: "III",
    name: "Chigwell Hall",
    // TODO(client): confirm a capacity/subtitle line for Chigwell Hall.
    capacity: "Grade II listed manor",
    // TODO(client): confirm final description copy for Chigwell Hall.
    copy: "A magnificent Grade II listed Victorian manor at the heart of the estate, home to elegant indoor function suites.",
    // TODO(client): confirm the canonical link target for Chigwell Hall (estate vs. suites).
    href: "/the-estate",
    media: { src: "/media/chigwell-hall-4e.jpg", alt: "Chigwell Hall, the Grade II listed manor on the estate" },
  },
  {
    numeral: "IV",
    name: "Grounds & Gardens",
    capacity: "up to 250",
    copy: "A secluded lawn with a classic central fountain, the picturesque setting for outdoor civil ceremonies, welcome drinks and unforgettable photography.",
    // TODO(client): confirm Grounds & Gardens maps to the Secret Garden route.
    href: "/venues/secret-garden",
    media: { src: "/media/garden-10b.jpg", alt: "The grounds and gardens of the Chigwell Hall estate" },
  },
];

/** Overlay composition — identical to the original venue block. */
function SpaceContent({ s }: { s: Area }) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <span className="font-display text-[0.95rem] tracking-[0.4em] text-champagne">{s.numeral}</span>
        <h2 className="mt-3 display-lg">{s.name}</h2>
        <p className="mt-3 font-display text-2xl italic text-champagne-soft">{s.capacity}</p>
      </div>
      <div className="md:col-span-5">
        <p className="text-bone/80">{s.copy}</p>
        <div className="mt-6">
          <AnimatedLink href={s.href} arrow cursorLabel="Discover" className="text-bone">
            Step inside
          </AnimatedLink>
        </div>
      </div>
    </div>
  );
}

export default function TwoSpaces() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  // Which images may load: the first eagerly; the rest are primed on idle or
  // on tab hover/focus so switching never flashes.
  const [primed, setPrimed] = useState<Set<number>>(() => new Set([0]));
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const N = AREAS.length;

  const prime = (i: number) =>
    setPrimed((p) => (p.has(i) ? p : new Set(p).add(i)));

  useEffect(() => {
    const all = () => setPrimed(new Set(AREAS.map((_, i) => i)));
    const ric = typeof window !== "undefined" ? window.requestIdleCallback : undefined;
    if (ric) {
      const id = ric(all);
      return () => window.cancelIdleCallback?.(id);
    }
    const t = setTimeout(all, 1200);
    return () => clearTimeout(t);
  }, []);

  // Track scroll position so the tab rail can signal that more settings exist.
  const updateEdges = () => {
    const el = railRef.current;
    if (!el) return;
    setEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  };
  useEffect(() => {
    updateEdges();
    const el = railRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const select = (i: number) => {
    prime(i);
    setActive(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % N;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + N) % N;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = N - 1;
    if (next !== null) {
      e.preventDefault();
      select(next);
      tabRefs.current[next]?.focus();
    }
  };

  const fade = reduced
    ? ""
    : "transition-opacity duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

  // Soft-fade whichever rail edge has more tabs hidden beyond it.
  const edgeMask = `linear-gradient(to right, ${edges.left ? "transparent" : "#000"}, #000 28px, #000 calc(100% - 28px), ${edges.right ? "transparent" : "#000"})`;

  return (
    <section className="relative h-[min(85vh,920px)] min-h-[560px] w-full overflow-hidden bg-ink text-bone">
      {/* Stacked, crossfading panels (image + overlay together) */}
      {AREAS.map((s, i) => {
        const on = i === active;
        return (
          <div
            key={s.name}
            id={`area-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`area-tab-${i}`}
            aria-hidden={!on}
            className={cn("absolute inset-0", fade, on ? "opacity-100" : "pointer-events-none opacity-0")}
          >
            {primed.has(i) && (
              <Image
                src={s.media.src}
                alt={s.media.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className={cn(
                  "object-cover",
                  reduced ? "" : "transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]",
                  on ? "scale-100" : "scale-[1.04]",
                )}
              />
            )}
            {/* Top scrim (tabs legibility) + bottom scrim (heading/description legibility) */}
            <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/40" />

            <div className="container-luxe absolute inset-x-0 bottom-0 z-10 pb-[clamp(2.5rem,8vh,6rem)]">
              <SpaceContent s={s} />
            </div>
          </div>
        );
      })}

      {/* Top-left: eyebrow + tab selector (shared, above the panels) */}
      <div className="container-luxe pointer-events-none absolute inset-x-0 top-28 z-20 md:top-32">
        <div className="pointer-events-auto relative inline-flex max-w-full">
        <div
          ref={railRef}
          role="tablist"
          aria-label="Estate settings"
          onKeyDown={onKeyDown}
          onScroll={updateEdges}
          style={{ maskImage: edgeMask, WebkitMaskImage: edgeMask }}
          className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-ink/55 p-1 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] ring-1 ring-bone/15 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {AREAS.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.name}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`area-tab-${i}`}
                aria-selected={on}
                aria-controls={`area-panel-${i}`}
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                onMouseEnter={() => prime(i)}
                onFocus={() => prime(i)}
                className={cn(
                  "relative flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-full px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-champagne/80",
                  on ? "text-champagne" : "text-bone/70 hover:text-bone",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="two-spaces-pill"
                    transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE_LUXE }}
                    className="absolute inset-0 rounded-full bg-bone/12 ring-1 ring-champagne/40"
                  />
                )}
                <span className="relative z-10 flex items-center">
                  <span className="mr-2 font-display italic">{s.numeral}</span>
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>

          {/* Scroll hint — a champagne chevron nudging right while more settings remain */}
          {edges.right && (
            <motion.span
              aria-hidden
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? { opacity: 0.9 } : { opacity: 0.9, x: [0, 3, 0] }}
              transition={
                reduced
                  ? undefined
                  : { x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.4 } }
              }
              className="pointer-events-none absolute right-1.5 top-1/2 z-10 -translate-y-1/2 text-champagne drop-shadow-[0_1px_5px_rgba(0,0,0,0.7)]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </motion.span>
          )}
        </div>
      </div>
    </section>
  );
}
