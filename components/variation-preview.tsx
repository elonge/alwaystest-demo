"use client"

import { useState } from "react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 299,
    image: "/premium-headphones.png",
    category: "Audio",
  },
  {
    id: "2",
    name: "Wireless Earbuds",
    price: 149,
    image: "/wireless-earbuds.png",
    category: "Audio",
  },
  {
    id: "3",
    name: "Smart Watch",
    price: 399,
    image: "/smartwatch-lifestyle.png",
    category: "Wearables",
  },
  {
    id: "4",
    name: "Portable Speaker",
    price: 199,
    image: "/portable-speaker.png",
    category: "Audio",
  },
  {
    id: "5",
    name: "Phone Stand",
    price: 49,
    image: "/phone-stand.jpg",
    category: "Accessories",
  },
  {
    id: "6",
    name: "USB-C Cable",
    price: 29,
    image: "/usb-c-cable.jpg",
    category: "Cables",
  },
]

interface VariationPreviewProps {
  productId: string
  variationId: string | null
  onClose: () => void
}

export default function VariationPreview({ productId, variationId, onClose }: VariationPreviewProps) {
  const product = PRODUCTS.find((p) => p.id === productId)

  if (!product) return null

  const previewKey = variationId ?? "comparison"

  const renderVariationPreview = () => {
    switch (previewKey) {
      case "minimalist":
        return <MinimalistPreview product={product} />
      case "price-highlight":
        return <PriceHighlightPreview product={product} />
      case "cta-focus":
        return <CTAFocusPreview product={product} />
      case "social-proof":
        return <SocialProofPreview product={product} />
      case "urgency":
        return <UrgencyPreview product={product} />
      case "comparison":
        return <ComparisonPreview product={product} />
      case "image-prominent":
        return <ImageProminentPreview product={product} />
      case "premium":
        return <PremiumPreview product={product} />
      case "interactive":
        return <InteractivePreview product={product} />
      case "eco":
        return <EcoPreview product={product} />
      case "award":
        return <AwardPreview product={product} />
      case "expert-review":
        return <ExpertReviewPreview product={product} />
      case "warranty":
        return <WarrantyPreview product={product} />
      case "lifestyle-story":
        return <LifestyleStoryPreview product={product} />
      case "hover-float":
        return <HoverFloatPreview product={product} />
      case "fast-buy":
        return <FastBuyPreview product={product} />
      default:
        return <ComparisonPreview product={product} />
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Preview Area */}
      <div className="mx-auto w-full">{renderVariationPreview()}</div>
    </div>
  );
}

// Variation Preview Components
function ImageProminentPreview({ product }: { product: Product }) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-lg">
      <div className="aspect-square bg-muted overflow-hidden">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <p className="text-xs font-medium text-muted-foreground mb-2">{product.category}</p>
        <h3 className="text-xl font-bold text-foreground mb-4">{product.name}</h3>
        <p className="text-2xl font-bold text-primary">${product.price}</p>
      </div>
    </div>
  )
}

function MinimalistPreview({ product }: { product: Product }) {
  return (
    <div className="rounded-3xl border border-border/70 bg-background p-10 text-center shadow-sm space-y-8">
      <div className="mx-auto h-36 w-36 overflow-hidden rounded-full border border-muted">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Minimal edit</p>
        <h3 className="text-3xl font-light text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Streamlined layout that keeps focus on the essentials.
        </p>
      </div>
      <p className="text-2xl font-semibold text-primary">${product.price}</p>
    </div>
  )
}

function PriceHighlightPreview({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/30 shadow-lg">
      <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-8 text-primary-foreground space-y-2">
        <p className="text-xs uppercase tracking-widest">Limited offer</p>
        <p className="text-5xl font-black leading-tight">${product.price}</p>
        <p className="text-sm">Ends today • Free shipping</p>
      </div>
      <div className="grid gap-6 bg-card p-6 sm:grid-cols-3 sm:items-center">
        <div className="space-y-3 sm:col-span-2">
          <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground">
            Save big on our best-selling product with highlighted pricing up front.
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">Best price</span>
            <span>30-day returns</span>
          </div>
        </div>
        <div className="flex justify-center sm:col-span-1 sm:justify-end">
          <div className="flex aspect-square w-28 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-muted">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="h-24 w-24 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function CTAFocusPreview({ product }: { product: Product }) {
  return (
    <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20 p-6 shadow-lg">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-2xl bg-white shadow-inner">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground">Curated details with a prominent action button.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-3xl font-semibold text-primary">${product.price}</p>
          <div className="flex flex-wrap gap-2 text-xs text-primary">
            <span className="rounded-full bg-primary/10 px-3 py-1">Free Express Delivery</span>
            <span className="rounded-full bg-primary/10 px-3 py-1">2 Year Warranty</span>
          </div>
          <button className="w-full rounded-xl bg-primary text-primary-foreground py-4 text-lg font-semibold shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

function SocialProofPreview({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="h-56 md:h-auto md:w-1/2">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 p-6 md:w-1/2">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <img
                  key={i}
                  src="/placeholder-user.jpg"
                  alt="Reviewer avatar"
                  className="h-8 w-8 rounded-full border-2 border-card object-cover"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">2,847 verified buyers</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground">
            “This product transformed my daily routine. The quality is unmatched and the customer service is stellar.”
          </p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-primary">${product.price}</p>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Top rated</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function UrgencyPreview({ product }: { product: Product }) {
  return (
    <div className="rounded-2xl border border-destructive/40 bg-destructive/5 shadow-md overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase text-destructive">
          <span>Flash sale</span>
          <span>Ends in 02:14:12</span>
        </div>
        <div className="h-2 w-full rounded-full bg-destructive/20">
          <div className="h-full w-3/5 rounded-full bg-destructive" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-destructive">${product.price}</span>
          <span className="text-sm text-muted-foreground line-through">${Math.round(product.price + 80)}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Only 3 units left in stock. Secure yours before the timer runs out.
        </p>
      </div>
      <div className="flex items-center gap-4 border-t border-destructive/20 bg-card/60 p-4">
        <div className="h-16 w-16 overflow-hidden rounded-lg border border-destructive/20">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>Recent purchases:</p>
          <p className="text-destructive font-semibold">Anna (2 min ago) · Jorge (5 min ago) · Priya (9 min ago)</p>
        </div>
      </div>
    </div>
  )
}

function ComparisonPreview({ product }: { product: Product }) {
  const features = [
    { name: "Price", ours: `$${product.price}`, theirs: `$${Math.round(product.price * 1.15)}` },
    { name: "Warranty", ours: "24 months", theirs: "12 months" },
    { name: "Shipping", ours: "Free 2-day", theirs: "$15 standard" },
    { name: "Accessories", ours: "Included bundle", theirs: "Sold separately" },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="flex items-center gap-4 bg-muted/40 p-6">
        <div className="h-20 w-20 overflow-hidden rounded-xl border border-border">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
          <p className="text-sm text-muted-foreground">Compare specs before you buy.</p>
        </div>
      </div>
      <div className="divide-y divide-border/60">
        <div className="hidden bg-muted/30 px-6 py-3 text-xs font-semibold uppercase text-muted-foreground sm:grid sm:grid-cols-3">
          <span>Feature</span>
          <span className="text-primary text-center">Ours</span>
          <span className="text-right">Theirs</span>
        </div>
        {features.map((feature) => (
          <div key={feature.name} className="grid gap-2 px-6 py-4 text-sm sm:grid-cols-3 sm:items-center">
            <div className="font-medium text-foreground">{feature.name}</div>
            <div className="text-primary sm:text-center">
              <span className="mr-1 text-xs font-semibold uppercase text-muted-foreground sm:hidden">Ours</span>
              {feature.ours}
            </div>
            <div className="text-muted-foreground sm:text-right">
              <span className="mr-1 text-xs font-semibold uppercase text-muted-foreground sm:hidden">Theirs</span>
              {feature.theirs}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-muted/20 p-6">
        <div className="w-full rounded-lg border border-primary py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/5">
          View full comparison
        </div>
      </div>
    </div>
  )
}

function PremiumPreview({ product }: { product: Product }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-100 shadow-xl">
      <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="relative p-10 space-y-6">
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-800">Signature</span>
          <div className="h-px flex-1 bg-amber-200" />
          <span className="text-sm text-amber-700">Member exclusive</span>
        </div>
        <h3 className="text-4xl font-serif text-amber-900">{product.name}</h3>
        <p className="text-lg text-amber-800 max-w-md">
          Elevate your experience with curated materials and premium finishing touches.
        </p>
        <div className="flex items-end gap-4">
          <p className="text-5xl font-bold text-amber-900">${product.price}</p>
          <p className="text-sm uppercase tracking-widest text-amber-700">Complimentary engraving</p>
        </div>
      </div>
      <div className="relative mt-4 h-56 overflow-hidden border-t border-amber-200">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
      </div>
    </div>
  )
}

function InteractivePreview({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-64">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-300 ${hovered ? "scale-110" : ""}`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 text-primary-foreground">
            <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/80">Quick look</p>
            <p className="text-2xl font-semibold">{product.name}</p>
            <p className="text-sm text-primary-foreground/80">
              Hover to explore features and add to your shortlist instantly.
            </p>
            <button className="w-full rounded-lg bg-primary text-primary-foreground py-2 font-medium">
              View product
            </button>
          </div>
        </div>
        {!hovered && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-4 py-2 text-xs uppercase tracking-widest text-white">
            Hover to interact
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">${product.price}</span>
          <span className="text-xs text-muted-foreground">Tap to compare</span>
        </div>
      </div>
    </div>
  )
}

function EcoPreview({ product }: { product: Product }) {
  const highlights = [
    "Carbon neutral shipping",
    "Made with recycled aluminum",
    "1% of revenue donated to the planet",
  ]

  return (
    <div className="overflow-hidden rounded-2xl border border-green-400/40 bg-gradient-to-br from-green-50 via-white to-green-100 shadow-inner">
      <div className="grid gap-6 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-green-500/10 p-3 text-2xl">🌱</div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-700">Eco collection</p>
            <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
          </div>
        </div>
        <div className="h-56 overflow-hidden rounded-2xl border border-green-500/20">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <p className="text-sm text-muted-foreground">
          Designed with sustainability in mind, using responsible materials and processes.
        </p>
        <ul className="space-y-2 text-sm text-green-800">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 text-green-500">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-green-700">${product.price}</span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Carbon offset included
          </span>
        </div>
      </div>
    </div>
  )
}

function AwardPreview({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-yellow-400 bg-gradient-to-br from-yellow-100 via-white to-yellow-200 shadow-xl">
      <div className="space-y-5 p-6">
        <div className="flex items-center gap-3 text-yellow-800">
          <span className="text-3xl">🏆</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest">Award winner 2024</p>
            <h3 className="text-2xl font-semibold text-foreground">{product.name}</h3>
          </div>
        </div>
        <div className="relative h-48 overflow-hidden rounded-2xl border border-yellow-300">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
          <div className="absolute top-3 left-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900">
            Editors' Choice
          </div>
        </div>
        <p className="text-sm text-yellow-900">
          Recognized for outstanding performance and customer satisfaction across the category.
        </p>
        <div className="flex items-center justify-between text-yellow-900">
          <span className="text-3xl font-black">${product.price}</span>
          <span className="rounded-full bg-yellow-300/40 px-3 py-1 text-xs font-semibold">4.9★ average rating</span>
        </div>
      </div>
    </div>
  )
}

function ExpertReviewPreview({ product }: { product: Product }) {
  return (
    <div className="rounded-2xl border border-blue-300 bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-lg overflow-hidden">
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-full border border-blue-200">
            <img src="/placeholder-logo.png" alt="Publication logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-700">Tech Review Weekly</p>
            <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
          </div>
        </div>
        <blockquote className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 italic">
          “Outstanding balance of performance, design, and value. A top pick for professionals and enthusiasts alike.”
        </blockquote>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span>
            Score: <span className="text-blue-700 font-semibold">9.2 / 10</span>
          </span>
          <span>Tested in: March 2024 Lab Review</span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-blue-200 bg-blue-50 px-6 py-4">
        <span className="text-2xl font-bold text-blue-800">${product.price}</span>
        <button className="rounded-lg border border-blue-400 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100">
          Read full review
        </button>
      </div>
    </div>
  )
}

function WarrantyPreview({ product }: { product: Product }) {
  const coverage = [
    { label: "Year 1", detail: "Full coverage • Accidental damage included" },
    { label: "Year 2", detail: "Extended support • Priority replacements" },
    { label: "Year 3+", detail: "Optional care plan available at checkout" },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card shadow-md overflow-hidden">
      <div className="bg-muted/60 px-6 py-5">
        <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          Every purchase comes protected with our worry-free coverage.
        </p>
      </div>
      <div className="grid gap-6 p-6">
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 overflow-hidden rounded-xl border border-border/60">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="text-lg font-semibold text-primary">${product.price}</p>
            <p>Includes complimentary 2-year warranty with options to extend at checkout.</p>
          </div>
        </div>
        <div className="space-y-3">
          {coverage.map((item) => (
            <div key={item.label} className="rounded-xl border border-border/60 bg-background p-4">
              <p className="text-xs font-semibold uppercase text-primary">{item.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 text-sm text-primary">
          Register within 30 days to unlock lifetime device monitoring and VIP support.
        </div>
      </div>
    </div>
  )
}

function LifestyleStoryPreview({ product }: { product: Product }) {
  const storyMoments = [
    {
      time: "7:10 AM",
      title: "Ease into the morning",
      description:
        "Slip on your headphones while the coffee brews. The day starts with a playlist that fills the kitchen without waking the rest of the house.",
      icon: "🌅",
    },
    {
      time: "12:30 PM",
      title: "Stay in rhythm",
      description:
        "On the midday commute, the compact fit disappears into your routine, keeping calls crisp and music balanced between meetings.",
      icon: "🚇",
    },
    {
      time: "8:45 PM",
      title: "Wind down fully",
      description:
        "Evening stretches end with a favorite podcast. The outside world fades so you can settle in, shoulders down, mind at ease.",
      icon: "🌙",
    },
  ]

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
      <div className="relative flex flex-col items-start gap-5 bg-gradient-to-br from-purple-700 via-purple-500 to-indigo-500 p-8 text-primary-foreground">
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em]">Your day, remixed</span>
        <h3 className="text-3xl font-semibold">{product.name}</h3>
        <p className="max-w-md text-sm text-white/80">
          Follow the product from sunrise to lights-out and feel how it makes every moment just a little more yours.
        </p>
        <div className="self-end overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-32 w-32 object-cover" />
        </div>
      </div>
      <div className="grid gap-6 bg-background/70 p-6">
        {storyMoments.map((moment) => (
          <div key={moment.time} className="flex items-start gap-4 rounded-2xl border border-border/50 bg-card/60 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xl text-primary">
              {moment.icon}
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{moment.time}</p>
              <p className="text-lg font-semibold text-foreground">{moment.title}</p>
              <p className="text-sm text-muted-foreground">{moment.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-border/60 bg-muted/40 px-6 py-4 text-sm text-muted-foreground">
        <span>Made to move with you from first alarm to lights-out.</span>
        <span className="text-lg font-semibold text-primary">${product.price}</span>
      </div>
    </div>
  )
}

function HoverFloatPreview({ product }: { product: Product }) {
  const comparisonFeatures = [
    { name: "Price", ours: `$${product.price}`, theirs: `$${Math.round(product.price * 1.12)}` },
    { name: "Warranty", ours: "24 months", theirs: "12 months" },
    { name: "Shipping", ours: "Free 2-day", theirs: "$15 standard" },
    { name: "Accessories", ours: "Included bundle", theirs: "Sold separately" },
  ]

  return (
    <div className="group relative w-full">
      <div className="absolute inset-0 rounded-3xl bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-2xl">
        <div className="flex flex-col gap-5 bg-muted/50 p-6 transition-colors duration-300 group-hover:bg-muted/40 sm:flex-row sm:items-center">
          <div className="h-20 w-20 overflow-hidden rounded-2xl border border-border bg-card shadow-inner transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-1 group-hover:shadow-lg">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Daily driver</p>
            <h3 className="text-2xl font-semibold text-foreground">{product.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Our price</p>
            <p className="text-3xl font-bold text-primary">${product.price}</p>
          </div>
        </div>

        <div className="divide-y divide-border/60">
          <div className="hidden bg-muted/30 px-6 py-3 text-xs font-semibold uppercase text-muted-foreground sm:grid sm:grid-cols-3">
            <span>Feature</span>
            <span className="text-primary text-center">Ours</span>
            <span className="text-right">Theirs</span>
          </div>
          {comparisonFeatures.map((feature) => (
            <div
              key={feature.name}
              className="grid gap-2 px-6 py-4 text-sm transition-colors duration-300 group-hover:bg-muted/20 sm:grid-cols-3 sm:items-center"
            >
              <div className="font-medium text-foreground">{feature.name}</div>
              <div className="text-primary sm:text-center">
                <span className="mr-1 text-xs font-semibold uppercase text-muted-foreground sm:hidden">Ours</span>
                {feature.ours}
              </div>
              <div className="text-muted-foreground sm:text-right">
                <span className="mr-1 text-xs font-semibold uppercase text-muted-foreground sm:hidden">Theirs</span>
                {feature.theirs}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-background/80 px-6 py-5">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Slight lift, stronger focus. Try hovering.</span>
            <span className="rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold text-primary">
              Hover ready
            </span>
          </div>
          <div className="mt-4 w-full rounded-xl border border-primary px-4 py-3 text-center text-sm font-semibold text-primary transition-colors duration-300 group-hover:bg-primary/5">
            View full comparison
          </div>
        </div>
      </div>
    </div>
  )
}

function FastBuyPreview({ product }: { product: Product }) {
  const quickBenefits = [
    { label: "Ships today", icon: "🚚" },
    { label: "1-click checkout", icon: "⚡" },
    { label: "45-day returns", icon: "🛡️" },
  ]

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-primary/40 bg-card shadow-xl">
      <div className="flex flex-col gap-6 p-6">
        <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-3xl border border-primary/20 bg-muted/30 shadow-inner transition-all duration-300">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-4 left-4 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Ready to ship
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">Fast decision</p>
            <h3 className="text-3xl font-semibold text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Essential details upfront with a single action that gets you checked out in seconds.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-primary">${product.price}</p>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              In stock · Free express shipping
            </span>
          </div>
          <div className="grid gap-2">
            {quickBenefits.map((benefit) => (
              <div
                key={benefit.label}
                className="flex items-center gap-2 rounded-xl border border-border/70 bg-muted/20 px-3 py-2 text-sm text-muted-foreground"
              >
                <span className="text-lg">{benefit.icon}</span>
                <span>{benefit.label}</span>
              </div>
            ))}
          </div>
          <button className="w-full rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            Buy now
          </button>
          <div className="flex flex-col gap-1 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-xs text-primary">
            <span className="font-semibold uppercase tracking-[0.2em] text-primary">1-click enabled</span>
            <span className="text-muted-foreground">Secure payment in under 10 seconds.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
