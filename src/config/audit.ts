import {
  Bot,
  Braces,
  Code2,
  FileCode2,
  Github,
  PenLine,
  Search,
  TableProperties,
  type LucideIcon
} from "lucide-react";

import type { AiToolName, CompanyStage, PrimaryUseCase } from "@/types";

export const auditSteps = [
  { id: 1, label: "Team context" },
  { id: 2, label: "AI stack" },
  { id: 3, label: "Review" },
  { id: 4, label: "Analysis" }
] as const;

export const companyStages = [
  "Solo Founder",
  "Early Startup",
  "Seed Stage",
  "Series A+",
  "Enterprise"
] as const satisfies readonly CompanyStage[];

export const primaryUseCaseValues = [
  "Coding",
  "Writing",
  "Research",
  "Data Analysis",
  "Mixed Usage"
] as const satisfies readonly PrimaryUseCase[];

export const primaryUseCases: Array<{
  value: PrimaryUseCase;
  description: string;
  icon: LucideIcon;
}> = [
  {
    value: "Coding",
    description: "Engineering agents, IDE assistants, and code review support.",
    icon: Code2
  },
  {
    value: "Writing",
    description: "Marketing, support, strategy docs, and internal communication.",
    icon: PenLine
  },
  {
    value: "Research",
    description: "Market scans, synthesis, competitive analysis, and diligence.",
    icon: Search
  },
  {
    value: "Data Analysis",
    description: "Analyst workflows, spreadsheet help, dashboards, and reporting.",
    icon: TableProperties
  },
  {
    value: "Mixed Usage",
    description: "A broad AI stack used across several functions and teams.",
    icon: Bot
  }
];

export const toolPlans: Record<AiToolName, string[]> = {
  ChatGPT: ["Plus", "Team", "Enterprise", "API"],
  Claude: ["Free", "Pro", "Max", "Team", "Enterprise", "API"],
  Cursor: ["Hobby", "Pro", "Business", "Enterprise"],
  "GitHub Copilot": ["Individual", "Business", "Enterprise"],
  Gemini: ["Free", "Advanced", "Business", "Enterprise", "API"],
  "OpenAI API": ["Pay as you go", "Scale Tier", "Enterprise"],
  "Anthropic API": ["Build", "Scale", "Enterprise"],
  Windsurf: ["Free", "Pro", "Teams", "Enterprise"]
};

export const toolMeta: Record<
  AiToolName,
  { icon: LucideIcon; iconPath: string; accent: string; shortName: string }
> = {
  ChatGPT: {
    icon: Bot,
    iconPath: "/icons/chatgpt.png",
    accent: "bg-primary/10 text-primary",
    shortName: "GPT"
  },
  Claude: {
    icon: Braces,
    iconPath: "/icons/claude.png",
    accent: "bg-foreground/10 text-foreground",
    shortName: "CLD"
  },
  Cursor: {
    icon: Code2,
    iconPath: "/icons/cursor.svg",
    accent: "bg-primary/10 text-primary",
    shortName: "CUR"
  },
  "GitHub Copilot": {
    icon: Github,
    iconPath: "/icons/github-copilot.svg",
    accent: "bg-foreground/10 text-foreground",
    shortName: "GHC"
  },
  Gemini: {
    icon: Bot,
    iconPath: "/icons/gemini.png",
    accent: "bg-primary/10 text-primary",
    shortName: "GEM"
  },
  "OpenAI API": {
    icon: FileCode2,
    iconPath: "/icons/openai.svg",
    accent: "bg-primary/10 text-primary",
    shortName: "API"
  },
  "Anthropic API": {
    icon: Braces,
    iconPath: "/icons/anthropic.svg",
    accent: "bg-foreground/10 text-foreground",
    shortName: "ANT"
  },
  Windsurf: {
    icon: Code2,
    iconPath: "/icons/windsurf.svg",
    accent: "bg-primary/10 text-primary",
    shortName: "WND"
  }
};

export const aiToolNames = Object.keys(toolPlans) as AiToolName[];
