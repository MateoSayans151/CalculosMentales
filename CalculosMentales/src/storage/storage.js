import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  bestScores: 'best_scores',
  history: 'game_history',
};

const saveBestScore = async (score) => {
  const scores = await getBestScores();
  scores.push(score);
  scores.sort((a, b) => b - a);
  const top10 = scores.slice(0, 10);
  await AsyncStorage.setItem(KEYS.bestScores, JSON.stringify(top10));
};

const getBestScores = async () => {
  const data = await AsyncStorage.getItem(KEYS.bestScores);
  return data ? JSON.parse(data) : [];
};

const saveGameToHistory = async (gameResult) => {
  const history = await getHistory();
  history.unshift(gameResult);
  const last20 = history.slice(0, 20);
  await AsyncStorage.setItem(KEYS.history, JSON.stringify(last20));
};

const getHistory = async () => {
  const data = await AsyncStorage.getItem(KEYS.history);
  return data ? JSON.parse(data) : [];
};

const clearAll = async () => {
  await AsyncStorage.multiRemove(Object.values(KEYS));
};

export { saveBestScore, getBestScores, saveGameToHistory, getHistory, clearAll };