import { z } from "zod";

const optionalTrimmed = z
  .string()
  .trim()
  .max(120)
  .optional()
  .transform((value) => (value ? value : undefined));

export const leadPayloadSchema = z.object({
  email: z.string().trim().email().max(254).toLowerCase(),
  company: optionalTrimmed,
  role: optionalTrimmed,
  auditId: z.string().trim().min(6).max(80)
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;
