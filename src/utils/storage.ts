import { BUNDLE_STORAGE_KEY } from "../constants/storage";
import type { BundleData, BundleState, StepId } from "../types/bundle";
import {
  clampQuantity,
  createInitialBundleState,
  findVariantOwner,
  normalizeSingleSelectionSteps,
} from "./bundleCalculations";

function isStepId(data: BundleData, value: unknown): value is StepId {
  return (
    typeof value === "string" &&
    data.steps.some((step) => step.id === value)
  );
}

export function saveBundleState(state: BundleState) {
  window.localStorage.setItem(BUNDLE_STORAGE_KEY, JSON.stringify(state));
}

export function loadBundleState(data: BundleData) {
  const rawValue = window.localStorage.getItem(BUNDLE_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<BundleState>;
    const initialState = createInitialBundleState(data);

    if (
      parsed.selectedVariantByProduct == null ||
      parsed.quantitiesPerVariant == null
    ) {
      return null;
    }

    const nextState: BundleState = {
      ...initialState,
      currentStepId: isStepId(data, parsed.currentStepId)
        ? parsed.currentStepId
        : initialState.currentStepId,
      savedBundle: true,
    };

    for (const product of data.products) {
      const allowedVariantIds = new Set(product.variants.map((variant) => variant.id));
      const candidateVariantId = parsed.selectedVariantByProduct[product.id];

      nextState.selectedVariantByProduct[product.id] = allowedVariantIds.has(
        candidateVariantId,
      )
        ? candidateVariantId
        : product.defaultVariantId;
    }

    for (const [variantId, candidateQuantity] of Object.entries(
      parsed.quantitiesPerVariant,
    )) {
      const owner = findVariantOwner(data, variantId);

      if (!owner || typeof candidateQuantity !== "number") {
        continue;
      }

      nextState.quantitiesPerVariant[variantId] = clampQuantity(
        owner.product,
        candidateQuantity,
      );
    }

    return normalizeSingleSelectionSteps(data, nextState);
  } catch {
    return null;
  }
}
