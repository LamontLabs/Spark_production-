import { computeStreak } from '../src/lib/streaks';

test('continuous days increase current and best', () => {
  const d = ['2025-10-01','2025-10-02','2025-10-03'];
  const r = computeStreak(d, 2);
  expect(r.current).toBe(3);
  expect(r.best).toBe(3);
});

test('gap within leniency bends not breaks', () => {
  const d = ['2025-10-01','2025-10-03','2025-10-04']; // 1-day gap
  const r = computeStreak(d, 2);
  expect(r.current).toBe(3);
  expect(r.best).toBe(3);
  expect(r.grace).toBe(1);
});

test('gap beyond leniency resets', () => {
  const d = ['2025-10-01','2025-10-05','2025-10-06']; // 3-day gap (leniency 2)
  const r = computeStreak(d, 2);
  expect(r.current).toBe(2);
  expect(r.best).toBe(1);
});
