"use client"

import { useEffect, useRef, useState } from "react"
import ProductGrid from "@/components/product-grid"
import { ExperimentModeBanner } from "@/components/experiment-mode-banner"
import VariationPanel from "@/components/variation-panel"

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [panelProductId, setPanelProductId] = useState<string | null>(null)
  const [previewVariationId, setPreviewVariationId] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearScanTimeout = () => {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current)
      scanTimeoutRef.current = null
    }
  }

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId)
    setPreviewVariationId(null)
    setIsScanning(true)
    setPanelProductId(null)
    clearScanTimeout()

    scanTimeoutRef.current = setTimeout(() => {
      setIsScanning(false)
      setPanelProductId(productId)
      scanTimeoutRef.current = null
    }, 5000)
  }

  const handleClosePanel = () => {
    clearScanTimeout()
    setSelectedProductId(null)
    setPanelProductId(null)
    setPreviewVariationId(null)
    setIsScanning(false)
  }

  useEffect(() => {
    return () => {
      clearScanTimeout()
    }
  }, [])

  const shouldShowSidePanel = isScanning || panelProductId !== null

  return (
    <main className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Main Product Grid - Left Side */}
        <div className="flex-1 overflow-auto border-r border-border">
          <ProductGrid
            selectedProductId={selectedProductId}
            onSelectProduct={handleSelectProduct}
            previewVariationId={previewVariationId}
          />
        </div>

        {/* Variation Panel - Right Side */}
        {shouldShowSidePanel && (
          <div className="w-96 border-l border-border overflow-auto">
            {isScanning ? (
              <ScanningAnimation />
            ) : panelProductId ? (
              <VariationPanel
                onClose={handleClosePanel}
                onSelectVariation={setPreviewVariationId}
                previewVariationId={previewVariationId}
              />
            ) : null}
          </div>
        )}
      </div>
      <ExperimentModeBanner />
    </main>
  )
}

function ScanningAnimation() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute h-full w-full rounded-full border-4 border-primary/40 border-t-primary animate-spin" />
        <span className="absolute h-16 w-16 rounded-full border-4 border-primary/20 border-b-primary/70 animate-[spin_3s_linear_infinite]" />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10.75 19.25h2.5M4.5 8.75a7.75 7.75 0 1115.5 0c0 3.53-2.28 6.52-5.5 7.5v1a1.5 1.5 0 01-1.5 1.5h-1.5a1.5 1.5 0 01-1.5-1.5v-1c-3.22-.98-5.5-3.97-5.5-7.5z"
            />
          </svg>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">Preparing variations</h2>
        <p className="text-sm text-muted-foreground">
          Scanning your site and generating tailored experiments for the selected component.
        </p>
      </div>
      <div className="flex items-center justify-center gap-2">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="h-3 w-3 rounded-full bg-primary/80 animate-bounce"
            style={{ animationDelay: `${index * 0.2}s` }}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground/80">This step takes about five seconds.</p>
    </div>
  )
}
