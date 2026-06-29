import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import GoldButton from "@/components/ui/GoldButton";
import AnimatedLink from "@/components/ui/AnimatedLink";
import { FACTS, SITE } from "@/lib/site";
import { OCC_CORPORATE_2 } from "@/lib/media";

export default function Journey() {
  return (
    <section className="relative overflow-hidden bg-ink text-bone">
      <div className="absolute inset-0">
        <Image
          src={OCC_CORPORATE_2.src}
          alt={OCC_CORPORATE_2.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/70" />
      </div>

      <div className="container-luxe relative py-20 md:py-28">
        <div className="max-w-3xl">
          <Eyebrow tone="champagne">Visit</Eyebrow>
          <RevealText as="h2" className="mt-6 display-xl">
            {"Forty minutes from London.\nA world away from it."}
          </RevealText>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone/12 bg-bone/10">
              {FACTS.map((f) => (
                <div key={f.k} className="bg-ink/40 p-6 backdrop-blur-sm">
                  <p className="eyebrow text-champagne/80">{f.k}</p>
                  <p className="mt-3 font-display text-xl leading-tight">{f.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 md:pb-2">
            <Reveal>
              <address className="not-italic font-display text-2xl leading-snug">
                {SITE.address.line1}
                <br />
                {SITE.address.city}, {SITE.address.county} {SITE.address.postcode}
              </address>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <GoldButton href="/visit#enquire" cursorLabel="Book">
                  Book a Viewing
                </GoldButton>
                <AnimatedLink href={SITE.address.maps} arrow className="text-bone" cursorLabel="Map">
                  Get directions
                </AnimatedLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
