"use client";

import { memo } from "react";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

export const OptimizationScoreGauge = memo(function OptimizationScoreGauge({ score }: { score: number }) {
  const data = [{ name: "Efficiency", value: score, fill: "hsl(var(--primary))" }];

  return (
    <div
      className="relative h-48 w-full"
      role="img"
      aria-label={`AI stack efficiency score is ${score} out of 100`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="58%"
          innerRadius="72%"
          outerRadius="96%"
          barSize={12}
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar background dataKey="value" cornerRadius={12} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-x-0 top-16 text-center">
        <p className="text-5xl font-semibold tracking-tight">{score}</p>
        <p className="mt-2 text-sm text-muted-foreground">AI Stack Efficiency</p>
      </div>
    </div>
  );
});
