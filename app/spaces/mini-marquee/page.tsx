import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import StarlitCeiling from "@/components/site/StarlitCeiling";
import CtaBand from "@/components/site/CtaBand";
import { SPACE_GARDEN } from "@/lib/media";
import { MINI_IMG } from "@/lib/media.real";

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

      <SplitFeature
        eyebrow="Intimate by design"
        title={"Bright by day,\nstarlit by night."}
        body={[
          "The perfect choice for a more intimate event or wedding, 30 to 200 guests, with modern light-grey flooring and a full side of glass windows that lets the natural light pour in.",
          "A fixed, built-in air-conditioning unit keeps the room comfortable, while a raised stage gives your chosen band or DJ a home.",
        ]}
        media={MINI_IMG.staged}
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

      <SpecList
        eyebrow="Features"
        title="Small room, full kit."
        features={[
          "Accommodates 30 – 200 guests",
          "White-canopy starlit ceiling",
          "Full side of glass windows",
          "Built-in air-conditioning unit",
          "State-of-the-art sound, cordless microphone",
          "Raised stage area",
          "Access to the Bridal Suite",
          "Free onsite car park",
          "Access to the Secret Garden",
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
