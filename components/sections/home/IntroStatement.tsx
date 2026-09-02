import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import AnimatedLink from "@/components/ui/AnimatedLink";
import { ESTATE } from "@/lib/media";

export default function IntroStatement() {
  return (
    <Section tone="bone" spacing="lg" className="overflow-hidden">
      <div className="container-luxe">
        <div className="max-w-5xl">
          <Eyebrow>The Chigwell Marquees</Eyebrow>
          <RevealText as="h2" className="mt-8 display-lg">
            {"Weddings and events set within 42 acres\nof beautiful grounds at Chigwell Hall"}
          </RevealText>
        </div>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <RevealImage
              media={ESTATE}
              ratio="16 / 10"
              sizes="(max-width: 768px) 100vw, 58vw"
              interactive
              cursorLabel="The grounds"
            />
          </div>

          <div className="md:col-span-5 md:pb-4">
            <Reveal>
              <p className="lead text-ink/85">
                Set within the grounds of the Grade II listed Chigwell Hall, The
                Chigwell Marquees offers two distinctive venues for weddings,
                celebrations and events.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-mist">
                From intimate occasions to spectacular celebrations for up to
                1,000 guests, our venues provide the flexibility to create an
                event entirely around you.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8">
                <AnimatedLink href="/the-estate" arrow cursorLabel="Discover">
                  Discover Chigwell Hall &amp; Grounds
                </AnimatedLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
