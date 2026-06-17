import Section from "@/components/ui/Section";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

type Props = {
  title: string;
  blurb?: string;
  primary?: { href: string; label: string };
  /** Defaults to a gallery link; pass `null` to omit (e.g. on the gallery page). */
  secondary?: { href: string; label: string } | null;
  tone?: "botanical" | "ink";
};

/** Mid-page call-to-action band. */
export default function CtaBand({
  title,
  blurb,
  primary = { href: "/visit#enquire", label: "Begin an enquiry" },
  secondary = { href: "/gallery", label: "View the gallery" },
  tone = "botanical",
}: Props) {
  return (
    <>
      {/* Light gallery band — a premium "see more" prompt before the enquiry CTA */}
      {secondary && (
        <Section tone="bone" spacing="sm">
          <div className="container-luxe flex flex-col items-center gap-7 border-t border-line pt-12 text-center md:pt-14">
            <RevealText as="p" className="font-display text-2xl text-ink md:text-[1.9rem]">
              See more of the estate.
            </RevealText>
            <Reveal delay={0.1}>
              <MagneticButton href={secondary.href} variant="outline" cursorLabel="Gallery">
                {secondary.label}
              </MagneticButton>
            </Reveal>
          </div>
        </Section>
      )}

      <Section tone={tone} spacing="md">
        <div className="container-luxe">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <RevealText as="h2" className="display-md text-bone">
                {title}
              </RevealText>
              {blurb && (
                <Reveal delay={0.1}>
                  <p className="mt-5 max-w-xl text-bone/70">{blurb}</p>
                </Reveal>
              )}
            </div>
            <div className="md:col-span-4 md:flex md:justify-end">
              <Reveal delay={0.15}>
                <MagneticButton href={primary.href} variant="light" cursorLabel="Enquire">
                  {primary.label}
                </MagneticButton>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
