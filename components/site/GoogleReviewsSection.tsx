import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import GoldButton from "@/components/ui/GoldButton";
import GoogleGlyph from "@/components/ui/GoogleGlyph";
import GoogleReviews from "@/components/site/GoogleReviews";
import { getGoogleReviews } from "@/lib/google-reviews";

const FALLBACK_URL = "https://www.google.com/search?q=The+Chigwell+Marquees+reviews";

/**
 * Live Google reviews. When GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are set,
 * renders real review cards; otherwise falls back to the tasteful link-out band
 * (<GoogleReviews/>), so the page is always complete — configured or not.
 * Async server component: the fetch (and the key) stay on the server.
 */
export default async function GoogleReviewsSection({
  tone = "bone-dim",
}: {
  tone?: "bone" | "bone-dim";
}) {
  const { reviews, rating, total, reviewsUrl } = await getGoogleReviews();

  if (reviews.length === 0) {
    return <GoogleReviews tone={tone} reviewsUrl={reviewsUrl ?? FALLBACK_URL} />;
  }

  const url = reviewsUrl ?? FALLBACK_URL;

  return (
    <Section tone={tone} spacing="md">
      <div className="container-luxe">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow tone="champagne">Reviews</Eyebrow>
          <RevealText as="h2" className="mt-5 display-md">
            Loved by the couples and families we host.
          </RevealText>
          {rating != null && (
            <p className="mt-4 flex items-center justify-center gap-2 text-mist">
              <GoogleGlyph className="h-4 w-4 shrink-0" />
              <span className="text-champagne">★</span>
              <span className="font-medium text-ink">{rating.toFixed(1)}</span>
              {total != null && (
                <span>· {total.toLocaleString("en-GB")} Google reviews</span>
              )}
            </p>
          )}
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-2xl border border-line bg-bone p-6 text-left"
            >
              <div className="tracking-[0.15em]" aria-label={`${r.rating} out of 5 stars`}>
                <span className="text-champagne">{"★".repeat(r.rating)}</span>
                <span className="text-ink/15">{"★".repeat(5 - r.rating)}</span>
              </div>
              <blockquote className="mt-4 line-clamp-6 text-[0.95rem] leading-relaxed text-ink/80">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-medium text-ink">{r.author}</span>
                {r.relativeTime && <span className="text-mist"> · {r.relativeTime}</span>}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <GoldButton href={url} tone="onLight" cursorLabel="Reviews">
            Read all on Google
          </GoldButton>
          <p className="text-xs uppercase tracking-[0.16em] text-mist">
            Reviews sourced from Google
          </p>
        </div>
      </div>
    </Section>
  );
}
