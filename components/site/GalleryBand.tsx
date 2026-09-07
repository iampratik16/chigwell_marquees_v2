import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

type Props = {
  href?: string;
  label?: string;
  tone?: "bone" | "bone-dim";
};

/** A premium "see more" prompt that links through to the gallery. */
export default function GalleryBand({
  href = "/gallery",
  label = "View the gallery",
  tone = "bone",
}: Props) {
  return (
    <Section tone={tone} spacing="sm">
      <div className="container-luxe flex justify-center border-t border-line pt-12 md:pt-14">
        <Reveal delay={0.1}>
          <MagneticButton href={href} variant="outline" cursorLabel="Gallery">
            {label}
          </MagneticButton>
        </Reveal>
      </div>
    </Section>
  );
}
