import { Suspense } from "react";
import type { Metadata } from "next";

import { ResultsDashboard } from "@/components/results/results-dashboard";
import { ResultsError } from "@/components/results/results-error";
import { ResultsLoadingMinimal } from "@/components/results/results-loading";
import { getPublicReport } from "@/services/share/share-service";

type SharePageProps = {
  params: Promise<{ publicId: string }>;
};

export async function generateMetadata({
  params
}: SharePageProps): Promise<Metadata> {
  const { publicId } = await params;

  if (!/^[a-zA-Z0-9_-]{8,80}$/.test(publicId)) {
    return {
      title: "Report Not Found - StackPilot AI",
      description: "This shared audit report could not be found."
    };
  }

  let report;
  try {
    report = await getPublicReport(publicId);
  } catch {
    return {
      title: "Report Unavailable - StackPilot AI",
      description: "This shared audit report is temporarily unavailable."
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!report) {
    return {
      title: "Report Not Found - StackPilot AI",
      description: "This shared audit report could not be found."
    };
  }

  const title = `StackPilot AI found $${report.report.monthlySavings.toLocaleString()}/month in potential AI savings`;
  const description = `${report.report.optimizationScore}/100 AI stack efficiency score with conservative recommendations.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${appUrl}/share/${publicId}`,
      siteName: "StackPilot AI",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { publicId } = await params;

  if (!/^[a-zA-Z0-9_-]{8,80}$/.test(publicId)) {
    return <ResultsError message="This share link is not valid. It may have been modified or expired." />;
  }

  let report;
  try {
    report = await getPublicReport(publicId);
  } catch {
    return (
      <Suspense fallback={<ResultsLoadingMinimal />}>
        <ResultsError message="This report could not be loaded right now. Please try again later." />
      </Suspense>
    );
  }

  if (!report) {
    return <ResultsError message="This shared report could not be found. It may have expired or been removed." />;
  }

  return (
    <Suspense fallback={<ResultsLoadingMinimal />}>
      <ResultsDashboard initialPublicReport={report} isPublic />
    </Suspense>
  );
}
