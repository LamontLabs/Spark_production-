import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { resetDatabase } from '../lib/db';

export default function Settings() {
  const onReset = async () => {
    await resetDatabase();
    Alert.alert('Reset complete', 'All local data cleared.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Reset Local Data" onPress={onReset} />
      <Text style={styles.note}>
        Spark stores everything on-device. Use export to back up your entries deterministically.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 26, textAlign: 'center', marginBottom: 16 },
  note: { marginTop: 12, color: '#555', textAlign: 'center' },
});
