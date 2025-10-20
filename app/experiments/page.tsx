import { ExperimentModeBanner } from "@/components/experiment-mode-banner"

type VariantResult = {
  name: string
  conversionRate: number
  sampleSize: number
  uplift?: number
  significance?: number
}

type Experiment = {
  id: string
  name: string
  status: "Running" | "Completed" | "Planning"
  startDate: string
  durationDays: number
  hypothesis: string
  control: VariantResult
  variants: VariantResult[]
  primaryMetric: string
  secondaryMetric: string
}

const experiments: Experiment[] = [
  {
    id: "EXP-204",
    name: "Homepage CTA hero treatment",
    status: "Running",
    startDate: "Sep 9, 2024",
    durationDays: 14,
    hypothesis: "Surfacing the hero CTA above the fold increases sign-up intent.",
    primaryMetric: "Signup conversion rate",
    secondaryMetric: "Activation rate (day 7)",
    control: {
      name: "Control",
      conversionRate: 4.7,
      sampleSize: 1382,
    },
    variants: [
      {
        name: "Variant A — Gradient CTA",
        conversionRate: 5.9,
        uplift: 0.255,
        significance: 88,
        sampleSize: 1390,
      },
      {
        name: "Variant B — Split layout",
        conversionRate: 5.1,
        uplift: 0.085,
        significance: 52,
        sampleSize: 1374,
      },
    ],
  },
  {
    id: "EXP-198",
    name: "Pricing page comparison table",
    status: "Completed",
    startDate: "Aug 26, 2024",
    durationDays: 21,
    hypothesis: "Adding toggles for annual discounts encourages plan upgrades.",
    primaryMetric: "Plan upgrade rate",
    secondaryMetric: "Average contract value",
    control: {
      name: "Control",
      conversionRate: 8.2,
      sampleSize: 2145,
    },
    variants: [
      {
        name: "Variant A — Toggle placement",
        conversionRate: 9.1,
        uplift: 0.11,
        significance: 95,
        sampleSize: 2163,
      },
      {
        name: "Variant B — Feature callouts",
        conversionRate: 7.6,
        uplift: -0.073,
        significance: 34,
        sampleSize: 2159,
      },
    ],
  },
  {
    id: "EXP-210",
    name: "Onboarding checklist sequence",
    status: "Planning",
    startDate: "Sep 23, 2024",
    durationDays: 28,
    hypothesis: "Sequencing checklist tasks reduces early churn.",
    primaryMetric: "Day 14 retention",
    secondaryMetric: "Feature adoption depth",
    control: {
      name: "Control",
      conversionRate: 36.2,
      sampleSize: 980,
    },
    variants: [
      {
        name: "Variant A — Guided tour",
        conversionRate: 0,
        sampleSize: 0,
      },
      {
        name: "Variant B — Cohort nudges",
        conversionRate: 0,
        sampleSize: 0,
      },
    ],
  },
]

const brandGradient = "linear-gradient(135deg, #00baa7 0%, #4f39f6 100%)"

export default function ExperimentsDashboard() {
  const totalExperiments = experiments.length
  const runningExperiments = experiments.filter((experiment) => experiment.status === "Running").length
  const averageUplift =
    totalExperiments === 0
      ? 0
      : experiments
          .map((experiment) => {
            const bestVariant = experiment.variants.reduce<VariantResult | null>((best, current) => {
              if (!best) return current
              return (current.uplift ?? Number.NEGATIVE_INFINITY) > (best.uplift ?? Number.NEGATIVE_INFINITY) ? current : best
            }, null)

            return bestVariant?.uplift ?? 0
          })
          .reduce((acc, value) => acc + value, 0) / totalExperiments

  const cumulativeLift = experiments
    .filter((experiment) => experiment.status !== "Planning")
    .reduce((accumulator, experiment) => {
      const control = experiment.control.conversionRate
      const bestVariant = experiment.variants.reduce((best, current) => {
        if (current.uplift === undefined) return best
        if (!best || (current.uplift ?? 0) > (best.uplift ?? 0)) {
          return current
        }
        return best
      }, experiment.variants[0])

      if (!bestVariant || bestVariant.uplift === undefined) return accumulator

      return accumulator + control * bestVariant.uplift
    }, 0)
  const controlBaseline = weightedAverageControl()

  return (
    <main className="relative min-h-screen bg-[#f9fafc] pb-24 text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "#00baa7" }} />
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full blur-3xl" style={{ background: "#4f39f6" }} />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-[140px]" style={{ background: "#00d3bd" }} />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12">
        <section className="relative overflow-hidden rounded-3xl border border-white/40 bg-[#0d1117] px-10 py-12 text-white shadow-[0_40px_120px_rgba(15,23,42,0.35)]">
          <div className="absolute inset-0 opacity-80" style={{ background: brandGradient }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.42),transparent_55%)] mix-blend-screen" />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                <span className="relative inline-flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00d3bd]/60 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00d3bd]" />
                </span>
                Experiment Performance
              </div>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Compare experiments against your control group in real time
              </h1>
              <p className="text-sm text-white/80 sm:text-base">
                Monitor every variant&apos;s lift, significance, and sample depth. This dashboard helps you spot winning
                treatments faster while keeping the control group as the single source of truth.
              </p>
            </div>
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-stretch lg:w-auto lg:flex-col">
              <HighlightStat
                label="Active experiments"
                value={runningExperiments.toString()}
                mutedLabel="currently measuring"
              />
              <HighlightStat label="Average uplift" value={formatPercent(averageUplift)} mutedLabel="vs control" />
              <HighlightStat label="Cumulative lift" value={`${cumulativeLift.toFixed(1)} pts`} mutedLabel="lifted points" />
            </div>
          </div>
        </section>

        <section className="relative z-10 grid gap-6 lg:-mt-14 lg:grid-cols-3">
          <MetricCard
            title="Control performance baseline"
            description="Weighted by sample size across all live experiments."
            value={`${controlBaseline.toFixed(1)}%`}
            footer="Updates whenever new traffic is routed."
          />
          <MetricCard
            title="Median time to significance"
            description="Based on the last 6 experiments that reached 95% confidence."
            value="13.4 days"
            footer="Renew this projection weekly."
          />
          <MetricCard
            title="Win rate last quarter"
            description="Winning variants that beat control with 90%+ significance."
            value="62%"
            footer="Set a reminder to review low-performing segments."
          />
        </section>

        <section className="space-y-6">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Experiment roster</h2>
              <p className="text-sm text-muted-foreground">
                Drill into each variant&apos;s lift, confidence, and sample saturation compared with the shared control.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FilterPill active>Running</FilterPill>
              <FilterPill>Completed</FilterPill>
              <FilterPill>Planning</FilterPill>
            </div>
          </header>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_64px_rgba(15,23,42,0.12)]">
            <div className="grid grid-cols-[160px_minmax(220px,1fr)_160px_180px] items-center gap-4 border-b border-border bg-gradient-to-r from-white via-white to-[#f6f6ff] px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <span>ID</span>
              <span>Experiment</span>
              <span>Status</span>
              <span>Primary metric</span>
            </div>
            <div className="divide-y divide-border">
              {experiments.map((experiment) => (
                <article key={experiment.id} className="grid grid-cols-1 gap-6 px-6 py-8 md:grid-cols-[160px_minmax(220px,1fr)_160px_180px]">
                  <div className="inline-flex flex-col gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/80">{experiment.id}</span>
                    <StatusBadge status={experiment.status} />
                    <div className="text-xs text-muted-foreground">
                      {experiment.startDate} • {experiment.durationDays} day run
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{experiment.name}</h3>
                      <p className="text-sm text-muted-foreground">{experiment.hypothesis}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <VariantChip variant={experiment.control} tone="control" />
                      {experiment.variants.map((variant) => (
                        <VariantChip key={variant.name} variant={variant} tone="variant" controlRate={experiment.control.conversionRate} />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <MetricLine label="Primary metric" value={experiment.primaryMetric} />
                    <MetricLine label="Secondary metric" value={experiment.secondaryMetric} />
                  </div>

                  <VariantBreakdown experiment={experiment} />
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ExperimentModeBanner />
    </main>
  )
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`
}

function weightedAverageControl() {
  const totals = experiments.reduce(
    (accumulator, experiment) => {
      accumulator.conversions += (experiment.control.conversionRate / 100) * experiment.control.sampleSize
      accumulator.samples += experiment.control.sampleSize
      return accumulator
    },
    { conversions: 0, samples: 0 },
  )

  if (totals.samples === 0) return 0
  return (totals.conversions / totals.samples) * 100
}

function HighlightStat({ label, value, mutedLabel }: { label: string; value: string; mutedLabel?: string }) {
  return (
    <div className="relative flex min-w-[200px] flex-col gap-2 overflow-hidden rounded-3xl border border-white/30 bg-white/10 px-6 py-5 text-left shadow-[0_20px_50px_rgba(20,40,80,0.35)] backdrop-blur-sm">
      <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.6), transparent 60%)" }} />
      <div className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">{label}</div>
      <div className="relative text-2xl font-semibold text-white">{value}</div>
      {mutedLabel ? <div className="relative text-xs text-white/70">{mutedLabel}</div> : null}
    </div>
  )
}

function MetricCard({ title, description, value, footer }: { title: string; description: string; value: string; footer: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-6 shadow-[0_30px_60px_rgba(15,23,42,0.18)] backdrop-blur-md">
      <div className="absolute inset-0 opacity-65" style={{ background: "linear-gradient(135deg, rgba(0,186,167,0.18) 0%, rgba(79,57,246,0.22) 100%)" }} />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-3xl" style={{ background: "#4f39f6" }} />
      <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full opacity-45 blur-3xl" style={{ background: "#00baa7" }} />
      <div className="relative space-y-3 text-left">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">{title}</div>
        <div className="text-3xl font-semibold text-foreground">{value}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#4f39f6]">{footer}</div>
      </div>
    </div>
  )
}

function FilterPill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition ${
        active
          ? "bg-[#0d1117] text-white shadow-[0_10px_30px_rgba(79,57,246,0.35)]"
          : "border border-border bg-white text-muted-foreground hover:border-[#4f39f6]/40 hover:text-[#4f39f6]"
      }`}
      type="button"
    >
      {children}
    </button>
  )
}

function StatusBadge({ status }: { status: Experiment["status"] }) {
  const baseClasses =
    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"

  const statusStyles: Record<Experiment["status"], string> = {
    Running: "bg-[#00baa7]/10 text-[#00baa7] ring-1 ring-[#00baa7]/30",
    Completed: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
    Planning: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  }

  return (
    <span className={`${baseClasses} ${statusStyles[status]}`}>
      <span className="inline-flex h-2 w-2 rounded-full bg-current" />
      {status}
    </span>
  )
}

function VariantChip({
  variant,
  tone,
  controlRate,
}: {
  variant: VariantResult
  tone: "control" | "variant"
  controlRate?: number
}) {
  const isControl = tone === "control"
  const hasSamples = Boolean(variant.sampleSize)
  const uplift = !isControl && hasSamples ? variant.uplift ?? (controlRate ? variant.conversionRate / controlRate - 1 : undefined) : undefined

  return (
    <div
      className={`relative flex min-w-[240px] flex-1 items-center justify-between rounded-2xl border px-4 py-3 ${
        isControl
          ? "border-[#00baa7]/40 bg-white text-foreground shadow-[0_10px_30px_rgba(0,186,167,0.12)]"
          : "border-[#4f39f6]/30 bg-[#f7f5ff] text-foreground shadow-[0_10px_30px_rgba(79,57,246,0.12)]"
      }`}
    >
      <div className="space-y-1">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">{variant.name}</div>
        <div className="text-lg font-semibold">{variant.conversionRate ? `${variant.conversionRate.toFixed(1)}%` : "—"}</div>
        <div className="text-xs text-muted-foreground">n = {variant.sampleSize?.toLocaleString() ?? "—"}</div>
      </div>
      <div className="text-right">
        <div
          className={`text-sm font-semibold ${
            isControl ? "text-[#00baa7]" : uplift !== undefined && uplift >= 0 ? "text-[#4f39f6]" : "text-rose-500"
          }`}
        >
          {isControl ? "Baseline" : uplift !== undefined && !Number.isNaN(uplift) ? formatPercent(uplift) : "Pending"}
        </div>
        {variant.significance !== undefined && hasSamples ? (
          <div className="text-xs text-muted-foreground">{variant.significance}% sig.</div>
        ) : (
          <div className="text-xs text-muted-foreground">Awaiting data</div>
        )}
      </div>
    </div>
  )
}

function MetricLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white px-4 py-3 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">{label}</div>
      <div className="mt-1 text-sm text-foreground">{value}</div>
    </div>
  )
}

function VariantBreakdown({ experiment }: { experiment: Experiment }) {
  const maxLift = Math.max(...experiment.variants.map((variant) => Math.abs(variant.uplift ?? 0)), 0)

  return (
    <div className="space-y-3 rounded-2xl border border-border bg-white p-4">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
        <span>Lift vs control</span>
        <span>Significance</span>
      </div>
      <div className="space-y-2">
        {[experiment.control, ...experiment.variants].map((variant) => (
          <ProgressRow
            key={variant.name}
            variant={variant}
            maxLift={maxLift || 1}
            isControl={variant.name === experiment.control.name}
          />
        ))}
      </div>
    </div>
  )
}

function ProgressRow({
  variant,
  maxLift,
  isControl,
}: {
  variant: VariantResult
  maxLift: number
  isControl: boolean
}) {
  const hasSamples = Boolean(variant.sampleSize)
  const lift = variant.uplift ?? 0
  const normalizedLift = maxLift ? Math.abs(lift) / maxLift : 0

  return (
    <div className="flex items-center gap-3">
      <div className="w-32 text-xs font-medium text-foreground">{variant.name}</div>
      <div className="flex-1">
        <div className="relative h-2.5 overflow-hidden rounded-full bg-muted">
          <div
            className={`absolute inset-y-0 rounded-full transition-all duration-500 ${isControl ? "bg-[#00baa7]" : lift >= 0 ? "bg-[#4f39f6]" : "bg-rose-500"}`}
            style={{
              width: `${Math.max(8, normalizedLift * 100)}%`,
              background: !isControl && lift >= 0 ? brandGradient : undefined,
            }}
          />
        </div>
      </div>
      <div className="w-16 text-right text-xs font-semibold text-foreground">
        {isControl ? "Baseline" : hasSamples ? formatPercent(lift) : "Pending"}
      </div>
      <div className="w-16 text-right text-xs text-muted-foreground">
        {variant.significance !== undefined && hasSamples ? `${variant.significance}%` : "Pending"}
      </div>
    </div>
  )
}
