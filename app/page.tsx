import { Hero } from "@/components/hero";
import { HomePackageTeasers, HomeWhyChoose } from "@/components/home-motion";
import { HomeStats } from "@/components/home-stats";
import { HomeResultsCta } from "@/components/home-results-cta";
import { HomeFaq } from "@/components/home-faq";
import { HomeCtaStrip } from "@/components/home-cta-strip";
import { resolveSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

const homeUrl = new URL("/", resolveSiteUrl()).href;

export const metadata: Metadata = {
  alternates: { canonical: homeUrl },
  openGraph: { url: homeUrl },
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
