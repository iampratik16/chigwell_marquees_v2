import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import StatsBand from "@/components/sections/home/StatsBand";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import Faqs from "@/components/site/Faqs";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import { faqPage } from "@/lib/structured-data";
import { FAQS } from "@/lib/site";
import { ESTATE_IMG, HALL_IMG, VIDEO, POSTER } from "@/lib/media.real";

export const metadata: Metadata = {
  alternates: { canonical: "/the-estate" },
  title: { absolute: "Marquee Venue Estate in Essex | The Chigwell Marquees" },
  description:
    "The Chigwell Marquees sit within the 42-acre grounds of Chigwell Hall, a Grade II listed manor, a surprising setting in the English countryside, minutes from the Central Line.",
};

export default function EstatePage() {
  return (
    <>
      <JsonLd data={faqPage(FAQS)} />
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
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <Eyebrow>A surprising setting in the English countryside</Eyebrow>
              <RevealText as="h2" className="mt-7 display-lg">
                {"Escape the city, without\never really leaving it."}
              </RevealText>
              <Reveal>
                <p className="lead mt-8 text-mist">
                  Elope with your guests, family and colleagues to a spellbinding
                  setting just 40 minutes from Central London and 15 from the
                  M25, yet wrapped in 42 acres of open Essex countryside.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-6">
              <RevealImage
                media={HALL_IMG.escape}
                ratio="3 / 2"
                sizes="(max-width: 768px) 100vw, 50vw"
                interactive
                cursorLabel="View"
                className="rounded-[1.25rem]"
              />
            </div>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="Chigwell Hall"
        title={"A Grade II listed\nmanor at its heart."}
        body={[
          "Built in 1881, Chigwell Hall is a magnificent Grade II listed manor house set at the heart of our stunning 42-acre estate. Rich in Victorian character and timeless elegance, the hall provides a truly iconic backdrop for your special occasion.",
          "Its striking red-brick exterior, grand chimneys, bay windows and Juliet balconies create endless opportunities for breathtaking photography, whilst the beautifully maintained grounds offer an atmosphere of luxury and exclusivity from the moment your guests arrive.",
          "Inside, the hall combines classic charm with contemporary comfort. The sweeping staircase provides a beautiful setting for photographs before leading into our elegant function suites.",
          "Both the Banqueting Suite and Belmont Suite feature private bars and spacious dancefloors, creating the perfect setting for unforgettable celebrations that continue long into the evening.",
        ]}
        media={ESTATE_IMG.hall}
        ratio="3 / 2"
      />

      {/* Inside the Hall — function suites */}
      <Section tone="bone-dim" spacing="md">
        <div className="container-luxe">
          <Eyebrow>Inside the Hall</Eyebrow>
          <RevealText as="h2" className="mt-5 display-md max-w-3xl">
            Elegant function suites for every celebration.
          </RevealText>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <RevealImage media={HALL_IMG.room1} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" />
            <RevealImage media={HALL_IMG.room2} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" delay={0.08} className="md:mt-10" />
            <RevealImage media={HALL_IMG.room3} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" delay={0.16} />
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="The grounds"
        title={"From the Hall to the\nDuck Pond."}
        body="From the Grade II listed Hall to the Secret Garden and idyllic Duck Pond, tree-lined avenues and manicured lawns frame every photograph effortlessly."
        media={ESTATE_IMG.avenue}
        ratio="3 / 2"
        reverse
        tone="bone-dim"
      />

      <SplitFeature
        eyebrow="The Secret Garden"
        title="Vows beneath the open sky."
        body="A secluded lawn with a classic fountain and floral gazebo, licensed for outdoor civil ceremonies — and yours exclusively with either marquee."
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

      {/* FAQs */}
      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Good to know</Eyebrow>
              <h2 className="mt-6 display-md">Questions, answered.</h2>
            </div>
            <div className="md:col-span-8">
              <Faqs />
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Come and feel the scale of it."
        blurb="Forty-two acres are hard to put into words. Arrange a private viewing and walk the estate for yourself, free parking, and the A12, M11 & M1 all close by."
        primary={{ href: "/visit#enquire", label: "Arrange a viewing" }}
      />
    </>
  );
}
