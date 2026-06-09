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

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <RevealImage
              media={ESTATE}
              ratio="16 / 10"
              sizes="(max-width: 768px) 100vw, 58vw"
              interactive
              cursorLabel="The estate"
            />
          </div>

          <div className="md:col-span-5 md:pb-4">
            <Reveal>
              <p className="lead text-ink/85">
                Located in the grounds of Chigwell Hall, a Grade II listed manor
                set within 42 acres of countryside, we offer two unique and
                luxurious marquees.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-mist">
                From intimate gatherings of thirty to grand occasions of a
                thousand, every celebration is held end-to-end by an experienced
                events team, so the day unfolds exactly as you imagined it.
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
