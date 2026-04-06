"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

export function HomeResultsCta() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
        aria-hidden
      >
        <motion.div
          className="absolute -left-1/4 top-0 h-64 w-[150%] rounded-full bg-gradient-to-r from-accent/20 via-transparent to-accent/15 blur-3xl"
          animate={
            reduce
              ? undefined
              : {
                  x: [0, 24, 0],
                  opacity: [0.35, 0.55, 0.35],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -16 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Proof of work
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              See what your vehicle can look like after one appointment
            </h2>
            <p className="mt-4 text-muted">
              Browse real client photos and detail clips from Seattle Shine
              appointments. We keep the gallery live through Instagram and a
              curated local portfolio fallback.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
                <Link
                  href="/gallery"
                  className="inline-flex rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground shadow-glow"
                >
                  View gallery
                </Link>
              </motion.div>
              <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-border px-8 py-3 text-sm font-semibold text-foreground transition hover:bg-surface"
                >
                  @{site.instagramHandle}
                </a>
              </motion.div>
            </div>
          </motion.div>
          <motion.ul
            className="grid grid-cols-2 gap-3 sm:gap-4"
            initial={reduce ? false : { opacity: 0, x: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            {[
              "Before / after stills",
              "Real local appointments",
              "Interior + exterior proof",
              "Updated portfolio",
            ].map((label, i) => (
              <motion.li
                key={label}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: reduce ? 0 : 0.1 + i * 0.06, duration: 0.35 }}
                whileHover={reduce ? undefined : { y: -4 }}
                className="flex aspect-[4/3] items-end rounded-2xl border border-border/80 bg-gradient-to-br from-surface/80 to-background p-4 shadow-sm"
              >
                <span className="text-sm font-medium text-foreground">{label}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
