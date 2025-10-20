"use client"
import { KeyboardEvent, MouseEvent } from "react"
import { cn } from "@/lib/utils"
import { getVariationPreview } from "@/lib/variation-utils"
import { Button } from "@/components/ui/button"
import VariationPreview from "./variation-preview"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface ProductCardProps {
  product: Product
  isSelected: boolean
  onSelect: () => void
  onOpenVariations: () => void
  previewVariationId: string | null
}

export default function ProductCard({
  product,
  isSelected,
  onSelect,
  onOpenVariations,
  previewVariationId,
}: ProductCardProps) {
  const variationPreview = previewVariationId ? getVariationPreview(previewVariationId) : null

  console.log("Rendering ProductCard for product:", product.id, "with previewVariationId:", previewVariationId, variationPreview)
  if (variationPreview) {
    return (
      <VariationPreview
        productId={product.id}
        variationId={previewVariationId}
        onClose={() => console.log("Close variation preview")}
      />
    )
  }

  const comparisonFeatures = [
    { name: "Price", ours: `$${product.price}`, theirs: `$${Math.round(product.price * 1.15)}` },
    { name: "Warranty", ours: "24 months", theirs: "12 months" },
    { name: "Shipping", ours: "Free 2-day", theirs: "$15 standard" },
    { name: "Accessories", ours: "Included bundle", theirs: "Sold separately" },
  ]

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSelect()
    }
  }

  const handleOpenVariations = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onOpenVariations()
  }

  return (
    <div
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className={cn(
        "group relative overflow-hidden rounded-lg border-2 transition-all duration-300 text-left",
        isSelected
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-border bg-card hover:border-primary/50 hover:shadow-md",
      )}
    >
      <div className="bg-muted/40 p-4 flex items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-xl border border-border bg-card">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">{product.category}</p>
          <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Ours</p>
          <p className="text-2xl font-bold text-primary">${product.price}</p>
        </div>
      </div>
      <div className="divide-y divide-border/60">
        <div className="grid grid-cols-3 bg-muted/20 px-4 py-2 text-xs font-semibold uppercase text-muted-foreground">
          <span>Feature</span>
          <span className="text-primary">Ours</span>
          <span>Theirs</span>
        </div>
        {comparisonFeatures.map((feature) => (
          <div key={feature.name} className="grid grid-cols-3 px-4 py-3 text-sm">
            <span className="font-medium text-foreground">{feature.name}</span>
            <span className="text-primary">{feature.ours}</span>
            <span className="text-muted-foreground">{feature.theirs}</span>
          </div>
        ))}
      </div>
      <div className="bg-muted/10 px-4 py-3">
        <span className="block w-full rounded-md border border-primary py-2 text-center text-sm font-semibold text-primary transition-colors group-hover:bg-primary/5">
          View full comparison
        </span>
      </div>

      {isSelected && (
        <div className="absolute bottom-5 right-5 z-10">
          <Button
            size="lg"
            className="cursor-pointer rounded-xl bg-[linear-gradient(135deg,_#00baa7_0%,_#4f39f6_100%)] px-6 py-10 text-2xl font-semibold text-white shadow-[0_18px_42px_rgba(79,57,246,0.35)] ring-8 ring-white/20 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(79,57,246,0.45)] focus-visible:ring-white/40"
            onClick={handleOpenVariations}
          >
            Generate variations
          </Button>
        </div>
      )}

      {/* {isSelected && (
        <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary shadow-sm">
          <svg className="h-4 w-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )} */}
    </div>
  )
}
