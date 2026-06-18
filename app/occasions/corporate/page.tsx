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
import { OCC_CORPORATE, OCC_CORPORATE_2, img } from "@/lib/media";

export const metadata = pageMeta({
  title: "Corporate Event Venue near London | The Chigwell Marquees",
  description:
    "A corporate event venue near London for conferences, galas, product launches and private functions of up to 1,000 guests, on the Chigwell Hall estate in Essex.",
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
              "Corporate venue hire in Essex, conferences, galas, product launches, team-building, festivals and office Christmas parties, with a full PA, big screens and 42 acres.",
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
        title={"Business, at an\nincredible location."}
        intro="A fully built-in PA, dozens of big screens, and forty-two acres to do exactly what you want with."
        media={OCC_CORPORATE}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>Corporate events in Essex</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              {"Room for fifteen hundred, \nand for breakout, too."}
            </RevealText>
            <Reveal>
              <p className="lead mt-8 max-w-2xl text-mist">
                As a corporate event venue near London, we divide the estate
                into rooms and spaces for breakouts and exhibitions, with a full
                catering team for corporate dinners. Lots of companies who use
                our conference service make repeat bookings, we really are the
                perfect venue.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="Conferences & galas"
        title="From keynote to black-tie."
        body={[
          "A built-in PA system and cordless microphone, dozens of large screens, and the space to host high-end corporate dinners that make you and your clients feel extra special.",
          "Combine a dinner with a glitzy after-party, an awards ceremony or a guest speaker, all under one roof.",
        ]}
        media={OCC_CORPORATE_2}
        ratio="4 / 3"
      />

      <SplitFeature
        eyebrow="Office Christmas parties"
        title={"Why settle for the\nlocal pub?"}
        body={[
          "From first-class catering to pop-up casinos, our office Christmas party venue can provide all the entertainment you need to reward your team.",
          "Why settle for a boring Christmas meal when you can have fun across 42 acres at Chigwell Marquees?",
        ]}
        media={img(
          "christmas-party-venue-essex-chigwell-marquees.jpg",
          "A festive Christmas party set within the marquee",
        )}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
      />

      <SplitFeature
        eyebrow="Team building & festivals"
        title="Forty-two acres to play with."
        body={[
          "With capacity for over a thousand people and the full run of the estate, we're a leading location in the south-east for a great team-building day.",
          "A fully built-in PA and cordless microphone make us a natural home for festival venue hire and large-scale outdoor events, too.",
        ]}
        media={img("festival-venue-hire-essex-chigwell-marquees.jpg", "A festival-scale event across the estate")}
        ratio="4 / 3"
      />

      <SpecList
        eyebrow="Facilities"
        title="Everything your event needs."
        features={[
          "Wi-Fi throughout",
          "Company branding",
          "Flat-screen TVs for presentations",
          "Full air conditioning & heating",
          "In-house catering & alcohol available",
          "Complimentary tea & coffee",
          "Built-in PA & cordless microphone",
          "Ample free parking",
        ]}
        tone="ink"
      />

      <CtaBand
        title="Whatever your corporate need, let's talk."
        blurb="Conferences, launches, away-days or the Christmas party of the year. Tell us the brief."
        primary={{ href: "/visit#enquire", label: "Enquire for business" }}
      />
    </>
  );
}
