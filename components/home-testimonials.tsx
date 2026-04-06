"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";

const testimonials = [
  {
    name: "Ambreem",
    vehicle: "Toyota Sienna",
    quote: "Thanks for an amazing job Amogh! My kids are so excited and happy!",
  },
  {
    name: "Carmen",
    vehicle: "Toyota RAV4 (repeat client)",
    quote: "Looks nice thanks Amogh! I appreciate your response and attentiveness.",
  },
  {
    name: "Madie",
    vehicle: "Interior detail",
    quote: "It looks great!! Thanks again for being able to do this so soon!!",
  },
  {
    name: "Mike",
    vehicle: "Evening appointment",
    quote: "Great work and thanks again! Appreciate you working late.",
  },
] as const;

function Stars() {
  return (
    <p className="text-base tracking-[0.2em] text-accent" aria-label="5 stars">
      {"\u2605\u2605\u2605\u2605\u2605"}
    </p>
  );
}

export function HomeTestimonials() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-border/60 bg-surface/20 py-20">
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            What clients say
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Real feedback from real detail appointments
          </h2>
        </motion.div>
        <ul className="mt-10 grid gap-4 lg:grid-cols-2">
          {testimonials.map((item, i) => (
            <motion.li
              key={item.name + item.quote}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduce ? 0 : i * 0.06, duration: 0.35 }}
              whileHover={reduce ? undefined : { y: -3 }}
              className="rounded-2xl border border-border/80 bg-background p-6 shadow-sm"
            >
              <Stars />
              <p className="mt-3 text-base leading-relaxed text-foreground">
                "{item.quote}"
              </p>
              <p className="mt-4 text-sm font-semibold text-foreground">
                {item.name}
              </p>
              <p className="text-sm text-muted">{item.vehicle}</p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
