"use client";

import { motion } from "framer-motion";

import { features } from "@/components/landing/landing-data";
import { SectionHeading } from "@/components/landing/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl py-24 container-px">
      <SectionHeading
        eyebrow="AI spend intelligence"
        title="A calm control layer for chaotic AI subscriptions"
        description="StackPilot turns a scattered tool stack into a concise picture of spend, overlap, and recommended next moves."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.08, duration: 0.42 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full overflow-hidden bg-gradient-to-b from-card to-card/60">
              <CardContent className="p-7">
                <div className="mb-8 grid size-12 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
