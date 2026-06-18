import Section from "@/components/ui/Section";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

type Props = {
  href?: string;
  label?: string;
  title?: string;
  tone?: "bone" | "bone-dim";
};

/** A premium "see more" prompt that links through to the gallery. */
export default function GalleryBand({
  href = "/gallery",
  label = "View the gallery",
  title = "See more of the estate.",
  tone = "bone",
}: Props) {
  return (
    <Section tone={tone} spacing="sm">
      <div className="container-luxe flex flex-col items-center gap-7 border-t border-line pt-12 text-center md:pt-14">
        <RevealText as="p" className="font-display text-2xl text-ink md:text-[1.9rem]">
          {title}
        </RevealText>
        <Reveal delay={0.1}>
          <MagneticButton href={href} variant="outline" cursorLabel="Gallery">
            {label}
          </MagneticButton>
        </Reveal>
      </div>
    </Section>
  );
}
