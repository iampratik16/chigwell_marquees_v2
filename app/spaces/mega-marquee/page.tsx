import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import CtaBand from "@/components/site/CtaBand";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import RevealVideo from "@/components/ui/RevealVideo";
import { SPACE_MEGA_ALT, SPACE_MEGA_HERO, SPACE_MEGA_INTRO } from "@/lib/media";
import { VIDEO, REAL } from "@/lib/media.real";

export const metadata: Metadata = {
  alternates: { canonical: "/spaces/mega-marquee" },
  title: { absolute: "Large Marquee Venue Hire in Essex | The Chigwell Marquees" },
  description:
    "The Mega Marquee, a grand structure for 300 to 1,000 guests, with high ceilings, a state-of-the-art sound & lighting rig and a fully functioning kitchen.",
};

export default function MegaMarqueePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "The Spaces", path: "/spaces" },
          { name: "The Mega Marquee", path: "/spaces/mega-marquee" },
        ])}
      />
      <PageHero
        eyebrow="The spaces · I"
        title={"The Mega\nMarquee."}
        intro="Up to one thousand guests beneath a single, grand and unbroken canvas."
        media={SPACE_MEGA_HERO}
        video={VIDEO.megaHero}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Eyebrow>One of the largest marquee venues in Essex</Eyebrow>
              <RevealText as="h2" className="mt-7 display-lg">
                {"Spectacular celebrations\non a grand scale."}
              </RevealText>
              <div className="mt-8 space-y-6">
                <Reveal>
                  <p className="lead text-mist">
                    The Mega Marquee at The Chigwell Marquees is one of the
                    largest and most impressive luxury marquee venues in Essex
                    and Greater London. Designed for spectacular celebrations on
                    a grand scale, this extraordinary space can accommodate
                    between 250 and 1,000 guests in complete comfort and style.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-mist">
                    Set within the breathtaking grounds of Chigwell Hall, the
                    Mega Marquee offers a sophisticated and versatile setting
                    that can be transformed entirely around your vision — from
                    lavish wedding receptions and cultural celebrations to
                    high-end corporate events.
                  </p>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="text-mist">
                    With its elegant interiors, expansive layout and exceptional
                    facilities, the Mega Marquee provides the perfect setting to
                    create an unforgettable experience for both you and your
                    guests.
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <RevealImage
                  media={SPACE_MEGA_INTRO}
                  ratio="4 / 5"
                  sizes="(max-width: 768px) 100vw, 42vw"
                  interactive
                  cursorLabel="View"
                  className="rounded-[1.25rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="The grand canvas"
        title={"A structure that turns\nheads, for all the\nright reasons."}
        body={[
          "The Mega Marquee is a striking venue for large weddings, engagement parties and corporate events, accommodating from 250 to 1,000 guests.",
          "Finished with neutral carpet throughout and crowned by high ceilings, it gives you the height and the blank canvas to execute your décor vision exactly.",
        ]}
        media={REAL.tallCenterpiece}
        ratio="4 / 5"
      />

      {/* Catering — portrait (9:16) video kept at its native aspect ratio */}
      <div className="bg-bone-dim py-16 md:py-24">
        <div className="container-luxe">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:order-2 md:col-span-6">
              <div className="mx-auto w-full max-w-[340px]">
                <RevealVideo
                  src={VIDEO.mega}
                  poster={SPACE_MEGA_ALT}
                  ratio="9 / 16"
                  className="rounded-[1.25rem]"
                />
              </div>
            </div>
            <div className="md:order-1 md:col-span-6">
              <Eyebrow>Catering</Eyebrow>
              <RevealText as="h2" className="mt-5 display-md">
                A kitchen hidden in plain sight.
              </RevealText>
              <div className="mt-6 space-y-5">
                <Reveal>
                  <p className="lead text-ink/85">
                    Your chosen caterer is given a fully functioning kitchen with
                    ample preparation space and its own entrance, kept discreetly
                    out of sight of your guests.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-mist">
                    The grounds can also accommodate outdoor cooking, from live
                    stations to spectacle.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SpecList
        eyebrow="Features"
        title="Everything, built in."
        features={[
          "Capacity for 250 – 1,000 guests",
          "Complimentary on-site parking with attendants",
          "State-of-the-art sound & lighting system",
          "Cordless microphone included",
          "Private bridal suite",
          "Limewash Chiavari chairs",
          "Fully equipped catering preparation area",
          "Restroom facilities with attendants",
          "Access to the grounds for photography",
        ]}
        tone="bone"
      />

      <SpecList
        eyebrow="The detail"
        specs={[
          { k: "Seated capacity", v: "Up to 1,000, 100 tables of 10" },
          { k: "Licensed", v: "Until midnight, 7 days a week" },
          { k: "Hire", v: "Dry hire · 12 hours standard" },
          { k: "Interior", v: "Neutral carpet · high ceilings" },
        ]}
        tone="ink"
      />

      <CtaBand
        title="Imagine your thousand guests here."
        blurb="From sit-down banquets to awards nights and product launches, the Mega Marquee scales to the moment."
        primary={{ href: "/visit#enquire", label: "Enquire about the Mega Marquee" }}
      />
    </>
  );
}
