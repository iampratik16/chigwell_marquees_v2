import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import CtaBand from "@/components/site/CtaBand";
import { SECRET_IMG, VIDEO, POSTER } from "@/lib/media.real";

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

      <SplitFeature
        eyebrow="The grounds"
        title={"A picturesque setting\nfor your finest moments."}
        body={[
          "When you hire either marquee, your guests are given exclusive use of a secluded secret garden. With beautifully tended lawns and a classic fountain at its heart, it is the perfect setting for a short stroll in the setting sun.",
          "Couples often use it for outdoor civil ceremonies, and it is, without question, the place for romantic photography and the pictures you'll keep forever.",
        ]}
        media={SECRET_IMG.gazebo}
        ratio="4 / 5"
      />

      <SplitFeature
        eyebrow="In bloom"
        title="Blossom-lined avenues, made for photographs."
        body={[
          "In spring the grounds turn to blossom, pink avenues, manicured lawns and quiet corners that frame every photograph effortlessly.",
          "From welcome drinks to the last light of the day, the garden is yours alone.",
        ]}
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
