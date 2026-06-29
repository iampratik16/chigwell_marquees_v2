"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Variant = "solid" | "outline" | "ghost" | "light";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  /** Magnetic pull strength (0 disables). */
  strength?: number;
  cursorLabel?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
};

const variants: Record<Variant, string> = {
  solid:
    "bg-ink text-bone hover:bg-botanical",
  light:
    "bg-bone text-ink hover:bg-champagne",
  outline:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone",
  ghost:
    "border border-bone/30 text-bone hover:bg-bone hover:text-ink",
};

/**
 * Magnetic CTA: the label eases toward the cursor while hovered, then springs
 * back. Renders as a Link when `href` is set, else a button.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  strength = 0.35,
  cursorLabel,
  ariaLabel,
  type = "button",
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 160, damping: 15, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn(
        "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full px-7 py-3.5",
        "text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        variants[variant],
        className,
      )}
      data-cursor={cursorLabel}
    >
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </motion.span>
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto");
    if (external) {
      return (
        <a href={href} aria-label={ariaLabel} className="inline-block">
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-block">
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className="inline-block">
      {inner}
    </button>
  );
}
