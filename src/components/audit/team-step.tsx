"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { companyStages, primaryUseCases } from "@/config/audit";
import { teamStepSchema, type TeamStepValues } from "@/lib/audit-validation";
import { cn } from "@/lib/utils";
import { useAuditStore } from "@/store/audit-store";

export function TeamStep({ onComplete }: { onComplete: () => void }) {
  const { teamSize, companyStage, useCase, setTeamContext } = useAuditStore();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<TeamStepValues>({
    resolver: zodResolver(teamStepSchema),
    defaultValues: {
      teamSize,
      companyStage: companyStage || undefined,
      useCase: useCase || undefined
    }
  });

  const selectedTeamSize = watch("teamSize");
  const selectedUseCase = watch("useCase");

  const onSubmit = (values: TeamStepValues) => {
    setTeamContext(values);
    onComplete();
  };

  return (
    <form id="audit-team-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <p className="text-sm font-medium text-primary">Team context</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Tell us how your team uses AI
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          This sets the context for the audit experience without connecting to
          any services or storing anything outside your browser.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1fr]">
        <div className="rounded-2xl border border-border bg-background/55 p-5">
          <label className="text-sm font-medium" htmlFor="team-size">
            Team size
          </label>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              aria-label="Decrease team size"
              className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setValue("teamSize", Math.max(1, Number(selectedTeamSize) - 1), { shouldValidate: true })}
            >
              <Minus className="size-4" />
            </button>
            <input
              id="team-size"
              type="number"
              min={1}
              className="h-14 w-full rounded-2xl border border-border bg-card px-4 text-center text-2xl font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
              aria-invalid={Boolean(errors.teamSize)}
              {...register("teamSize")}
            />
            <button
              type="button"
              aria-label="Increase team size"
              className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setValue("teamSize", Number(selectedTeamSize) + 1, { shouldValidate: true })}
            >
              <Plus className="size-4" />
            </button>
          </div>
          {errors.teamSize ? (
            <p className="mt-2 text-sm text-primary">{errors.teamSize.message}</p>
          ) : null}
        </div>

        <div className="rounded-2xl border border-border bg-background/55 p-5">
          <label className="text-sm font-medium" htmlFor="company-stage">
            Company stage
          </label>
          <select
            id="company-stage"
            className="mt-4 h-14 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
            aria-invalid={Boolean(errors.companyStage)}
            {...register("companyStage")}
          >
            <option value="">Select stage</option>
            {companyStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
          {errors.companyStage ? (
            <p className="mt-2 text-sm text-primary">{errors.companyStage.message}</p>
          ) : null}
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-medium">Primary use case</legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {primaryUseCases.map((item, index) => (
            <motion.label
              key={item.value}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className={cn(
                "cursor-pointer rounded-2xl border bg-background/55 p-4 transition-all hover:-translate-y-1 hover:border-primary/45 focus-within:ring-2 focus-within:ring-ring",
                selectedUseCase === item.value
                  ? "border-primary/45 bg-primary/10 text-foreground"
                  : "border-border"
              )}
            >
              <input
                type="radio"
                value={item.value}
                className="sr-only"
                {...register("useCase")}
              />
              <item.icon className="mb-5 size-5 text-primary" />
              <span className="block font-medium">{item.value}</span>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                {item.description}
              </span>
            </motion.label>
          ))}
        </div>
        {errors.useCase ? (
          <p className="mt-3 text-sm text-primary">{errors.useCase.message}</p>
        ) : null}
      </fieldset>
    </form>
  );
}
