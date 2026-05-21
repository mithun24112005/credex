import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FooterCta() {
  return (
    <section className="mx-auto max-w-7xl pb-24 container-px">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card sm:p-12">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-3 text-sm font-medium text-primary">
            StackPilot AI for leaner AI operations
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            Stop Paying Enterprise Prices for AI Tools
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Powered by infrastructure pricing insights from Credex.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/audit">
              Run Free Audit
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
