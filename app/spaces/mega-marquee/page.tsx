import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import CtaBand from "@/components/site/CtaBand";
import { SPACE_MEGA_ALT, SPACE_MEGA_HERO } from "@/lib/media";
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
      />

      <SplitFeature
        eyebrow="The grand canvas"
        title={"A structure that turns\nheads, for all the\nright reasons."}
        body={[
          "The Mega Marquee is a striking venue for large weddings, engagement parties and corporate events, accommodating from 300 to 1,000 guests.",
          "Finished with neutral carpet throughout and crowned by high ceilings, it gives you the height and the blank canvas to execute your décor vision exactly.",
        ]}
        media={REAL.tallCenterpiece}
        ratio="4 / 5"
      />

      <SplitFeature
        eyebrow="Catering"
        title="A kitchen hidden in plain sight."
        body={[
          "Your chosen caterer is given a fully functioning kitchen with ample preparation space and its own entrance, kept discreetly out of sight of your guests.",
          "The grounds can also accommodate outdoor cooking, from live stations to spectacle.",
        ]}
        media={SPACE_MEGA_ALT}
        video={VIDEO.mega}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
      />

      <SpecList
        eyebrow="Features"
        title="Everything, built in."
        features={[
          "Accommodates 300 – 1,000 guests",
          "Free onsite car park",
          "State-of-the-art sound & lighting, cordless microphone",
          "Access to the Bridal Suite",
          "Fully functioning kitchen & preparation area",
          "Built-in air conditioning & heating",
          "Raised large stage area",
          "Disabled access & parking",
          "Outdoor area & live-cooking space",
          "Exclusive access to the Secret Garden",
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
