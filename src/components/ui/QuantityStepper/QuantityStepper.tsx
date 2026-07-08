import { Minus, Plus } from "lucide-react";
import { cn } from "../../../lib/cn";

interface QuantityStepperProps {
  className?: string;
  max?: number;
  min?: number;
  onChange: (nextQuantity: number) => void;
  quantity: number;
  size?: "sm" | "md";
  variant?: "default" | "flat";
}

export function QuantityStepper({
  className,
  max,
  min = 0,
  onChange,
  quantity,
  size = "md",
  variant = "default",
}: QuantityStepperProps) {
  const decrementDisabled = quantity <= min;
  const incrementDisabled = max != null ? quantity >= max : false;
  const buttonSize = size === "sm" ? "h-5 w-5" : "h-[1.38rem] w-[1.38rem]";
  const iconSize = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";
  const isFlat = variant === "flat";

  return (
    <div className={cn("inline-flex items-center", isFlat ? "gap-[10px]" : "gap-2", className)}>
      <button
        aria-label="Decrease quantity"
        className={cn(
          "inline-flex items-center justify-center rounded-[4px] transition disabled:cursor-not-allowed",
          isFlat
            ? "bg-white text-[#575757] hover:bg-[#f1f1f2] disabled:border disabled:border-[#CED6DE] disabled:bg-[#F1F1F2] disabled:text-[#575757]"
            : "border border-[#d9e1ea] bg-[#eef4fa] text-[#7b8797] hover:border-[#b7c2d0] hover:text-[var(--color-text)] disabled:bg-white disabled:text-[#cbd5e1]",
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
          "text-center",
          isFlat
            ? "w-2 text-[14px] font-semibold leading-[16px] text-[#0B0D10]"
            : cn("w-4 font-medium text-[var(--color-text)]", size === "sm" ? "text-[0.78rem]" : "text-[0.9rem]"),
        )}
      >
        {quantity}
      </span>
      <button
        aria-label="Increase quantity"
        className={cn(
          "inline-flex items-center justify-center rounded-[4px] transition disabled:cursor-not-allowed",
          isFlat
            ? "bg-white text-[#575757] hover:bg-[#f1f1f2] disabled:border disabled:border-[#CED6DE] disabled:bg-[#F1F1F2] disabled:text-[#575757]"
            : "border border-[#d9e1ea] bg-[#eef4fa] text-[#7b8797] hover:border-[#b7c2d0] hover:text-[var(--color-text)] disabled:bg-white disabled:text-[#cbd5e1]",
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
