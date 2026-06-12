"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_LUXE } from "@/lib/motion";
import { HERO } from "@/lib/media";
import { VIDEO, POSTER } from "@/lib/media.real";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import MagneticButton from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMounted } from "@/lib/useMounted";

const HEADLINE = ["Luxurious wedding", "venue in Essex"];

export default function Hero() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const hero = HERO[0];
  const playVideo = mounted && !reduced;

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-bone">
      {/* Backdrop, real cinematic clip; poster still loads instantly + serves reduced motion. */}
      <div className="absolute inset-0">
        {playVideo ? (
          <BackgroundVideo src={VIDEO.hero} poster={POSTER.hero} className="h-full w-full object-cover" />
        ) : (
          <div className="relative h-full w-full">
            <Image src={POSTER.hero} alt={hero.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        )}
        {/* Cinematic grading */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </div>

      <div className="container-luxe relative flex h-full flex-col justify-end pb-[clamp(2.25rem,6vh,5rem)] pt-24">
        <motion.span
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_LUXE, delay: 0.4 }}
          className="eyebrow mb-5 flex items-center gap-3 text-bone/80 before:block before:h-px before:w-10 before:bg-champagne/70 before:content-['']"
        >
          Luxury marquee venue · Chigwell Hall Estate, Essex
        </motion.span>

        <h1 className="display-hero max-w-[14ch] font-display">
          {HEADLINE.map((line, i) => (
            <motion.span
              key={i}
              className="block will-change-transform"
              initial={reduced ? false : { y: "0.4em", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: EASE_LUXE, delay: 0.5 + i * 0.12 }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_LUXE, delay: 1.05 }}
          className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="lead max-w-md text-bone/80">
            Two cinematic marquees on a 42-acre Essex estate, for weddings,
            celebrations and corporate events of 30 to 1,000 guests.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="/spaces" variant="light" cursorLabel="Explore">
              Explore the spaces
            </MagneticButton>
            <MagneticButton href="/visit#enquire" variant="ghost" cursorLabel="Enquire">
              Begin an enquiry
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="eyebrow text-bone/55">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-bone/20">
          <span className="absolute inset-0 block animate-[scrollcue_2.2s_ease-in-out_infinite] bg-champagne" />
        </span>
      </motion.div>
    </section>
  );
}
