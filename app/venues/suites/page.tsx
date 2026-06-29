import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import CtaBand from "@/components/site/CtaBand";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import { SUITES_IMG } from "@/lib/media.real";

export const metadata = pageMeta({
  title: "Banqueting & Belmont Suites, Chigwell | The Chigwell Marquees",
  description:
    "The Belmont and Banqueting Suites at Chigwell Hall — elegant indoor rooms licensed for civil ceremonies, dining and meetings beside our Essex marquees.",
  path: "/venues/suites",
  imageAlt: "An elegant indoor suite at Chigwell Hall set for a civil ceremony",
});

export default function SuitesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Venues", path: "/venues" },
          { name: "The Suites", path: "/venues/suites" },
        ])}
      />
      <PageHero
        eyebrow="The spaces · IV"
        title={"The\nSuites."}
        intro="Beautifully appointed indoor suites within Chigwell Hall, made for stylish celebrations."
        media={SUITES_IMG.banquetingHall}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>Indoor celebrations at Chigwell Hall</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              {"Stylish celebrations,\nwithin a stately home."}
            </RevealText>
            <Reveal>
              <p className="lead mt-8 max-w-2xl text-mist">
                Located within the elegant surroundings of Chigwell Hall, our
                beautifully appointed suites provide the perfect setting for
                stylish indoor celebrations.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="Up to 160 guests"
        title={"The Banqueting\nSuite."}
        body={[
          "The Banqueting Suite accommodates up to 160 guests and offers a spacious yet welcoming atmosphere ideal for larger private events.",
          "Complete with its own fitted bar, generous dancefloor and adjustable ambient lighting, the suite provides everything needed for an unforgettable celebration within a stunning stately home setting.",
        ]}
        media={SUITES_IMG.banqueting}
        ratio="3 / 2"
      />

      <SplitFeature
        eyebrow="Up to 70 guests"
        title={"The Belmont\nSuite."}
        body={[
          "The Belmont Suite offers a sophisticated space for up to 70 guests. Situated on the first floor of Chigwell Hall, the suite features a private bar and spacious dancefloor.",
          "It also has access to a charming balcony overlooking the London skyline — the perfect place for guests to relax and enjoy the atmosphere throughout the evening.",
        ]}
        media={SUITES_IMG.belmont}
        ratio="3 / 2"
        reverse
        tone="bone-dim"
      />

      <SpecList
        eyebrow="The detail"
        title="Two suites, every occasion."
        specs={[
          { k: "Banqueting Suite", v: "Up to 160 guests · ground floor" },
          { k: "Belmont Suite", v: "Up to 70 guests · first floor" },
          { k: "Both feature", v: "Private bar & spacious dancefloor" },
          { k: "Belmont balcony", v: "Overlooking the London skyline" },
        ]}
        tone="ink"
      />

      {/* Inside the suites */}
      <Section tone="bone" spacing="md">
        <div className="container-luxe">
          <Eyebrow>Inside the suites</Eyebrow>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <RevealImage media={SUITES_IMG.banquetingHall} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" />
            <RevealImage media={SUITES_IMG.banquetingBar} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" delay={0.08} className="md:mt-10" />
            <RevealImage media={SUITES_IMG.belmont} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" delay={0.16} />
          </div>
        </div>
      </Section>

      <CtaBand
        title="An elegant indoor celebration awaits."
        blurb="Tell us your date and guest count, and our events team will show you the Banqueting and Belmont Suites and help you find the perfect fit."
      />
    </>
  );
}
