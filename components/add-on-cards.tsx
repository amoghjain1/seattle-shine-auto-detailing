"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ADD_ON_OPTIONS } from "@/lib/packages";

export function AddOnCards() {
  const reduce = useReducedMotion();

  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
      {ADD_ON_OPTIONS.map((o, i) => (
        <motion.li
          key={o.id}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: reduce ? 0 : i * 0.05, duration: 0.35 }}
          whileHover={reduce ? undefined : { y: -3 }}
          className="flex items-center justify-between gap-4 rounded-2xl border border-border/80 bg-background px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-sm font-medium text-foreground">{o.label}</span>
          <Link
            href={`/contact?addOn=${o.id}`}
            className="shrink-0 rounded-full bg-accent/15 px-4 py-2 text-xs font-semibold text-accent"
          >
            Quote
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
