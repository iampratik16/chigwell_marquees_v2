import Hero from "@/components/sections/home/Hero";
import IntroStatement from "@/components/sections/home/IntroStatement";
import TwoSpaces from "@/components/sections/home/TwoSpaces";
import OccasionsPreview from "@/components/sections/home/OccasionsPreview";
import StatsBand from "@/components/sections/home/StatsBand";
import GalleryRail from "@/components/sections/home/GalleryRail";
import CaseStudies from "@/components/sections/home/CaseStudies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Luxury Marquee Wedding Venue in Essex | The Chigwell Marquees",
  description:
    "Two luxury marquee venues in the 42-acre grounds of Grade II listed Chigwell Hall, Essex — for weddings, celebrations and corporate events of 30–1,000 guests.",
  path: "/",
  imageAlt: "The Chigwell Marquees, a luxury marquee wedding venue in the grounds of Chigwell Hall, Essex",
});

export default function Home() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <TwoSpaces />
      <OccasionsPreview />
      <StatsBand />
      <GalleryRail />
      <CaseStudies />
    </>
  );
}
