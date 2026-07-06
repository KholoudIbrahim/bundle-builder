import type {
  BundleData,
  BundleProduct,
  BundleState,
  BundleStep,
  BundleVariant,
  ReviewLineGroup,
  ReviewLineItem,
  StepId,
} from "../types/bundle";

export function getProductById(data: BundleData, productId: string) {
  return data.products.find((product) => product.id === productId);
}

export function getStepById(data: BundleData, stepId: StepId) {
  return data.steps.find((step) => step.id === stepId);
}

export function getVariantById(product: BundleProduct, variantId: string) {
  return product.variants.find((variant) => variant.id === variantId);
}

export function findVariantOwner(
  data: BundleData,
  variantId: string,
): { product: BundleProduct; variant: BundleVariant } | null {
  for (const product of data.products) {
    const variant = getVariantById(product, variantId);

    if (variant) {
      return { product, variant };
    }
  }

  return null;
}

export function getSelectedVariantId(product: BundleProduct, state: BundleState) {
  return state.selectedVariantByProduct[product.id] ?? product.defaultVariantId;
}

export function getVariantQuantity(state: BundleState, variantId: string) {
  return state.quantitiesPerVariant[variantId] ?? 0;
}

export function clampQuantity(product: BundleProduct, quantity: number) {
  const min = product.minQuantity ?? 0;
  const max = product.maxQuantity ?? Number.POSITIVE_INFINITY;

  return Math.max(min, Math.min(max, quantity));
}

export function getProductSelectedQuantity(
  product: BundleProduct,
  state: BundleState,
) {
  return product.variants.reduce(
    (total, variant) => total + getVariantQuantity(state, variant.id),
    0,
  );
}

export function isProductSelected(product: BundleProduct, state: BundleState) {
  return getProductSelectedQuantity(product, state) > 0;
}

export function createInitialBundleState(data: BundleData): BundleState {
  const selectedVariantByProduct: Record<string, string> = {};
  const quantitiesPerVariant: Record<string, number> = {};

  for (const product of data.products) {
    selectedVariantByProduct[product.id] = product.defaultVariantId;

    for (const variant of product.variants) {
      quantitiesPerVariant[variant.id] = clampQuantity(
        product,
        variant.defaultQuantity,
      );
    }
  }

  return {
    currentStepId: data.steps[0]?.id ?? "cameras",
    selectedVariantByProduct,
    quantitiesPerVariant,
    savedBundle: false,
  };
}

export function normalizeSingleSelectionSteps(
  data: BundleData,
  state: BundleState,
): BundleState {
  const nextState: BundleState = {
    ...state,
    selectedVariantByProduct: { ...state.selectedVariantByProduct },
    quantitiesPerVariant: { ...state.quantitiesPerVariant },
  };

  for (const step of data.steps) {
    if (step.selectionMode !== "single") {
      continue;
    }

    let activeVariantId: string | null = null;

    for (const product of data.products) {
      if (product.stepId !== step.id) {
        continue;
      }

      for (const variant of product.variants) {
        const quantity = getVariantQuantity(nextState, variant.id);

        if (quantity <= 0) {
          continue;
        }

        if (activeVariantId === null) {
          activeVariantId = variant.id;
          nextState.selectedVariantByProduct[product.id] = variant.id;
          continue;
        }

        nextState.quantitiesPerVariant[variant.id] = 0;
      }
    }
  }

  return nextState;
}

export function createReviewLineItems(
  data: BundleData,
  state: BundleState,
): ReviewLineItem[] {
  return data.products.flatMap((product) =>
    product.variants.flatMap((variant) => {
      const quantity = getVariantQuantity(state, variant.id);

      if (quantity <= 0) {
        return [];
      }

      return [
        {
          productId: product.id,
          productTitle: product.title,
          productKind: product.kind,
          stepId: product.stepId,
          variantId: variant.id,
          variantLabel: variant.label,
          variantTone: variant.tone,
          artwork: product.artwork,
          assetKey: variant.assetKey ?? product.assetKey,
          alt: product.alt,
          quantity,
          unitPrice: product.currentPrice,
          unitCompareAtPrice: product.compareAtPrice,
          billingLabel: product.billingLabel,
        },
      ];
    }),
  );
}

export function groupReviewItems(
  data: BundleData,
  state: BundleState,
): ReviewLineGroup[] {
  const reviewItems = createReviewLineItems(data, state);

  return data.steps
    .map((step) => ({
      id: step.id,
      label: step.reviewLabel,
      items: reviewItems.filter((item) => item.stepId === step.id),
    }))
    .filter((group) => group.items.length > 0);
}

export function calculateLineTotal(item: ReviewLineItem) {
  return item.unitPrice * item.quantity;
}

export function calculateLineCompareAtTotal(item: ReviewLineItem) {
  return (item.unitCompareAtPrice ?? 0) * item.quantity;
}

export function calculateTotal(items: ReviewLineItem[]) {
  return items.reduce((total, item) => total + calculateLineTotal(item), 0);
}

export function calculateSubtotal(items: ReviewLineItem[]) {
  return items.reduce((total, item) => {
    const fallbackPrice = item.unitPrice;
    return total + (item.unitCompareAtPrice ?? fallbackPrice) * item.quantity;
  }, 0);
}

export function calculateSavings(items: ReviewLineItem[]) {
  return calculateSubtotal(items) - calculateTotal(items);
}

export function calculateSelectedCountForStep(
  step: BundleStep,
  data: BundleData,
  state: BundleState,
) {
  return data.products.reduce((count, product) => {
    if (product.stepId !== step.id) {
      return count;
    }

    return (
      count +
      product.variants.filter((variant) => getVariantQuantity(state, variant.id) > 0)
        .length
    );
  }, 0);
}
