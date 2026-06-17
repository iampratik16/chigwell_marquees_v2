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
    <Section tone={tone} spacing="md">
      <div className="container-luxe">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <RevealText as="h2" className="display-md text-bone">
              {title}
            </RevealText>
            {blurb && (
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-xl text-bone/70">{blurb}</p>
              </Reveal>
            )}
          </div>
          <div className="md:col-span-5">
            <Reveal delay={0.15}>
              <div className="flex flex-wrap items-center gap-4 md:justify-end">
                <MagneticButton href={primary.href} variant="light" cursorLabel="Enquire">
                  {primary.label}
                </MagneticButton>
                {secondary && (
                  <MagneticButton href={secondary.href} variant="ghost" cursorLabel="Gallery">
                    {secondary.label}
                  </MagneticButton>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
