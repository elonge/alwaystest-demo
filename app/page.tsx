"use client"

import { useState } from "react"
import ProductGrid from "@/components/product-grid"
import VariationPanel from "@/components/variation-panel"

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [previewVariationId, setPreviewVariationId] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Main Product Grid - Left Side */}
        <div className="flex-1 overflow-auto border-r border-border">
          <ProductGrid
            selectedProductId={selectedProductId}
            onSelectProduct={setSelectedProductId}
            previewVariationId={previewVariationId}
          />
        </div>

        {/* Variation Panel - Right Side */}
        {selectedProductId && (
          <div className="w-96 border-l border-border overflow-auto">
            <VariationPanel
              onClose={() => {
                setSelectedProductId(null)
                setPreviewVariationId(null)
              }}
              onSelectVariation={setPreviewVariationId}
              previewVariationId={previewVariationId}
            />
          </div>
        )}
      </div>
    </main>
  )
}
