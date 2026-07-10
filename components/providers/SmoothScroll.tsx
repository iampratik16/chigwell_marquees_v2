"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Lenis smooth-scroll driven by the GSAP ticker, kept in sync with
 * ScrollTrigger. Disabled entirely when the user prefers reduced motion.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  // Own scroll restoration so the browser never restores a stale position.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  // On every route change: hard-reset to the top of the new page. Lenis keeps
  // its own scroll value across navigations and, driven by the GSAP ticker,
  // rewrites that (clamped) position every frame for a few hundred ms, which
  // overrides a one-off reset and lands a shorter page at the bottom. So we
  // STOP Lenis, pin the top across several frames, then resize + resume.
  useIsoLayoutEffect(() => {
    const lenisOf = () => lenisRef.current?.lenis;
    // ScrollTrigger persists scroll positions across navigations and re-applies
    // them on refresh, which would otherwise restore the previous page's scroll.
    ScrollTrigger.clearScrollMemory();

    const hash = window.location.hash;
    const toTop = () => {
      window.scrollTo(0, 0);
      lenisOf()?.scrollTo(0, { immediate: true, force: true });
    };

    // Exception: anchor links (e.g. /visit#enquire) scroll to their section.
    if (hash && hash.length > 1) {
      toTop();
      const t = window.setTimeout(() => {
        lenisOf()?.resize();
        ScrollTrigger.clearScrollMemory();
        const el = document.querySelector(hash) as HTMLElement | null;
        if (el) lenisOf()?.scrollTo(el, { offset: -90, force: true });
        else toTop();
      }, 320);
      return () => window.clearTimeout(t);
    }

    // Default: re-assert the top across a few frames while the new page (and
    // its ScrollTriggers) settle; the route curtain hides this window.
    toTop();
    lenisOf()?.resize();
    const timers = [80, 260, 460, 700].map((d) =>
      window.setTimeout(() => {
        ScrollTrigger.clearScrollMemory();
        toTop();
      }, d),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [pathname]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        // ponytail: snappier feel — higher lerp tracks the wheel tighter and a
        // shorter duration settles faster, so the page keeps up with a fast
        // flick instead of floating. Tune these two if it feels too abrupt.
        duration: 0.9,
        lerp: 0.14,
        smoothWheel: true,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.5,
        // Kill carried-over scroll momentum when a navigation link is clicked.
        stopInertiaOnNavigate: true,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
