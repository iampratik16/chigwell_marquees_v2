import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import StarlitCeiling from "@/components/site/StarlitCeiling";
import CtaBand from "@/components/site/CtaBand";
import GalleryBand from "@/components/site/GalleryBand";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import RevealVideo from "@/components/ui/RevealVideo";
import { SPACE_GARDEN } from "@/lib/media";
import { MINI_IMG, VIDEO } from "@/lib/media.real";

export const metadata = pageMeta({
  title: "Intimate Marquee Venue in Essex | The Chigwell Marquees",
  description:
    "The Mini Marquee — an intimate, light-filled Essex venue for 30 to 200 guests, with a starlit ceiling, air conditioning and doors onto the Secret Garden.",
  path: "/venues/mini-marquee",
  imageAlt: "The Mini Marquee beneath its starlit ceiling, set for an intimate celebration",
});

export default function MiniMarqueePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Venues", path: "/venues" },
          { name: "The Mini Marquee", path: "/venues/mini-marquee" },
        ])}
      />
      <PageHero
        eyebrow="The spaces · II"
        title="The Mini Marquee."
        titleClassName="whitespace-nowrap"
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
        body="An intimate space for 30 to 200, with a full side of glass that floods the room with natural light by day."
        media={MINI_IMG.bright}
        ratio="4 / 3"
      />

      <StarlitCeiling />

      <SplitFeature
        eyebrow="The garden door"
        title="Steps from the Secret Garden."
        body="A door straight onto the Secret Garden, licensed for civil ceremonies — an effortless flow from vows to drinks on the lawn."
        media={SPACE_GARDEN}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
        link={{ href: "/venues/secret-garden", label: "See the Secret Garden" }}
      />

      {/* Catering — portrait (9:16) video kept at its native aspect ratio */}
      <div className="bg-bone py-12 md:py-16">
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
                    Your caterer gets a fully functioning kitchen with its own
                    discreet entrance — plus the grounds for live outdoor cooking.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GalleryBand />

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
        secondary={null}
      />
    </>
  );
}
