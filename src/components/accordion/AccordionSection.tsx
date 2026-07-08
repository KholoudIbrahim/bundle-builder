import type { ReactNode } from "react";
import { Camera, ChevronDown, Radio, Shield, Sparkles } from "lucide-react";
import { cn } from "../../lib/cn";
import type { BundleStep } from "../../types/bundle";

interface AccordionSectionProps {
  children?: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  selectedCount: number;
  step: BundleStep;
}

const iconMap = {
  camera: Camera,
  shield: Shield,
  radio: Radio,
  sparkles: Sparkles,
  truck: Shield,
} as const;

export function AccordionSection({
  children,
  isExpanded,
  onToggle,
  selectedCount,
  step,
}: AccordionSectionProps) {
  const StepIcon = iconMap[step.icon];
  const panelId = `${step.id}-panel`;

  return (
    <section
      className={cn(
        "border-t border-[var(--color-border)] py-1",
        step.number === 4 && "border-b",
      )}
    >
      <div
        className={cn(
          "transition duration-200",
          isExpanded &&
            "rounded-[var(--radius-panel)] bg-[var(--color-surface-soft)] px-3.5 pb-4 pt-3 sm:px-4 md:px-5",
        )}
      >
        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
          Step {step.number} of 4
        </p>
        <button
          aria-controls={panelId}
          aria-expanded={isExpanded}
          className="mt-2 flex w-full flex-col items-start gap-3 text-left sm:flex-row sm:items-center sm:justify-between"
          onClick={onToggle}
          type="button"
        >
          <span className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center text-[var(--color-text-muted)]">
              <StepIcon className="h-6 w-6 stroke-[1.6]" />
            </span>
            <span className="min-w-0 flex-1 text-[22px] font-bold leading-none text-[var(--color-obsidian)]">
              {step.title}
            </span>
          </span>
          <span className="flex w-full items-center justify-end gap-2 self-end text-sm font-medium text-[var(--color-primary)] sm:w-auto sm:self-auto">
            <span className="sm:hidden">{selectedCount}</span>
            <span className="hidden sm:inline">{selectedCount} selected</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition duration-200",
                isExpanded && "rotate-180",
              )}
            />
          </span>
        </button>
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
            isExpanded
              ? "mt-3 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0",
          )}
          id={panelId}
        >
          <div className="overflow-hidden">{children}</div>
        </div>
      </div>
    </section>
  );
}
