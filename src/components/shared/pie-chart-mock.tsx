export function PieChartMock() {
  return (
    <div className="relative mx-auto size-44 rounded-full bg-[conic-gradient(from_210deg,hsl(var(--primary))_0_34%,hsl(var(--accent-foreground))_34%_55%,hsl(var(--muted-foreground)/0.45)_55%_76%,hsl(var(--border))_76%_100%)] p-5 shadow-card">
      <div className="grid size-full place-items-center rounded-full border border-border bg-card text-center">
        <div>
          <p className="text-2xl font-semibold">$8.4k</p>
          <p className="text-xs text-muted-foreground">monthly</p>
        </div>
      </div>
    </div>
  );
}
