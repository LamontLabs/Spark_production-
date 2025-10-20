// Spark™ — bend-not-break streak engine
// Computes current and best streaks given a list of ISO dates (YYYY-MM-DD).
// Gaps <= leniency are tolerated (streak continues). Larger gaps reset.

export type StreakResult = {
  current: number;
  best: number;
};

const toDay = (iso: string): number => {
  // Normalize to UTC midnight days since epoch
  const [y, m, d] = iso.split("-").map((v) => parseInt(v, 10));
  const t = Date.UTC(y, m - 1, d);
  return Math.floor(t / 86_400_000);
};

export function computeStreak(dates: string[], leniency = 2): StreakResult {
  if (!dates || dates.length === 0) return { current: 0, best: 0 };

  // Sort unique days ascending
  const days = Array.from(new Set(dates.map(toDay))).sort((a, b) => a - b);

  let current = 1;
  let best = 1;

  for (let i = 1; i < days.length; i++) {
    const gap = days[i] - days[i - 1];
    if (gap <= leniency && gap >= 1) {
      // within tolerance (or consecutive) → extend streak
      current += 1;
    } else if (gap === 0) {
      // same day duplicate after Set-protect (shouldn’t happen) → ignore
      continue;
    } else {
      // gap too large → reset
      if (current > best) best = current;
      current = 1;
    }
    if (current > best) best = current;
  }

  return { current, best };
}
