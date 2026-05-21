"use client";

import { CheckCircle2, Pencil, Users } from "lucide-react";

import { SpendSummary } from "@/components/audit/spend-summary";
import { Button } from "@/components/ui/button";
import { toolMeta } from "@/config/audit";
import { cn } from "@/lib/utils";
import { useAuditStore } from "@/store/audit-store";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export function ReviewStep({ onComplete }: { onComplete: () => void }) {
  const {
    teamSize,
    companyStage,
    useCase,
    tools,
    totalMonthlySpend,
    estimatedYearlySpend,
    setCurrentStep
  } = useAuditStore();

  return (
    <form
      id="audit-review-form"
      onSubmit={(event) => {
        event.preventDefault();
        onComplete();
      }}
      className="space-y-8"
    >
      <div>
        <p className="text-sm font-medium text-primary">Spending review</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Confirm the stack before analysis
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          This is a confirmation view only. The numbers below are simple
          frontend totals from the tool cards you added.
        </p>
      </div>

      <SpendSummary monthly={totalMonthlySpend} yearly={estimatedYearlySpend} />

      <div className="grid gap-5 lg:grid-cols-[0.72fr_1fr]">
        <section className="rounded-3xl border border-border bg-background/55 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Users className="size-5" />
              </div>
              <h3 className="font-semibold tracking-tight">Team summary</h3>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Button>
          </div>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Team size</span>
              <span className="font-medium">{teamSize}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Company stage</span>
              <span className="font-medium">{companyStage}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Primary use case</span>
              <span className="font-medium">{useCase}</span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-background/55 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <CheckCircle2 className="size-5" />
              </div>
              <h3 className="font-semibold tracking-tight">Selected tools</h3>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Button>
          </div>
          <div className="grid gap-3">
            {tools.map((tool) => {
              const meta = toolMeta[tool.name];
              const Icon = meta.icon;

              return (
                <div
                  key={tool.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "grid size-10 place-items-center rounded-xl",
                        meta.accent
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="font-medium">{tool.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {tool.plan} · {tool.seats} seat{tool.seats === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold">
                    {currency.format(tool.monthlySpend)}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      /mo
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </form>
  );
}
