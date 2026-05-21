import type { AuditRecommendation } from "@/features/audit-engine/types";
import { clamp } from "@/features/audit-engine/utils/money";

export function calculateOptimizationScore(
  currentMonthlySpend: number,
  monthlySavings: number,
  recommendations: AuditRecommendation[]
) {
  if (currentMonthlySpend <= 0) {
    return 100;
  }

  const savingsRate = monthlySavings / currentMonthlySpend;
  const severityPenalty = recommendations.reduce((penalty, recommendation) => {
    if (recommendation.severity === "high") return penalty + 9;
    if (recommendation.severity === "moderate") return penalty + 6;
    if (recommendation.severity === "low") return penalty + 3;
    return penalty;
  }, 0);

  return Math.round(clamp(96 - savingsRate * 90 - severityPenalty, 42, 98));
}
