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
    "From weddings and corporate events to cultural and religious celebrations and milestone parties — discover every occasion you can host at The Chigwell Marquees, Essex.",
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
        title="Every reason to celebrate."
        intro="Weddings are at the heart of what we do, but our venues provide a setting for occasions of every kind."
        media={OCC_WEDDINGS}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>One Location. Many Occasions.</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              A setting shaped around your event.
            </RevealText>
            <div className="mt-8 max-w-2xl space-y-5">
              <Reveal>
                <p className="lead text-mist">
                  From intimate gatherings to celebrations for up to 1,000
                  guests, The Chigwell Marquees provides flexible spaces for
                  events of every style and scale.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-mist">
                  Choose your venue and create your occasion around your chosen
                  décor, entertainment, caterers and suppliers.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="01 · Weddings · Primary"
        title="Weddings for every style and tradition."
        body="From intimate celebrations to spectacular receptions for up to 1,000 guests, create a wedding day entirely your own."
        media={OCC_WEDDINGS}
        ratio="16 / 9"
        link={{ href: "/occasions/weddings", label: "Explore Weddings" }}
      />

      <SplitFeature
        eyebrow="02 · Corporate Events"
        title="A distinctive setting for business."
        body="Conferences, award ceremonies, launches, company celebrations and large-scale corporate events within easy reach of London."
        media={OCC_CORPORATE_CARD}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
        link={{ href: "/occasions/corporate", label: "Explore Corporate Events" }}
      />

      <SplitFeature
        eyebrow="03 · Cultural & Religious Events"
        title="Celebrations of every tradition."
        body="Asian weddings, religious ceremonies, Bar & Bat Mitzvahs and cultural celebrations hosted within flexible venues."
        media={OCC_FAITH}
        ratio="4 / 3"
        link={{ href: "/occasions/faith-based", label: "Explore Cultural & Religious Events" }}
      />

      <SplitFeature
        eyebrow="04 · Private Celebrations"
        title="Celebrate life's biggest moments."
        body="Birthdays, engagements, anniversaries and important family occasions in a setting that can be tailored around you."
        media={OCC_CELEBRATIONS}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
        link={{ href: "/occasions/celebrations", label: "Explore Private Celebrations" }}
      />

      <CtaBand
        title="Tell us what you're planning."
        blurb="Share your occasion, preferred date and guest numbers and our team will help you find the right venue."
        secondary={{ href: "/gallery", label: "Explore the Gallery" }}
      />
    </>
  );
}
