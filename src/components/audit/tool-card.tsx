"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { aiToolNames, toolMeta, toolPlans } from "@/config/audit";
import { toolSchema, type ToolFormValues } from "@/lib/audit-validation";
import { cn } from "@/lib/utils";
import { useAuditStore } from "@/store/audit-store";
import type { AiToolName, AuditTool } from "@/types";

export function ToolCard({ tool }: { tool: AuditTool }) {
  const updateTool = useAuditStore((state) => state.updateTool);
  const removeTool = useAuditStore((state) => state.removeTool);
  const {
    register,
    watch,
    getValues,
    setValue,
    trigger,
    formState: { errors }
  } = useForm<ToolFormValues>({
    resolver: zodResolver(toolSchema),
    mode: "onBlur",
    defaultValues: tool
  });

  const selectedTool = watch("name") as AiToolName;
  const selectedValues = watch();
  const plans = toolPlans[selectedTool];
  const meta = toolMeta[selectedTool];
  const Icon = meta.icon;

  useEffect(() => {
    if (!plans.includes(selectedValues.plan)) {
      setValue("plan", plans[0], { shouldValidate: true });
      updateTool(tool.id, { plan: plans[0] });
    }
  }, [plans, selectedValues.plan, setValue, tool.id, updateTool]);

  const syncField = async () => {
    const valid = await trigger();
    if (valid) {
      const values = getValues();
      updateTool(tool.id, {
        ...values,
        monthlySpend: Number(values.monthlySpend),
        seats: Number(values.seats)
      });
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      className="rounded-3xl border border-border bg-gradient-to-b from-card to-card/65 p-5 shadow-card"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn("grid size-12 place-items-center rounded-2xl", meta.accent)}>
            <Icon className="size-5" />
          </div>
          <div>
            <p className="font-semibold tracking-tight">{selectedTool}</p>
            <p className="text-sm text-muted-foreground">{selectedValues.plan}</p>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Remove ${tool.name}`}
          onClick={() => removeTool(tool.id)}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-2">
          <span className="text-sm font-medium">Tool</span>
          <select
            className="h-12 w-full rounded-2xl border border-border bg-background/70 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
            {...register("name", { onChange: syncField })}
          >
            {aiToolNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Plan</span>
          <select
            className="h-12 w-full rounded-2xl border border-border bg-background/70 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
            {...register("plan", { onChange: syncField })}
          >
            {plans.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
          {errors.plan ? <span className="block text-sm text-primary">{errors.plan.message}</span> : null}
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Monthly spend</span>
          <input
            type="number"
            min={1}
            inputMode="decimal"
            className={cn(
              "h-12 w-full rounded-2xl border bg-background/70 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40",
              errors.monthlySpend ? "border-primary" : "border-border"
            )}
            {...register("monthlySpend", { onBlur: syncField })}
          />
          {errors.monthlySpend ? (
            <span className="block text-sm text-primary">{errors.monthlySpend.message}</span>
          ) : null}
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Seats</span>
          <input
            type="number"
            min={1}
            className={cn(
              "h-12 w-full rounded-2xl border bg-background/70 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40",
              errors.seats ? "border-primary" : "border-border"
            )}
            {...register("seats", { onBlur: syncField })}
          />
          {errors.seats ? <span className="block text-sm text-primary">{errors.seats.message}</span> : null}
        </label>
      </div>
    </motion.article>
  );
}
