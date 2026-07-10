import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import type { Media } from "@/lib/media";

type Showcase = { label: string; line: string; media: Media };

/** A glimpse of the four settings across the estate. */
const SHOWCASES: Showcase[] = [
  {
    label: "Mega Marquee",
    line: "Grand celebrations for up to 1,000 guests.",
    media: { src: "/media/recent-mega.jpg", alt: "The Mega Marquee dressed for a celebration", width: 2000, height: 1334 },
  },
  {
    label: "Mini Marquee",
    line: "Intimate weddings beneath a starlit ceiling.",
    media: { src: "/media/recent-mini.jpg", alt: "The Mini Marquee set for an intimate wedding", width: 2000, height: 1500 },
  },
  {
    label: "Chigwell House",
    line: "A Grade II listed manor at the estate's heart.",
    media: { src: "/media/recent-hall.jpg", alt: "Chigwell Hall, the Grade II listed manor", width: 2000, height: 1333 },
  },
  {
    label: "Garden",
    line: "Outdoor ceremonies in the Secret Garden.",
    media: { src: "/media/garden-waterfall-10f.jpg", alt: "The Secret Garden waterfall and grounds of the estate", width: 2560, height: 1920 },
  },
];

export default function CaseStudies() {
  return (
    <Section tone="bone" spacing="md">
      <div className="container-luxe">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Recently at the estate</Eyebrow>
            <h2 className="mt-6 display-md max-w-xl">A glimpse across the estate.</h2>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SHOWCASES.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <figure>
                <RevealImage
                  media={s.media}
                  ratio="4 / 5"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  interactive
                  cursorLabel="View"
                  className="rounded-xl"
                />
                <figcaption className="mt-4">
                  <span className="block text-[0.72rem] uppercase tracking-[0.18em] text-mist">
                    {s.label}
                  </span>
                  <p className="mt-1.5 font-display text-lg leading-snug">{s.line}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
