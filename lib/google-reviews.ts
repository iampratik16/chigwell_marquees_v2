import "server-only";

/**
 * Google Places API (New, v1) reviews — fetched server-side so the API key
 * never reaches the browser. Returns empty (no throw) whenever the key/Place ID
 * are missing or the request fails, so callers fall back to the link-out band.
 *
 * Config (Vercel env + .env.local for local testing):
 *   GOOGLE_PLACES_API_KEY  — a key with the Places API (New) enabled + billing
 *   GOOGLE_PLACE_ID        — the Place ID for The Chigwell Marquees
 */

export type GoogleReview = {
  author: string;
  authorUrl?: string;
  rating: number; // 1–5
  text: string;
  relativeTime: string; // e.g. "2 months ago"
};

export type GoogleReviewsData = {
  rating: number | null; // aggregate, e.g. 4.9
  total: number | null; // total rating count
  reviews: GoogleReview[]; // up to 5, chosen by Google
  /** Canonical read/write-reviews link for the place (when a Place ID is set). */
  reviewsUrl: string | null;
};

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string };
  relativePublishTimeDescription?: string;
};
type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
};

const EMPTY: GoogleReviewsData = { rating: null, total: null, reviews: [], reviewsUrl: null };

/**
 * Dev-only layout preview. Enabled with GOOGLE_REVIEWS_PREVIEW=1 in .env.local
 * (gitignored, never set on Vercel) so you can see the live card layout without
 * a real API key. Sample text — never shown in production.
 */
const PREVIEW: GoogleReviewsData = {
  rating: 4.9,
  total: 128,
  reviewsUrl: null,
  reviews: [
    {
      author: "Sarah & Tom",
      rating: 5,
      relativeTime: "2 months ago",
      text: "An absolutely magical wedding. The team made every detail effortless and the Secret Garden was breathtaking for our ceremony. We couldn't have asked for more.",
    },
    {
      author: "Priya M.",
      rating: 5,
      relativeTime: "5 months ago",
      text: "Stunning venue and impeccable service from start to finish. Our guests are still talking about it. The marquee looked incredible in the evening.",
    },
    {
      author: "James H.",
      rating: 5,
      relativeTime: "1 month ago",
      text: "We hosted a corporate event here and it was flawless — the space, the food, the grounds. Professional, warm and genuinely a pleasure to work with.",
    },
  ],
};

export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  if (process.env.GOOGLE_REVIEWS_PREVIEW === "1") return PREVIEW;

  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return EMPTY;

  const reviewsUrl = `https://search.google.com/local/reviews?placeid=${placeId}`;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        // Refresh daily: reviews change slowly, and this keeps API cost/quota low.
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) return { ...EMPTY, reviewsUrl };

    const data = (await res.json()) as PlacesResponse;
    const reviews: GoogleReview[] = (data.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google reviewer",
        authorUrl: r.authorAttribution?.uri,
        rating: Math.round(r.rating ?? 5),
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        relativeTime: r.relativePublishTimeDescription ?? "",
      }))
      .filter((r) => r.text.length > 0);

    return {
      rating: data.rating ?? null,
      total: data.userRatingCount ?? null,
      reviews,
      reviewsUrl,
    };
  } catch {
    // Network/parse failure — degrade to the link-out band.
    return { ...EMPTY, reviewsUrl };
  }
}
