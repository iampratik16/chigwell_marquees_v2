import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Brand logo. `invert` renders it white for use over dark backgrounds. */
export default function Logo({
  className,
  imgClassName,
  onClick,
  invert = false,
}: {
  className?: string;
  /** Override the image height (a single Tailwind height utility). */
  imgClassName?: string;
  onClick?: () => void;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="The Chigwell Marquees, home"
      className={cn("group/logo block leading-none", className)}
    >
      <Image
        src="/logo.png"
        alt="The Chigwell Marquees"
        width={630}
        height={156}
        priority
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
