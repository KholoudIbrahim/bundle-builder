import { cn } from "../../../lib/cn";
import { formatCurrency } from "../../../utils/formatCurrency";

interface PriceProps {
  billingLabel?: string;
  className?: string;
  compareTone?: "muted" | "sale";
  compareAtPrice?: number | null;
  currentPrice: number;
  size?: "sm" | "md";
  tone?: "default" | "accent";
}

export function Price({
  billingLabel,
  className,
  compareTone = "muted",
  compareAtPrice,
  currentPrice,
  size = "md",
  tone = "default",
}: PriceProps) {
  const currentLabel =
    currentPrice === 0 ? "FREE" : `${formatCurrency(currentPrice)}${billingLabel ?? ""}`;

  return (
    <div className={cn("text-right", className)}>
      {compareAtPrice != null && compareAtPrice > 0 ? (
        <p
          className={cn(
            "text-sm leading-none line-through",
            compareTone === "muted"
              ? "text-[var(--color-text-muted)]"
              : "text-[#e0352c]",
            size === "sm" && "text-[0.78rem]",
          )}
        >
          {formatCurrency(compareAtPrice)}
          {billingLabel ?? ""}
        </p>
      ) : null}
      <p
        className={cn(
          "mt-1 font-semibold leading-none",
          tone === "default" && "text-[var(--color-text)]",
          tone === "accent" && "text-[var(--color-primary)]",
          size === "sm" ? "text-[0.84rem]" : "text-[0.94rem]",
          currentPrice === 0 && "tracking-[0.02em]",
        )}
      >
        {currentLabel}
      </p>
    </div>
  );
}
