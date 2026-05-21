import { pricingConfig } from "@/features/audit-engine/pricing/pricing-config";
import type {
  AuditInput,
  AuditRecommendation,
  ToolAnalysis
} from "@/features/audit-engine/types";
import { conservativeSavings, roundCurrency } from "@/features/audit-engine/utils/money";
import type { AiToolName, AuditTool } from "@/types";

const recommendationId = (type: string, index: number) => `${type}-${index}`;

function createToolRecommendation(
  analysis: ToolAnalysis,
  index: number
): AuditRecommendation | null {
  if (analysis.monthlySavings <= 0) {
    return null;
  }

  const type =
    analysis.currentPlan === "Enterprise"
      ? "enterprise-overspend"
      : analysis.toolName.includes("API")
        ? "api-optimization"
        : "downgrade";

  return {
    id: recommendationId(type, index),
    type,
    severity: analysis.status,
    title: analysis.recommendation,
    description: `${analysis.toolName} could conservatively reduce spend by about $${analysis.monthlySavings.toLocaleString()} per month.`,
    reasoning: analysis.reasoning,
    affectedTools: [analysis.toolName],
    monthlySavings: analysis.monthlySavings,
    annualSavings: analysis.annualSavings
  };
}

function categoryTools(tools: AuditTool[], category: "general-ai" | "coding") {
  return tools.filter((tool) => pricingConfig[tool.name].category === category);
}

function consolidationRecommendation(
  tools: AuditTool[],
  category: "general-ai" | "coding",
  title: string,
  reasoning: string,
  index: number,
  savingsRate: number
): AuditRecommendation | null {
  if (tools.length < 3) {
    return null;
  }

  const sorted = [...tools].sort((a, b) => a.monthlySpend - b.monthlySpend);
  const smallestPaidTool = sorted.find((tool) => tool.monthlySpend > 0);

  if (!smallestPaidTool) {
    return null;
  }

  const monthlySavings = conservativeSavings(
    smallestPaidTool.monthlySpend,
    smallestPaidTool.monthlySpend * savingsRate,
    0.22
  );

  if (monthlySavings < 20) {
    return null;
  }

  return {
    id: recommendationId(`${category}-consolidation`, index),
    type: "consolidation",
    severity: monthlySavings > 150 ? "moderate" : "low",
    title,
    description: `The stack includes ${tools.map((tool) => tool.name).join(", ")}. Standardizing one workflow could reduce about $${monthlySavings.toLocaleString()} per month.`,
    reasoning,
    affectedTools: tools.map((tool) => tool.name) as AiToolName[],
    monthlySavings,
    annualSavings: monthlySavings * 12
  };
}

export function generateRecommendations(
  input: AuditInput,
  toolAnalysis: ToolAnalysis[]
): AuditRecommendation[] {
  const recommendations = toolAnalysis
    .map((analysis, index) => createToolRecommendation(analysis, index))
    .filter(Boolean) as AuditRecommendation[];

  const generalAiTools = categoryTools(input.tools, "general-ai");
  const codingTools = categoryTools(input.tools, "coding");

  const generalConsolidation = consolidationRecommendation(
    generalAiTools,
    "general-ai",
    "Consolidate overlapping general AI assistants",
    "Multiple general-purpose AI assistants can be valuable, but three or more paid assistants often create overlapping seats and unclear ownership.",
    recommendations.length + 1,
    0.18
  );

  if (generalConsolidation) {
    recommendations.push(generalConsolidation);
  }

  const codingConsolidation = consolidationRecommendation(
    codingTools,
    "coding",
    "Standardize coding assistants by engineering workflow",
    "Cursor, Copilot, and Windsurf can all be justified, but overlapping paid seats should map to specific engineering workflows.",
    recommendations.length + 1,
    input.useCase === "Coding" ? 0.12 : 0.18
  );

  if (codingConsolidation) {
    recommendations.push(codingConsolidation);
  }

  const totalSavings = recommendations.reduce(
    (total, recommendation) => total + recommendation.monthlySavings,
    0
  );
  const currentSpend = input.tools.reduce((total, tool) => total + tool.monthlySpend, 0);

  if (recommendations.length === 0 || totalSavings < Math.max(25, currentSpend * 0.04)) {
    recommendations.push({
      id: "healthy-spend",
      type: "healthy-spend",
      severity: "healthy",
      title: "Your stack is already fairly optimized",
      description:
        "The current setup does not show an obvious high-confidence savings opportunity from plan level, seat count, or tool overlap.",
      reasoning:
        "StackPilot avoids forcing recommendations when the available frontend inputs do not justify a meaningful savings claim.",
      affectedTools: input.tools.map((tool) => tool.name),
      monthlySavings: 0,
      annualSavings: 0
    });
  }

  return recommendations.map((recommendation) => ({
    ...recommendation,
    monthlySavings: roundCurrency(recommendation.monthlySavings),
    annualSavings: roundCurrency(recommendation.annualSavings)
  }));
}
