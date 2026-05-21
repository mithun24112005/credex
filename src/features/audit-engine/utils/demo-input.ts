import type { AuditInput } from "@/features/audit-engine/types";

export const demoAuditInput: AuditInput = {
  teamSize: 14,
  companyStage: "Seed Stage",
  useCase: "Mixed Usage",
  tools: [
    {
      id: "demo-chatgpt",
      name: "ChatGPT",
      plan: "Team",
      monthlySpend: 420,
      seats: 14
    },
    {
      id: "demo-claude",
      name: "Claude",
      plan: "Team",
      monthlySpend: 300,
      seats: 10
    },
    {
      id: "demo-cursor",
      name: "Cursor",
      plan: "Business",
      monthlySpend: 360,
      seats: 9
    },
    {
      id: "demo-copilot",
      name: "GitHub Copilot",
      plan: "Business",
      monthlySpend: 171,
      seats: 9
    },
    {
      id: "demo-openai",
      name: "OpenAI API",
      plan: "Pay as you go",
      monthlySpend: 780,
      seats: 1
    }
  ]
};
