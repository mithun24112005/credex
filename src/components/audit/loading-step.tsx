"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

const stages = [
  "Analyzing subscriptions...",
  "Comparing pricing models...",
  "Finding optimization opportunities...",
  "Generating recommendations...",
  "Preparing audit dashboard..."
];

export function LoadingStep() {
  const router = useRouter();
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStage((stage) => Math.min(stage + 1, stages.length - 1));
    }, 560);

    const timeout = window.setTimeout(() => {
      router.push("/results/demo");
    }, 3300);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [router]);

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
          We are simulating the analysis layer for this frontend phase before
          sending you to the demo results page.
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
        </div>
      </div>
    </section>
  );
}
