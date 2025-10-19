import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePrompts } from '../hooks/usePrompts';

export default function TodayPrompted() {
  const prompts = usePrompts('parent');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggested Prompts</Text>
      {prompts.map((p, i) => (
        <Text key={i} style={styles.prompt}>• {p}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  prompt: { marginVertical: 6 }
});
