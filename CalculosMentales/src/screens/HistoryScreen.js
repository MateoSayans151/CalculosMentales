import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { getBestScores, getHistory, clearAll } from '../storage/storage';

const HistoryScreen = ({ navigation }) => {
  const [bestScores, setBestScores] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const scores = await getBestScores();
    const hist = await getHistory();
    setBestScores(scores);
    setHistory(hist);
  };

  const handleClear = async () => {
    await clearAll();
    setBestScores([]);
    setHistory([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial</Text>

      <Text style={styles.sectionTitle}>Mejores puntajes</Text>
      {bestScores.length === 0 ? (
        <Text style={styles.empty}>Sin puntajes todavía</Text>
      ) : (
        bestScores.slice(0, 5).map((score, index) => (
          <View key={index} style={styles.scoreRow}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={styles.scoreValue}>{score} pts</Text>
          </View>
        ))
      )}

      <Text style={styles.sectionTitle}>Partidas recientes</Text>
      {history.length === 0 ? (
        <Text style={styles.empty}>Sin partidas todavía</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.historyScore}>{item.score} pts</Text>
              <Text style={styles.historyDetail}>
                ✓ {item.correct}  ✗ {item.incorrect}  ⏱ {item.timeouts}
              </Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearText}>Borrar historial</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Inicio')}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 48 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 8 },
  empty: { color: '#999', fontStyle: 'italic' },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#eee' },
  rank: { fontSize: 16, color: '#666' },
  scoreValue: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50' },
  historyItem: { backgroundColor: '#f5f5f5', borderRadius: 8, padding: 12, marginBottom: 8 },
  historyScore: { fontSize: 18, fontWeight: 'bold' },
  historyDetail: { fontSize: 14, color: '#555', marginTop: 4 },
  historyDate: { fontSize: 12, color: '#999', marginTop: 2 },
  clearButton: { marginTop: 16, padding: 12, alignItems: 'center' },
  clearText: { color: '#f44336', fontSize: 14 },
  button: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default HistoryScreen;