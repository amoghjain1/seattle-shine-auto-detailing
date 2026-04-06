import { Hero } from "@/components/hero";
import { HomePackageTeasers, HomeWhyChoose } from "@/components/home-motion";
import { HomeStats } from "@/components/home-stats";
import { HomeTestimonials } from "@/components/home-testimonials";
import { HomeBeforeAfter } from "@/components/home-before-after";
import { HomeHowItWorks } from "@/components/home-how-it-works";
import { HomeAboutPreview } from "@/components/home-about-preview";
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
      <HomeTestimonials />
      <HomeWhyChoose />
      <HomePackageTeasers />
      <HomeBeforeAfter />
      <HomeHowItWorks />
      <HomeAboutPreview />
      <HomeFaq />
      <HomeCtaStrip />
    </>
  );
}
