import { Check, ShieldCheck, Truck } from "lucide-react";
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
  const groups = groupReviewItems(data, state);
  const subtotal = calculateSubtotal(reviewItems);
  const total = calculateTotal(reviewItems);
  const savings = calculateSavings(reviewItems);

  return (
    <aside className="rounded-[var(--radius-panel)] bg-[var(--color-surface-soft)] px-4 py-4 sm:px-5 xl:sticky xl:top-6">
      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
        Review
      </p>
      <h2 className="mt-4 text-[1.4rem] font-bold leading-[1.08] text-[var(--color-text)]">
        {data.review.title}
      </h2>
      <p className="mt-2 max-w-[30rem] text-[0.92rem] leading-[1.35] text-[var(--color-text-secondary)]">
        {data.review.description}
      </p>

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem] xl:grid-cols-1">
        <div className="space-y-3">
          {groups.map((group) => (
            <section
              className="border-t border-[var(--color-border-soft)] pt-2.5"
              key={group.id}
            >
              <p className="text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                {group.label}
              </p>
              <div className="mt-1">
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

          <section className="border-t border-[var(--color-border-soft)] pt-2.5">
            <div className="grid grid-cols-[2.8rem_minmax(0,1fr)] gap-3 py-2 sm:grid-cols-[3.25rem_minmax(0,1fr)_auto] sm:items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#19B191] shadow-[0_10px_24px_rgba(23,31,56,0.06)]">
                <Truck className="h-6 w-6" />
              </div>
              <p className="text-[0.95rem] font-medium text-[var(--color-text)] sm:text-[1.02rem]">
                {data.shipping.title}
              </p>
              <div className="col-span-2 flex justify-end pl-[3.4rem] sm:col-span-1 sm:pl-0">
                <Price
                  compareAtPrice={data.shipping.compareAtPrice}
                  currentPrice={data.shipping.currentPrice}
                  size="sm"
                  tone="accent"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col justify-between gap-5 border-t border-[var(--color-border-soft)] pt-4 lg:border-t-0 lg:pt-0 xl:border-t xl:pt-4">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 shrink-0 rotate-[-12deg] items-center justify-center rounded-full border-[6px] border-[var(--color-primary)] text-center text-white shadow-[0_16px_28px_rgba(91,61,245,0.24)] [background:radial-gradient(circle_at_30%_30%,#7f67ff_0%,#5b3df5_58%,#4528dd_100%)] sm:h-24 sm:w-24 sm:border-[7px]">
              <div className="leading-tight">
                <p className="text-[1.2rem] font-bold sm:text-[1.45rem]">100%</p>
                <p className="text-[0.7rem] uppercase tracking-[0.08em]">Wyze</p>
                <p className="text-[0.62rem]">satisfaction guarantee</p>
              </div>
            </div>
            <div className="min-w-0 space-y-3">
              <div className="inline-flex rounded-full bg-[var(--color-primary)] px-3 py-1 text-sm font-medium text-white">
                {data.finance.label}
              </div>
              <div className="hidden lg:block xl:hidden">
                <h3 className="text-[1.85rem] font-bold leading-none tracking-[-0.05em] text-[var(--color-text)]">
                  {data.review.returnsTitle}
                </h3>
                <p className="mt-3 text-[1.02rem] leading-[1.5] text-[var(--color-text-secondary)]">
                  {data.review.returnsDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-end justify-end gap-3">
              <p className="text-[1.45rem] leading-none text-[var(--color-text-muted)] line-through sm:text-[1.85rem]">
                {formatCurrency(subtotal)}
              </p>
              <p className="text-[2.2rem] font-bold leading-none tracking-[-0.06em] text-[var(--color-primary)] sm:text-[2.6rem]">
                {formatCurrency(total)}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-[1.1rem] bg-[color:color-mix(in_oklab,var(--color-success)_12%,white)] px-4 py-2 text-center text-[0.88rem] font-medium text-[var(--color-success)] sm:rounded-full sm:text-[0.96rem]">
              <Check className="h-4 w-4" />
              <span>
                Congrats! You're saving {formatCurrency(savings)} on your security
                bundle!
              </span>
            </div>
            <Button className="w-full" size="lg">
              {data.review.checkoutLabel}
            </Button>
            <button
              className="w-full text-center text-[0.98rem] text-[var(--color-text-muted)] underline underline-offset-4 transition hover:text-[var(--color-text)]"
              onClick={saveConfiguration}
              type="button"
            >
              {state.savedBundle ? "Saved for later" : data.review.saveForLaterLabel}
            </button>
          </div>

          <div className="rounded-[var(--radius-card)] border border-[var(--color-border-soft)] bg-white/70 p-4 xl:block">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-highlight)] text-[var(--color-primary)]">
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
