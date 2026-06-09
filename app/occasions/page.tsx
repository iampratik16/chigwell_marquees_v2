import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import CtaBand from "@/components/site/CtaBand";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import { OCC_WEDDINGS, OCC_CELEBRATIONS, OCC_CORPORATE } from "@/lib/media";

export const metadata: Metadata = {
  alternates: { canonical: "/occasions" },
  title: { absolute: "Event & Party Venue Hire in Essex | The Chigwell Marquees" },
  description:
    "Weddings, celebrations and corporate events at The Chigwell Marquees, one adaptable estate, dressed entirely to your vision, with no corkage.",
};

export default function OccasionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Occasions", path: "/occasions" },
        ])}
      />
      <PageHero
        eyebrow="Occasions"
        title={"Held for every\nkind of gathering."}
        intro="From the most personal of vows to the grandest of galas, the estate adapts to the moment."
        media={OCC_WEDDINGS}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>One estate, many moments</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              {"A blank canvas that becomes\nwhatever your day requires."}
            </RevealText>
            <Reveal>
              <p className="lead mt-8 max-w-2xl text-mist">
                Partition the space, dress it in any theme, bring your own
                caterer, there is no corkage, and an experienced events team to
                hold the whole day together.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="01 · Weddings"
        title="Weddings, of every tradition."
        body={[
          "Garden ceremonies, civil vows and grand traditional Asian weddings, for thirty guests or a thousand.",
          "A leading Essex and London venue, with trusted caterers, décor companies and DJs who know our marquees inside out.",
        ]}
        media={OCC_WEDDINGS}
        ratio="4 / 3"
        link={{ href: "/occasions/weddings", label: "Explore weddings" }}
      />

      <SplitFeature
        eyebrow="02 · Celebrations"
        title="Celebrations worth gathering for."
        body={[
          "Milestone birthdays, engagements, anniversaries and Bar & Bat Mitzvahs, the room dressed entirely to the occasion.",
          "Civil ceremonies, christenings and every reason to bring people together.",
        ]}
        media={OCC_CELEBRATIONS}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
        link={{ href: "/occasions/celebrations", label: "Explore celebrations" }}
      />

      <SplitFeature
        eyebrow="03 · Corporate"
        title="Corporate, at an incredible location."
        body={[
          "Galas, conferences, product launches, team days and festivals, with a full PA, big screens and 42 acres to play with.",
          "And the most memorable office Christmas party your team has ever had.",
        ]}
        media={OCC_CORPORATE}
        ratio="4 / 3"
        link={{ href: "/occasions/corporate", label: "Explore corporate" }}
      />

      <CtaBand
        title="Tell us what you're planning."
        blurb="Every occasion starts with a conversation. Ours begins whenever you're ready."
      />
    </>
  );
}
