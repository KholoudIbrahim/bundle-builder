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
        "relative flex h-full min-w-0 flex-col overflow-hidden rounded-[8px] bg-white p-3 transition duration-200",
        isSelected
          ? "border-2 border-[var(--color-primary)]"
          : "border border-[var(--color-border-soft)] hover:border-[var(--color-border)]",
        className,
      )}
    >
      {product.badge ? <Badge className="self-start">{product.badge}</Badge> : null}

      {/* Main row: big image left | content right */}
      <div className="mt-2 flex min-w-0 flex-1 gap-3">
        {/* Image column — stretches full height of content */}
        <div
          className={cn(
            "flex shrink-0 items-center justify-center self-stretch rounded-[6px]",
            isPlan ? "w-[5.5rem]" : "w-[6rem]",
          )}
        >
          {isPlan ? (
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-surface-highlight)] text-[var(--color-primary)]">
              <ShieldCheck className="h-7 w-7" />
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

        {/* Right content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="text-[1rem] font-bold leading-[1.12] text-[var(--color-text)] sm:text-[1.08rem]">
            {product.title}
          </h3>
          <p className="mt-1 text-[0.82rem] leading-[1.3] text-[var(--color-text-secondary)]">
            {product.description}{" "}
            <a
              className="font-bold transition duration-200"
              href={product.learnMoreHref}
              style={{ color: "var(--color-primary)", textDecoration: "underline", textUnderlineOffset: "2px" }}
            >
              Learn More
            </a>
          </p>
          <div className="mt-2">
            <VariantSelector
              onSelect={onVariantSelect}
              productAlt={product.alt}
              productArtwork={product.artwork}
              productAssetKey={product.assetKey}
              selectedVariantId={activeVariant.id}
              variants={product.variants}
            />
          </div>
          {/* Counter + price — under content, not under image */}
          <div className="mt-3 flex items-center justify-between gap-2">
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
        </div>
      </div>
    </article>
  );
}
