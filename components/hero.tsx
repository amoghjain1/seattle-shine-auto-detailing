"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";
import { HeroVideoBackdrop } from "@/components/hero-video-backdrop";
import { site } from "@/lib/site";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HeroVideoBackdrop />
      </div>
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "var(--hero-scrim)" }}
      />
      <Container className="relative z-[2] flex min-h-[85vh] flex-col justify-center py-24">
        <motion.div
          variants={reduce ? undefined : container}
          initial={reduce ? { opacity: 0, y: 20 } : "hidden"}
          animate={reduce ? { opacity: 1, y: 0 } : "show"}
          transition={
            reduce ? { duration: 0.45, ease: "easeOut" } : undefined
          }
          className="max-w-3xl space-y-8"
        >
          <motion.p
            variants={reduce ? undefined : item}
            className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
          >
            Based in Bothell · Greater Seattle
          </motion.p>
          <motion.h1
            variants={reduce ? undefined : item}
            className="font-display text-4xl font-semibold leading-tight tracking-tight text-[#faf6ef] sm:text-5xl lg:text-6xl"
          >
            {site.tagline}
          </motion.h1>
          <motion.p
            variants={reduce ? undefined : item}
            className="max-w-xl text-lg leading-relaxed text-[#e8e0d4] sm:text-xl"
          >
            {site.description}
          </motion.p>
          <motion.div
            variants={reduce ? undefined : item}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-center text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-110"
              >
                Book your detail
              </Link>
            </motion.div>
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link
                href="/contact?package=limited-protection"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Get a free quote
              </Link>
            </motion.div>
            <motion.div
              whileHover={reduce ? undefined : { x: 3 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-center text-sm font-semibold text-white/90 underline-offset-4 hover:underline"
              >
                View services →
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
