import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/container";
import { AboutBlockMotion, AboutHeroMotion } from "@/components/about-page-motion";
import {
  founderSpotlightEyebrow,
  founderSpotlightHeadline,
  founderStoryParagraphs,
  founderStoryTeaser,
} from "@/lib/about-story";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us",
  description: `Learn about ${site.name} — based in Bothell, WA, with mobile detailing and drop-off across the greater Seattle area.`,
};

export default function AboutPage() {
  return (
    <>
      <AboutHeroMotion>
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          About
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Obsessed with clarity, cleanliness, and longevity
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{site.description}</p>
      </AboutHeroMotion>

      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <AboutBlockMotion>
            <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:items-center">
              <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/about/amogh-jain.png"
                    alt="Amogh Jain, founder of Seattle Shine Auto Detailing"
                    fill
                    sizes="(max-width: 1024px) 80vw, 340px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-black/40 px-5 py-4 backdrop-blur-md">
                  <p className="text-sm font-semibold text-white">Amogh Jain</p>
                  <p className="text-xs text-white/70">Founder, Seattle Shine</p>
                </div>
              </div>
              <div className="mx-auto max-w-2xl lg:mx-0">
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  {founderSpotlightEyebrow}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                  {founderSpotlightHeadline}
                </h2>
                <p className="mt-4 text-muted">{founderStoryTeaser}</p>
              </div>
            </div>
          </AboutBlockMotion>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="mx-auto flex max-w-3xl flex-col gap-8 text-muted">
          <AboutBlockMotion>
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              My story
            </h2>
            {founderStoryParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <p>
              If your car needs a refresh, check out my before-and-afters on{" "}
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                Instagram
              </a>{" "}
              or{" "}
              <a
                href={site.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                TikTok @{site.instagramHandle}
              </a>
              , or feel free to{" "}
              <Link
                href="/contact"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                message me here
              </Link>
              . Thanks for supporting a young local business!
            </p>
          </div>
          </AboutBlockMotion>
          <AboutBlockMotion delay={0.06}>
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              How we work with you
            </h2>
            <p>
              <strong className="text-foreground">Mobile detailing:</strong> we come
              to you and use <strong className="text-foreground">your water and
              power</strong> hookups, so you know exactly what we need on site
              before we arrive.
            </p>
            <p>
              <strong className="text-foreground">Drop-off:</strong> prefer to hand
              off the keys? We also offer{" "}
              <strong className="text-foreground">drop-off at our home location by
              appointment</strong> — same standards, flexible scheduling.
            </p>
          </div>
          </AboutBlockMotion>
          <AboutBlockMotion delay={0.1}>
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Quality bar
            </h2>
            <p>
              We stage products for your specific paint and interior materials,
              work in controlled lighting when possible, and finish with
              inspections you can see — not just a quick wipe and go. Whether it is a
              deep interior reset,{" "}
              <Link href="/services" className="font-medium text-accent">
                protection packages
              </Link>{" "}
              and ceramic coatings, we explain what to expect before we
              begin.
            </p>
          </div>
          </AboutBlockMotion>
          <AboutBlockMotion delay={0.12}>
          <div className="rounded-2xl border border-border/80 bg-surface/40 p-8">
            <p className="font-display text-lg text-foreground">
              Ready when you are.
            </p>
            <p className="mt-2 text-sm">
              Book a detail, request a quote with photos, or find us on Instagram
              and TikTok.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
              >
                Book your detail
              </Link>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground"
              >
                @{site.instagramHandle}
              </a>
              <a
                href={site.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground"
              >
                TikTok
              </a>
            </div>
          </div>
          </AboutBlockMotion>
        </Container>
      </section>
    </>
  );
}
