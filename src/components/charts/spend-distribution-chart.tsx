"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

import { chartColors } from "@/components/charts/chart-colors";
import type { SpendBreakdownItem } from "@/features/audit-engine";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export function SpendDistributionChart({ data }: { data: SpendBreakdownItem[] }) {
  return (
    <div
      className="h-72 w-full"
      role="img"
      aria-label="Donut chart showing AI spend distribution by tool"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="58%"
            outerRadius="82%"
            paddingAngle={3}
            stroke="hsl(var(--card))"
            strokeWidth={3}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => currency.format(Number(value))}
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "14px",
              color: "hsl(var(--foreground))"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
