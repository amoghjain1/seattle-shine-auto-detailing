"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";

const stats = [
  {
    label: "Vehicles detailed",
    value: "30+",
    numericValue: 30,
    suffix: "+",
    hint: "Real vehicles completed across daily drivers, family SUVs, and enthusiast cars.",
  },
  {
    label: "Years serving clients",
    value: "3 years",
    numericValue: 3,
    suffix: " years",
    hint: "Built through repeat bookings, referrals, and consistent results.",
  },
  {
    label: "Service coverage",
    value: "Everett to Renton",
    hint: "Mobile and drop-off appointments available across Greater Seattle.",
  },
  {
    label: "Quote turnaround",
    value: "Fast response",
    hint: "Send photos and we will recommend the right package without over-selling.",
  },
] as const;

const proofSnippets = [
  'Ambreem: "Thanks for an amazing job! My kids are so excited and happy!"',
  'Carmen (repeat client): "Looks nice thanks Amogh! I appreciate your response and attentiveness."',
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
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 900;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

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
            Proof that builds trust
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Premium results from a local detailer that clients keep calling back
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
                {"numericValue" in s ? (
                  <CountUp
                    target={s.numericValue}
                    suffix={s.suffix ?? ""}
                    label={s.value}
                  />
                ) : (
                  s.value
                )}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.hint}</p>
            </motion.li>
          ))}
        </ul>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {proofSnippets.map((snippet, i) => (
            <motion.li
              key={snippet}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduce ? 0 : 0.08 + i * 0.05, duration: 0.35 }}
              className="rounded-2xl border border-border/70 bg-background p-4 text-sm leading-relaxed text-muted shadow-sm"
            >
              {snippet}
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
