"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/container";
import { HeroVideoBackdrop } from "@/components/hero-video-backdrop";
import { contactHref } from "@/lib/tracking-links";

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
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[78svh] overflow-hidden sm:min-h-[85vh]"
    >
      <div className="absolute inset-0 z-0">
        <HeroVideoBackdrop />
      </div>
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "var(--hero-scrim)" }}
      />
      <Container className="relative z-[2] flex min-h-[78svh] flex-col justify-center py-16 sm:min-h-[85vh] sm:py-24">
        <motion.div
          style={{ y: contentY }}
          variants={reduce ? undefined : container}
          initial={reduce ? { opacity: 0, y: 20 } : "hidden"}
          animate={reduce ? { opacity: 1, y: 0 } : "show"}
          transition={
            reduce ? { duration: 0.45, ease: "easeOut" } : undefined
          }
          className="max-w-3xl space-y-6 sm:space-y-7"
        >
          <motion.p
            variants={reduce ? undefined : item}
            className="w-fit rounded-full border border-white/20 bg-black/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4ddbb] backdrop-blur-sm"
          >
            Everett to Renton · Mobile + Drop-Off
          </motion.p>
          <motion.h1
            variants={reduce ? undefined : item}
            className="font-display text-4xl font-semibold leading-[0.98] tracking-tight text-[#faf6ef] sm:text-6xl lg:text-7xl"
          >
            Seattle's premium detail without the guesswork.
          </motion.h1>
          <motion.p
            variants={reduce ? undefined : item}
            className="max-w-2xl text-base leading-relaxed text-[#efe4d3] sm:text-xl"
          >
            Deep interior reset. Glossy, protected paint. Honest quote based on
            your vehicle condition and size. Trusted by repeat clients across
            King and Snohomish County.
          </motion.p>
          <motion.ul
            variants={reduce ? undefined : item}
            className="grid max-w-2xl gap-2 text-sm text-[#e6d6bf] sm:grid-cols-3"
          >
            <li className="rounded-xl border border-white/15 bg-black/25 px-3 py-2">
              30+ vehicles detailed
            </li>
            <li className="rounded-xl border border-white/15 bg-black/25 px-3 py-2">
              3rd year in business
            </li>
            <li className="rounded-xl border border-white/15 bg-black/25 px-3 py-2">
              Fast quote turnaround
            </li>
          </motion.ul>
          <motion.div
            variants={reduce ? undefined : item}
            className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap"
          >
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link
                href={contactHref({
                  source: "homepage",
                  content: "hero_primary",
                  packageId: "limited-protection",
                })}
                className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-accent px-9 py-4 text-center text-base font-semibold text-accent-foreground shadow-glow transition hover:brightness-110"
              >
                Get a free quote
              </Link>
            </motion.div>
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link
                href={contactHref({
                  source: "homepage",
                  content: "hero_secondary",
                })}
                className="inline-flex min-w-[160px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-center text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Book now
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
