import { ArrowRight, CircleAlert, CircleCheck, Clock3 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Recommendation } from "@/types";

const toneIcon = {
  high: CircleAlert,
  medium: Clock3,
  low: CircleCheck
};

const toneClass = {
  high: "text-primary bg-primary/10 border-primary/20",
  medium: "text-foreground bg-secondary border-border",
  low: "text-muted-foreground bg-muted border-border"
};

export function RecommendationCard({ item }: { item: Recommendation }) {
  const Icon = toneIcon[item.tone];

  return (
    <div className="rounded-2xl border border-border bg-background/55 p-5">
      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            "grid size-10 place-items-center rounded-xl border",
            toneClass[item.tone]
          )}
        >
          <Icon className="size-4" />
        </div>
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          {item.impact}
        </span>
      </div>
      <h3 className="mt-5 font-semibold tracking-tight">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {item.description}
      </p>
      <div className="mt-5 inline-flex items-center text-sm font-medium text-primary">
        Review action <ArrowRight className="ml-2 size-4" />
      </div>
    </div>
  );
}
