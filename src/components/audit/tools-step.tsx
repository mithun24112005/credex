"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Boxes, Info } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import { ToolCard } from "@/components/audit/tool-card";
import { ToolSelector } from "@/components/audit/tool-selector";
import { toolSchema } from "@/lib/audit-validation";
import { useAuditStore } from "@/store/audit-store";

export function ToolsStep({ onComplete }: { onComplete: () => void }) {
  const tools = useAuditStore((state) => state.tools);
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (tools.length === 0) {
      setError("Add at least one AI tool to continue.");
      return;
    }

    const invalidTool = tools.find((tool) => !toolSchema.safeParse(tool).success);
    if (invalidTool) {
      setError("Resolve the highlighted tool fields before continuing.");
      return;
    }

    setError("");
    onComplete();
  };

  return (
    <form id="audit-tools-form" onSubmit={onSubmit} className="space-y-8">
      <div>
        <p className="text-sm font-medium text-primary">AI tool stack</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Add the AI tools your team pays for
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          Add each subscription or API bucket as a card. Everything stays local
          in your browser for this frontend phase.
        </p>
      </div>

      <ToolSelector />

      {error ? (
        <div className="flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-primary">
          <Info className="size-4" />
          {error}
        </div>
      ) : null}

      {tools.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-background/45 p-10 text-center">
          <div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Boxes className="size-6" />
          </div>
          <h3 className="text-xl font-semibold tracking-tight">
            Your AI stack will appear here
          </h3>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
            Start with your highest spend tool. You can edit or remove cards
            before the review step.
          </p>
        </div>
      ) : (
        <motion.div layout className="grid gap-4">
          <AnimatePresence initial={false}>
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </form>
  );
}
