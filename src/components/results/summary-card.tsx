import { Sparkles } from "lucide-react";
import Markdown from "react-markdown";

import { Card, CardContent } from "@/components/ui/card";
import type { AuditReport } from "@/features/audit-engine";

export function SummaryCard({ report }: { report: AuditReport }) {
  const isAiGenerated = report.summary.headline.startsWith("AI-generated");

  return (
    <Card className="bg-card/82">
      <CardContent className="p-6">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
          <Sparkles className="size-4" />
          {isAiGenerated ? "AI-generated summary" : "Frontend-generated summary"}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">
          {report.summary.headline}
        </h2>
        <div className="prose prose-sm prose-invert mt-4 max-w-none leading-7 text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
          <Markdown>{report.summary.body}</Markdown>
        </div>
      </CardContent>
    </Card>
  );
}
