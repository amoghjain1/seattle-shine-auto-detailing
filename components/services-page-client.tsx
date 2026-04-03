"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/container";

export function ServicesHeroMotion({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <section className="border-b border-border/60 bg-surface/20 py-16 sm:py-20">
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
