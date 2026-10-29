"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type CopyState = "idle" | "copied" | "failed";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = window.setTimeout(() => setState("idle"), 2200);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      // Clipboard needs a secure context and permission; say so instead of pretending it worked.
      setState("failed");
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line-strong px-5 text-[0.9375rem] transition-colors hover:border-text/60 hover:bg-surface-2"
    >
      {state === "copied" ? <Check className="size-4 text-ok" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      {state === "copied" ? "Copied" : state === "failed" ? "Couldn't copy, select it instead" : "Copy email"}
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? "Email address copied to clipboard" : state === "failed" ? "Copy failed" : ""}
      </span>
    </button>
  );
}
