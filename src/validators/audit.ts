import { z } from "zod";

import { aiToolNames, companyStages, primaryUseCaseValues, toolPlans } from "@/config/audit";
import type { AiToolName } from "@/types";

export const auditToolPayloadSchema = z
  .object({
    id: z.string().trim().min(1).max(120).optional(),
    name: z.enum(aiToolNames as [AiToolName, ...AiToolName[]]),
    plan: z.string().trim().min(1).max(80),
    monthlySpend: z.coerce.number().min(0).max(250000),
    seats: z.coerce.number().int().min(1).max(100000)
  })
  .superRefine((value, ctx) => {
    if (!toolPlans[value.name].includes(value.plan)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["plan"],
        message: "Invalid plan for selected tool."
      });
    }
  });

export const createAuditPayloadSchema = z.object({
  teamSize: z.coerce.number().int().min(1).max(100000),
  companyStage: z.enum(companyStages),
  useCase: z.enum(primaryUseCaseValues),
  tools: z.array(auditToolPayloadSchema).min(1).max(40)
});

export const summaryPayloadSchema = z.object({
  report: z.unknown()
});

export type CreateAuditPayload = z.infer<typeof createAuditPayloadSchema>;
