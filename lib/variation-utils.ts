interface VariationPreview {
  name: string
  content?: string
}

const VARIATION_PREVIEWS: Record<string, VariationPreview> = {
  minimalist: { name: "Minimalist Layout", content: "Clean & focused" },
  "price-highlight": { name: "Price Highlight", content: "Price emphasized" },
  "cta-focus": { name: "CTA Focus", content: "Action ready" },
  "social-proof": { name: "Social Proof", content: "⭐ 4.8 (2.3k reviews)" },
  urgency: { name: "Urgency Signals", content: "Only 3 left!" },
  comparison: { name: "Comparison View", content: "Compare options" },
  premium: { name: "Premium Showcase", content: "Luxury styling" },
  interactive: { name: "Interactive Hover", content: "Animated effects" },
  eco: { name: "Eco-Friendly Badge", content: "♻️ Sustainable" },
  award: { name: "Award Winner", content: "🏆 Best seller" },
  "expert-review": { name: "Expert Review", content: "Expert approved" },
  warranty: { name: "Warranty Highlight", content: "2-year warranty" },
}

export function getVariationPreview(variationId: string): VariationPreview | null {
  return VARIATION_PREVIEWS[variationId] || null
}
