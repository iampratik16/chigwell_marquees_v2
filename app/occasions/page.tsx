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
import { OCC_WEDDINGS, OCC_CELEBRATIONS, OCC_CORPORATE_CARD, OCC_FAITH } from "@/lib/media";

export const metadata = pageMeta({
  title: "Event & Party Venue Hire in Essex | The Chigwell Marquees",
  description:
    "From weddings and corporate events to faith-based celebrations and milestone parties — discover every occasion you can host at The Chigwell Marquees, Essex.",
  path: "/occasions",
  imageAlt: "Events and celebrations hosted at The Chigwell Marquees, Essex",
});

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
                A blank canvas for thirty guests or a thousand — dressed to any
                theme, bring your own caterer, no corkage.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="01 · Weddings · Primary"
        title="Weddings, of every tradition."
        body="Garden ceremonies, civil vows and grand traditional weddings, for thirty guests or a thousand."
        media={OCC_WEDDINGS}
        ratio="16 / 9"
        link={{ href: "/occasions/weddings", label: "Explore weddings" }}
      />

      <SplitFeature
        eyebrow="02 · Corporate Events"
        title="Corporate, at an incredible location."
        body="Galas, conferences, product launches and the office Christmas party of the year — full PA, big screens, 42 acres."
        media={OCC_CORPORATE_CARD}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
        link={{ href: "/occasions/corporate", label: "Explore corporate" }}
      />

      <SplitFeature
        eyebrow="03 · Faith-Based Events"
        title="Faith-based, hosted with care."
        body="Asian weddings, mitzvahs and religious ceremonies, accommodated with cultural understanding and ease."
        media={OCC_FAITH}
        ratio="4 / 3"
        link={{ href: "/occasions/faith-based", label: "Explore faith-based events" }}
      />

      <SplitFeature
        eyebrow="04 · Private Celebrations"
        title="Celebrations worth gathering for."
        body="Milestone birthdays, engagements and anniversaries, the room dressed entirely to the occasion."
        media={OCC_CELEBRATIONS}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
        link={{ href: "/occasions/celebrations", label: "Explore private celebrations" }}
      />

      <CtaBand
        title="Tell us what you're planning."
        blurb="Every occasion starts with a conversation. Ours begins whenever you're ready."
      />
    </>
  );
}
