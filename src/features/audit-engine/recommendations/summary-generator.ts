import type { AuditInput, AuditReport } from "@/features/audit-engine/types";

export function generateAuditSummary(
  input: AuditInput,
  report: Pick<
    AuditReport,
    "monthlySavings" | "currentMonthlySpend" | "optimizationScore" | "recommendations"
  >
) {
  const savingsRate =
    report.currentMonthlySpend > 0
      ? Math.round((report.monthlySavings / report.currentMonthlySpend) * 100)
      : 0;

  if (report.monthlySavings <= 0) {
    return {
      headline: "Your AI stack looks disciplined.",
      body:
        "Based on the tools and spend entered, there is no obvious high-confidence savings opportunity. The most useful next step is to keep ownership clear and revisit usage before renewals."
    };
  }

  const strongest = report.recommendations.find(
    (recommendation) => recommendation.monthlySavings > 0
  );

  return {
    headline:
      report.optimizationScore >= 75
        ? "Your stack is mostly healthy with a few practical cleanup opportunities."
        : "Your current AI stack has measurable but manageable optimization potential.",
    body: `StackPilot found a conservative savings range of about ${savingsRate}% of monthly AI spend. The clearest opportunity is ${strongest?.title.toLowerCase() ?? "plan and seat cleanup"}, based on a ${input.teamSize}-person team and ${input.useCase || "mixed"} usage profile.`
  };
}
