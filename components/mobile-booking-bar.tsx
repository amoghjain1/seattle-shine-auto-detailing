"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { site } from "@/lib/site";
import { contactHref } from "@/lib/tracking-links";

export function MobileBookingBar() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [pulsed, setPulsed] = useState(false);
  const lastScroll = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const heroThreshold = typeof window !== "undefined" ? window.innerHeight * 0.85 : 600;
    const isDown = y > lastScroll.current;
    const delta = Math.abs(y - lastScroll.current);

    if (delta > 5) {
      setVisible(!isDown || y < 100);
    }

    if (y > heroThreshold && !pastHero) {
      setPastHero(true);
      setPulsed(true);
    }

    lastScroll.current = y;
  });


  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? false : { y: 24, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: pulsed && !reduce ? [1, 1.02, 1] : 1,
          }}
          exit={reduce ? { opacity: 0 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
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
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              Call now
            </motion.a>
            <motion.div className="flex-[1.2]" whileTap={reduce ? undefined : { scale: 0.97 }}>
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
      )}
    </AnimatePresence>
  );
}
