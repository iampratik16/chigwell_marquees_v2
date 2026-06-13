import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import StarlitCeiling from "@/components/site/StarlitCeiling";
import CtaBand from "@/components/site/CtaBand";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import RevealVideo from "@/components/ui/RevealVideo";
import { SPACE_GARDEN } from "@/lib/media";
import { MINI_IMG, VIDEO } from "@/lib/media.real";

export const metadata: Metadata = {
  alternates: { canonical: "/spaces/mini-marquee" },
  title: { absolute: "Intimate Marquee Venue in Essex | The Chigwell Marquees" },
  description:
    "The Mini Marquee, an intimate setting for 30 to 200 guests with floor-to-ceiling glass, a starlit ceiling, built-in air conditioning and access to the Secret Garden.",
};

export default function MiniMarqueePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "The Spaces", path: "/spaces" },
          { name: "The Mini Marquee", path: "/spaces/mini-marquee" },
        ])}
      />
      <PageHero
        eyebrow="The spaces · II"
        title={"The Mini\nMarquee."}
        intro="Intimate, light-filled and quietly magical, for thirty to two hundred."
        media={MINI_IMG.interior}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Eyebrow>An intimate, elegant marquee in Essex</Eyebrow>
              <RevealText as="h2" className="mt-7 display-lg">
                {"Memorable moments with\nyour closest people."}
              </RevealText>
              <div className="mt-8 space-y-6">
                <Reveal>
                  <p className="lead text-mist">
                    The Mini Marquee at The Chigwell Marquees offers an intimate
                    and elegant setting, perfect for stylish celebrations and
                    more personal gatherings. Designed to accommodate between 30
                    and 200 guests, this beautifully styled space combines
                    luxury, warmth and versatility to create a truly
                    unforgettable atmosphere.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-mist">
                    Nestled within the picturesque grounds of Chigwell Hall, the
                    Mini Marquee provides a refined blank canvas that can be
                    tailored to suit your unique vision — whether you are
                    planning an engagement celebration, wedding reception,
                    cultural event or private party.
                  </p>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="text-mist">
                    With its romantic starlight ceiling, elegant furnishings and
                    peaceful surroundings, the Mini Marquee creates the perfect
                    setting for memorable moments with your closest family and
                    friends.
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <RevealImage
                  media={MINI_IMG.intro}
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
        eyebrow="Intimate by design"
        title={"Bright by day,\nstarlit by night."}
        body={[
          "The perfect choice for a more intimate event or wedding, 30 to 200 guests, with modern light-grey flooring and a full side of glass windows that lets the natural light pour in.",
          "A fixed, built-in air-conditioning unit keeps the room comfortable, while a raised stage gives your chosen band or DJ a home.",
        ]}
        media={MINI_IMG.bright}
        ratio="4 / 3"
      />

      <StarlitCeiling />

      <SplitFeature
        eyebrow="The garden door"
        title="Steps from the Secret Garden."
        body={[
          "Booking includes access to the Secret Garden for welcome drinks and pictures around the fountain, and the Mini Marquee is now licensed for civil ceremonies.",
          "An effortless flow from vows, to drinks on the lawn, to dinner and dancing under the stars.",
        ]}
        media={SPACE_GARDEN}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
        link={{ href: "/spaces/secret-garden", label: "See the Secret Garden" }}
      />

      {/* Catering — portrait (9:16) video kept at its native aspect ratio */}
      <div className="bg-bone py-16 md:py-24">
        <div className="container-luxe">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:order-2 md:col-span-6">
              <div className="mx-auto w-full max-w-[340px]">
                <RevealVideo
                  src={VIDEO.mega}
                  poster={MINI_IMG.interior}
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
        title="Small room, full kit."
        features={[
          "Capacity for 30 – 200 guests",
          "Complimentary on-site parking with attendants",
          "Elegant starlight ceiling",
          "State-of-the-art sound system with cordless microphone",
          "Private bridal suite",
          "Gold Napoleon chairs",
          "Restroom facilities with attendants",
          "Exclusive access to the Secret Garden for 2 hours",
        ]}
        tone="bone"
      />

      <SpecList
        eyebrow="The detail"
        specs={[
          { k: "Capacities", v: "200 seated · 250 standing" },
          { k: "Licensed", v: "Until midnight, 7 days a week" },
          { k: "Civil ceremonies", v: "Yes, and in the Secret Garden" },
          { k: "Ideal for", v: "Intimate weddings, mitzvahs, birthdays" },
        ]}
        tone="ink"
      />

      <CtaBand
        title="An evening that ends under the stars."
        blurb="Tell us your date and guest count, we'll show you how the Mini Marquee transforms from afternoon light to starlit night."
        primary={{ href: "/visit#enquire", label: "Enquire about the Mini Marquee" }}
      />
    </>
  );
}
