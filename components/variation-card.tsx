"use client"

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
}: VariationCardProps) {
  if (compact) {
    return (
      <div
        className={cn(
          "flex-shrink-0 w-48 text-left p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer",
          isPreview
            ? "border-primary bg-primary/10 ring-2 ring-primary/30"
            : "border-border bg-background hover:border-primary/30",
        )}
      >
        <div onClick={onPreview} className="mb-2">
          <p className="text-xs font-medium text-primary uppercase tracking-wide truncate">
            {isPreview ? "👁️ Preview" : "Click preview"}
          </p>
        </div>

        <div className="flex items-start gap-2">
          {/* Checkbox */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggle()
            }}
            className={cn(
              "mt-0.5 h-4 w-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all",
              isSelected ? "bg-primary border-primary" : "border-border",
            )}
          >
            {isSelected && (
              <svg className="h-2.5 w-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <h3 className="font-semibold text-foreground text-sm truncate">{variation.name}</h3>
              <span
                className={cn(
                  "text-xs font-medium px-1.5 py-0.5 rounded border flex-shrink-0",
                  impactColors[variation.impact],
                )}
              >
                {variation.impact.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{variation.description}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer",
        isPreview
          ? "border-primary bg-primary/10 ring-2 ring-primary/30"
          : "border-border bg-background hover:border-primary/30",
      )}
    >
      <div onClick={onPreview} className="mb-3 pb-3 border-b border-border/50">
        <p className="text-xs font-medium text-primary uppercase tracking-wide">
          {isPreview ? "👁️ Previewing" : "Click to preview"}
        </p>
      </div>

      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          className={cn(
            "mt-1 h-5 w-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all",
            isSelected ? "bg-primary border-primary" : "border-border",
          )}
        >
          {isSelected && (
            <svg className="h-3 w-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{variation.name}</h3>
            <span className={cn("text-xs font-medium px-2 py-1 rounded border", impactColors[variation.impact])}>
              {variation.impact}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{variation.description}</p>

          {/* Changes */}
          <div className="space-y-1">
            {variation.changes.map((change, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-xs text-muted-foreground">{change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
