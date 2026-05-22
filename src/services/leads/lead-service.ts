import { connectToDatabase } from "@/lib/mongodb";
import { LeadModel } from "@/models/Lead";
import type { LeadPayload } from "@/validators/lead";

export async function captureLead(payload: LeadPayload) {
  await connectToDatabase();

  const lead = await LeadModel.findOneAndUpdate(
    { email: payload.email, auditId: payload.auditId },
    {
      $set: {
        company: payload.company,
        role: payload.role
      },
      $setOnInsert: {
        email: payload.email,
        auditId: payload.auditId
      }
    },
    { new: true, upsert: true, lean: true }
  );

  return lead;
}
