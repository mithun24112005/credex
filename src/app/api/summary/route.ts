import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { calculateAuditReport } from "@/features/audit-engine";
import { generateAiSummary } from "@/services/ai/summary-service";
import { createAuditPayloadSchema } from "@/validators/audit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = createAuditPayloadSchema.parse(await request.json());
    const report = calculateAuditReport({
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
    });
    const summary = await generateAiSummary(report);

    return NextResponse.json({ summary });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid summary payload.", issues: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Summary generation is temporarily unavailable." },
      { status: 500 }
    );
  }
}
