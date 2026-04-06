"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/container";
import { HeroVideoBackdrop } from "@/components/hero-video-backdrop";
import { contactHref } from "@/lib/tracking-links";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 z-[3] -translate-x-1/2"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50">
          Scroll
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-white/40"
        >
          <path
            d="M10 4v10m0 0l-4-4m4 4l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <HeroVideoBackdrop />
      </div>
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "var(--hero-scrim)" }}
      />
      {/* Bottom vignette for cinematic fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{
          background:
            "linear-gradient(to top, var(--background) 0%, transparent 100%)",
        }}
      />

      <Container className="relative z-[2] flex min-h-[100svh] flex-col justify-center py-20 sm:py-28">
        <motion.div
          style={{ y: contentY, willChange: "transform" }}
          variants={reduce ? undefined : container}
          initial={reduce ? { opacity: 0, y: 20 } : "hidden"}
          animate={reduce ? { opacity: 1, y: 0 } : "show"}
          transition={
            reduce ? { duration: 0.45, ease: "easeOut" } : undefined
          }
          className="max-w-3xl space-y-7 sm:space-y-8"
        >
          <motion.p
            variants={reduce ? undefined : item}
            className="w-fit rounded-full bg-white/[0.06] px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4ddbb] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Everett to Renton · Mobile + Drop-Off
          </motion.p>

          <motion.h1
            variants={reduce ? undefined : item}
            className="font-display text-5xl font-semibold leading-[0.96] tracking-tight text-[#faf6ef] sm:text-7xl lg:text-8xl"
          >
            Seattle&rsquo;s premium detail
            <br />
            <span className="text-accent">without the guesswork.</span>
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : item}
            className="max-w-2xl text-lg leading-relaxed text-[#efe4d3]/90 sm:text-xl"
          >
            Deep interior reset. Glossy, protected paint. Honest quote based on
            your vehicle condition and size. Trusted by repeat clients across
            King and Snohomish County.
          </motion.p>

          <motion.ul
            variants={reduce ? undefined : item}
            className="flex max-w-2xl flex-wrap gap-2.5 text-sm text-[#e6d6bf]"
          >
            {["30+ vehicles detailed", "3rd year in business", "Fast quote turnaround"].map(
              (chip) => (
                <li
                  key={chip}
                  className="rounded-xl bg-white/[0.06] px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {chip}
                </li>
              ),
            )}
          </motion.ul>

          <motion.div
            variants={reduce ? undefined : item}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.04, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <Link
                href={contactHref({
                  source: "homepage",
                  content: "hero_primary",
                  packageId: "limited-protection",
                })}
                className="inline-flex min-w-[230px] items-center justify-center rounded-full bg-accent px-10 py-4.5 text-center text-base font-semibold text-accent-foreground shadow-glow transition hover:brightness-110"
              >
                Get a free quote
              </Link>
            </motion.div>
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.04, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <Link
                href={contactHref({
                  source: "homepage",
                  content: "hero_secondary",
                })}
                className="inline-flex min-w-[170px] items-center justify-center rounded-full bg-white/[0.07] px-9 py-4.5 text-center text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition hover:bg-white/[0.12]"
                style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              >
                Book now
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      {!reduce && (
        <motion.div style={{ opacity: indicatorOpacity }}>
          <ScrollIndicator />
        </motion.div>
      )}
    </section>
  );
}
