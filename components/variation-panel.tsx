"use client"

import { useEffect, useRef, useState } from "react"
import VariationCard from "./variation-card"
import { Button } from "@/components/ui/button"

interface Variation {
  id: string
  name: string
  description: string
  changes: string[]
  impact: "high" | "medium" | "low"
}

const FAST_BUY_VARIATION: Variation = {
  id: "fast-buy",
  name: "Fast Buy CTA",
  description: "Streamlined card with primary Buy Now action and instant benefit highlights.",
  changes: ["Prominent Buy Now button", "Express checkout messaging", "Quick benefits row"],
  impact: "high",
}

const BASE_VARIATIONS: Variation[] = [
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
  // {
  //   id: "lifestyle-story",
  //   name: "Lifestyle Story",
  //   description: "Narrative-first layout that shows how the product flows through a day in the life.",
  //   changes: ["Morning, midday, and evening storytelling beats", "Lifestyle imagery integration", "Benefit-driven narration"],
  //   impact: "medium",
  // },
  {
    id: "hover-float",
    name: "Hover Float Card",
    description: "Default layout with a soft lift and shadow that engages on hover.",
    changes: ["Subtle card elevation", "Animated shadow reveal", "Image tilt on hover"],
    impact: "low",
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
  const [variations, setVariations] = useState<Variation[]>(BASE_VARIATIONS)
  const [selectedVariations, setSelectedVariations] = useState<Set<string>>(new Set())
  const [allocationByVariation, setAllocationByVariation] = useState<Record<string, number>>({})
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newVariationPrompt, setNewVariationPrompt] = useState("")
  const [creationState, setCreationState] = useState<"idle" | "submitting" | "success">("idle")
  const creationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
    setCreationState("idle")
    setNewVariationPrompt("")
  }

  const resetCreateModal = () => {
    setIsCreateModalOpen(false)
    setCreationState("idle")
    setNewVariationPrompt("")
    creationTimeoutRef.current = null
    successTimeoutRef.current = null
  }

  const clearCreationTimers = () => {
    if (creationTimeoutRef.current) {
      clearTimeout(creationTimeoutRef.current)
      creationTimeoutRef.current = null
    }
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current)
      successTimeoutRef.current = null
    }
  }

  const handleCloseCreateModal = () => {
    clearCreationTimers()
    resetCreateModal()
  }

  const handleConfirmCreate = () => {
    if (!newVariationPrompt.trim()) {
      return
    }
    setCreationState("submitting")
    clearCreationTimers()
    creationTimeoutRef.current = setTimeout(() => {
      setCreationState("success")
      setVariations((previousVariations) => {
        const withoutFastBuy = previousVariations.filter((variation) => variation.id !== FAST_BUY_VARIATION.id)
        return [FAST_BUY_VARIATION, ...withoutFastBuy]
      })
      onSelectVariation(FAST_BUY_VARIATION.id)
      successTimeoutRef.current = setTimeout(() => {
        resetCreateModal()
      }, 1200)
    }, 7000)
  }

  useEffect(() => {
    return () => {
      clearCreationTimers()
    }
  }, [])

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="text-lg font-bold text-foreground">Variations</h2>
          <p className="text-xs text-muted-foreground">Previewing updates every product in the grid</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleOpenCreateModal}>
            Add variation
          </Button>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
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
          {`Continue with ${selectedVariations.size} variation${
            selectedVariations.size === 1 ? "" : "s"
          }`}
        </Button>
      </div>

      {isCreateModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-border bg-card shadow-lg">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Create a new variation</h3>
                <p className="text-xs text-muted-foreground">Use AI or import your latest concept.</p>
              </div>
              <button
                onClick={handleCloseCreateModal}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close create variation dialog"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-4 py-5">
              {creationState === "success" ? (
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 animate-pulse">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Variation drafted</h4>
                    <p className="text-xs text-muted-foreground">
                      We&apos;ll add it to your list once the preview finishes rendering.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Write a prompt</span>
                    <textarea
                      value={newVariationPrompt}
                      onChange={(event) => setNewVariationPrompt(event.target.value)}
                      disabled={creationState !== "idle"}
                      placeholder="e.g. Show only the name, price and image. Reveal full details on hover."
                      className="min-h-[120px] resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                    />
                  </label>
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {}}
                      disabled={creationState !== "idle"}
                    >
                      Import from Figma
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleCloseCreateModal}
                        disabled={creationState === "submitting"}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleConfirmCreate}
                        disabled={creationState !== "idle" || newVariationPrompt.trim().length === 0}
                      >
                        {creationState === "submitting" ? (
                          <span className="flex items-center gap-2">
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              />
                            </svg>
                            Creating…
                          </span>
                        ) : (
                          "OK"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
