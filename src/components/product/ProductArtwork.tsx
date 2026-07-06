import { ShieldCheck } from "lucide-react";
import { productAssetMap } from "../../assets/products";
import { cn } from "../../lib/cn";
import type { ArtworkName, ProductAssetKey, VariantTone } from "../../types/bundle";

interface ProductArtworkProps {
  alt: string;
  assetKey?: ProductAssetKey;
  artwork: ArtworkName;
  className?: string;
  tone: VariantTone;
}

export function ProductArtwork({
  alt,
  assetKey,
  artwork,
  className,
}: ProductArtworkProps) {
  if (assetKey) {
    return (
      <img
        alt={alt}
        className={cn("h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(23,31,56,0.08)]", className)}
        loading="lazy"
        src={productAssetMap[assetKey]}
      />
    );
  }

  if (artwork === "shield") {
    return (
      <div
        aria-label={alt}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-[1.4rem] bg-[linear-gradient(140deg,#ffffff_10%,#eef2ff_100%)]",
          className,
        )}
        role="img"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-surface)] shadow-[0_14px_30px_rgba(91,61,245,0.14)]">
          <ShieldCheck className="h-9 w-9 text-[var(--color-primary)]" />
        </span>
      </div>
    );
  }

  return (
    <div
      aria-label={alt}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-[1.4rem] bg-[linear-gradient(140deg,#ffffff_10%,#eef2ff_100%)] text-xs font-medium text-[var(--color-text-muted)]",
        className,
      )}
      role="img"
    >
      Image unavailable
    </div>
  );
}
