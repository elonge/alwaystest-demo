"use client"

import { useEffect, useState } from "react"

export function ExperimentModeBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsVisible(true)
    }, 120)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [])

  return (
    <div
      aria-live="polite"
      className={`fixed right-6 bottom-6 z-50 transform transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div
        className="flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium text-white shadow-[0_18px_42px_rgba(79,57,246,0.35)] ring-1 ring-white/15 backdrop-blur-sm"
        style={{
          background: "linear-gradient(135deg, #00baa7 0%, #4f39f6 100%)",
        }}
      >
        <span aria-hidden="true" className="text-base leading-none">
          🧪
        </span>
        <span className="flex items-center gap-2">
          <span className="tracking-wide uppercase text-[11px] text-white/80">Build Experiments Mode</span>
          <span className="hidden text-base font-semibold sm:inline">—</span>
          <span className="flex items-center gap-1 rounded-full bg-[#0d1117]/70 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#00d3bd] shadow-inner shadow-[#0d1117]/40">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d3bd]" aria-hidden="true" />
            ON
          </span>
        </span>
      </div>
    </div>
  )
}
