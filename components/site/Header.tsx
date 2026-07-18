"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import GoldButton from "@/components/ui/GoldButton";
import { EASE_LUXE } from "@/lib/motion";
import { useIsDesktop } from "@/lib/useMediaQuery";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false); // mobile
  const [active, setActive] = useState<string | null>(null); // desktop dropdown
  const pathname = usePathname();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > last && !open);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const isDesktop = useIsDesktop();

  // Over dark backgrounds (desktop hero top, or the open mobile menu) use the
  // white-wordmark + gold-crown logo; on the light bar use the full-colour one.
  const darkBg = open || (isDesktop && !scrolled);
  const textColor = open
    ? "text-bone"
    : !scrolled
      ? "text-ink lg:text-bone"
      : "text-ink";

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.55, ease: EASE_LUXE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50",
          "transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "border-transparent bg-ink"
            : scrolled
              ? "border-b border-line-soft bg-bone/80 backdrop-blur-md"
              : "border-b border-line-soft bg-bone/85 backdrop-blur-md lg:border-transparent lg:bg-transparent lg:backdrop-blur-none",
        )}
      >
        <div
          className={cn(
            "container-luxe flex items-center justify-between transition-all duration-500",
            scrolled ? "py-1.5 lg:py-2" : "py-2 lg:py-2.5",
            textColor,
          )}
        >
          <Logo src={darkBg ? "/logo-footer.png" : "/logo.png"} priority />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setActive(item.label)}
                onMouseLeave={() => setActive(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group/nav relative inline-flex items-center gap-1 whitespace-nowrap px-3 py-2 text-[0.8rem] font-medium uppercase tracking-[0.14em]",
                  )}
                >
                  <span className="relative">
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        pathname === item.href || pathname.startsWith(item.href + "/")
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/nav:scale-x-100",
                      )}
                    />
                  </span>
                </Link>

                {/* Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {active === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.35, ease: EASE_LUXE }}
                        className="absolute left-0 top-full w-72 pt-3"
                      >
                        <div className="overflow-hidden rounded-2xl border border-line-soft bg-bone/95 p-2 text-ink shadow-[0_30px_60px_-30px_rgba(22,19,15,0.45)] backdrop-blur-xl">
                          {item.children.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              className="group/sub block rounded-xl px-4 py-3 transition-colors hover:bg-bone-dim"
                            >
                              <span className="block font-display text-lg leading-tight">
                                {c.label}
                              </span>
                              {c.blurb && (
                                <span className="mt-0.5 block text-[0.72rem] uppercase tracking-[0.12em] text-mist">
                                  {c.blurb}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-4 xl:flex">
              <SocialLinks size={24} />
              <span className="h-6 w-px bg-current opacity-20" aria-hidden />
            </div>
            <div className="hidden lg:block">
              <GoldButton href="/visit#enquire" cursorLabel="Book" tone={darkBg ? "default" : "onLight"}>
                Book a Viewing
              </GoldButton>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-7">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-7 bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-3 block h-px w-7 bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.7, ease: EASE_LUXE }}
      className="fixed inset-0 z-40 flex w-full max-w-full flex-col overflow-x-hidden bg-ink text-bone lg:hidden"
    >
      <div className="container-luxe flex-1 overflow-y-auto pt-28 pb-12 sm:pt-32" data-lenis-prevent>
        <nav className="flex flex-col" aria-label="Mobile">
          {NAV.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE_LUXE, delay: 0.15 + i * 0.06 }}
              className="border-b border-bone/12 py-5"
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="block font-display text-4xl tracking-tight"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mt-3 flex flex-col gap-2 pl-1">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={onClose}
                      className="text-sm uppercase tracking-[0.14em] text-bone/60"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </nav>

        <div className="mt-10 flex flex-col gap-1 text-bone/70">
          <a href={SITE.phoneHref} className="text-lg">
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="text-lg">
            {SITE.email}
          </a>
        </div>

        <div className="mt-10">
          <p className="eyebrow text-bone/45">Follow along</p>
          <SocialLinks size={22} className="mt-4 text-bone/85" />
        </div>
      </div>
    </motion.div>
  );
}
