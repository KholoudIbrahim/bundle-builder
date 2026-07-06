import { useContext } from "react";
import { BundleContext } from "../context/bundle-context";

export function useBundle() {
  const context = useContext(BundleContext);

  if (!context) {
    throw new Error("useBundle must be used within a BundleProvider.");
  }

  return context;
}
