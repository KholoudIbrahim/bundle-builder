import { ShieldCheck } from "lucide-react";
import { ProductArtwork } from "../product/ProductArtwork";
import { Price } from "../ui/Price/Price";
import { QuantityStepper } from "../ui/QuantityStepper/QuantityStepper";
import type { ReviewLineItem } from "../../types/bundle";

interface ReviewItemProps {
  item: ReviewLineItem;
  onQuantityChange: (nextQuantity: number) => void;
}

const hiddenVariantLabels = new Set(["Standard", "Required", "Annual billing", "Monthly billing"]);

export function ReviewItem({ item, onQuantityChange }: ReviewItemProps) {
  const shouldShowVariantLabel = !hiddenVariantLabels.has(item.variantLabel);

  return (
    <div className="grid grid-cols-[2.8rem_minmax(0,1fr)] gap-3 py-2 sm:grid-cols-[3.25rem_minmax(0,1fr)_auto] sm:items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_10px_24px_rgba(23,31,56,0.06)]">
        {item.productKind === "plan" ? (
          <ShieldCheck className="h-6 w-6 text-[var(--color-primary)]" />
        ) : (
          <ProductArtwork
            alt={item.alt}
            assetKey={item.assetKey}
            artwork={item.artwork}
            className="h-9 w-9"
            tone={item.variantTone}
          />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-[0.95rem] font-medium leading-tight text-[var(--color-text)] sm:text-[1.02rem]">
          {item.productTitle}
        </p>
        {shouldShowVariantLabel ? (
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {item.variantLabel}
          </p>
        ) : null}
      </div>
      <div className="col-span-2 flex items-center justify-between gap-3 pl-[3.55rem] sm:col-span-1 sm:pl-0">
        <QuantityStepper
          max={item.productKind === "plan" ? 1 : undefined}
          onChange={onQuantityChange}
          quantity={item.quantity}
          size="sm"
        />
        <Price
          billingLabel={item.billingLabel}
          compareAtPrice={item.unitCompareAtPrice ? item.unitCompareAtPrice * item.quantity : null}
          currentPrice={item.unitPrice * item.quantity}
          size="sm"
          tone="accent"
        />
      </div>
    </div>
  );
}
