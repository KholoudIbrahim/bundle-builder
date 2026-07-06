import { Minus, Plus } from "lucide-react";
import { cn } from "../../../lib/cn";

interface QuantityStepperProps {
  className?: string;
  max?: number;
  min?: number;
  onChange: (nextQuantity: number) => void;
  quantity: number;
  size?: "sm" | "md";
}

export function QuantityStepper({
  className,
  max,
  min = 0,
  onChange,
  quantity,
  size = "md",
}: QuantityStepperProps) {
  const decrementDisabled = quantity <= min;
  const incrementDisabled = max != null ? quantity >= max : false;
  const buttonSize = size === "sm" ? "h-5 w-5" : "h-[1.38rem] w-[1.38rem]";
  const iconSize = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <button
        aria-label="Decrease quantity"
        className={cn(
          "inline-flex items-center justify-center rounded-[4px] border border-[#d9e1ea] bg-[#f7fbff] text-[#7b8797] transition hover:border-[#b7c2d0] hover:text-[var(--color-text)] disabled:cursor-not-allowed disabled:bg-white disabled:text-[#cbd5e1]",
          buttonSize,
        )}
        disabled={decrementDisabled}
        onClick={() => onChange(quantity - 1)}
        type="button"
      >
        <Minus className={iconSize} strokeWidth={2} />
      </button>
      <span
        aria-live="polite"
        className={cn(
          "w-4 text-center font-medium text-[var(--color-text)]",
          size === "sm" ? "text-[0.78rem]" : "text-[0.9rem]",
        )}
      >
        {quantity}
      </span>
      <button
        aria-label="Increase quantity"
        className={cn(
          "inline-flex items-center justify-center rounded-[4px] border border-[#d9e1ea] bg-[#eef4fa] text-[#7b8797] transition hover:border-[#b7c2d0] hover:text-[var(--color-text)] disabled:cursor-not-allowed disabled:bg-white disabled:text-[#cbd5e1]",
          buttonSize,
        )}
        disabled={incrementDisabled}
        onClick={() => onChange(quantity + 1)}
        type="button"
      >
        <Plus className={iconSize} strokeWidth={2} />
      </button>
    </div>
  );
}
