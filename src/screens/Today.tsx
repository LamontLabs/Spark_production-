import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { insertEntry } from '../lib/db';

export default function Today() {
  const [gratitude, setGratitude] = useState('');
  const [win, setWin] = useState('');
  const [affirmation, setAffirmation] = useState('');

  const saveEntry = async () => {
    await insertEntry(gratitude, win, affirmation);
    setGratitude('');
    setWin('');
    setAffirmation('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Reflections</Text>
      <TextInput placeholder="Gratitude" value={gratitude} onChangeText={setGratitude} style={styles.input} />
      <TextInput placeholder="Win" value={win} onChangeText={setWin} style={styles.input} />
      <TextInput placeholder="Affirmation" value={affirmation} onChangeText={setAffirmation} style={styles.input} />
      <Button title="Save Entry" onPress={saveEntry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 6 },
});
