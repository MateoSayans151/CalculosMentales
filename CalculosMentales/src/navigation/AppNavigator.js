import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ConfigScreen from '../screens/ConfigScreen';
import GameScreen from '../screens/GameScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return(

            <Stack.Navigator initialRouteName="Inicio" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Inicio" component={HomeScreen} />
                <Stack.Screen name="Configuración" component={ConfigScreen} />
                <Stack.Screen name="Juego" component={GameScreen} />
                <Stack.Screen name="Resultados" component={ResultScreen} />
                <Stack.Screen name="Historial" component={HistoryScreen} />
            </Stack.Navigator>

    );
};

export default AppNavigator;