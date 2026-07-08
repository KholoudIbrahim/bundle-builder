import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../../lib/cn";

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  className,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-[8px] font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-45",
        variant === "primary" &&
          "bg-[var(--color-primary)] text-white shadow-[0_16px_30px_rgba(81,55,224,0.24)] hover:bg-[var(--color-primary-hover)]",
        variant === "outline" &&
          "border-2 border-[var(--color-primary)] font-bold text-[var(--color-primary)] hover:bg-[color:color-mix(in_oklab,var(--color-primary)_8%,white)]",
        variant === "ghost" &&
          "text-[var(--color-text-muted)] underline-offset-4 hover:text-[var(--color-text)] hover:underline",
        size === "sm" && "min-h-8 px-3 text-sm",
        size === "md" && "min-h-10 px-4 text-base",
        size === "lg" && "min-h-10 px-6 text-base",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
