import VenueGallery from "@/components/sections/VenueGallery";
import { MINI_GALLERY } from "@/lib/gallery-venues";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import StarlitCeiling from "@/components/site/StarlitCeiling";
import GalleryBand from "@/components/site/GalleryBand";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import RevealVideo from "@/components/ui/RevealVideo";
import { MINI_IMG, VIDEO, SECRET_IMG } from "@/lib/media.real";

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
        eyebrow="Elegant. Intimate. Versatile."
        title="The Mini Marquee."
        titleClassName="whitespace-nowrap"
        intro="A beautiful setting for weddings and celebrations of 30 to 200 guests."
        media={MINI_IMG.interior}
      />

      <VenueGallery title="Inside the Mini Marquee." items={MINI_GALLERY} />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Eyebrow>The Mini Marquee</Eyebrow>
              <RevealText as="h2" className="mt-7 display-lg">
                {"Created for more\nintimate celebrations."}
              </RevealText>
              <div className="mt-8 space-y-6">
                <Reveal>
                  <p className="lead text-mist">
                    The Mini Marquee offers an elegant and versatile setting for
                    weddings, engagements, birthdays, anniversaries and private
                    occasions.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-mist">
                    Accommodating 30 to 200 guests, the venue combines natural
                    light, neutral interiors and a beautiful white starlit
                    ceiling to create a sophisticated blank canvas for your
                    celebration.
                  </p>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="text-mist">
                    Located alongside the Secret Garden, it also offers a
                    beautiful connection to the surrounding grounds.
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
        eyebrow="Natural light"
        title={"Bright by day.\nStarlit by night."}
        body="Large glazed sections allow natural light to fill the marquee throughout the day, while the illuminated starlit ceiling creates a completely different atmosphere as your celebration moves into the evening."
        media={MINI_IMG.bright}
        ratio="4 / 3"
      />

      <StarlitCeiling />

      <SplitFeature
        eyebrow="The garden door"
        title="Just steps from the marquee."
        body={[
          "The Secret Garden sits alongside the Mini Marquee and provides an attractive outdoor setting for selected ceremonies, welcome drinks, canapés and wedding photography.",
          "Access is subject to the arrangements included within your booking.",
        ]}
        media={SECRET_IMG.waterfall}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
        link={{ href: "/venues/secret-garden", label: "See the Secret Garden" }}
        linkVariant="button"
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
                Designed with your caterer in mind.
              </RevealText>
              <div className="mt-6 space-y-5">
                <Reveal>
                  <p className="lead text-ink/85">
                    Dedicated catering preparation facilities allow your approved
                    caterer to work efficiently behind the scenes while your
                    celebration continues within the main marquee.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GalleryBand label="Explore the Gallery" />

      <SpecList
        eyebrow="Features"
        title="Everything you need for your celebration."
        features={[
          "Capacity for 30 – 200 guests",
          "Complimentary on-site parking",
          "White starlit ceiling",
          "Built-in sound system",
          "Cordless microphone",
          "Private bridal suite",
          "Gold Napoleon chairs",
          "Round and rectangular tables",
          "Catering preparation facilities",
          "Purpose-built restroom facilities",
          "Air conditioning and heating",
          "Selected Secret Garden access",
        ]}
        tone="bone"
      />

      <SpecList
        eyebrow="Venue Details"
        specs={[
          { k: "Capacity", v: "30 – 200 guests" },
          { k: "Venue Type", v: "Dry hire" },
          { k: "Civil Ceremonies", v: "Available in selected licensed areas" },
          { k: "Ideal For", v: "Weddings · engagements · birthdays · anniversaries · cultural events · private celebrations" },
        ]}
        tone="ink"
      />
    </>
  );
}
