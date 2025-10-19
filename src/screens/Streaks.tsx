import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { computeStreak } from '../lib/streaks';
import { getEntryDates } from '../lib/db';

export default function Streaks() {
  const [streak, setStreak] = useState({ current: 0, best: 0, grace: 0 });

  useEffect(() => {
    (async () => {
      const dates = await getEntryDates();
      const res = computeStreak(dates, 2); // leniency=2 days
      setStreak(res);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Streaks</Text>
      <Text style={styles.metric}>🔥 Current: {streak.current} days</Text>
      <Text style={styles.metric}>🏅 Best: {streak.best} days</Text>
      <Text style={styles.metric}>🧘 Grace Left: {streak.grace} day(s)</Text>
      <Text style={styles.note}>Bend-not-break: gaps within grace don’t reset your streak.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 26, textAlign: 'center', marginBottom: 16 },
  metric: { fontSize: 18, marginVertical: 4, textAlign: 'center' },
  note: { marginTop: 16, color: '#555', textAlign: 'center' },
});
