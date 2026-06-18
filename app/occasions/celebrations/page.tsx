import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { serviceNode, breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import CtaBand from "@/components/site/CtaBand";
import { OCC_CIVIL, img, type Media } from "@/lib/media";

const CELEB_HERO = img(
  "birthday-party-venue-essex-chigwell-marquees.jpg",
  "A milestone birthday party with a styled balloon arch and dessert table",
);
const CELEB_PARTY = img(
  "party-venues-near-me.jpg",
  "A party venue in Essex dressed for a celebration",
);
const CELEB_MINI: Media = {
  src: "/media/mini-interior.jpg",
  alt: "The Mini Marquee beneath its starlit canopy, set for an intimate gathering",
  width: 1080,
  height: 720,
};

export const metadata = pageMeta({
  title: "Party Venue Hire in Essex | The Chigwell Marquees",
  description:
    "Party venue hire in Essex for birthdays, engagements, anniversaries, Bar & Bat Mitzvahs and civil ceremonies, dressed entirely to your occasion.",
  path: "/occasions/celebrations",
  imageAlt: "A milestone birthday party styled at The Chigwell Marquees",
});

export default function CelebrationsPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceNode({
            name: "Celebration & Party Venue Hire",
            serviceType: "Party & celebration venue hire",
            description:
              "Birthdays, engagements, anniversaries, Bar & Bat Mitzvahs and civil ceremonies at The Chigwell Marquees, dressed entirely to your occasion.",
            path: "/occasions/celebrations",
          }),
          breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Occasions", path: "/occasions" },
            { name: "Celebrations", path: "/occasions/celebrations" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Occasions · Celebrations"
        title={"Every reason\nto gather."}
        intro="Party venue hire in Essex for birthdays, engagements, anniversaries and milestones, the estate dressed entirely to the moment."
        media={CELEB_HERO}
      />

      <SplitFeature
        eyebrow="Milestone birthdays"
        title="Parties at the scale of the moment."
        body={[
          "Our birthday party venue flexes from an intimate thirtieth to a thousand-guest spectacular, with a state-of-the-art sound system, dance floor and bar built in.",
          "Bring your own caterer and theme, with no corkage and 42 acres to set the scene, from summer garden parties to a Christmas party venue in Essex.",
        ]}
        media={CELEB_PARTY}
        ratio="4 / 3"
      />

      <SplitFeature
        eyebrow="Engagements & anniversaries"
        title="Mark the occasion in style."
        body={[
          "A glamorous engagement party, a landmark anniversary, a pre-wedding gathering, set against the lawns and the fountain of the Secret Garden.",
          "The Mini Marquee for something intimate; the Mega Marquee when the whole family is coming.",
        ]}
        media={CELEB_MINI}
        ratio="4 / 5"
        reverse
        tone="bone-dim"
      />

      <SplitFeature
        eyebrow="Ceremonies & mitzvahs"
        title={"Civil ceremonies,\nmitzvahs & more."}
        body={[
          "The Secret Garden and Belmont Suite are both licensed for civil ceremonies, and the Mini Marquee is licensed too, so the whole day can happen on one estate.",
          "Bar & Bat Mitzvahs, christenings, baby showers and religious events are all warmly at home here.",
        ]}
        media={OCC_CIVIL}
        ratio="4 / 3"
      />

      <SpecList
        eyebrow="Perfect for"
        features={[
          "Milestone birthdays",
          "Engagement parties",
          "Anniversaries",
          "Bar & Bat Mitzvahs",
          "Civil ceremonies",
          "Christenings & baby showers",
          "Pre-wedding events",
          "Christmas & seasonal parties",
        ]}
        tone="botanical"
      />

      <CtaBand
        title="What are we celebrating?"
        blurb="Tell us the occasion and the date, we'll help you shape a night to remember."
        tone="ink"
      />
    </>
  );
}
