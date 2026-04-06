import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PricingCard } from "@/components/pricing-card";
import { AddOnCards } from "@/components/add-on-cards";
import { ServicesHeroMotion } from "@/components/services-page-client";
import { packages } from "@/lib/packages";
import { site } from "@/lib/site";
import { contactHref } from "@/lib/tracking-links";

export const metadata: Metadata = {
  title: "Services & pricing",
  description: `Interior resets, protection packages, and ceramic sealants — ${site.name}. Home base in Bothell; serving Seattle, the Eastside, and nearby.`,
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHeroMotion>
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          Services &amp; pricing
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Packages built for real-world drivers
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Every detail starts with inspection and honest expectations -
          especially for mobile work using your water and power, or when you
          drop off by appointment. We do not post fixed pricing because every
          vehicle condition is different. Tap{" "}
          <strong className="text-foreground">Get a free quote</strong> anytime.
        </p>
      </ServicesHeroMotion>

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
          <AddOnCards />
          <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
            <p className="font-display text-lg text-foreground">
              Not sure what you need?
            </p>
            <p className="mt-2 text-sm text-muted">
              Send photos and we will recommend a package.
            </p>
            <Link
              href={contactHref({
                source: "services_page",
                content: "addons_not_sure_cta",
              })}
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
