import { describe, it, expect } from "vitest";

import { createAuditPayloadSchema, auditToolPayloadSchema } from "@/validators/audit";

describe("auditToolPayloadSchema", () => {
  it("validates a correct tool payload", () => {
    const result = auditToolPayloadSchema.safeParse({
      name: "ChatGPT",
      plan: "Team",
      monthlySpend: 300,
      seats: 10
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid tool name", () => {
    const result = auditToolPayloadSchema.safeParse({
      name: "InvalidTool",
      plan: "Team",
      monthlySpend: 300,
      seats: 10
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid plan for selected tool", () => {
    const result = auditToolPayloadSchema.safeParse({
      name: "ChatGPT",
      plan: "Business",
      monthlySpend: 300,
      seats: 10
    });

    expect(result.success).toBe(false);
  });

  it("rejects negative monthly spend", () => {
    const result = auditToolPayloadSchema.safeParse({
      name: "ChatGPT",
      plan: "Team",
      monthlySpend: -50,
      seats: 10
    });

    expect(result.success).toBe(false);
  });

  it("rejects zero seats", () => {
    const result = auditToolPayloadSchema.safeParse({
      name: "ChatGPT",
      plan: "Team",
      monthlySpend: 300,
      seats: 0
    });

    expect(result.success).toBe(false);
  });

  it("rejects spend exceeding maximum", () => {
    const result = auditToolPayloadSchema.safeParse({
      name: "ChatGPT",
      plan: "Team",
      monthlySpend: 300000,
      seats: 10
    });

    expect(result.success).toBe(false);
  });

  it("allows optional id field", () => {
    const result = auditToolPayloadSchema.safeParse({
      id: "custom-id-123",
      name: "ChatGPT",
      plan: "Team",
      monthlySpend: 300,
      seats: 10
    });

    expect(result.success).toBe(true);
  });
});

describe("createAuditPayloadSchema", () => {
  it("validates a complete correct payload", () => {
    const result = createAuditPayloadSchema.safeParse({
      teamSize: 10,
      companyStage: "Seed Stage",
      useCase: "Coding",
      tools: [
        {
          name: "ChatGPT",
          plan: "Team",
          monthlySpend: 300,
          seats: 10
        }
      ]
    });

    expect(result.success).toBe(true);
  });

  it("rejects empty tools array", () => {
    const result = createAuditPayloadSchema.safeParse({
      teamSize: 10,
      companyStage: "Seed Stage",
      useCase: "Coding",
      tools: []
    });

    expect(result.success).toBe(false);
  });

  it("rejects team size below 1", () => {
    const result = createAuditPayloadSchema.safeParse({
      teamSize: 0,
      companyStage: "Seed Stage",
      useCase: "Coding",
      tools: [
        {
          name: "ChatGPT",
          plan: "Team",
          monthlySpend: 300,
          seats: 10
        }
      ]
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid company stage", () => {
    const result = createAuditPayloadSchema.safeParse({
      teamSize: 10,
      companyStage: "Invalid Stage",
      useCase: "Coding",
      tools: [
        {
          name: "ChatGPT",
          plan: "Team",
          monthlySpend: 300,
          seats: 10
        }
      ]
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid use case", () => {
    const result = createAuditPayloadSchema.safeParse({
      teamSize: 10,
      companyStage: "Seed Stage",
      useCase: "Invalid Use Case",
      tools: [
        {
          name: "ChatGPT",
          plan: "Team",
          monthlySpend: 300,
          seats: 10
        }
      ]
    });

    expect(result.success).toBe(false);
  });

  it("coerces string numbers to integers", () => {
    const result = createAuditPayloadSchema.safeParse({
      teamSize: "10",
      companyStage: "Seed Stage",
      useCase: "Coding",
      tools: [
        {
          name: "ChatGPT",
          plan: "Team",
          monthlySpend: "300",
          seats: "10"
        }
      ]
    });

    expect(result.success).toBe(true);
  });

  it("rejects tools array exceeding 40 items", () => {
    const tools = Array.from({ length: 41 }, () => ({
      name: "ChatGPT",
      plan: "Team",
      monthlySpend: 300,
      seats: 10
    }));

    const result = createAuditPayloadSchema.safeParse({
      teamSize: 10,
      companyStage: "Seed Stage",
      useCase: "Coding",
      tools
    });

    expect(result.success).toBe(false);
  });

  it("rejects malformed payload with missing fields", () => {
    const result = createAuditPayloadSchema.safeParse({
      teamSize: 10,
      companyStage: "Seed Stage"
    });

    expect(result.success).toBe(false);
  });
});
