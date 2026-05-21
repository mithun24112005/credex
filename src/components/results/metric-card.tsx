"use client";

import { type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Card, CardContent } from "@/components/ui/card";

type MetricCardProps = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  helper: string;
  icon: LucideIcon;
};

export function MetricCard({
  label,
  value,
  prefix,
  suffix,
  helper,
  icon: Icon
}: MetricCardProps) {
  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Card className="h-full bg-card/82">
        <CardContent className="p-6">
          <div className="mb-7 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{label}</p>
            <Icon className="size-5 text-primary" />
          </div>
          <p className="text-4xl font-semibold tracking-tight">
            <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{helper}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
