"use client";

import Link from "next/link";
import { ArrowRight, BadgeDollarSign, CheckCircle2, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { BarChartMock } from "@/components/shared/bar-chart-mock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const metrics = [
  { label: "Projected monthly savings", value: 2840, prefix: "$" },
  { label: "Duplicate AI seats", value: 17 },
  { label: "Audit completion", value: 2, suffix: " min" }
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="surface-line absolute inset-x-0 top-0 h-[620px] opacity-50" />
      <div className="absolute left-1/2 top-10 h-72 w-[620px] -translate-x-1/2 rounded-full bg-primary/14 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 pb-20 pt-20 container-px lg:grid-cols-[1fr_0.92fr] lg:pb-28 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
            <BadgeDollarSign className="size-4 text-primary" />
            {` ${"Optimize Your AI Stack in Minutes"}`}
          </div>
          <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            You&apos;re Probably Overspending on AI Tools
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Audit your AI stack in under 2 minutes and uncover unnecessary spend
            across ChatGPT, Claude, Cursor, Copilot, and more.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/audit">
                Run Free Audit
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/results/demo">View Demo Report</Link>
            </Button>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + index * 0.08, duration: 0.45 }}
                className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur"
              >
                <p className="text-xl font-semibold">
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="relative"
        >
          <Card className="overflow-hidden bg-card/82 p-4 backdrop-blur-xl">
            <div className="rounded-xl border border-border bg-background/55 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Stack audit</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">
                    $14,820/mo
                  </p>
                </div>
                <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  31% waste found
                </div>
              </div>
              <div className="mt-6">
                <BarChartMock />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["Consolidate 8 Copilot seats", "Move 2 teams to Cursor Pro"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card/80 p-3"
                    >
                      <CheckCircle2 className="size-4 text-primary" />
                      <span className="text-sm">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </Card>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -bottom-6 left-5 w-56 rounded-2xl border border-border bg-background/90 p-4 shadow-soft backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <TrendingDown className="size-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Suggested savings</p>
                <p className="font-semibold">$34k annually</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
