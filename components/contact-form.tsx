"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { submitContact } from "@/app/actions/contact";
import {
  contactInitialState,
  type ContactState,
} from "@/lib/contact-form-state";
import { packages, ADD_ON_OPTIONS } from "@/lib/packages";

const TOTAL_STEPS = 3;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-xs font-semibold text-muted">
        <span>Step {step} of {TOTAL_STEPS}</span>
        <span className="text-accent">{Math.round((step / TOTAL_STEPS) * 100)}%</span>
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border/60">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={false}
          animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function ContactForm({
  defaultPackage = "",
  defaultAddOnIds = [],
  attribution = {},
}: {
  defaultPackage?: string;
  defaultAddOnIds?: string[];
  attribution?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
  };
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Step 1 state
  const [vehicle, setVehicle] = useState("");
  const [serviceType, setServiceType] = useState<"mobile" | "dropoff">("mobile");
  const [selectedPkg, setSelectedPkg] = useState(
    defaultPackage === "limited-protection" || defaultPackage === "ultimate-protection"
      ? defaultPackage
      : "",
  );

  // Step 2 state
  const defaultAddOnSet = new Set(defaultAddOnIds);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(defaultAddOnSet);

  // Step 3 state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    contactInitialState,
  );

  useEffect(() => {
    if (state.ok) {
      router.push("/thank-you");
      return;
    }
    if (state.message) {
      const el = document.getElementById("contact-status");
      el?.focus();
    }
  }, [router, state.ok, state.message]);

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const canAdvanceStep1 = vehicle.trim().length > 0 && selectedPkg !== "";
  const canSubmitStep3 = name.trim().length > 0 && email.trim().length > 0 && phone.trim().length > 0;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = () => {
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    formAction(fd);
  };

  return (
    <div className="mx-auto max-w-xl">
      <ProgressBar step={step} />

      <div
        id="contact-status"
        tabIndex={-1}
        className={
          state.message
            ? state.ok
              ? "mb-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground outline-none"
              : "mb-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm outline-none"
            : "sr-only"
        }
        aria-live="polite"
      >
        {state.message}
      </div>

      {/* Hidden form for actual submission */}
      <form ref={formRef} action={formAction} className="hidden">
        <input name="name" value={name} readOnly />
        <input name="email" value={email} readOnly />
        <input name="phone" value={phone} readOnly />
        <input name="vehicle" value={vehicle} readOnly />
        <input name="serviceType" value={serviceType} readOnly />
        <input name="package" value={selectedPkg} readOnly />
        {Array.from(selectedAddOns).map((id) => (
          <input key={id} name="addOn" value={id} readOnly />
        ))}
        <input name="notes" value={notes} readOnly />
        <input name="utm_source" value={attribution.utmSource ?? ""} readOnly />
        <input name="utm_medium" value={attribution.utmMedium ?? ""} readOnly />
        <input name="utm_campaign" value={attribution.utmCampaign ?? ""} readOnly />
        <input name="utm_content" value={attribution.utmContent ?? ""} readOnly />
      </form>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={reduce ? undefined : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Your vehicle
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                  Tell us what you drive
                </h3>
              </div>

              <label className="block space-y-2 text-sm">
                <span className="font-medium text-foreground">Vehicle make & model</span>
                <input
                  required
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  placeholder="e.g. 2022 Tesla Model Y"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-accent/30 placeholder:text-muted focus:ring-2"
                />
              </label>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Service type</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {([
                    { value: "mobile" as const, label: "Mobile", desc: "We come to your location" },
                    { value: "dropoff" as const, label: "Drop-off", desc: "At our Bothell home base" },
                  ]).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setServiceType(opt.value)}
                      className={`rounded-2xl p-4 text-left transition ${
                        serviceType === opt.value
                          ? "glass-card-accent ring-1 ring-accent/40"
                          : "glass-card hover:border-accent/30"
                      }`}
                    >
                      <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                      <p className="mt-1 text-xs text-muted">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Choose a package</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {packages.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPkg(p.id)}
                      className={`rounded-2xl p-4 text-left transition ${
                        selectedPkg === p.id
                          ? "glass-card-accent ring-1 ring-accent/40"
                          : "glass-card hover:border-accent/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{p.name}</p>
                        {p.featured && (
                          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                            Best value
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-muted">{p.subtitle}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={!canAdvanceStep1}
                  onClick={goNext}
                  className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-110 disabled:opacity-40"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={reduce ? undefined : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Add-ons
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                  Layer extras on your detail
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {selectedAddOns.size} selected &middot; optional
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {ADD_ON_OPTIONS.map((opt) => {
                  const active = selectedAddOns.has(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleAddOn(opt.id)}
                      className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                        active
                          ? "bg-accent text-accent-foreground shadow-glow"
                          : "glass-card text-foreground hover:border-accent/30"
                      }`}
                    >
                      {active ? "\u2713 " : ""}{opt.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-110"
                >
                  {selectedAddOns.size === 0 ? "Skip" : "Continue"}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={reduce ? undefined : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Your details
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                  Almost there &mdash; let us reach you
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2 text-sm">
                  <span className="font-medium text-foreground">Name</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-accent/30 placeholder:text-muted focus:ring-2"
                  />
                </label>
                <label className="block space-y-2 text-sm">
                  <span className="font-medium text-foreground">Email</span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-accent/30 placeholder:text-muted focus:ring-2"
                  />
                </label>
              </div>

              <label className="block space-y-2 text-sm">
                <span className="font-medium text-foreground">Phone</span>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="(425) 555-1234"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-accent/30 placeholder:text-muted focus:ring-2"
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium text-foreground">Notes (optional)</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-accent/30 placeholder:text-muted focus:ring-2"
                  placeholder="Parking, timing, condition, pet hair, etc."
                />
              </label>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={pending || !canSubmitStep3}
                  onClick={handleSubmit}
                  className="rounded-full bg-accent px-10 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-110 disabled:opacity-50"
                >
                  {pending ? "Sending..." : "Get my free quote"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
