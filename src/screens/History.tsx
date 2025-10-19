import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getEntries } from '../lib/db';

export default function History() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEntries().then(setEntries);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text>{item.date}</Text>
            <Text>🙏 {item.gratitude}</Text>
            <Text>🏆 {item.win}</Text>
            <Text>💬 {item.affirmation}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 12, textAlign: 'center' },
  entry: { marginBottom: 12, borderBottomWidth: 1, borderColor: '#ddd', paddingBottom: 8 },
});
