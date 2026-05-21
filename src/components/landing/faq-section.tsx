import { faqs } from "@/components/landing/landing-data";
import { SectionHeading } from "@/components/landing/section-heading";

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-4xl py-24 container-px">
      <SectionHeading
        eyebrow="FAQ"
        title="Clear boundaries for this first frontend phase"
      />
      <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card/70">
        {faqs.map((faq) => (
          <details key={faq.question} className="group p-6">
            <summary className="cursor-pointer list-none text-base font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="flex items-center justify-between gap-4">
                {faq.question}
                <span className="text-primary transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-4 leading-7 text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
