import { pricingConfig } from "@/features/audit-engine/pricing/pricing-config";
import type { ToolAnalysis } from "@/features/audit-engine/types";
import { conservativeSavings, roundCurrency } from "@/features/audit-engine/utils/money";
import type { AuditInput } from "@/features/audit-engine/types";
import type { AuditTool } from "@/types";

function planTier(tool: AuditTool) {
  return pricingConfig[tool.name].plans[tool.plan]?.tier;
}

function estimatePlanSpend(tool: AuditTool, planName: string) {
  const plan = pricingConfig[tool.name].plans[planName];

  if (!plan) {
    return tool.monthlySpend;
  }

  if (plan.monthlySeatCost !== undefined) {
    return roundCurrency(plan.monthlySeatCost * Math.max(tool.seats, 1));
  }

  return plan.estimatedMonthlyMinimum ?? tool.monthlySpend;
}

export function analyzeTool(tool: AuditTool, input: AuditInput): ToolAnalysis {
  const config = pricingConfig[tool.name];
  const tier = planTier(tool);
  let suggestedPlan = tool.plan;
  let monthlySavings = 0;
  let recommendation = "Keep current setup";
  let reasoning =
    "This tool does not show a strong standalone savings signal based on the current team size and plan.";
  let status: ToolAnalysis["status"] = "healthy";

  if (tier === "enterprise" && input.teamSize <= 12 && config.businessPlan) {
    const targetSpend = estimatePlanSpend(tool, config.businessPlan);
    monthlySavings = conservativeSavings(tool.monthlySpend, tool.monthlySpend - targetSpend, 0.28);
    suggestedPlan = config.businessPlan;
    recommendation = `Review ${config.businessPlan} instead of Enterprise`;
    reasoning =
      "Your current team size likely does not require the full enterprise administration and procurement surface yet.";
    status = monthlySavings > tool.monthlySpend * 0.18 ? "high" : "moderate";
  } else if (
    (tier === "team" || tier === "business") &&
    tool.seats <= 2 &&
    config.individualPlan
  ) {
    const targetSpend = estimatePlanSpend(tool, config.individualPlan);
    monthlySavings = conservativeSavings(tool.monthlySpend, tool.monthlySpend - targetSpend, 0.32);
    suggestedPlan = config.individualPlan;
    recommendation = `Consider ${config.individualPlan} for a very small seat count`;
    reasoning =
      "Team collaboration features are often less valuable for one or two active users than individual plans.";
    status = monthlySavings > tool.monthlySpend * 0.16 ? "moderate" : "low";
  } else if (config.category === "api" && tool.monthlySpend >= 500) {
    monthlySavings = conservativeSavings(tool.monthlySpend, tool.monthlySpend * 0.1, 0.12);
    suggestedPlan = tool.plan;
    recommendation = "Review API routing, caching, and credit allocation";
    reasoning =
      "API spend is high enough that modest routing, caching, or committed-credit improvements may be worth reviewing.";
    status = monthlySavings >= 100 ? "moderate" : "low";
  }

  const optimizedSpend = roundCurrency(tool.monthlySpend - monthlySavings);

  return {
    id: tool.id,
    toolName: tool.name,
    currentPlan: tool.plan,
    suggestedPlan,
    currentSpend: roundCurrency(tool.monthlySpend),
    optimizedSpend,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    status,
    recommendation,
    reasoning
  };
}
