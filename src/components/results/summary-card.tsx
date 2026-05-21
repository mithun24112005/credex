import { Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { AuditReport } from "@/features/audit-engine";

export function SummaryCard({ report }: { report: AuditReport }) {
  return (
    <Card className="bg-card/82">
      <CardContent className="p-6">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
          <Sparkles className="size-4" />
          Frontend-generated summary
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">
          {report.summary.headline}
        </h2>
        <p className="mt-4 leading-7 text-muted-foreground">{report.summary.body}</p>
      </CardContent>
    </Card>
  );
}
