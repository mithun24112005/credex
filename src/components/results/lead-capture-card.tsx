"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type LeadCaptureCardProps = {
  publicId?: string;
};

export function LeadCaptureCard({ publicId }: LeadCaptureCardProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!publicId) {
      setStatus("error");
      setMessage("Save an audit before attaching contact details.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auditId: publicId,
        email: formData.get("email"),
        company: formData.get("company"),
        role: formData.get("role")
      })
    });

    if (response.ok) {
      setStatus("success");
      setMessage("Saved. We will use this for future report follow-up workflows.");
      form.reset();
      return;
    }

    setStatus("error");
    setMessage("We could not save those details right now.");
  }

  return (
    <Card className="bg-card/82">
      <CardContent className="p-7">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-sm text-muted-foreground">
          <Mail className="size-4 text-primary" />
          Optional follow-up
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">
          Send this to your finance workflow later
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          The report is not gated. Add contact details only after reviewing the
          savings analysis.
        </p>
        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <label className="grid gap-2 text-sm font-medium">
            Email
            <input
              name="email"
              type="email"
              required
              className="h-12 rounded-2xl border border-border bg-background/70 px-4 outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
              placeholder="you@company.com"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Company
              <input
                name="company"
                className="h-12 rounded-2xl border border-border bg-background/70 px-4 outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                placeholder="Optional"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Role
              <input
                name="role"
                className="h-12 rounded-2xl border border-border bg-background/70 px-4 outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                placeholder="Optional"
              />
            </label>
          </div>
          <Button type="submit" disabled={status === "loading" || !publicId}>
            {status === "loading" ? "Saving..." : "Save follow-up details"}
          </Button>
        </form>
        {message ? (
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            {status === "success" ? <CheckCircle2 className="size-4 text-primary" /> : null}
            {message}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
