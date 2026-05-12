import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { difficulties } from '../logic/difficulty';
import { modes } from '../logic/modes';

const ConfigScreen = ({ navigation }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [selectedMode, setSelectedMode] = useState('classic');
  const [rounds, setRounds] = useState(10);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <Text style={styles.label}>Dificultad</Text>
      <View style={styles.row}>
        {Object.keys(difficulties).map((key) => (
          <TouchableOpacity
            key={key}
            style={[styles.option, selectedDifficulty === key && styles.selected]}
            onPress={() => setSelectedDifficulty(key)}
          >
            <Text style={styles.optionText}>{difficulties[key].name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Modo de juego</Text>
      {Object.keys(modes).map((key) => (
        <TouchableOpacity
          key={key}
          style={[styles.option, selectedMode === key && styles.selected]}
          onPress={() => setSelectedMode(key)}
        >
          <Text style={styles.optionText}>{modes[key]}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Rondas: {rounds}</Text>
      <View style={styles.row}>
        {[5, 10, 15, 20].map((n) => (
          <TouchableOpacity
            key={n}
            style={[styles.option, rounds === n && styles.selected]}
            onPress={() => setRounds(n)}
          >
            <Text style={styles.optionText}>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Juego', { difficulty: selectedDifficulty, mode: selectedMode, rounds })}
      >
        <Text style={styles.buttonText}>Empezar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
  },
  selected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  optionText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfigScreen;