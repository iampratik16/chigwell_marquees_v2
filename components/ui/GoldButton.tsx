import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./GoldButton.module.css";

type Props = {
  children: ReactNode;
  /** Renders an <a>/<Link> when set, otherwise a <button>. */
  href?: string;
  onClick?: () => void;
  className?: string;
  /** Label shown by the custom crown cursor on hover. */
  cursorLabel?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
};

/**
 * Primary CTA: antique-gold metallic pill. The metallic face, grain and the
 * single hover sheen sweep live in GoldButton.module.css. Matches the primary
 * pill rhythm; secondary/ghost buttons are unaffected.
 */
export default function GoldButton({
  children,
  href,
  onClick,
  className,
  cursorLabel,
  ariaLabel,
  type = "button",
}: Props) {
  const cls = cn(styles.goldBtn, className);
  const inner = <span className={styles.label}>{children}</span>;

  if (href) {
    const external =
      href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto");
    if (external) {
      return (
        <a href={href} className={cls} aria-label={ariaLabel} data-cursor={cursorLabel}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} aria-label={ariaLabel} data-cursor={cursorLabel}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel} data-cursor={cursorLabel}>
      {inner}
    </button>
  );
}
