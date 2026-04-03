"use client";

import { useActionState, useEffect } from "react";
import { submitContact } from "@/app/actions/contact";
import {
  contactInitialState,
  type ContactState,
} from "@/lib/contact-form-state";
import { ADD_ON_OPTIONS } from "@/lib/packages";

const packageChoices = [
  { value: "", label: "Select a package" },
  {
    value: "limited-protection",
    label: "Full Detail Limited Protection",
  },
  {
    value: "ultimate-protection",
    label: "Full Detail Ultimate Protection",
  },
] as const;

export function ContactForm({
  defaultPackage = "",
  defaultAddOnIds = [],
}: {
  defaultPackage?: string;
  /** Pre-check add-ons from e.g. `?addOn=carpet-shampoo` */
  defaultAddOnIds?: string[];
}) {
  const defaultAddOnSet = new Set(defaultAddOnIds);

  const [state, formAction, pending] = useActionState<
    ContactState,
    FormData
  >(submitContact, contactInitialState);

  useEffect(() => {
    if (state.ok && state.message) {
      const el = document.getElementById("contact-status");
      el?.focus();
    }
  }, [state.ok, state.message]);

  return (
    <form action={formAction} className="mx-auto max-w-xl space-y-6">
      <div
        id="contact-status"
        tabIndex={-1}
        className={
          state.message
            ? state.ok
              ? "rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground outline-none"
              : "rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm outline-none"
            : "sr-only"
        }
        aria-live="polite"
      >
        {state.message}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">Name</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-accent/30 placeholder:text-muted focus:ring-2"
          />
        </label>
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-foreground">Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-accent/30 placeholder:text-muted focus:ring-2"
          />
        </label>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">Phone</span>
        <input
          required
          type="tel"
          name="phone"
          autoComplete="tel"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-accent/30 focus:ring-2"
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">Vehicle make &amp; model</span>
        <input
          required
          name="vehicle"
          placeholder="e.g. 2022 Tesla Model Y"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-accent/30 placeholder:text-muted focus:ring-2"
        />
      </label>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-foreground">
          How would you like service?
        </legend>
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="radio"
            name="serviceType"
            value="mobile"
            defaultChecked
            className="size-4 accent-accent"
          />
          <span className="text-muted">
            Mobile at your location — you as the client (we use your water
            &amp; power hookups)
          </span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="radio"
            name="serviceType"
            value="dropoff"
            className="size-4 accent-accent"
          />
          <span className="text-muted">
            Drop-off at my home — Seattle Shine owner (by appointment)
          </span>
        </label>
      </fieldset>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">Package</span>
        <select
          required
          name="package"
          defaultValue={
            defaultPackage === "limited-protection" ||
            defaultPackage === "ultimate-protection"
              ? defaultPackage
              : ""
          }
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-accent/30 focus:ring-2"
        >
          {packageChoices.map((p) => (
            <option
              key={p.value || "empty"}
              value={p.value}
              disabled={p.value === ""}
            >
              {p.label}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-foreground">
          Add-ons <span className="font-normal text-muted">(optional)</span>
        </legend>
        <p className="text-xs text-muted">
          Select any extras you want layered on your detail.
        </p>
        <ul className="space-y-2">
          {ADD_ON_OPTIONS.map((o) => (
            <li key={o.id}>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
                <input
                  type="checkbox"
                  name="addOn"
                  value={o.id}
                  defaultChecked={defaultAddOnSet.has(o.id)}
                  className="mt-0.5 size-4 shrink-0 accent-accent"
                />
                <span>{o.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-foreground">Notes (optional)</span>
        <textarea
          name="notes"
          rows={4}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none ring-accent/30 placeholder:text-muted focus:ring-2"
          placeholder="Parking, timing, condition, pet hair, etc."
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent py-3.5 text-center text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-110 disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {pending ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
