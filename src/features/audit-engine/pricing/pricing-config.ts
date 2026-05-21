import type { AiToolName } from "@/types";

export type ToolCategory = "general-ai" | "coding" | "api" | "research";

type PlanMeta = {
  monthlySeatCost?: number;
  estimatedMonthlyMinimum?: number;
  tier: "free" | "individual" | "team" | "business" | "enterprise" | "api";
  collaborative?: boolean;
};

export type ToolPricingConfig = {
  category: ToolCategory;
  plans: Record<string, PlanMeta>;
  individualPlan?: string;
  teamPlan?: string;
  businessPlan?: string;
};

export const pricingConfig: Record<AiToolName, ToolPricingConfig> = {
  ChatGPT: {
    category: "general-ai",
    individualPlan: "Plus",
    teamPlan: "Team",
    businessPlan: "Team",
    plans: {
      Plus: { monthlySeatCost: 20, tier: "individual" },
      Team: { monthlySeatCost: 30, tier: "team", collaborative: true },
      Enterprise: { estimatedMonthlyMinimum: 600, tier: "enterprise", collaborative: true },
      API: { estimatedMonthlyMinimum: 100, tier: "api" }
    }
  },
  Claude: {
    category: "general-ai",
    individualPlan: "Pro",
    teamPlan: "Team",
    businessPlan: "Team",
    plans: {
      Free: { monthlySeatCost: 0, tier: "free" },
      Pro: { monthlySeatCost: 20, tier: "individual" },
      Max: { monthlySeatCost: 100, tier: "individual" },
      Team: { monthlySeatCost: 30, tier: "team", collaborative: true },
      Enterprise: { estimatedMonthlyMinimum: 600, tier: "enterprise", collaborative: true },
      API: { estimatedMonthlyMinimum: 100, tier: "api" }
    }
  },
  Cursor: {
    category: "coding",
    individualPlan: "Pro",
    teamPlan: "Business",
    businessPlan: "Business",
    plans: {
      Hobby: { monthlySeatCost: 0, tier: "free" },
      Pro: { monthlySeatCost: 20, tier: "individual" },
      Business: { monthlySeatCost: 40, tier: "business", collaborative: true },
      Enterprise: { estimatedMonthlyMinimum: 500, tier: "enterprise", collaborative: true }
    }
  },
  "GitHub Copilot": {
    category: "coding",
    individualPlan: "Individual",
    teamPlan: "Business",
    businessPlan: "Business",
    plans: {
      Individual: { monthlySeatCost: 10, tier: "individual" },
      Business: { monthlySeatCost: 19, tier: "business", collaborative: true },
      Enterprise: { monthlySeatCost: 39, tier: "enterprise", collaborative: true }
    }
  },
  Gemini: {
    category: "general-ai",
    individualPlan: "Advanced",
    teamPlan: "Business",
    businessPlan: "Business",
    plans: {
      Free: { monthlySeatCost: 0, tier: "free" },
      Advanced: { monthlySeatCost: 20, tier: "individual" },
      Business: { monthlySeatCost: 24, tier: "business", collaborative: true },
      Enterprise: { estimatedMonthlyMinimum: 500, tier: "enterprise", collaborative: true },
      API: { estimatedMonthlyMinimum: 100, tier: "api" }
    }
  },
  "OpenAI API": {
    category: "api",
    plans: {
      "Pay as you go": { estimatedMonthlyMinimum: 50, tier: "api" },
      "Scale Tier": { estimatedMonthlyMinimum: 500, tier: "api" },
      Enterprise: { estimatedMonthlyMinimum: 1000, tier: "enterprise" }
    }
  },
  "Anthropic API": {
    category: "api",
    plans: {
      Build: { estimatedMonthlyMinimum: 50, tier: "api" },
      Scale: { estimatedMonthlyMinimum: 500, tier: "api" },
      Enterprise: { estimatedMonthlyMinimum: 1000, tier: "enterprise" }
    }
  },
  Windsurf: {
    category: "coding",
    individualPlan: "Pro",
    teamPlan: "Teams",
    businessPlan: "Teams",
    plans: {
      Free: { monthlySeatCost: 0, tier: "free" },
      Pro: { monthlySeatCost: 15, tier: "individual" },
      Teams: { monthlySeatCost: 30, tier: "team", collaborative: true },
      Enterprise: { estimatedMonthlyMinimum: 450, tier: "enterprise", collaborative: true }
    }
  }
};
