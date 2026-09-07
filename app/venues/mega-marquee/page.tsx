import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import GalleryBand from "@/components/site/GalleryBand";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import { SPACE_MEGA_HERO, SPACE_MEGA_INTRO } from "@/lib/media";
import { VIDEO, REAL } from "@/lib/media.real";

export const metadata = pageMeta({
  title: "Large Marquee Venue Hire in Essex | The Chigwell Marquees",
  description:
    "The Mega Marquee — a large Essex marquee venue for weddings, galas and corporate events of 200 to 1,000 guests, with a pro sound and lighting rig and full kitchen.",
  path: "/venues/mega-marquee",
  imageAlt: "Inside the Mega Marquee dressed for a grand wedding reception",
});

export default function MegaMarqueePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Venues", path: "/venues" },
          { name: "The Mega Marquee", path: "/venues/mega-marquee" },
        ])}
      />
      <PageHero
        eyebrow="Celebrations on a grand scale"
        title="The Mega Marquee."
        titleClassName="whitespace-nowrap"
        intro="An impressive large-capacity venue in Chigwell, Essex, accommodating weddings and events of up to 1,000 guests."
        media={SPACE_MEGA_HERO}
        video={VIDEO.megaHero}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Eyebrow>One of the largest marquee venues in Essex</Eyebrow>
              <RevealText as="h2" className="mt-7 display-lg">
                {"Space to create\nsomething exceptional."}
              </RevealText>
              <div className="mt-8 space-y-6">
                <Reveal>
                  <p className="lead text-mist">
                    The Mega Marquee is the largest venue at The Chigwell
                    Marquees and is designed for weddings and events on a
                    significant scale.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-mist">
                    Set within the 42-acre grounds of Chigwell Hall, its
                    expansive interior provides a highly versatile blank canvas
                    that can be transformed around your décor, production and
                    entertainment.
                  </p>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="text-mist">
                    From spectacular wedding receptions and cultural
                    celebrations to corporate events and major private
                    functions, the Mega Marquee offers the scale and flexibility
                    required for a truly impressive occasion.
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
        eyebrow="The Space"
        title="Designed around your vision."
        body="The neutral interior, high ceilings and generous open-plan layout allow your chosen décor and production teams to completely transform the venue around your occasion."
        media={REAL.tallCenterpiece}
        ratio="4 / 5"
      />

      <GalleryBand label="Explore the Gallery" />

      <SpecList
        eyebrow="Features"
        title="Everything you need for a large-scale event."
        features={[
          "Capacity for 200 – 1,000 guests",
          "Complimentary on-site guest parking",
          "Built-in sound system",
          "Cordless microphone",
          "Private bridal suite",
          "Seating and tables available",
          "Catering preparation facilities",
          "Purpose-built restroom facilities",
          "Air conditioning and heating",
          "Event security and operational staff",
          "Selected access to the grounds for wedding photography",
        ]}
        tone="bone"
      />

      <SpecList
        eyebrow="Venue Details"
        specs={[
          { k: "Capacity", v: "200 – 1,000 guests" },
          { k: "Venue Type", v: "Dry hire" },
          { k: "Interior", v: "Neutral interior · high ceilings · flexible layout" },
          { k: "Ideal For", v: "Large weddings · receptions · cultural celebrations · corporate events · private functions" },
        ]}
        tone="ink"
      />
    </>
  );
}
