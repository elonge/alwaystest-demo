"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
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

const variationPanelTheme = {
  "--color-background": "rgba(8, 12, 26, 0.65)",
  "--color-foreground": "#f8fafc",
  "--color-card": "rgba(8, 12, 26, 0.55)",
  "--color-card-foreground": "#f8fafc",
  "--color-border": "rgba(255, 255, 255, 0.16)",
  "--color-muted": "rgba(255, 255, 255, 0.14)",
  "--color-muted-foreground": "rgba(226, 232, 240, 0.78)",
  "--color-primary": "var(--color-always-primary)",
  "--color-primary-foreground": "var(--color-always-primary-foreground)",
  "--color-accent": "#4f39f6",
  "--color-accent-foreground": "#f8fafc",
  "--color-input": "rgba(6, 10, 24, 0.6)",
  "--color-ring": "color-mix(in oklab, var(--color-always-primary) 65%, transparent)",
  backgroundImage:
    "linear-gradient(135deg, color-mix(in oklab, var(--color-always-primary) 88%, white 12%) 0%, color-mix(in oklab, var(--color-always-primary) 65%, black 35%) 100%)",
  backgroundColor: "#0d1117",
} as CSSProperties

interface VariationPanelProps {
  onClose: () => void
  onSelectVariation: (variationId: string | null) => void
  previewVariationId: string | null
}

export default function VariationPanel({ onClose, onSelectVariation, previewVariationId }: VariationPanelProps) {
  const [variations, setVariations] = useState<Variation[]>(BASE_VARIATIONS)
  const [selectedVariations, setSelectedVariations] = useState<Set<string>>(new Set())
  const [allocationByVariation, setAllocationByVariation] = useState<Record<string, number>>({})
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newVariationPrompt, setNewVariationPrompt] = useState("")
  const [creationState, setCreationState] = useState<"idle" | "submitting" | "success">("idle")
  const creationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [continueState, setContinueState] = useState<"idle" | "generating" | "ready">("idle")
  const [generatedPrUrl, setGeneratedPrUrl] = useState<string | null>(null)
  const continueTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
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
    clearContinueTimer()
    onSelectVariation(null)
    setContinueState("generating")
    setGeneratedPrUrl(null)
    setSelectedVariations(new Set())
    setAllocationByVariation({})
    if (isCreateModalOpen) {
      clearCreationTimers()
      resetCreateModal()
    }
    continueTimeoutRef.current = setTimeout(() => {
      setContinueState("ready")
      setGeneratedPrUrl("https://github.com/acme-labs/storefront/pull/482")
      continueTimeoutRef.current = null
    }, 7000)
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

  const clearContinueTimer = () => {
    if (continueTimeoutRef.current) {
      clearTimeout(continueTimeoutRef.current)
      continueTimeoutRef.current = null
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
        // Scroll to the top of the panel
        const panel = document.querySelector("[data-variation-panel]")
        if (panel instanceof HTMLElement) {
          const scrollContainer = panel.querySelector("[data-variation-scroll]")
          if (scrollContainer instanceof HTMLElement) {
            scrollContainer.scrollTop = 0
          }
        }
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
      clearContinueTimer()
    }
  }, [])

  return (
    <div
      data-variation-panel
      className="flex h-full flex-col overflow-hidden text-foreground shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]"
      style={variationPanelTheme}
    >
      {continueState === "idle" ? (
        <>
          {/* Header */}
          <div className="flex flex-shrink-0 items-center justify-between border-b border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <div>
              <h2 className="text-lg font-bold text-white">Variations</h2>
              {/* <p className="text-xs uppercase tracking-wide text-white/70">
                Previewing updates every product in the grid
              </p> */}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenCreateModal}
                className="border-white/30 bg-white/10 text-white transition-colors hover:border-white/40 hover:bg-white/20"
              >
                Add variation
              </Button>
              <button
                onClick={onClose}
                className="text-white/60 transition-colors hover:text-white"
                aria-label="Close panel"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div data-variation-scroll className="flex-1 overflow-y-auto p-4 backdrop-blur-sm">
            <div className="flex flex-col gap-3">
              {variations.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="text-white/70">No variations available</p>
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
          <div className="flex items-center justify-between border-t border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <Button
              onClick={handleAddToExperiment}
              disabled={selectedVariations.size === 0}
              size="lg"
              className="w-full bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-always-primary)_88%,white_12%)_0%,color-mix(in_oklab,var(--color-always-primary)_65%,black_35%)_100%)] text-lg font-semibold text-always-primary-foreground shadow-[0_18px_40px_color-mix(in_oklab,var(--color-always-primary)_35%,transparent)] transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
            >
              {`Continue with ${selectedVariations.size} variation${
                selectedVariations.size === 1 ? "" : "s"
              }`}
            </Button>
          </div>

          {isCreateModalOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-[0_40px_100px_rgba(15,23,42,0.28)]">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Create a new variation</h3>
                    <p className="text-sm text-slate-500">Use AI or import your latest concept.</p>
                  </div>
                  <button
                    onClick={handleCloseCreateModal}
                    className="text-slate-400 transition-colors hover:text-slate-600"
                    aria-label="Close create variation dialog"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="px-6 py-7">
                  {creationState === "success" ? (
                    <div className="flex flex-col items-center gap-5 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 text-[color:var(--color-always-primary)] ring-2 ring-sky-200 animate-pulse">
                        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900">Variation drafted</h4>
                        <p className="text-sm text-slate-500">
                          We&apos;ll add it to your list once the preview finishes rendering.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <label className="flex flex-col gap-2">
                        <span className="text-lg font-semibold uppercase tracking-wide text-slate-500">
                          Write a prompt
                        </span>
                        <textarea
                          value={newVariationPrompt}
                          onChange={(event) => setNewVariationPrompt(event.target.value)}
                          disabled={creationState !== "idle"}
                          placeholder="e.g. Show only the name, price and image. Reveal full details on hover."
                          className="min-h-[140px] resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-[color:var(--color-always-primary)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-always-primary)]/30 disabled:opacity-60"
                        />
                      </label>
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {}}
                          disabled={creationState !== "idle"}
                          className="border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100"
                        >
                          Import from Figma
                        </Button>
                        <div className="flex items-center justify-end gap-3">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={handleCloseCreateModal}
                            disabled={creationState === "submitting"}
                            className="text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={handleConfirmCreate}
                            disabled={creationState !== "idle" || newVariationPrompt.trim().length === 0}
                            className="bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-always-primary)_88%,white_12%)_0%,color-mix(in_oklab,var(--color-always-primary)_65%,black_30%)_100%)] px-6 py-6 text-lg font-semibold text-always-primary-foreground shadow-lg shadow-[0_22px_45px_color-mix(in_oklab,var(--color-always-primary)_35%,transparent)] disabled:opacity-60"
                          >
                            {creationState === "submitting" ? (
                              <span className="flex items-center gap-3 text-base">
                                <svg
                                  className="h-5 w-5 animate-spin text-[color:var(--color-always-primary)]"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
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
        </>
      ) : (
        <ContinueStateContent
          state={continueState}
          prUrl={generatedPrUrl}
          onClose={onClose}
          onRetry={() => {
            clearContinueTimer()
            setContinueState("idle")
            setGeneratedPrUrl(null)
          }}
        />
      )}
    </div>
  )
}

function ContinueStateContent({
  state,
  prUrl,
  onClose,
  onRetry,
}: {
  state: "generating" | "ready"
  prUrl: string | null
  onClose: () => void
  onRetry: () => void
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="flex w-full items-center justify-between text-white/70">
        <span className="text-xs uppercase tracking-[0.2em]">Experiment Automations</span>
        <button onClick={onClose} className="text-white/60 transition-colors hover:text-white" aria-label="Close panel">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="relative flex h-32 w-32 items-center justify-center">
        <span
          className={`absolute h-full w-full rounded-full border-2 border-white/15 border-t-white/60 ${
            state === "generating" ? "animate-spin" : ""
          }`}
        />
        <span
          className={`absolute h-full w-full rounded-full border-2 border-transparent border-b-white/40 ${
            state === "generating" ? "animate-[spin_8s_linear_infinite]" : ""
          }`}
        />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
          {state === "generating" ? (
            <svg className="h-9 w-9 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
                d="M12 5v14m7-7H5"
              />
            </svg>
          ) : (
            <svg className="h-9 w-9 text-[color:var(--color-always-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {state === "generating" ? (
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,57,246,0.35)_0%,transparent_65%)] animate-ping" />
          ) : null}
        </div>
      </div>

      <div className="space-y-3">
        {state === "generating" ? (
          <>
            <h2 className="text-2xl font-semibold text-white">Packaging your pull request…</h2>
            <p className="text-sm text-white/70">
              Branching from your selected variations and wiring up experiment metrics. This usually takes a few
              seconds.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-white">Your Pull request is ready.</h2>
            <p className="text-sm text-white/70">
              Review the generated changes and merge when you&apos;re happy with the experiment setup.
            </p>
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 text-white/70">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className={`h-2.5 w-2.5 rounded-full bg-white/50 ${
              state === "generating" ? "animate-bounce" : ""
            }`}
            style={state === "generating" ? { animationDelay: `${index * 0.2}s` } : undefined}
          />
        ))}
      </div>

      {state === "ready" ? (
        <div className="flex flex-col items-center gap-4">
          {prUrl ? (
            <ButtonLink href={prUrl}>View pull request</ButtonLink>
          ) : null}
          <button
            onClick={onRetry}
            className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
            type="button"
          >
            Generate again
          </button>
        </div>
      ) : (
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Syncing branch, running checks</p>
      )}
    </div>
  )
}

function ButtonLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button
      asChild
      className="bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-always-primary)_88%,white_12%)_0%,color-mix(in_oklab,var(--color-always-primary)_65%,black_35%)_100%)] px-6 text-always-primary-foreground shadow-[0_18px_40px_color-mix(in_oklab,var(--color-always-primary)_35%,transparent)]"
    >
      <Link href={href} target="_blank" rel="noreferrer">
        {children}
      </Link>
    </Button>
  )
}
