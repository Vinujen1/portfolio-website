"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-6xl flex-col justify-center px-5 py-24 md:px-8">
      <p className="font-mono text-sm text-warn">Something went wrong</p>
      <h1 className="type-h2 mt-6 max-w-[18ch]">This section failed to load.</h1>
      <p className="type-lead mt-6 max-w-[48ch]">It&apos;s on my side, not yours. Trying again usually fixes it.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-10 inline-flex h-12 w-fit items-center gap-2.5 rounded-full bg-accent px-6 font-medium text-on-accent"
      >
        <RotateCcw className="size-4" aria-hidden />
        Try again
      </button>
    </section>
  );
}
