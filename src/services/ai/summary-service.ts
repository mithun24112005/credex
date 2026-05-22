import { getGroqClient } from "@/lib/groq";
import { buildAuditSummaryPrompt } from "@/prompts/audit-summary";
import type { AuditReport } from "@/features/audit-engine";

const AI_MODEL = "openai/gpt-oss-120b";

export function createFallbackSummary(report: AuditReport) {
  if (report.monthlySavings <= 0) {
    return {
      headline: "Your AI stack appears fairly optimized.",
      body:
        "StackPilot did not find a high-confidence savings opportunity from the current plan, spend, and seat data. Keep ownership clear and revisit usage before renewal cycles."
    };
  }

  return {
    headline: "Your AI stack has practical optimization opportunities.",
    body: `StackPilot found about $${report.monthlySavings.toLocaleString()} per month in conservative savings. The strongest signals come from plan fit, subscription overlap, and API spend review rather than aggressive tool cuts.`
  };
}

async function runGroqSummary(report: AuditReport) {
  const client = getGroqClient();

  if (!client) {
    throw new Error("Groq API key is not configured.");
  }

  const completion = await client.chat.completions.create({
    model: AI_MODEL,
    temperature: 1,
    max_completion_tokens: 512,
    top_p: 1,
    reasoning_effort: "medium",
    messages: [
      {
        role: "system",
        content:
          "You write sober, financially conservative SaaS audit summaries for founders and engineering leaders."
      },
      {
        role: "user",
        content: buildAuditSummaryPrompt(report)
      }
    ]
  });

  const body = completion.choices[0]?.message?.content?.trim();

  if (!body) {
    throw new Error("Groq returned an empty summary.");
  }

  return {
    headline:
      report.monthlySavings > 0
        ? "AI-generated audit summary"
        : "AI-generated efficiency summary",
    body
  };
}

export async function generateAiSummary(report: AuditReport) {
  try {
    return await runGroqSummary(report);
  } catch (error) {
    console.error("Groq summary failed:", error);
    return createFallbackSummary(report);
  }
}
