// Minimal placeholder to keep CI green; real UI tests require Detox.
// Here we validate that the streak engine module loads.
import * as streaks from '../src/lib/streaks';

test('module loads', () => {
  expect(typeof streaks.computeStreak).toBe('function');
});
