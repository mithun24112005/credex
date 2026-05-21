import { ArrowRight, CheckCircle2 } from "lucide-react";

import { toolMeta } from "@/config/audit";
import type { ToolAnalysis } from "@/features/audit-engine";
import { cn } from "@/lib/utils";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const statusCopy: Record<ToolAnalysis["status"], string> = {
  healthy: "Optimized",
  low: "Low waste",
  moderate: "Moderate waste",
  high: "High waste"
};

const statusClass: Record<ToolAnalysis["status"], string> = {
  healthy: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  low: "border-border bg-secondary text-muted-foreground",
  moderate: "border-primary/20 bg-primary/10 text-primary",
  high: "border-primary/30 bg-primary/15 text-primary"
};

export function ToolAnalysisCard({ analysis }: { analysis: ToolAnalysis }) {
  const meta = toolMeta[analysis.toolName];
  const Icon = meta.icon;

  return (
    <article className="rounded-3xl border border-border bg-background/55 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("grid size-12 place-items-center rounded-2xl", meta.accent)}>
            <Icon className="size-5" />
          </div>
          <div>
            <h3 className="font-semibold tracking-tight">{analysis.toolName}</h3>
            <p className="text-sm text-muted-foreground">
              {analysis.currentPlan} current plan
            </p>
          </div>
        </div>
        <span
          className={cn(
            "w-fit rounded-full border px-3 py-1 text-xs font-medium",
            statusClass[analysis.status]
          )}
        >
          {statusCopy[analysis.status]}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card/80 p-4">
          <p className="text-sm text-muted-foreground">Current spend</p>
          <p className="mt-2 text-2xl font-semibold">
            {currency.format(analysis.currentSpend)}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-4">
          <p className="text-sm text-muted-foreground">Suggested setup</p>
          <p className="mt-2 flex items-center gap-2 text-lg font-semibold">
            {analysis.currentPlan}
            {analysis.suggestedPlan !== analysis.currentPlan ? (
              <>
                <ArrowRight className="size-4 text-muted-foreground" />
                {analysis.suggestedPlan}
              </>
            ) : null}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-4">
          <p className="text-sm text-muted-foreground">Estimated savings</p>
          <p className="mt-2 text-2xl font-semibold">
            {currency.format(analysis.monthlySavings)}
            <span className="ml-1 text-sm font-normal text-muted-foreground">/mo</span>
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-card/60 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
          <CheckCircle2 className="size-4 text-primary" />
          {analysis.recommendation}
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{analysis.reasoning}</p>
      </div>
    </article>
  );
}
