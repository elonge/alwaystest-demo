"use client"

import Image from "next/image"
import { ChangeEvent } from "react"

interface ShopHeaderProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function ShopHeader({ searchTerm, onSearchChange }: ShopHeaderProps) {
  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value)
  }

  return (
    <header className="border-b border-black/20 bg-primary/40 text-primary shadow">
      <div className="flex w-full items-center gap-4 px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-md bg-white p-1">
            <Image
              src="/demo-shopsameple-logo.png"
              alt="ShopSample.io logo"
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </div>
          <div>
            <p className="text-lg font-semibold leading-5 text-primary">ShopSample.io</p>
          </div>
        </div>

        <button className="hidden items-center gap-2 rounded-md px-3 py-2 text-left text-xs hover:bg-white/10 sm:flex">
          <div className="text-primary/60">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M12 21s6-4.5 6-10a6 6 0 1 0-12 0c0 5.5 6 10 6 10Z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="11" r="2" />
            </svg>
          </div>
          <div className="leading-tight">
            <p className="text-[11px] uppercase text-primary/40">Deliver to</p>
            <p className="text-sm font-semibold text-primary/90">Demo Location</p>
          </div>
        </button>

        <div className="flex flex-1 items-stretch rounded-md bg-white text-black shadow focus-within:ring-2 focus-within:ring-[#febd69]">
          <select
            className="hidden shrink-0 rounded-l-md bg-gray-100 px-3 text-sm text-gray-700 transition hover:bg-gray-200 focus:outline-none sm:block"
            defaultValue="all"
            aria-label="Search category"
          >
            <option value="all">All</option>
            <option value="audio">Audio</option>
            <option value="wearables">Wearables</option>
            <option value="accessories">Accessories</option>
          </select>
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchInput}
            placeholder="Search ShopSample.io"
            className="flex-1 px-3 text-sm text-gray-900 outline-none"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-r-md bg-[#febd69] px-4 transition hover:bg-[#f0a847]"
            aria-label="Search"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-black">
              <path
                d="m17.5 17.5-3.75-3.75m1.25-3.75a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
        </div>

        <button className="hidden items-center gap-2 rounded-md px-3 py-2 text-xs text-primary/80 transition hover:bg-white/10 md:flex">
          <span role="img" aria-label="English flag">
            🇺🇸
          </span>
          <span className="font-semibold">EN</span>
        </button>

        <button className="flex flex-col items-start rounded-md px-3 py-2 text-xs text-primary/70 transition hover:bg-white/10">
          <span className="font-light">Hello, sign in</span>
          <span className="text-sm font-semibold text-primary">Account & Lists</span>
        </button>

        <button className="hidden flex-col items-start rounded-md px-3 py-2 text-xs text-primary/70 transition hover:bg-white/10 lg:flex">
          <span className="font-light">Returns</span>
          <span className="text-sm font-semibold text-primary">& Orders</span>
        </button>

        <button className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-primary/80 transition hover:bg-white/10">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path
              d="M3 5h2l1.68 10.09a1 1 0 0 0 1 .91h9.64a1 1 0 0 0 1-.78l1.5-6.72H7.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="20" r="1" />
            <circle cx="17" cy="20" r="1" />
          </svg>
          <span className="text-sm font-semibold">Cart</span>
        </button>
      </div>

      <div className="bg-primary/50">
        <nav className="flex w-full items-center gap-4 px-6 py-2 text-sm text-primary/80">
          {[
            "All Categories",
            "Today's Deals",
            "Prime Exclusives",
            "Gift Cards",
            "Customer Service",
            "Sell",
            "Insights",
          ].map((item) => (
            <a
              key={item}
              className="rounded-md px-2 py-1 text-white transition hover:bg-white/10 hover:text-primary"
              href="#"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
