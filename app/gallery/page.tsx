import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Section from "@/components/ui/Section";
import MasonryGallery, { type GalleryItem } from "@/components/sections/MasonryGallery";
import CtaBand from "@/components/site/CtaBand";
import { GALLERY_FILES, img } from "@/lib/media";
import { REAL, REAL_GALLERY } from "@/lib/media.real";

export const metadata: Metadata = {
  alternates: { canonical: "/gallery" },
  title: { absolute: "Marquee Venue Gallery, Essex | The Chigwell Marquees" },
  description:
    "A gallery of real weddings, celebrations and corporate events at The Chigwell Marquees, across the Mega Marquee, Mini Marquee and Secret Garden.",
};

function categorise(file: string): string {
  const f = file.toLowerCase();
  if (/asian|bengali|indian|mandap|pakistani|turkish|hindu/.test(f)) return "asian";
  if (/wedding|bride|civil-ceremon/.test(f)) return "weddings";
  if (/corporate|festival|filming|conference|christmas/.test(f)) return "corporate";
  if (/birthday|engagement|party|christening|themed|mitzvah/.test(f)) return "celebrations";
  return "celebrations";
}

export default function GalleryPage() {
  // Lead with the premium Instagram photography, then the wider archive.
  const items: GalleryItem[] = [
    ...REAL_GALLERY,
    ...GALLERY_FILES.map((file) => ({ ...img(file), cat: categorise(file) })),
  ];

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={"Inside the\nmarquees."}
        intro="Real weddings, parties and gatherings, drawn from years of celebrations on the estate."
        media={REAL.ceremonyAisle}
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
      />
    </>
  );
}
