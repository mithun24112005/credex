import type { AiToolName, AuditTool, CompanyStage, PrimaryUseCase } from "@/types";

export type AuditInput = {
  teamSize: number;
  companyStage: CompanyStage | "";
  useCase: PrimaryUseCase | "";
  tools: AuditTool[];
};

export type RecommendationType =
  | "downgrade"
  | "consolidation"
  | "enterprise-overspend"
  | "api-optimization"
  | "healthy-spend";

export type RecommendationSeverity = "healthy" | "low" | "moderate" | "high";

export type AuditRecommendation = {
  id: string;
  type: RecommendationType;
  severity: RecommendationSeverity;
  title: string;
  description: string;
  reasoning: string;
  affectedTools: AiToolName[];
  monthlySavings: number;
  annualSavings: number;
};

export type SpendBreakdownItem = {
  name: AiToolName;
  value: number;
  percentage: number;
};

export type ToolAnalysis = {
  id: string;
  toolName: AiToolName;
  currentPlan: string;
  suggestedPlan: string;
  currentSpend: number;
  optimizedSpend: number;
  monthlySavings: number;
  annualSavings: number;
  status: RecommendationSeverity;
  recommendation: string;
  reasoning: string;
};

export type SavingsOpportunity = {
  toolName: AiToolName;
  savings: number;
};

export type AuditReport = {
  currentMonthlySpend: number;
  optimizedMonthlySpend: number;
  monthlySavings: number;
  annualSavings: number;
  optimizationScore: number;
  recommendations: AuditRecommendation[];
  spendBreakdown: SpendBreakdownItem[];
  toolAnalysis: ToolAnalysis[];
  savingsOpportunities: SavingsOpportunity[];
  summary: {
    headline: string;
    body: string;
  };
};
