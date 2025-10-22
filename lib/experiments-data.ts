export type VariantResult = {
  name: string
  conversionRate: number
  sampleSize: number
  uplift?: number
  significance?: number
}

export type Experiment = {
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

export const experiments: Experiment[] = [
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
      {
        name: "Variant C — Sticky header CTA",
        conversionRate: 5.4,
        uplift: 0.149,
        significance: 70,
        sampleSize: 1388,
      },
      {
        name: "Variant D — Video hero",
        conversionRate: 4.9,
        uplift: 0.043,
        significance: 41,
        sampleSize: 1376,
      },
      {
        name: "Variant E — Social proof band",
        conversionRate: 5.6,
        uplift: 0.191,
        significance: 79,
        sampleSize: 1385,
      },
      {
        name: "Variant F — Minimal hero",
        conversionRate: 4.5,
        uplift: -0.043,
        significance: 27,
        sampleSize: 1368,
      },
      {
        name: "Variant G — Carousel spotlight",
        conversionRate: 5.3,
        uplift: 0.128,
        significance: 64,
        sampleSize: 1392,
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

export function getExperimentById(experimentId: string): Experiment | undefined {
  const normalized = experimentId.toLowerCase()
  return experiments.find((experiment) => experiment.id.toLowerCase() === normalized)
}
