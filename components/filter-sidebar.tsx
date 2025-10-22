"use client"

interface FilterSidebarProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  brands: string[]
  selectedBrands: string[]
  onToggleBrand: (brand: string) => void
  ratingFilter: string
  onRatingChange: (rating: string) => void
  priceRange: [number, number]
  priceLimits: { min: number; max: number }
  onPriceRangeChange: (type: "min" | "max", value: number) => void
  discountRange: [number, number]
  discountLimits: { min: number; max: number }
  onDiscountRangeChange: (type: "min" | "max", value: number) => void
  selectedPrimePrograms: string[]
  onTogglePrimeProgram: (program: string) => void
}

export function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  brands,
  selectedBrands,
  onToggleBrand,
  ratingFilter,
  onRatingChange,
  priceRange,
  priceLimits,
  onPriceRangeChange,
  discountRange,
  discountLimits,
  onDiscountRangeChange,
  selectedPrimePrograms,
  onTogglePrimeProgram,
}: FilterSidebarProps) {
  const priceLeft =
    ((priceRange[0] - priceLimits.min) / (priceLimits.max - priceLimits.min)) * 100
  const priceRight =
    ((priceRange[1] - priceLimits.min) / (priceLimits.max - priceLimits.min)) * 100

  const discountLeft =
    ((discountRange[0] - discountLimits.min) / (discountLimits.max - discountLimits.min)) * 100
  const discountRight =
    ((discountRange[1] - discountLimits.min) / (discountLimits.max - discountLimits.min)) * 100

  const ratingOptions = [
    { value: "all", label: "All" },
    { value: "4", label: "4★ & up" },
    { value: "3", label: "3★ & up" },
    { value: "2", label: "2★ & up" },
  ]

  const primeOptions = [
    { value: "prime-exclusive", label: "Prime Exclusive" },
    { value: "prime-early-access", label: "Prime Early Access" },
  ]

  return (
    <aside className="hidden w-72 shrink-0 border-r border-border bg-white/80 px-6 py-6 backdrop-blur lg:block shadow-md">
      <div className="space-y-6 text-sm text-foreground">
        <section>
          <h3 className="text-sm font-semibold text-foreground">Department</h3>
          <div className="mt-3 space-y-2">
            {["all", ...categories].map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition hover:bg-primary/10"
              >
                <input
                  type="radio"
                  name="department"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="text-primary focus:ring-primary"
                />
                <span>{category === "all" ? "All" : category}</span>
              </label>
            ))}
            <button className="pl-2 text-xs font-medium text-primary transition hover:underline">See more</button>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-foreground">Brands</h3>
          <div className="mt-3 space-y-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition hover:bg-primary/10"
              >
                <input
                  type="checkbox"
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onToggleBrand(brand)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>{brand}</span>
              </label>
            ))}
            <button className="pl-2 text-xs font-medium text-primary transition hover:underline">See more</button>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-foreground">Customer Reviews</h3>
          <div className="mt-3 space-y-2">
            {ratingOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition hover:bg-primary/10"
              >
                <input
                  type="radio"
                  name="rating"
                  value={option.value}
                  checked={ratingFilter === option.value}
                  onChange={() => onRatingChange(option.value)}
                  className="text-primary focus:ring-primary"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-foreground">Price</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            ${priceRange[0]} – ${priceRange[1]}
          </p>
          <div className="relative mt-4 h-10">
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-black/10" />
            <div
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
              style={{ left: `${priceLeft}%`, right: `${100 - priceRight}%` }}
            />
            <input
              type="range"
              min={priceLimits.min}
              max={priceLimits.max}
              step={10}
              value={priceRange[0]}
              onChange={(event) => onPriceRangeChange("min", Number(event.target.value))}
              className="range-thumb"
              aria-label="Minimum price"
            />
            <input
              type="range"
              min={priceLimits.min}
              max={priceLimits.max}
              step={10}
              value={priceRange[1]}
              onChange={(event) => onPriceRangeChange("max", Number(event.target.value))}
              className="range-thumb"
              aria-label="Maximum price"
            />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-foreground">Discount</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {discountRange[0]}% – {discountRange[1]}%
          </p>
          <div className="relative mt-4 h-10">
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-black/10" />
            <div
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
              style={{ left: `${discountLeft}%`, right: `${100 - discountRight}%` }}
            />
            <input
              type="range"
              min={discountLimits.min}
              max={discountLimits.max}
              step={5}
              value={discountRange[0]}
              onChange={(event) => onDiscountRangeChange("min", Number(event.target.value))}
              className="range-thumb"
              aria-label="Minimum discount"
            />
            <input
              type="range"
              min={discountLimits.min}
              max={discountLimits.max}
              step={5}
              value={discountRange[1]}
              onChange={(event) => onDiscountRangeChange("max", Number(event.target.value))}
              className="range-thumb"
              aria-label="Maximum discount"
            />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-foreground">Prime Programs</h3>
          <div className="mt-3 space-y-2">
            {primeOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 transition hover:bg-primary/10"
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedPrimePrograms.includes(option.value)}
                  onChange={() => onTogglePrimeProgram(option.value)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}
