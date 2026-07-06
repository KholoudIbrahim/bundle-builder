import { Button } from "../ui/Button/Button";
import { ProductCard } from "../product/ProductCard";
import { useBundle } from "../../hooks/useBundle";
import { cn } from "../../lib/cn";
import type { BundleProduct, BundleStep } from "../../types/bundle";
import {
  getProductSelectedQuantity,
  getSelectedVariantId,
  getVariantById,
  getVariantQuantity,
} from "../../utils/bundleCalculations";

interface BuilderSectionProps {
  onNextStep?: () => void;
  products: BundleProduct[];
  step: BundleStep;
}

function getGridClassName(stepId: BundleStep["id"]) {
  switch (stepId) {
    case "cameras":
      return "grid gap-3.5 md:grid-cols-2";
    case "plan":
      return "grid gap-3.5 md:grid-cols-2";
    case "sensors":
      return "grid gap-3.5 md:grid-cols-2";
    case "accessories":
      return "grid gap-4";
    default:
      return "grid gap-4";
  }
}

export function BuilderSection({
  onNextStep,
  products,
  step,
}: BuilderSectionProps) {
  const { selectVariant, setVariantQuantity, state } = useBundle();

  return (
    <div>
      <div className={getGridClassName(step.id)}>
        {products.map((product, index) => {
          const selectedVariantId = getSelectedVariantId(product, state);
          const activeVariant =
            getVariantById(product, selectedVariantId) ?? product.variants[0];
          const activeQuantity = getVariantQuantity(state, activeVariant.id);
          const totalQuantity = getProductSelectedQuantity(product, state);
          const shouldCenterLastCameraCard =
            step.id === "cameras" &&
            products.length % 2 === 1 &&
            index === products.length - 1;

          return (
            <ProductCard
              activeQuantity={activeQuantity}
              activeVariant={activeVariant}
              className={cn(
                shouldCenterLastCameraCard &&
                  "md:col-span-2 md:mx-auto md:w-full md:max-w-[22rem]",
              )}
              isSelected={totalQuantity > 0}
              key={product.id}
              onQuantityChange={(nextQuantity) => {
                setVariantQuantity(activeVariant.id, nextQuantity);
              }}
              onVariantSelect={(variantId) => {
                selectVariant(product.id, variantId);
              }}
              product={product}
            />
          );
        })}
      </div>
      {step.nextLabel && onNextStep ? (
        <div className="mt-3 flex justify-center">
          <Button className="min-w-[15rem]" onClick={onNextStep} size="lg" variant="outline">
            {step.nextLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
