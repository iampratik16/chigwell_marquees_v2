import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { serviceNode, breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import CtaBand from "@/components/site/CtaBand";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import { OCC_ASIAN, SPACE_MEGA, type Media } from "@/lib/media";
import { REAL, VIDEO, POSTER, ASIAN_IMG } from "@/lib/media.real";

const MINI_WEDDING: Media = {
  src: "/media/content/mini-photo-202.jpg",
  alt: "Inside the Mini Marquee, dressed for an intimate wedding",
  width: 2560,
  height: 1706,
};

export const metadata = pageMeta({
  title: "Wedding Venue in Essex | The Chigwell Marquees",
  description:
    "An Essex wedding venue for civil ceremonies and receptions of 30 to 1,000 guests, with bespoke wedding packages, the Secret Garden and flexible dry hire.",
  path: "/occasions/weddings",
  imageAlt: "A wedding reception styled inside a marquee at The Chigwell Marquees",
});

export default function WeddingsPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceNode({
            name: "Wedding Venue Hire",
            serviceType: "Wedding venue hire",
            description:
              "Wedding venue hire in Essex, two magnificent marquees for intimate and grand weddings, including traditional Asian weddings, with a starlit ceiling and the Secret Garden.",
            path: "/occasions/weddings",
          }),
          breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Occasions", path: "/occasions" },
            { name: "Weddings", path: "/occasions/weddings" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Occasions · Weddings"
        title="Weddings at The Chigwell Marquees."
        intro="Two distinctive marquee venues, beautiful grounds and the flexibility to create a wedding that feels completely your own."
        media={REAL.ceremonyAisle}
        video={VIDEO.weddingHero}
        poster={POSTER.weddings}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>Your Day. Your Way.</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              {"From intimate celebrations to weddings\nfor up to 1,000 guests."}
            </RevealText>
            <div className="mt-8 max-w-2xl space-y-5">
              <Reveal>
                <p className="lead text-mist">
                  Set within 42 acres of grounds at Chigwell Hall in Chigwell,
                  Essex, The Chigwell Marquees provides two distinctive settings
                  for weddings of all sizes, cultures and traditions.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-mist">
                  With excellent access from London and extensive complimentary
                  parking, everything is in place for you and your guests to
                  celebrate in one remarkable location.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="Intimate Weddings"
        title="The Mini Marquee"
        body={[
          "Ideal for weddings of 30 to 200 guests, the Mini Marquee combines natural light, elegant neutral interiors and its signature white starlit ceiling.",
          "Located beside the Secret Garden, it provides a beautiful setting for couples looking for a more intimate celebration.",
        ]}
        media={MINI_WEDDING}
        ratio="4 / 3"
        link={{ href: "/venues/mini-marquee", label: "Explore the Mini Marquee" }}
      />

      <SplitFeature
        eyebrow="Large Weddings"
        title="The Mega Marquee"
        body={[
          "Designed for weddings on a larger scale, the Mega Marquee accommodates celebrations of up to 1,000 guests.",
          "Its high ceilings, expansive layout and neutral interior provide the flexibility to create impressive décor, staging, dining and entertainment around your wedding.",
        ]}
        media={SPACE_MEGA}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
        link={{ href: "/venues/mega-marquee", label: "Explore the Mega Marquee" }}
      />

      <SplitFeature
        eyebrow="Asian & Cultural Weddings"
        title={"Designed around\nevery tradition."}
        body={[
          "The Chigwell Marquees has extensive experience hosting Asian weddings and celebrations from a wide range of cultures and traditions.",
          "Our generous capacities, flexible layouts and catering preparation facilities make the venues particularly well suited to large family celebrations.",
          "The Mega Marquee offers the scale required for major wedding receptions, while the Mini Marquee provides an elegant setting for smaller weddings and pre-wedding celebrations.",
        ]}
        media={OCC_ASIAN}
        ratio="4 / 3"
      />

      <Section tone="bone-dim" spacing="sm">
        <div className="container-luxe grid gap-5 md:grid-cols-2">
          <RevealImage media={ASIAN_IMG.pair1} ratio="4 / 5" sizes="(max-width:768px) 100vw, 50vw" interactive cursorLabel="View" className="rounded-2xl" />
          <RevealImage media={ASIAN_IMG.pair2} ratio="4 / 5" sizes="(max-width:768px) 100vw, 50vw" interactive cursorLabel="View" delay={0.08} className="rounded-2xl md:mt-12" />
        </div>
      </Section>

      <SpecList
        eyebrow="Good to Know"
        specs={[
          { k: "Capacity", v: "Up to 1,000 guests across two marquee venues" },
          { k: "Ceremonies", v: "Available within selected licensed areas" },
          { k: "Catering", v: "Dry hire · approved external caterers welcome" },
          { k: "Getting Here", v: "Approximately five minutes by car from Chigwell Underground Station" },
        ]}
        tone="ink"
      />

      <CtaBand
        title="Picture your wedding here."
        blurb="Share your preferred date and guest numbers and arrange a private viewing with our events team."
        primary={{ href: "/visit#enquire", label: "Book a Wedding Viewing" }}
        secondary={{ href: "/gallery", label: "Explore Real Weddings" }}
      />
    </>
  );
}
