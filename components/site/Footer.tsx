"use client";

import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import GoldButton from "@/components/ui/GoldButton";
import AnimatedLink from "@/components/ui/AnimatedLink";
import SocialLinks from "@/components/site/SocialLinks";
import Logo from "@/components/site/Logo";

export default function Footer() {
  const year = 2026;
  // The Visit page is itself the enquiry page, so the duplicate CTA is hidden there.
  const onVisit = usePathname() === "/visit";

  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      {/* Emotive CTA */}
      {!onVisit && (
      <div className="container-luxe border-b border-bone/12 py-8 md:py-10">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <span className="eyebrow text-champagne">Begin Your Enquiry</span>
            <RevealText as="h2" className="mt-4 display-md text-bone">
              {"Come and experience\nThe Chigwell Marquees for yourself."}
            </RevealText>
          </div>
          <div className="md:col-span-4 md:flex md:justify-end">
            <Reveal delay={0.1}>
              <GoldButton href="/visit#enquire" cursorLabel="Book">
                Book a Viewing
              </GoldButton>
            </Reveal>
          </div>
        </div>
      </div>
      )}

      {/* Detail columns */}
      <div className="container-luxe grid gap-8 py-7 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo src="/logo-footer.png" className="w-fit" imgClassName="h-10 sm:h-12 md:h-14" />
          <address className="mt-3 not-italic leading-relaxed text-bone/65">
            {SITE.address.line1}
            <br />
            {SITE.address.city}, {SITE.address.county}
            <br />
            {SITE.address.postcode}
          </address>
          <div className="mt-4 flex flex-col gap-1">
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

        <div className="md:col-span-4">
          <p className="eyebrow text-bone/45">Follow along</p>
          <SocialLinks labelled className="mt-4 text-bone/75" />
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-bone/45">Visit</p>
          <p className="mt-4 leading-relaxed text-bone/65">
            Located in Chigwell, Essex, with extensive complimentary on-site
            parking.
          </p>
          <AnimatedLink href="/visit" arrow className="mt-4 text-champagne" cursorLabel="Map">
            Find us
          </AnimatedLink>
        </div>
      </div>

      {/* ponytail: pb clears the fixed FloatingActions stack (139px tall + 24px offset),
          which still reaches centred text below lg. Above lg the pill sits clear of centre,
          so the padding drops away. Bump it if that stack grows. */}
      <div className="container-luxe flex flex-col items-center gap-3 border-t border-bone/12 pb-40 pt-6 text-center uppercase text-bone/45 lg:pb-6">
        <p className="text-[0.72rem] tracking-[0.14em]">
          © {year} {SITE.name}. All rights reserved.
        </p>
        <p className="text-[0.95rem] tracking-[0.16em] text-bone/60">
          Designed by{" "}
          <a
            href="https://pinktreemedia.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone/80 transition-colors hover:text-[#e1337a]"
          >
            Pink Tree Media
          </a>
        </p>
      </div>
    </footer>
  );
}
