import Link from "next/link";
import { ArrowRight, CircleDollarSign, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { BarChartMock } from "@/components/shared/bar-chart-mock";
import { PieChartMock } from "@/components/shared/pie-chart-mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const recommendations = [
  "Downgrade 6 unused ChatGPT Team seats",
  "Route prototype traffic away from premium API models",
  "Consolidate coding assistant plans across engineering"
];

export function DemoPreview() {
  return (
    <section id="pricing-logic" className="mx-auto max-w-7xl py-24 container-px">
      <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1fr]">
        <SectionHeading
          align="left"
          eyebrow="Demo report"
          title="A board-ready AI spend story, not another export"
          description="Preview the kind of static report future audits will generate: spend concentration, savings scenarios, and concise recommendations."
        />
        <Card className="overflow-hidden bg-card/80">
          <CardContent className="p-5 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1fr]">
              <div className="rounded-2xl border border-border bg-background/55 p-5">
                <PieChartMock />
                <div className="mt-6 grid gap-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Potential waste</span>
                    <span className="font-medium">$3.1k/mo</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fastest action</span>
                    <span className="font-medium">Seat cleanup</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border bg-background/55 p-4">
                    <CircleDollarSign className="mb-4 size-5 text-primary" />
                    <p className="text-2xl font-semibold">$34k</p>
                    <p className="text-sm text-muted-foreground">annual savings</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/55 p-4">
                    <ShieldCheck className="mb-4 size-5 text-primary" />
                    <p className="text-2xl font-semibold">12</p>
                    <p className="text-sm text-muted-foreground">plans reviewed</p>
                  </div>
                </div>
                <BarChartMock />
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {recommendations.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-border bg-background/55 px-4 py-3 text-sm text-muted-foreground"
                >
                  {item}
                </div>
              ))}
            </div>
            <Button asChild variant="secondary" className="mt-5">
              <Link href="/results/demo">
                View full demo report
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
