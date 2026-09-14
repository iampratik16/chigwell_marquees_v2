import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
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
                  Surrounded by 42 acres of open grounds, The Chigwell Marquees
                  offers a peaceful and private setting for weddings and events,
                  with Central London and major transport links within easy
                  reach.
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
        tone="navy"
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
    </>
  );
}
