import Starfield from "@/components/effects/Starfield";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";

/** Dark, atmospheric panel that switches on a fibre-optic ceiling. */
export default function StarlitCeiling() {
  return (
    <section className="relative overflow-hidden bg-ink-deep text-bone">
      <Starfield count={170} seed={23} />
      <div className="container-luxe relative py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="champagne" className="justify-center before:hidden">
            The signature
          </Eyebrow>
          <RevealText as="h2" className="mt-7 display-xl">
            {"A ceiling full\nof stars."}
          </RevealText>
          <Reveal delay={0.1}>
            <p className="lead mx-auto mt-8 max-w-xl text-bone/75">
              A white-canopy starlit ceiling threaded with fibre-optic light,               it switches on as the evening falls, turning the Mini Marquee into
              something quietly magical above your guests.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
