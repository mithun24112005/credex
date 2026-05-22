"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

type ErrorCardProps = {
  title?: string;
  message: string;
  retry?: () => void;
  retryLabel?: string;
  action?: {
    label: string;
    href: string;
  };
};

export function ErrorCard({
  title = "Something went wrong",
  message,
  retry,
  retryLabel = "Try again",
  action
}: ErrorCardProps) {
  return (
    <div className="w-full rounded-3xl border border-border bg-card/82 p-8 text-center shadow-card">
      <div className="mx-auto mb-6 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <AlertCircle className="size-6" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{message}</p>
      <div className="mt-8 flex items-center justify-center gap-3">
        {retry ? (
          <Button variant="secondary" onClick={retry}>
            <RefreshCw className="mr-2 size-4" />
            {retryLabel}
          </Button>
        ) : null}
        {action ? (
          <Button asChild>
            <a href={action.href}>{action.label}</a>
          </Button>
        ) : null}
        {!action && !retry ? (
          <Button asChild>
            <a href="/audit">Run a new audit</a>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
