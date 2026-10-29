import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="relative isolate mx-auto flex min-h-[70dvh] max-w-6xl flex-col justify-center px-5 py-24 md:px-8">
      <div aria-hidden className="grid-field absolute inset-0 -z-10 opacity-50" />
      <p className="font-mono text-sm text-accent">404 · target not found</p>
      <h1 className="type-display mt-6 max-w-[14ch] text-balance">This page isn&apos;t in the world model.</h1>
      <p className="type-lead mt-6 max-w-[48ch]">The link may be old or mistyped. Everything that exists is reachable from the home page.</p>
      <div className="mt-10">
        <ButtonLink href="/" icon={<ArrowLeft className="size-4" aria-hidden />} className="flex-row-reverse">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
