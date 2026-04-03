import { Hero } from "@/components/hero";
import { HomePackageTeasers, HomeWhyChoose } from "@/components/home-motion";
import { HomeStats } from "@/components/home-stats";
import { HomeResultsCta } from "@/components/home-results-cta";
import { HomeFaq } from "@/components/home-faq";
import { HomeCtaStrip } from "@/components/home-cta-strip";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium mobile detailing",
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeStats />
      <HomeWhyChoose />
      <HomePackageTeasers />
      <HomeResultsCta />
      <HomeFaq />
      <HomeCtaStrip />
    </>
  );
}
