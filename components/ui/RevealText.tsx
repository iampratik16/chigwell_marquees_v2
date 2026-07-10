"use client";

import { motion } from "framer-motion";
import { createElement, Fragment } from "react";
import { EASE_LUXE, inView } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  /** Per-word delay step. */
  stagger?: number;
  delay?: number;
  once?: boolean;
};

/**
 * Word-by-word reveal — each word rises and fades in. No overflow clipping, so
 * descenders/ascenders are never cropped. Lines split on `\n`. Honours reduced
 * motion (renders instantly).
 */
export default function RevealText({
  children,
  as = "h2",
  className,
  stagger = 0.045,
  delay = 0,
  once = true,
}: Props) {
  const reduced = useReducedMotion();
  const lines = children.split("\n");

  return createElement(
    motion[as] as typeof motion.h2,
    {
      className,
      initial: reduced ? false : "hidden",
      whileInView: reduced ? undefined : "show",
      viewport: { ...inView, once },
      transition: reduced ? undefined : { staggerChildren: stagger, delayChildren: delay },
    },
    lines.map((line, li) => (
      <span key={li} className="block">
        {line.split(" ").map((word, wi, arr) => (
          <Fragment key={wi}>
            <motion.span
              className="inline-block"
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: { y: "0.5em", opacity: 0 },
                      show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE_LUXE } },
                    }
              }
            >
              {word}
            </motion.span>
            {wi < arr.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
    )),
  );
}
