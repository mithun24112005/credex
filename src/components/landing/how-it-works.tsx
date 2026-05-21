import { steps } from "@/components/landing/landing-data";
import { SectionHeading } from "@/components/landing/section-heading";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-card/35 py-24">
      <div className="mx-auto max-w-7xl container-px">
        <SectionHeading
          eyebrow="How it works"
          title="From stack inventory to savings narrative"
          description="A short guided flow that produces a report finance, founders, and engineering leaders can all understand."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-border bg-background/60 p-7"
            >
              <div className="mb-7 flex items-center justify-between">
                <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <step.icon className="size-5" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
