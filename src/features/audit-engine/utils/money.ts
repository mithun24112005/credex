export function roundCurrency(value: number) {
  return Math.max(0, Math.round(value));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function conservativeSavings(currentSpend: number, rawSavings: number, capRate = 0.35) {
  return roundCurrency(clamp(rawSavings, 0, currentSpend * capRate));
}
