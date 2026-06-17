"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_LUXE, inView } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";
import { BLUR } from "@/lib/blur";
import { useLightbox } from "@/components/ui/Lightbox";
import type { Media } from "@/lib/media";

type Props = {
  media: Media;
  className?: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Omit to use the image's own ratio. */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /** Enable hover zoom. */
  interactive?: boolean;
  /** Skip the click-to-open lightbox (e.g. when the image is wrapped in a link). */
  disableLightbox?: boolean;
  cursorLabel?: string;
  delay?: number;
  className_img?: string;
};

/**
 * Editorial image: a soft fade + scale settle (1.06 → 1) as it enters view.
 * The image is painted immediately under a bone placeholder, so it is never
 * blank or hidden, the motion is purely additive. Honours reduced motion.
 */
export default function RevealImage({
  media,
  className,
  ratio,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  interactive = false,
  disableLightbox = false,
  cursorLabel,
  delay = 0,
  className_img,
}: Props) {
  const reduced = useReducedMotion();
  const { open } = useLightbox();
  const canLightbox = interactive && !disableLightbox;

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden bg-bone-dim",
        interactive && "group/img",
        canLightbox && "cursor-pointer",
        className,
      )}
      style={ratio ? { aspectRatio: ratio } : undefined}
      data-cursor={cursorLabel}
      onClick={canLightbox ? () => open(media) : undefined}
      role={canLightbox ? "button" : undefined}
      tabIndex={canLightbox ? 0 : undefined}
      onKeyDown={
        canLightbox
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                open(media);
              }
            }
          : undefined
      }
      initial={reduced ? false : { opacity: 0 }}
      whileInView={reduced ? undefined : { opacity: 1 }}
      viewport={{ ...inView }}
      transition={{ duration: 0.7, ease: EASE_LUXE, delay }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={reduced ? false : { scale: 1.06 }}
        whileInView={reduced ? undefined : { scale: 1 }}
        viewport={{ ...inView }}
        transition={{ duration: 1.4, ease: EASE_LUXE, delay }}
      >
        <Image
          src={media.src}
          alt={media.alt}
          fill={!!ratio}
          width={ratio ? undefined : media.width}
          height={ratio ? undefined : media.height}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR}
          className={cn(
            "h-full w-full object-cover",
            interactive &&
              "transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.05]",
            className_img,
          )}
        />
      </motion.div>
    </motion.div>
  );
}
