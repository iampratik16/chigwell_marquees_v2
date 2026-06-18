import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/site/PageHero";
import Section from "@/components/ui/Section";
import MasonryGallery, { type GalleryItem } from "@/components/sections/MasonryGallery";
import CtaBand from "@/components/site/CtaBand";
import { GALLERY_FILES, GALLERY_HERO, img } from "@/lib/media";
import { REAL_GALLERY } from "@/lib/media.real";
import { CONTENT_GALLERY } from "@/lib/gallery-content";

export const metadata = pageMeta({
  title: "Marquee Venue Gallery, Essex | The Chigwell Marquees",
  description:
    "A photo gallery of The Chigwell Marquees — weddings, parties and corporate events styled across our two Essex marquees, the Secret Garden and Chigwell Hall.",
  path: "/gallery",
  imageAlt: "A gallery of weddings and celebrations at The Chigwell Marquees",
});

function categorise(file: string): string {
  const f = file.toLowerCase();
  if (/asian|bengali|indian|mandap|pakistani|turkish|hindu/.test(f)) return "asian";
  // These two civil-ceremony photographs are shown under Weddings, not Civil
  if (/civil-ceremoney-venue-to-rent-essex|civil-ceremonies-essex-chigwell-marquees/.test(f)) return "weddings";
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
