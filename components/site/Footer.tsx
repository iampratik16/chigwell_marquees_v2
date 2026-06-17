import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedLink from "@/components/ui/AnimatedLink";
import SocialLinks from "@/components/site/SocialLinks";
import Logo from "@/components/site/Logo";

export default function Footer() {
  const year = 2026;

  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      {/* Emotive CTA */}
      <div className="container-luxe border-b border-bone/12 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <span className="eyebrow text-champagne">Begin your enquiry</span>
            <RevealText
              as="h2"
              className="mt-6 display-xl text-bone"
            >
              {"Let's set the scene\nfor something unforgettable."}
            </RevealText>
          </div>
          <div className="md:col-span-4 md:flex md:justify-end">
            <Reveal delay={0.1}>
              <MagneticButton href="/visit#enquire" variant="light" cursorLabel="Enquire">
                Plan your occasion
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Detail columns */}
      <div className="container-luxe grid gap-12 py-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo invert className="w-fit" imgClassName="h-14 sm:h-16 md:h-20" />
          <address className="mt-4 not-italic leading-relaxed text-bone/65">
            {SITE.address.line1}
            <br />
            {SITE.address.city}, {SITE.address.county}
            <br />
            {SITE.address.postcode}
          </address>
          <div className="mt-5 flex flex-col gap-1">
            <a href={SITE.phoneHref} className="text-bone/85 transition-colors hover:text-champagne">
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="text-bone/85 transition-colors hover:text-champagne"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-bone/45">Explore</p>
          <ul className="mt-5 flex flex-col gap-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-bone/75 transition-colors hover:text-bone"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-bone/45">Follow along</p>
          <SocialLinks labelled className="mt-5 text-bone/75" />
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow text-bone/45">Visit</p>
          <p className="mt-5 leading-relaxed text-bone/65">
            ≈ 40 minutes from Central London. Free parking on the estate.
          </p>
          <AnimatedLink href="/visit" arrow className="mt-4 text-champagne" cursorLabel="Map">
            Find us
          </AnimatedLink>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="select-none px-[var(--gutter)] pb-6">
        <span className="block whitespace-nowrap font-display text-[9.4vw] leading-none tracking-tight text-bone/[0.05]">
          Chigwell Marquees
        </span>
      </div>

      <div className="container-luxe flex flex-col gap-3 border-t border-bone/12 py-7 text-[0.72rem] uppercase tracking-[0.14em] text-bone/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {SITE.name}. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy" className="transition-colors hover:text-bone">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-bone">
            Terms
          </Link>
          <span className="text-bone/30">Crafted with intention</span>
        </div>
      </div>
    </footer>
  );
}
