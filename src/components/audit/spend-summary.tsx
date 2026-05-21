import { BadgeDollarSign, CalendarDays } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type SpendSummaryProps = {
  monthly: number;
  yearly: number;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export function SpendSummary({ monthly, yearly }: SpendSummaryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="bg-background/55">
        <CardContent className="p-5">
          <BadgeDollarSign className="mb-5 size-5 text-primary" />
          <p className="text-sm text-muted-foreground">Total monthly spend</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {currency.format(monthly)}
          </p>
        </CardContent>
      </Card>
      <Card className="bg-background/55">
        <CardContent className="p-5">
          <CalendarDays className="mb-5 size-5 text-primary" />
          <p className="text-sm text-muted-foreground">Estimated annual spend</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {currency.format(yearly)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
