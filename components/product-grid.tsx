"use client"
import { ChangeEvent, useMemo, useState } from "react"
import ProductCard from "./product-card"

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

interface ProductGridProps {
  selectedProductId: string | null
  onSelectProduct: (id: string) => void
  onOpenVariations: (id: string) => void
  previewVariationId: string | null
}

export default function ProductGrid({
  selectedProductId,
  onSelectProduct,
  onOpenVariations,
  previewVariationId,
}: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceFilter, setPriceFilter] = useState<string>("all")
  const [sortOption, setSortOption] = useState<string>("featured")

  const categories = useMemo(() => Array.from(new Set(PRODUCTS.map((product) => product.category))), [])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    const priceMatches = (price: number) => {
      switch (priceFilter) {
        case "under-100":
          return price < 100
        case "100-250":
          return price >= 100 && price <= 250
        case "above-250":
          return price > 250
        default:
          return true
      }
    }

    const baseFiltered = PRODUCTS.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch)

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      return matchesSearch && matchesCategory && priceMatches(product.price)
    })

    const sorted = [...baseFiltered]
    sorted.sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price
        case "price-high-low":
          return b.price - a.price
        default:
          return Number(a.id) - Number(b.id)
      }
    })

    return sorted
  }, [priceFilter, searchTerm, selectedCategory, sortOption])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="space-y-8 p-8">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-8 py-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-4xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Curated for Conversion</p>
            <h1 className="text-4xl font-bold text-foreground">
              The Amazing Product Catalog Website
            </h1>
            <p className="text-base text-muted-foreground">
              A modern catalog experience that showcases high-impact components alongside data-backed comparisons.
              Filter, sort, and explore to find the perfect addition to your storefront.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="rounded-full border border-border/70 bg-background/60 px-4 py-1">
                Built for growth teams
              </div>
              <div className="rounded-full border border-border/70 bg-background/60 px-4 py-1">Real-time insights</div>
              <div className="rounded-full border border-border/70 bg-background/60 px-4 py-1">AI-powered variations</div>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="rounded-2xl border border-border bg-background/70 p-4 text-center shadow-sm">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Products Live</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{PRODUCTS.length}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4 text-center shadow-sm">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Industries</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{categories.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Browse the catalog</h2>
          <p className="text-sm text-muted-foreground">
            Compare top-performing experiences and experiment-ready components.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">{filteredProducts.length}</span>
          {filteredProducts.length === 1 ? "product" : "products"}
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card/70 px-6 py-5 shadow-sm backdrop-blur">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label htmlFor="catalog-search" className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
              Search products
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m17.5 17.5-3.75-3.75M9.583 4.167a5.417 5.417 0 1 1 0 10.833 5.417 5.417 0 0 1 0-10.833Z"
                  />
                </svg>
              </span>
              <input
                id="catalog-search"
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by name, category, or feature"
                className="w-full rounded-2xl border border-border bg-background/80 py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div>
            <label htmlFor="catalog-category" className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
              Category
            </label>
            <select
              id="catalog-category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full rounded-2xl border border-border bg-background/80 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
            <div>
              <label htmlFor="catalog-price" className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                Price range
              </label>
              <select
                id="catalog-price"
                value={priceFilter}
                onChange={(event) => setPriceFilter(event.target.value)}
                className="w-full rounded-2xl border border-border bg-background/80 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              >
                <option value="all">Any budget</option>
                <option value="under-100">Under $100</option>
                <option value="100-250">$100 to $250</option>
                <option value="above-250">Above $250</option>
              </select>
            </div>
            <div>
              <label htmlFor="catalog-sort" className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                Sort by
              </label>
              <select
                id="catalog-sort"
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
                className="w-full rounded-2xl border border-border bg-background/80 px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <div className="col-span-full rounded-3xl border border-dashed border-border/70 bg-muted/30 p-12 text-center">
            <h3 className="text-lg font-semibold text-foreground">No products match those filters</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search terms or categories to discover more components.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
