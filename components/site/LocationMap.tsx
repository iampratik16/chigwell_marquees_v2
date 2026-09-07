import { SITE } from "@/lib/site";

/**
 * Full-bleed map that closes the Visit page. The bottom edge fades into the
 * ink footer so the two read as one continuous block.
 */
export default function LocationMap() {
  return (
    <section className="relative bg-ink" aria-label="Our location">
      <div className="relative h-[clamp(22rem,60vh,38rem)] w-full">
        <iframe
          title={`Map to ${SITE.name}`}
          src="https://maps.google.com/maps?q=The%20Chigwell%20Marquees%20159%20High%20Road%20Chigwell%20IG7%206BD&z=14&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full grayscale-[0.25] contrast-[1.05]"
        />

        {/* Blend into the footer. pointer-events-none so the map stays usable. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-ink"
        />
      </div>
    </section>
  );
}
