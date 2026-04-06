"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { contactHref } from "@/lib/tracking-links";

export function MobileBookingBar() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.35 }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_36px_-14px_rgba(0,0,0,0.22)] backdrop-blur-md md:hidden"
    >
      <div className="mx-auto max-w-lg">
        <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          Fast quote response
        </p>
      </div>
      <div className="mx-auto flex max-w-lg gap-2">
        <motion.a
          href={`tel:${site.phoneTel}`}
          className="flex flex-1 items-center justify-center rounded-full border border-border py-3.5 text-sm font-semibold text-foreground"
          whileTap={reduce ? undefined : { scale: 0.98 }}
        >
          Call now
        </motion.a>
        <motion.div className="flex-[1.2]" whileTap={reduce ? undefined : { scale: 0.98 }}>
          <Link
            href={contactHref({
              source: "mobile_sticky_bar",
              content: "mobile_quote_cta",
            })}
            className="flex w-full items-center justify-center rounded-full bg-accent py-3.5 text-sm font-semibold text-accent-foreground shadow-glow"
          >
            Get free quote
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
