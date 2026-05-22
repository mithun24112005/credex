import { Suspense } from "react";
import type { Metadata } from "next";

import { ResultsDashboard } from "@/components/results/results-dashboard";
import { ResultsLoading } from "@/components/results/results-loading";

export const metadata: Metadata = {
  title: "Live Audit Results - StackPilot AI",
  description: "View your AI stack optimization results and savings recommendations."
};

export default function LiveResultsPage() {
  return (
    <Suspense fallback={<ResultsLoading />}>
      <ResultsDashboard />
    </Suspense>
  );
}
