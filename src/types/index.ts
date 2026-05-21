import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Recommendation = {
  title: string;
  impact: string;
  description: string;
  tone: "high" | "medium" | "low";
};

export type CompanyStage =
  | "Solo Founder"
  | "Early Startup"
  | "Seed Stage"
  | "Series A+"
  | "Enterprise";

export type PrimaryUseCase =
  | "Coding"
  | "Writing"
  | "Research"
  | "Data Analysis"
  | "Mixed Usage";

export type AiToolName =
  | "ChatGPT"
  | "Claude"
  | "Cursor"
  | "GitHub Copilot"
  | "Gemini"
  | "OpenAI API"
  | "Anthropic API"
  | "Windsurf";

export type AuditTool = {
  id: string;
  name: AiToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
};
