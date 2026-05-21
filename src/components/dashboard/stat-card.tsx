import { type LucideIcon } from "lucide-react";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  helper: string;
  icon: LucideIcon;
};

export function StatCard({
  label,
  value,
  prefix,
  suffix,
  helper,
  icon: Icon
}: StatCardProps) {
  return (
    <Card className="bg-card/80">
      <CardContent className="p-5">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{label}</p>
          <Icon className="size-4 text-primary" />
        </div>
        <p className="text-3xl font-semibold tracking-tight">
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{helper}</p>
      </CardContent>
    </Card>
  );
}
