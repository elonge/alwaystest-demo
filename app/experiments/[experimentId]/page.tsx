import Link from "next/link"
import { notFound } from "next/navigation"

import { experiments, getExperimentById, type VariantResult } from "@/lib/experiments-data"

type ExperimentPageProps = {
  params: Promise<{ experimentId: string }>
}

const brandGradient = "linear-gradient(135deg, #00baa7 0%, #4f39f6 100%)"

export function generateStaticParams() {
  return experiments.map((experiment) => ({
    experimentId: experiment.id,
  }))
}

export default async function ExperimentPage({ params }: ExperimentPageProps) {
  const { experimentId } = await params

  const decodedId = decodeURIComponent(experimentId)
  const experiment = getExperimentById(decodedId)

  if (!experiment) {
    notFound()
  }

  const control = experiment.control
  const hasVariantData = experiment.variants.some((variant) => variant.sampleSize > 0)
  const segmentInsights = [
    {
      segment: "Returning visitors",
      conversion: "6.2%",
      change: "+1.5 pts vs control",
      trafficShare: "28% of traffic",
    },
    {
      segment: "First-time visitors",
      conversion: "5.1%",
      change: "+0.4 pts vs control",
      trafficShare: "44% of traffic",
    },
    {
      segment: "Mobile devices",
      conversion: "4.8%",
      change: "-0.2 pts vs control",
      trafficShare: "37% of traffic",
    },
    {
      segment: "Desktop devices",
      conversion: "6.0%",
      change: "+1.3 pts vs control",
      trafficShare: "63% of traffic",
    },
  ]
  const experimentNotes = [
    {
      title: "Exposure timing",
      body: "Variant impressions were throttled to 40% of eligible users for the first 48 hours while confidence stabilized.",
    },
    {
      title: "Downstream metric trend",
      body: "Average activation rate (day 7) improved by 0.9 pts for Variant E, aligning with observed uplift at signup.",
    },
    {
      title: "Segment to monitor",
      body: "Mobile traffic underperforms despite uplift among desktop users—consider localized messaging for follow-up tests.",
    },
  ]

  return (
    <main className="relative min-h-screen bg-[#f9fafc] pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "#00baa7" }} />
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full blur-3xl" style={{ background: "#4f39f6" }} />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-[140px]" style={{ background: "#00d3bd" }} />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-10">
        <Link
          href="/experiments"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur transition-colors hover:border-always-primary hover:text-always-primary"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to experiments
        </Link>

        <section className="relative overflow-hidden rounded-3xl border border-white/40 bg-[#0d1117] px-8 py-10 text-white shadow-[0_40px_120px_rgba(15,23,42,0.35)]">
          <div className="absolute inset-0 opacity-80" style={{ background: brandGradient }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.42),transparent_55%)] mix-blend-screen" />
          <div className="relative flex flex-col gap-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-3 rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                  <span className="font-semibold text-white/80">{experiment.id}</span>
                  <StatusBadge status={experiment.status} />
                </div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{experiment.name}</h1>
                <p className="max-w-2xl text-sm text-white/80">{experiment.hypothesis}</p>
              </div>
              <div className="flex min-w-[220px] flex-col gap-3 rounded-3xl border border-white/30 bg-white/10 px-6 py-5 text-left shadow-[0_20px_50px_rgba(20,40,80,0.35)]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Primary metric</div>
                <div className="text-lg font-semibold">{experiment.primaryMetric}</div>
                <div className="text-xs text-white/70">Secondary metric: {experiment.secondaryMetric}</div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <MetricPill label="Started" value={experiment.startDate} />
              <MetricPill label="Duration" value={`${experiment.durationDays} day run`} />
              <MetricPill label="Control rate" value={`${control.conversionRate.toFixed(1)}%`} />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <header className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Variant performance</h2>
            <p className="text-sm text-muted-foreground">
              Control sample size {control.sampleSize.toLocaleString()} • monitor relative lift and confidence signals for each
              variant.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/experiments/${experiment.id}?view=report`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-always-primary hover:text-always-primary"
              >
                See full results
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9l3 3-3 3m3-3H9" />
                </svg>
              </Link>
              <span className="text-xs text-muted-foreground">
                Includes cohort analysis, retention curves, and exportable CSV.
              </span>
            </div>
          </header>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_64px_rgba(15,23,42,0.12)]">
            <div className="grid grid-cols-[minmax(200px,1.6fr)_minmax(120px,0.8fr)_minmax(120px,0.8fr)_minmax(120px,0.8fr)] gap-6 border-b border-border bg-muted/40 px-6 py-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <span>Variation</span>
              <span>Conv. rate</span>
              <span>Uplift vs control</span>
              <span>Significance</span>
            </div>

            <div className="divide-y divide-border">
              <VariantRow variant={control} tone="control" />
              {experiment.variants.map((variant) => (
                <VariantRow key={variant.name} variant={variant} controlRate={control.conversionRate} tone="variant" />
              ))}
            </div>
          </div>

          {!hasVariantData ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-5 text-sm text-muted-foreground">
              Variant traffic has not been routed yet. Once the experiment is running, this view will populate with fresh
              samples and lift measurements.
            </div>
          ) : null}
        </section>

        <section className="space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Segment insights</h2>
              <p className="text-sm text-muted-foreground">
                Highlighting how top audiences responded to the leading variations.
              </p>
            </div>
            <Link
              href={`/experiments/${experiment.id}?view=segments`}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-always-primary"
            >
              View all segments
            </Link>
          </header>
          <div className="grid gap-4 sm:grid-cols-2">
            {segmentInsights.map((insight) => (
              <div
                key={insight.segment}
                className="rounded-2xl border border-border bg-card/70 px-5 py-4 shadow-[0_12px_40px_rgba(15,23,42,0.12)]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">{insight.segment}</h3>
                  <span className="text-xs text-muted-foreground">{insight.trafficShare}</span>
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-foreground">{insight.conversion}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-always-primary">{insight.change}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Analyst notes</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {experimentNotes.map((note) => (
              <div key={note.title} className="rounded-2xl border border-border bg-gradient-to-br from-white to-[#f4f6ff] p-5">
                <h3 className="text-sm font-semibold text-foreground">{note.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{note.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function VariantRow({ variant, controlRate, tone }: { variant: VariantResult; controlRate?: number; tone: "control" | "variant" }) {
  const conversionLabel = `${variant.conversionRate.toFixed(1)}%`
  const upliftLabel =
    tone === "control"
      ? "Baseline"
      : variant.uplift !== undefined
        ? `${(variant.uplift * 100).toFixed(1)}%`
        : "Pending"
  const significanceLabel =
    tone === "control" ? "—" : variant.significance !== undefined ? `${variant.significance}%` : "Collecting"

  const relativeChange =
    controlRate && variant.conversionRate > 0 ? variant.conversionRate - controlRate : tone === "control" ? 0 : undefined
  const relativeColor =
    tone === "control"
      ? "text-muted-foreground"
      : relativeChange === undefined
        ? "text-muted-foreground"
        : relativeChange >= 0
          ? "text-always-primary"
          : "text-destructive"

  return (
    <article
      className={`grid grid-cols-[minmax(200px,1.6fr)_minmax(120px,0.8fr)_minmax(120px,0.8fr)_minmax(120px,0.8fr)] items-center gap-6 px-6 py-5 text-sm ${
        tone === "control" ? "bg-background/70" : "bg-background"
      }`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{variant.name}</span>
          {tone === "control" ? (
            <span className="rounded-full border border-border/60 bg-muted px-2 py-[2px] text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Control
            </span>
          ) : null}
        </div>
        <div className="text-xs text-muted-foreground">{variant.sampleSize.toLocaleString()} users sampled</div>
      </div>
      <div className="font-medium text-foreground">{conversionLabel}</div>
      <div className={`font-medium ${relativeColor}`}>{upliftLabel}</div>
      <div className="font-medium text-foreground">{significanceLabel}</div>
    </article>
  )
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/20 px-4 py-3 text-left text-sm text-white shadow-[0_10px_40px_rgba(15,23,42,0.28)]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  )
}

type ExperimentStatus = "Running" | "Completed" | "Planning"

function StatusBadge({ status }: { status: ExperimentStatus }) {
  const styles: Record<ExperimentStatus, { label: string; className: string }> = {
    Running: {
      label: "Running",
      className: "bg-emerald-400/20 text-emerald-100 border-emerald-300/30",
    },
    Completed: {
      label: "Completed",
      className: "bg-blue-400/20 text-blue-100 border-blue-300/30",
    },
    Planning: {
      label: "Planning",
      className: "bg-amber-400/20 text-amber-100 border-amber-300/30",
    },
  }

  const style = styles[status]

  return (
    <span className={`rounded-full border px-3 py-[3px] text-[11px] font-semibold uppercase tracking-[0.2em] ${style.className}`}>
      {style.label}
    </span>
  )
}
