import { ProductArtwork } from "../product/ProductArtwork";
import { Price } from "../ui/Price/Price";
import { QuantityStepper } from "../ui/QuantityStepper/QuantityStepper";
import type { ReviewLineItem } from "../../types/bundle";

interface ReviewItemProps {
  item: ReviewLineItem;
  onQuantityChange: (nextQuantity: number) => void;
}

export function ReviewItem({ item, onQuantityChange }: ReviewItemProps) {
  const isPlan = item.productKind === "plan";

  const renderPlanTitle = () => {
    const parts = item.productTitle.split(" ");
    if (parts.length >= 2) {
      return (
        <>
          {parts[0]} <span className="text-[var(--color-primary)]">{parts.slice(1).join(" ")}</span>
        </>
      );
    }
    return item.productTitle;
  };

  return (
    <div className="flex items-center gap-4 py-1.5">
      {/* Product image/artwork */}
      {isPlan ? (
        <img
          alt="Wyze plan"
          className="h-[32px] w-[27px] shrink-0 object-contain"
          src="/cam_unlimited.png"
        />
      ) : (
        <div className="flex h-[41px] w-[41px] shrink-0 items-center justify-center rounded-[5px] bg-white">
          <ProductArtwork
            alt={item.alt}
            assetKey={item.assetKey}
            artwork={item.artwork}
            className="h-[33px] w-[33px]"
            tone={item.variantTone}
          />
        </div>
      )}

      {/* Name — grows to fill space */}
      {isPlan ? (
        <p className="min-w-0 flex-1 text-[16px] font-bold leading-[1] tracking-[-0.002em] text-[#000000]">
          {renderPlanTitle()}
        </p>
      ) : (
        <p className="min-w-0 flex-1 text-[14px] leading-[16px] tracking-[0.005em] text-[#0B0D10]">
          {item.productTitle}
        </p>
      )}

      {/* Stepper + price */}
      <div className="flex shrink-0 items-center gap-3">
        {!isPlan && (
          <QuantityStepper
            onChange={onQuantityChange}
            quantity={item.quantity}
            size="sm"
            variant="flat"
          />
        )}
        <Price
          billingLabel={item.billingLabel}
          compareTone="muted"
          compareAtPrice={item.unitCompareAtPrice ? item.unitCompareAtPrice * item.quantity : null}
          currentPrice={item.unitPrice * item.quantity}
          size="sm"
          tone="accent"
        />
      </div>
    </div>
  );
}
