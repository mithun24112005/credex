"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { aiToolNames, toolMeta, toolPlans } from "@/config/audit";
import { toolSchema, type ToolFormValues } from "@/lib/audit-validation";
import { cn } from "@/lib/utils";
import { useAuditStore } from "@/store/audit-store";
import type { AiToolName } from "@/types";

export function ToolSelector() {
  const addTool = useAuditStore((state) => state.addTool);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ToolFormValues>({
    resolver: zodResolver(toolSchema),
    defaultValues: {
      name: "ChatGPT",
      plan: "Team",
      monthlySpend: 120,
      seats: 5
    }
  });

  const selectedTool = watch("name") as AiToolName;
  const plans = toolPlans[selectedTool];
  const meta = toolMeta[selectedTool];
  const Icon = meta.icon;

  useEffect(() => {
    const currentPlan = watch("plan");
    if (!plans.includes(currentPlan)) {
      setValue("plan", plans[0], { shouldValidate: true });
    }
  }, [plans, setValue, watch]);

  const onSubmit = (values: ToolFormValues) => {
    addTool(values);
    reset({
      name: "ChatGPT",
      plan: "Team",
      monthlySpend: 120,
      seats: 5
    });
  };

  return (
    <div
      className="rounded-3xl border border-border bg-background/55 p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label htmlFor="new-tool" className="text-sm font-medium">
            Tool
          </label>
          <div className="relative">
            <Icon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-primary" />
            <select
              id="new-tool"
              className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
              {...register("name")}
            >
              {aiToolNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label htmlFor="new-plan" className="text-sm font-medium">
            Plan
          </label>
          <select
            id="new-plan"
            className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
            {...register("plan")}
          >
            {plans.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
          {errors.plan ? <p className="text-sm text-primary">{errors.plan.message}</p> : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:w-72">
          <div className="flex flex-col gap-2">
            <label htmlFor="new-spend" className="text-sm font-medium">
              Spend
            </label>
            <input
              id="new-spend"
              type="number"
              min={1}
              inputMode="decimal"
              className={cn(
                "h-12 rounded-2xl border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40",
                errors.monthlySpend ? "border-primary" : "border-border"
              )}
              {...register("monthlySpend")}
            />
            {errors.monthlySpend ? (
              <p className="text-sm text-primary">{errors.monthlySpend.message}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="new-seats" className="text-sm font-medium">
              Seats
            </label>
            <input
              id="new-seats"
              type="number"
              min={1}
              className={cn(
                "h-12 rounded-2xl border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40",
                errors.seats ? "border-primary" : "border-border"
              )}
              {...register("seats")}
            />
            {errors.seats ? <p className="text-sm text-primary">{errors.seats.message}</p> : null}
          </div>
        </div>

        <Button type="button" onClick={handleSubmit(onSubmit)} className="h-12 lg:mb-0">
          <Plus className="mr-2 size-4" />
          Add Tool
        </Button>
      </div>
    </div>
  );
}
