import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedLink from "@/components/ui/AnimatedLink";
import Counter from "@/components/ui/Counter";
import Marquee from "@/components/ui/Marquee";
import { HERO } from "@/lib/media";

export const metadata: Metadata = {
  alternates: { canonical: "/styleguide" },
  title: "Styleguide",
  robots: { index: false },
};

const swatches = [
  { name: "ink", hex: "#16130F", className: "bg-ink text-bone" },
  { name: "bone", hex: "#F6F1E7", className: "bg-bone text-ink border border-line" },
  { name: "champagne", hex: "#C8A96A", className: "bg-champagne text-ink" },
  { name: "botanical", hex: "#2C3A2E", className: "bg-botanical text-bone" },
  { name: "mist", hex: "#8C857A", className: "bg-mist text-bone" },
  { name: "bone-dim", hex: "#EFE7D7", className: "bg-bone-dim text-ink border border-line" },
];

export default function StyleguidePage() {
  return (
    <>
      <Section tone="bone" spacing="lg" className="pt-40">
        <div className="container-luxe">
          <Eyebrow tone="champagne">Design system</Eyebrow>
          <RevealText as="h1" className="mt-6 display-xl">
            {"The grammar of\nthe estate."}
          </RevealText>
          <p className="lead mt-8 max-w-2xl text-mist">
            Tokens, type and motion primitives that compose every page,             refined, cinematic, editorial luxury with botanical warmth.
          </p>
        </div>
      </Section>

      {/* Colour */}
      <Section tone="bone-dim" spacing="md">
        <div className="container-luxe">
          <Eyebrow>Palette</Eyebrow>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {swatches.map((s) => (
              <div key={s.name} className={`flex h-40 flex-col justify-between rounded-2xl p-4 ${s.className}`}>
                <span className="text-sm font-medium capitalize">{s.name}</span>
                <span className="text-xs uppercase tracking-widest opacity-70">{s.hex}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Type */}
      <Section tone="bone" spacing="md">
        <div className="container-luxe space-y-10">
          <Eyebrow>Typography, Gambetta &amp; Switzer</Eyebrow>
          <p className="display-hero">Aa</p>
          <p className="display-xl">Display Extra Large</p>
          <p className="display-lg">Display Large</p>
          <p className="display-md">Display Medium</p>
          <p className="lead max-w-2xl text-mist">
            Lead paragraph, generous line height, refined tracking. The Mini
            Marquee literally darkens into a starry ceiling as you scroll.
          </p>
          <p className="max-w-2xl">
            Body, Switzer at a comfortable reading size. Located in the stunning
            grounds of Chigwell Hall, a Grade II listed manor set within 42 acres
            of countryside, we offer two unique and luxurious venues.
          </p>
          <p className="font-display text-2xl italic text-botanical">
            Italic display for editorial emphasis.
          </p>
        </div>
      </Section>

      {/* Buttons + links */}
      <Section tone="bone-dim" spacing="md">
        <div className="container-luxe space-y-10">
          <Eyebrow>Buttons &amp; links</Eyebrow>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton variant="solid" cursorLabel="Enquire">Solid</MagneticButton>
            <MagneticButton variant="outline">Outline</MagneticButton>
            <MagneticButton variant="light">Light</MagneticButton>
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <AnimatedLink href="/styleguide">Underline wipe</AnimatedLink>
            <AnimatedLink href="/styleguide" arrow>With arrow</AnimatedLink>
          </div>
        </div>
      </Section>

      {/* Counters */}
      <Section tone="ink" spacing="md">
        <div className="container-luxe">
          <Eyebrow tone="champagne">Counters</Eyebrow>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { v: 42, l: "Acres" },
              { v: 1000, l: "Guests" },
              { v: 600, l: "Parking" },
              { v: 2, l: "Marquees" },
            ].map((s) => (
              <div key={s.l}>
                <Counter value={s.v} className="font-display text-6xl text-metal" />
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-bone/55">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Image reveal */}
      <Section tone="bone" spacing="md">
        <div className="container-luxe">
          <Eyebrow>Image reveal &amp; hover</Eyebrow>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <RevealImage media={HERO[0]} ratio="4 / 3" interactive cursorLabel="View" />
            <RevealImage media={HERO[1]} ratio="4 / 3" interactive cursorLabel="View" delay={0.1} />
          </div>
        </div>
      </Section>

      {/* Marquee */}
      <Section tone="botanical" spacing="sm">
        <Marquee
          items={["Weddings", "Celebrations", "Corporate", "Asian Weddings", "Civil Ceremonies"]}
          className="font-display text-5xl text-bone md:text-7xl"
        />
      </Section>
    </>
  );
}
