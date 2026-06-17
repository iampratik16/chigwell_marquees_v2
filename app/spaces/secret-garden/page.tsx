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
import { SECRET_IMG, ESTATE_IMG, VIDEO, POSTER } from "@/lib/media.real";

export const metadata: Metadata = {
  alternates: { canonical: "/spaces/secret-garden" },
  title: { absolute: "Secret Garden Wedding Venue Essex | The Chigwell Marquees" },
  description:
    "The Secret Garden, a secluded lawn with a classic fountain for outdoor civil ceremonies, drinks receptions and photography, for up to 250 guests.",
};

export default function SecretGardenPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "The Spaces", path: "/spaces" },
          { name: "The Secret Garden", path: "/spaces/secret-garden" },
        ])}
      />
      <PageHero
        eyebrow="The spaces · III"
        title={"The Secret\nGarden."}
        intro="A secluded lawn, a classic fountain, and the soft gold of a setting sun."
        media={SECRET_IMG.blossom}
        video={VIDEO.secretGarden}
        poster={POSTER.secretGarden}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Eyebrow>Secret Garden &amp; Waterfall</Eyebrow>
              <RevealText as="h2" className="mt-7 display-lg">
                {"One of the most\nenchanting corners\nof the estate."}
              </RevealText>
              <div className="mt-8 space-y-6">
                <Reveal>
                  <p className="lead text-mist">
                    Hidden behind the Mini Marquee, our Secret Garden is one of
                    the most enchanting areas within the Chigwell Hall estate — a
                    peaceful and romantic setting designed for unforgettable
                    moments.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-mist">
                    Surrounded by beautiful greenery and tranquil scenery, many
                    couples choose to exchange their vows beneath our charming
                    pergola whilst enjoying the calming sounds of the fountain and
                    nature around them. The secluded atmosphere creates a truly
                    magical backdrop for ceremonies, photographs and special
                    memories.
                  </p>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="text-mist">
                    The Secret Garden is also the perfect space for welcoming
                    guests with drinks, canapés and live music before the main
                    celebration begins. Meanwhile, our stunning on-site waterfall
                    and picturesque bridge provide exceptional photo opportunities
                    for newlyweds and guests alike.
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <RevealImage
                  media={SECRET_IMG.waterfall}
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
        eyebrow="The grounds"
        title={"A picturesque setting\nfor your finest moments."}
        body="Exclusively yours with either marquee — tended lawns, a classic fountain, and the place for outdoor ceremonies and pictures you'll keep forever."
        media={ESTATE_IMG.gazebo}
        ratio="3 / 2"
      />

      <SplitFeature
        eyebrow="In bloom"
        title="Blossom-lined avenues, made for photographs."
        body="In spring the grounds turn to blossom — pink avenues and quiet corners that frame every photograph effortlessly."
        media={SECRET_IMG.blossom}
        ratio="4 / 5"
        reverse
        tone="bone-dim"
      />

      <SpecList
        eyebrow="The detail"
        title="Yours, exclusively."
        specs={[
          { k: "Capacity", v: "Up to 250 guests" },
          { k: "Licensed", v: "Civil ceremonies permitted" },
          { k: "Access", v: "Included with either marquee" },
          { k: "At its heart", v: "Manicured lawns & a classic fountain" },
        ]}
        tone="bone-dim"
      />

      <SpecList
        eyebrow="Perfect for"
        features={[
          "Outdoor civil ceremonies",
          "Drinks receptions",
          "Romantic photography & videography",
          "Quiet moments away from the party",
        ]}
        tone="botanical"
      />

      <CtaBand
        title="Say your vows beneath the open sky."
        blurb="The Secret Garden flows straight into both marquees, ceremony, reception and celebration, all on one estate."
        tone="ink"
        primary={{ href: "/visit#enquire", label: "Plan a garden ceremony" }}
      />
    </>
  );
}
