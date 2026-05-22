import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { queueReportEmail } from "@/services/email/email-service";
import { captureLead } from "@/services/leads/lead-service";
import { leadPayloadSchema } from "@/validators/lead";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = leadPayloadSchema.parse(await request.json());
    const lead = await captureLead(payload);
    await queueReportEmail({ email: payload.email, publicId: payload.auditId });

    return NextResponse.json({
      ok: true,
      leadId: lead?._id ? String(lead._id) : null
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid lead details.", issues: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "We could not save your details right now." },
      { status: 500 }
    );
  }
}
