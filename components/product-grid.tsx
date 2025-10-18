"use client"
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
  previewVariationId: string | null
}

export default function ProductGrid({ selectedProductId, onSelectProduct, previewVariationId }: ProductGridProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Product Catalog</h1>
        <p className="text-muted-foreground">
          {previewVariationId
            ? "Previewing variation across all products"
            : "Click on a product to view and test variations"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isSelected={selectedProductId === product.id}
            onSelect={() => onSelectProduct(product.id)}
            previewVariationId={previewVariationId}
          />
        ))}
      </div>
    </div>
  )
}
