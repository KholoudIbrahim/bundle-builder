import type { PropsWithChildren } from "react";
import { cn } from "../../../lib/cn";

interface BadgeProps extends PropsWithChildren {
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[var(--color-primary)] px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.01em] text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
