import { getAuditByPublicId } from "@/services/audit/audit-service";
import type { PublicReportPayload } from "@/services/share/types";
import type { AuditReport } from "@/features/audit-engine";
import type { AuditTool, CompanyStage, PrimaryUseCase } from "@/types";

export async function getPublicReport(publicId: string): Promise<PublicReportPayload | null> {
  const audit = await getAuditByPublicId(publicId);

  if (!audit) {
    return null;
  }

  return {
    publicId: audit.publicId,
    teamSize: audit.teamSize,
    companyStage: audit.companyStage as CompanyStage,
    useCase: audit.useCase as PrimaryUseCase,
    tools: audit.tools as unknown as AuditTool[],
    report: {
      currentMonthlySpend: audit.currentMonthlySpend,
      optimizedMonthlySpend: audit.optimizedMonthlySpend,
      monthlySavings: audit.monthlySavings,
      annualSavings: audit.annualSavings,
      optimizationScore: audit.optimizationScore,
      recommendations: audit.recommendations,
      spendBreakdown: audit.spendBreakdown,
      toolAnalysis: audit.toolAnalysis,
      savingsOpportunities: audit.savingsOpportunities,
      summary: audit.aiSummary ?? {
        headline: "StackPilot audit report",
        body: "This report contains conservative AI stack optimization findings."
      }
    } as AuditReport,
    createdAt: audit.createdAt
  };
}
