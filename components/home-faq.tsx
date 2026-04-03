"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const faqs = [
  {
    q: "How does mobile detailing work?",
    a: "We roll up to your location and use your water and power hookups. We walk the vehicle with you, set expectations, then work carefully with our own towels, tools, and products matched to your paint and interior.",
  },
  {
    q: "Can I drop off instead?",
    a: "Yes — drop-offs are by appointment. We will confirm timing and what to expect for handoff and pickup when you request a quote.",
  },
  {
    q: "What areas do you serve?",
    a: `Home base in Bothell. We regularly serve ${site.servedAreas}.`,
  },
  {
    q: "How do I get pricing?",
    a: "Packages on the Services page are a starting point; every job gets a quick quote based on condition, size, and add-ons. Photos help us recommend the right package.",
  },
] as const;

export function HomeFaq() {
  const reduce = useReducedMotion();
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-border/60 bg-surface/20 py-20">
      <Container className="max-w-3xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            FAQ
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Common questions
          </h2>
          <p className="mt-3 text-muted">
            Straight answers before you book — tap a question to expand.
          </p>
        </motion.div>
        <ul className="mt-12 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-btn-${i}`;
            return (
              <motion.li
                key={item.q}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reduce ? 0 : i * 0.05, duration: 0.35 }}
                className="overflow-hidden rounded-2xl border border-border/80 bg-background shadow-sm"
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-surface/50"
                >
                  <span className="font-medium text-foreground">{item.q}</span>
                  <span
                    className={cn(
                      "shrink-0 text-accent transition-transform duration-200",
                      isOpen && "rotate-45",
                    )}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="border-t border-border/60 px-5 pb-4 pt-3 text-sm leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
