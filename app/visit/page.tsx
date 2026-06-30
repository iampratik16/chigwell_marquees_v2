import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import AnimatedLink from "@/components/ui/AnimatedLink";
import EnquiryForm from "@/components/site/EnquiryForm";
import Journey from "@/components/sections/home/Journey";
import { SITE, whatsappLink } from "@/lib/site";
import WhatsAppGlyph from "@/components/ui/WhatsAppGlyph";
import { ESTATE } from "@/lib/media";

export const metadata = pageMeta({
  title: "Visit Our Essex Marquee Venue | The Chigwell Marquees",
  description:
    "Visit The Chigwell Marquees in Chigwell, Essex — 40 minutes from London, near the M25 and Chigwell Station, with 600 free parking spaces. Enquire about your date.",
  path: "/visit",
  imageAlt: "The approach to The Chigwell Marquees in Chigwell, Essex",
});

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit & enquire"
        title={"Come and see\nthe estate."}
        intro="Forty minutes from Central London, fifteen from the M25, and five from the Central Line, with six hundred free parking spaces waiting."
        media={ESTATE}
        size="md"
      />

      {/* Enquiry */}
      <Section id="enquire" tone="bone-dim" spacing="lg">
        <div className="container-luxe grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Begin your enquiry</Eyebrow>
            <RevealText as="h2" className="mt-6 display-md">
              {"Tell us about\nyour occasion."}
            </RevealText>
            <Reveal>
              <p className="mt-6 text-mist">
                Share a few details and our events team will be in touch to talk
                dates, spaces and everything that makes your day yours.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-sm text-mist">
                Prefer to talk? Call{" "}
                <a href={SITE.phoneHref} className="text-ink underline">
                  {SITE.phone}
                </a>
                .
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <EnquiryForm />
          </div>
        </div>
      </Section>

      {/* Location + map */}
      <Section tone="bone" spacing="md">
        <div className="container-luxe grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <Eyebrow>Find us</Eyebrow>
            <address className="mt-6 not-italic font-display text-3xl leading-tight md:text-4xl">
              {SITE.address.line1}
              <br />
              {SITE.address.city}, {SITE.address.county}
              <br />
              {SITE.address.postcode}
            </address>

            <div className="mt-10 flex flex-col gap-3">
              <a href={SITE.phoneHref} className="font-display text-2xl hover:text-botanical">
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="text-ink/80 hover:text-botanical">
                {SITE.email}
              </a>
              <a
                href={whatsappLink(false)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message us on WhatsApp at ${SITE.whatsapp.display}`}
                className="inline-flex items-center gap-2 text-ink/80 hover:text-botanical"
              >
                <WhatsAppGlyph className="h-4 w-4" />
                {SITE.whatsapp.display}
              </a>
              <div className="mt-2">
                <AnimatedLink href={SITE.address.maps} arrow cursorLabel="Map">
                  Get directions
                </AnimatedLink>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-bone-dim">
              <iframe
                title="Map to The Chigwell Marquees"
                src="https://maps.google.com/maps?q=The%20Chigwell%20Marquees%20159%20High%20Road%20Chigwell%20IG7%206BD&z=14&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.25] contrast-[1.05]"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Travel & location — relocated from the homepage */}
      <Journey />
    </>
  );
}
