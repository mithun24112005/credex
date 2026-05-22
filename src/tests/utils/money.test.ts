import { describe, it, expect } from "vitest";

import { clamp, conservativeSavings, roundCurrency } from "@/features/audit-engine/utils/money";

describe("roundCurrency", () => {
  it("rounds positive values to nearest integer", () => {
    expect(roundCurrency(12.4)).toBe(12);
    expect(roundCurrency(12.5)).toBe(13);
    expect(roundCurrency(12.7)).toBe(13);
  });

  it("returns 0 for negative values", () => {
    expect(roundCurrency(-5)).toBe(0);
    expect(roundCurrency(-0.01)).toBe(0);
  });

  it("returns 0 for zero", () => {
    expect(roundCurrency(0)).toBe(0);
  });
});

describe("clamp", () => {
  it("returns value when within bounds", () => {
    expect(clamp(50, 0, 100)).toBe(50);
    expect(clamp(0, 0, 100)).toBe(0);
    expect(clamp(100, 0, 100)).toBe(100);
  });

  it("clamps values below minimum", () => {
    expect(clamp(-10, 0, 100)).toBe(0);
  });

  it("clamps values above maximum", () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });
});

describe("conservativeSavings", () => {
  it("caps savings at the specified rate of current spend", () => {
    expect(conservativeSavings(1000, 500, 0.35)).toBe(350);
    expect(conservativeSavings(100, 80, 0.3)).toBe(30);
  });

  it("returns raw savings when below cap", () => {
    expect(conservativeSavings(1000, 100, 0.35)).toBe(100);
    expect(conservativeSavings(500, 50, 0.25)).toBe(50);
  });

  it("returns 0 for negative raw savings", () => {
    expect(conservativeSavings(1000, -100, 0.35)).toBe(0);
  });

  it("uses default cap rate of 0.35", () => {
    expect(conservativeSavings(1000, 500)).toBe(350);
  });

  it("rounds result to nearest integer", () => {
    expect(conservativeSavings(100, 33.7, 0.35)).toBe(34);
  });
});
