import { cn } from "../../lib/cn";
import type { BundleVariant } from "../../types/bundle";
import { ProductArtwork } from "./ProductArtwork";

interface VariantSelectorProps {
  onSelect: (variantId: string) => void;
  productAlt: string;
  productArtwork: Parameters<typeof ProductArtwork>[0]["artwork"];
  productAssetKey?: Parameters<typeof ProductArtwork>[0]["assetKey"];
  selectedVariantId: string;
  variants: BundleVariant[];
}

export function VariantSelector({
  onSelect,
  productAlt,
  productArtwork,
  productAssetKey,
  selectedVariantId,
  variants,
}: VariantSelectorProps) {
  if (variants.length <= 1) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedVariantId;

        return (
          <button
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-[3px] border px-2 text-[0.78rem] leading-none transition",
              isSelected
                ? "border-[#33d6c1] bg-white text-[var(--color-text)]"
                : "border-[var(--color-border-soft)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-border)] hover:text-[var(--color-text)]",
            )}
            key={variant.id}
            onClick={() => onSelect(variant.id)}
            type="button"
          >
            <ProductArtwork
              alt={`${productAlt} ${variant.label}`}
              assetKey={variant.assetKey ?? productAssetKey}
              artwork={productArtwork}
              className="h-4 w-4 shrink-0"
              tone={variant.tone}
            />
            <span>{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}
