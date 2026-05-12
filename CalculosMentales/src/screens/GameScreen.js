import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { generateOperation } from '../logic/operationGenerator';
import { calculatePoints } from '../constants/scoring';
import { difficulties } from '../logic/difficulty';

const generateChoices = (correct) => {
  const choices = new Set([correct]);
  while (choices.size < 4) {
    const offset = Math.floor(Math.random() * 20) - 10;
    if (offset !== 0) choices.add(correct + offset);
  }
  return [...choices].sort(() => Math.random() - 0.5);
};

const GameScreen = ({ navigation, route }) => {
  const { difficulty, mode, rounds } = route.params;
  const timeLimit = difficulties[difficulty].timePerQuestion;

  const [currentRound, setCurrentRound] = useState(1);
  const [operation, setOperation] = useState(generateOperation(difficulty));
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [userInput, setUserInput] = useState('');
  const [choices, setChoices] = useState([]);
  const [tfResult, setTfResult] = useState(null);
  const [stats, setStats] = useState({ score: 0, correct: 0, incorrect: 0, timeouts: 0 });
  const timerRef = useRef(null);
  const timeUsedRef = useRef(0);

  useEffect(() => {
    prepareRound(operation);
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const prepareRound = (op) => {
    if (mode === 'multipleChoice') {
      setChoices(generateChoices(op.result));
    }
    if (mode === 'trueFalse') {
      const showWrong = Math.random() > 0.5;
      const displayed = showWrong ? op.result + Math.floor(Math.random() * 5) + 1 : op.result;
      setTfResult({ displayed, isCorrect: !showWrong });
    }
  };

  const startTimer = () => {
    timeUsedRef.current = 0;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      timeUsedRef.current += 1;
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null, true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handleAnswer = (answer, timeout = false) => {
    clearInterval(timerRef.current);

    let isCorrect = false;
    if (!timeout) {
      if (mode === 'classic') isCorrect = parseInt(answer) === operation.result;
      else if (mode === 'multipleChoice') isCorrect = answer === operation.result;
      else if (mode === 'trueFalse') isCorrect = answer === tfResult.isCorrect;
    }

    const points = calculatePoints(timeUsedRef.current, timeLimit, isCorrect && !timeout);

    const newStats = {
      score: stats.score + points,
      correct: stats.correct + (isCorrect && !timeout ? 1 : 0),
      incorrect: stats.incorrect + (!isCorrect && !timeout ? 1 : 0),
      timeouts: stats.timeouts + (timeout ? 1 : 0),
    };

    if (mode === 'timeAttack' && !isCorrect) {
      navigation.replace('Resultados', { stats: newStats, rounds: currentRound });
      return;
    }

    if (currentRound >= rounds) {
      navigation.replace('Resultados', { stats: newStats, rounds });
      return;
    }

    const nextOp = generateOperation(difficulty);
    setOperation(nextOp);
    prepareRound(nextOp);
    setCurrentRound((r) => r + 1);
    setTimeLeft(timeLimit);
    setUserInput('');
    setStats(newStats);
    startTimer();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.round}>Ronda {currentRound}/{mode === 'timeAttack' ? '∞' : rounds}</Text>
      <Text style={styles.score}>Puntaje: {stats.score}</Text>
      <Text style={styles.timer}>⏱ {timeLeft}s</Text>
      <Text style={styles.expression}>{operation.expression} = ?</Text>

      {mode === 'classic' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Tu respuesta"
          />
          <TouchableOpacity style={styles.button} onPress={() => handleAnswer(userInput)}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}

      {mode === 'multipleChoice' && (
        <View style={styles.choicesContainer}>
          {choices.map((c) => (
            <TouchableOpacity key={c} style={styles.choiceButton} onPress={() => handleAnswer(c)}>
              <Text style={styles.choiceText}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {mode === 'trueFalse' && tfResult && (
        <View>
          <Text style={styles.expression}>{operation.expression} = {tfResult.displayed}</Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={() => handleAnswer(true)}>
              <Text style={styles.buttonText}>Verdadero</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#f44336' }]} onPress={() => handleAnswer(false)}>
              <Text style={styles.buttonText}>Falso</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {mode === 'timeAttack' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Tu respuesta"
          />
          <TouchableOpacity style={styles.button} onPress={() => handleAnswer(userInput)}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 16 },
  round: { fontSize: 16, color: '#666' },
  score: { fontSize: 18, fontWeight: '600' },
  timer: { fontSize: 22, fontWeight: 'bold', color: '#f44336' },
  expression: { fontSize: 36, fontWeight: 'bold', marginVertical: 16 },
  inputContainer: { width: '100%', gap: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 20, textAlign: 'center' },
  button: { backgroundColor: '#4CAF50', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  choicesContainer: { width: '100%', gap: 8 },
  choiceButton: { backgroundColor: '#2196F3', padding: 16, borderRadius: 8, alignItems: 'center' },
  choiceText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  row: { flexDirection: 'row', gap: 12, marginTop: 16 },
});

export default GameScreen;