import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

export default function AddTaskScreen({ navigation, route }) {
  const { userId } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert('Atenção', 'Digite o título da tarefa.');
      return;
    }

    try {
      const response = await fetch('http://10.0.0.193:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          title,
          description,
          image: ''
        })
      });

      if (!response.ok) {
        Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
        return;
      }

      Alert.alert('Sucesso', 'Tarefa adicionada!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Tarefa</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da tarefa"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição (opcional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>SALVAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f6ff'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});