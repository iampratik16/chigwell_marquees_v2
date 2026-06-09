import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import StatsBand from "@/components/sections/home/StatsBand";
import CtaBand from "@/components/site/CtaBand";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import { ESTATE_IMG, VIDEO, POSTER } from "@/lib/media.real";

export const metadata: Metadata = {
  alternates: { canonical: "/the-estate" },
  title: { absolute: "Marquee Venue Estate in Essex | The Chigwell Marquees" },
  description:
    "The Chigwell Marquees sit within the 42-acre grounds of Chigwell Hall, a Grade II listed manor, a surprising setting in the English countryside, minutes from the Central Line.",
};

export default function EstatePage() {
  return (
    <>
      <PageHero
        eyebrow="The estate"
        title={"Set within forty-two\nacres of Essex."}
        intro="A Grade II listed manor, two luxurious marquees and a secret garden, gathered on one extraordinary estate."
        media={ESTATE_IMG.hall}
        video={VIDEO.wedding}
        poster={POSTER.wedding}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>A surprising setting in the English countryside</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              {"Escape the city, without\never really leaving it."}
            </RevealText>
            <Reveal>
              <p className="lead mt-8 max-w-2xl text-mist">
                Elope with your guests, family and colleagues to a spellbinding
                setting just 40 minutes from Central London and 15 from the M25,                 yet wrapped in 42 acres of open Essex countryside.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="Chigwell Hall"
        title={"A Grade II listed\nmanor at its heart."}
        body={[
          "Both marquees, along with Chigwell Hall itself, are set amongst an impressive forty-two acres of land, a rare combination of space, privacy and stately-home romance.",
          "A wonderful blank canvas, furnished for any event: from a reception venue with a difference to the perfect garden wedding.",
        ]}
        media={ESTATE_IMG.hall}
        ratio="3 / 2"
      />

      <SplitFeature
        eyebrow="The grounds"
        title={"From the Hall to the\nDuck Pond."}
        body={[
          "The grounds offer fantastic photo opportunities, from pictures beside the Grade II listed Hall, to the Secret Garden and the idyllic Duck Pond.",
          "Tree-lined avenues and manicured lawns make every frame effortless. Wherever the camera turns, you will not be disappointed.",
        ]}
        media={ESTATE_IMG.avenue}
        ratio="3 / 2"
        reverse
        tone="bone-dim"
      />

      <SplitFeature
        eyebrow="The Secret Garden"
        title="Vows beneath the open sky."
        body={[
          "A secluded lawn with a classic fountain and a floral gazebo, licensed for outdoor civil ceremonies and made for romantic photography in the setting sun.",
          "Given over to your exclusive use whenever you hire either marquee.",
        ]}
        media={ESTATE_IMG.gazebo}
        ratio="3 / 2"
        link={{ href: "/spaces/secret-garden", label: "Explore the Secret Garden" }}
      />

      <StatsBand />

      {/* Outdoor gallery strip */}
      <Section tone="bone" spacing="md">
        <div className="container-luxe">
          <Eyebrow>Across the grounds</Eyebrow>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <RevealImage media={ESTATE_IMG.avenue} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" />
            <RevealImage media={ESTATE_IMG.gazebo} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" delay={0.08} className="md:mt-10" />
            <RevealImage media={ESTATE_IMG.hall} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" delay={0.16} />
          </div>
        </div>
      </Section>

      <SpecList
        eyebrow="Perfect for"
        title="One estate, every kind of occasion."
        features={[
          "Weddings & reception venues",
          "Civil unions & ceremonies",
          "Milestone birthdays",
          "Bar & Bat Mitzvahs",
          "Anniversaries & engagements",
          "Religious & faith-based events",
          "Corporate events & conferences",
          "Festivals & filming occasions",
        ]}
        tone="bone-dim"
      />

      <CtaBand
        title="Come and feel the scale of it."
        blurb="Forty-two acres are hard to put into words. Arrange a private viewing and walk the estate for yourself, free parking, and the A12, M11 & M1 all close by."
        primary={{ href: "/visit#enquire", label: "Arrange a viewing" }}
      />
    </>
  );
}
