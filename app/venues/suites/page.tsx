import VenueGallery from "@/components/sections/VenueGallery";
import { CHIGWELL_HALL_GALLERY } from "@/lib/gallery-venues";
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
          { name: "Chigwell Hall", path: "/venues/suites" },
        ])}
      />
      <PageHero
        eyebrow="The spaces · IV"
        title={"Chigwell\nHall."}
        intro="Beautifully appointed indoor suites offering an elegant setting for private celebrations and events."
        media={SUITES_IMG.banquetingHall}
      />

      <VenueGallery title="Inside Chigwell Hall." items={CHIGWELL_HALL_GALLERY} />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="max-w-4xl">
            <Eyebrow>Indoor celebrations at Chigwell Hall</Eyebrow>
            <RevealText as="h2" className="mt-7 display-lg">
              {"Stylish spaces for every occasion."}
            </RevealText>
            <Reveal>
              <p className="lead mt-8 max-w-2xl text-mist">
                Set within the characterful surroundings of this Grade II listed
                building, the Banqueting and Belmont Suites offer two distinctive
                spaces for indoor celebrations, from intimate occasions to larger
                private events.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <SplitFeature
        title="The Banqueting Suite"
        titleNote="Up to 160 guests"
        body={[
          "A spacious and welcoming setting for larger celebrations, the Banqueting Suite accommodates up to 160 guests.",
          "Complete with its own fitted bar, generous dancefloor and adjustable ambient lighting, the space can be tailored to suit a variety of occasions and event styles.",
        ]}
        media={SUITES_IMG.banqueting}
        ratio="3 / 2"
      />

      <SplitFeature
        title="The Belmont Suite"
        titleNote="Up to 70 guests"
        body={[
          "Located on the first floor, the Belmont Suite offers an intimate and sophisticated setting for up to 70 guests, complete with a private bar and spacious dancefloor.",
          "Guests also have access to a private balcony overlooking the London skyline, providing an additional space to relax and enjoy the evening.",
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
