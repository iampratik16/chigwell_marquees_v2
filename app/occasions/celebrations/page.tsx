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
            { name: "Private Celebrations", path: "/occasions/celebrations" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Occasions · Private Celebrations"
        title="Every reason to celebrate."
        intro="Birthdays, engagements, anniversaries and private occasions in one of Chigwell's most distinctive settings."
        media={CELEB_HERO}
      />

      <SplitFeature
        eyebrow="Milestone birthdays"
        title="Celebrate on your scale."
        body={[
          "From milestone birthdays with close family and friends to large-scale parties, choose a venue suited to your guest numbers and create the atmosphere entirely around your occasion.",
          "The Mini Marquee provides an elegant setting for celebrations of 30 to 200 guests, while the Mega Marquee offers the scale for significantly larger events.",
        ]}
        media={CELEB_PARTY}
        ratio="4 / 3"
      />

      <SplitFeature
        eyebrow="Engagements & anniversaries"
        title="Mark the occasion in style."
        body={[
          "Celebrate an engagement, anniversary or important milestone within the beautiful surroundings of Chigwell Hall.",
          "The Mini Marquee offers an intimate setting, while the Mega Marquee provides the space for larger family celebrations.",
        ]}
        media={CELEB_MINI}
        ratio="4 / 5"
        reverse
        tone="bone-dim"
      />

      <SplitFeature
        eyebrow="Ceremonies & mitzvahs"
        title="More reasons to gather."
        body="The Chigwell Marquees can also host civil ceremonies, Bar & Bat Mitzvahs, christenings, baby showers, pre-wedding celebrations and other important family occasions."
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
        title="What are you celebrating?"
        blurb="Tell us your occasion, preferred date and guest numbers and we'll help you find the most suitable venue."
        tone="ink"
        secondary={{ href: "/gallery", label: "Explore the Gallery" }}
      />
    </>
  );
}
