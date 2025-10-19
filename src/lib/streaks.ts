// Bend-not-break streak computation.
// dates: array of YYYY-MM-DD sorted ascending.
// leniency: allowed gap days that do not break the streak.
export function computeStreak(dates: string[], leniency = 2) {
  const toDay = (d: string) => Math.floor(new Date(d).getTime() / 86400000);
  if (dates.length === 0) return { current: 0, best: 0, grace: leniency };

  let best = 1;
  let current = 1;
  let graceLeft = leniency;

  for (let i = 1; i < dates.length; i++) {
    const gap = toDay(dates[i]) - toDay(dates[i - 1]);
    if (gap === 1) {
      current += 1;
      graceLeft = leniency;
    } else if (gap > 1 && gap - 1 <= graceLeft) {
      graceLeft -= (gap - 1);
      current += 1; // bend, do not break
    } else {
      best = Math.max(best, current);
      current = 1;
      graceLeft = leniency;
    }
  }
  best = Math.max(best, current);
  return { current, best, grace: graceLeft };
}
