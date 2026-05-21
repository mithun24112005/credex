"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import type { SavingsOpportunity } from "@/features/audit-engine";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export function SavingsOpportunityChart({ data }: { data: SavingsOpportunity[] }) {
  const chartData = data.length > 0 ? data : [{ toolName: "No major savings", savings: 0 }];

  return (
    <div
      className="h-72 w-full"
      role="img"
      aria-label="Horizontal bar chart showing savings opportunity by tool"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 20 }}>
          <CartesianGrid stroke="hsl(var(--border))" horizontal={false} />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            type="category"
            dataKey="toolName"
            width={112}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => currency.format(Number(value))}
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "14px",
              color: "hsl(var(--foreground))"
            }}
          />
          <Bar
            dataKey="savings"
            radius={[0, 10, 10, 0]}
            fill="hsl(var(--primary))"
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
