import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbList } from "@/lib/structured-data";
import SplitFeature from "@/components/site/SplitFeature";
import SpecList from "@/components/site/SpecList";
import CtaBand from "@/components/site/CtaBand";
import GalleryBand from "@/components/site/GalleryBand";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import { SECRET_IMG, ESTATE_IMG, VIDEO, POSTER } from "@/lib/media.real";

export const metadata = pageMeta({
  title: "Secret Garden Wedding Venue, Essex | The Chigwell Marquees",
  description:
    "The Secret Garden — a secluded lawn with a central fountain, licensed for outdoor civil ceremonies and welcome drinks for up to 150 guests, in Chigwell, Essex.",
  path: "/venues/secret-garden",
  imageAlt: "The Secret Garden lawn and central fountain set for an outdoor ceremony",
});

export default function SecretGardenPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Venues", path: "/venues" },
          { name: "The Secret Garden", path: "/venues/secret-garden" },
        ])}
      />
      <PageHero
        eyebrow="A beautiful outdoor setting."
        title={"The Secret\nGarden."}
        intro="A secluded lawn, a classic fountain, and the soft gold of a setting sun."
        media={SECRET_IMG.blossom}
        video={VIDEO.secretGarden}
        poster={POSTER.secretGarden}
      />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Eyebrow>Secret Garden &amp; Waterfall</Eyebrow>
              <RevealText as="h2" className="mt-7 display-lg">
                {"A peaceful setting for memorable moments."}
              </RevealText>
              <div className="mt-8 space-y-6">
                <Reveal>
                  <p className="lead text-mist">
                    Located alongside the Mini Marquee, the Secret Garden
                    features landscaped lawns, a central fountain and a secluded
                    outdoor setting.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-mist">
                    Depending on your booking, it can provide a beautiful
                    backdrop for selected wedding ceremonies, welcome drinks,
                    canapés and photography.
                  </p>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="text-mist">
                    The surrounding grounds also provide additional locations for
                    couple photography, including the waterfall, bridge and
                    selected areas around Chigwell Hall.
                  </p>
                </Reveal>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <RevealImage
                  media={SECRET_IMG.waterfall}
                  ratio="4 / 5"
                  sizes="(max-width: 768px) 100vw, 42vw"
                  interactive
                  cursorLabel="View"
                  className="rounded-[1.25rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <SplitFeature
        eyebrow="The grounds"
        title="A beautiful backdrop for your photographs."
        body={[
          "The grounds surrounding Chigwell Hall provide a variety of distinctive locations for wedding photography, from landscaped lawns and mature trees to the historic architecture of Chigwell Hall.",
          "Access to the grounds is subject to your booking and agreed photography timings.",
        ]}
        media={ESTATE_IMG.gazebo}
        ratio="3 / 2"
      />

      <SplitFeature
        eyebrow="Throughout the Year"
        title="A setting that changes with the seasons."
        body="From spring blossom and summer greenery to the warm colours of autumn, the grounds provide an ever-changing backdrop for weddings and celebrations throughout the year."
        media={SECRET_IMG.blossom}
        ratio="4 / 5"
        reverse
        tone="bone-dim"
      />

      <GalleryBand label="Explore the Gallery" tone="bone-dim" />

      <SpecList
        eyebrow="Secret Garden Details"
        specs={[
          { k: "Access", v: "Subject to your venue booking" },
          { k: "Setting", v: "Landscaped lawn and central fountain" },
          {
            k: "Available For",
            v: "Selected civil ceremonies · welcome drinks · canapés · wedding photography",
          },
        ]}
        tone="bone-dim"
      />

      <SpecList
        eyebrow="Perfect For"
        features={[
          "Selected civil ceremonies",
          "Welcome drinks",
          "Canapés",
          "Wedding photography",
          "Couple videography",
          "Quiet moments away from the main celebration",
        ]}
        tone="botanical"
      />

      <CtaBand
        title="Discover the Secret Garden."
        blurb="Experience the Secret Garden and surrounding grounds as part of your venue viewing."
        tone="ink"
        secondary={null}
      />
    </>
  );
}
