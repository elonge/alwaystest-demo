"use client"
import { cn } from "@/lib/utils"
import { getVariationPreview } from "@/lib/variation-utils"
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
  previewVariationId: string | null
}

export default function ProductCard({ product, isSelected, onSelect, previewVariationId }: ProductCardProps) {
  const variationPreview = previewVariationId ? getVariationPreview(previewVariationId) : null

  if (previewVariationId) {
    return (
          <VariationPreview
            productId={product.id}
            variationId={previewVariationId}
            onClose={() => console.log("Close variation preview")}
          />
    )
  }
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative overflow-hidden rounded-lg border-2 transition-all duration-300 text-left",
        isSelected
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-border bg-card hover:border-primary/50 hover:shadow-md",
      )}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        {variationPreview && (
          <p className="text-xs font-medium text-primary mb-1 bg-primary/10 px-2 py-1 rounded w-fit">
            {variationPreview.name}
          </p>
        )}
        <p className="text-xs font-medium text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>

        {variationPreview?.content && (
          <div className="mb-2 text-xs text-muted-foreground">{variationPreview.content}</div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${product.price}</span>
          {isSelected && (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
              <svg className="h-4 w-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
