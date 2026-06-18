import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import CtaBand from "@/components/site/CtaBand";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import {
  SPACES_HERO,
  SPACE_MEGA_FEATURE,
  SPACE_MINI_FEATURE,
  SPACE_GARDEN_FEATURE,
} from "@/lib/media";

export const metadata = pageMeta({
  title: "Marquee Venues & Hire in Essex | The Chigwell Marquees",
  description:
    "Explore our Essex marquee venues: the Mega Marquee (300–1,000), the Mini Marquee (30–200), the Secret Garden and indoor suites on the Chigwell Hall estate.",
  path: "/venues",
  imageAlt: "The marquees and Secret Garden in the grounds of Chigwell Hall",
});

export default function SpacesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Venues", path: "/venues" },
        ])}
      />
      <PageHero
        eyebrow="The spaces"
        title={"Two marquees and\na secret garden."}
        intro="One estate, three distinct settings, each a blank canvas, dressed entirely to your vision."
        media={SPACES_HERO}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>Choose your stage</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              {"From a thousand guests beneath\nthe stars to thirty by candlelight."}
            </RevealText>
            <Reveal>
              <p className="lead mt-8 max-w-2xl text-mist">
                Whatever the scale, the same care applies, professional sound and
                lighting, an experienced events team, and the freedom of a dry-hire
                venue with no corkage.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="I · up to 1,000"
        title="The Mega Marquee"
        body={[
          "A striking structure with high ceilings and neutral interiors, built for grand weddings, galas and corporate showcases of 300 to 1,000 guests.",
          "A state-of-the-art sound & lighting rig, a fully functioning kitchen with its own discreet entrance, and access to the Bridal Suite and Secret Garden.",
        ]}
        media={SPACE_MEGA_FEATURE}
        ratio="4 / 3"
        link={{ href: "/venues/mega-marquee", label: "Explore the Mega Marquee" }}
      />

      <SplitFeature
        eyebrow="II · 30 – 200"
        title="The Mini Marquee"
        body={[
          "An intimate, light-filled space with a full side of glass, built-in air conditioning and a white-canopy starlit ceiling that switches on as evening falls.",
          "A raised stage for your band or DJ, and a door straight onto the Secret Garden, now licensed for civil ceremonies.",
        ]}
        media={SPACE_MINI_FEATURE}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
        link={{ href: "/venues/mini-marquee", label: "Explore the Mini Marquee" }}
      />

      <SplitFeature
        eyebrow="III · up to 250"
        title="The Secret Garden"
        body={[
          "A secluded lawn with a classic central fountain, the picturesque setting for outdoor civil ceremonies, welcome drinks and unforgettable photography.",
          "Given over to your exclusive use whenever you hire either marquee.",
        ]}
        media={SPACE_GARDEN_FEATURE}
        ratio="4 / 3"
        link={{ href: "/venues/secret-garden", label: "Explore the Secret Garden" }}
      />

      <CtaBand
        title="Not sure which space is yours?"
        blurb="Tell us about your occasion and our events team will walk you through both marquees, the garden and everything in between."
        primary={{ href: "/visit#enquire", label: "Arrange a viewing" }}
      />
    </>
  );
}
