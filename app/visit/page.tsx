import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import EnquiryForm from "@/components/site/EnquiryForm";
import GoogleReviewsSection from "@/components/site/GoogleReviewsSection";
import LocationMap from "@/components/site/LocationMap";
import { SITE } from "@/lib/site";
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
        eyebrow="Visit & Enquire"
        title="Come and experience The Chigwell Marquees."
        intro="Explore our venues and the beautiful 42-acre grounds of Chigwell Hall and discover which setting is right for your occasion."
        media={ESTATE}
        size="md"
      />

      {/* Enquiry */}
      <Section id="enquire" tone="bone-dim" spacing="lg">
        <div className="container-luxe grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Begin Your Enquiry</Eyebrow>
            <RevealText as="h2" className="mt-6 display-md">
              {"Tell us about\nyour occasion."}
            </RevealText>
            <Reveal>
              <p className="mt-6 text-mist">
                Share a few details and our events team will be in touch to
                discuss availability, venue options and your plans.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 border-t border-line pt-8 text-sm">
                <p className="text-mist">
                  Prefer to talk? Call{" "}
                  <a href={SITE.phoneHref} className="text-ink underline">
                    {SITE.phone}
                  </a>
                  .
                </p>

                <address className="mt-6 not-italic leading-relaxed text-mist">
                  <span className="block font-medium text-ink">{SITE.name}</span>
                  {SITE.address.venue}
                  <br />
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}
                  <br />
                  {SITE.address.county}
                  <br />
                  {SITE.address.postcode}
                </address>

                <dl className="mt-6 flex flex-col gap-2 text-mist">
                  <div className="flex flex-wrap gap-x-2">
                    <dt>Telephone:</dt>
                    <dd>
                      <a href={SITE.phoneHref} className="text-ink underline">
                        {SITE.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <dt>Email:</dt>
                    <dd>
                      <a href={`mailto:${SITE.email}`} className="text-ink underline">
                        {SITE.email}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <EnquiryForm />
          </div>
        </div>
      </Section>

      <GoogleReviewsSection />

      {/* Address, then the full-bleed map directly beneath it, blending into the footer */}
      <Section tone="bone" spacing="sm">
        <div className="container-luxe">
          <Eyebrow>Find us</Eyebrow>
          <address className="mt-6 not-italic font-display text-3xl leading-tight md:text-4xl">
            {SITE.address.line1}
            <br />
            {SITE.address.city}, {SITE.address.county}
            <br />
            {SITE.address.postcode}
          </address>
        </div>
      </Section>

      <LocationMap />
    </>
  );
}
