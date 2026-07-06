import { ShieldCheck } from "lucide-react";
import { Badge } from "../ui/Badge/Badge";
import { Price } from "../ui/Price/Price";
import { QuantityStepper } from "../ui/QuantityStepper/QuantityStepper";
import { ProductArtwork } from "./ProductArtwork";
import { VariantSelector } from "./VariantSelector";
import { cn } from "../../lib/cn";
import type { BundleProduct, BundleVariant } from "../../types/bundle";

interface ProductCardProps {
  activeQuantity: number;
  activeVariant: BundleVariant;
  className?: string;
  isSelected: boolean;
  onQuantityChange: (nextQuantity: number) => void;
  onVariantSelect: (variantId: string) => void;
  product: BundleProduct;
}

export function ProductCard({
  activeQuantity,
  activeVariant,
  className,
  isSelected,
  onQuantityChange,
  onVariantSelect,
  product,
}: ProductCardProps) {
  const isPlan = product.kind === "plan";

  return (
    <article
      className={cn(
        "relative flex h-full min-h-[9.85rem] min-w-0 flex-col overflow-hidden rounded-[8px] border bg-white p-3 transition duration-200",
        isSelected
          ? "border-[var(--color-primary)]"
          : "border-transparent hover:border-[var(--color-border)]",
        className,
      )}
    >
      {product.badge ? <Badge className="self-start">{product.badge}</Badge> : null}
      <div
        className={cn(
          "mt-2 grid min-w-0 gap-3",
          isPlan
            ? "grid-cols-[5rem_minmax(0,1fr)]"
            : "grid-cols-[5.3rem_minmax(0,1fr)]",
        )}
      >
        <div className="flex h-[5rem] items-center justify-center self-start rounded-[5px] bg-white px-1.5 py-2">
          {isPlan ? (
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-surface-highlight)] text-[var(--color-primary)]">
              <ShieldCheck className="h-6 w-6" />
            </span>
          ) : (
            <ProductArtwork
              alt={product.alt}
              assetKey={activeVariant.assetKey ?? product.assetKey}
              artwork={product.artwork}
              className="h-full w-full"
              tone={activeVariant.tone}
            />
          )}
        </div>
        <div className="flex min-w-0 flex-col">
          <h3 className="text-[1rem] font-bold leading-[1.12] text-[var(--color-text)] sm:text-[1.08rem]">
            {product.title}
          </h3>
          <p className="mt-1 text-[0.82rem] leading-[1.3] text-[var(--color-text-secondary)]">
            {product.description}
          </p>
          <a
            className="mt-0.5 self-start text-[0.82rem] font-medium text-[#0000ee] underline underline-offset-2 transition hover:text-[var(--color-primary)]"
            href={product.learnMoreHref}
          >
            Learn More
          </a>
          <div className="mt-3">
            <VariantSelector
              onSelect={onVariantSelect}
              productAlt={product.alt}
              productArtwork={product.artwork}
              productAssetKey={product.assetKey}
              selectedVariantId={activeVariant.id}
              variants={product.variants}
            />
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
        <QuantityStepper
          max={product.maxQuantity}
          min={product.minQuantity ?? 0}
          onChange={onQuantityChange}
          quantity={activeQuantity}
        />
        <Price
          billingLabel={product.billingLabel}
          compareTone="sale"
          compareAtPrice={product.compareAtPrice}
          currentPrice={product.currentPrice}
          tone={isPlan ? "accent" : "default"}
        />
      </div>
    </article>
  );
}
