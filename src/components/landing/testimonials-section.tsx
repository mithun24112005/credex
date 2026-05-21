import { testimonials } from "@/components/landing/landing-data";
import { SectionHeading } from "@/components/landing/section-heading";

export function TestimonialsSection() {
  return (
    <section className="bg-card/35 py-24">
      <div className="mx-auto max-w-7xl container-px">
        <SectionHeading
          eyebrow="Operator signal"
          title="Built for teams trying to govern AI spend without slowing down"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-2xl border border-border bg-background/60 p-7"
            >
              <blockquote className="leading-7 text-foreground/90">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
