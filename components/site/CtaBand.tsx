import Section from "@/components/ui/Section";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import GoldButton from "@/components/ui/GoldButton";
import GalleryBand from "@/components/site/GalleryBand";

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
  primary = { href: "/visit#enquire", label: "Book a Viewing" },
  secondary = { href: "/gallery", label: "View the gallery" },
  tone = "botanical",
}: Props) {
  return (
    <>
      {/* Light gallery band — a premium "see more" prompt before the enquiry CTA */}
      {secondary && <GalleryBand href={secondary.href} label={secondary.label} />}

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
                <GoldButton href={primary.href} cursorLabel="Book">
                  {primary.label}
                </GoldButton>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
