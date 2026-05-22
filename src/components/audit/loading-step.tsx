"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuditStore } from "@/store/audit-store";

const stages = [
  "Analyzing subscriptions...",
  "Comparing pricing models...",
  "Finding optimization opportunities...",
  "Generating AI summary...",
  "Preparing audit dashboard..."
];

export function LoadingStep() {
  const router = useRouter();
  const [activeStage, setActiveStage] = useState(0);
  const [error, setError] = useState("");
  const teamSize = useAuditStore((state) => state.teamSize);
  const companyStage = useAuditStore((state) => state.companyStage);
  const useCase = useAuditStore((state) => state.useCase);
  const tools = useAuditStore((state) => state.tools);

  useEffect(() => {
    let cancelled = false;
    const interval = window.setInterval(() => {
      setActiveStage((stage) => Math.min(stage + 1, stages.length - 1));
    }, 560);

    async function createSavedAudit() {
      try {
        const response = await fetch("/api/audit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teamSize,
            companyStage,
            useCase,
            tools
          })
        });

        if (!response.ok) {
          throw new Error("Audit creation failed.");
        }

        const data = (await response.json()) as { publicId: string };

        await new Promise((resolve) => window.setTimeout(resolve, 900));

        if (!cancelled) {
          router.push(`/results/live?id=${data.publicId}`);
        }
      } catch {
        if (!cancelled) {
          setError("We could not save this audit. You can retry or view a local report.");
        }
      }
    }

    createSavedAudit();

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [companyStage, router, teamSize, tools, useCase]);

  const progress = ((activeStage + 1) / stages.length) * 100;

  return (
    <section className="grid min-h-[520px] place-items-center py-8">
      <div className="w-full max-w-3xl text-center">
        <div className="relative mx-auto mb-8 grid size-24 place-items-center">
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/30 bg-primary/10 blur-sm"
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          />
          <motion.div
            className="relative grid size-16 place-items-center rounded-2xl border border-primary/25 bg-card text-primary shadow-soft"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            <Sparkles className="size-7" />
          </motion.div>
        </div>

        <p className="text-sm font-medium text-primary">Running analysis</p>
        <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
          Preparing your audit dashboard
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
          StackPilot is saving your report, running conservative calculations,
          and preparing a shareable audit dashboard.
        </p>

        <div className="mx-auto mt-9 max-w-xl">
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
          <div className="mt-6 grid gap-3 text-left">
            {stages.map((stage, index) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: index <= activeStage ? 1 : 0.45,
                  y: 0
                }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background/55 px-4 py-3"
              >
                <CheckCircle2
                  className={
                    index <= activeStage
                      ? "size-4 text-primary"
                      : "size-4 text-muted-foreground"
                  }
                />
                <span className="text-sm">{stage}</span>
              </motion.div>
            ))}
          </div>
          {error ? (
            <div className="mt-6 rounded-2xl border border-primary/25 bg-primary/10 p-4 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 size-4 text-primary" />
                <div>
                  <p className="text-sm font-medium text-primary">{error}</p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <Button type="button" onClick={() => window.location.reload()}>
                      Retry save
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => router.push("/results/live")}
                    >
                      View local report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
