export type StepId = "cameras" | "plan" | "sensors" | "accessories";

export type IconName = "camera" | "shield" | "radio" | "sparkles" | "truck";

export type VariantTone =
  | "white"
  | "grey"
  | "black"
  | "graphite"
  | "indigo"
  | "mint";

export type ArtworkName =
  | "cam-v4"
  | "cam-pan"
  | "floodlight"
  | "doorbell"
  | "battery-cam"
  | "motion-sensor"
  | "sense-hub"
  | "micro-sd"
  | "shield";

export type ProductAssetKey =
  | "cam-pro-black"
  | "cam-pro-white"
  | "cam-v2-black"
  | "cam-v2-white"
  | "cam-v3-black"
  | "cam-v3-white"
  | "cam-v4-black"
  | "cam-v4-gray"
  | "cam-v4-white"
  | "doorbell"
  | "micro-sd"
  | "sense-hub"
  | "sense-motion";

export interface BundleVariant {
  id: string;
  label: string;
  tone: VariantTone;
  defaultQuantity: number;
  assetKey?: ProductAssetKey;
}

export interface BundleProduct {
  id: string;
  stepId: StepId;
  kind: "product" | "plan";
  title: string;
  description: string;
  badge?: string;
  learnMoreHref: string;
  artwork: ArtworkName;
  assetKey?: ProductAssetKey;
  alt: string;
  currentPrice: number;
  compareAtPrice?: number | null;
  billingLabel?: string;
  minQuantity?: number;
  maxQuantity?: number;
  variants: BundleVariant[];
  defaultVariantId: string;
}

export interface BundleStep {
  id: StepId;
  number: number;
  title: string;
  icon: IconName;
  selectionMode: "single" | "multi";
  reviewLabel: string;
  nextLabel?: string;
}

export interface BundleShipping {
  title: string;
  currentPrice: number;
  compareAtPrice?: number | null;
}

export interface BundleFinance {
  label: string;
}

export interface BundleReviewCopy {
  title: string;
  description: string;
  checkoutLabel: string;
  saveForLaterLabel: string;
  returnsTitle: string;
  returnsDescription: string;
}

export interface BundleData {
  steps: BundleStep[];
  products: BundleProduct[];
  shipping: BundleShipping;
  finance: BundleFinance;
  review: BundleReviewCopy;
}

export interface BundleState {
  currentStepId: StepId;
  selectedVariantByProduct: Record<string, string>;
  quantitiesPerVariant: Record<string, number>;
  savedBundle: boolean;
}

export interface ReviewLineItem {
  productId: string;
  productTitle: string;
  productKind: BundleProduct["kind"];
  stepId: StepId;
  variantId: string;
  variantLabel: string;
  variantTone: VariantTone;
  artwork: ArtworkName;
  assetKey?: ProductAssetKey;
  alt: string;
  quantity: number;
  unitPrice: number;
  unitCompareAtPrice?: number | null;
  billingLabel?: string;
}

export interface ReviewLineGroup {
  id: StepId;
  label: string;
  items: ReviewLineItem[];
}

export type BundleAction =
  | { type: "set-current-step"; stepId: StepId }
  | { type: "select-variant"; productId: string; variantId: string }
  | { type: "set-variant-quantity"; variantId: string; quantity: number }
  | { type: "mark-saved"; saved: boolean };
