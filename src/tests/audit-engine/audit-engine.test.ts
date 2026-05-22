import { describe, it, expect } from "vitest";

import { calculateAuditReport } from "@/features/audit-engine/calculators/audit-calculator";
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

describe("calculateAuditReport", () => {
  it("returns a valid report structure for a minimal input", () => {
    const input = createInput({
      tools: [createTool({ name: "ChatGPT", plan: "Team", monthlySpend: 300, seats: 10 })]
    });

    const report = calculateAuditReport(input);

    expect(report.currentMonthlySpend).toBeGreaterThan(0);
    expect(report.optimizationScore).toBeGreaterThanOrEqual(42);
    expect(report.optimizationScore).toBeLessThanOrEqual(98);
    expect(Array.isArray(report.recommendations)).toBe(true);
    expect(Array.isArray(report.toolAnalysis)).toBe(true);
    expect(Array.isArray(report.spendBreakdown)).toBe(true);
    expect(Array.isArray(report.savingsOpportunities)).toBe(true);
    expect(report.summary.headline).toBeDefined();
    expect(report.summary.body).toBeDefined();
  });

  it("produces downgrade recommendations for enterprise overspend", () => {
    const input = createInput({
      teamSize: 5,
      tools: [
        createTool({
          name: "Claude",
          plan: "Enterprise",
          monthlySpend: 600,
          seats: 5
        })
      ]
    });

    const report = calculateAuditReport(input);

    const hasDowngrade = report.recommendations.some(
      (r) => r.type === "downgrade" || r.type === "enterprise-overspend"
    );
    expect(hasDowngrade).toBe(true);
    expect(report.monthlySavings).toBeGreaterThan(0);
  });

  it("produces consolidation recommendations for overlapping tools", () => {
    const input = createInput({
      teamSize: 15,
      useCase: "Mixed Usage",
      tools: [
        createTool({ name: "ChatGPT", plan: "Team", monthlySpend: 450, seats: 15 }),
        createTool({ name: "Claude", plan: "Team", monthlySpend: 450, seats: 15 }),
        createTool({ name: "Gemini", plan: "Business", monthlySpend: 360, seats: 15 })
      ]
    });

    const report = calculateAuditReport(input);

    const hasConsolidation = report.recommendations.some(
      (r) => r.type === "consolidation"
    );
    expect(hasConsolidation).toBe(true);
  });

  it("returns healthy spend scenario with minimal savings", () => {
    const input = createInput({
      teamSize: 20,
      tools: [
        createTool({ name: "ChatGPT", plan: "Team", monthlySpend: 600, seats: 20 }),
        createTool({ name: "Cursor", plan: "Business", monthlySpend: 800, seats: 20 })
      ]
    });

    const report = calculateAuditReport(input);

    const savingsRate = report.monthlySavings / report.currentMonthlySpend;
    expect(savingsRate).toBeLessThan(0.15);
  });

  it("caps monthly savings at 38% of current spend", () => {
    const input = createInput({
      teamSize: 8,
      tools: [
        createTool({ name: "ChatGPT", plan: "Enterprise", monthlySpend: 1200, seats: 8 }),
        createTool({ name: "Claude", plan: "Enterprise", monthlySpend: 1000, seats: 8 }),
        createTool({ name: "Cursor", plan: "Enterprise", monthlySpend: 800, seats: 8 }),
        createTool({ name: "GitHub Copilot", plan: "Enterprise", monthlySpend: 600, seats: 8 })
      ]
    });

    const report = calculateAuditReport(input);

    const maxAllowedSavings = report.currentMonthlySpend * 0.38;
    expect(report.monthlySavings).toBeLessThanOrEqual(Math.ceil(maxAllowedSavings));
  });

  it("optimization score stays within 42-98 bounds", () => {
    const inputs: AuditInput[] = [
      createInput({
        teamSize: 3,
        tools: [createTool({ name: "ChatGPT", plan: "Plus", monthlySpend: 60, seats: 3 })]
      }),
      createInput({
        teamSize: 50,
        tools: [
          createTool({ name: "ChatGPT", plan: "Enterprise", monthlySpend: 2000, seats: 50 }),
          createTool({ name: "Claude", plan: "Enterprise", monthlySpend: 1500, seats: 50 }),
          createTool({ name: "Cursor", plan: "Enterprise", monthlySpend: 1200, seats: 50 }),
          createTool({ name: "GitHub Copilot", plan: "Enterprise", monthlySpend: 1000, seats: 50 }),
          createTool({ name: "OpenAI API", plan: "Pay as you go", monthlySpend: 1500, seats: 1 })
        ]
      })
    ];

    for (const input of inputs) {
      const report = calculateAuditReport(input);
      expect(report.optimizationScore).toBeGreaterThanOrEqual(42);
      expect(report.optimizationScore).toBeLessThanOrEqual(98);
    }
  });

  it("annual savings equals monthly savings multiplied by 12", () => {
    const input = createInput({
      tools: [
        createTool({ name: "ChatGPT", plan: "Team", monthlySpend: 450, seats: 15 }),
        createTool({ name: "Claude", plan: "Team", monthlySpend: 300, seats: 10 })
      ]
    });

    const report = calculateAuditReport(input);

    expect(report.annualSavings).toBe(report.monthlySavings * 12);
  });

  it("spend breakdown percentages sum to approximately 100", () => {
    const input = createInput({
      tools: [
        createTool({ name: "ChatGPT", plan: "Team", monthlySpend: 300, seats: 10 }),
        createTool({ name: "Claude", plan: "Team", monthlySpend: 200, seats: 7 }),
        createTool({ name: "Cursor", plan: "Business", monthlySpend: 400, seats: 10 })
      ]
    });

    const report = calculateAuditReport(input);
    const totalPercentage = report.spendBreakdown.reduce(
      (sum, item) => sum + item.percentage,
      0
    );

    expect(totalPercentage).toBeGreaterThanOrEqual(95);
    expect(totalPercentage).toBeLessThanOrEqual(105);
  });

  it("handles empty tools array with demo fallback behavior", () => {
    const input = createInput({ tools: [] });

    const report = calculateAuditReport(input);

    expect(report.currentMonthlySpend).toBe(0);
    expect(report.monthlySavings).toBe(0);
    expect(report.optimizationScore).toBe(100);
  });
});
