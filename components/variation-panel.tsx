"use client"

import { useState } from "react"
import VariationCard from "./variation-card"
import { Button } from "@/components/ui/button"

interface Variation {
  id: string
  name: string
  description: string
  changes: string[]
  impact: "high" | "medium" | "low"
}

const VARIATIONS: Variation[] = [
  {
    id: "minimalist",
    name: "Minimalist Layout",
    description: "Clean, centered card with minimal details and a focus on typography.",
    changes: ["Circular product spotlight", "Large product name emphasis", "Reduced supporting copy"],
    impact: "medium",
  },
  {
    id: "price-highlight",
    name: "Price Highlight",
    description: "Bold gradient banner that leads with savings and offer details.",
    changes: ["Full-width price banner", "Prominent discount messaging", "Condensed spec column"],
    impact: "high",
  },
  {
    id: "cta-focus",
    name: "CTA Focus",
    description: "Action-oriented layout with an oversized call-to-action button.",
    changes: ['Large "Add to Cart" button', "Delivery and warranty pills", "Compact card spacing"],
    impact: "high",
  },
  {
    id: "social-proof",
    name: "Social Proof",
    description: "Testimonial-driven card featuring avatars, star ratings, and quotes.",
    changes: ["Reviewer avatar stack", "Highlighted rating strip", "Customer quote block"],
    impact: "medium",
  },
  {
    id: "urgency",
    name: "Urgency Signals",
    description: "Flash-sale messaging with timers, inventory indicators, and recent purchases.",
    changes: ["Countdown timer row", "Progress bar for stock level", "Recent purchaser ticker"],
    impact: "high",
  },
  {
    id: "comparison",
    name: "Comparison View",
    description: "Feature comparison table to contrast against competitors.",
    changes: ["Three-column feature grid", "Competitor price column", "Compare CTA footer"],
    impact: "medium",
  },
  {
    id: "image-prominent",
    name: "Image Prominent",
    description: "Image-led presentation that mirrors the previous default product card layout.",
    changes: ["Full-bleed product photography", "Category + title stack", "Price emphasis footer"],
    impact: "low",
  },
  {
    id: "premium",
    name: "Premium Showcase",
    description: "Luxury aesthetic with serif typography and refined gradients.",
    changes: ["Soft amber gradient", "Serif headline treatment", "Complimentary engraving callout"],
    impact: "medium",
  },
  {
    id: "interactive",
    name: "Interactive Hover",
    description: "Hover-first experience with overlay actions and dynamic imagery.",
    changes: ["Hover overlay with CTA", "Animated zoom effect", "Quick action footer"],
    impact: "medium",
  },
  {
    id: "eco",
    name: "Eco-Friendly Badge",
    description: "Sustainability highlights with planet-friendly bullet points.",
    changes: ["Eco badge header", "Recycled materials callouts", "Carbon offset chip"],
    impact: "medium",
  },
  {
    id: "award",
    name: "Award Winner",
    description: "Recognition-focused layout featuring accolades and ratings.",
    changes: ["Editors' Choice badge", "Award summary copy", "Rating highlight strip"],
    impact: "high",
  },
  {
    id: "expert-review",
    name: "Expert Review",
    description: "Third-party endorsement with publication quotes and scores.",
    changes: ["Publisher logo avatar", "Quoted testimonial block", "Score and review metadata"],
    impact: "high",
  },
  {
    id: "warranty",
    name: "Warranty Highlight",
    description: "Coverage timeline that reinforces long-term support messaging.",
    changes: ["Warranty summary header", "Year-by-year coverage cards", "Registration reminder banner"],
    impact: "medium",
  },
]

const DEFAULT_ALLOCATION = 1

interface VariationPanelProps {
  onClose: () => void
  onSelectVariation: (variationId: string | null) => void
  previewVariationId: string | null
}

export default function VariationPanel({
  onClose,
  onSelectVariation,
  previewVariationId,
}: VariationPanelProps) {
  const [selectedVariations, setSelectedVariations] = useState<Set<string>>(new Set())
  const [allocationByVariation, setAllocationByVariation] = useState<Record<string, number>>({})
  const variations = VARIATIONS
  const experimentName = "Homepage Layout Test"

  const toggleVariation = (variationId: string) => {
    setSelectedVariations((prev) => {
      const next = new Set(prev)
      if (next.has(variationId)) {
        next.delete(variationId)
        setAllocationByVariation((prevAllocations) => {
          const { [variationId]: _removed, ...rest } = prevAllocations
          return rest
        })
      } else {
        next.add(variationId)
        setAllocationByVariation((prevAllocations) => ({
          ...prevAllocations,
          [variationId]: prevAllocations[variationId] ?? DEFAULT_ALLOCATION,
        }))
      }
      return next
    })
  }

  const handleAllocationChange = (variationId: string, value: number) => {
    setAllocationByVariation((prev) => ({
      ...prev,
      [variationId]: value,
    }))
  }

  const handleAddToExperiment = () => {
    if (selectedVariations.size === 0) {
      alert("Please select at least one variation")
      return
    }
    alert(`Added ${selectedVariations.size} variation(s) to experiment`)
    setSelectedVariations(new Set())
    setAllocationByVariation({})
  }

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="text-lg font-bold text-foreground">Variations</h2>
          <p className="text-xs text-muted-foreground">Previewing updates every product in the grid</p>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3">
          {variations.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No variations available</p>
            </div>
          ) : (
            variations.map((variation) => (
              <VariationCard
                key={variation.id}
                variation={variation}
                isSelected={selectedVariations.has(variation.id)}
                isPreview={previewVariationId === variation.id}
                onToggle={() => toggleVariation(variation.id)}
                onPreview={() => onSelectVariation(previewVariationId === variation.id ? null : variation.id)}
                compact={false}
                testName={experimentName}
                defaultAllocation={DEFAULT_ALLOCATION}
                allocation={allocationByVariation[variation.id] ?? DEFAULT_ALLOCATION}
                onAllocationChange={(value) => handleAllocationChange(variation.id, value)}
              />
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4 flex items-center justify-between">
        <Button onClick={handleAddToExperiment} disabled={selectedVariations.size === 0} size="lg" className="w-full font-semibold">
          {`Set up experiment with ${selectedVariations.size} variation${
            selectedVariations.size === 1 ? "" : "s"
          }`}
        </Button>
      </div>
    </div>
  )
}
