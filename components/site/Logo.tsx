import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Brand logo. `invert` renders it white for use over dark backgrounds. */
export default function Logo({
  className,
  imgClassName,
  onClick,
  invert = false,
  src = "/logo.png",
  priority = false,
}: {
  className?: string;
  /** Override the image height (a single Tailwind height utility). */
  imgClassName?: string;
  onClick?: () => void;
  invert?: boolean;
  /** Override the logo asset (e.g. a white-text variant for dark sections). */
  src?: string;
  /** Eager-load the asset — pass only for above-the-fold placements (header). */
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="The Chigwell Marquees, home"
      className={cn("group/logo block leading-none", className)}
    >
      <Image
        src={src}
        alt="The Chigwell Marquees"
        width={630}
        height={156}
        priority={priority}
        sizes="(max-width: 640px) 150px, (max-width: 1024px) 200px, 240px"
        className={cn(
          "w-auto transition-[filter] duration-500",
          imgClassName ?? "h-12 sm:h-14 md:h-16 lg:h-[5rem]",
          invert && "[filter:brightness(0)_invert(1)]",
        )}
      />
    </Link>
  );
}
