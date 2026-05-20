"use client";

import { useEffect, useState } from "react";

export function EndOfSchoolYearNotice() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const dismiss = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-2xl">
        <h2 className="font-display text-2xl text-foreground">Availability Update</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          With the school year coming to an end, Seattle Shine is not taking new clients
          until after June 13. Feel free to get a quote now, but all appointments will be
          scheduled after that date.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="mt-5 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
