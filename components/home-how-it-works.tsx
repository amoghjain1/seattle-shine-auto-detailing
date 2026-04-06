"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";
import { contactHref } from "@/lib/tracking-links";

const steps = [
  {
    number: "01",
    title: "Book",
    body: "Send your vehicle photos and goals. We recommend the right package and confirm timing.",
  },
  {
    number: "02",
    title: "Inspect",
    body: "At arrival we do a quick walk-through, set expectations, and confirm your quote before starting.",
  },
  {
    number: "03",
    title: "Drive away",
    body: "You get a reset interior, refined exterior finish, and protection matched to your car's condition.",
  },
] as const;

export function HomeHowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-border/60 bg-surface/25 py-20">
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            How it works
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Simple process, premium results
          </h2>
        </motion.div>

        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduce ? 0 : i * 0.08, duration: 0.4 }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="rounded-2xl border border-border/80 bg-background p-6 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {step.number}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Link
            href={contactHref({
              source: "homepage",
              content: "how_it_works_cta",
            })}
            className="inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground shadow-glow"
          >
            Get a free quote
          </Link>
        </div>
      </Container>
    </section>
  );
}
