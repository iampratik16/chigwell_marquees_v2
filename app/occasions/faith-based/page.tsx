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
import { OCC_FAITH, OCC_FAITH_2, OCC_CIVIL, OCC_CULTURAL } from "@/lib/media";

export const metadata = pageMeta({
  title: "Cultural & Religious Event Venue, Essex | The Chigwell Marquees",
  description:
    "A cultural and religious event venue in Essex for Asian weddings, Bar & Bat Mitzvahs and religious ceremonies of up to 1,000 guests, with flexible layouts and catering facilities.",
  path: "/occasions/faith-based",
  imageAlt: "An Asian wedding mandap staged in the Mega Marquee at The Chigwell Marquees",
});

export default function FaithBasedPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceNode({
            name: "Cultural & Religious Event Venue Hire",
            serviceType: "Cultural and religious event venue hire",
            description:
              "A cultural and religious event venue in Essex for Asian weddings, Bar & Bat Mitzvahs and religious ceremonies, with flexible layouts, large capacities and dedicated catering preparation facilities.",
            path: "/occasions/faith-based",
          }),
          breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Occasions", path: "/occasions" },
            { name: "Cultural & Religious Events", path: "/occasions/faith-based" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Occasions · Cultural & Religious Events"
        title="A setting for every tradition."
        intro="Flexible spaces, large capacities and an experienced team for cultural celebrations and religious occasions."
        media={OCC_CULTURAL}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>Cultural &amp; Religious Events</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              Flexible around what matters to you.
            </RevealText>
            <div className="mt-8 max-w-2xl space-y-5">
              <Reveal>
                <p className="lead text-mist">
                  Every celebration has its own traditions and requirements.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-mist">
                  Our marquee venues provide flexible layouts, large capacities
                  and dedicated catering preparation facilities, allowing your
                  chosen suppliers to create an event around the needs of your
                  family and celebration.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="Asian Weddings"
        title="Space for every part of the celebration."
        body={[
          "The Chigwell Marquees has extensive experience hosting Asian weddings and pre-wedding events.",
          "The Mega Marquee provides the scale for major wedding receptions of up to 1,000 guests, while the Mini Marquee offers a more intimate setting for weddings and pre-wedding celebrations.",
        ]}
        media={OCC_FAITH_2}
        ratio="4 / 3"
        link={{ href: "/occasions/weddings", label: "Explore Weddings" }}
      />

      <SplitFeature
        eyebrow="Mitzvahs"
        title="Bar & Bat Mitzvahs."
        body="Our flexible marquee venues provide a blank canvas for Bar and Bat Mitzvahs, with space for dining, entertainment and bespoke décor and production."
        media={OCC_CIVIL}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
      />

      <SplitFeature
        eyebrow="Religious Ceremonies"
        title="Space to gather and celebrate."
        body="From religious ceremonies to important cultural occasions, our team will work with you to understand the requirements of your event and help identify the most suitable venue."
        media={OCC_FAITH}
        ratio="4 / 3"
      />

      <SpecList
        eyebrow="Facilities"
        title="Everything you need for your celebration."
        features={[
          "Flexible spaces",
          "Capacity up to 1,000 guests",
          "Approved external caterers welcome",
          "Catering preparation facilities",
          "Air conditioning and heating",
          "Built-in sound system",
          "Cordless microphone",
          "Extensive complimentary parking",
          "Experienced operational team",
        ]}
        tone="ink"
      />

      <CtaBand
        title="Tell us about your celebration."
        blurb="Share your requirements, preferred date and guest numbers and our team will help you find the right venue."
        secondary={{ href: "/gallery", label: "Explore the Gallery" }}
      />
    </>
  );
}
