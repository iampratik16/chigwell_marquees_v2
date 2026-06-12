import type { Metadata } from "next";
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
import RevealImage from "@/components/ui/RevealImage";
import { OCC_ASIAN, SPACE_MEGA, SPACE_MINI } from "@/lib/media";
import { REAL, VIDEO, POSTER, ASIAN_IMG } from "@/lib/media.real";

export const metadata: Metadata = {
  alternates: { canonical: "/occasions/weddings" },
  title: { absolute: "Wedding Venue in Essex | The Chigwell Marquees" },
  description:
    "Wedding venue hire in Essex, two magnificent marquees for intimate and grand weddings, including traditional Asian weddings, with a starlit ceiling and the Secret Garden.",
};

export default function WeddingsPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceNode({
            name: "Wedding Venue Hire",
            serviceType: "Wedding venue hire",
            description:
              "Wedding venue hire in Essex, two magnificent marquees for intimate and grand weddings, including traditional Asian weddings, with a starlit ceiling and the Secret Garden.",
            path: "/occasions/weddings",
          }),
          breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Occasions", path: "/occasions" },
            { name: "Weddings", path: "/occasions/weddings" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Occasions · Weddings"
        title={"Weddings\nin Essex."}
        intro="Choosing a venue for your special day is one of the most important decisions you'll make. Here, we offer two magnificent ones."
        media={REAL.ceremonyAisle}
        video={VIDEO.weddings}
        poster={POSTER.weddings}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>Your day, your way</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              {"An idyllic countryside backdrop\nyour guests will talk about\nfor years to come."}
            </RevealText>
            <Reveal>
              <p className="lead mt-8 max-w-2xl text-mist">
                Fully customisable, set against open Essex countryside, and only
                five minutes by car from Chigwell Underground on the Central Line
, with ample free parking for every guest.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="Intimate weddings"
        title="The Mini Marquee."
        body={[
          "Ideal for smaller weddings and seating up to 200, with an elegantly presented three-course meal followed by a celebration into the night, sound system, dance floor and bar.",
          "A starlit ceiling, air conditioning and access to the Bridal Suite and Secret Garden, where you and your guests can gather on the lawn around the fountain.",
        ]}
        media={SPACE_MINI}
        ratio="4 / 3"
        link={{ href: "/spaces/mini-marquee", label: "See the Mini Marquee" }}
      />

      <SplitFeature
        eyebrow="Grand weddings"
        title="The Mega Marquee."
        body={[
          "Grand and extravagant, suited to wedding hire for 300 to 1,000 guests. Relax in sumptuous surroundings for your sit-down meal, then a party they'll never forget.",
          "Partition off parts of the venue for a separate bar or lounge, with access to the Bridal Suite, the Secret Garden and a fully functional kitchen.",
        ]}
        media={SPACE_MEGA}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
        link={{ href: "/spaces/mega-marquee", label: "See the Mega Marquee" }}
      />

      <SplitFeature
        eyebrow="A leading Asian wedding venue"
        title={"Designed around\nevery tradition."}
        body={[
          "The Chigwell Marquees have quickly built a reputation as a leading Asian wedding venue for Essex and London, the Mega Marquee, in particular, for its scale and setting.",
          "Both marquees adapt to any group: partition the space should you require men and women to be seated separately. Our long-established relationships with caterers, décor companies, DJs, photographers and videographers, all experienced in Asian weddings, help create the most joyous celebration.",
        ]}
        media={OCC_ASIAN}
        ratio="4 / 3"
      />

      <Section tone="bone-dim" spacing="sm">
        <div className="container-luxe grid gap-5 md:grid-cols-2">
          <RevealImage media={ASIAN_IMG.pair1} ratio="4 / 5" sizes="(max-width:768px) 100vw, 50vw" interactive cursorLabel="View" className="rounded-2xl" />
          <RevealImage media={ASIAN_IMG.pair2} ratio="4 / 5" sizes="(max-width:768px) 100vw, 50vw" interactive cursorLabel="View" delay={0.08} className="rounded-2xl md:mt-12" />
        </div>
      </Section>

      <SpecList
        eyebrow="Good to know"
        specs={[
          { k: "Capacity", v: "30 – 1,000 guests across two marquees" },
          { k: "Ceremonies", v: "Civil, in the garden or Mini Marquee" },
          { k: "Catering", v: "Dry hire · bring your caterer · no corkage" },
          { k: "Getting here", v: "5 min from Chigwell (Central Line)" },
        ]}
        tone="ink"
      />

      <CtaBand
        title="Making all your dreams a reality for your very special day."
        blurb="Share your date and vision, our events team will take it from there."
        primary={{ href: "/visit#enquire", label: "Begin your wedding enquiry" }}
      />
    </>
  );
}
