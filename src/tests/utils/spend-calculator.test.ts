import { describe, it, expect } from "vitest";

import {
  calculateCurrentMonthlySpend,
  calculateSpendBreakdown
} from "@/features/audit-engine/calculators/spend-calculator";
import type { AuditTool } from "@/types";

function createTool(overrides: Partial<AuditTool> = {}): AuditTool {
  return {
    id: `tool-${Math.random()}`,
    name: "ChatGPT",
    plan: "Team",
    monthlySpend: 300,
    seats: 10,
    ...overrides
  };
}

describe("calculateCurrentMonthlySpend", () => {
  it("sums all tool monthly spend", () => {
    const tools = [
      createTool({ monthlySpend: 300 }),
      createTool({ name: "Claude", monthlySpend: 200 }),
      createTool({ name: "Cursor", monthlySpend: 400 })
    ];

    const total = calculateCurrentMonthlySpend(tools);
    expect(total).toBe(900);
  });

  it("returns 0 for empty tools array", () => {
    const total = calculateCurrentMonthlySpend([]);
    expect(total).toBe(0);
  });

  it("handles tools with zero spend", () => {
    const tools = [
      createTool({ monthlySpend: 0 }),
      createTool({ name: "Claude", monthlySpend: 200 })
    ];

    const total = calculateCurrentMonthlySpend(tools);
    expect(total).toBe(200);
  });

  it("rounds currency to integer", () => {
    const tools = [
      createTool({ monthlySpend: 300 }),
      createTool({ name: "Claude", monthlySpend: 200 })
    ];

    const total = calculateCurrentMonthlySpend(tools);
    expect(total).toBe(500);
  });
});

describe("calculateSpendBreakdown", () => {
  it("returns breakdown with correct percentages", () => {
    const tools = [
      createTool({ monthlySpend: 300 }),
      createTool({ name: "Claude", monthlySpend: 200 }),
      createTool({ name: "Cursor", monthlySpend: 500 })
    ];

    const breakdown = calculateSpendBreakdown(tools);

    expect(breakdown.length).toBe(3);
    expect(breakdown[0].name).toBe("Cursor");
    expect(breakdown[0].value).toBe(500);
    expect(breakdown[0].percentage).toBe(50);
    expect(breakdown[1].name).toBe("ChatGPT");
    expect(breakdown[1].value).toBe(300);
    expect(breakdown[1].percentage).toBe(30);
  });

  it("sorts by value descending", () => {
    const tools = [
      createTool({ monthlySpend: 100 }),
      createTool({ name: "Claude", monthlySpend: 500 }),
      createTool({ name: "Cursor", monthlySpend: 300 })
    ];

    const breakdown = calculateSpendBreakdown(tools);
    const values = breakdown.map((item) => item.value);

    for (let i = 0; i < values.length - 1; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i + 1]);
    }
  });

  it("filters out tools with zero spend", () => {
    const tools = [
      createTool({ monthlySpend: 0 }),
      createTool({ name: "Claude", monthlySpend: 200 }),
      createTool({ name: "Cursor", monthlySpend: 0 })
    ];

    const breakdown = calculateSpendBreakdown(tools);
    expect(breakdown.length).toBe(1);
    expect(breakdown[0].name).toBe("Claude");
  });

  it("returns empty array for all zero spend", () => {
    const tools = [
      createTool({ monthlySpend: 0 }),
      createTool({ name: "Claude", monthlySpend: 0 })
    ];

    const breakdown = calculateSpendBreakdown(tools);
    expect(breakdown.length).toBe(0);
  });

  it("returns empty array for empty tools", () => {
    const breakdown = calculateSpendBreakdown([]);
    expect(breakdown.length).toBe(0);
  });
});
