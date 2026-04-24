import React, { useState, useCallback, useContext } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

export default function HomeScreen({ navigation, route }) {
  const { userId } = route.params;
  const { colors } = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://10.0.0.193:3000/tasks/${userId}`);
      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Erro', 'Não foi possível buscar as tarefas.');
        return;
      }

      setTasks(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('TaskDetail', { task: item, userId })}
    >
      <Text style={[styles.taskTitle, { color: colors.text }]}>
        {item.title}
      </Text>

      <Text style={[styles.taskDescription, { color: colors.subtitle }]}>
        {item.description}
      </Text>

      <Text style={item.completed ? styles.completed : styles.pending}>
        {item.completed ? 'Concluída' : 'Pendente'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Minhas Tarefas
      </Text>

      <Text style={[styles.subtitle, { color: colors.subtitle }]}>
        Organize suas atividades do dia
      </Text>

      <View style={styles.buttonArea}>
        <Button
          title="Adicionar tarefa"
          onPress={() => navigation.navigate('AddTask', { userId })}
        />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.subtitle }]}>
            Nenhuma tarefa cadastrada.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  buttonArea: {
    marginBottom: 20
  },
  list: {
    paddingBottom: 20
  },
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 3
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 8
  },
  completed: {
    color: 'green',
    fontWeight: 'bold'
  },
  pending: {
    color: 'red',
    fontWeight: 'bold'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20
  }
});