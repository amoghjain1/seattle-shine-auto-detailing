import Link from "next/link";
import { Hero } from "@/components/hero";
import { Container } from "@/components/container";
import { HomePackageTeasers, HomeWhyChoose } from "@/components/home-motion";
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
      <HomeWhyChoose />
      <HomePackageTeasers />

      <section className="border-t border-border/60 bg-surface/25 py-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-2xl text-sm text-muted">{site.serviceArea}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground shadow-glow"
            >
              Book your detail
            </Link>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-8 py-3 text-sm font-semibold"
            >
              Follow on Instagram
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
