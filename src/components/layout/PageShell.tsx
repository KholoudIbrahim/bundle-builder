import { useLayoutEffect, useRef } from "react";
import { useBundle } from "../../hooks/useBundle";
import { AccordionSection } from "../accordion/AccordionSection";
import { BuilderSection } from "../builder/BuilderSection";
import { ReviewPanel } from "../review/ReviewPanel";
import type { StepId } from "../../types/bundle";
import { calculateSelectedCountForStep } from "../../utils/bundleCalculations";

type StepChangeMode = "anchor" | "reveal";

interface PendingStepChange {
  desiredTop: number;
  mode: StepChangeMode;
  stepId: StepId;
}

const STEP_SCROLL_OFFSET = 16;
const STEP_TRANSITION_DURATION_MS = 360;

export function PageShell() {
  const { data, setCurrentStep, state } = useBundle();
  const stepRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const pendingStepChangeRef = useRef<PendingStepChange | null>(null);

  useLayoutEffect(() => {
    const pendingStepChange = pendingStepChangeRef.current;

    if (!pendingStepChange || pendingStepChange.stepId !== state.currentStepId) {
      return;
    }

    const activeStepElement = stepRefs.current[pendingStepChange.stepId];

    if (!activeStepElement) {
      pendingStepChangeRef.current = null;
      return;
    }

    let frameId = 0;
    const startedAt = performance.now();
    const desiredTop = pendingStepChange.desiredTop;

    const syncStepPosition = () => {
      const rect = activeStepElement.getBoundingClientRect();
      const delta = rect.top - desiredTop;

      if (Math.abs(delta) > 1) {
        window.scrollBy(0, delta);
      }

      if (performance.now() - startedAt < STEP_TRANSITION_DURATION_MS) {
        frameId = window.requestAnimationFrame(syncStepPosition);
        return;
      }

      pendingStepChangeRef.current = null;
    };

    frameId = window.requestAnimationFrame(syncStepPosition);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [state.currentStepId]);

  const changeStep = (stepId: StepId, mode: StepChangeMode) => {
    if (stepId === state.currentStepId) {
      return;
    }

    const targetElement = stepRefs.current[stepId];

    pendingStepChangeRef.current = {
      desiredTop:
        mode === "anchor"
          ? targetElement?.getBoundingClientRect().top ?? STEP_SCROLL_OFFSET
          : STEP_SCROLL_OFFSET,
      mode,
      stepId,
    };

    setCurrentStep(stepId);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-[86rem] px-3 py-6 sm:px-5 md:px-8 md:py-10">
      <header className="mb-6 text-center md:mb-8 xl:hidden">
        <h1 className="text-[2rem] font-bold leading-none tracking-[-0.06em] text-[var(--color-text)] sm:text-[2.35rem] md:text-[3rem]">
          Let's get started!
        </h1>
      </header>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_24rem] xl:items-start">
        <section aria-label="Bundle builder">
          {data.steps.map((step, index) => {
            const stepProducts = data.products.filter(
              (product) => product.stepId === step.id,
            );
            const nextStep = data.steps[index + 1];

            return (
              <div
                key={step.id}
                ref={(element) => {
                  stepRefs.current[step.id] = element;
                }}
              >
                <AccordionSection
                  isExpanded={state.currentStepId === step.id}
                  onToggle={() => changeStep(step.id, "anchor")}
                  selectedCount={calculateSelectedCountForStep(step, data, state)}
                  step={step}
                >
                  <BuilderSection
                    onNextStep={
                      nextStep ? () => changeStep(nextStep.id, "reveal") : undefined
                    }
                    products={stepProducts}
                    step={step}
                  />
                </AccordionSection>
              </div>
            );
          })}
        </section>
        <ReviewPanel />
      </div>
    </main>
  );
}
