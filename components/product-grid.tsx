"use client"

import { useMemo, useState } from "react"
import ProductCard from "./product-card"
import { ShopHeader } from "./shop-header"
import { FilterSidebar } from "./filter-sidebar"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  brand: string
  rating: number
  discount: number
  primeExclusive: boolean
  primeEarlyAccess: boolean
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 299,
    image: "/premium-headphones.png",
    category: "Audio",
    brand: "SoundSphere",
    rating: 4.6,
    discount: 25,
    primeExclusive: true,
    primeEarlyAccess: false,
  },
  {
    id: "2",
    name: "Wireless Earbuds",
    price: 149,
    image: "/wireless-earbuds.png",
    category: "Audio",
    brand: "PulseAudio",
    rating: 4.2,
    discount: 15,
    primeExclusive: false,
    primeEarlyAccess: true,
  },
  {
    id: "3",
    name: "Smart Watch",
    price: 399,
    image: "/smartwatch-lifestyle.png",
    category: "Wearables",
    brand: "Orbit Labs",
    rating: 4.7,
    discount: 18,
    primeExclusive: true,
    primeEarlyAccess: true,
  },
  {
    id: "4",
    name: "Portable Speaker",
    price: 199,
    image: "/portable-speaker.png",
    category: "Audio",
    brand: "EchoPulse",
    rating: 4.4,
    discount: 30,
    primeExclusive: false,
    primeEarlyAccess: false,
  },
  {
    id: "5",
    name: "Phone Stand",
    price: 49,
    image: "/phone-stand.jpg",
    category: "Accessories",
    brand: "DeskNest",
    rating: 4,
    discount: 12,
    primeExclusive: false,
    primeEarlyAccess: false,
  },
  {
    id: "6",
    name: "USB-C Cable",
    price: 29,
    image: "/usb-c-cable.jpg",
    category: "Cables",
    brand: "ChargeCraft",
    rating: 3.8,
    discount: 10,
    primeExclusive: false,
    primeEarlyAccess: false,
  },
]

interface ProductGridProps {
  selectedProductId: string | null
  onSelectProduct: (id: string) => void
  onOpenVariations: (id: string) => void
  previewVariationId: string | null
}

const PRICE_LIMITS = { min: 0, max: 500 }
const DISCOUNT_LIMITS = { min: 0, max: 90 }

export default function ProductGrid({
  selectedProductId,
  onSelectProduct,
  onOpenVariations,
  previewVariationId,
}: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [ratingFilter, setRatingFilter] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 400])
  const [discountRange, setDiscountRange] = useState<[number, number]>([10, 40])
  const [primePrograms, setPrimePrograms] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<string>("featured")

  const categories = useMemo(
    () => Array.from(new Set(PRODUCTS.map((product) => product.category))),
    [],
  )

  const brands = useMemo(
    () => Array.from(new Set(PRODUCTS.map((product) => product.brand))).sort(),
    [],
  )

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return PRODUCTS.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.brand.toLowerCase().includes(normalizedSearch)

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesBrands =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand)

      const matchesRating =
        ratingFilter === "all" || product.rating >= Number(ratingFilter)

      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1]

      const matchesDiscount =
        product.discount >= discountRange[0] && product.discount <= discountRange[1]

      const matchesPrime =
        primePrograms.length === 0 ||
        primePrograms.every((program) =>
          program === "prime-exclusive" ? product.primeExclusive : product.primeEarlyAccess,
        )

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrands &&
        matchesRating &&
        matchesPrice &&
        matchesDiscount &&
        matchesPrime
      )
    }).sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price
        case "price-high-low":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return Number(a.id) - Number(b.id)
      }
    })
  }, [
    discountRange,
    priceRange,
    primePrograms,
    ratingFilter,
    searchTerm,
    selectedBrands,
    selectedCategory,
    sortOption,
  ])

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand],
    )
  }

  const handlePrimeToggle = (program: string) => {
    setPrimePrograms((prev) =>
      prev.includes(program) ? prev.filter((item) => item !== program) : [...prev, program],
    )
  }

  const handlePriceRangeChange = (type: "min" | "max", value: number) => {
    setPriceRange(([currentMin, currentMax]) => {
      if (type === "min") {
        const nextMin = Math.max(PRICE_LIMITS.min, Math.min(value, currentMax - 10))
        return [nextMin, currentMax]
      }
      const nextMax = Math.min(PRICE_LIMITS.max, Math.max(value, currentMin + 10))
      return [currentMin, nextMax]
    })
  }

  const handleDiscountRangeChange = (type: "min" | "max", value: number) => {
    setDiscountRange(([currentMin, currentMax]) => {
      if (type === "min") {
        const nextMin = Math.max(DISCOUNT_LIMITS.min, Math.min(value, currentMax - 5))
        return [nextMin, currentMax]
      }
      const nextMax = Math.min(DISCOUNT_LIMITS.max, Math.max(value, currentMin + 5))
      return [currentMin, nextMax]
    })
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <ShopHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="flex flex-1 overflow-hidden">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          brands={brands}
          selectedBrands={selectedBrands}
          onToggleBrand={handleBrandToggle}
          ratingFilter={ratingFilter}
          onRatingChange={setRatingFilter}
          priceRange={priceRange}
          priceLimits={PRICE_LIMITS}
          onPriceRangeChange={handlePriceRangeChange}
          discountRange={discountRange}
          discountLimits={DISCOUNT_LIMITS}
          onDiscountRangeChange={handleDiscountRangeChange}
          selectedPrimePrograms={primePrograms}
          onTogglePrimeProgram={handlePrimeToggle}
        />

        <div className="flex-1 overflow-y-auto bg-background">
          <div className="space-y-8 px-6 py-8">
            <div className="rounded-2xl border border-border bg-card/80 px-6 py-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-2xl space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Conversion Lab
                  </p>
                  <h1 className="text-2xl font-semibold text-foreground">
                    Curated experiences from ShopSample.io partners
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Explore ready-to-test components with performance data, premium creative, and
                    variation ideas tailored for modern storefronts.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background px-5 py-3 text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {filteredProducts.length}
                  </span>{" "}
                  of {PRODUCTS.length} products
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded-md bg-muted px-2 py-1 font-medium text-foreground">
                  Search powered
                </span>
                <span>Surface insights faster with catalog-wide intelligence.</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <label htmlFor="catalog-sort" className="text-xs font-semibold uppercase text-muted-foreground">
                  Sort by
                </label>
                <select
                  id="catalog-sort"
                  value={sortOption}
                  onChange={(event) => setSortOption(event.target.value)}
                  className="rounded-lg border border-border bg-card/80 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProductId === product.id}
                    onSelect={() => onSelectProduct(product.id)}
                    onOpenVariations={() => onOpenVariations(product.id)}
                    previewVariationId={previewVariationId}
                  />
                ))
              ) : (
                <div className="col-span-full rounded-2xl border border-dashed border-border/70 bg-muted/40 p-12 text-center">
                  <h3 className="text-lg font-semibold text-foreground">No products match those filters</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your filters to broaden the results and discover more components.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
