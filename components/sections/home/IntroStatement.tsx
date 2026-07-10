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
          <Eyebrow>The estate</Eyebrow>
          <RevealText as="h2" className="mt-8 display-lg">
            {"A luxury marquee wedding venue in Essex, \na blank canvas of ivory and green set\nwithin forty-two acres of countryside."}
          </RevealText>
        </div>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <RevealImage
              media={ESTATE}
              ratio="16 / 10"
              sizes="(max-width: 768px) 100vw, 58vw"
              priority
              interactive
              cursorLabel="The estate"
            />
          </div>

          <div className="md:col-span-5 md:pb-4">
            <Reveal>
              <p className="lead text-ink/85">
                Set within the stunning 42-acre grounds of Chigwell Hall, a Grade
                II listed manor, we offer two unique and luxurious venues for your
                special event.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-mist">
                From 30 to 1,000 guests — weddings, parties, civil ceremonies and
                corporate events, all handled with ease by our experienced team.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8">
                <AnimatedLink href="/the-estate" arrow cursorLabel="Discover">
                  Discover the estate
                </AnimatedLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
