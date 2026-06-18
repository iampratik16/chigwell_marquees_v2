import Link from "next/link";
import Starfield from "@/components/effects/Starfield";
import MagneticButton from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-deep text-bone">
      <Starfield count={120} seed={5} />
      <div className="container-luxe relative text-center">
        <span className="eyebrow text-champagne">Lost in the grounds</span>
        <h1 className="mt-6 display-hero">404</h1>
        <p className="lead mx-auto mt-6 max-w-md text-bone/70">
          This path doesn&apos;t lead anywhere on the estate, but the marquees
          are just this way.
        </p>
        <div className="mt-10 flex justify-center">
          <MagneticButton href="/" variant="light" cursorLabel="Home">
            Back to the estate
          </MagneticButton>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm uppercase tracking-[0.14em] text-bone/50">
          <Link href="/venues" className="hover:text-bone">Venues</Link>
          <Link href="/occasions" className="hover:text-bone">Occasions</Link>
          <Link href="/gallery" className="hover:text-bone">Gallery</Link>
          <Link href="/visit" className="hover:text-bone">Visit</Link>
        </div>
      </div>
    </section>
  );
}
