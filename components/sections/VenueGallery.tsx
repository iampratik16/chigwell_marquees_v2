import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import MasonryGallery, { type GalleryItem } from "@/components/sections/MasonryGallery";

/**
 * Venue photo gallery, sits directly under the page hero. Filters come from the
 * categories present in `items`, so a venue only ever shows the event types it
 * actually has photographs of.
 */
export default function VenueGallery({
  eyebrow = "Gallery",
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: GalleryItem[];
}) {
  if (!items.length) return null;
  return (
    <Section tone="bone" spacing="md">
      <div className="container-luxe">
        <Eyebrow>{eyebrow}</Eyebrow>
        <RevealText as="h2" className="mt-5 display-md max-w-3xl">
          {title}
        </RevealText>
      </div>
      <div className="mt-10">
        <MasonryGallery items={items} />
      </div>
    </Section>
  );
}
