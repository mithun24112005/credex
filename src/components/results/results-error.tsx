"use client";

import { ErrorCard } from "@/components/shared/error-card";

type ResultsErrorProps = {
  message: string;
  retry?: () => void;
};

export function ResultsError({ message, retry }: ResultsErrorProps) {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-4xl place-items-center container-px">
      <ErrorCard
        title="Report unavailable"
        message={message}
        retry={retry}
        retryLabel="Try again"
        action={{ label: "Run a new audit", href: "/audit" }}
      />
    </main>
  );
}
