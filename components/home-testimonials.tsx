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

const row1 = [...testimonials, ...testimonials, ...testimonials];
const row2 = [...[...testimonials].reverse(), ...[...testimonials].reverse(), ...[...testimonials].reverse()];

function Stars() {
  return (
    <p className="text-sm tracking-[0.15em] text-accent" aria-label="5 stars">
      {"\u2605\u2605\u2605\u2605\u2605"}
    </p>
  );
}

function TestimonialCard({
  item,
}: {
  item: (typeof testimonials)[number];
}) {
  return (
    <div className="glass-card relative w-[320px] shrink-0 rounded-2xl p-6 sm:w-[360px]">
      <span
        className="pointer-events-none absolute -top-2 left-5 font-display text-5xl leading-none text-accent/15"
        aria-hidden
      >
        &ldquo;
      </span>
      <Stars />
      <p className="mt-3 text-base leading-relaxed text-foreground">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="mt-4">
        <p className="text-sm font-semibold text-foreground">{item.name}</p>
        <p className="text-xs text-muted">{item.vehicle}</p>
      </div>
    </div>
  );
}

function Marquee({
  items,
  direction = "left",
  speed = 30,
}: {
  items: readonly (typeof testimonials)[number][];
  direction?: "left" | "right";
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const duration = items.length * speed;

  return (
    <div className="relative overflow-hidden">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

      <div
        className="group flex w-max gap-4"
        style={
          reduce
            ? undefined
            : {
                animation: `marquee-${direction} ${duration}s linear infinite`,
              }
        }
      >
        {items.map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function HomeTestimonials() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-border/60 bg-background py-20 overflow-hidden">
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            What clients say
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Real feedback from real detail appointments
          </h2>
        </motion.div>
      </Container>

      <div className="mt-10 space-y-4">
        <Marquee items={row1} direction="left" speed={28} />
        <Marquee items={row2} direction="right" speed={32} />
      </div>
    </section>
  );
}
