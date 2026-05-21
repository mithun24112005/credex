import { z } from "zod";

import { aiToolNames, companyStages, primaryUseCaseValues, toolPlans } from "@/config/audit";
import type { AiToolName } from "@/types";

export const teamStepSchema = z.object({
  teamSize: z.coerce.number().min(1, "Team size must be at least 1."),
  companyStage: z.enum(companyStages, {
    required_error: "Choose your company stage."
  }),
  useCase: z.enum(primaryUseCaseValues, {
    required_error: "Choose your primary use case."
  })
});

export const toolSchema = z
  .object({
    name: z.enum(aiToolNames as [AiToolName, ...AiToolName[]]),
    plan: z.string().min(1, "Choose a plan."),
    monthlySpend: z.coerce.number().positive("Monthly spend must be positive."),
    seats: z.coerce.number().min(1, "Seats must be at least 1.")
  })
  .superRefine((value, ctx) => {
    if (!toolPlans[value.name].includes(value.plan)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["plan"],
        message: "Choose a valid plan for this tool."
      });
    }
  });

export const toolsStepSchema = z.object({
  toolsCount: z.number().min(1, "Add at least one AI tool to continue.")
});

export type TeamStepValues = z.infer<typeof teamStepSchema>;
export type ToolFormValues = z.infer<typeof toolSchema>;
