import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import StatsBand from "@/components/sections/home/StatsBand";
import CtaBand from "@/components/site/CtaBand";
import JsonLd from "@/components/site/JsonLd";
import Faqs from "@/components/site/Faqs";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import { faqPage } from "@/lib/structured-data";
import { FAQS } from "@/lib/site";
import { ESTATE_IMG, HALL_IMG, VIDEO, POSTER } from "@/lib/media.real";

export const metadata = pageMeta({
  title: "Chigwell Hall & Grounds, Essex | The Chigwell Marquees",
  description:
    "Discover Chigwell Hall — a Grade II listed reception venue set in 42 acres of Essex countryside, home to two luxury marquees, the Secret Garden and our event FAQs.",
  path: "/the-estate",
  imageAlt: "Chigwell Hall, the Grade II listed manor at the heart of the estate",
});

export default function EstatePage() {
  return (
    <>
      <JsonLd data={faqPage(FAQS)} />
      <PageHero
        eyebrow="Chigwell Hall & Grounds"
        title={"42 acres in the\nheart of Chigwell."}
        intro="A Grade II listed building, two distinctive marquee venues and the Secret Garden, all surrounded by 42 acres of beautiful grounds."
        media={ESTATE_IMG.hall}
        video={VIDEO.aboutHero}
        poster={POSTER.aboutHero}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <Eyebrow>The Setting</Eyebrow>
              <RevealText as="h2" className="mt-7 display-lg">
                {"Countryside surroundings,\nclose to London."}
              </RevealText>
              <Reveal>
                <p className="lead mt-8 text-mist">
                  The Chigwell Marquees is located within the beautiful grounds of
                  Chigwell Hall in Chigwell, Essex. Surrounded by 42 acres, the
                  venue offers a peaceful setting for weddings and events while
                  remaining within easy reach of Central London and major
                  transport links.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-6">
              <RevealImage
                media={HALL_IMG.escape}
                ratio="3 / 2"
                sizes="(max-width: 768px) 100vw, 50vw"
                interactive
                cursorLabel="View"
                className="rounded-[1.25rem]"
              />
            </div>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="Chigwell Hall"
        title={"A Grade II listed landmark\nat the heart of the grounds."}
        body={[
          "Built in 1881, Chigwell Hall is a magnificent Grade II listed building surrounded by 42 acres of grounds.",
          "Its traditional architecture, sweeping staircase and period features provide a beautiful backdrop for weddings, events and photography.",
          "Inside, Chigwell Hall also offers elegant function spaces suitable for selected celebrations and occasions.",
        ]}
        media={ESTATE_IMG.hall}
        ratio="3 / 2"
        tone="bone-dim"
      />

      {/* Inside the Hall — function suites */}
      <Section tone="bone" spacing="md">
        <div className="container-luxe">
          <Eyebrow>Inside the Hall</Eyebrow>
          <RevealText as="h2" className="mt-5 display-md max-w-3xl">
            Elegant function spaces for memorable occasions.
          </RevealText>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <RevealImage media={HALL_IMG.room1} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" />
            <RevealImage media={HALL_IMG.room2} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" delay={0.08} />
            <RevealImage media={HALL_IMG.room3} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" delay={0.16} />
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="The grounds"
        title="42 acres to discover."
        body={[
          "From Chigwell Hall and the Secret Garden to landscaped lawns, mature trees, the waterfall and bridge, the surrounding grounds provide a beautiful setting for weddings and photography.",
          "Access to different areas of the grounds is subject to your venue booking and agreed timings.",
        ]}
        media={ESTATE_IMG.avenue}
        ratio="3 / 2"
        reverse
        tone="bone-dim"
      />

      <SplitFeature
        eyebrow="The Secret Garden"
        title="A beautiful outdoor setting."
        body={[
          "Located alongside the Mini Marquee, the Secret Garden features landscaped lawns, a central fountain and a secluded setting for selected ceremonies, welcome drinks, canapés and wedding photography.",
          "Access and use depend on the arrangements included within your booking.",
        ]}
        media={ESTATE_IMG.gazebo}
        ratio="3 / 2"
        link={{ href: "/venues/secret-garden", label: "Explore the Secret Garden" }}
      />

      <StatsBand />

      {/* Outdoor gallery strip */}
      <Section tone="bone" spacing="md">
        <div className="container-luxe">
          <Eyebrow>Across the grounds</Eyebrow>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <RevealImage media={ESTATE_IMG.avenue} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" />
            <RevealImage media={ESTATE_IMG.gazebo} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" delay={0.08} />
            <RevealImage media={ESTATE_IMG.hall} ratio="4 / 5" sizes="33vw" interactive cursorLabel="View" delay={0.16} />
          </div>
        </div>
      </Section>

      <SpecList
        eyebrow="Perfect For"
        title="One location. Many occasions."
        features={[
          "Weddings & receptions",
          "Civil ceremonies",
          "Birthdays",
          "Bar & Bat Mitzvahs",
          "Anniversaries & engagements",
          "Cultural & religious events",
          "Corporate events & conferences",
          "Private celebrations",
        ]}
        tone="botanical"
      />

      {/* FAQs */}
      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Eyebrow>Good to know</Eyebrow>
              <h2 className="mt-6 display-md">Questions, answered.</h2>
            </div>
            <div className="md:col-span-8">
              <Faqs />
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Experience the scale for yourself."
        blurb="Forty-two acres and multiple event spaces are difficult to appreciate from photographs alone. Arrange a viewing and discover the venues and grounds in person."
        secondary={{ href: "/gallery", label: "Explore The Chigwell Marquees" }}
        tone="ink"
      />
    </>
  );
}
