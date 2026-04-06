"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";
import { site } from "@/lib/site";
import { packages } from "@/lib/packages";
import { contactHref } from "@/lib/tracking-links";

const reasons = [
  {
    title: "Premium finish standards",
    body: "Every detail is performed with paint-safe methods, quality products, and disciplined final checks.",
  },
  {
    title: "Quote-first approach",
    body: "No cookie-cutter pricing. We always ask for condition, size, and add-ons, then give a clear quote before work starts.",
  },
  {
    title: "Local, reliable coverage",
    body: "Based in Bothell and serving Everett to Renton, including Seattle, Eastside, and nearby neighborhoods.",
  },
  {
    title: "Built on repeat clients",
    body: "In business for 3 years with returning customers who value responsiveness, consistency, and care.",
  },
];

const slideDirections = [
  { x: -20, y: 8 },
  { x: 0, y: 18 },
  { x: 20, y: 8 },
  { x: 0, y: 18 },
];

export function HomeWhyChoose() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-border/60 bg-surface/30 py-20">
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Why choose Seattle Shine
          </h2>
          <p className="mt-4 text-lg text-muted">
            We focus on details of your car most shops rush: every grain of sand,
            paint-safe wash steps, and durable protection that still looks
            right weeks later. Serving {site.serviceArea}
          </p>
        </motion.div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <motion.li
              key={r.title}
              initial={
                reduce
                  ? false
                  : { opacity: 0, x: slideDirections[i].x, y: slideDirections[i].y }
              }
              whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={reduce ? undefined : { y: -5, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-display text-lg font-semibold text-foreground">
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{r.body}</p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function HomePackageTeasers() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-border/60 py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -20 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Choose your detail package
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Start with the package that fits your goals. We will fine-tune it
              after reviewing your vehicle photos and condition.
            </p>
          </motion.div>
          <motion.div
            whileHover={reduce ? undefined : { scale: 1.02 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            className="shrink-0"
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface"
            >
              Compare packages
            </Link>
          </motion.div>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {packages.map((p, i) => (
            <motion.article
              key={p.id}
              initial={
                reduce
                  ? false
                  : { opacity: 0, x: i === 0 ? -24 : 24, y: 10 }
              }
              whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.22 } }}
              className={
                p.featured
                  ? "glass-card-accent flex h-full min-h-0 flex-col rounded-3xl p-7 ring-1 ring-accent/20"
                  : "glass-card flex h-full min-h-0 flex-col rounded-3xl p-7"
              }
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {p.featured ? (
                  <p className="inline-flex w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    Best value
                  </p>
                ) : null}
                <p className="inline-flex rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                  Quote based pricing
                </p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {p.subtitle}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
                {p.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-foreground">
                Final pricing depends on condition + vehicle size
              </p>
              <p className="mt-3 text-sm text-muted">{p.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent" aria-hidden>
                      &bull;
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="min-h-4 flex-1" aria-hidden />
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link
                  href={contactHref({
                    source: "homepage",
                    content: `package_card_${p.id}_primary`,
                    packageId: p.id,
                  })}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-accent py-3 text-center text-sm font-semibold text-accent-foreground shadow-glow"
                >
                  Get a free quote
                </Link>
                <Link
                  href={contactHref({
                    source: "homepage",
                    content: `package_card_${p.id}_secondary`,
                  })}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-border py-3 text-center text-sm font-semibold"
                >
                  Book now
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
