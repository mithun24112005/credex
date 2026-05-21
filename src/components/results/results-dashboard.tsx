"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeDollarSign,
  Download,
  Gauge,
  LineChart,
  ShieldCheck
} from "lucide-react";

import { OptimizationScoreGauge } from "@/components/charts/optimization-score-gauge";
import { SavingsOpportunityChart } from "@/components/charts/savings-opportunity-chart";
import { SpendDistributionChart } from "@/components/charts/spend-distribution-chart";
import { MetricCard } from "@/components/results/metric-card";
import { SummaryCard } from "@/components/results/summary-card";
import { ToolAnalysisCard } from "@/components/results/tool-analysis-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateAuditReport } from "@/features/audit-engine";
import { demoAuditInput } from "@/features/audit-engine/utils/demo-input";
import { useAuditStore } from "@/store/audit-store";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export function ResultsDashboard() {
  const teamSize = useAuditStore((state) => state.teamSize);
  const companyStage = useAuditStore((state) => state.companyStage);
  const useCase = useAuditStore((state) => state.useCase);
  const tools = useAuditStore((state) => state.tools);

  const input = useMemo(
    () =>
      tools.length > 0
        ? {
            teamSize,
            companyStage,
            useCase,
            tools
          }
        : demoAuditInput,
    [companyStage, teamSize, tools, useCase]
  );
  const report = useMemo(() => calculateAuditReport(input), [input]);
  const usingFallback = tools.length === 0;

  return (
    <main className="relative overflow-hidden">
      <div className="surface-line absolute inset-x-0 top-0 h-[560px] opacity-45" />
      <div className="absolute left-1/2 top-16 h-72 w-[680px] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
      <div className="relative mx-auto max-w-7xl py-10 container-px">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="ghost">
            <Link href="/audit">
              <ArrowLeft className="mr-2 size-4" />
              Back to audit
            </Link>
          </Button>
          {usingFallback ? (
            <span className="w-fit rounded-full border border-border bg-background/70 px-3 py-1 text-sm text-muted-foreground">
              Demo fallback data
            </span>
          ) : null}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]"
        >
          <Card className="overflow-hidden bg-card/82">
            <CardContent className="relative p-7 sm:p-10">
              <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-sm text-muted-foreground">
                  <ShieldCheck className="size-4 text-primary" />
                  Live frontend audit
                </p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                  {currency.format(report.annualSavings)} in conservative annual
                  savings identified
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                  A frontend-only audit report using your local wizard inputs,
                  conservative pricing rules, and defensible optimization logic.
                </p>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <MetricCard
              label="Monthly savings"
              value={report.monthlySavings}
              prefix="$"
              helper="Estimated with capped, conservative assumptions"
              icon={BadgeDollarSign}
            />
            <MetricCard
              label="Annual savings"
              value={report.annualSavings}
              prefix="$"
              helper="Monthly opportunity multiplied by 12"
              icon={LineChart}
            />
            <MetricCard
              label="Efficiency score"
              value={report.optimizationScore}
              suffix="/100"
              helper="Weighted by overlap, plan fit, and savings rate"
              icon={Gauge}
            />
          </div>
        </motion.section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <SummaryCard report={report} />
          <Card className="bg-card/82">
            <CardContent className="p-6">
              <OptimizationScoreGauge score={report.optimizationScore} />
            </CardContent>
          </Card>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="bg-card/82">
            <CardContent className="p-6">
              <div className="mb-5">
                <p className="text-sm text-muted-foreground">Spend breakdown</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  Tool spend distribution
                </h2>
              </div>
              <SpendDistributionChart data={report.spendBreakdown} />
              <div className="mt-4 grid gap-3">
                {report.spendBreakdown.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-medium">
                      {currency.format(item.value)} · {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/82">
            <CardContent className="p-6">
              <div className="mb-5">
                <p className="text-sm text-muted-foreground">Savings opportunity</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  Conservative savings by tool
                </h2>
              </div>
              <SavingsOpportunityChart data={report.savingsOpportunities} />
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <div className="mb-5">
            <p className="text-sm text-muted-foreground">Tool analysis</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Recommendations with reasoning
            </h2>
          </div>
          <div className="grid gap-4">
            {report.toolAnalysis.map((analysis) => (
              <ToolAnalysisCard key={analysis.id} analysis={analysis} />
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.72fr]">
          <Card className="bg-card/82">
            <CardContent className="p-7">
              <p className="text-sm font-medium text-primary">Credex pricing insight</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Larger AI teams can review credit allocation next
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Large teams may reduce infrastructure costs further through
                optimized AI credit allocation, model routing, and vendor
                commitment planning. This dashboard keeps that suggestion
                separate from subscription cleanup to avoid overstating savings.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/82">
            <CardContent className="p-7">
              <p className="text-sm text-muted-foreground">Share placeholder</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Package this for your team
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Share URLs and export workflows are intentionally reserved for a
                later backend phase.
              </p>
              <Button className="mt-6" disabled>
                <Download className="mr-2 size-4" />
                Generate Shareable Report
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
