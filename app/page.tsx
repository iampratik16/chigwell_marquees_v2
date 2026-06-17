import Hero from "@/components/sections/home/Hero";
import IntroStatement from "@/components/sections/home/IntroStatement";
import TwoSpaces from "@/components/sections/home/TwoSpaces";
import OccasionsPreview from "@/components/sections/home/OccasionsPreview";
import StatsBand from "@/components/sections/home/StatsBand";
import GalleryRail from "@/components/sections/home/GalleryRail";
import CaseStudies from "@/components/sections/home/CaseStudies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
