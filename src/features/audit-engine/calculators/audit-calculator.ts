import { calculateOptimizationScore } from "@/features/audit-engine/calculators/score-calculator";
import {
  calculateCurrentMonthlySpend,
  calculateSpendBreakdown
} from "@/features/audit-engine/calculators/spend-calculator";
import { generateRecommendations } from "@/features/audit-engine/recommendations/recommendation-engine";
import { generateAuditSummary } from "@/features/audit-engine/recommendations/summary-generator";
import { analyzeTool } from "@/features/audit-engine/rules/tool-rules";
import type {
  AuditInput,
  AuditReport,
  RecommendationSeverity
} from "@/features/audit-engine/types";
import { roundCurrency } from "@/features/audit-engine/utils/money";

function savingsStatus(currentSpend: number, monthlySavings: number): RecommendationSeverity {
  if (monthlySavings > currentSpend * 0.22) return "high";
  if (monthlySavings > currentSpend * 0.1) return "moderate";
  if (monthlySavings > 0) return "low";
  return "healthy";
}

export function calculateAuditReport(input: AuditInput): AuditReport {
  const currentMonthlySpend = calculateCurrentMonthlySpend(input.tools);
  const baseToolAnalysis = input.tools.map((tool) => analyzeTool(tool, input));
  const recommendations = generateRecommendations(input, baseToolAnalysis);
  const recommendationSavings = recommendations.reduce(
    (total, recommendation) => total + recommendation.monthlySavings,
    0
  );

  const toolSavingsByName = new Map<string, number>();
  baseToolAnalysis.forEach((analysis) => {
    toolSavingsByName.set(analysis.toolName, analysis.monthlySavings);
  });

  recommendations
    .filter((recommendation) => recommendation.type === "consolidation")
    .forEach((recommendation) => {
      const perToolSavings =
        recommendation.affectedTools.length > 0
          ? recommendation.monthlySavings / recommendation.affectedTools.length
          : 0;
      recommendation.affectedTools.forEach((toolName) => {
        toolSavingsByName.set(
          toolName,
          (toolSavingsByName.get(toolName) ?? 0) + perToolSavings
        );
      });
    });

  const toolAnalysis = baseToolAnalysis.map((analysis) => {
    const monthlySavings = roundCurrency(toolSavingsByName.get(analysis.toolName) ?? 0);
    const optimizedSpend = roundCurrency(analysis.currentSpend - monthlySavings);

    if (monthlySavings === analysis.monthlySavings) {
      return analysis;
    }

    return {
      ...analysis,
      monthlySavings,
      annualSavings: monthlySavings * 12,
      optimizedSpend,
      status: savingsStatus(analysis.currentSpend, monthlySavings),
      recommendation:
        monthlySavings > analysis.monthlySavings
          ? "Review overlap with adjacent tools"
          : analysis.recommendation,
      reasoning:
        monthlySavings > analysis.monthlySavings
          ? "Part of this opportunity comes from overlap with other tools in the same workflow category."
          : analysis.reasoning
    };
  });

  const monthlySavings = roundCurrency(Math.min(recommendationSavings, currentMonthlySpend * 0.38));
  const optimizedMonthlySpend = roundCurrency(currentMonthlySpend - monthlySavings);
  const optimizationScore = calculateOptimizationScore(
    currentMonthlySpend,
    monthlySavings,
    recommendations
  );

  const partialReport = {
    currentMonthlySpend,
    monthlySavings,
    optimizationScore,
    recommendations
  };

  return {
    currentMonthlySpend,
    optimizedMonthlySpend,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    optimizationScore,
    recommendations,
    spendBreakdown: calculateSpendBreakdown(input.tools),
    toolAnalysis,
    savingsOpportunities: toolAnalysis
      .map((analysis) => ({
        toolName: analysis.toolName,
        savings: analysis.monthlySavings
      }))
      .filter((item) => item.savings > 0)
      .sort((a, b) => b.savings - a.savings),
    summary: generateAuditSummary(input, partialReport)
  };
}
