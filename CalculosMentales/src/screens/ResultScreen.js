import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { saveBestScore, saveGameToHistory } from '../storage/storage';

const ResultScreen = ({ navigation, route }) => {
  const { stats, rounds } = route.params;
  const accuracy = rounds > 0 ? Math.round((stats.correct / rounds) * 100) : 0;

  useEffect(() => {
    saveBestScore(stats.score);
    saveGameToHistory({
      score: stats.score,
      correct: stats.correct,
      incorrect: stats.incorrect,
      timeouts: stats.timeouts,
      rounds,
      date: new Date().toLocaleDateString(),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados</Text>

      <Text style={styles.score}>{stats.score} pts</Text>

      <View style={styles.statsContainer}>
        <Row label="Correctas" value={stats.correct} color="#4CAF50" />
        <Row label="Incorrectas" value={stats.incorrect} color="#f44336" />
        <Row label="Sin respuesta" value={stats.timeouts} color="#FF9800" />
        <Row label="Precisión" value={`${accuracy}%`} color="#2196F3" />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Configuración')}>
        <Text style={styles.buttonText}>Jugar de nuevo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondary]} onPress={() => navigation.navigate('Inicio')}>
        <Text style={styles.buttonText}>Inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const Row = ({ label, value, color }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={[styles.rowValue, { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 16 },
  title: { fontSize: 28, fontWeight: 'bold' },
  score: { fontSize: 52, fontWeight: 'bold', color: '#4CAF50' },
  statsContainer: { width: '100%', backgroundColor: '#f5f5f5', borderRadius: 12, padding: 16, gap: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLabel: { fontSize: 16, color: '#333' },
  rowValue: { fontSize: 16, fontWeight: 'bold' },
  button: { width: '100%', backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center' },
  secondary: { backgroundColor: '#9E9E9E' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default ResultScreen;