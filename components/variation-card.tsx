"use client"

import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  useEffect,
  useState,
} from "react"

import { cn } from "@/lib/utils"

interface Variation {
  id: string
  name: string
  description: string
  changes: string[]
  impact: "high" | "medium" | "low"
}

interface VariationCardProps {
  variation: Variation
  isSelected: boolean
  isPreview: boolean
  onToggle: () => void
  onPreview: () => void
  compact?: boolean
  testName: string
  defaultAllocation?: number
  allocation?: number
  onAllocationChange?: (value: number) => void
}

const impactColors = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-accent/10 text-accent border-accent/20",
  low: "bg-muted text-muted-foreground border-border",
}

export default function VariationCard({
  variation,
  isSelected,
  isPreview,
  onToggle,
  onPreview,
  compact = false,
  testName,
  defaultAllocation = 1,
  allocation,
  onAllocationChange,
}: VariationCardProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const fallbackAllocation = defaultAllocation ?? 1
  const resolvedAllocation = allocation ?? fallbackAllocation
  const [allocationInput, setAllocationInput] = useState(() => resolvedAllocation.toString())

  useEffect(() => {
    if (!isSelected) {
      setShowConfirmation(false)
    }
  }, [isSelected])

  useEffect(() => {
    setAllocationInput(resolvedAllocation.toString())
  }, [resolvedAllocation])

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (!isSelected) {
      setShowConfirmation(true)
    } else {
      setShowConfirmation(false)
    }
    onToggle()
  }

  const handlePreview = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onPreview()
  }

  const handleAllocationInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAllocationInput(event.target.value)
  }

  const commitAllocation = () => {
    if (!onAllocationChange) {
      setAllocationInput(resolvedAllocation.toString())
      return
    }

    const parsed = parseFloat(allocationInput)
    if (!Number.isFinite(parsed)) {
      setAllocationInput(resolvedAllocation.toString())
      return
    }

    const bounded = Math.max(0, Math.min(100, parsed))
    onAllocationChange(bounded)
    setAllocationInput(bounded.toString())
  }

  const handleAllocationInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      commitAllocation()
    }
  }

  const handleClosePopup = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    commitAllocation()
    setShowConfirmation(false)
  }

  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.stopPropagation()
  }

  const handlePointerDown = (event: PointerEvent<HTMLInputElement>) => {
    event.stopPropagation()
  }

  const handleInputClick = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation()
  }

  const buttonLabel = isSelected ? "Remove from test" : "Add to test"
  const previewLabel = isPreview ? "Previewing" : "Preview"
  const allocationLabel = `${resolvedAllocation}% of users`
  const allocationSummary = `${resolvedAllocation}% of users`
  const shouldShowPopup = showConfirmation && isSelected
  const displayAllocationText =
    allocationInput.trim() === "" ? allocationLabel : `${allocationInput}% of users`

  const previewButtonClassName = cn(
    compact
      ? "inline-flex items-center justify-center rounded-md border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors duration-200"
      : "inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors duration-200",
    isPreview
      ? "border-always-primary  text-always-primary shadow-sm"
      : "border-border bg-background text-always-primary hover:border-always-primary hover:bg-always-primary/10",
  )

  const toggleButtonClassName = cn(
    compact
      ? "inline-flex items-center justify-center rounded-md border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors duration-200"
      : "inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors duration-200",
    isSelected
      ? "border-always-primary  text-always-primary shadow-sm"
      : "border-border bg-background text-always-primary hover:border-always-primary hover:bg-always-primary/10",
  )

  const Popup = () => {
    if (!shouldShowPopup) return null

    return (
      <div className="absolute top-3 right-3 z-20 w-64 rounded-md border border-border bg-background p-3 text-left shadow-lg">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Test</p>
            <p className="text-sm font-semibold text-foreground">{testName}</p>
          </div>
          <button
            type="button"
            onClick={handleClosePopup}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close test details"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="rounded-md border border-border/60 bg-muted/40 px-3 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Audience split</p>
          <p className="mt-1 text-sm font-semibold text-foreground">{displayAllocationText}</p>

          <div className="mt-3 flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={allocationInput}
              onChange={handleAllocationInputChange}
              onBlur={commitAllocation}
              onKeyDown={handleAllocationInputKeyDown}
              onPointerDown={handlePointerDown}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              className="h-9 w-24 rounded border border-border bg-background px-2 text-sm focus:border-always-primary focus:outline-none focus:ring-2 focus:ring-always-primary/30"
              aria-label="Percent of users seeing this variation"
              placeholder={fallbackAllocation.toString()}
            />
            <span className="text-sm font-medium text-muted-foreground">%</span>
          </div>
        </div>
      </div>
    )
  }

  if (compact) {
    return (
      <div
        onClick={onPreview}
        className={cn(
          "relative flex-shrink-0 w-48 cursor-pointer rounded-lg border-2 p-3 text-left transition-all duration-200",
          isPreview
            ? "border-always-primary bg-[color-mix(in_oklab,var(--color-always-primary)_22%,var(--color-background))] ring-2 ring-always-primary/30"
            : isSelected
              ? "border-always-primary/60 bg-[color-mix(in_oklab,var(--color-background)_90%,var(--color-always-primary)_10%)] hover:border-always-primary/40"
              : "border-border bg-background hover:border-always-primary/30",
        )}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <button type="button" onClick={handlePreview} className={previewButtonClassName}>
            {previewLabel}
          </button>
          <button type="button" onClick={handleToggle} className={toggleButtonClassName}>
            {buttonLabel}
          </button>
        </div>

        {isSelected && (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-always-primary">
            In test • {allocationSummary}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <h3 className="truncate text-sm font-semibold text-foreground">{variation.name}</h3>
            <span
              className={cn(
                "flex-shrink-0 rounded border px-1.5 py-0.5 text-xs font-medium",
                impactColors[variation.impact],
              )}
            >
              {variation.impact.charAt(0).toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{variation.description}</p>
        </div>

        <Popup />
      </div>
    )
  }

  return (
    <div
      onClick={onPreview}
      className={cn(
        "relative w-full cursor-pointer rounded-lg border-2 p-4 text-left transition-all duration-200",
        isPreview
          ? "border-always-primary bg-green-100 ring-2 ring-always-primary/30"
          : isSelected
            ? "border-always-primary/60 bg-green-300 hover:border-always-primary/40"
            : "border-border bg-background hover:border-always-primary/30",
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-border/50 pb-3">
        <button type="button" onClick={handlePreview} className={previewButtonClassName}>
          {previewLabel}
        </button>
        <button type="button" onClick={handleToggle} className={toggleButtonClassName}>
          {buttonLabel}
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">{variation.name}</h3>
          <span className={cn("rounded border px-2 py-1 text-xs font-medium", impactColors[variation.impact])}>
            {variation.impact}
          </span>
        </div>

        {isSelected && (
          <div className="flex flex-wrap items-center gap-2 rounded-md border border-always-primary/40 bg-green-300/30 px-4">
            <span>In test</span>
            <span className="text-always-primary/80">•</span>
            <span>{allocationSummary}</span>
          </div>
        )}

        <p className="text-sm text-muted-foreground">{variation.description}</p>

        <div className="space-y-1">
          {variation.changes.map((change, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-always-primary">•</span>
              <span className="text-xs text-muted-foreground">{change}</span>
            </div>
          ))}
        </div>
      </div>

      <Popup />
    </div>
  )
}
