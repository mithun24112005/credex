import type { AuditTool } from "@/types";

import type { SpendBreakdownItem } from "@/features/audit-engine/types";
import { roundCurrency } from "@/features/audit-engine/utils/money";

export function calculateCurrentMonthlySpend(tools: AuditTool[]) {
  return roundCurrency(
    tools.reduce((total, tool) => total + Number(tool.monthlySpend || 0), 0)
  );
}

export function calculateSpendBreakdown(tools: AuditTool[]): SpendBreakdownItem[] {
  const total = calculateCurrentMonthlySpend(tools);

  return tools
    .filter((tool) => tool.monthlySpend > 0)
    .map((tool) => ({
      name: tool.name,
      value: roundCurrency(tool.monthlySpend),
      percentage: total > 0 ? Math.round((tool.monthlySpend / total) * 100) : 0
    }))
    .sort((a, b) => b.value - a.value);
}
