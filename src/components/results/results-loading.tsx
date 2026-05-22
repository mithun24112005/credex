import { Sparkles } from "lucide-react";

import { Skeleton } from "@/components/shared/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ResultsLoading() {
  return (
    <main className="relative overflow-hidden">
      <div className="surface-line absolute inset-x-0 top-0 h-[560px] opacity-45" />
      <div className="absolute left-1/2 top-16 h-72 w-[680px] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
      <div className="relative mx-auto max-w-7xl py-10 container-px">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-7 w-28" />
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Card className="overflow-hidden bg-card/82">
            <CardContent className="relative p-7 sm:p-10">
              <div className="space-y-4">
                <Skeleton className="h-7 w-44" />
                <Skeleton className="h-12 w-full max-w-lg" />
                <Skeleton className="h-10 w-full max-w-md" />
                <Skeleton className="h-6 w-full max-w-sm" />
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[0, 1, 2].map((i) => (
              <Card key={i} className="bg-card/82">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card className="bg-card/82">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-7 w-52" />
                <Skeleton className="h-24 w-full" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/82">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-7 w-52" />
                <Skeleton className="h-40 w-full" />
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

export function ResultsLoadingMinimal() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-4xl place-items-center container-px">
      <div className="w-full rounded-3xl border border-border bg-card/82 p-8 text-center shadow-card">
        <div className="mx-auto mb-6 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Sparkles className="size-6 animate-pulse" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Loading audit report</h1>
        <p className="mt-3 text-muted-foreground">
          Pulling the saved report and AI summary from StackPilot.
        </p>
        <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/3 animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full bg-primary/40" />
        </div>
      </div>
    </main>
  );
}
