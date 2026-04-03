import Link from "next/link";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Book" },
] as const;

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md",
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
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-110 sm:inline-flex"
          >
            Book now
          </Link>
        </div>
      </Container>
      <nav
        className="flex border-t border-border/40 px-2 pb-2 md:hidden"
        aria-label="Mobile"
      >
        <div className="flex w-full justify-between gap-1 overflow-x-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-lg px-2 py-2 text-xs font-medium text-muted"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
