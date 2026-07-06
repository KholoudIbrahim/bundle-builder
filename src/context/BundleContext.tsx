import { useEffect, useMemo, useReducer, type PropsWithChildren } from "react";
import { bundleData } from "../data/bundle";
import { createInitialBundleState } from "../utils/bundleCalculations";
import { loadBundleState, saveBundleState } from "../utils/storage";
import { BundleContext, type BundleContextValue } from "./bundle-context";
import { bundleReducer } from "./bundleReducer";

function getInitialState() {
  if (typeof window === "undefined") {
    return createInitialBundleState(bundleData);
  }

  return loadBundleState(bundleData) ?? createInitialBundleState(bundleData);
}

export function BundleProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(bundleReducer, undefined, getInitialState);

  useEffect(() => {
    if (!state.savedBundle) {
      return;
    }

    saveBundleState(state);
  }, [state]);

  const value = useMemo<BundleContextValue>(
    () => ({
      data: bundleData,
      state,
      setCurrentStep: (stepId) => {
        dispatch({ type: "set-current-step", stepId });
      },
      selectVariant: (productId, variantId) => {
        dispatch({ type: "select-variant", productId, variantId });
      },
      setVariantQuantity: (variantId, quantity) => {
        dispatch({ type: "set-variant-quantity", variantId, quantity });
      },
      saveConfiguration: () => {
        dispatch({ type: "mark-saved", saved: true });
      },
    }),
    [state],
  );

  return (
    <BundleContext.Provider value={value}>{children}</BundleContext.Provider>
  );
}
