"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { site } from "@/lib/site";
import { packages } from "@/lib/packages";

const reasons = [
  {
    title: "Show-car standards",
    body: "Correct prep, careful towels, and products chosen for your paint and interior materials.",
  },
  {
    title: "Flexible service",
    body: "Mobile at your location or convenient drop-off — we set clear expectations up front.",
  },
  {
    title: "Rooted in Bothell",
    body: "Home base in Bothell — we meet you in Seattle, the Eastside, Woodinville, Everett, Lynnwood, Redmond, Bellevue, and nearby for mobile work or scheduled drop-offs.",
  },
  {
    title: "High school detailer",
    body: "A local student-run detail families in Bothell already trust — friendlier pricing than most shops, with the same obsession over prep, finish, and lasting protection.",
  },
];

export function HomeWhyChoose() {
  return (
    <section className="border-t border-border/60 bg-surface/30 py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Why choose Seattle Shine
          </h2>
          <p className="mt-4 text-lg text-muted">
            We obsess over depth of clean, clarity of paint, and finishes that
            look wet in the light — whether we roll up to your driveway (using
            your water and power) or you drop off by appointment. Serving{" "}
            {site.serviceArea}
          </p>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-2xl border border-border/80 bg-background p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function HomePackageTeasers() {
  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Featured packages
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Build a detail around how you use your vehicle — from a crisp
              maintenance wash to full interior resets and protective finishes.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface"
          >
            View all services
          </Link>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {packages.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className={
                p.featured
                  ? "flex flex-col rounded-2xl border border-accent/50 bg-accent/[0.04] p-6 shadow-glow ring-1 ring-accent/20"
                  : "flex flex-col rounded-2xl border border-border/80 bg-background p-6 shadow-sm"
              }
            >
              {p.featured ? (
                <p className="mb-2 inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  Best value
                </p>
              ) : null}
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {p.subtitle}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                {p.name}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted">{p.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent" aria-hidden>
                      •
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link
                  href={`/contact?package=${p.id}`}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-accent py-3 text-center text-sm font-semibold text-accent-foreground"
                >
                  Quick quote
                </Link>
                <Link
                  href="/services"
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-border py-3 text-center text-sm font-semibold"
                >
                  Details
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
