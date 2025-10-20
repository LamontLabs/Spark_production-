import { computeStreak } from "../src/lib/streaks";

describe("computeStreak (bend-not-break)", () => {
  test("empty input → zeros", () => {
    expect(computeStreak([])).toEqual({ current: 0, best: 0 });
  });

  test("consecutive days build streak", () => {
    const r = computeStreak(["2025-10-01", "2025-10-02", "2025-10-03"], 2);
    expect(r.current).toBe(3);
    expect(r.best).toBe(3);
  });

  test("gap within leniency continues streak", () => {
    // gap of 2 days is allowed with leniency=2 → streak = 3
    const r = computeStreak(["2025-10-01", "2025-10-02", "2025-10-04"], 2);
    expect(r.current).toBe(3);
    expect(r.best).toBe(3);
  });

  test("gap beyond leniency resets (best preserved)", () => {
    // gap of 3 (>2) resets: first two make best=2, last day starts new streak
    const r = computeStreak(["2025-10-01", "2025-10-02", "2025-10-05"], 2);
    expect(r.current).toBe(1);
    expect(r.best).toBe(2); // ← updated expectation
  });

  test("unordered input handled", () => {
    const r = computeStreak(["2025-10-03", "2025-10-01", "2025-10-02"], 2);
    expect(r.current).toBe(3);
    expect(r.best).toBe(3);
  });
});
