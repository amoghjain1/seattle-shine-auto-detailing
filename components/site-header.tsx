"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { contactHref } from "@/lib/tracking-links";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/areas", label: "Areas" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Book" },
] as const;

export function SiteHeader({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300",
        scrolled
          ? "border-border/80 bg-background/92 shadow-sm"
          : "border-border/60 bg-background/80",
        className,
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl"
        >
          {site.shortName}
          <span className="hidden font-sans text-xs font-normal text-muted sm:inline">
            {" "}
            · Auto Detailing
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <motion.div key={item.href} whileHover={reduce ? undefined : { y: -1 }}>
              <Link
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <motion.div
            className="inline-flex"
            whileHover={reduce ? undefined : { scale: 1.03 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
          >
            <Link
              href={contactHref({
                source: "site_header",
                content: "header_quote_cta",
              })}
              className="rounded-full bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground shadow-glow transition hover:brightness-110 sm:px-4 sm:text-sm"
            >
              Get quote
            </Link>
          </motion.div>
        </div>
      </Container>
      <nav
        className="flex border-t border-border/40 px-2 pb-2 md:hidden"
        aria-label="Mobile"
      >
        <div className="flex w-full justify-between gap-1 overflow-x-auto pt-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-xl px-3 py-2.5 text-xs font-medium transition",
                pathname === item.href
                  ? "bg-surface text-foreground"
                  : "text-muted hover:bg-surface/70 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
