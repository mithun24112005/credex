import type { Metadata } from "next";

import { AuditShell } from "@/components/audit/audit-shell";

export const metadata: Metadata = {
  title: "Run Your AI Stack Audit - StackPilot AI",
  description: "Audit your AI tooling spend in under 2 minutes. Find savings across ChatGPT, Claude, Cursor, Copilot, and more.",
  robots: "noindex, nofollow"
};

export default function AuditPage() {
  return <AuditShell />;
}
