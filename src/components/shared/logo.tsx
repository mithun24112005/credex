import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="StackPilot AI home"
      className={cn("flex items-center gap-3 font-semibold", className)}
    >
      <span className="grid size-9 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
        S
      </span>
      <span className="tracking-tight">StackPilot AI</span>
    </Link>
  );
}
