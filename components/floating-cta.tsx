"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useReducedMotion,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { contactHref } from "@/lib/tracking-links";
import { site } from "@/lib/site";

export function FloatingCta() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.08);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 hidden items-center gap-3 rounded-full px-5 py-3 shadow-lg md:flex glass-card"
        >
          <a
            href={`tel:${site.phoneTel}`}
            className="text-xs font-semibold text-muted transition hover:text-foreground"
          >
            {site.phoneDisplay}
          </a>
          <Link
            href={contactHref({
              source: "floating_cta",
              content: "desktop_floating_pill",
            })}
            className="rounded-full bg-accent px-5 py-2 text-xs font-semibold text-accent-foreground shadow-glow transition hover:brightness-110"
          >
            Get a free quote
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
