import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PricingCard } from "@/components/pricing-card";
import { packages, ADD_ON_OPTIONS } from "@/lib/packages";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & pricing",
  description: `Interior resets, protection packages, and ceramic sealants — ${site.name}. Home base in Bothell; serving Seattle, the Eastside, and nearby.`,
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-surface/20 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Services &amp; pricing
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Packages built for real-world drivers
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Every detail starts with inspection and honest expectations — especially
            for mobile work using your water and power, or when you drop off by
            appointment. Pricing below is placeholder until you finalize rates;
            tap <strong className="text-foreground">Quick quote</strong> anytime.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-stretch">
            {packages.map((p) => (
              <PricingCard
                key={p.id}
                name={p.name}
                subtitle={p.subtitle}
                blurb={p.blurb}
                features={p.features}
                packageId={p.id}
                featured={p.featured === true}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 bg-surface/25 py-16">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Add-ons
          </h2>
          <p className="mt-2 text-muted">
            Layer these on any package. We will confirm fit and timing on your quote.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {ADD_ON_OPTIONS.map((o) => (
              <li
                key={o.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border/80 bg-background px-5 py-4"
              >
                <span className="text-sm font-medium text-foreground">{o.label}</span>
                <Link
                  href={`/contact?addOn=${o.id}`}
                  className="shrink-0 rounded-full bg-accent/15 px-4 py-2 text-xs font-semibold text-accent"
                >
                  Quote
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
            <p className="font-display text-lg text-foreground">
              Not sure what you need?
            </p>
            <p className="mt-2 text-sm text-muted">
              Send photos and we will recommend a package.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground"
            >
              Get a free quote
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
