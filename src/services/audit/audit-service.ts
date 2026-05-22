import { randomBytes } from "crypto";

import { calculateAuditReport, type AuditInput, type AuditReport } from "@/features/audit-engine";
import { connectToDatabase } from "@/lib/mongodb";
import { AuditModel } from "@/models/Audit";
import { generateAiSummary } from "@/services/ai/summary-service";
import type { CreateAuditPayload } from "@/validators/audit";

function createPublicId() {
  return randomBytes(9).toString("base64url");
}

function normalizePayload(payload: CreateAuditPayload): AuditInput {
  return {
    teamSize: payload.teamSize,
    companyStage: payload.companyStage,
    useCase: payload.useCase,
    tools: payload.tools.map((tool, index) => ({
      id: tool.id ?? `${tool.name}-${index}`,
      name: tool.name,
      plan: tool.plan,
      monthlySpend: tool.monthlySpend,
      seats: tool.seats
    }))
  };
}

export async function createAudit(payload: CreateAuditPayload) {
  const input = normalizePayload(payload);
  const report = calculateAuditReport(input);
  const aiSummary = await generateAiSummary(report);
  const reportWithSummary: AuditReport = {
    ...report,
    summary: aiSummary
  };
  const publicId = createPublicId();

  await connectToDatabase();

  await AuditModel.create({
    publicId,
    teamSize: input.teamSize,
    companyStage: input.companyStage,
    useCase: input.useCase,
    tools: input.tools,
    currentMonthlySpend: reportWithSummary.currentMonthlySpend,
    optimizedMonthlySpend: reportWithSummary.optimizedMonthlySpend,
    monthlySavings: reportWithSummary.monthlySavings,
    annualSavings: reportWithSummary.annualSavings,
    optimizationScore: reportWithSummary.optimizationScore,
    recommendations: reportWithSummary.recommendations,
    spendBreakdown: reportWithSummary.spendBreakdown,
    toolAnalysis: reportWithSummary.toolAnalysis,
    savingsOpportunities: reportWithSummary.savingsOpportunities,
    aiSummary: reportWithSummary.summary
  });

  return {
    publicId,
    report: reportWithSummary
  };
}

export async function getAuditByPublicId(publicId: string) {
  try {
    await connectToDatabase();
    return AuditModel.findOne({ publicId }).lean();
  } catch {
    return null;
  }
}
