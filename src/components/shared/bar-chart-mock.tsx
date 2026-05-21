const bars = [44, 72, 58, 84, 48, 66, 38, 76];

export function BarChartMock() {
  return (
    <div className="flex h-40 items-end gap-3 rounded-2xl border border-border bg-background/40 p-4">
      {bars.map((bar, index) => (
        <div key={bar + index} className="flex flex-1 items-end">
          <div
            className="w-full rounded-t-lg bg-gradient-to-t from-primary/35 to-primary"
            style={{ height: `${bar}%` }}
          />
        </div>
      ))}
    </div>
  );
}
