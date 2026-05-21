"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

import { LoadingStep } from "@/components/audit/loading-step";
import { ProgressHeader } from "@/components/audit/progress-header";
import { ReviewStep } from "@/components/audit/review-step";
import { TeamStep } from "@/components/audit/team-step";
import { ToolsStep } from "@/components/audit/tools-step";
import { Button } from "@/components/ui/button";
import { useAuditStore } from "@/store/audit-store";

const formByStep: Record<number, string> = {
  1: "audit-team-form",
  2: "audit-tools-form",
  3: "audit-review-form"
};

export function AuditShell() {
  const currentStep = useAuditStore((state) => state.currentStep);
  const nextStep = useAuditStore((state) => state.nextStep);
  const prevStep = useAuditStore((state) => state.prevStep);
  const resetAudit = useAuditStore((state) => state.resetAudit);

  const showControls = currentStep < 4;

  return (
    <main className="relative overflow-hidden">
      <div className="surface-line absolute inset-x-0 top-0 h-[520px] opacity-45" />
      <div className="absolute left-1/2 top-20 h-72 w-[620px] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
      <div className="relative mx-auto max-w-6xl pb-28 pt-10 container-px sm:pb-16">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Landing
            </Link>
          </Button>
          <Button type="button" variant="ghost" onClick={resetAudit}>
            <RotateCcw className="mr-2 size-4" />
            Reset
          </Button>
        </div>

        <ProgressHeader currentStep={currentStep} />

        <section className="mt-6 rounded-3xl border border-border bg-card/80 p-5 shadow-card backdrop-blur sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              {currentStep === 1 ? <TeamStep onComplete={nextStep} /> : null}
              {currentStep === 2 ? <ToolsStep onComplete={nextStep} /> : null}
              {currentStep === 3 ? <ReviewStep onComplete={nextStep} /> : null}
              {currentStep === 4 ? <LoadingStep /> : null}
            </motion.div>
          </AnimatePresence>
        </section>

        {showControls ? (
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/88 p-4 backdrop-blur-xl sm:sticky sm:mt-6 sm:rounded-3xl sm:border sm:bg-card/78">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              <Button type="submit" form={formByStep[currentStep]}>
                {currentStep === 3 ? "Analyze My Stack" : "Continue"}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
