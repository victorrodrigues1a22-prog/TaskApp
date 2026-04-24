import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeContext } from './src/context/ThemeContext';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const colors = {
    background: darkMode ? '#0f172a' : '#f2f6ff',
    card: darkMode ? '#1e293b' : '#ffffff',
    text: darkMode ? '#f8fafc' : '#0f172a',
    subtitle: darkMode ? '#cbd5e1' : '#475569',
    primary: '#2563eb'
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, colors }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: darkMode ? '#1e293b' : '#ffffff'
            },
            headerTintColor: darkMode ? '#ffffff' : '#0f172a',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Minhas Tarefas',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Settings')}
                  style={{ marginRight: 15 }}
                >
                  <Text style={{ fontSize: 24 }}>⚙️</Text>
                </TouchableOpacity>
              )
            })}
          />

          <Stack.Screen
            name="AddTask"
            component={AddTaskScreen}
            options={{ title: 'Adicionar Tarefa' }}
          />

          <Stack.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
            options={{ title: 'Detalhes da Tarefa' }}
          />

          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Configurações' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}