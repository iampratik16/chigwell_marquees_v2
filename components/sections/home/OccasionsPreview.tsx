import Link from "next/link";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import {
  OCC_WEDDINGS_CARD,
  OCC_CELEBRATIONS_CARD,
  OCC_CORPORATE_CARD,
  OCC_FAITH,
} from "@/lib/media";

/** Four occasion pillars — Weddings leads as the primary market. */
const CARDS = [
  {
    n: "01",
    label: "Weddings",
    tag: "Primary",
    blurb: "Garden ceremonies, civil vows and grand traditional weddings.",
    href: "/occasions/weddings",
    media: OCC_WEDDINGS_CARD,
  },
  {
    n: "02",
    label: "Corporate Events",
    blurb: "Galas, conferences, product launches and Christmas parties.",
    href: "/occasions/corporate",
    media: OCC_CORPORATE_CARD,
  },
  {
    n: "03",
    label: "Faith-Based Events",
    blurb: "Asian weddings, mitzvahs and religious ceremonies, hosted with care.",
    href: "/occasions/faith-based",
    media: OCC_FAITH,
  },
  {
    n: "04",
    label: "Private Celebrations",
    blurb: "Milestone birthdays, engagements and anniversaries.",
    href: "/occasions/celebrations",
    media: OCC_CELEBRATIONS_CARD,
  },
];

export default function OccasionsPreview() {
  return (
    <Section tone="bone" spacing="lg">
      <div className="container-luxe">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Occasions</Eyebrow>
            <RevealText as="h2" className="mt-6 display-lg">
              {"Held for every\nkind of gathering."}
            </RevealText>
          </div>
          <Reveal>
            <p className="max-w-sm text-mist md:text-right">
              One adaptable estate, from thirty guests to a thousand, with no
              corkage, ever.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <Link
              key={c.href}
              href={c.href}
              data-cursor="Explore"
              aria-label={`${c.label} — ${c.blurb}`}
              className="group/card block rounded-[1.25rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/70 focus-visible:ring-offset-4 focus-visible:ring-offset-bone"
            >
              <div className="relative">
                <RevealImage
                  media={c.media}
                  ratio="4 / 5"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  interactive
                  disableLightbox
                  delay={i * 0.07}
                  className="rounded-[1.25rem]"
                />
                {c.tag && (
                  <span className="absolute left-4 top-4 rounded-full bg-bone/90 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-ink shadow-sm backdrop-blur-sm">
                    {c.tag}
                  </span>
                )}
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <span className="eyebrow text-mist">{c.n}</span>
                  <h3 className="mt-1 font-display text-2xl leading-tight md:text-[1.6rem]">
                    {c.label}
                  </h3>
                </div>
                <span
                  aria-hidden
                  className="mt-2 inline-block text-xl text-ink/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:translate-x-1 group-hover/card:text-champagne"
                >
                  ↗
                </span>
              </div>
              <p className="mt-2 text-sm text-mist">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
