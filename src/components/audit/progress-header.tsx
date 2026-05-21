"use client";

import { motion } from "framer-motion";

import { auditSteps } from "@/config/audit";
import { cn } from "@/lib/utils";

export function ProgressHeader({ currentStep }: { currentStep: number }) {
  const progress = ((currentStep - 1) / (auditSteps.length - 1)) * 100;

  return (
    <div className="rounded-3xl border border-border bg-card/78 p-5 shadow-card backdrop-blur">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">StackPilot Audit</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Optimize Your AI Stack in Minutes
          </h1>
        </div>
        <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-sm text-muted-foreground">
          Step {currentStep} of {auditSteps.length}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {auditSteps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "rounded-2xl border px-3 py-2 text-sm transition-colors",
              currentStep >= step.id
                ? "border-primary/25 bg-primary/10 text-primary"
                : "border-border bg-background/40 text-muted-foreground"
            )}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
}
