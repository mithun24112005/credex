import type { AuditReport } from "@/features/audit-engine";

export function buildAuditSummaryPrompt(report: AuditReport) {
  const recommendations = report.recommendations
    .slice(0, 4)
    .map(
      (recommendation) =>
        `- ${recommendation.title}: $${recommendation.monthlySavings}/mo potential. Reason: ${recommendation.reasoning}`
    )
    .join("\n");

  return `You are writing a concise executive summary for StackPilot AI, an AI stack optimization product.

Rules:
- Keep the response under 120 words.
- Sound analytical, concise, and trustworthy.
- Avoid hype, sales language, exaggeration, or fake certainty.
- Do not invent tools, prices, or claims not present below.
- Mention realistic savings and explain the main source of overspending if applicable.
- If savings are low, honestly say the stack appears fairly optimized.

Audit data:
Current monthly spend: $${report.currentMonthlySpend}
Optimized monthly spend: $${report.optimizedMonthlySpend}
Monthly savings: $${report.monthlySavings}
Annual savings: $${report.annualSavings}
Efficiency score: ${report.optimizationScore}/100
Recommendations:
${recommendations || "- No high-confidence savings recommendations."}`;
}
