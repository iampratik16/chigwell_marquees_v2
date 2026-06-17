import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Section from "@/components/ui/Section";
import MasonryGallery, { type GalleryItem } from "@/components/sections/MasonryGallery";
import CtaBand from "@/components/site/CtaBand";
import { GALLERY_FILES, GALLERY_HERO, img } from "@/lib/media";
import { REAL_GALLERY } from "@/lib/media.real";
import { CONTENT_GALLERY } from "@/lib/gallery-content";

export const metadata: Metadata = {
  alternates: { canonical: "/gallery" },
  title: { absolute: "Marquee Venue Gallery, Essex | The Chigwell Marquees" },
  description:
    "A gallery of real weddings, celebrations and corporate events at The Chigwell Marquees, across the Mega Marquee, Mini Marquee and Secret Garden.",
};

function categorise(file: string): string {
  const f = file.toLowerCase();
  if (/asian|bengali|indian|mandap|pakistani|turkish|hindu/.test(f)) return "asian";
  if (/civil-ceremon|civil/.test(f)) return "civil";
  if (/engagement/.test(f)) return "engagements";
  if (/birthday|christening|children/.test(f)) return "birthdays";
  if (/corporate|conference|filming/.test(f)) return "corporate";
  if (/party|parties|festival|themed|mitzvah|christmas/.test(f)) return "parties";
  if (/wedding|bride/.test(f)) return "weddings";
  return "weddings";
}

export default function GalleryPage() {
  // Lead with the premium Instagram photography, then the wider archive.
  const items: GalleryItem[] = [
    ...CONTENT_GALLERY,
    ...REAL_GALLERY,
    ...GALLERY_FILES.map((file) => ({ ...img(file), cat: categorise(file) })),
  ];

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={"Inside the\nmarquees."}
        intro="Real weddings, parties and gatherings, drawn from years of celebrations on the estate."
        media={GALLERY_HERO}
        size="md"
        social
      />

      <Section tone="bone" spacing="md">
        <MasonryGallery items={items} />
      </Section>

      <CtaBand
        title="Picture your own occasion here."
        blurb="The best way to feel the estate is to stand in it. Arrange a private viewing."
        primary={{ href: "/visit#enquire", label: "Arrange a viewing" }}
        secondary={null}
      />
    </>
  );
}
