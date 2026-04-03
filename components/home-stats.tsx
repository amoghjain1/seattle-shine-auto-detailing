"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";

const stats = [
  {
    label: "Service styles",
    value: "Mobile & drop-off",
    hint: "We come to you with your water and power, or schedule a drop-off by appointment.",
  },
  {
    label: "Home base",
    value: "Bothell, WA",
    hint: "Greater Seattle, Eastside, and nearby cities on our regular routes.",
  },
  {
    label: "How we start",
    value: "Inspect first",
    hint: "Honest expectations before we touch paint, glass, or interior materials.",
  },
  {
    label: "Who we are",
    value: "Student-run local",
    hint: "High school detailer families in the area already trust for show-ready finishes.",
  },
] as const;

export function HomeStats() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-border/60 bg-background py-14 sm:py-16">
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            At a glance
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Built around your driveway or our schedule
          </h2>
        </motion.div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduce ? 0 : i * 0.06, duration: 0.4 }}
              whileHover={reduce ? undefined : { y: -3 }}
              className="rounded-2xl border border-border/80 bg-surface/40 p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {s.label}
              </p>
              <p className="mt-2 font-display text-lg font-semibold text-foreground">
                {s.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.hint}</p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
