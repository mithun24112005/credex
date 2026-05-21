import Link from "next/link";
import {
  ArrowLeft,
  BadgeDollarSign,
  Layers3,
  LineChart,
  PieChart,
  Sparkles
} from "lucide-react";

import { RecommendationCard } from "@/components/dashboard/recommendation-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { BarChartMock } from "@/components/shared/bar-chart-mock";
import { PieChartMock } from "@/components/shared/pie-chart-mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Recommendation } from "@/types";

export const metadata = {
  title: "Demo Results"
};

const recommendations: Recommendation[] = [
  {
    title: "Reduce unused ChatGPT Team seats",
    impact: "$1,420/mo",
    description:
      "Six seats show low expected utilization. Move them to request-based access before the next renewal cycle.",
    tone: "high"
  },
  {
    title: "Shift prototype API traffic to lower-cost models",
    impact: "$860/mo",
    description:
      "Internal experiments can use smaller models while preserving premium routing for production workloads.",
    tone: "medium"
  },
  {
    title: "Consolidate coding assistant plans",
    impact: "$560/mo",
    description:
      "Cursor and Copilot both appear across the same engineering groups. Standardize by workflow and role.",
    tone: "low"
  }
];

export default function DemoResultsPage() {
  return (
    <main className="mx-auto max-w-7xl py-10 container-px">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 size-4" />
          Back to landing
        </Link>
      </Button>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden bg-card/80">
          <CardContent className="relative p-7 sm:p-9">
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-sm text-muted-foreground">
                <Sparkles className="size-4 text-primary" />
                Static demo audit
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                $34,080 in annual AI spend savings identified
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                This mock report demonstrates how StackPilot can frame AI tool
                cost, overlap, and recommendations for a startup leadership team.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/audit">Run Free Audit</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/#pricing-logic">View report logic</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <StatCard
            label="Monthly spend"
            value={14820}
            prefix="$"
            helper="Across 12 AI subscriptions and API usage buckets"
            icon={BadgeDollarSign}
          />
          <StatCard
            label="Savings opportunity"
            value={23}
            suffix="%"
            helper="Modeled from duplicate seats and plan mismatch"
            icon={LineChart}
          />
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <Card className="bg-card/80">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Spend breakdown</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  Tool concentration
                </h2>
              </div>
              <PieChart className="size-5 text-primary" />
            </div>
            <PieChartMock />
            <div className="mt-7 grid gap-3">
              {[
                ["ChatGPT + Claude", "42%"],
                ["Code assistants", "31%"],
                ["OpenAI API", "18%"],
                ["Other pilots", "9%"]
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly trend</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  Spend before optimization
                </h2>
              </div>
              <Layers3 className="size-5 text-primary" />
            </div>
            <BarChartMock />
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                ["Duplicate seats", "17"],
                ["Plan mismatches", "5"],
                ["Fast wins", "3"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-border bg-background/55 p-4">
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.78fr]">
        <Card className="bg-card/80">
          <CardContent className="p-6">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">Recommendations</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Highest-confidence actions
              </h2>
            </div>
            <div className="grid gap-4">
              {recommendations.map((item) => (
                <RecommendationCard key={item.title} item={item} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80">
          <CardContent className="p-6">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
              <Sparkles className="size-4" />
              AI summary mock
            </p>
            <h2 className="text-xl font-semibold tracking-tight">
              Your AI stack is productive, but procurement is fragmented.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              The largest near-term opportunity is license hygiene across
              writing and coding assistants. API spend appears reasonable, but
              internal experimentation should use a lower-cost default model.
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-background/55 p-5">
              <p className="text-sm font-medium">Suggested next review</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Revisit after finance exports seat-level data and engineering
                confirms preferred coding assistant workflows.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 rounded-3xl border border-border bg-card p-7 sm:p-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Ready for your stack</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Generate your own audit in Step 2
            </h2>
          </div>
          <Button asChild size="lg">
            <Link href="/audit">Run Free Audit</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
