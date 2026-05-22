import { describe, it, expect } from "vitest";

import { calculateOptimizationScore } from "@/features/audit-engine/calculators/score-calculator";
import type { AuditRecommendation } from "@/features/audit-engine/types";

function createRecommendation(
  severity: AuditRecommendation["severity"],
  savings: number
): AuditRecommendation {
  return {
    id: `rec-${severity}`,
    type: "downgrade",
    severity,
    title: "Test recommendation",
    description: "Test description",
    reasoning: "Test reasoning",
    affectedTools: ["ChatGPT"],
    monthlySavings: savings,
    annualSavings: savings * 12
  };
}

describe("calculateOptimizationScore", () => {
  it("returns 100 for zero spend", () => {
    const score = calculateOptimizationScore(0, 0, []);
    expect(score).toBe(100);
  });

  it("returns higher scores for lower savings rates", () => {
    const lowSavingsScore = calculateOptimizationScore(
      1000,
      50,
      [createRecommendation("low", 50)]
    );
    const highSavingsScore = calculateOptimizationScore(
      1000,
      300,
      [createRecommendation("high", 300)]
    );

    expect(lowSavingsScore).toBeGreaterThan(highSavingsScore);
  });

  it("penalizes high severity recommendations more than low", () => {
    const highSeverityScore = calculateOptimizationScore(
      1000,
      100,
      [createRecommendation("high", 100)]
    );
    const lowSeverityScore = calculateOptimizationScore(
      1000,
      100,
      [createRecommendation("low", 100)]
    );

    expect(highSeverityScore).toBeLessThan(lowSeverityScore);
  });

  it("score stays within 42-98 bounds for realistic inputs", () => {
    const scenarios = [
      { spend: 500, savings: 25, recs: [createRecommendation("low", 25)] },
      { spend: 2000, savings: 400, recs: [createRecommendation("moderate", 400)] },
      {
        spend: 5000,
        savings: 1500,
        recs: [
          createRecommendation("high", 800),
          createRecommendation("moderate", 700)
        ]
      }
    ];

    for (const { spend, savings, recs } of scenarios) {
      const score = calculateOptimizationScore(spend, savings, recs);
      expect(score).toBeGreaterThanOrEqual(42);
      expect(score).toBeLessThanOrEqual(98);
    }
  });

  it("multiple recommendations accumulate severity penalty", () => {
    const singleRecScore = calculateOptimizationScore(
      1000,
      100,
      [createRecommendation("high", 100)]
    );
    const multipleRecScore = calculateOptimizationScore(
      1000,
      100,
      [
        createRecommendation("high", 50),
        createRecommendation("high", 50)
      ]
    );

    expect(multipleRecScore).toBeLessThan(singleRecScore);
  });
});
