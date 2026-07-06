import { bundleData } from "../data/bundle";
import type { BundleAction, BundleState } from "../types/bundle";
import {
  clampQuantity,
  findVariantOwner,
  getProductById,
  normalizeSingleSelectionSteps,
} from "../utils/bundleCalculations";

function clearOtherSelectionsInStep(
  state: BundleState,
  activeVariantId: string,
  stepId: string,
) {
  const nextQuantities = { ...state.quantitiesPerVariant };

  for (const product of bundleData.products) {
    if (product.stepId !== stepId) {
      continue;
    }

    for (const variant of product.variants) {
      if (variant.id !== activeVariantId) {
        nextQuantities[variant.id] = 0;
      }
    }
  }

  return nextQuantities;
}

export function bundleReducer(state: BundleState, action: BundleAction): BundleState {
  switch (action.type) {
    case "set-current-step":
      return {
        ...state,
        currentStepId: action.stepId,
      };
    case "select-variant": {
      const product = getProductById(bundleData, action.productId);

      if (!product) {
        return state;
      }

      return {
        ...state,
        savedBundle: false,
        selectedVariantByProduct: {
          ...state.selectedVariantByProduct,
          [action.productId]: action.variantId,
        },
      };
    }
    case "set-variant-quantity": {
      const owner = findVariantOwner(bundleData, action.variantId);

      if (!owner) {
        return state;
      }

      const quantity = clampQuantity(owner.product, action.quantity);
      let quantitiesPerVariant = {
        ...state.quantitiesPerVariant,
        [action.variantId]: quantity,
      };

      if (owner.product.kind === "plan" && quantity > 0) {
        quantitiesPerVariant = clearOtherSelectionsInStep(
          state,
          action.variantId,
          owner.product.stepId,
        );
        quantitiesPerVariant[action.variantId] = quantity;
      }

      return normalizeSingleSelectionSteps(bundleData, {
        ...state,
        quantitiesPerVariant,
        selectedVariantByProduct: {
          ...state.selectedVariantByProduct,
          [owner.product.id]: action.variantId,
        },
        savedBundle: false,
      });
    }
    case "mark-saved":
      return {
        ...state,
        savedBundle: action.saved,
      };
    default:
      return state;
  }
}
