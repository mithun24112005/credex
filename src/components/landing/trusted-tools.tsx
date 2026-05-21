import { trustedTools } from "@/components/landing/landing-data";

export function TrustedTools() {
  return (
    <section aria-label="Supported AI tools" className="border-y border-border bg-card/35">
      <div className="mx-auto max-w-7xl py-8 container-px">
        <p className="text-center text-sm text-muted-foreground">
          Built for the AI tools already spreading across modern teams
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {trustedTools.map((tool) => (
            <div
              key={tool}
              className="rounded-2xl border border-border bg-background/60 px-4 py-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
