import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "@/components/animations/Magnetic";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:brightness-110",
  secondary: "border border-line-strong text-text hover:border-text/60 hover:bg-surface-2",
  ghost: "text-muted hover:text-text",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
  magnetic?: boolean;
};

export function ButtonLink({ variant = "primary", icon, className, magnetic = true, children, ...props }: ButtonLinkProps) {
  const link = (
    <Link
      className={cn(
        "group inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[0.9375rem] font-medium transition-[background-color,border-color,color,filter] duration-300",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon}
    </Link>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
