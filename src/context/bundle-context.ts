import { createContext } from "react";
import type { BundleData, BundleState, StepId } from "../types/bundle";

export interface BundleContextValue {
  data: BundleData;
  state: BundleState;
  setCurrentStep: (stepId: StepId) => void;
  selectVariant: (productId: string, variantId: string) => void;
  setVariantQuantity: (variantId: string, quantity: number) => void;
  saveConfiguration: () => void;
}

export const BundleContext = createContext<BundleContextValue | null>(null);
