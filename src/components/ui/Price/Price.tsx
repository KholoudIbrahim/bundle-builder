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
  const isFree = currentPrice === 0;
  const currentLabel = isFree
    ? "FREE"
    : `${formatCurrency(currentPrice)}${billingLabel ?? ""}`;

  return (
    <div className={cn("text-right", className)}>
      {compareAtPrice != null && compareAtPrice > 0 ? (
        <p
          className={cn(
            "text-sm leading-none line-through",
            compareTone === "sale" ? "text-[#e0352c]" : "text-[#6F7882]",
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
          isFree && "text-[var(--color-success)] tracking-[0.02em]",
          !isFree && tone === "accent" && "text-[var(--color-primary)]",
          !isFree && tone === "default" && "text-[var(--color-text)]",
          size === "sm" ? "text-[0.84rem]" : "text-[0.94rem]",
        )}
      >
        {currentLabel}
      </p>
    </div>
  );
}
