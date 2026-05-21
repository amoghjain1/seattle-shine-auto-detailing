import type { Metadata } from "next";
import { Container } from "@/components/container";

const spotsAvailable = 5;

const learningItems = [
  "Pricing strategy",
  "Client communication",
  "Scheduling",
  "Day-to-day operations",
  "Marketing and social media",
];

const applicantTraits = [
  "Rising junior or senior in high school",
  "Interested in business, entrepreneurship, STEM, or computer science",
  "Reliable, curious, and professional",
];

const howItWorksSteps = ["Apply", "Get selected", "Shadow for 2 weeks"];

const applicationMailto =
  "mailto:seattleshine1@gmail.com?subject=Seattle%20Shine%20Internship%20Application";

export const metadata: Metadata = {
  title: "Internship",
  description:
    "Apply for Seattle Shine's 2-week internship shadowing opportunity for rising juniors and seniors.",
};

export default function InternshipPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-surface/20 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Internship opportunity
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Now Accepting Interns at Seattle Shine
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              A 2-week shadowing experience for rising juniors &amp; seniors
              interested in business, STEM, or computer science
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#apply"
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-110 sm:w-auto"
              >
                Apply Now
              </a>
              <p className="inline-flex w-fit rounded-full border border-border/70 bg-surface/40 px-4 py-2 text-sm font-medium text-foreground">
                {spotsAvailable} spots available
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              About the opportunity
            </h2>
            <p className="mt-4 max-w-3xl text-muted">
              This internship is unpaid and educational. You will shadow how
              Seattle Shine runs day to day, and there is no detailing work
              involved.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {learningItems.map((item) => (
                <article
                  key={item}
                  className="glass-card rounded-2xl border border-border/60 p-5"
                >
                  <p className="font-medium text-foreground">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Who should apply
            </h2>
            <ul className="mt-6 space-y-3">
              {applicantTraits.map((trait) => (
                <li
                  key={trait}
                  className="rounded-xl border border-border/60 bg-surface/25 px-4 py-3 text-muted"
                >
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-b border-border/60 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              How it works
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {howItWorksSteps.map((step, index) => (
                <article
                  key={step}
                  className="rounded-2xl border border-border/60 bg-surface/30 p-6"
                >
                  <p className="text-sm font-semibold tracking-wide text-accent">
                    0{index + 1}
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold text-foreground">
                    {step}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="apply" className="scroll-mt-28 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-4xl rounded-3xl border border-border/70 bg-surface/40 p-8 sm:p-10">
            <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
              Apply
            </h2>
            <p className="mt-4 text-muted">
              Send an email to seattleshine1@gmail.com introducing yourself, your
              grade, and why you&apos;re interested. We&apos;ll get back to you
              within a few days.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={applicationMailto}
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-110 sm:w-auto"
              >
                Email Application
              </a>
              <p className="text-sm text-muted">
                {spotsAvailable} of {spotsAvailable} spots remaining
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border/60 py-8">
        <Container>
          <p className="text-center text-sm text-muted">
            @seattleshinewa · seattleshinewa.com · seattleshine1@gmail.com
          </p>
        </Container>
      </section>
    </>
  );
}
