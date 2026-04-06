"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/container";

const proofSnippets = [
  'Ambreem: "Thanks for an amazing job! My kids are so excited and happy!"',
  'Carmen (repeat client): "I appreciate your response and attentiveness."',
  'Madie: "It looks great!! Thanks again for being able to do this so soon!!"',
  'Mike: "Great work and thanks again! Appreciate you working late."',
] as const;

function CountUp({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    const duration = 1100;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    setValue(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return (
    <span ref={ref} aria-label={label}>
      {value}
      {suffix}
    </span>
  );
}

function RotatingSnippet() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % proofSnippets.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-16 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-x-0 text-sm leading-relaxed text-muted italic"
        >
          {proofSnippets[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export function HomeStats() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-border/60 bg-surface/20 py-16 sm:py-20">
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Proof that builds trust
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Premium results from a local detailer that clients keep calling back
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {/* Hero stat: 30+ vehicles */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            whileHover={reduce ? undefined : { y: -4 }}
            className="glass-card-accent flex flex-col justify-center rounded-2xl p-6 sm:col-span-2 sm:row-span-2"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Vehicles detailed
            </p>
            <p
              className="mt-3 font-display text-6xl font-bold text-foreground sm:text-7xl"
              style={{
                textShadow: "0 0 40px color-mix(in srgb, var(--accent) 25%, transparent)",
              }}
            >
              <CountUp target={30} suffix="+" label="30+ vehicles detailed" />
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Real vehicles completed across daily drivers, family SUVs, and
              enthusiast cars. Every job photographed and reviewed.
            </p>
            <div className="mt-5">
              <RotatingSnippet />
            </div>
          </motion.div>

          {/* 3 years */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.08, duration: 0.45 }}
            whileHover={reduce ? undefined : { y: -3 }}
            className="glass-card flex flex-col justify-center rounded-2xl p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Years serving clients
            </p>
            <p
              className="mt-2 font-display text-4xl font-bold text-foreground"
              style={{
                textShadow: "0 0 28px color-mix(in srgb, var(--accent) 18%, transparent)",
              }}
            >
              <CountUp target={3} suffix=" yrs" label="3 years serving clients" />
            </p>
            <p className="mt-2 text-sm text-muted">
              Built through repeat bookings, referrals, and consistent results.
            </p>
          </motion.div>

          {/* Service coverage */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.12, duration: 0.45 }}
            whileHover={reduce ? undefined : { y: -3 }}
            className="glass-card flex flex-col justify-center rounded-2xl p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Service coverage
            </p>
            <p className="mt-2 font-display text-xl font-semibold text-foreground">
              Everett to Renton
            </p>
            <p className="mt-2 text-sm text-muted">
              Mobile and drop-off appointments available across Greater Seattle.
            </p>
          </motion.div>

          {/* Quote turnaround */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.16, duration: 0.45 }}
            whileHover={reduce ? undefined : { y: -3 }}
            className="glass-card flex flex-col justify-center rounded-2xl p-5 sm:col-span-2 lg:col-span-2"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Quote turnaround
            </p>
            <p className="mt-2 font-display text-xl font-semibold text-foreground">
              Fast response
            </p>
            <p className="mt-2 text-sm text-muted">
              Send photos and we will recommend the right package without
              over-selling. Most quotes returned same day.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
