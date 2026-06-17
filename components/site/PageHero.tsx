"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import SocialLinks from "@/components/site/SocialLinks";
import { EASE_LUXE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMounted } from "@/lib/useMounted";
import type { Media } from "@/lib/media";

type Props = {
  eyebrow: string;
  /** Use \n for line breaks. */
  title: string;
  intro?: string;
  media: Media;
  /** Optional looping clip; `media` is the reduced-motion fallback. */
  video?: string;
  /** Video first-frame still; used as the poster + pre-play image so the clip starts seamlessly. */
  poster?: string;
  /** Smaller hero for utility pages. */
  size?: "lg" | "md";
  /** Show a "Follow along" social row beneath the intro. */
  social?: boolean;
};

/** Cinematic dark hero shared by inner pages. */
export default function PageHero({ eyebrow, title, intro, media, video, poster, size = "lg", social }: Props) {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const lines = title.split("\n");
  const playVideo = !!video && mounted && !reduced;
  const posterSrc = poster ?? media.src;

  return (
    <section
      className={`relative flex w-full items-end overflow-hidden bg-ink text-bone ${
        size === "lg" ? "h-[68svh] min-h-[460px]" : "h-[52svh] min-h-[380px]"
      }`}
    >
      <div className="absolute inset-0">
        {playVideo ? (
          <BackgroundVideo src={video!} poster={posterSrc} className="h-full w-full object-cover" />
        ) : (
          <div className={reduced ? "relative h-full w-full" : "ken-burns relative h-full w-full"}>
            <Image src={posterSrc} alt={media.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 to-transparent" />
      </div>

      <div className="container-luxe relative pb-[clamp(2.5rem,7vh,5.5rem)] pt-36">
        <motion.span
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.35 }}
          className="eyebrow mb-6 flex items-center gap-3 text-bone/80 before:block before:h-px before:w-9 before:bg-champagne/70 before:content-['']"
        >
          {eyebrow}
        </motion.span>

        <h1 className={`font-display ${size === "lg" ? "display-xl" : "display-lg"} max-w-[16ch]`}>
          {lines.map((line, i) => (
            <motion.span
              key={i}
              className="block will-change-transform"
              initial={reduced ? false : { y: "0.4em", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: EASE_LUXE, delay: 0.45 + i * 0.1 }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {intro && (
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_LUXE, delay: 0.9 }}
            className="lead mt-8 max-w-2xl text-bone/80"
          >
            {intro}
          </motion.p>
        )}

        {social && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_LUXE, delay: 1.05 }}
            className="mt-8 flex items-center gap-5 text-bone"
          >
            <span className="eyebrow text-bone/55">Follow along</span>
            <SocialLinks size={20} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
