import type { ReactNode } from "react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import GoldButton from "@/components/ui/GoldButton";

/**
 * Provision for Google Reviews. Two ways to show live reviews inline:
 *   1) Pass a third-party widget (Elfsight / Trustindex) embed as `embed`, or
 *   2) Wire the Google Places API and render the result into `embed`.
 * Set `reviewsUrl` to the Place-ID review link once you have it.
 * Until configured, this shows a tasteful prompt that links straight to the
 * venue's Google reviews — useful today, upgradeable later.
 *
 * Reusable: drop <GoogleReviews /> on the gallery, contact or home page.
 */
type Props = {
  /** Live reviews widget/markup. When omitted, the link-out provision shows. */
  embed?: ReactNode;
  /** "Read our reviews" target. Replace with the Place-ID review link. */
  reviewsUrl?: string;
  tone?: "bone" | "bone-dim";
};

const DEFAULT_REVIEWS_URL = "https://www.google.com/search?q=The+Chigwell+Marquees+reviews";

export default function GoogleReviews({
  embed,
  reviewsUrl = DEFAULT_REVIEWS_URL,
  tone = "bone-dim",
}: Props) {
  return (
    <Section tone={tone} spacing="md">
      <div className="container-luxe">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow tone="champagne">Reviews</Eyebrow>
          <RevealText as="h2" className="display-md">
            Loved by the couples and families we host.
          </RevealText>
          <div className="text-lg tracking-[0.3em] text-champagne" aria-label="Rated five stars on Google">
            ★★★★★
          </div>

          {embed ? (
            <div className="mt-2 w-full">{embed}</div>
          ) : (
            <>
              <p className="text-mist">
                Read what our clients say on Google — real reviews from weddings,
                celebrations and events across the estate.
              </p>
              <GoldButton href={reviewsUrl} cursorLabel="Reviews">
                Read our Google reviews
              </GoldButton>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
