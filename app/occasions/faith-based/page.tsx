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
import { OCC_FAITH, OCC_FAITH_2, OCC_CIVIL } from "@/lib/media";

export const metadata = pageMeta({
  title: "Asian Wedding & Faith-Based Venue, Essex | The Chigwell Marquees",
  description:
    "An Asian wedding and faith-based venue in Essex for Hindu, Sikh and Muslim weddings, Bar & Bat Mitzvahs and religious ceremonies of up to 1,000 guests.",
  path: "/occasions/faith-based",
  imageAlt: "An Asian wedding mandap staged in the Mega Marquee at The Chigwell Marquees",
});

export default function FaithBasedPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceNode({
            name: "Faith-Based Event Venue Hire",
            serviceType: "Faith-based event venue hire",
            // TODO: confirm copy
            description:
              "A faith-based event venue in Essex for Asian weddings, mitzvahs and religious ceremonies, accommodated with cultural understanding, flexible catering and partitionable spaces.",
            path: "/occasions/faith-based",
          }),
          breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Occasions", path: "/occasions" },
            { name: "Faith-Based Events", path: "/occasions/faith-based" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Occasions · Faith-Based"
        // TODO: confirm copy
        title={"Ceremonies of\nevery faith."}
        // TODO: confirm copy
        intro="Asian weddings, mitzvahs and religious ceremonies, hosted with care and cultural understanding."
        media={OCC_FAITH}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>Faith-based events in Essex</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              {"A venue that adapts to\nyour traditions."}
            </RevealText>
            <Reveal>
              {/* TODO: confirm copy */}
              <p className="lead mt-8 max-w-2xl text-mist">
                Partitionable spaces, your own caterer with no corkage, and an
                experienced team who understand the customs your day requires.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="Asian weddings"
        title="Mandaps, mehndis and grand receptions."
        // TODO: confirm copy
        body="Hindu, Sikh, Muslim and Bengali weddings staged across the estate, with long-standing caterers and décor partners who know our marquees."
        media={OCC_FAITH_2}
        ratio="4 / 3"
        link={{ href: "/occasions/weddings", label: "See all weddings" }}
      />

      <SplitFeature
        eyebrow="Mitzvahs & milestones"
        title="Bar & Bat Mitzvahs, beautifully held."
        // TODO: confirm copy
        body="A blank canvas dressed entirely to the occasion, with the run of the estate for families and guests of every age."
        media={OCC_CIVIL}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
      />

      <SplitFeature
        eyebrow="Religious ceremonies & festivals"
        title="Space to gather, and to observe."
        // TODO: confirm copy
        body="From intimate religious ceremonies to large cultural festivals, the estate scales to the moment with privacy and care."
        media={OCC_FAITH}
        ratio="4 / 3"
      />

      <SpecList
        eyebrow="Accommodated with care"
        title="Everything your tradition needs."
        // TODO: confirm copy
        features={[
          "Partitionable spaces for men & women",
          "Bring your own caterer · no corkage",
          "Capacity from 30 to 1,000 guests",
          "Mandap, stage & décor partners",
          "Full air conditioning & heating",
          "Built-in PA & cordless microphone",
          "Exclusive use of the grounds",
          "Ample free parking",
        ]}
        tone="ink"
      />

      <CtaBand
        title="Tell us about your celebration."
        // TODO: confirm copy
        blurb="Whatever the faith or tradition, our team will help you plan it with care."
      />
    </>
  );
}
