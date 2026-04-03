import type { Metadata } from "next";
import { Container } from "@/components/container";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us",
  description: `Learn about ${site.name} — based in Bothell, WA, with mobile detailing and drop-off across the greater Seattle area.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-surface/20 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            About
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Obsessed with clarity, cleanliness, and longevity
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{site.description}</p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="mx-auto max-w-3xl space-y-10 text-muted">
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Our story
            </h2>
            <p>
              {site.name} started with a simple promise: treat every vehicle like
              it is heading to a show — even if it is just going back to the
              grocery run. We are a{" "}
              <strong className="text-foreground">high school detailer</strong>{" "}
              based in <strong className="text-foreground">Bothell</strong>, and
              many families here choose a student-run detail for the same reason
              they would hire a sharp neighbor:{" "}
              <strong className="text-foreground">
                better pricing than a full-scale shop, without giving up results
              </strong>
              — the same careful prep, products, and inspection-driven finish you
              would expect from a premium service. We also serve{" "}
              {site.servedAreas}.
            </p>
          </div>
          <div className="space-y-4">
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
          <div className="space-y-4">
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
              and ceramic-based sealants, we explain what to expect before we
              begin.
            </p>
          </div>
          <div className="rounded-2xl border border-border/80 bg-surface/40 p-8">
            <p className="font-display text-lg text-foreground">
              Ready when you are.
            </p>
            <p className="mt-2 text-sm">
              Book a detail, request a quote with photos, or DM us on Instagram.
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
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
