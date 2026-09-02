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
    "Explore our Essex marquee venues: the Mega Marquee (250–1,000), the Mini Marquee (30–200), the Secret Garden and indoor suites at Chigwell Hall.",
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
        eyebrow="Our Venues"
        title={"Two distinctive marquees.\nOne remarkable setting."}
        intro="From intimate celebrations to spectacular events for up to 1,000 guests, discover our venues within the grounds of Chigwell Hall."
        media={SPACES_HERO}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>Choose Your Venue</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              {"A space for every scale\nof celebration."}
            </RevealText>
            <Reveal>
              <p className="lead mt-8 max-w-2xl text-mist">
                {"Whether you're planning a wedding, engagement, birthday, cultural celebration or corporate event, our venues provide the flexibility to create an occasion around your requirements."}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="I · 250 – 1,000 guests"
        title="The Mega Marquee"
        body={[
          "An impressive large-capacity venue with high ceilings, neutral interiors and a generous open-plan layout.",
          "Designed for large weddings, cultural celebrations, corporate events and major private functions.",
        ]}
        media={SPACE_MEGA_FEATURE}
        ratio="4 / 3"
        link={{ href: "/venues/mega-marquee", label: "Explore the Mega Marquee" }}
      />

      <SplitFeature
        eyebrow="II · Up to 200 guests"
        title="The Mini Marquee"
        body={[
          "An elegant and light-filled space featuring natural light, air conditioning and a signature white starlit ceiling.",
          "Ideal for weddings, engagements, anniversaries, birthdays and more intimate celebrations.",
        ]}
        media={SPACE_MINI_FEATURE}
        ratio="4 / 3"
        reverse
        tone="bone-dim"
        link={{ href: "/venues/mini-marquee", label: "Explore the Mini Marquee" }}
      />

      <SplitFeature
        eyebrow="III · Outdoor Setting"
        title="The Secret Garden"
        body={[
          "A secluded garden adjoining the Mini Marquee, featuring landscaped lawns and a central fountain.",
          "Available for selected ceremonies, welcome drinks, canapés and photography depending on your booking.",
        ]}
        media={SPACE_GARDEN_FEATURE}
        ratio="4 / 3"
        link={{ href: "/venues/secret-garden", label: "Explore the Secret Garden" }}
      />

      <CtaBand
        title="Not sure which venue is right for you?"
        blurb="Tell us about your occasion, guest numbers and preferred date and our events team will help you find the most suitable space."
        secondary={{ href: "/gallery", label: "Explore Our Gallery" }}
      />
    </>
  );
}
