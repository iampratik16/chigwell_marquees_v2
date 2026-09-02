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
import { OCC_CORPORATE, CORP_GALA, CORP_CONFERENCE, CORP_RECEPTION } from "@/lib/media";
import { VIDEO, POSTER } from "@/lib/media.real";

export const metadata = pageMeta({
  title: "Corporate Event Venue near London | The Chigwell Marquees",
  description:
    "A corporate event venue near London for conferences, galas, product launches and private functions of up to 1,000 guests, at Chigwell Hall in Essex.",
  path: "/occasions/corporate",
  imageAlt: "A corporate gala dinner staged in the Mega Marquee",
});

export default function CorporatePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceNode({
            name: "Corporate Event Venue Hire",
            serviceType: "Corporate event venue hire",
            description:
              "Corporate venue hire in Essex, conferences, galas, product launches, team-building, festivals and company celebrations, with a full PA and 42 acres.",
            path: "/occasions/corporate",
          }),
          breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Occasions", path: "/occasions" },
            { name: "Corporate", path: "/occasions/corporate" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Occasions · Corporate"
        title="Corporate events in a distinctive setting."
        intro="Flexible event spaces in Chigwell, Essex for conferences, award ceremonies, launches, company celebrations and large-scale events."
        media={OCC_CORPORATE}
        video={VIDEO.corporateHero}
        poster={POSTER.corporateHero}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>Corporate Events</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              Space to think bigger.
            </RevealText>
            <div className="mt-8 max-w-2xl space-y-5">
              <Reveal>
                <p className="lead text-mist">
                  Located within the 42-acre grounds of Chigwell Hall, The
                  Chigwell Marquees provides flexible spaces for conferences,
                  exhibitions, award ceremonies, gala dinners, launches and
                  company celebrations.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-mist">
                  With capacities of up to 1,000 guests, extensive complimentary
                  parking and convenient access from London and major road
                  networks, the venue combines practicality with an impressive
                  setting.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="Conferences & Galas"
        title="From presentations to black-tie events."
        body={[
          "Our marquee venues can be configured for conferences, presentations, award ceremonies, formal dinners and evening entertainment.",
          "Built-in sound facilities and flexible layouts allow your production and AV teams to create the setup required for your event.",
        ]}
        media={CORP_GALA}
        ratio="4 / 3"
      />

      <SplitFeature
        eyebrow="Company Celebrations"
        title="Give your team something different."
        body="From Christmas parties and company anniversaries to staff celebrations and formal dinners, our venues provide a distinctive alternative to traditional hotels and conference centres."
        media={CORP_RECEPTION}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
      />

      <SplitFeature
        eyebrow="Large-Scale Events"
        title="Space for ambitious ideas."
        body="With the Mega Marquee accommodating up to 1,000 guests and extensive surrounding grounds, The Chigwell Marquees can accommodate a wide range of larger corporate briefs, subject to individual event requirements and approval."
        media={CORP_CONFERENCE}
        ratio="4 / 3"
      />

      <SpecList
        eyebrow="Facilities"
        title="Flexible facilities for your event."
        features={[
          "Flexible room layouts",
          "Company branding opportunities",
          "Air conditioning and heating",
          "Catering preparation facilities",
          "Built-in sound system",
          "Cordless microphone",
          "Stage area",
          "Extensive complimentary parking",
          "Event security and operational staff",
        ]}
        tone="ink"
      />

      <CtaBand
        title="Tell us about your corporate event."
        blurb="Send us your proposed date, guest numbers and event brief and our team will discuss the most suitable venue and setup."
        primary={{ href: "/visit#enquire", label: "Make a Corporate Enquiry" }}
        secondary={{ href: "/gallery", label: "Explore the Gallery" }}
      />
    </>
  );
}
