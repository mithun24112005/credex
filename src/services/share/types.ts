import type { AuditReport } from "@/features/audit-engine";
import type { AuditTool, CompanyStage, PrimaryUseCase } from "@/types";

export type PublicReportPayload = {
  publicId: string;
  teamSize: number;
  companyStage: CompanyStage | "";
  useCase: PrimaryUseCase | "";
  tools: AuditTool[];
  report: AuditReport;
  createdAt?: string | Date;
};
