import { describe, it, expect } from "vitest";

import { generateRecommendations } from "@/features/audit-engine/recommendations/recommendation-engine";
import { analyzeTool } from "@/features/audit-engine/rules/tool-rules";
import type { AuditInput } from "@/features/audit-engine/types";

function createInput(overrides: Partial<AuditInput> = {}): AuditInput {
  return {
    teamSize: 10,
    companyStage: "Seed Stage",
    useCase: "Coding",
    tools: [],
    ...overrides
  };
}

function createTool(overrides: Partial<AuditInput["tools"][0]> = {}): AuditInput["tools"][0] {
  return {
    id: `tool-${Math.random()}`,
    name: "ChatGPT",
    plan: "Team",
    monthlySpend: 300,
    seats: 10,
    ...overrides
  };
}

describe("generateRecommendations", () => {
  it("returns at least one recommendation for any input", () => {
    const input = createInput({
      tools: [createTool({ name: "ChatGPT", plan: "Team", monthlySpend: 300, seats: 10 })]
    });
    const analysis = input.tools.map((tool) => analyzeTool(tool, input));
    const recommendations = generateRecommendations(input, analysis);

    expect(recommendations.length).toBeGreaterThanOrEqual(1);
  });

  it("generates downgrade recommendation for enterprise plan with small team", () => {
    const input = createInput({
      teamSize: 5,
      tools: [
        createTool({ name: "Claude", plan: "Enterprise", monthlySpend: 600, seats: 5 })
      ]
    });
    const analysis = input.tools.map((tool) => analyzeTool(tool, input));
    const recommendations = generateRecommendations(input, analysis);

    const hasDowngrade = recommendations.some(
      (r) => r.type === "downgrade" || r.type === "enterprise-overspend"
    );
    expect(hasDowngrade).toBe(true);
  });

  it("generates consolidation recommendation for 3+ general AI tools", () => {
    const input = createInput({
      teamSize: 15,
      useCase: "Mixed Usage",
      tools: [
        createTool({ name: "ChatGPT", plan: "Team", monthlySpend: 450, seats: 15 }),
        createTool({ name: "Claude", plan: "Team", monthlySpend: 450, seats: 15 }),
        createTool({ name: "Gemini", plan: "Business", monthlySpend: 360, seats: 15 })
      ]
    });
    const analysis = input.tools.map((tool) => analyzeTool(tool, input));
    const recommendations = generateRecommendations(input, analysis);

    const consolidation = recommendations.find((r) => r.type === "consolidation");
    expect(consolidation).toBeDefined();
    expect(consolidation?.affectedTools.length).toBeGreaterThanOrEqual(2);
  });

  it("generates healthy-spend recommendation when stack is optimized", () => {
    const input = createInput({
      teamSize: 20,
      tools: [
        createTool({ name: "ChatGPT", plan: "Team", monthlySpend: 600, seats: 20 }),
        createTool({ name: "Cursor", plan: "Business", monthlySpend: 800, seats: 20 })
      ]
    });
    const analysis = input.tools.map((tool) => analyzeTool(tool, input));
    const recommendations = generateRecommendations(input, analysis);

    const hasHealthy = recommendations.some((r) => r.type === "healthy-spend");
    expect(hasHealthy).toBe(true);
  });

  it("API optimization recommendation for high API spend", () => {
    const input = createInput({
      tools: [
        createTool({ name: "OpenAI API", plan: "Pay as you go", monthlySpend: 800, seats: 1 })
      ]
    });
    const analysis = input.tools.map((tool) => analyzeTool(tool, input));
    const recommendations = generateRecommendations(input, analysis);

    const hasApiRec = recommendations.some(
      (r) => r.type === "api-optimization" || r.title.includes("API")
    );
    expect(hasApiRec).toBe(true);
  });

  it("consolidation recommendation has affected tools list", () => {
    const input = createInput({
      teamSize: 12,
      useCase: "Coding",
      tools: [
        createTool({ name: "Cursor", plan: "Business", monthlySpend: 480, seats: 12 }),
        createTool({ name: "GitHub Copilot", plan: "Business", monthlySpend: 228, seats: 12 }),
        createTool({ name: "Windsurf", plan: "Teams", monthlySpend: 360, seats: 12 })
      ]
    });
    const analysis = input.tools.map((tool) => analyzeTool(tool, input));
    const recommendations = generateRecommendations(input, analysis);

    const codingConsolidation = recommendations.find(
      (r) => r.type === "consolidation" && r.title.toLowerCase().includes("coding")
    );
    expect(codingConsolidation).toBeDefined();
    expect(codingConsolidation?.affectedTools.length).toBeGreaterThanOrEqual(2);
  });

  it("all recommendations have rounded monthly and annual savings", () => {
    const input = createInput({
      teamSize: 8,
      tools: [
        createTool({ name: "ChatGPT", plan: "Enterprise", monthlySpend: 1000, seats: 8 }),
        createTool({ name: "Claude", plan: "Team", monthlySpend: 240, seats: 8 })
      ]
    });
    const analysis = input.tools.map((tool) => analyzeTool(tool, input));
    const recommendations = generateRecommendations(input, analysis);

    for (const rec of recommendations) {
      expect(Number.isInteger(rec.monthlySavings)).toBe(true);
      expect(Number.isInteger(rec.annualSavings)).toBe(true);
      expect(rec.annualSavings).toBe(rec.monthlySavings * 12);
    }
  });
});
