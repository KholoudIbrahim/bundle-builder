import { ShieldCheck, Truck } from "lucide-react";
import { useBundle } from "../../hooks/useBundle";
import { Button } from "../ui/Button/Button";
import { Price } from "../ui/Price/Price";
import { ReviewItem } from "./ReviewItem";
import {
  calculateSavings,
  calculateSubtotal,
  calculateTotal,
  createReviewLineItems,
  groupReviewItems,
} from "../../utils/bundleCalculations";
import { formatCurrency } from "../../utils/formatCurrency";

export function ReviewPanel() {
  const { data, saveConfiguration, setVariantQuantity, state } = useBundle();
  const reviewItems = createReviewLineItems(data, state);
  const rawGroups = groupReviewItems(data, state);
  
  // Re-order so PLAN section is the final group before SHIPPING
  const planGroup = rawGroups.find((g) => g.id === "plan");
  const otherGroups = rawGroups.filter((g) => g.id !== "plan");
  const groups = planGroup ? [...otherGroups, planGroup] : otherGroups;

  const subtotal = calculateSubtotal(reviewItems);
  const total = calculateTotal(reviewItems);
  const savings = calculateSavings(reviewItems);

  return (
    <aside className="rounded-[var(--radius-panel)] bg-[var(--color-surface-soft)] px-5 py-[15px] xl:sticky xl:top-6">
      <p className="text-[12px] uppercase tracking-[1.6px] text-[#484848]">
        Review
      </p>
      <h2 className="mt-5 text-[22px] font-semibold leading-[1] tracking-[0.6px] text-[#1F1F1F]">
        {data.review.title}
      </h2>
      <p className="mt-[5px] text-[14px] leading-[1.3] tracking-[0.6px] text-[rgba(31,31,31,0.75)]">
        {data.review.description}
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem] xl:grid-cols-1 xl:gap-4">
        <div className="flex flex-col gap-[10px]">
          {groups.map((group) => (
            <section
              className="border-t border-[#CED6DE] pt-[15px]"
              key={group.id}
            >
              <p className="text-[12px] uppercase tracking-[0.03em] text-[#A8B2BD]">
                {group.label}
              </p>
              <div className="mt-[8px] flex flex-col gap-[12px]">
                {group.items.map((item) => (
                  <ReviewItem
                    item={item}
                    key={item.variantId}
                    onQuantityChange={(nextQuantity) => {
                      setVariantQuantity(item.variantId, nextQuantity);
                    }}
                  />
                ))}
              </div>
            </section>
          ))}

          <section className="border-t border-[#CED6DE] pt-[15px]">
            <div className="flex items-center gap-4 py-1.5">
              <div className="flex h-[41px] w-[41px] shrink-0 items-center justify-center rounded-[5px] bg-white text-[#0AA288]">
                <Truck className="h-5 w-5" />
              </div>
              <p className="min-w-0 flex-1 text-[14px] leading-[16px] tracking-[0.005em] text-[#0B0D10]">
                {data.shipping.title}
              </p>
              <Price
                compareTone="muted"
                compareAtPrice={data.shipping.compareAtPrice}
                currentPrice={data.shipping.currentPrice}
                size="sm"
                tone="accent"
              />
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-[8px] border-t border-[var(--color-border-soft)] pt-4 xl:shrink-0">

          {/* Row: badge left, finance tag right — Figma */}
          <div className="flex items-center justify-between">
            <img
              alt="100% Wyze satisfaction guarantee"
              className="h-[88px] w-[88px] object-contain"
              src="/badge.png"
            />
            <div className="inline-flex items-center rounded-[3px] bg-[var(--color-primary)] px-[8px] py-[5px] text-[12px] font-medium leading-[15px] tracking-[-0.05em] text-white">
              {data.finance.label}
            </div>
          </div>

          {/* Prices */}
          <div className="flex items-baseline justify-end gap-2">
            <p className="text-[18px] leading-[20px] tracking-[0.0025em] text-[#6F7882] line-through">
              {formatCurrency(subtotal)}
            </p>
            <p className="text-[24px] font-bold leading-[32px] tracking-[-0.00125em] text-[var(--color-primary)]">
              {formatCurrency(total)}
            </p>
          </div>

          {/* Savings */}
          <p className="text-center text-[12px] font-semibold leading-[100%] tracking-[-0.056px] text-[#0AA288]">
            Congrats! You're saving {formatCurrency(savings)} on your security bundle!
          </p>

          {/* Checkout */}
          <Button className="w-full rounded-[4px]" size="lg">
            {data.review.checkoutLabel}
          </Button>

          {/* Save for later */}
          <button
            className="mx-auto flex w-full items-center justify-center text-center font-[family-name:var(--font-gilroy-italic)] italic text-[14px] leading-[1.2] tracking-[-0.016px] text-[#484848] underline transition hover:opacity-70"
            onClick={saveConfiguration}
            type="button"
          >
            {state.savedBundle ? "Saved for later" : data.review.saveForLaterLabel}
          </button>

          {/* Returns card */}
          <div className="mt-1 rounded-[var(--radius-card)] border border-[var(--color-border-soft)] bg-white/70 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-surface-highlight)] text-[var(--color-primary)]">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-[var(--color-text)]">
                  {data.review.returnsTitle}
                </h3>
                <p className="mt-1 text-sm leading-[1.5] text-[var(--color-text-secondary)]">
                  {data.review.returnsDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
