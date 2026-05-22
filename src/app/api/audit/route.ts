import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { createAudit } from "@/services/audit/audit-service";
import { createAuditPayloadSchema } from "@/validators/audit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = createAuditPayloadSchema.parse(await request.json());
    const result = await createAudit(payload);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Invalid audit payload.",
          issues: error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          "We could not save this audit right now. Please retry in a moment."
      },
      { status: 500 }
    );
  }
}
