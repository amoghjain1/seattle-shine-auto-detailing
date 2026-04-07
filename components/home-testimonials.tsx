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
    vehicle: "Honda Civic",
    quote: "It looks great!! Thanks again for being able to do this so soon!!",
  },
  {
    name: "Mike",
    vehicle: "Toyota Sienna",
    quote: "Great work and thanks again! Appreciate you working late.",
  },
  {
    name: "Toni",
    vehicle: "BMW X5",
    quote:
      "Looks great inside and out, attention to detail was great. $50 tip for the job.",
  },
  {
    name: "Raghavendra",
    vehicle: "Repeat client — Honda Odyssey & Nissan Altima",
    quote:
      "Amazing work, professional, car looks brand new. I am booked in for my 5th detail.",
  },
  {
    name: "Girish",
    vehicle: "Mercedes-Benz GLC 300",
    quote:
      "Adaptive schedule. Respectful and easy to talk to.",
  },
] as const;

const row1 = [...testimonials, ...testimonials, ...testimonials];
const row2 = [...[...testimonials].reverse(), ...[...testimonials].reverse(), ...[...testimonials].reverse()];

function Stars() {
  return (
    <p className="text-xs tracking-[0.12em] text-accent" aria-label="5 stars">
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
    <figure className="glass-card flex w-[272px] shrink-0 flex-col rounded-xl px-4 py-3.5 sm:w-[292px]">
      <Stars />
      <blockquote className="mt-2 border-l-2 border-accent/50 pl-3">
        <p className="text-sm leading-snug text-foreground">{item.quote}</p>
      </blockquote>
      <figcaption className="mt-2.5 border-t border-border/40 pt-2.5">
        <p className="text-sm font-semibold leading-tight text-foreground">{item.name}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-muted">{item.vehicle}</p>
      </figcaption>
    </figure>
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
        className="group flex w-max gap-3"
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
    <section className="border-t border-border/60 bg-background py-14 sm:py-16 overflow-hidden">
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

      <div className="mt-8 space-y-3">
        <Marquee items={row1} direction="left" speed={28} />
        <Marquee items={row2} direction="right" speed={32} />
      </div>
    </section>
  );
}
